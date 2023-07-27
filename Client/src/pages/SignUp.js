import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import {gql,useMutation} from "@apollo/client"
import { useState } from 'react'

const SignUpMutation =gql`
  mutation Mutation($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`

const cookies = new Cookies();

function SignUp() {

  const [userInfo,setUserInfo] = useState({name:'',})
  const [submit] = useMutation(SignUpMutation)

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

    try{

      const {data:{signup:{token}}} = await submit(
        {
          variables: {
            name: userInfo.name,
            username: userInfo.username,
            password: userInfo.pass
          }
        }
      )
      cookies.set('token',token);
      if(token){
        window.location.href = "/dashboard/allexpenses";
      } 

    }catch(error){
      console.log(error);
      alert(error)
      setUserInfo({username:'',pass:'',name:''})
    }
  }
  
  return (
    <div className='px-[3vw] py-[1vw] h-screen'>
      <div className='text-[1vw] text-[#6C63FF] flex justify-between'><div><Link to={'/login'}>ورود</Link></div><div></div></div>
      <div className='flex h-[90%] justify-center items-center'>
        <div className='flex justify-center items-center'>
          <div>
            <div className='py-[3vw]'>
              <div className='w-[40vw] flex flex-col justify-center items-center'>
                <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name="name" variant='standard' onChange={handleChange} label='نام' /></div>
                <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name="username" variant='standard' onChange={handleChange} label='نام کاربری' /></div>
                <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name="pass" variant='standard' onChange={handleChange} label='رمز عبور' /></div>
                <div className='flex justify-center items-center mb-[2vw] w-[25vw]'>
                  <div className='w-[8vw]'>
                    <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>ثبت</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp