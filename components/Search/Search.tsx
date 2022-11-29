import React, {useState, KeyboardEvent, Dispatch, SetStateAction, FC} from 'react';
import {SearchProps} from "./Search.props";
import styles from './Search.module.css';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import GlassIcon from './glass.svg';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {IProduct} from '../../interface/entities/interface';
import {clearSerch, searchAct} from '../../store/productsSlice';

export type TSearch = Dispatch<SetStateAction<IProduct[]>>

export const Search = ({className, setSearchResult, ...props}: SearchProps): JSX.Element => {
    const defaultProducts = useAppSelector(state => state.products.products);
    const products = useAppSelector(state => state.products.search);
    const dispatch = useAppDispatch()

    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = (e: string) => {
        if (!e) {
            return dispatch(clearSerch())
        } else {

            const searchResult = defaultProducts.filter((item) => {

                const isFind = item.name.toLowerCase().includes(e.toLowerCase());
                if (isFind) {

                    return item
                }
            })

            return dispatch(searchAct(searchResult))
        }
    }


// export default Search;
    // const handleKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
    //     if(e.key == 'Enter') {
    //         goToSearch();
    //     }
    // };
    // //TODO: Нужно добавить обработку нажатия Enter, onKeyDown - была ошибка с типами. Разобраться.
    return (
        <form className={styles.search} {...props} role="search">
            <Input
                placeholder={"Поиск..."}
                value={search}
                onChange={(e) => {
                    goToSearch(e.target.value)
                    setSearch(e.target.value)
                }}
                className={styles.input}
            ></Input>
            {/* <Button
                appearance={"primary"}
                className={styles.button}
                onClick={(e) => goToSearch(e)}
                aria-label='Искать по сайту'
            > Поиск
            </Button> */}
        </form>
    );
};

