import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, TextField } from '@mui/material';

const EditTagMutation = gql`
  mutation Mutation($_id: ID!, $data: tagInfo!) {
    edit_tag(_id: $_id, data: $data) {
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
      myTags {
        _id
        name
        color
      }
    }
  }
`

function EditTag({id}) {

  const [edit] = useMutation(EditTagMutation);
  const [tagInfo, setTagInfo] = useState({ name: '', })
  const [tags, setTags] = useState([])
  const [tagsId, setTagsId] = useState([])
  const { loading, error, data,refetch } = useQuery(Me)

  useEffect(() => {
    setTags(data.me.myTags)
    tags.map((tag) => {
      if (tagsId.indexOf(tag) === -1){
        tagsId.push(tag._id);
        console.log(tagsId);
      }
    })

  }, [data])

  const handleChange = (e) => {
    setTagInfo({ ...tagInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const x = String(id)
    try {

      const { data:{edit_tag:{status}} } = await edit(
        {
          variables: {
            "_id": x ,
            "data": {
              "name": tagInfo.name,
              "color": tagInfo.color,
            }
          },
        }
      )

      if(status == 200){
        refetch()
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='py-[3vw]'>
        <div className='w-[40vw] flex flex-col justify-center items-center'>
          <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='name' variant='outlined' onChange={handleChange} label='نام تگ' /></div>
          <div className='mb-[2vw] w-[25vw]'><TextField fullWidth name='color' variant='outlined' onChange={handleChange} label='رنگ' /></div>
          <div className='flex justify-center items-center mb-[2vw] w-[25vw]'>
            <div className='w-[8vw]'>
              <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>ثبت</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTag