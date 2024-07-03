import axios from "axios";

export type SchoolInfo = {
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  ORG_RDNMA: string;
};

export const searchSchools = async (term: string) => {
  try {
    const response = await axios.get("https://open.neis.go.kr/hub/schoolInfo", {
      params: {
        KEY: process.env.EXPO_PUBLIC_NEIS_API_KEY,
        Type: "json",
        pIndex: "1",
        pSize: "20",
        SCHUL_NM: term,
        SCHUL_KND_SC_NM: "초등학교",
      },
    });

    return response.data.schoolInfo[1].row as SchoolInfo[];
  } catch (error) {
    console.error("Error fetching school info:", error);
    return [];
  }
};
