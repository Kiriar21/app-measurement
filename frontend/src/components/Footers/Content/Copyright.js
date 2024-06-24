import Column from '../Columns/Column'
import LinkSocial from '../Links/LinkSocial'

export default function Social(props) {
    return (
        <Column width='12'>
            <hr/>
            <div>
                Wszelkie Prawe Zastrzeżone &copy; 2023 Copyright
                <LinkSocial link="https://www.linkedin.com/in/artur-matuszczyk/">   
                    <cite title="LinkedIn Artur Matuszczyk">
                        Artur Matuszczyk
                    </cite>
                </LinkSocial>
            </div>
        </Column>
    )
}