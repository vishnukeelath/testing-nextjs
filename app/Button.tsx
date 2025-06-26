"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Button({ url }: { url: string }) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push(url)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        button
      </button>
      <Link
        href={url}
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`}
      >
        button
      </Link>
    </>
  );
}
