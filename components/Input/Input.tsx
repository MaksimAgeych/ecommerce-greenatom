import React, {forwardRef, ForwardedRef} from 'react';
import {InputProps} from "./Input.props";
import styles from './Input.module.css';
import cn from 'classnames';

export const Input = forwardRef(({error, className, ...props}: InputProps, ref:ForwardedRef<HTMLInputElement>):JSX.Element => {
    return (
        <div className={cn(className,styles.inputWrapper)}>
            <input  className={cn(styles.input, {
                [styles.error]: error
            })} ref={ref} {...props}/>
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});