import React, { ReactElement } from "react";
import Avatar from "react-avatar";
import { Badge, Button, Container } from "react-bootstrap";
import styles from "../styles/UserListItem.module.css";

interface Props {
  name: string;
  avatarUri?: string;
  group?: string;
  onJoin?: () => void;
  onDelete?: () => void;
}

export default function UserListItem({
  name = "Minerva Stephens",
  avatarUri,
  group = "Gilbert Payne",
  onDelete = () => {},
  onJoin = () => {},
}: Props): ReactElement {
  return (
    <Container className={styles.container}>
      <Avatar name={name} src={avatarUri} round size="32" />
      <h5>
        {name}
        {group && <Badge>{group} </Badge>}
      </h5>
      {onJoin && <Button onClick={onJoin}>{"邀請"}</Button>}
      {onDelete && <Button onClick={onDelete}>{"刪除"}</Button>}
    </Container>
  );
}
