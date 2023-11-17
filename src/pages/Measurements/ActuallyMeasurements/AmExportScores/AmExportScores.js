import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import H3Module from '../../../../components/Main/Texts/H3Module/H3Module'
import H4Module from "../../../../components/Main/Texts/H4Module/H4Module"
import ModalExport from '../../../../components/Modals/ModalExport/ModalExport'
import ExportFiles from "../../../../components/Downloads/ExportFIles/ExportFiles"

export default function Login(props){
    return(
        <MainBackground titlePage="Exportowanie Wyników">
            <H3Module title='Zarządzanie Wynikami'/>
                <H4Module text="Pobieranie wszystkich wyników. Dla każdej klasyfikacji zostanie pobrany nowy plik.">
                    <ExportFiles />
                    {/* Przerobienie export files na modul ktory bedzie pobieral z eindpointa pliki z wynikami */}
                </H4Module>
                <H4Module text="Chwilowy brak internetu? Dopiero teraz udało się zalogować? Zrób spójność wyników lokalnych z wynikami online.">
                    <ModalExport />
                </H4Module>
        </MainBackground>
    )
}    