import React, { ReactElement, useState } from "react";
import Avatar from "react-avatar";
import { Button, Card } from "react-bootstrap";
import { TaskStatus } from "../definitions/common";
import { ImHourGlass } from "react-icons/im";
import { BsCheck, BsCheckCircle, BsCircle } from "react-icons/bs";
import { MdError, MdMessage, MdMoreHoriz, MdPerson } from "react-icons/md";
import TaskStatusDropdown from "./TaskStatusDropdown";
import styles from "../styles/TaskCard.module.css";

interface Props {
  initiator: string;
  initiatorAvatarUri: string;
  isPublic?: boolean;
  status: TaskStatus;
  statusOptions: TaskStatus[];
  creatDate: string;
  title: string;
  comments?: number;
  participators?: number;
  //   activities:
}

export default function TaskCard({
  title,
  creatDate,
  status,
  initiatorAvatarUri,
  isPublic = false,
  initiator,
  statusOptions,
  participators,
  comments,
}: Props): ReactElement {
  return (
    <Card className={styles.container}>
      <Card.Header>
        <Card.Title>
          <div data-is-check={status === TaskStatus.COMPLETE}>
            <BsCheck size={20} data-checked />
            <BsCheckCircle size={20} data-hover />
            <BsCircle size={20} data-unchecked />
          </div>
          {title}
        </Card.Title>
        <Card.Subtitle>
          <Avatar src={initiatorAvatarUri} name={initiator} size="32" round />
          {creatDate}
        </Card.Subtitle>
      </Card.Header>
      {/* <Card.Body>Body</Card.Body> */}
      <Card.Footer>
        <TaskStatusDropdown selectedOption={status} options={statusOptions} />
        <Button>
          <MdMessage />
          <span>{comments}</span>
        </Button>
        <Button>
          <MdPerson />
          <span>{participators}</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
