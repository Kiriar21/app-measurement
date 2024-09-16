import style from './THeader.module.css'
export default function THeader(props){
    return (
        <th className={`${style.table}` } onClick={props.onClick} style={props.style}>
            {props.title}
        </th>
    )
}