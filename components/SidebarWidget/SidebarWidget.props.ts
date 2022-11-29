import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface SidebarWidgetProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string,
    children: JSX.Element | string
}