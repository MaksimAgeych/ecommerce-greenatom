import React from 'react';
import styles from './Sidebar.module.css';
import {SidebarProps} from "./Sidebar.props";
import cn from "classnames";
import {SidebarWidget} from "../../components";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            <SidebarWidget name={"Цена"}>Контент</SidebarWidget>
            <SidebarWidget name={"Категории"}>Контент</SidebarWidget>
            <SidebarWidget name={"Длина ножа"}>Контент</SidebarWidget>
        </div>
    );
};