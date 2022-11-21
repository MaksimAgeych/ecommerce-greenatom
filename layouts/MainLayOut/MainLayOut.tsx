import React, { FC } from 'react';

interface IProps {
children: React.ReactNode
}
const MainLayOut: FC<IProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default MainLayOut;