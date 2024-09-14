import React,{ useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Form } from "react-bootstrap"
import SearchModule from "../../../../components/Main/Forms/SearchModule/SearchModule"
import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import SortsModule from "../../../../components/Main/Forms/SortsModule/SortsModule"
import TableBody from "../../../../components/Main/Forms/ActuallyMeasurement/ListCompetitors/TableBody"
import ModalBasic from "../../../../components/Modals/ModalBasic/ModalBasic"
import FormInput from '../../../../components/Main/Forms/FormInput/FormInput'

export default function Login(props){
    const {id} = useParams()
    const [file, setFile] = useState('')
    const [searchBar,setSearchBar] = useState('') 
    const [sortSel,setsortSel] = useState('') 
    const [filtrSex,setfiltrSex] = useState('') 
    const [filtrStatus,setfiltrStatus] = useState('')
    const theader =['Lp', 'Nr', 'Zawodnik', 'Płeć', 'Wiek','Data Urodzenia', 'Klasyfikacja', 'Kategoria', 'Kraj', 'Klub', 'Udział', 'Miejscowość', 'Zarządzanie']
    //dodać pobieranie danych z serwera
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
                        name='file'
                        enctype='multipart/form-data'
                        onChange={e=>{setFile(e.target.files[0])}}
                        acceptFile='.csv'
                        lg={10}
            />
            <p>Dozwolone pliki: .csv. </p>
            <p>Jeżeli dane już są wgrane, z nowego pliku zostaną dodane tylko te osóby, których nie ma w bazie.</p>
        </React.Fragment>
    )

    const uploadCSV = async (e, isAdded) => {
        e.preventDefault();

        if (!file) {
            alert('Proszę wybrać plik CSV przed przesłaniem.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
    
            let response = await fetch(`http://localhost:5001/api/event/${id}/updateDataCSV`, {
                method: 'POST',
                body: formData,
            });

            if(isAdded){
                response = await fetch(`http://localhost:5001/api/event/${id}/replaceDataCSV`, {
                    method: 'POST',
                    body: formData,
                });
            }
                
                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                } else {
                    const errorData = await response.json();
                    alert(`Błąd: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Błąd przesyłania pliku:', error);
                alert('Wystąpił błąd podczas przesyłania pliku');
            }
    }

    useEffect(() => {
        console.log(file)
    }, [file])
    return(
        <MainBackground titlePage="Lista Zawodników">
            <ModalBasic 
                btnModalTitle='Wgraj Dane'
                modalTitle='Wgrywanie Danych' 
                modalBody={bodyModal}
                modalBtnGreen='Wgraj' 
                secondButton={true}
                ownFunctions={true}
                onClick={e => uploadCSV(e, false)}
                onClick2={e => uploadCSV(e, true)}
                onClose={()=>{setFile('')}}
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