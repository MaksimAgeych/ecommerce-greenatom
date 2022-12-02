import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {ProductsCatalog} from "../../components/ProductsCatalog/ProductsCatalog";
import {withLayout_leftSidebar} from "../../layouts/Layout_LeftSidebar";
import {auth} from '../../utils/firebase/firebase.utils';

function Index(): JSX.Element {

    const [user, loading, error] = useAuthState(auth);
    const router = useRouter()

    

    return (
        <>
        
         <div>
            <ProductsCatalog />
        </div> 
        </>
  );  
       
}

export default withLayout_leftSidebar(Index);