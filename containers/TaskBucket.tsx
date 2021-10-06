import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import PlanCard from "../components/PlanCard";
import TaskCard from "../components/TaskCard";
import {
  useGetPlanTasksQuery,
  useGetSelfPlansQuery,
} from "../store/graphql-generated";
import { tokenPayloadSelector } from "../store/selectors";

interface Props {
  planId: string;
  name: string;
}

export default function TaskBucket({ planId, name }: Props): ReactElement {
  const [taskIds, setTaskIds] = useState<(string | undefined)[]>([undefined]);

  const injectPlanIds = useCallback(
    (idx: number, id: string) => {
      if (!taskIds.some((item) => item === id)) {
        const newTaskIds = [...taskIds];
        newTaskIds[idx] = id;
        setTaskIds(newTaskIds);
      }
    },
    [taskIds]
  );

  return (
    <div>
      {taskIds.map((id, index) => (
        <TaskSection
          key={id || "first"}
          id={id}
          onQueryFullfil={(id) => injectPlanIds(index + 1, id)}
          isLast={taskIds.length === index + 1}
          bucket={name}
          planId={planId}
        />
      ))}
    </div>
  );
}

interface TaskSectionProps {
  id?: string;
  onQueryFullfil: (id: string) => void;
  isLast?: boolean;
  planId: string;
  bucket: string;
}

const TaskSection = ({
  id,
  onQueryFullfil,
  isLast,
  planId,
  bucket,
}: TaskSectionProps) => {
  const { isLogin } = useSelector(tokenPayloadSelector);

  const { data, isLoading } = useGetPlanTasksQuery({
    tasksPlanId: planId,
    tasksBucket: bucket,
  });

  const planCardsProps = useMemo<
    (React.ComponentProps<typeof TaskCard> & { id: string })[]
  >(
    () =>
      data?.tasks.map((item) => ({
        id: item.id,
        title: item.title,
        status: item.status,
        statusOptions: item.statusOptions,
        comments: item.commentsLength || 0,
        participators: item.participatorsLength || 0,
      })) || [],
    [data?.tasks]
  );

  const onScrollBottom = useCallback(() => {
    if (data?.tasks?.[data.tasks.length - 1]) {
      onQueryFullfil(data.tasks[data.tasks.length - 1].id);
    }
  }, [data?.tasks, onQueryFullfil]);

  //   const [tempId, setTempId] = useState(id);

  return (
    <>
      {planCardsProps.map(({ id, ...props }) => (
        <TaskCard key={id} {...props}></TaskCard>
      ))}
      {isLast && !isLoading && <Waypoint onEnter={onScrollBottom} />}
    </>
  );
};
