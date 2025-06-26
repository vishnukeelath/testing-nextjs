import { Metadata } from "next";
import { headers } from "next/headers";

type SeoData = {
  metatitle: string;
  metadescription: string;
  ogImage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
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

export async function generateMetadata(): Promise<Metadata> {
  // Construct the current URL (this is an approximation in server components)
  // Note: 'headers()' can be used to get the host, but full URL is tricky in App Router
  // const pathname = params.slug ? `/${params.slug.join("/")}` : "/";
  const headersList = await headers();
  // console.log("111, headerlist", JSON.stringify(headersList));
  const pathname = headersList.get("x-current-pathname");
  const currentUrl = `${pathname}`;

  const { data: seoData } = await fetchSeoData(currentUrl);
  console.log("111 seoData", seoData);

  return {
    title: seoData?.metatitle,
    description: seoData?.metadescription,
    openGraph: {
      title: seoData?.metatitle,
      description: seoData?.metadescription,
      url: currentUrl,
      images: seoData?.ogImage ? [{ url: seoData?.ogImage }] : [],
    },
  };
}
