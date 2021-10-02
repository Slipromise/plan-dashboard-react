import React from "react";
import TaskCard from "../components/TaskCard";
import { TaskStatus } from "../definitions/common";

type TaskCardProps = React.ComponentProps<typeof TaskCard>;

const useFakeTasks = (): TaskCardProps[] => {
  const result: TaskCardProps[] = [
    {
      title: "就是要對決EP99",
      creatDate: "2021-12-03T02:02:30+08:00",
      status: TaskStatus.ACCEPTING,
      initiatorAvatarUri:
        "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/89804549_2962706110455323_2011861512938848256_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=pWXCyVQBtSQAX95k6Pz&_nc_ht=scontent-tpe1-1.xx&oh=700b6d4b423989da61d6cb90bdda8079&oe=61792319",
      isPublic: false,
      initiator: "Tom",
      statusOptions: [
        TaskStatus.ACCEPTING,
        TaskStatus.COMPLETE,
        TaskStatus.FAIL,
        TaskStatus.INITIAL,
        TaskStatus.PENDING,
        TaskStatus.PROGRESS,
      ],

      comments: 20,
    },
    {
      title: "就是要對決EP99",
      creatDate: "2021-12-03T02:02:30+08:00",
      status: TaskStatus.ACCEPTING,
      initiatorAvatarUri:
        "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/89804549_2962706110455323_2011861512938848256_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=pWXCyVQBtSQAX95k6Pz&_nc_ht=scontent-tpe1-1.xx&oh=700b6d4b423989da61d6cb90bdda8079&oe=61792319",
      isPublic: false,
      initiator: "Tom",
      statusOptions: [
        TaskStatus.ACCEPTING,
        TaskStatus.COMPLETE,
        TaskStatus.FAIL,
        TaskStatus.INITIAL,
        TaskStatus.PENDING,
        TaskStatus.PROGRESS,
      ],
      participators: 10,
    },
    {
      title: "就是要對決EP99",
      creatDate: "2021-12-03T02:02:30+08:00",
      status: TaskStatus.FAIL,
      initiatorAvatarUri:
        "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/89804549_2962706110455323_2011861512938848256_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=pWXCyVQBtSQAX95k6Pz&_nc_ht=scontent-tpe1-1.xx&oh=700b6d4b423989da61d6cb90bdda8079&oe=61792319",
      isPublic: false,
      initiator: "Tom",
      statusOptions: [
        TaskStatus.ACCEPTING,
        TaskStatus.COMPLETE,
        TaskStatus.FAIL,
        TaskStatus.INITIAL,
        TaskStatus.PENDING,
        TaskStatus.PROGRESS,
      ],
      participators: 10,
      comments: 20,
    },
    {
      title: "就是要對決EP99",
      creatDate: "2021-12-03T02:02:30+08:00",
      status: TaskStatus.COMPLETE,
      initiatorAvatarUri:
        "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/89804549_2962706110455323_2011861512938848256_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=pWXCyVQBtSQAX95k6Pz&_nc_ht=scontent-tpe1-1.xx&oh=700b6d4b423989da61d6cb90bdda8079&oe=61792319",
      isPublic: false,
      initiator: "Tom",
      statusOptions: [
        TaskStatus.ACCEPTING,
        TaskStatus.COMPLETE,
        TaskStatus.FAIL,
        TaskStatus.INITIAL,
        TaskStatus.PENDING,
        TaskStatus.PROGRESS,
      ],
      participators: 10,
      comments: 20,
    },
  ];

  return result;
};

export default useFakeTasks;
