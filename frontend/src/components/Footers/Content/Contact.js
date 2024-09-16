import Column from '../Columns/Column'
import ParagraphTitle from '../Paragraphs/ParagraphTitle'
import ParagraphContent from '../Paragraphs/ParagraphContent'
import {EnvelopeAtFill, TelephoneFill } from 'react-bootstrap-icons'

export default function Social(props) {
    return (
        <Column width='4'>
            <ParagraphTitle title="Kontakt" />
            <ParagraphContent>
                <EnvelopeAtFill size={30} className='me-3'/> pomiar@pomiar.com
            </ParagraphContent>
            <ParagraphContent>
                <TelephoneFill size={30} className='me-3'/> +48 123 456 789
            </ParagraphContent>
        </Column>
    )
}
