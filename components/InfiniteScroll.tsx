import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { ReactElement, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

type GetDataTypeFromEndpoint<Endpoint> = Endpoint extends QueryHooks<
  QueryDefinition<any, any, string, infer DataType, string>
>
  ? DataType
  : never;

type GetArgTypeFromEndpoint<Endpoint> = Endpoint extends QueryHooks<
  QueryDefinition<infer ArgType, any, string, any, string>
>
  ? ArgType
  : any;

interface InfiniteScrollProps<
  Endpoint,
  ItemProps,
  ArgType = GetArgTypeFromEndpoint<Endpoint>,
  DataType = GetDataTypeFromEndpoint<Endpoint>
> {
  endpoint: Endpoint;
  itemRender: (p: ItemProps) => ReactElement;
  dataSelector: (d: DataType) => (ItemProps & { id: string | number })[];
  initialArg: ArgType;
  getNextArg: (lastArg: ArgType, lastResult: DataType) => ArgType | undefined;
}

export default function InfiniteScroll<
  ItemProps,
  Endpoint extends QueryHooks<QueryDefinition<any, any, any, any>>
>({
  endpoint,
  itemRender,
  dataSelector,
  initialArg,
  getNextArg,
}: InfiniteScrollProps<Endpoint, ItemProps>): ReactElement {
  const [argList, setArgList] = useState([initialArg]);

  return (
    <div>
      {argList.map((arg, index) => (
        <Section
          arg={arg}
          key={JSON.stringify(arg)}
          endpoint={endpoint}
          itemRender={itemRender}
          dataSelector={dataSelector}
          onTrigger={(data) => {
            const tempArgList = [...argList];
            const injectArg = getNextArg(arg, data);
            if (injectArg) {
              tempArgList[index + 1] = injectArg;
              setArgList(tempArgList);
            }
          }}
        />
      ))}
    </div>
  );
}

interface SectionProps<
  Endpoint,
  ItemProps,
  ArgType = GetArgTypeFromEndpoint<Endpoint>,
  DataType = GetDataTypeFromEndpoint<Endpoint>
> {
  endpoint: Endpoint;
  itemRender: (p: ItemProps) => ReactElement;
  dataSelector: (d: DataType) => (ItemProps & { id: string | number })[];
  arg: ArgType;
  onTrigger: (d: DataType) => void;
}

const Section = <
  ItemProps,
  Endpoint extends QueryHooks<QueryDefinition<any, any, any, any>>
>({
  endpoint,
  itemRender: ItemRender,
  dataSelector,
  arg,
  onTrigger,
}: SectionProps<Endpoint, ItemProps>): ReactElement => {
  const [isSkip, setIsSkip] = useState(true);
  const { data } = endpoint.useQuery(arg, { skip: isSkip });

  useEffect(() => {
    if (!isSkip && data) {
      onTrigger(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSkip]);

  if (!data)
    return (
      <Waypoint
        onEnter={() => setIsSkip(false)}
        onLeave={() => setIsSkip(true)}
        topOffset="-10px"
        bottomOffset="-10px"
      />
    );

  return (
    <Waypoint onEnter={() => setIsSkip(false)} onLeave={() => setIsSkip(true)}>
      <div>
        {dataSelector(data).map((props) => (
          <ItemRender {...props} key={props.id} />
        ))}
      </div>
    </Waypoint>
  );
};
