import { documentsTable } from "@/lib/schema";
import Title from "./editable-title";
import Dropdown from "./dropdown-menu";
import Publish from "./publish";

type Document = typeof documentsTable.$inferSelect;

export default function Header({
  document,
  preview,
}: {
  document: Document;
  preview?: boolean;
}) {
  return (
    <header className="p-2 w-full  flex justify-between items-center ">
      {preview ? <h1 className="h-7 px-2 rounded-md">{document.title}</h1> : <Title document={document} />}
      {!preview && (
        <div className="flex items-center gap-2">
          <Publish document={document} />
          <Dropdown>
            <div className="">...</div>
          </Dropdown>
        </div>
      )}
    </header>
  );
}
