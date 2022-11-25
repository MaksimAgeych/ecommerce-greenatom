import React from "react";
import styles from "./ProductDes.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import { IProduct } from '../../interface/entities/interface';

export const ProductDescription = (): JSX.Element => {//на продукт пока заглушка any
    
    
    return (<div className={styles.catDes}>
        <div className={styles.imageDiv}>
            <img src="https://www.zlatmax.ru/images/air-0332/02s.webp" className={styles.image}></img>{/*фото взято из db.json но там оно маленькое поэтому растянул и стало шакальное*/}
        </div>
        <div className={styles.destiptionDiv}>
            <span className={styles.descripTitle}>Описание </span>
            <hr className={styles.line}/>
            <div className={styles.text}>Самой большой популярностью пользуется этот универсальный инструмент - нож «Бекас». Он прост и легок в использовании, даже если Вы впервые взяли в руки «Златоустовский нож». А в руках профессионала ему просто нет равных! У него довольно весомые аргументы качества для того, чтобы обратить на себя внимание – это и режущие свойства, и прочность, и дизайн. Толщина обуха клинка «Бекаса» 2,4 мм. По обе стороны имеются узкие долы, резать «от себя» безопасно, благодаря гарде оптимального размера. Классика исполнения рукояти подчеркивает его привлекательность, и, если Вы собираетесь преподнести этот нож в качестве подарка, будьте уверенны, не ошибетесь! Нож Бекас является ножом туристическим и не относится к холодному оружию. Соответствует требованиям ГОСТ Р 51501-99 «Ножи туристические и специальные спортивные. Общие технические условия». Не требует разрешения на приобретение - Свободная продажа и хранение. На Нож Бекас гарантия 1 год от производственных дефектов.</div>
        </div>
        </div>
    );
}
