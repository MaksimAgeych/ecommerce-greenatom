import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IProduct} from "../../interface/entities/interface";

export interface WidgetSizeFilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    handleFilterSize: any,
    product: IProduct[];
}
