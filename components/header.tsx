import { documentsTable } from "@/lib/schema";
import Title from "./editable-title";
import Dropdown from "./dropdown-menu";

type Document = typeof documentsTable.$inferSelect;

export default function Header({ document }: { document: Document }) {
  return (
    <header className="p-2 w-full  flex items-center ">
      <Title document={document} />
      <Dropdown>
        <div>...</div>
      </Dropdown>
    </header>
  );
}
