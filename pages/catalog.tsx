import React from 'react';
import {withLayout_leftSidebar} from "../layouts/Layout_LeftSidebar";
import {Cart} from "../components";

function Catalog() : JSX.Element {
    return (
        <div>
            <Cart/>
            <Cart/>
            <Cart/>
            <Cart/>
            <Cart/>
        </div>
    );
}

export default withLayout_leftSidebar(Catalog);