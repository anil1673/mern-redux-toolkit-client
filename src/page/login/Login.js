import React from 'react'
import { useFormik } from "formik";
import { loginValidationSchema, registerValidationSchema } from '../../validate.js/validate';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { login } from '../../redux.js';

const loginData = { email: "", password: "" };


const Login = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: loginData,
        validationSchema: loginValidationSchema,
        onSubmit: (values, errors) => {
            console.log(values)
            console.log(values)
            axios.post(`http://localhost:5000/auth/login`, values, {
            }).then((res) => {
                const data=res.data
                localStorage.setItem("user",JSON.stringify(res.data))
                dispatch(login({data}))
                navigate("/")
            }).catch((error) => {
                console.log(error)

            })
        }
    })
    return (
        <>
            <form onSubmit={handleSubmit} method='POST'>
                <h1 className='title'>Login</h1>
                <input type="email" name="email" id="email" required placeholder='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                <input type="text" name="password" id="password" required placeholder='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                <div className="agree">
                    <input type="checkbox" name="" agree id="agree" />
                    <label for="agree">Yes,I agree to all Terms and Policy</label>
                </div>
                <button type="submit">login</button>
            </form>
        </>

    )
}

export default Login