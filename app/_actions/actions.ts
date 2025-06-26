import { fetchClient } from "@/lib/FetchClient";
import { cache } from "react";

interface Homefile {
  [key: string]: any;
}

const getTxtHomeFileData = async () => {
  console.log("fetch api called");
  try {
    const homefile: Homefile = await fetchClient.fetchTxtFile(
      "https://weddingtestapi.riolabz.com/api/v1/home/getTxt/public"
    );
    if (homefile?.data?.generalTxt) {
      const generaldata = await fetchClient.fetchTxtFile(
        homefile?.data?.generalTxt
      );
      return generaldata;
    }
  } catch (error) {
    console.error("Failed to fetch TXT home file:", error);
    throw error;
  }
};

export const cachedGetTxt = cache(getTxtHomeFileData);
