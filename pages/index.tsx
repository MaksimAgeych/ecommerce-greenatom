import {Htag, P, Button} from "../components";
import {withLayout} from "../layouts/Layout";
import {ProductsCatalog} from '../components/ProductsCatalog/ProductsCatalog';

function Home() {

  return (
    <div className="">
      {/* <Link href={'/auth'}>Авторизация</Link>
      <Link href={'/cart'}>Корзина</Link>
      <Link href={'/catalog'}>Каталог</Link>
      <Link href={'/favorites'}>Избранное</Link> */}
      <ProductsCatalog />
    </div>
  )

}

export default withLayout(Home);
