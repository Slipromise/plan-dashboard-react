import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useCallback, useEffect, useRef, useState } from "react";

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

interface UseInfiniteQueryOptions<ArgType, DataType, SelectedDataType> {
  getNextArg(lastArg: ArgType, lastResult: DataType): ArgType;
  initialArg: ArgType;
  dataSelector?: (result: DataType) => SelectedDataType[];
  isSkip?: Boolean;
}

const useInfiniteQuery = <
  Endpoint extends QueryHooks<QueryDefinition<any, any, any, any>>,
  SelectedDataType = GetDataTypeFromEndpoint<Endpoint>,
  DataType = GetDataTypeFromEndpoint<Endpoint>,
  ArgType = GetArgTypeFromEndpoint<Endpoint>
>(
  endpoint: Endpoint,
  options: UseInfiniteQueryOptions<ArgType, DataType, SelectedDataType>
) => {
  const nextArg = useRef<ArgType | undefined>(options.initialArg);
  const [data, setData] = useState<SelectedDataType[]>([]);
  const [trigger, result, { lastArg }] = endpoint.useLazyQuery();

  const initFetch = useCallback(() => {
    if (JSON.stringify(lastArg) === JSON.stringify(options.initialArg)) return;
    setData([]);
    trigger(options.initialArg);
  }, [lastArg, options.initialArg, trigger]);

  useEffect(() => {
    !options.isSkip && initFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.isSkip]);

  useEffect(() => {
    if (result.isSuccess) {
      nextArg.current =
        result.data && nextArg.current
          ? options.getNextArg(nextArg.current, result.data)
          : undefined;
      setData([
        ...data,
        ...(options.dataSelector
          ? options.dataSelector(result.data)
          : [result.data]),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data, result.isSuccess]);

  return {
    ...result,
    data,
    hasNext: !nextArg.current,
    fetchNext: () => nextArg.current && trigger(nextArg.current),
    reset: initFetch,
  };
};

export default useInfiniteQuery;
