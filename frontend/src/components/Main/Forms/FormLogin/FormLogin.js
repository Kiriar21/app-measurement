import {Form} from 'react-bootstrap'
import Button from '../../../Buttons/ButtonForm/ButtonForm'
import FormInput from '../FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser, useAuthState, useAuthDispatch } from '../../../../context/index'

export default function FormLogin(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAuthDispatch()
    const {loading, errorMessage} = useAuthState()
    const navigate = useNavigate()

    const check = async (e) => {
        e.preventDefault()
        try{
            const response = await loginUser(dispatch, { email, password})
            console.log(response)
            if(!response.user) return
            navigate(-1);
        } catch(err){
            console.log(err)
        }
    }

    return (
        <Form method='POST'>
            {errorMessage ? errorMessage : null} 
            <FormInput controlId='formPlanTextEmail' 
                        labelText='Adres e-mail' 
                        typeInput='email' 
                        onChange={ e => setEmail(e.target.value)}
                        disabled={loading}
                        placeholder='jan.kowalski@gmail.com' />    
            <FormInput controlId='formPlanTextPasswword' 
                        labelText='Hasło' 
                        typeInput='password'
                        disabled={loading}
                        onChange={ e => setPassword(e.target.value)}
                        placeholder='Hasło'
                        />
            <Button type='submit' onClick={check} disabled={loading} buttonTitle="Zaloguj się"/>
        </Form>
    )
}