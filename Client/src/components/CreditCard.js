import './component_css/gradient.css'
import chip from '../content/Images/chip.png'

export default function CreditCard() {
  return (
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
  )
}