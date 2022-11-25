

const FormInput = ({ label, ...otherProps }) => {
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