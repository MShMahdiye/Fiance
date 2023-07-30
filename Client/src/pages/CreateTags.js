import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, TextField } from '@mui/material'
import Logo from '../content/Images/Logo.png'
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
const Me = gql`
  query Query {
    me {
      _id
      name
      username
      img
      myTags {
        name
        _id
        color
      }
      myExpenses {
        _id
        amount
        tags {
          _id
          name
          color
        }
        geo {
          lat
          lon
        }
        date
        address {
          MunicipalityZone
          Neighbourhood
          FormattedAddress
          Place
        }
      }
    }
  }
`

const Createtags = () => {

  const [tagInfo, setTagInfo] = useState({ name: '', })
  const [expense] = useMutation(CreateTags);

  const { loading, error, data } = useQuery(Me)

  console.log('data in me query : ', data);

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
      // navigate('/dashboard/tags')
      window.location.href = '/dashboard/tags'

    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    // <div className='create-tag-container flex justify-center item-center h-[89vh] bg-[#fff]'>
    //   <div className='flex justify-center items-center bg-[#c5e1e488] w-full h-full'>
    //     <div className='flex justify-center item-center rounded bg-[#fff] '>
    //       <div className='flex justify-center item-center rounded '>
    //         <div className='flex justify-center items-center py-[3vw]'>
    //           <div className='w-[40vw] flex flex-col justify-center items-center'>
    //             <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='name' variant='standard' onChange={handleChange} label='نام تگ' /></div>
    //             <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='color' variant='standard' onChange={handleChange} label='رنگ' /></div>
    //             <div className='flex justify-center items-center mb-[2vw] w-[25vw]'>
    //               <div className='w-[8vw] my-[5vw]'>
    //                 <Button fullWidth size='large' variant='contained' onClick={handleCreate}>ثبت</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='create-tag-container flex justify-center item-center h-[89vh] bg-[#fff]'>
      <div className='flex justify-center items-center bg-[#c5e1e4aa] w-full h-full'>
        <div className='flex justify-between w-[50vw] items-center'>
          <div className='flex justify-center items-center'>
            <div className='w-[40vw] flex flex-col justify-center items-center'>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='name' variant='standard' onChange={handleChange} label='نام تگ' /></div>
              <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='color' variant='standard' onChange={handleChange} label='رنگ' /></div>
              <div className='flex justify-center items-center mb-[2vw] w-[25vw]'>
                <div className='w-[8vw] my-[5vw]'>
                  <Button fullWidth size='large' variant='contained' onClick={handleCreate}>ثبت</Button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>{/* <Logo /> */}
            <div ><img width={'500vw'} src={Logo} /></div>
            <div className='text-[3vw] text-[#fff]'>
              <span>Financeee</span>
            </div>
          </div>
        </div>
      </div>

    </m.div>
  )
}

export default Createtags