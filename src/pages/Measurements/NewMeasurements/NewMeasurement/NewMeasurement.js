import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import FormNewMeasurement from "../../../../components/Main/Forms/FormNewMeasurement/FormNewMeasurement"
import H3Module from "../../../../components/Main/Texts/H3Module/H3Module"
export default function Login(props){
    return(
        <MainBackground titlePage="Tworzenie Nowego Pomiaru" widthSize='mid'>
            <H3Module title='Uzupełnij Dane' />
                <FormNewMeasurement />
        </MainBackground>
    )
}