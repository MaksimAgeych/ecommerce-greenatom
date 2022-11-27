import { FC } from "react";
import {Input} from "../index";
import styles from './FormInput.module.css'
import cn from "classnames";

interface IProps {
    label: string;
    value: string;
    type: string;
    required: any;
   onChange: (event: any) => void;
    name: string

}
const FormInput: FC<IProps> = ({ label, ...otherProps }) => {
    // const dispatch = useAppDispatch();
// const handlerSignin = () => {
//    dispatch(setUser())
// }



    return (
        <div className={styles.formInput}>
            {label && <label className={cn(styles.formInputLabel, {
                [styles.shrink] : otherProps.value.length,
            })}>{label}</label>
            }
            <Input className='form-input' {...otherProps} />
        </div>
    )

};

export default FormInput;