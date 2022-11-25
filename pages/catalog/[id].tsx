import React from 'react';
import {IProduct} from "../../interface/entities/interface";
import {Htag, P} from "../../components";
import {withLayout} from "../../layouts/Layout";
import { ProductDescription } from '../../components';
//SSG
export const getStaticPaths = async () => {
    const response = await fetch('http://localhost:4000/products');
    const data: IProduct[] = await response.json();

    const paths = data.map(({id}) => ({
        params: {id: id.toString()},
    }));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps = async (context: { params: { id: any; }; }) => {
    const {id} = context.params;
    const response = await fetch(`http://localhost:4000/products/${id}`);
    const data = await response.json();
    console.log(data)
    return {
        props: {product: data}
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
    let {id, name, description, about, rating, size, price, img} = product;
    console.log(product.name)
    return (
        <>
            {/* <Htag tag={'h1'}>{name}</Htag> */}
            <ProductDescription {...product}/>
        </>
    );
}

export default withLayout(ProductPage);