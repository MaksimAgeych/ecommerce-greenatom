import {withLayout} from "../layouts/Layout";
import {ProductsCatalog} from '../components/ProductsCatalog/ProductsCatalog';


function Home() {
    return (
        <div>
            <ProductsCatalog/>
        </div>
    )
}

export default withLayout(Home);
