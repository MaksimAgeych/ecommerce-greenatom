
import styles from '../styles/Home.module.css'
import {Htag, P, Button} from "../components";
import {withLayout} from "../layouts/Layout";
import Link from "next/link";


function Home() {
  return (
          <div className={styles.container}>
        <Htag tag={'h1'}>Заголовок</Htag>
        <P size={'l'}>Привет мир</P>
        <Button appearance={'primary'}>Кнопка</Button>
        <Link href={'/auth'}>Авторизация</Link>
        <Link href={'/cart'}>Корзина</Link>
        <Link href={'/catalog'}>Каталог</Link>
        <Link href={'/favorites'}>Избранное</Link>
    </div>



  )
}

export default withLayout(Home);
