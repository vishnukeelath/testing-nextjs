import { Metadata } from "next";
import { generateMetadata as generateLayoutMetadata } from "@/app/layout"; // Adjust path based on your structure
import { headers } from "next/headers";

// Interface for the expected API response data
interface PageData {
  [key: string]: any;
  name?: string;
  description?: string;
  tags?: string[];
  image?: string;
}

type SeoData = {
  metatitle: string;
  metadescription: string;
  ogImage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// Interface for the metadata fetching function
type FetchPageData<T> = (params: any) => Promise<T | null>;

// Simulate fetching SEO data based on URL
async function fetchSeoData(url: string): Promise<SeoData> {
  // Replace with your actual API endpoint
  console.log("111 pathname", url);
  try {
    const response = await fetch(
      `https://weddingtestapi.riolabz.com/api/v1/pages-seo/url/${encodeURIComponent(
        url
      )}`,
      {
        cache: "no-store", // Prevent caching to ensure fresh data
      }
    );

    if (!response.ok) throw new Error("Failed to fetch SEO data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    // Fallback SEO data
    return {
      metatitle: "111Eventoq",
      metadescription: "The top event planning location",
    };
  }
}

// Common generateMetadata function
export async function generateCommonMetadata<T extends PageData>(
  params: any,
  fetchPageData?: FetchPageData<T>
): Promise<Metadata> {
  // Fetch default metadata from layout

  // Fetch page-specific data
  try {
    const pageData = params;
    // if (fetchPageData) {
    //   console.log("detail page function found");
    //   pageData = await fetchPageData(params);
    // }

    if (!params) {
      //   const defaultMetadata = await generateLayoutMetadata();
      const headersList = await headers();
      // console.log("111, headerlist", JSON.stringify(headersList));
      const pathname = headersList.get("x-current-pathname");
      const currentUrl = `${pathname}`;

      const { data: defaultMetadata } = await fetchSeoData(currentUrl);
      console.log("111 seoData", defaultMetadata);
      return {
        ...defaultMetadata,
        title: defaultMetadata?.metatitle || "Not Found",
        description:
          defaultMetadata?.metadescription || "No data found for this page",
      };
    }

    return {
      //   ...defaultMetadata,
      title: pageData?.data?.name,
      description: pageData?.data?.description,
      keywords: pageData?.data?.tags,
      openGraph: {
        title: pageData?.data?.name,
        description: pageData?.data?.description,
        images: pageData?.data?.image,
      },
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);
    return {
      //   ...defaultMetadata,
      title: "Error",
      description: "Failed to load page metadata",
    };
  }
}
