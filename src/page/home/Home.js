import React, { useEffect } from 'react'
import "./Home.css"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from 'formik';
import { cardValidationSchema, loginValidationSchema } from '../../validate.js/validate';
import axios from 'axios';
import { fetchCard, likeCard, logout } from '../../redux.js';
import { useNavigate } from 'react-router-dom';

const cardData = { title: "", desc: "" };



const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get state
  const state = useSelector((state) => {
    return state.reducer
  })

  // useeffect
  useEffect(async () => {
    dispatch(fetchCard())
  }, [])





  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: cardData,
    validationSchema: cardValidationSchema,
    onSubmit: async (values, errors) => {
      console.log("first")
      await axios.post(`http://localhost:5000/post/addpost/${state.user.user._id}`, values).then((res) => {
        console.log(res.data)
        dispatch(fetchCard())
      }).catch((error) => {
        console.log(error)
      })
    }
  })

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  }

  // handle Like

  const handleLike=async(c)=>{
    console.log(c)
    dispatch(likeCard({postId:c,userId:state.user.user._id}))

    await axios.put(`http://localhost:5000/post/likepost/${state.user.user._id}/${c}`).then((res) => {
        console.log(res.data)
        dispatch(fetchCard())
      }).catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <div class="container">
        <button onClick={handleLogout}>logout</button>
        <div class="form-container">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit} method='POST'>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value={values.title} onChange={handleChange} required />

            <label for="desc">Description:</label>
            <textarea id="desc" name="desc" value={values.desc} onChange={handleChange} required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div class="card-container">
          {
            state.card.map((item) => (


              <div class="card" key={item._id}>
                <h3>{item.title}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis delectus impedit. Est facilis totam, dolorum commodi laborum temporibus quaerat ducimus non saepe, quasi perferendis, unde aperiam consequuntur atque dignissimos?</p>
                <div className="like">
                  <button class="like-button" onClick={()=>handleLike(item._id)}>Like</button>
                  <span >{item.like.length}</span>
                </div>



              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home