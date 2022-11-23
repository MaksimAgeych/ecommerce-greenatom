import React from 'react';
import styles from './Footer.module.css';
import {FooterProps} from "./Footer.props";
import cn from 'classnames';
import { P } from '../../components';

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div className={cn(className, styles.footerFirstFloor)}>
                <div>
                    <P>ИНФОРМАЦИЯ</P>
                    <a href='#'>
                        Златоустовские ножи в Москве и Московской области
                    </a>
                   <a href='#'>Ножевые стали</a>
                   <a href='#'>О нас</a>
                   <a href='#'>Условия оплаты и доставки</a> 
                </div>
                <div>
                    <P>СЛУЖБА ПОДДЕРЖКИ</P>
                    <a href="#">Контактная информация</a>
                    <a href="#">Возврат товара</a>
                    <a href="#">Карта сайта</a>
                </div>
                <div>
                    <P>ДОПОЛНИТЕЛЬНО</P>
                    <a href="#">Подарочные сертификаты</a>
                    <a href="#">Партнеры</a>
                    <a href="#">Товары со скидкой</a>
                </div>
                <div>
                    <P>ЛИЧНЫЙ КАБИНЕТ</P>
                    <a href="#">Личный кабинет</a>
                    <a href="#">История заказов</a>
                    <a href="#">Мои закладки</a>
                    <a href="#">Рассылка новостей</a>
                </div>
            </div>
            <div>
                <div>

                </div>
            </div>
            <div className={cn()}>

            </div>
        </footer>
    );
};