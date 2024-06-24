export default function H3Module(props){
    return (
        <h3 className={`mb-5 ${props.className}`}>
            {props.title}
            <br />
            {props.children}
        </h3>
    )
}