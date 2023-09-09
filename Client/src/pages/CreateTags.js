import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, TextField } from '@mui/material'
import Logo from '../content/Images/light-logo.png'
import '../components/component_css/Tags.css'
import { motion as m } from 'framer-motion'

const CreateTags = gql`
  mutation Create_tag($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
}
`

const Createtags = () => {

  const [tagInfo, setTagInfo] = useState({ name: '', })
  const [expense] = useMutation(CreateTags);

  const handleChange = (e) => {
    setTagInfo({ ...tagInfo, [e.target.name]: e.target.value })
  }

  const handleCreate = async () => {
    try {
      const { data } = await expense(
        {
          variables: {
            "data": {
              "name": tagInfo.name,
              "color": tagInfo.color
            }
          }
        }
      )

      console.log('data : ', data);
      window.location.href = '/dashboard/tags'

    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='create-tag-container flex justify-center item-center h-[89vh] bg-[#fff]'>
      <div className='flex justify-center items-center bg-[#c5e1e4aa] w-full h-full'>
        <div className='form-logo-container flex justify-between w-[60vw] items-center'>
          <div className='flex justify-center items-center'>
            <div className='fields-with-border flex flex-col justify-center items-center border-l-2 border-[#fff] border-solid'>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='name' variant='standard' onChange={handleChange} label='نام تگ' /></div>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='color' variant='standard' onChange={handleChange} label='رنگ' /></div>
              <div className='flex justify-center items-center w-[25vw]'>
                <div className='w-[8vw] my-[2vw]'>
                  <Button fullWidth size='large' variant='contained' onClick={handleCreate}>ثبت</Button>
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

export default Createtags