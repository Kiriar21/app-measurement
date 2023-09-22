import LinkSocial from '../Links/LinkSocial'
import Column from '../Columns/Column'

export default function Social(props) {
    return (
        <Column width='12'>
            <LinkSocial typeTarget="_self" link="/politics">
                Polityka Prywatności i Informacje Prawne
            </LinkSocial>
        </Column>
    )
}