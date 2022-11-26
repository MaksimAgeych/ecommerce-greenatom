
import styles from '../styles/Home.module.css'
import {Htag, P, Button} from "../components";
import {withLayout} from "../layouts/Layout";
import Link from "next/link";
import { ProductsCatalog } from '../components/ProductsCatalog/ProductsCatalog';


function Home() {
  return (
    <div className={styles.container}>
      {/* <Link href={'/auth'}>Авторизация</Link>
      <Link href={'/cart'}>Корзина</Link>
      <Link href={'/catalog'}>Каталог</Link>
      <Link href={'/favorites'}>Избранное</Link> */}
      <ProductsCatalog />
    </div>



  )
}

export default withLayout(Home);
