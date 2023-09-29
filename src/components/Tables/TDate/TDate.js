import style from '../THeader/THeader.module.css'
export default function TDate(props){
    return (
        <td colSpan={props.colSpan} className={`${style.table}`}>
            {props.children}
        </td>
    )
}