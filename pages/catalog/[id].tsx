import React from 'react';
import {IProduct} from "../../interface/entities/interface";
import {Htag, P} from "../../components";
import {withLayout} from "../../layouts/Layout";
import {ProductDescription} from '../../components';
import Head from "next/head";
import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {db, getCollectionByName} from "../../utils/firebase/firebase.utils";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAppSelector} from "../../hooks/redux-hooks";


//SSG
export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
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

export const getStaticProps = async (context: { params: { id: any; }; }) => {
    const id = context.params.id;
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    return {
        props: { product: docSnap.data()}
    }
}

//SSR - не удалять
// export const getServerSideProps = async (context: { params: { id: number; }; }) => {
//     console.log(context)
//     if (!context.params) {
//         return {
//             noFound: true,
//         }
//     }
//     const {id} = context.params;
//     const response = await fetch(`http://localhost:4000/products/${id}`);
//     const data = await response.json();
//     console.log(data)
//     return {
//         props: {product: data}
//     }
// }


function ProductPage({product}: { product: IProduct }): JSX.Element {
    // @ts-ignore
    console.log(product)
    const q = query(collection(db, 'products',))

    const [fetchProd, loading, error] = useCollectionData(q)

    let {id, name, description, about, rating, size, price, img} = product;
    console.log(product.name)
    return (
        <>
            <Head>
                <title>{name} - Магазин ножей</title>
            </Head>
            {/* <Htag tag={'h1'}>{name}</Htag> */}
            <ProductDescription {...product}/>
        </>
    );
}

export default withLayout(ProductPage);