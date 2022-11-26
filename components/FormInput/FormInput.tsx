import { FC } from "react";

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
        < div className="group">
            <input className='form-input' {...otherProps} />

            {label && <label className={`${otherProps.value.length ? 'shrink' : ''} 
            form-input-label`}>{label}</label>
            }
      
        </div>
    )

};

export default FormInput;