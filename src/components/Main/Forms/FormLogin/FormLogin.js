import {Form} from 'react-bootstrap'
import Button from '../../../Buttons/ButtonForm/ButtonForm'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
// import {useState} from 'react'


export default function FormLogin(props){
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const check = async (e) => {
        e.preventDefault()
        try{
            navigate(-1);
        } catch(err){
            console.log(err)
        }
    }
    return (
        <Form method='POST' action='/' onSubmit={check}>
            <FormInput controlId='formPlanTextEmail' 
                        labelText='Adres e-mail' 
                        typeInput='email' 
                        // onChange={ e => setEmail(e.target.value)}
                        placeholder='jan.kowalski@gmail.com' />    
            <FormInput controlId='formPlanTextPasswword' 
                        labelText='Hasło' 
                        typeInput='password' 
                        // onChange={ e => setPassword(e.target.value)}
                        placeholder='Hasło'
                        />
            <Button type='submit' buttonTitle="Zaloguj się"/>
        </Form>
    )
}