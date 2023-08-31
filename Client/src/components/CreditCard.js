import './component_css/gradient.css'
import chip from '../content/Images/chip.png'
import newCard from '../content/Images/new-card.png'

export default function CreditCard(props) {
  console.log("props: ",props);
  return (
    <>
    {
      props?.props?.new === "new"
      ?
      <div className='dashed-card p-4 flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center text-[#d5d5d5] mb-3'>
            <img width={'45px'} src={newCard} />
          </div>
          <div className='flex justify-center items-center text-[#d5d5d5]'>
            Add card
          </div>
        </div>
      </div>
      :
      <div className="gradient-card p-4 text-[#DFF0FE]">
      <div className='text-[1vw] text-left mx-2'>
        <span>Credit Card</span>
      </div>
      <div className='flex justify-between items-center h-[70%]'>
        <div>
          <img src={chip} />
        </div>
        <div className='flex justify-center items-center text-[1vw] m-2'>
          <div className='m-1'>5214</div>
          <div className='m-1'>4321</div>
          <div className='m-1'>5678</div>
          <div className='m-1'>4345</div>
        </div>
      </div>
      <div className='text-left mx-2 text-[8px]'>Mahdiye Shiekhveisi</div>
    </div>
    }
    </>
  )
}