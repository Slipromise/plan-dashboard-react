import React, { ReactElement, useCallback, useState } from "react";
import Avatar from "react-avatar";
import { Container, FormControl } from "react-bootstrap";
import styles from "../styles/CommentInput.module.css";

type Props = {
  onEnter?: (s: string) => void;
  avatarUri?: string;
  sender?: string;
  placeholder?: string;
};

export default function CommentInput({
  onEnter,
  avatarUri,
  sender,
  placeholder = "我想說...",
}: Props): ReactElement {
  const [comment, setComment] = useState("");

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        onEnter?.(comment);
        setComment("");
        e.preventDefault();
      }
    },
    [comment, onEnter]
  );

  return (
    <Container className={styles.container}>
      <Avatar name={sender} src={avatarUri} size="32" round />
      <FormControl
        as="textarea"
        value={comment}
        rows={(comment.match(/\n/g)?.length || 0) + 1}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </Container>
  );
}
