import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface WidgetSearchShopProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    handleFilterSearch: any,
    initSearch?: string | string[]
}
