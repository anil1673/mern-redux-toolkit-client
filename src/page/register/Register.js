import React from 'react'
import { useFormik } from "formik";
import { registerValidationSchema } from '../../validate.js/validate';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const registerData = { username: "", email: "", password: "" };

const Register = () => {
    const navigate=useNavigate();
    const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: registerData,
        validationSchema: registerValidationSchema,
        onSubmit: (values, errors) => {
            console.log(values)
            const formData = new FormData();
            console.log("first")
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            console.log(formData)

            axios.post(`http://localhost:5000/auth/register`, values, {
               
            }).then((res) => {
                console.log(res.data)
                navigate("/login")
            }).catch((error) => {
                console.log(error)

            })
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit} method='POST'>
                <h1 className='title'>Register</h1>
                <input type="text" name="username" id="username" required placeholder='fullname' value={values.username} onChange={handleChange} onBlur={handleBlur} />
                <input type="email" name="email" id="email" required placeholder='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                <input type="text" name="password" id="password" required placeholder='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                <div className="agree">
                    <input type="checkbox" name="" agree id="agree"/>
                    <label for="agree">Yes,I agree to all Terms and Policy</label>
                </div>
                <button type="submit"  >Register</button>
            </form>
        </>
    )
}

export default Register