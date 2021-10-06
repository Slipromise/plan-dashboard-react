import React from "react";
import PlanCard from "../components/PlanCard";
import { useGetSelfPlansQuery } from "../store/graphql-generated";

const usePlanCardsProps = (
  plansCursorId?: string
): (React.ComponentProps<typeof PlanCard> & { id: string })[] => {
  const { data } = useGetSelfPlansQuery({ plansSize: 20, plansCursorId });

  return (
    data?.me.plans?.map((item) => ({
      name: item.name,
      memberCount: item.members.length,
      id: item.id,
    })) || []
  );
};

export default usePlanCardsProps;
