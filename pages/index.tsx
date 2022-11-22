import styles from '../styles/Home.module.css'
import {Htag, P, Button} from "../components";
import {withLayout} from "../layouts/Layout";

function Home() {
  return (
    <div className={styles.container}>
        <Htag tag={'h1'}>Заголовок</Htag>
        <P size={'l'}>Привет мир</P>
        <Button appearance={'primary'} >Кнопка</Button>
    </div>
  )
}

export default withLayout(Home);
