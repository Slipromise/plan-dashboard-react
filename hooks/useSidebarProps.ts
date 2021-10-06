import React from "react";
import Sidebar from "../components/Sidebar";
import { useGetSidebarDataQuery } from "../store/graphql-generated";

const useSidebarProps = (): React.ComponentProps<typeof Sidebar> => {
  const { data } = useGetSidebarDataQuery();

  return {
    userName: data?.me.name || "",
    userAvatarUri: data?.me.avatar || "",
    plans: data?.me.plans?.map((item) => ({ name: item.name, id: item.id })),
    onClickAddPlan: () => {},
    onClickHome: () => {},
    onClickMyTasks: () => {},
    onClickPlan: () => {},
  };
};

export default useSidebarProps;
