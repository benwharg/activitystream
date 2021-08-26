import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { ActivityStream } from "./components/ActivityStream";
import { IActivityStreamProps } from "./components/IActivityStreamProps";

export interface IActivityStreamWebPartProps {}

export default class ActivityStreamWebPart extends BaseClientSideWebPart<IActivityStreamWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IActivityStreamProps> =
      React.createElement(ActivityStream, {});

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Aggregates news pages from all site collections",
          },
          groups: [
            {
              groupName: "Stream Configuration",
              groupFields: [
                PropertyPaneTextField("siteString", {
                  label: "Root Site URL",
                  description:
                    "Comma separated list of sites you want to aggregate the news from!",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
