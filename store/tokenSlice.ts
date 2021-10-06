import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, createTransform } from "redux-persist";
import storage from "../utils/storage";
import { graphqlClient } from "./apiSlice";
import {
  api,
  LoginMutation,
  RegisterMutation,
  UserRole,
} from "./graphql-generated";

type TokenState = {
  value?: string;
  payload?: {
    sub: string;
    name: string;
    roles: UserRole[];
    iat: number;
    exp: number;
  };
};

const initialState: TokenState = {};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    clearToken: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        api.endpoints.Login.matchFulfilled(action) ||
        api.endpoints.Register.matchFulfilled(action),
      (state, { payload }: PayloadAction<RegisterMutation | LoginMutation>) => {
        const { token } =
          (payload as LoginMutation).userLogin ||
          (payload as RegisterMutation).userRegister ||
          {};
        token && graphqlClient.setHeader("Authorization", `Bearer ${token}`);

        return token
          ? {
              value: token,
              payload: tokenPayloadParser(token),
            }
          : state;
      }
    );
  },
});

const graphqlSetHeader = createTransform(
  (state) => state,
  (state) => {
    graphqlClient.setHeader("Authorization", `Bearer ${state}`);

    return state;
  },
  { whitelist: ["value"] }
);

const tokenPayloadParser = (token: string) =>
  JSON.parse(window.atob(token.split(".")[1])) as TokenState["payload"];

const persistConfig: PersistConfig<TokenState> = {
  key: "apiToken",
  storage,
  transforms: [graphqlSetHeader],
};

export const { clearToken } = tokenSlice.actions;
export default persistReducer(persistConfig, tokenSlice.reducer);
