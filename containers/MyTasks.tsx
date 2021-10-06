import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Waypoint } from "react-waypoint";
import TaskCard from "../components/TaskCard";
import { useGetSelfTasksQuery } from "../store/graphql-generated";
import { tokenPayloadSelector } from "../store/selectors";
import styles from "../styles/MyTasks.module.css";

interface Props {}

export default function MyTasks({}: Props): ReactElement {
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
    <Container className={styles.my_tasks}>
      <h4>我的任務</h4>
      {taskIds.map((id, index) => (
        <TaskSection
          key={id || "first"}
          id={id}
          onQueryFullfil={(id) => injectPlanIds(index + 1, id)}
          isLast={taskIds.length === index + 1}
        />
      ))}
    </Container>
  );
}

type TaskSectionProps = {
  id?: string;
  onQueryFullfil: (id: string) => void;
  isLast?: boolean;
};

const TaskSection = ({ id, onQueryFullfil, isLast }: TaskSectionProps) => {
  const { isLogin } = useSelector(tokenPayloadSelector);

  const { data, isLoading } = useGetSelfTasksQuery(
    isLogin ? { tasksSize: 20, tasksCursorId: id } : skipToken
  );

  const taskCardsProps = useMemo<
    (React.ComponentProps<typeof TaskCard> & { id: string })[]
  >(
    () =>
      data?.me.tasks?.map((item) => ({
        status: item.status,
        statusOptions: item.statusOptions,
        title: item.title,
        comments: item.commentsLength || 0,
        participators: item.participatorsLength || 0,
        id: item.id,
      })) || [],
    [data?.me.tasks]
  );

  const onScrollBottom = useCallback(() => {
    if (data?.me.tasks?.[data.me.tasks.length - 1]) {
      onQueryFullfil(data.me.tasks[data.me.tasks.length - 1].id);
    }
  }, [data?.me.tasks, onQueryFullfil]);
  return (
    <>
      {taskCardsProps.map(({ id, ...props }) => (
        <TaskCard key={id} {...props} />
      ))}
      {isLast && !isLoading && <Waypoint onEnter={onScrollBottom} />}
    </>
  );
};
