import ModalBasic from "../ModalBasic/ModalBasic"
export default function ModalExport(props){
    
    return(
        <ModalBasic 
                btnModalTitle='Spój Wyniki' formAction='/' 
                modalTitle='Spojenie Plików' 
                modalBody='Czy na pewno chcesz zespoić dane lokalne z plikami w Bazie Danych?'
                modalBtnGreen='Zespój Dane' 
                modalBtnRed='Anuluj'
                alertSuccessContent='Wyniki lokalne zostały zespojone z wynikami w Bazie Danych.'
                />
    )
}