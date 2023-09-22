import Column from '../Columns/Column'
import ParagraphTitle from '../Paragraphs/ParagraphTitle'
import ParagraphContent from '../Paragraphs/ParagraphContent'
import {EnvelopeAtFill, TelephoneFill } from 'react-bootstrap-icons'

export default function Social(props) {
    return (
        <Column width='4'>
            <ParagraphTitle title="Kontakt" />
            <ParagraphContent>
                <EnvelopeAtFill size={30} className='me-3'/> mail@domain.com
            </ParagraphContent>
            <ParagraphContent>
                <TelephoneFill size={30} className='me-3'/> +1 111 111 111
            </ParagraphContent>
        </Column>
    )
}
