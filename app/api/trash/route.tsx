import { auth } from "@/auth";
import db from "@/lib/db";
import { documentsTable } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Not authenticated", { status: 404 });
  }

  const documents = await db.query.documentsTable.findMany({
    where: and(
      eq(documentsTable.userId, session.user.id),
      eq(documentsTable.isArchived, true)
    ),
  });
  return NextResponse.json(documents);
}
