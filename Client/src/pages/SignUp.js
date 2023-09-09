import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { gql, useMutation } from "@apollo/client"
import { useState } from 'react'
import { motion as m } from 'framer-motion';
import Logo from '../content/Images/light-logo.png'
import '../components/component_css/Tags.css'

const SignUpMutation = gql`
  mutation Mutation($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`

const cookies = new Cookies();

function SignUp() {

  const [userInfo, setUserInfo] = useState({ name: '', })
  const [submit] = useMutation(SignUpMutation)

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

    try {

      const { data: { signup: { token } } } = await submit(
        {
          variables: {
            name: userInfo.name,
            username: userInfo.username,
            password: userInfo.pass
          }
        }
      )
      cookies.set('token', token);
      if (token) {
        window.location.href = "/dashboard/hazine";
      }

    } catch (error) {
      console.log(error);
      alert(error)
      setUserInfo({ username: '', pass: '', name: '' })
    }
  }

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='create-tag-container flex justify-center item-center h-[100vh] bg-[#fff]'>
      <div className='absolute top-1 right-1 text-white'><Link to={'/login'}>ورود</Link></div>
      <div className='flex justify-center items-center bg-[#c5e1e4aa] w-full h-full'>
        <div className='form-logo-container flex justify-between w-[60vw] items-center'>
          <div className='flex justify-center items-center'>
            <div className='fields-with-border flex flex-col justify-center items-center border-l-2 border-[#fff] border-solid'>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name="name" variant='standard' onChange={handleChange} label='نام' /></div>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name="username" variant='standard' onChange={handleChange} label='نام کاربری' /></div>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name="pass" variant='standard' onChange={handleChange} label='رمز عبور' /></div>
              <div className='flex justify-center items-center w-[25vw]'>
                <div className='w-[8vw] my-[2vw]'>
                <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>ثبت</Button>
                </div>
              </div>
            </div>
          </div>
          <div className='logo-container flex justify-center items-center m-4'>
            <div ><img width={'1000vw'} src={Logo} /></div>
          </div>
        </div>
      </div>

    </m.div>
  )
}

export default SignUp