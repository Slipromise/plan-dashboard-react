import CommentListItem from "../components/CommentListItem";

type CommentListItemProps = React.ComponentProps<typeof CommentListItem>;

const useFakeComment = (): CommentListItemProps[] => {
  const result: CommentListItemProps[] = [
    {
      authorName: "Connor Henderson",
      content: "ABCD",
      date: "2021-05-17T10:58:46+08:00",
    },
    {
      authorName: "Dylan Henry",
      content: "ABCD",
      date: "2021-02-11T17:25:14+08:00",
    },
    {
      authorName: "Darrell Lucas",
      content: "ABCD",
      date: "2021-05-25T17:19:23+08:00",
    },
    {
      authorName: "Floyd Caldwell",
      content: "ABCD",
      date: "2021-10-15T15:55:48+08:00",
    },
    {
      authorName: "Erik Watkins",
      content: "ABCD",
      date: "2021-12-15T11:59:02+08:00",
    },
    {
      authorName: "Marcus Barnes",
      content: "ABCD",
      date: "2021-09-05T12:52:34+08:00",
    },
    {
      authorName: "William Castro",
      content: "ABCD",
      date: "2021-12-29T22:34:53+08:00",
    },
    {
      authorName: "Louis Thomas",
      content: "ABCD",
      date: "2021-07-20T11:19:17+08:00",
    },
    {
      authorName: "Milton Richardson",
      content: "ABCD",
      date: "2021-12-14T13:53:29+08:00",
    },
    {
      authorName: "Steven Sparks",
      content: "ABCD",
      date: "2021-04-14T06:59:13+08:00",
    },
    {
      authorName: "Derrick Lambert",
      content: "ABCD",
      date: "2021-05-18T17:30:54+08:00",
    },
    {
      authorName: "Helena Santos",
      content: "ABCD",
      date: "2021-03-15T21:25:14+08:00",
    },
    {
      authorName: "Mathilda Guzman",
      content: "ABCD",
      date: "2021-01-10T13:15:50+08:00",
    },
    {
      authorName: "Edward Rose",
      content: "ABCD",
      date: "2021-04-09T02:51:06+08:00",
    },
    {
      authorName: "Bernard Gross",
      content: "ABCD",
      date: "2021-06-25T17:55:38+08:00",
    },
  ];
  return result;
};

export default useFakeComment;
