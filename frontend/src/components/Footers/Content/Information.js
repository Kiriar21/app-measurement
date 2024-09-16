import Column from '../Columns/Column'
import ParagraphTitle from '../Paragraphs/ParagraphTitle'
import ParagraphContent from '../Paragraphs/ParagraphContent'

export default function Information(props){
    return(
        <Column width='4'>
            <ParagraphTitle title="Nazwa Firmy" />
            <ParagraphContent>
                Świadczymy usługi profesjonalnego pomiaru czasu na twoich danych. Ty dostarczasz nam listę zawodników, a my zajmujemy się resztą. Doświadczony zespół jest w stanie zmierzyć czas nawet największej ilości zawodników w krótkim czasie na chipach RFID - zarówno jednorazowych jak również wielokrotnego użytku.
            </ParagraphContent>
        </Column>
    )
}