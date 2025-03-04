import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-14 px-10 border-b border-b-gray-200 bg-white">
      <Link href="/" className="text-xl font-semibold">
        Antion
      </Link>
      <Link href="/login" className="px-2.5 py-1.5 rounded-md hover:bg-gray-200 ">Login</Link>
    </nav>
  );
}
