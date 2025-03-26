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
  params: Promise<{ previewId: string }>;
}) {
  const { previewId } = await params;
  const document = await db.query.documentsTable.findFirst({
    where: eq(documentsTable.id, previewId),
  });

  if (!document) {
    return <div className="text-5xl text-center">Cannot find document</div>;
  } else if (!document.isPuplished) {
    return <div className="flex items-center justify-center h-screen w-full">
        <h1 className="text-2xl font-bold text-red-500">You do not have permission to see this document</h1>
    </div>
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
          <Header preview={true} document={document} />
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
        <Cover preview={true} document={document} />
      </Suspense>

      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto space-y-10">
          <Toolbar preview={true} initialData={document} />
          <Editor preview={true} document={document}/>
        </div>
      </div>
    </div>
  );
}
