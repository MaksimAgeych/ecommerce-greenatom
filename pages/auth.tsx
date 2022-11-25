import React from 'react';

import Authentication from '../components/Authentication/Authentication';
import {withLayout} from "../layouts/Layout";

function Auth(): JSX.Element {
    return (
        <div>
            <Authentication />
        </div>
    )
}

export default withLayout(Auth);