import React from 'react';
import styles from './Sidebar.module.css';
import {SidebarProps} from "./Sidebar.props";
import cn from "classnames";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            Сайдбар
        </div>
    );
};