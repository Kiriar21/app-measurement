import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Form} from 'react-bootstrap'
import MainBackground from "../../components/Main/MainBackground/MainBackground"
import SearchModule from "../../components/Main/Forms/SearchModule/SearchModule"
import TableBody from '../../components/Main/Forms/Homepage/TableBody/TableBody'
import ButtonForm from '../../components/Buttons/ButtonForm/ButtonForm'
import H3Module from '../../components/Main/Texts/H3Module/H3Module'

export default function Login(props){
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const searching = () => {
        console.log(searchValue)
        try{
                // Dodać pobieranie biegów po searchvalue
        } catch (e) {

        }
    }
    const theader = ['Data','Nazwa','Miejscowość','Edytuj','Usuń']
    const tbody = [
            {
                date:'01.01.2024', 
                name:'Pierwszy Event',
                city:'Czestochowa',
                id:'1'
            },{
                date:'02.02.2024',
                name:'Drugi Event', 
                city:'Paryż',
                id:'2'
            },{
                date:'31.03.2024',
                name:'Trzeci Event', 
                city:'Los Angeles',
                id:'3'
            } 
        ]
    // Dodać już pobieranie tbody z serwera na przyszłośc 
    return(
            <MainBackground titlePage="Wyniki Lokalne">
                <Form>
                    <H3Module title='Nowy pomiar'>
                    <ButtonForm onClick={e=>{navigate('/new-measurement')}} buttonTitle='Utwórz nowy pomiar'/>
                    <hr />
                    </H3Module>
                </Form>
                <Form className={`m-3`} >
                    <SearchModule controlId='plainTextSearchbarHp' labelText="Wyszukaj po nazwie lub miejscowości" onClick={ e=> searching()}  onChange={e => {setSearchValue(e.target.value)}}/>
                    <TableBody theader={theader} tbody={tbody} />
                </Form>
                {/* Logika dla braku wyników itp */}
            </MainBackground>
    )
}