import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/component_css/ProfileInfo.css'
import up from "../content/Images/upp.png"
import progress from "../content/Images/Progress.png"
import Path from '../content/Images/path.png'
import Path2 from '../content/Images/path2.png'
import Path3 from '../content/Images/path3.png'
import jet from '../content/Images/jet.png'
import { motion as m } from 'framer-motion'
import CreditCard from '../components/CreditCard'

const my_info = gql`
  query Me {
    me {
      _id
      name
      username
    }
  }
`

const getMyExpenses = gql`
  query GetMyExpenses {
    getMyExpenses {
      _id
      amount
    }
  }
`

function ProfileInfo() {

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const progress = require('../content/Images/Progress.png')
  const userImg = require('../content/Images/user.png')
  const chart = require('../content/Images/Chart.png')
  const cardImg = require('../content/Images/Cards.png')
  const activityImg = require('../content/Images/Activity.png')
  const urls = { book: "https://fidibo.com/category/management/financial-investment", }

  const [somenewtags, setsomenewtags] = useState([])
  let totalAmount = 0;
  let today = new Date();

  const navigate = useNavigate()

  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']

  const exData = useQuery(getMyExpenses)
  const exdata = {
    data: exData.data,
    error: exData.error,
    refetch: exData.refetch,
    loading: exData.loading
  }


  const { loading, error, data, refetch } = useQuery(my_info)
  const expenseData = useQuery(getMyExpenses)

  useEffect(() => {

    if (data) {

      setName(data.me.name)
      setUserName(data.me.username)

    }

    refetch()


  }, [data])

  useEffect(() => {

    if (exdata.data) {

      setsomenewtags(exdata.data.getMyExpenses.map(item => ({ ...item, isSelected: false })))
      console.log("Some new tags = ", somenewtags);
    }

    refetch()

  }, [exdata.data])

  if (exdata.error) return <h1> {exdata.error} </h1>

  if (exdata.loading) {
    return <h1>Loading</h1>
  }

  const yearlyExpenses = {}
  const monthlyExpenses = {}
  const dailyExpenses = {}

  const createYearly = () => {
    console.log("somenewTags :ijn ", somenewtags);
    somenewtags.forEach(expense => {
      const date = new Date(expense.date)
      const year = date.getFullYear();
      const amount = expense.amount;
      if (yearlyExpenses[year]) {
        yearlyExpenses[year] += amount;
      }
      else {
        yearlyExpenses[year] = amount;
      }
    })
  }

  const createMonthly = () => {
    somenewtags.forEach(expense => {
      const date = new Date(expense.date)
      const month = months[date.getMonth()];
      const amount = expense.amount;
      if (monthlyExpenses[month]) {
        monthlyExpenses[month] += amount;
      }
      else {
        monthlyExpenses[month] = amount;
      }
    })
  }

  const createDaily = () => {
    totalAmount = 0;
    somenewtags.forEach(expense => {
      console.log(expense);
      const date = new Date(expense?.date);
      const day = date.getDate();
      const amount = expense.amount;
      if (dailyExpenses[day]) {
        dailyExpenses[day] += amount;
      }
      else {
        dailyExpenses[day] = amount;
      }
      totalAmount += amount
    })
  }


  createYearly();
  createMonthly();
  createDaily();

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='grid-responsive grid grid-cols-5 grid-rows-3 h-[89vh] gap-10 p-5'>
      <m.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
        exit={{ opacity: 1 }}
        className='bar-res row-span-3 col-span-1 bg-[#fff] m-2 rounded'>
        <div className='bar-content flex flex-col justify-between h-full items-center shadow-lg p-[3vw]'>
          <div className='flex  flex-col justify-center items-start text-right'>
            <m.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
              exit={{ opacity: 1 }}
              className='profile-image-container mb-[2vw]'>
              <img src={userImg} />
            </m.div>
            <div
              className='text-[15px] text-left overflow-hidden'>
              <m.span
                animate={{ y: 0 }}
                initial={{ y: "100%" }}
                transition={{ delay: 0.8, duration: 0.5 }}>
                {name}
              </m.span></div>
            <div className='text-[15px] text-[#d3d5d5] text-left overflow-hidden'>
              <m.span
                animate={{ y: 0 }}
                initial={{ y: "100%" }}
                transition={{ delay: 0.8, duration: 0.5 }}>{userName}
              </m.span>
            </div>
          </div>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
            exit={{ opacity: 1 }}
            className='jet-res rounded bg-[#2F2E41] h-[15vw] w-[15vw] flex justify-end p-2 flex-col items-center shadow-lg'>
            <div className='text-white flex'>
              کلکسیون بهترین کتاب‌های پولساز
            </div>
            <Link to="/privacy-policy"
              target="_blank"
              rel="noreferrer">
              <m.div onClick={() => {navigate("/privacy-policy")}} whileHover={{ scale: 1.08, opacity: .9 }} transition={{ delay: .2, duration: .3 }} className='bg-[#2D62ED] text-white rounded-full w-[6vw] h-[3vw] p-4 mt-3'>
                <span>بزن بریم</span>
              </m.div>
            </Link>
            <div className='flex justify-center items-center mx-[1vw] absolute bottom-[13vw]'>
              <img width={"200vw"} height={"50vh"} src={jet} />
            </div>
          </m.div>
          <div className='EditUser'>
            <Link to={'/dashboard/edit'}>
              <span>
                <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                  width="30" height="32" viewBox="0 0 20 22" fill="none" class="site-nav-dropdown-icon">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M1.99999 2C1.01482 4.13455 0.223755 8.17789 4.7902 7.53235L3.5 8.5L4 10H3V18C3 19.1046 3.89543 20 5 20H12C13.1046 20 14 19.1046 14 18V10H13L14.5 5.5L14 2L11 4L9 9.5L13 10H7.5L5.5 7L5.28504 7.16122C5.76869 6.48755 6.24377 5.24377 5 4L1.99999 2Z"
                    fill="#2F2E41" fill-opacity="0.15"></path>
                  <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7299 1.48449C14.682 1.21679 14.4929 0.996026 14.2357 0.907531C13.9786 0.819036 13.6937 0.876681 13.4911 1.05818L10.4411 3.79151C10.3472 3.87571 10.276 3.98224 10.2342 4.10126L8.43534 9.21686H8.36303L6.47967 6.45549C6.56825 6.14342 6.60427 5.81828 6.5858 5.49347C6.56388 5.10793 6.46561 4.73064 6.29678 4.38348C6.07936 3.89473 5.72683 3.47813 5.28051 3.18282L5.28054 3.18279L5.27427 3.17873C4.74835 2.83823 4.37325 2.69769 4.17254 2.62248L4.17253 2.62248L4.17253 2.62248C4.11611 2.60134 4.07347 2.58536 4.04514 2.57156C3.82759 2.46558 3.42515 2.20273 2.16736 1.07491C1.99274 0.918328 1.75492 0.852455 1.52463 0.896873C1.29433 0.941291 1.09807 1.09089 0.99421 1.30117C0.571373 2.15729 0.351425 3.09929 0.351425 4.05413C0.351425 5.00027 0.567381 5.93381 0.982697 6.78366C1.13009 7.13636 1.34541 7.45675 1.6165 7.72651C1.89431 8.00296 2.22498 8.22059 2.58876 8.36639C2.72967 8.42287 2.87443 8.46812 3.02169 8.5019L3.10232 9.21686H3.02499C2.61078 9.21686 2.27499 9.55265 2.27499 9.96686V16.6335C2.27499 17.827 2.7491 18.9716 3.59301 19.8155C4.43693 20.6594 5.58152 21.1335 6.77499 21.1335H10.525V20.3834L10.5267 21.1335C11.7189 21.1309 12.8615 20.6561 13.7045 19.8131C14.3691 19.1486 14.8048 18.2979 14.9608 17.3835H15.525C16.608 17.3835 17.6466 16.9533 18.4123 16.1875C19.1781 15.4218 19.6083 14.3832 19.6083 13.3002C19.6083 12.2172 19.1781 11.1786 18.4123 10.4128C17.6466 9.64706 16.608 9.21685 15.525 9.21685H14.275L14.2703 9.21686H14.1848L15.399 5.77452C15.4422 5.65211 15.4528 5.52059 15.4299 5.39282L14.7299 1.48449ZM13.1161 10.7169C13.122 10.7169 13.128 10.7169 13.134 10.7169H13.525V16.6327C13.523 17.4279 13.2062 18.1901 12.6439 18.7524C12.0815 19.3148 11.3194 19.6316 10.5241 19.6335H6.77499C5.97934 19.6335 5.21628 19.3175 4.65367 18.7549C4.09106 18.1922 3.77499 17.4292 3.77499 16.6335V10.7169H7.96602C7.96691 10.7169 7.9678 10.7169 7.96869 10.7169H8.95776C8.96372 10.7169 8.96968 10.7169 8.97563 10.7169H13.1161ZM12.5942 9.21686L13.9185 5.46233L13.4906 3.07291L11.5854 4.78024L10.0254 9.21686H12.5942ZM6.54736 9.21686L5.60911 7.8412C5.38857 8.0368 5.13922 8.1982 4.86934 8.31948C4.75721 8.36986 4.64226 8.413 4.5252 8.44872L4.61183 9.21686H6.54736ZM3.95484 7.04759C4.05775 7.02677 4.15827 6.99452 4.25451 6.95127C4.42814 6.87325 4.58427 6.76103 4.71357 6.62132C4.78039 6.54912 4.83933 6.47034 4.88958 6.38634C4.91142 6.27716 4.95742 6.17277 5.02594 6.08188C5.07675 5.9194 5.09791 5.74893 5.08822 5.57864C5.07741 5.38859 5.02841 5.20266 4.94415 5.03197C4.93903 5.02161 4.93416 5.01113 4.92953 5.00055C4.82898 4.77069 4.66446 4.57461 4.45562 4.43565C4.07128 4.18702 3.95282 4.14541 3.79607 4.09035C3.69894 4.05623 3.5871 4.01695 3.38819 3.92004C3.06613 3.76315 2.68024 3.49914 1.99116 2.91454C1.89865 3.28608 1.85143 3.66873 1.85143 4.05413C1.85143 4.77858 2.0183 5.4933 2.33911 6.14284C2.34716 6.15913 2.35461 6.17571 2.36145 6.19254C2.43314 6.36889 2.53963 6.52899 2.67456 6.66326C2.80949 6.79754 2.97011 6.90324 3.1468 6.97406C3.23411 7.00905 3.32445 7.03517 3.41648 7.05217C3.47646 7.02856 3.54049 7.01236 3.6076 7.00479C3.72932 6.99106 3.84753 7.00729 3.95484 7.04759ZM15.525 15.8835H15.025V10.7169H15.525C16.2101 10.7169 16.8672 10.989 17.3517 11.4735C17.8362 11.958 18.1083 12.615 18.1083 13.3002C18.1083 13.9853 17.8362 14.6424 17.3517 15.1269C16.8672 15.6113 16.2101 15.8835 15.525 15.8835Z"
                    fill="#2F2E41"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </m.div>
      <m.div
        onClick={() => { navigate('/dashboard/summary') }}
        variants={{
          initial: { opacity: 0, transitionDelay: 2.0, transitionDuration: 1.9, ease: "circOut" },
          hover: { opacity: 1, scale: 1.12, transitionDelay: .2, transitionDuration: .5, ease: "circOut" }
        }}
        initial="initial"
        animate={{ opacity: 1 }}
        transition="transition"
        whileHover="hover"
        exit={{ opacity: 1 }}
        className='chart-res rounded bg-[#FF007C] flex p-2 justify-between items-center shadow-lg'>
        <div className='flex flex-col justify-center items-start'>
          <div className='text-white text-lg font-extrabold my-2'>مجموع کل </div>
          <div className='text-white '>{totalAmount > 0 ? totalAmount : 0}</div>
        </div>
        <div><img width={'160vw'} height={'160vw'} src={up} /></div>
      </m.div>
      <m.div
        onClick={() => { navigate('/dashboard/summary') }}
        variants={{
          initial: { opacity: 0, transitionDelay: 2.0, transitionDuration: 1.9, ease: "circOut" },
          hover: { opacity: 1, scale: 1.12, transitionDelay: .2, transitionDuration: .5, ease: "circOut" }
        }}
        initial="initial"
        animate={{ opacity: 1 }}
        whileHover="hover"
        exit={{ opacity: 1 }}
        className='chart-res rounded bg-[#7D00B5] flex p-2 justify-between items-center shadow-lg text-white text-right'>
        <div className='flex justify-center items-center rounded mx-[.5vw]'>
          <img width={"150vw"} height={"50vh"} src={Path} />
        </div>
        <div>
          <div className='text-lg mb-2'>سال جاری</div>
          <div>---</div>
        </div>
      </m.div>
      <m.div
        onClick={() => { navigate('/dashboard/summary') }}
        variants={{
          initial: { opacity: 0, transitionDelay: 2.0, transitionDuration: 1.9, ease: "circOut" },
          hover: { opacity: 1, scale: 1.12, transitionDelay: .2, transitionDuration: .5, ease: "circOut" }
        }}
        initial="initial"
        animate={{ opacity: 1 }}
        whileHover="hover"
        exit={{ opacity: 1 }}
        className='chart-res rounded bg-[#2D62ED] flex p-2 justify-between items-center shadow-lg text-white text-right'>
        <div className='flex justify-center items-center rounded mx-[.5vw]'>
          <img width={"160vw"} height={"50vh"} src={Path2} />
        </div>
        <div>
          <div className='text-lg mb-2'>ماه جاری</div>
          <div>---</div>
        </div>
      </m.div>
      <m.div
        onClick={() => { navigate('/dashboard/summary') }}
        variants={{
          initial: { opacity: 0, transitionDelay: 2.0, transitionDuration: 1.9, ease: "circOut" },
          hover: { opacity: 1, scale: 1.12, transitionDelay: .2, transitionDuration: .5, ease: "circOut" }
        }}
        initial="initial"
        animate={{ opacity: 1 }}
        whileHover="hover"
        exit={{ opacity: 1 }}
        className='chart-res rounded bg-[#39D5CF] flex p-2 justify-between items-center shadow-lg text-white text-right'>
        <div className='flex justify-center items-center rounded mx-[.5vw]'>
          <img width={"160vw"} height={"50vh"} src={Path} />
        </div>
        <div>
          <div className='text-lg mb-2'>روز جاری</div>
          <div>---</div>
        </div>
      </m.div>
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 2.4, duration: 1.0, ease: "easeOut" }}
        exit={{ opacity: 1 }}
        className='credit-res-cont rounded col-span-4 row-span-2 flex justify-between p-7 shadow-lg'>
        <div className='card flex justify-center items-start'>
          {
            somenewtags?.length > 0 ?
              <CreditCard /> :
              <CreditCard props={{ new: 'new' }} />
          }
        </div>
        <div className='credit-txt w-[60%]'>
          <div className='flex flex-col justify-start items-left text-right text-[1vw] h-[87%]'>
            <div className='m-2'>
              فقط با یه کلیک هدف‌های مالیت رو سریعتر به دست بیار
            </div>
            <div className='m-2'>
              اینجا پر از نکته است پس وقت رو هدر نده
            </div>
            <div className='m-2'>منتظرتیم</div>
            <div className='text-[#c5c5c5] text-[1vw] mt-4 m-1'>
              مرجع آموزش هوش مالی، سرمایه گذاری، بورس، کسب و کار، بیزینس کوچینگ و توسعه فردی
            </div>
            <div className='text-[#c5c5c5] text-[1vw] m-1'>
              بیش از صدها ساعت آموزش ویدئویی و صوتی در زمینه‌های مالی، اقتصادی و مدیریت
            </div>
            <div className='text-[#c5c5c5] text-[1vw] m-1'>
              دسترسی راحت و سریع به بروزترین آموزش‌ها
            </div>
          </div>
          <div className='button-video-container flex justify-end'>
            <m.div whileHover={{ scale: 1.08, opacity: .9 }} transition={{ delay: .2, duration: .3 }} className='button-video bg-[#2D62ED] text-white rounded-full w-[6vw] h-[3vw] p-4'>
              <Link to="/external-link"
                target="_blank"
                rel="noreferrer"  >بزن بریم</Link>
            </m.div>
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

export default ProfileInfo