import styles from './Button.module.css';

export const Button = ({children, arrow = 'none', appearance, className, ...props}: ButtonProps): JSX.Element => {
    return (
        <motion.button
            whileHover={{scale: 1.05}}
            className={cn(styles.button, className, {
                [styles.primary]: appearance == 'primary',
                [styles.ghost]: appearance == 'ghost',
            })}
            {...props}
        >
            {children}
            {arrow != 'none' && <span className={styles.arrow, {
                [styles.down]: arrow == 'down',
                [styles.right]: arrow == 'right'
            })}> {<ArrowIcon/>} </span>}
        </motion.button>
    );
};