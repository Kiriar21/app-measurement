import {useState} from 'react'
// import { useNavigate } from 'react-router-dom'
import {Form} from 'react-bootstrap'
import MainBackground from "../../components/Main/MainBackground/MainBackground"
import SearchModule from "../../components/Main/Forms/SearchModule/SearchModule"
import TableBody from '../../components/Main/Forms/Homepage/TableBody/TableBody'
import ButtonForm from '../../components/Buttons/ButtonForm/ButtonForm'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
// import H3Module from '../../components/Main/Texts/H3Module/H3Module'
// import LinkSocial from '../../components/Footers/Links/LinkSocial'

export default function Login(props){
    const [searchValue, setSearchValue] = useState('')
    // const navigate = useNavigate()
    const searching = () => {
        console.log(searchValue)
    }

    const theader = ['Data','Nazwa','Miejscowość','Wyniki Oficjalne','Edytuj','Usuń']
    const tbody = [{date:'01.01.2024', name:'Pierwszy Event', city:'Czestochowa',id:'1'}, 
                    {date:'02.02.2024', name:'Drugi Event', city:'Paryż',id:'2'},
                    {date:'31.03.2024', name:'Trzeci Event', city:'Los Angeles',id:'3'}, ]
    
    return(
            <MainBackground titlePage="Wyniki Lokalne">
                <Form className={`m-3`} >
                    <SearchModule controlId='plainTextSearchbarHp' labelText="Wyszukaj po nazwie lub miejscowości" onClick={ e=> searching()}  onChange={e => {setSearchValue(e.target.value)}}/>
                    <TableBody theader={theader} tbody={tbody} />
                    <div className='m-3'>
                    <ButtonForm onClick={ e => {}} className='mx-2'><ChevronLeft /></ButtonForm>
                    <ButtonForm onClick={ e => {}} buttonTitle="1"/>
                    <ButtonForm onClick={ e => {}} className='mx-2'><ChevronRight /></ButtonForm>
                    </div>
                    <span style={{color:'var(--Placeholder-text-color)'}}>Wyników 3 z 3</span>
                </Form>

                {/* <H3Module>
                    Brak Pomiarów.  
                        <ButtonForm className='pb-2 mx-2' onClick={e => {navigate('/new-measurement')}} buttonTitle="Utwórz nowy pomiar" />        
                    i zobacz go na liście.
                </H3Module> */}
                
                {/* <H3Module>
                    Nie wykryto lokalnej bazy danych MongoDB. Zainstaluj ją, żeby móc korzystać z aplikacji.<br />
                        <LinkSocial link='/'>
                            Zobacz poradnik.pdf.
                        </LinkSocial>
                </H3Module> */}

            </MainBackground>
    )
}