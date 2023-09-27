import { Container } from "react-bootstrap"

export default function LineStep(props){
    return (
        <Container fluid className={`${props.className}`}>
            <h6 className="text-start mt-3 mb-5">
                {props.title}
                <hr />
            </h6>
            {props.children}
        </Container>
    )
}