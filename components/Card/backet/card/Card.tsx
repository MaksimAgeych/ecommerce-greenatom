import React from 'react';
import  './Card.module.css';

export const Card = (): JSX.Element => { 
    return (
        
        <section classNames="section-cart">
            <header classNames="section-cart__header">
                <div classNames="container">
                    <h1 classNames="title-1">
                        Корзина 
                    </h1>
                </div>
            </header>
            <div classNames="section-cart__body">
                    <div classNames="container">
                        <section classNames="cart">
                            <header classNames="cart-header">
                                <div classNames="cart-header_title">товар</div>
                                <div classNames="cart-header_price">цена</div>
                                <div classNames="cart-header_count">количество</div>
                                <div classNames="cart-header_cost">сумма</div>           
                            </header>
                                <section classNames="product">
                                    <div classNames="wrapper">
                                        aaaaaaaa
                                    </div>
                                </section>
                                <footer classNames="cart-footer">
                                    итого:
                                </footer>
                            
                        </section>
                    </div>
            </div>
    </section>
    );

}