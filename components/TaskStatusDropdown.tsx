import React, { ReactElement, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { TaskStatus } from "../definitions/common";
import { ImHourGlass } from "react-icons/im";
import { BsCheck } from "react-icons/bs";
import { MdError } from "react-icons/md";
interface Props {
  disable?: boolean;
  selectedOption: TaskStatus;
  options: TaskStatus[];
}

export default function TaskStatusDropdown({
  disable,
  selectedOption = TaskStatus.INITIAL,
  options = [TaskStatus.ACCEPTING, TaskStatus.FAIL, TaskStatus.COMPLETE],
}: Props): ReactElement {
  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" disabled={disable}>
        {getIcon(selectedOption)}
        {selectedOption}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((s) => (
          <Dropdown.Item key={s}>
            {getIcon(s)}
            {s}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const getIcon = (s: TaskStatus) =>
  s === TaskStatus.COMPLETE ? (
    <BsCheck size={16} />
  ) : s === TaskStatus.FAIL || s === TaskStatus.PENDING ? (
    <MdError size={16} />
  ) : (
    <ImHourGlass size={16} />
  );
