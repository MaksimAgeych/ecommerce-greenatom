import React, {useState, Dispatch, SetStateAction} from 'react';
import {SearchProps} from "./Search.props";
import styles from './Search.module.css';
import {Input} from '../Input/Input';
import {IProduct} from '../../interface/entities/interface';

export type TSearch = Dispatch<SetStateAction<IProduct[]>>

export const Search = ({className, setSearchResult, ...props}: SearchProps): JSX.Element => {

    const [search, setSearch] = useState<string>('');

    return (
        <form className={styles.search} {...props} role="search" action="/catalog">
            <Input
                type={'search'}
                name={"search"}
                placeholder={"Поиск..."}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                className={styles.input}
            ></Input>
        </form>
    );
};

