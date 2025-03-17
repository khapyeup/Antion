import { eq } from "drizzle-orm";
import db from "./db";
import { documentsTable } from "./schema";

export async function getAllChildDocument(parentId: string) {
  const children = await db
    .select({ id: documentsTable.id })
    .from(documentsTable)
    .where(eq(documentsTable.parentDocument, parentId));

  let allDescendants = [...children];
  for (const child of children) {
    const nested = await getAllChildDocument(child.id);
    allDescendants = allDescendants.concat(nested);
  }
  console.log(allDescendants);
  return allDescendants;
}
