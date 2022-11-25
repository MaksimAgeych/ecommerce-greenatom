import React from 'react';
import {withLayout} from "../../layouts/Layout";
import {IProduct} from "../../interface/entities/interface";
import {GetServerSideProps, GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {ParsedUrlQuery} from "querystring";
import {Htag} from "../../components";


// export const getStaticPatch: GetStaticPaths = async () => {
//     const response = await fetch('http://localhost:4000/products');
//     const data:IProduct[] = await response.json();
//
//     const paths = data.map(({id}) => ({
//         params: {id: id.toString()},
//     }));
//
//     return {
//         paths,
//         fallback: true
//     };
// }


export const getServerSideProps = async (context: { params: { id: any; }; }) => {

    console.log(context)
    if (!context.params) {
        return {
            noFound: true,
        }
    }
    const {id} = context.params;
    const response = await fetch(`http://localhost:4000/products/${id}`);
    const data = await response.json();
    console.log(data)
    return {
        props: {product: data}
    }

}



// @ts-ignore
function ProductPage({product}, ...props: any): JSX.Element {
    // let {id, name} = props.product
    console.log(product)
    return (
        <div>
            <Htag tag={'h1'}>Товар</Htag>
            Товар
        </div>
    );
}

export default ProductPage;