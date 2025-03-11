"use server";

import { auth, signIn, signOut } from "@/auth";
import db from "./db";
import { documentsTable } from "./schema";


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

  const document = await db.insert(documentsTable).values({
    userId,
    title,
    parentDocument,
    isArchived: false,
    isPuplished: false,
  });
  return document;
}
