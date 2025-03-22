import { auth } from "@/auth";
import db from "@/lib/db";
import { documentsTable } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Not authenticated", { status: 404 });
  }
  const { id } = await params;
  
    const documents = await db.query.documentsTable.findFirst({
      where: and(
        eq(documentsTable.userId, session.user.id),
        eq(documentsTable.isArchived, false),
        eq(documentsTable.id, id)
      ),
    });
  return NextResponse.json(documents);
}
