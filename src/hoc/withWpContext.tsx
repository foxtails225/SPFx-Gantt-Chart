import { useWebPartContext } from "../hooks/useWebPartContext";
import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export function withWpContext<TProps extends { wpContext?: A }, A>(WrappedComponent: React.ComponentClass<TProps>, mapContext?: (context: WebPartContext) => A) {
  return props => {
    const context = useWebPartContext(mapContext);
    return (
      <WrappedComponent {...props} wpContext={context} />
    );
  };
}
