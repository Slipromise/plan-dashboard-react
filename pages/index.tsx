import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import CommentInput from "../components/CommentInput";
import CommentListItem from "../components/CommentListItem";
import TaskCard from "../components/TaskCard";
import TaskStatusDropdown from "../components/TaskStatusDropdown";
import CommentDialog from "../components/CommentDialog";
import useFakeTasks from "../hooks/useFakeTasks";
import styles from "../styles/Home.module.css";
import UserListItem from "../components/UserListItem";
import UserListDialog from "../components/UserListDialog";
import SignDialog from "../components/SignDialog";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSignDialogProps from "../hooks/useSignDialogProps";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import { MdMenu, MdHome, MdAdd, MdChecklist } from "react-icons/md";
import Avatar from "react-avatar";
import Sidebar from "../components/Sidebar";
import PlanCard from "../components/PlanCard";
import PlanCards from "../containers/PlanCards";
import useSidebarProps from "../hooks/useSidebarProps";
import MyTasks from "../containers/MyTasks";
import PlanTasks from "../containers/PlanTasks";

const Home: NextPage = () => {
  const { t } = useTranslation();

  const fakeTasks = useFakeTasks();
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const [userListDialog, setUserListDialog] = useState(false);

  const signDialogProps = useSignDialogProps();

  const sidebarProps = useSidebarProps();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar {...sidebarProps} />
      {/* <PlanCards /> */}
      <MyTasks />
      {/* <PlanTasks></PlanTasks> */}
      <CommentDialog
        show={showCommentDialog}
        onHide={() => setShowCommentDialog(false)}
        centered
      />
      <UserListDialog
        show={userListDialog}
        onHide={() => setUserListDialog(false)}
        centered
      />
      <SignDialog {...signDialogProps}></SignDialog>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
