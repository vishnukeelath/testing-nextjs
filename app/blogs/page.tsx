import React from "react";
import Link from "next/link";
// import { generateMetadata } from "@/lib/Seo";
import { fetchClient } from "@/lib/FetchClient";
import { Metadata } from "next";
import { generateCommonMetadata } from "@/lib/metadata";

interface ProductData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

async function fetchProductData(): Promise<ProductData | null> {
  try {
    console.log("fetchProductData call run");
    const response = await fetchClient.fetch(
      "Pages/get/slug/top-wedding-photography-trends-for-2025"
    );
    console.log("fetchProductData call response", response);
    return response as ProductData;
  } catch (error) {
    console.error("Product API error:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageApidata = await fetchProductData();
  return generateCommonMetadata({ seoDataFromApi: pageApidata });
}

const pages = async () => {
  const blogData = await fetchClient.fetch(
    "Pages/get/slug/top-wedding-photography-trends-for-2025"
  );
  console.log("blogData", blogData);
  return (
    <div>
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
