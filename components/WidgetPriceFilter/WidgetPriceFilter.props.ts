import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface WidgetPriceFilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    handleFilterMinPrice: any
    handleFilterMaxPrice: any
}
