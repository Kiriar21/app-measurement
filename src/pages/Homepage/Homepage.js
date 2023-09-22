import {useState} from 'react'
import {Form} from 'react-bootstrap'
import MainBackground from "../../components/Main/MainBackground/MainBackground"
import SearchModule from "../../components/Main/Forms/SearchModule/SearchModule"
import TableBody from '../../components/Main/Forms/Homepage/TableBody/TableBody'
import ButtonForm from '../../components/Buttons/ButtonForm/ButtonForm'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

export default function Login(props){
    const [searchValue, setSearchValue] = useState('')
    const searching = () => {
        console.log(searchValue)
        alert('a')
    }

    const theader = ['Data','Nazwa','Miejscowość','Wyniki Oficjalne','Edytuj','Usuń']
    const tbody = [{date:'01.01.2024', name:'Pierwszy Event', city:'Czestochowa',id:'1'}, 
                    {date:'02.02.2024', name:'Drugi Event', city:'Paryż',id:'2'},
                    {date:'31.03.2024', name:'Trzeci Event', city:'Los Angeles',id:'3'}, ]
    
    return(
        <MainBackground titlePage="Wyniki Lokalne">
            <Form action='/' className={`m-3`} >
                <SearchModule controlId='plainTextSearchbarHp'  onChange={e => {setSearchValue(e.target.value)}}/>
                <TableBody theader={theader} tbody={tbody} />
                <div className='m-3'>
                <ButtonForm onClick={ e => {}} className='mx-2'><ChevronLeft /></ButtonForm>
                <ButtonForm onClick={ e => {}} buttonTitle="1"/>
                <ButtonForm onClick={ e => {}} className='mx-2'><ChevronRight /></ButtonForm>
                </div>
                <span style={{color:'var(--Placeholder-text-color)'}}>Wyników 3 z 3</span>
            </Form>
        </MainBackground>
    )
}