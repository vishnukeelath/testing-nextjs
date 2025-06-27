import { Metadata } from "next";
import { headers } from "next/headers";

// Interface for the expected API response data
interface PageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  metatitle?: string;
  metadescription?: string;
  metakeywords?: string[];
  image?: string;
}

type SeoData = {
  metatitle?: string;
  metadescription?: string;
  metakeywords?: string[];
  ogImage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const defaultMetadata: Metadata = {
  // themeColor: "#000000",
  icons: {
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};

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
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    // Fallback SEO data
    return {
      metatitle: "Eventoq 007",
      metadescription: "The top event planning location",
    };
  }
}

// Common generateMetadata function
export async function generateCommonMetadata({
  seoDataFromApi = null,
}: { seoDataFromApi?: PageData | null } = {}): Promise<Metadata> {
  // Fetch page-specific data
  try {
    if (!seoDataFromApi) {
      //   const defaultMetadata = await generateLayoutMetadata();
      const headersList = await headers();
      // console.log("111, headerlist", JSON.stringify(headersList));
      const pathname = headersList.get("x-current-pathname");
      const currentUrl = `${pathname}`;

      const seoDataFromUrl = await fetchSeoData(currentUrl);
      console.log("111 seoData", seoDataFromUrl);
      return {
        ...seoDataFromUrl,
        title: seoDataFromUrl?.metatitle || "Eventoq 00",
        description:
          seoDataFromUrl?.metadescription || "The top event planning location",
        ...defaultMetadata,
      };
    }

    return {
      //   ...defaultMetadata,
      title: seoDataFromApi?.data?.metatitle,
      description: seoDataFromApi?.data?.metadescription,
      keywords: seoDataFromApi?.data?.tags,
      openGraph: {
        title: seoDataFromApi?.data?.metatitle,
        description: seoDataFromApi?.data?.metadescription,
        images: seoDataFromApi?.data?.image,
      },
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);
    return {
      //   ...defaultMetadata,
      title: "Eventoq 007",
      description: "The top event planning location",
      openGraph: {
        title: "Eventoq 007",
        description: "The top event planning location",
        images: seoDataFromApi?.data?.image,
      },
      ...defaultMetadata,
      // title: "Error",
      // description: "Failed to load page metadata",
    };
  }
}
