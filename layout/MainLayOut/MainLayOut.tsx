import React, { FC } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface IProps {
children: React.ReactNode
}
const MainLayOut: FC<IProps> = ({children}) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayOut;