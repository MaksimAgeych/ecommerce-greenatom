import {DetailedHTMLProps, HTMLAttributes} from "react";
import { TSearch } from "./Search";

export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
setSearchResult: TSearch
}
