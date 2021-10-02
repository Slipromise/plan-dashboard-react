import React, { ReactElement, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import useFakeUsers from "../hooks/useFakeUsers";
import UserListItem from "./UserListItem";
import styles from "../styles/UserListDialog.module.css";

interface Props extends React.ComponentProps<typeof Modal> {
  title?: string;
  users?: React.ComponentProps<typeof UserListItem>[];
  onSearch?: (value: string) => void;
}

export default function UserListDialog({
  title,
  // users,
  onSearch,
  ...modalProps
}: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const users = useFakeUsers();
  return (
    <Modal {...modalProps} className={styles.container}>
      <Modal.Header>
        <Modal.Title>{title || "成員"}</Modal.Title>{" "}
      </Modal.Header>
      {onSearch && (
        <InputGroup>
          <Button onClick={() => onSearch(searchValue)}>{"搜尋"}</Button>
          <FormControl
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="我想找..."
          />
        </InputGroup>
      )}

      <Modal.Body>
        {(!users || users.length === 0) && "尚無成員"}
        {users?.map((props, i) => (
          <UserListItem {...props} key={i} />
        ))}
      </Modal.Body>
    </Modal>
  );
}
