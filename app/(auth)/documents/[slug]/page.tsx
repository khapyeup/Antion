import Banner from "@/components/banner";
import Cover from "@/components/cover";
import { Editor } from "@/components/dynamic-editor";
import Header from "@/components/header";

import Toolbar from "@/components/toolbar";
import db from "@/lib/db";
import { documentsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = await db.query.documentsTable.findFirst({
    where: eq(documentsTable.id, slug),
  });

  if (!document) {
    return <div className="text-5xl text-center">Cannot find document</div>;
  }
  
  return (
    <div className="flex flex-col w-full">
      {document.isArchived ? (
        <Banner id={document.id} />
      ) : (
        <Suspense
          fallback={
            <div className="p-2 w-full flex items-center animate-pulse ">
              <div className="text-sm px-2 py-1 h-5 w-2 bg-neutral-400 rounded-md  "></div>
            </div>
          }
        >
          <Header document={document} />
        </Suspense>
      )}

      {/* cover image */}
      <Suspense
        fallback={
          <div className="text-5xl inset-0 fixed z-[9999999999999] bg-white">
            Loading...
          </div>
        }
      >
        <Cover document={document} />
      </Suspense>

      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto space-y-10">
          <Toolbar initialData={document} />
          <Editor document={document}/>
        </div>
      </div>
    </div>
  );
}
