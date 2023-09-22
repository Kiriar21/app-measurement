import style from './ParagraphContent.module.css'

export default function ParagraphContent(props) {
    return (
        <p className={`text-center d-flex justify-content-center py-2 ${style.copyable}`}>
            {props.children}
        </p>
    )
}