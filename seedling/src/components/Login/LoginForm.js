import React, { useState, useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { post } from '../api/axios'
import {useNavigate } from 'react-router-dom'
import "./forms.css"
import { setCookie } from '../../cookies'

const LoginForm = () => {

    const {setAuth} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        id: "",
        password: ""
    })
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }
        ))
    }
    const login = (e) => {
        e.preventDefault()
        post("/login", JSON.stringify(formData))
        .then(res => {
            setAuth({
                id: formData.id
            })
            setCookie("auth", formData.id, 2)
            setFormData({
                id: "",
                password: ""
            })
            setErrMessage("")
            navigate("/", {replace: true})
        })
        .catch(res => {
            setErrMessage(res.response.data.message)
        })
    }

return (
    <form className='form' onSubmit={login}>
        <label htmlFor='id'>Employee ID:</label>
        <input
            type="text"
            name="id"
            id="id"
            placeholder='Employee ID'
            onChange={handleChange}
            value={formData.id}
            autoComplete="off"
        />
        <label htmlFor='password'>Password:</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder='Password'
            onChange={handleChange}
            value={formData.password}
        />
        {errMessage && <span className='error-message'>{errMessage}</span>}
        <button>Log In</button>
    </form>
    )
}

export default LoginForm