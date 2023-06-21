import * as YUP from "yup";

export const registerValidationSchema = YUP.object({
    username: YUP.string().required('Name is required'),
    email: YUP.string().email('Invalid email').required('Email is required'),
    password: YUP.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

export const loginValidationSchema=YUP.object({
    email: YUP.string().email('Invalid email').required('Email is required'),
    password: YUP.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
})

export const cardValidationSchema=YUP.object({
  title: YUP.string().required('title is required'),
  desc: YUP.string().required('desc is required'),
})