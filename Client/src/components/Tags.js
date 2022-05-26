import { gql, useMutation, useQuery } from '@apollo/client';
import { alpha } from '@material-ui/core';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import './component_css/Tags.css'
import { SketchPicker, BlockPicker } from "react-color";
import { Link } from 'react-router-dom';

const EditTagMutation = gql`
  mutation Mutation($_id: ID!, $data: tagInfo!) {
    edit_tag(_id: $_id, data: $data) {
      status
      msg
    }
  }
`

const myTags = gql`
  query Query {
    getMyTags {
      _id
      name
      color
    }}
`

function Tags() {

  const [show, setShow] = useState(false)
  const [initialTags, setInitialTags] = useState([])
  const [id, setId] = useState('')
  const [edit] = useMutation(EditTagMutation);
  const [tagInfo, setTagInfo] = useState({ name: '', })
  const [tags, setTags] = useState([])
  const [tagsId, setTagsId] = useState([])
  const { loading, error, data, refetch } = useQuery(myTags)
  const [somenewtags, setsomenewtags] = useState([])
  const [isModaldisplayed, setisModaldisplayed] = useState(false)

  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const { r, g, b, a } = sketchPickerColor;

  useEffect(() => {

    if (data) {

      console.log('get my tags : ', data.getMyTags);
      setInitialTags(data.getMyTags)
      setsomenewtags(data.getMyTags.map(item => ({ ...item, isSelected: false })))

      console.log('tags : ', tags);
      tags.map((tag) => {
        if (tagsId.indexOf(tag) === -1) {
          tagsId.push(tag._id);
          console.log(tagsId);
        }
      })
      console.log('tags Id : ', tagsId);

    }

  }, [data])

  const handleChange = (e) => {
    setTagInfo({ ...tagInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    console.log('id from props :', id);
    const x = String(id)
    console.log('id from props after convert :', x);
    try {

      const { data: { edit_tag: { status } } } = await edit(
        {
          variables: {
            "_id": x,
            "data": {
              "name": tagInfo.name,
              "color": `rgba(${r},${g},${b},${a})`,
            }
          },
        }
      )

      if (status == 200) {
        refetch()
      }

    } catch (error) {
      console.log(error);
    }

    setTagInfo({ name: '', color: '' })

  }

  if (error) return <h1> error </h1>

  if (loading) return <h1> Loading </h1>

  return (
    <div>
      {
        somenewtags.map((tag, i) => {
          return (
            <div
              style=
              {{
                padding: '1vw 2vw', borderRadius: 12, cursor: 'pointer'
              }}
              className='mb-[2vw] flex flex-col items-center' key={tag._id} onClick={() => {
                setId(tag._id);
                const arr = [...somenewtags]
                arr[i].isSelected = true
                setsomenewtags(arr)
              }}>
              {
                <div className='flex justify-between'>
                  <div className='flex justify-center items-center'><div className='w-[0.5vw] h-[0.5vw] rounded-full' style={{ background: `${tag.color}` }}></div></div>
                  <div className='w-[5vw] mx-[1vw] flex justify-right items-center'>{tag.name}</div>
                  <div className='w-[40vw] flex justify-center items-center'>
                    <div className='mx-[2vw] w-[25vw] flex justify-center items-center'><TextField fullWidth name='name' variant='outlined' onChange={handleChange} label='نام تگ' /></div>
                    <div className='mx-[2vw] w-[25vw] flex justify-center items-center'><Button fullWidth size='large' variant='contained' onClick={() => { setShow(!show); }}>رنگ</Button></div>
                    {show && tag.isSelected
                      ?
                      <div className='colorPick-modal' onClick={() => { setShow(false); }}>
                        <div className='z-500000'>
                          <SketchPicker
                            onChange={(color) => {
                              setSketchPickerColor(color.rgb);
                            }}
                            color={sketchPickerColor}
                          />
                        </div>
                      </div>
                      :
                      <></>}
                    <div className='flex justify-center items-center mx-[2vw] w-[25vw]'>
                    </div>
                  </div>
                  <div className='w-[4vw] flex items-center'>
                    <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>ثبت</Button>
                  </div>
                </div>
              }
            </div>
          )
        })
      }
      <div className='EditUser'>
        <Link to={'/dashboard/createtag'}>
          <span>
            <svg xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg" width="14"
              height="14" viewBox="0 0 14 14"
              class="site-nav-dropdown-icon small-icon">
              <path d="M7 0.75L7 13.25M13.25 7L0.75 7" 
              stroke="#E54F6D" stroke-width="1.5px" stroke-linecap="round"></path>
            </svg>
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Tags