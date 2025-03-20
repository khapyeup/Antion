import Banner from "@/components/banner";
import Header from "@/components/header";
import db from "@/lib/db";
import { documentsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

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
    return <div>Cannot find document</div>;
  }
  return (
    <div className="flex flex-col overflow-hidden w-full">
      {document.isArchived ? <Banner id={document.id}/> : <Header document={document} />}
    </div>
  );
}
