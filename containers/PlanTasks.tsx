import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetPlanQuery } from "../store/graphql-generated";
import { tokenPayloadSelector } from "../store/selectors";
import styles from "../styles/PlanTasks.module.css";
import TaskBucket from "./TaskBucket";

interface Props {
  id: string;
  title: string;
  members: { name: string; avatar: string }[];
  buckets: string[];
}

export default function PlanTasks({
  id = "db8f7668-b9b0-5e4d-b38d-ca925dabe339",
}: Props): ReactElement {
  const { isLogin } = useSelector(tokenPayloadSelector);

  const { data } = useGetPlanQuery(isLogin ? { planId: id } : skipToken);

  return (
    <Container className={styles.plan_tasks}>
      <div className={styles.plan_header}></div>
      <div>
        <div className={styles.plan_buckets}>
          {data?.plan.buckets.map((name) => (
            <TaskBucket key={name} planId={id} name={name} />
          ))}
          <div></div>
        </div>
      </div>
    </Container>
  );
}
