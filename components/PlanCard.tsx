import React, { ReactElement } from "react";
import Avatar from "react-avatar";
import { Badge, Card, Container } from "react-bootstrap";
import styles from "../styles/PlanCard.module.css";
import { BsPersonFill } from "react-icons/bs";

interface Props {
  name: string;
  memberCount: number;
  onClick?: () => void;
}

export default function PlanCard({
  name,
  memberCount,
  onClick,
}: Props): ReactElement {
  return (
    <Card className={styles.container} onClick={onClick}>
      <Avatar name={name} size="52" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>
          <BsPersonFill />
          {memberCount}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
