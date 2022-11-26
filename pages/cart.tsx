import React from 'react';
import {withLayout} from "../layouts/Layout";
import {Card} from '../components/Card/Card';

 function Cart(): JSX.Element {
    return (
        <div>
            <Card />
        </div>
    );
}

export default withLayout(Cart);