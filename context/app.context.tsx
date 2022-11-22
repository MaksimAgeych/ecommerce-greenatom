import {createContext, PropsWithChildren, ReactNode, useState} from "react";


export interface IAppContext {

}

export const AppContext = createContext<IAppContext>({});

export const AppContextProvider = ({
                                       children
                                   }: PropsWithChildren<IAppContext> ): JSX.Element => {

    return <AppContext.Provider value={{}}>
        {children}
    </AppContext.Provider>;
};