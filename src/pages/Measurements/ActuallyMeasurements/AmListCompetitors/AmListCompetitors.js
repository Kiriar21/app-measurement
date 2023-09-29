import React,{ useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import SearchModule from "../../../../components/Main/Forms/SearchModule/SearchModule"
import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import SortsModule from "../../../../components/Main/Forms/SortsModule/SortsModule"
import TableBody from "../../../../components/Main/Forms/ActuallyMeasurement/ListCompetitors/TableBody"
import ModalBasic from "../../../../components/Modals/ModalBasic/ModalBasic"
import FormInput from '../../../../components/Main/Forms/FormInput/FormInput'

export default function Login(props){
    const [file, setFile] = useState('')
    const [searchBar,setSearchBar] = useState('') 
    const [sortSel,setsortSel] = useState('') 
    const [filtrSex,setfiltrSex] = useState('') 
    const [filtrStatus,setfiltrStatus] = useState('')
    const theader =['Lp', 'Nr', 'Zawodnik', 'Płeć', 'Wiek','Data Urodzenia', 'Klasyfikacja', 'Kategoria', 'Kraj', 'Klub', 'Udział', 'Miejscowość', 'Zarządzanie']
    const tbody = [
        {
        counter:1,
        id:1,
        names:'Anna Nowak',
        sex:'K',
        age:23,
        datebirth:'21-07-2000',
        class:'Krotka Nazwa',
        cat:'k20-99',
        country:'POL',
        club:'',
        participant:'Udział',
        city:'Czestochowa'
        }
    ]
    const check = async () => {
        console.log(searchBar,' ',sortSel,' ', filtrSex, ' ', filtrStatus)
    }
    const bodyModal = (
        <React.Fragment>
            <FormInput controlId='fileDataCompetitors'
                        labelText='Wybierz plik z danymi'
                        typeInput='file'
                        onChange={e=>{setFile(e.target.files[0])}}
                        acceptFile='.csv'
                        lg={10}
            />
            <p>Dozwolone pliki: .csv. </p>
            <p>Jeżeli dane już są wgrane, z nowego pliku zostaną dodane tylko te osóby, których nie ma w bazie.</p>
        </React.Fragment>
    )
    useEffect(() => {
        console.log(file)
    }, [file])
    return(
        <MainBackground titlePage="Lista Zawodników">
            <ModalBasic 
                btnModalTitle='Wgraj Dane' formAction='/:id/addCompetitors' 
                modalTitle='Wgrywanie Danych' 
                modalBody={bodyModal}
                modalBtnGreen='Wgraj' 
                secondButton={true}
                secondButtonTitle='Usuń poprzednie dane i zastąp nowymi'
                modalBtnRed='Anuluj'
                alertSuccessContent='Dane zawodników zostały zaktualizowane.'
                />
            <Form className={`m-3`}>
                <SortsModule sortComp={e=>{setsortSel(e)}} filtrSex={e=>{setfiltrSex(e)}} filtrStatus={e=>{setfiltrStatus(e)}}/>
                <SearchModule controlId='sbcompetitors' labelText='Szukaj zawodnika (Zawonika / Numer)' onClick={check} onChange={e=>{setSearchBar(e.target.value)}} />
                <TableBody theader={theader} tbody={tbody}/>
            </Form>
        </MainBackground>
    )
}