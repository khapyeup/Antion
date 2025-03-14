"use server";

import { auth, signIn, signOut } from "@/auth";
import db from "./db";
import { documentsTable } from "./schema";
import { and, eq } from "drizzle-orm";

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
    const deletedDocument = await db
      .update(documentsTable)
      .set({ isArchived: true })
      .where(eq(documentsTable.id, id))
      .returning();

    if (!deletedDocument[0]) {
      throw new Error("Document not found");
    }

    return {
      success: true,
      data: deletedDocument[0],
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to delete",
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
