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
                    <P className={cn(className, styles.title)}>ИНФОРМАЦИЯ</P>
                    <a href='#'>
                        Златоустовские ножи<br />
                        в Москве и Московской<br />
                        области
                    </a>
                   <a href='#'>Ножевые стали</a>
                   <a href='#'>О нас</a>
                   <a href='#'>Условия оплаты и доставки</a>
                </div>
                <div >
                    <P className={cn(className, styles.title)}>СЛУЖБА ПОДДЕРЖКИ</P>
                    <a href="#">Контактная информация</a>
                    <a href="#">Возврат товара</a>
                    <a href="#">Карта сайта</a>
                </div>
                <div >
                    <P className={cn(className, styles.title)}>ДОПОЛНИТЕЛЬНО</P>
                    <a href="#">Подарочные сертификаты</a>
                    <a href="#">Партнеры</a>
                    <a href="#">Товары со скидкой</a>
                </div>
                <div>
                    <P className={cn(className, styles.title)}>ЛИЧНЫЙ КАБИНЕТ</P>
                    <a href="#">Личный кабинет</a>
                    <a href="#">История заказов</a>
                    <a href="#">Мои закладки</a>
                    <a href="#">Рассылка новостей</a>
                </div>
            </div>
            <div className={cn(className, styles.footerSecondFloor)}>
                <P>Все материалы, размещенные на сайте, носят справочный характер и не являются<br /> 
                публичной офертой, определяемойположениями Статьи 437 Гражданского кодекса Российской Федерации.<br /> 
                При копировании материалов гиперссылка на www.zlatmax.ru обязательна!</P>
                <P>Златоустовские ножи www.zlatmax.ru ©</P>
            </div>
        </footer>
    );
};