import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import FormEditMeasurement from '../../../../components/Main/Forms/ActuallyMeasurement/EditMeasurement/EditMeasurement'
import H3Module from "../../../../components/Main/Texts/H3Module/H3Module"

export default function Edit(props){
    return(
        <MainBackground widthSize='mid' titlePage="Edycja Danych Pomiaru">
            <H3Module title='Uzupełnij Dane' />
            <FormEditMeasurement />
        </MainBackground>
    )
}