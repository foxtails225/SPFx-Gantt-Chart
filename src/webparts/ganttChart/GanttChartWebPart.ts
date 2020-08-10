import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import GanttChart from './components/ganttChart';
import AppContext from '../../common/AppContext';

export interface IGanttChartWebPartProps {
  description: string;
}

export default class GanttChartWebPart extends BaseClientSideWebPart<IGanttChartWebPartProps> {

  public render(): void {
    const element: React.ReactElement = React.createElement(
      AppContext.Provider,
      {
        value: this.context
      },
      React.createElement(GanttChart, { description: this.properties.description })
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
