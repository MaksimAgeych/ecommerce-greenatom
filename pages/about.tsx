import React from 'react';

import {AboutUs} from '../components/aboutUs/AboutUs';
import {withLayout} from "../layouts/Layout";

function About(): JSX.Element {
    return (
        <div>
           <AboutUs/>
        </div>
    )
}

export default withLayout(About);