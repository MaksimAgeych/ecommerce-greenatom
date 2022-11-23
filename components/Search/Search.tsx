
import React, {useState, KeyboardEvent} from 'react';
import {SearchProps} from "./Search.props";
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import GlassIcon from './glass.svg';
import {useRouter} from "next/router";

export const Search = ({className, ...props}: SearchProps):JSX.Element => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = () => {
        void router.push({
            pathname: `/search`,
            query: {
                q: search,
            }
        });
    };

// export default Search;
    const handleKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
        if(e.key == 'Enter') {
            goToSearch();
        }
    };
    //TODO: Нужно добавить обработку нажатия Enter, onKeyDown - была ошибка с типами. Разобраться.
    return (
        <form className={styles.search} {...props} role="search">
            <Input
                placeholder={"Поиск..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.input}
            ></Input>
            <Button
                appearance={"primary"}
                className={styles.button}
                onClick={goToSearch}
                aria-label='Искать по сайту'
            > Поиск
            </Button>
        </form>
    );
};

