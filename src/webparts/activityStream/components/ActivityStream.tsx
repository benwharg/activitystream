import * as React from "react";
import { IActivityStreamProps } from "./IActivityStreamProps";
import { getNewsItems } from "../../../utilities/sharepointAPI";
import { NewsCard } from "./Card";
import { NewsCardProps } from "../../../utilities/types";
import "../../../tailwind.css";
import {
  Shimmer,
  ShimmerElementType,
  ShimmerElementsGroup,
} from "office-ui-fabric-react/lib/Shimmer";

const elementGroup = () => {
  return (
    <div>
      <ShimmerElementsGroup
        shimmerElements={[
          { type: ShimmerElementType.line, width: "33%", height: 300 },
          { type: ShimmerElementType.gap, width: 25, height: 300 },
          { type: ShimmerElementType.line, width: "33%", height: 300 },
          { type: ShimmerElementType.gap, width: 25, height: 300 },
          { type: ShimmerElementType.line, width: "33%", height: 300 },
          { type: ShimmerElementType.gap, width: 25, height: 300 },
        ]}
      />
    </div>
  );
};

export const ActivityStream = ({}: IActivityStreamProps) => {
  const [newsContainer, setNewsContainer] = React.useState<NewsCardProps[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getNewsPosts = async () => {
      try {
        const newsItems = await getNewsItems(
          "https://bensportfolio.sharepoint.com"
        );
        setLoading(false);
        setNewsContainer(newsItems);
      } catch (error) {
        console.log(error);
      }
    };
    getNewsPosts();
  }, []);

  return (
    <div className="shadow-md p-4">
      <div className="mb-4 mt-8 ml-8">
        <h1 className="text-3xl mt-4 mb-12">Activity Stream</h1>
      </div>
      <div className="m-8">
        <Shimmer isDataLoaded={!isLoading} customElementsGroup={elementGroup()}>
          <div className="grid grid-flow-row auto-rows-fr sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4">
            {newsContainer
              ? newsContainer.map((item) => <NewsCard {...item} />)
              : "ERROR"}
          </div>
        </Shimmer>
      </div>
    </div>
  );
};
