import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import PlanCard from "../components/PlanCard";
import usePlanCardsProps from "../hooks/usePlanCardsProps";
import { useGetSelfPlansQuery } from "../store/graphql-generated";
import { tokenPayloadSelector } from "../store/selectors";
import styles from "../styles/PlanCard.module.css";

interface PlanCardsProps {}

export default function PlanCards({}: PlanCardsProps): ReactElement {
  const [planIds, setPlanIds] = useState<(string | undefined)[]>([undefined]);

  const injectPlanIds = useCallback(
    (idx: number, id: string) => {
      if (!planIds.some((item) => item === id)) {
        const newPlanIds = [...planIds];
        newPlanIds[idx] = id;
        setPlanIds(newPlanIds);
      }
    },
    [planIds]
  );

  return (
    <Container className={styles.plan_cards}>
      {planIds.map((id, index) => (
        <PlanSection
          key={id || "first"}
          id={id}
          onQueryFullfil={(id) => injectPlanIds(index + 1, id)}
          isLast={planIds.length === index + 1}
        />
      ))}
    </Container>
  );
}

interface PlanSectionProps {
  id?: string;
  onQueryFullfil: (id: string) => void;
  isLast?: boolean;
}

const PlanSection = ({ id, onQueryFullfil, isLast }: PlanSectionProps) => {
  const { isLogin } = useSelector(tokenPayloadSelector);

  const { data, isLoading } = useGetSelfPlansQuery(
    isLogin ? { plansSize: 10, plansCursorId: id } : skipToken
  );

  const planCardsProps = useMemo<
    (React.ComponentProps<typeof PlanCard> & { id: string })[]
  >(
    () =>
      data?.me.plans?.map((item) => ({
        name: item.name,
        memberCount: item.members.length,
        id: item.id,
      })) || [],
    [data?.me.plans]
  );

  const onScrollBottom = useCallback(() => {
    if (data?.me.plans?.[data.me.plans?.length - 1]) {
      onQueryFullfil(data.me.plans[data.me.plans.length - 1].id);
    }
  }, [data?.me.plans, onQueryFullfil]);

  //   const [tempId, setTempId] = useState(id);

  return (
    <>
      {planCardsProps.map(({ id, ...props }) => (
        <PlanCard key={id} {...props}></PlanCard>
      ))}
      {isLast && !isLoading && <Waypoint onEnter={onScrollBottom} />}
    </>
  );
};
