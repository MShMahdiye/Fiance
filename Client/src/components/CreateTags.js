import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, TextField } from '@mui/material'

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

const  Createtags = () => {

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

    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <div className='flex justify-center items-center py-[3vw]'>
        <div className='w-[40vw] flex flex-col justify-center items-center'>
          <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='name' variant='outlined' onChange={handleChange} label='نام تگ' /></div>
          <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='color' variant='outlined' onChange={handleChange} label='رنگ' /></div>
          <div className='flex justify-center items-center mb-[2vw] w-[25vw]'>
            <div className='w-[8vw]'>
              <Button fullWidth size='large' variant='contained' onClick={handleCreate}>ثبت</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  Createtags