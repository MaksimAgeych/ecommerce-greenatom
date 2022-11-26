import { useEffect } from 'react';
import { useAppSelector } from '../hooks/redux-hooks';
import {withLayout} from '../layouts/Layout';
import { createUsersProuctDataFromAuth } from '../utils/firebase/firebase.utils';


function Favorites(): JSX.Element {
    
    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)

    useEffect(() => {
     createUsersProuctDataFromAuth(userID, [{id: 1, title: 'phone'}])
     .then((respncse) => console.log(respncse))
    
    
    }, [])
    
   

    return (
        <div>
            Избранное
        </div>
    )
}

export default withLayout(Favorites);