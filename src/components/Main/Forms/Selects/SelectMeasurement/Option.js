import style from '../../FormInput/FormInput.module.css'

export default function FormInput(props){
    return(
        <option value={props.value} className={`${style.bg} my-3`}>
            {props.title}
        </option>
    )
}
