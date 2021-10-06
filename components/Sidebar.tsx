import React, { ReactElement, useState } from "react";
import Avatar from "react-avatar";
import {
  MdMenu,
  MdHome,
  MdAdd,
  MdChecklist,
  MdDesignServices,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { BiArrowFromRight, BiArrowToRight } from "react-icons/bi";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebarProps,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import styles from "../styles/Sidebar.module.css";
import { useTranslation } from "react-i18next";

interface Props extends ProSidebarProps {
  userName: string;
  userAvatarUri?: string;
  plans?: { name: string; id: string }[];
  onClickAddPlan: () => void;
  onClickHome: () => void;
  onClickMyTasks: () => void;
  onClickPlan: (id: string) => void;
}

export default function Sidebar({
  userName,
  userAvatarUri,
  plans,
  onClickAddPlan,
  onClickHome,
  onClickMyTasks,
  onClickPlan,
  ...proSidebarProps
}: Props): ReactElement {
  const { t } = useTranslation();

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const [isPlanMenuOpened, setIsPlanMenuOpened] = useState(true);

  return (
    <ProSidebar
      {...proSidebarProps}
      collapsed={isMenuCollapsed}
      className={styles.container}
    >
      <Menu iconShape="circle">
        <SidebarHeader>
          <Avatar name={userName} round size="32" />
          {!isMenuCollapsed && <h4>{userName}</h4>}
        </SidebarHeader>

        <SidebarContent>
          <MenuItem icon={<MdHome onClick={onClickHome} />}>
            {t("label.plansDashboard")}
          </MenuItem>
          <MenuItem icon={<MdAdd />} onClick={onClickAddPlan}>
            {t("label.addPlans")}
          </MenuItem>
          <MenuItem icon={<MdChecklist />} onClick={onClickMyTasks}>
            {t("label.tasks")}
          </MenuItem>
          {isMenuCollapsed && (
            <MenuItem
              icon={
                isPlanMenuOpened ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )
              }
              onClick={() => setIsPlanMenuOpened(!isPlanMenuOpened)}
            />
          )}
          {isMenuCollapsed && isPlanMenuOpened && (
            <>
              {plans?.map(({ name, id }) => (
                <MenuItem
                  key={id}
                  icon={<Avatar name={name} round size="32" />}
                  onClick={() => onClickPlan(id)}
                >
                  {name}
                </MenuItem>
              ))}
            </>
          )}
          {!isMenuCollapsed && (
            <SubMenu
              icon={<MdDesignServices />}
              open={isPlanMenuOpened}
              title={t("label.plans")}
              onClick={() => setIsPlanMenuOpened(!isPlanMenuOpened)}
            >
              {plans?.map(({ name, id }) => (
                <MenuItem
                  key={id}
                  icon={<Avatar name={name} round size="32" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickPlan(id);
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </SubMenu>
          )}
        </SidebarContent>
        <SidebarFooter>
          <MenuItem
            icon={isMenuCollapsed ? <BiArrowToRight /> : <BiArrowFromRight />}
            onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
          ></MenuItem>
        </SidebarFooter>
      </Menu>
    </ProSidebar>
  );
}
