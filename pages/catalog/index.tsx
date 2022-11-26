import React from 'react';
import {ProductsCatalog} from "../../components/ProductsCatalog/ProductsCatalog";
import {withLayout_leftSidebar} from "../../layouts/Layout_LeftSidebar";

function Index(): JSX.Element {
    return (
        <div>
            <ProductsCatalog/>
        </div>
    );
}

export default withLayout_leftSidebar(Index);