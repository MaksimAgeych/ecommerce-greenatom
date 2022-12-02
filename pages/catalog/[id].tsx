import React from 'react';
import {IProduct} from "../../interface/entities/interface";
import {Htag, P} from "../../components";
import {withLayout} from "../../layouts/Layout";
import {ProductDescription} from '../../components';
import Head from "next/head";
import {collection, doc, getDoc, getDocs, Query, query, QueryDocumentSnapshot} from "firebase/firestore";
import {db, getCollectionByName} from "../../utils/firebase/firebase.utils";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAppSelector} from "../../hooks/redux-hooks";


export const converter = {
    toFirestore: (data: IProduct) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as IProduct
}

//SSG
export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'products').withConverter(converter));
    const paths = snapshot.docs.map(doc => {
        return {
            params: {id: doc.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: { params: { id: string; }; }) => {
    try{
        const id = context.params.id;
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef.withConverter(converter));
        return {
            props: { product: docSnap.data()}
        }
    } catch {
        return {
            props: { product: null}
        }
    }

}



function ProductPage({product}: { product: IProduct }): JSX.Element {


    return (
        <>
            <Head>
                <title>
                    {/* {name} -  */}
                
                Магазин ножей</title>
            </Head>
          
            <ProductDescription {...product}/>
        </>
    );
}

export default withLayout(ProductPage);