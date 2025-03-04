"use server";

import { signIn, signOut } from "@/auth";

export async function login() {
  await signIn("github", { redirectTo: "/documents" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
