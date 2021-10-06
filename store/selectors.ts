import { createSelector } from "reselect";
import { RootState } from ".";

export const tokenSelector = (state: RootState) => state.token;

export const tokenPayloadSelector = createSelector(tokenSelector, (token) => {
  const { sub, exp, iat } = token.payload || {};
  const isExp = exp ? Date.now() / 1000 > exp : false;
  const isStart = iat ? Date.now() / 1000 > iat : false;

  // 3天後將過期
  const isCloseExp = exp
    ? Date.now() + 3 * 24 * 60 * 60 * 1000 > exp * 1000
    : false;

  return {
    userId: sub,
    isLogin: isStart && !isExp,
    isCloseExp,
  };
});
