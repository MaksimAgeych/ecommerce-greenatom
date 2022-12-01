import React from 'react';
import {SidebarProps} from "./Sidebar.props";
import cn from "classnames";
import WidgetFilter from "../../components/WidgetFilter/WidgetFilter";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {

    return (
        <div {...props} className={cn(className)}>
            <WidgetFilter/>
        </div>
    );
};