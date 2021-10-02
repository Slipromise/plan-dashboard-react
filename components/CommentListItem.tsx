import React, { ReactElement } from "react";
import Avatar from "react-avatar";
import { Container } from "react-bootstrap";
import styles from "../styles/CommentListItem.module.css";

interface Props {
  authorName: string;
  authorAvatarUri?: string;
  content: string;
  date: string;
}

export default function CommentListItem({
  authorName,
  authorAvatarUri,
  content,
  date,
}: Props): ReactElement {
  return (
    <Container className={styles.container}>
      <div data-header>
        <Avatar name={authorName} src={authorAvatarUri} size="32" round />
        <span data-name>{authorName}</span>
        <span data-date>{date}</span>
      </div>
      <div data-content>{content}</div>
    </Container>
  );
}
