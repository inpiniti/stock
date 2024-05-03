export default defineEventHandler(async (event) => {
  const baseUrl = "https://api.investing.com/api/financialdata/assets/equitiesByCountry/default";

  const params = new URLSearchParams({
    "fields-list":
      "id,name,symbol,isCFD,high,low,last,lastPairDecimal,change,changePercent,volume,time,isOpen,url,flag,countryNameTranslated,exchangeId,performanceDay,performanceWeek,performanceMonth,performanceYtd,performanceYear,performance3Year,technicalHour,technicalDay,technicalWeek,technicalMonth,avgVolume,fundamentalMarketCap,fundamentalRevenue,fundamentalRatio,fundamentalBeta,pairType",
    "country-id": "11",
    page: "0",
    "page-size": "100",
    "include-major-indices": "false",
    "include-additional-indices": "false",
    "include-primary-sectors": "false",
    "include-other-indices": "false",
    limit: "0",
  });
  const url = `${baseUrl}?${params.toString()}`;

  try {
    // 인베스팅 크롤링하여 데이터 가져오기
    const response = fetchData(url);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
});

async function fetchData(url: string) {
  const response = await fetch(url, {
    mode: "cors",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "Domain-Id": "kr",
      Origin: "https://kr.investing.com",
      Priority: "u=1, i",
      Referer: "https://kr.investing.com/",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
