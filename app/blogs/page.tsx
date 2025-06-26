import React from "react";
import Link from "next/link";
import { generateMetadata } from "@/lib/Seo";

type Props = {};

const pages = (props: Props) => {
  return (
    <div>
      <div>{JSON.stringify(generateMetadata())}</div>
      <Link
        href={"/"}
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600`}
        // aria-label={label}
      >
        button
      </Link>
    </div>
  );
};

export default pages;
