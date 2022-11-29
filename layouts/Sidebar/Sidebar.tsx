import React, {useEffect, useState} from 'react';
import styles from './Sidebar.module.css';
import {SidebarProps} from "./Sidebar.props";
import cn from "classnames";
import {SidebarWidget} from "../../components";
import WidgetSearchShop from "../../components/WidgetSearchShop/WidgetSearchShop";
import WidgetPriceFilter from "../../components/WidgetPriceFilter/WidgetPriceFilter";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {

    return (
        <div {...props} className={cn(className)}>
            <div className={styles.sidebar}>
                <SidebarWidget name={"Поиск"}>
                    <WidgetSearchShop/>
                </SidebarWidget>
                <SidebarWidget name={"Цена"}>
                    <WidgetPriceFilter />
                </SidebarWidget>
                <SidebarWidget name={"Категории"}>Контент</SidebarWidget>
                <SidebarWidget name={"Длина ножа"}>Контент</SidebarWidget>
            </div>
        </div>
    );
};