import React, { ReactElement, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import useFakeComment from "../hooks/useFakeComment";
import CommentInput from "./CommentInput";
import CommentListItem from "./CommentListItem";
import styles from "../styles/CommentDialog.module.css";
import { useUpdateEffect } from "react-use";

interface Props extends React.ComponentProps<typeof Modal> {
  title?: string;
  comments?: React.ComponentProps<typeof CommentListItem>[];
}

export default function CommentDialog({
  title,
  // comments = [],
  ...modalProps
}: Props): ReactElement {
  // TODO: 記得移除
  const comments = useFakeComment();

  const bodyRef = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  });

  return (
    <Modal {...modalProps} className={styles.container}>
      <Modal.Header>
        <Modal.Title>{title || "評論"}</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={bodyRef}>
        {(!comments || comments.length === 0) && "尚無評論"}
        {comments?.map((props, i) => (
          <CommentListItem {...props} key={i} />
        ))}
        {/* TODO: Pagination */}
      </Modal.Body>
      <Modal.Footer>
        <CommentInput />
      </Modal.Footer>
    </Modal>
  );
}
