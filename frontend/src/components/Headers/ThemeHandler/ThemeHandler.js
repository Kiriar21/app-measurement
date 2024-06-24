import {useState, useEffect} from 'react'
import { Col } from 'react-bootstrap'
import styles from '../Header/Header.module.css'

export default function ThemeHundler(props){
    const [, setTheme] = useState('dark');
    const handleChange = (event) => {
        const selectedTheme = event.target.value
        setTheme(selectedTheme)
        localStorage.setItem("theme", selectedTheme)
        changeTheme(selectedTheme)
    }
    const changeTheme = (theme) => {
        document.documentElement.style.setProperty("--bg-color", theme === "light" ? '#8F8F8F' : '#494949')
        document.documentElement.style.setProperty("--main-color", theme === "light" ? '#AEAEAE' : '#000000')
    }

    const loadTheme = () => {
        if(!localStorage.getItem('theme')) {
            localStorage.setItem('theme','dark')
        }
        changeTheme(localStorage.getItem('theme'))
    }

    useEffect(() => {
        loadTheme()
    })
    
        return (
            <Col className='d-flex py-4 justify-content-center'>
                <select id='mode' className={`${styles.select}`} onChange={handleChange} defaultValue={localStorage.getItem('theme')} >         
                    <option value='dark' >Tryb Ciemny</option>
                    <option value='light'>Tryb Jasny</option>        
                </select>   
            </Col>
        )
    }