import React,{ useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import TableBody from "../../../../components/Main/Forms/ActuallyMeasurement/AmStatistics/TableBodyStatistic"
import H3Module from '../../../../components/Main/Texts/H3Module/H3Module'
import ModalBasic from '../../../../components/Modals/ModalBasic/ModalBasic'
import FormInput from "../../../../components/Main/Forms/FormInput/FormInput"
import axios from 'axios'

export default function Statistic(props){
    const theader = ['Nazwa klasyfikacji', 'Dystans(KM)', 'Liczba osób startujących', 'Liczba osób na mecie', 'Pozostało', 'Liczba kobiet startujących', 'Liczba kobiet na mecie', 'Pozostało kobiet', 'Liczba mężczyzn startujących', 'Liczba mężczyzn na mecie', 'Pozostało mężczyzn'       ]
    const [tbody, setTbody] = useState([]);
    const {id} = useParams()
    const [file, setFile] = useState('')
    const [dataUpdated, setDataUpdated] = useState(false);

    const modalUploadCSVChild = useRef(null);

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

        if (!file) {
            alert('Proszę wybrać plik CSV przed przesłaniem.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            if(isAdded){
                await axios.post(`/event/${id}/replaceDataCSV`, formData)
            } else {
                await axios.post(`/event/${id}/updateDataCSV`, formData) 
            }

            if(modalUploadCSVChild.current) modalUploadCSVChild.current.handleClose();
            setDataUpdated(prev => !prev);

        } catch (error) {
            console.error('Błąd przesyłania pliku:', error);
            alert('Wystąpił błąd podczas przesyłania pliku');
        }
    }


    const fetchEventStatistics = async (id) => {
        try {
            const response = await axios.get(`/event/${id}/statistics`);
            return response.data.tbody;
        } catch (error) {
            console.error('Error fetching event statistics:', error);
            return null;
        }
    };

    useEffect(() => {
        const loadStatistics = async () => {
            const data = await fetchEventStatistics(id);
            setTbody(data);
        };
    
        loadStatistics();
    }, [id, dataUpdated]);

    return(
        <MainBackground titlePage="Statystyki">
            {
                tbody && tbody.length > 1
                ? (
                    <>
                    <H3Module title='Lista klasyfikacji'/>
                    <TableBody theader={theader} tbody={tbody} />
                    </>
                ) : (
                    <>
                    <H3Module title='Brak informacji o statystkach. 
                    Dodaj plik z danymi zawodników, żeby pojawiły się statystyki.' />
                                <ModalBasic 
                                ref={modalUploadCSVChild}
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
                        </>
                                )
            }
        </MainBackground>
    )
}