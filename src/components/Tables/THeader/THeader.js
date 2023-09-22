import style from './THeader.module.css'
export default function THeader(props){
    return (
       <th className={`${style.table}`}>{props.title}</th>
    )
}