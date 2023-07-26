import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from "@apollo/client"
import { Button, TextField } from '@mui/material'
import MapComponent from '../components/MapComponent'
import PersianDatePicker from '../components/PersianDatePicker'
import { Link, useNavigate } from 'react-router-dom'
import '../components/component_css/hazine.css'

const expenseMutation = gql`
mutation Mutation($data: ExpenseInfo!) {
  create_expense(data: $data) {
    status
    msg
  }
}
`

const my_tags = gql`
  query Query {
    getMyTags {
      _id
      name
      color
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
fetch('')

function Hazine() {

  const [expense] = useMutation(expenseMutation)
  const [hazine, setHazine] = useState({ amount: '', })
  const [tags, setTags] = useState([])
  const [tagsId, setTagsId] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString())
  const [location, setLocation] = useState({})
  const [course, setCourse] = useState(3)
  const [lineData, setLineData] = useState([])
  const { loading, error, data, refetch } = useQuery(my_tags)

  const [somenewtags, setsomenewtags] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setTags(data.getMyTags)
      tags.map((tag) => {
        if (tagsId.indexOf(tag) === -1) {
          tagsId.push(tag._id);
        }
      })
      setsomenewtags(data.getMyTags.map(item => ({ ...item, isSelected: false })))
    }
  }, [data])

  const handleChange = (e) => {
    setHazine({ ...hazine, [e.target.name]: e.target.value })
  }

  console.log("tarikh = ", selectedDate);

  const handleSubmit = async () => {

    // const arr = somenewtags.filter(item => item.isSelected).map(item => item._id)

    const arrayOfSelectedTags = somenewtags.reduce((acc, cur, i) => {

      if (cur.isSelected) return [...acc, cur._id]

      return acc

    }, [])

    try {
      const variables = {

        "data": {
          "amount": Number(hazine.amount),
          "geo": {
            "lat": location.lat,
            "lon": location.lng
          },
          "tags": arrayOfSelectedTags,
          "date": new Date(selectedDate).toISOString(),
          "address": {
            "MunicipalityZone": 6758845,
            "Neighbourhood": '',
            "FormattedAddress": '',
            "Place": ''
          }
        }

      }

      console.log("variables : ", variables);

      const { data: { create_expense: { status } } } = await expense(
        {
          variables
        }
      )


      if (status == 200) {
        refetch()
        navigate('/dashboard/allexpenses')
      }

    } catch (error) {
      console.log(error);
    }
  }

  if (error) return <h1> error </h1>

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='py-[4vw]'>
        <div className='w-[40vw] flex flex-col justify-center items-center'>
          <div className='flex mb-[2vw] w-[25vw]'>
            <div><TextField fullWidth name='amount' variant='standard' onChange={handleChange} label='مقدار هزینه' /></div>
            <div className='btn-group flex items-center w-[3vw] mx-[2vw]'><Button fullWidth size='large' variant='contained' onClick={() => { setShowMap(!showMap) }}>موقعیت</Button></div>
            <div className='btn-group flex items-center w-[3vw] mx-[2vw]'><Button fullWidth size='large' variant='contained' onClick={() => { setShowDate(!showDate) }}>تاریخ</Button></div>
          </div>
          <div className='flex flex-wrap justify-center mb-[2vw]'>
            {
              somenewtags.map((tag, i) => (
                tag.name !== ""
                  ?
                  <div style={{
                    padding: '4px 8px', borderRadius: 12, background: tag.isSelected ? `${tag.color}` : '#eee',
                    cursor: 'pointer', margin: '1vw'
                  }}
                    onClick={() => {
                      const arr = [...somenewtags]
                      arr[i].isSelected = true
                      setsomenewtags(arr)
                    }}
                  >
                    {tag.name}
                  </div>
                  :
                  null
              ))
            }
            <div className='flex justify-center items-center m-[1vw] p-[.5vw] bg-[#e54f6d1c] rounded'>
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
          <div className='relative flex flex-col justify-center items-center my-[2vw] mb-[1vw]'>
            {

              <div className={showDate ? 'mb-[1vw] z-[2000000000000000] border-solid border-2 border-indigo-600 rounded-[0.5vw]' : 'mb-[1vw] z-[10000] '}>
                <PersianDatePicker setSelectedDate={setSelectedDate} />
              </div>

            }
            {

              <div className={showMap ? 'mb-[1vw] border-solid border-2 border-indigo-600 z-[20000]' : 'mb-[1vw] z-[1]'}><MapComponent setPropsPosition={setLocation} /></div>
            }
          </div>
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

export default Hazine