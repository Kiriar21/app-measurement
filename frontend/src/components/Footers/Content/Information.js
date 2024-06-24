import Column from '../Columns/Column'
import ParagraphTitle from '../Paragraphs/ParagraphTitle'
import ParagraphContent from '../Paragraphs/ParagraphContent'

export default function Information(props){
    return(
        <Column width='4'>
            <ParagraphTitle title="Nazwa Firmy" />
            <ParagraphContent>
                Organizujemy imprezy sportowe oraz świadczymy profesjonalny pomiar czasu.
            </ParagraphContent>
        </Column>
    )
}