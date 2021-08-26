import * as React from "react";
import { NewsCardProps } from "../../../utilities/types";

export const NewsCard = ({
  Author,
  Description,
  Path,
  SiteName,
  Title,
  LastModifiedTime,
}: NewsCardProps) => {
  return (
    <div className="max-w-sm p-10">
      <div className="relative rounded overflow-hidden shadow-lg flex flex-col h-full">
        <div className="px-6 py-4 flex-grow">
          <div className="mb-6">
            <div className="font-bold text-xl">{Title}</div>
            <div className="text-xs">
              {new Date(LastModifiedTime).toISOString().split("T")[0]}
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 text-base">{Description}</p>
          </div>
        </div>
        <div className="w-full flex justify-between mt-4 px-6 pt-2 pb-1 bg-gray-100 rounded">
          <span className="inline-block px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
            <span className="font-semibold">Author:</span> {Author}
            <p className="overflow-ellipsis">
              <span className="font-semibold">Site: </span>
              {SiteName.split("/").pop()}
            </p>
          </span>
        </div>
        <a
          className="absolute h-full top-0 bottom-0 left-0 right-0 z-10"
          href={Path}
          target="_blank"
        ></a>
      </div>
    </div>
  );
};
