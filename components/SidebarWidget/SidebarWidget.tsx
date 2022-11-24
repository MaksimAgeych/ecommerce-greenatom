import styles from './SidebarWidget.module.css';
import cn from 'classnames';
import {SidebarWidgetProps} from "./SidebarWidget.props";
import IconArrow from './arrow.svg';
import {useState} from "react";

export const SidebarWidget = ({children, name, className, ...props}: SidebarWidgetProps): JSX.Element => {

    const [isOpened, setIsOpened] = useState<true | false>(true);

    return (
        <div className={styles.widget} {...props}>
            <div className={styles.header}>
                <span className={styles.title}>{name}</span>
                <button className={cn(styles.arrow, {[styles.arrowUp]: !isOpened})}
                        onClick={() => setIsOpened(!Boolean(isOpened))}>
                    <IconArrow/>
                </button>
            </div>
            <div className={cn(styles.content, {
                [styles.hide]: !isOpened
            })}>
                {children}
            </div>
        </div>
    );
};

