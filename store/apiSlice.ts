import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient("http://localhost:4000/");

export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({ client: graphqlClient }),
  endpoints: () => ({}),
});
