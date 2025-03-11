import db from "@/lib/db";
import { documentsTable } from "./schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function getSidebar(parentDocument: string | undefined = undefined) {
    const session = await auth();
    if (!session) {
        return;
    }
    console.log(session);
    const documents = await db.query.documentsTable.findMany({
        where: and(
            eq(documentsTable.isArchived, false),
            eq(documentsTable.userId, session.user.id),
            parentDocument ? eq(documentsTable.parentDocument, parentDocument) : undefined
        ),
    })
    return documents;
}