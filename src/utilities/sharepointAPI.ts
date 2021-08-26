import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SearchCell } from "./types";

const getConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
};

export const getNewsItems = async (siteURL: string) => {
  //sitewide search, rank supercedes last modified so manual sorting has to be done

  const query: string =
    "/_api/search/query?querytext='IsDocument:True AND FileExtension:aspx AND PromotedState:2'&selectproperties='Title,LastModifiedTime,Description,Path,Author,SiteName'";
  const endpoint: string = siteURL + query;

  const response: AxiosResponse = await axios.get(endpoint, getConfig);

  const results = response.data.PrimaryQueryResult.RelevantResults.Table;

  const sortedResults = results.Rows.sort((rowA, rowB) => {
    const date1 = new Date(
      rowA.Cells.filter(
        (cell: SearchCell) => cell.Key === "LastModifiedTime"
      )[0].Value
    ).getTime();
    const date2 = new Date(
      rowB.Cells.filter(
        (cell: SearchCell) => cell.Key === "LastModifiedTime"
      )[0].Value
    ).getTime();

    return date2 - date1;
  });

  const mappedResults = sortedResults.map((item) => {
    const flattenedObj = {};
    item.Cells.forEach((cell) => {
      Object.assign(flattenedObj, { [cell.Key]: cell.Value });
    });
    return flattenedObj;
  });

  return mappedResults;
};
