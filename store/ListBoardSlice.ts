import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ListTypes {
  PLANS,
  MY_TASKS,
  TASK_OF_PLAN,
}

type ListBoardState = {
  currentType: ListTypes;
  selectedTaskId?: string;
  selectedPlanId?: string;
};

const initialState: ListBoardState = {
  currentType: ListTypes.PLANS,
};

const ListBoardSlice = createSlice({
  name: "ListBoard",
  initialState,
  reducers: {
    linkPlans: (state) => ({
      ...state,
      currentType: ListTypes.PLANS,
    }),
    linkMyTasks: (state) => ({
      ...state,
      currentType: ListTypes.MY_TASKS,
    }),
    linkPlan: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      selectedPlanId: payload,
    }),
  },
});

export const { linkPlans, linkMyTasks, linkPlan } = ListBoardSlice.actions;
export default ListBoardSlice.reducer;
