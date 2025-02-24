import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import H3Module from '../../../../components/Main/Texts/H3Module/H3Module'
import H4Module from "../../../../components/Main/Texts/H4Module/H4Module"
import ExportFiles from "../../../../components/Downloads/ExportFIles/ExportFiles"
// import ModalExport from '../../../../components/Modals/ModalExport/ModalExport'
// import { useAuthState } from "../../../../context/index"

export default function Login(props){
    // const userDetails = useAuthState()
    return(
        <MainBackground titlePage="Exportowanie Wyników">
            <H3Module title='Zarządzanie Wynikami'/>
                <H4Module text="Pobieranie wszystkich wyników. Dla każdej klasyfikacji zostanie pobrany nowy plik.">
                    <ExportFiles />
                </H4Module>
                {/* {
                    userDetails.user && (                    
                    <H4Module text="Chwilowy brak internetu? Dopiero teraz udało się zalogować? Zrób spójność wyników lokalnych z wynikami online.">
                        <ModalExport />
                    </H4Module>)
                } */}
        </MainBackground>
    )
}    