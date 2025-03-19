"use server";

import { auth, signIn, signOut } from "@/auth";
import db from "./db";
import { documentsTable } from "./schema";
import { and, eq, inArray } from "drizzle-orm";
import { getAllChildDocument } from "./helper";

export async function login() {
  await signIn("github", { redirectTo: "/documents" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function createDocument(
  title: string,
  parentDocument: string | undefined | null
) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return;
  }

  const document = await db
    .insert(documentsTable)
    .values({
      userId,
      title,
      parentDocument,
      isArchived: false,
      isPuplished: false,
    })
    .returning();

  return document;
}

export async function deleteDocument(id: string) {
  try {
    
    //Delete parent document first
    await db
      .update(documentsTable)
      .set({ isArchived: true })
      .where(eq(documentsTable.id, id));
    //Delete child of parent document after that
    const allChildren = await getAllChildDocument(id);

    if (allChildren.length > 0) {
      await db
        .update(documentsTable)
        .set({ isArchived: true })
        .where(
          inArray(
            documentsTable.id,
            allChildren.map((child) => child.id)
          )
        );
    }

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "Failed to delete",
    };
  }
}

export async function restoreDocument(id: string) {
  try {
    const restoredDocument = await db
      .update(documentsTable)
      .set({ isArchived: false })
      .where(and(eq(documentsTable.id, id)));

    if (!restoredDocument[0]) {
      throw new Error("Document not found");
    }
    
    return { success: true, data: restoredDocument[0] };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to restore",
    };
  }
}

export async function removeForever(id: string) {
  try {
    console.log('id', id)
    const primise = await db.delete(documentsTable).where(eq(documentsTable.id, id)).returning();
    console.log(primise)
    return { success: true };
  } catch (error) {
    console.log(error)
    return { success: false, error };
  }
}
