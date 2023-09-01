import React, { lazy } from 'react'
import gift from "../content/Images/gift-shop.png"
import coffeeShop from "../content/Images/coffee-shop.png"
import shopB from "../content/Images/shop-broken.png"
import shop from "../content/Images/shop.png"
import money from "../content/Images/money.png"
import moneyBag from "../content/Images/money-bag-broken.png"
import balloon from "../content/Images/balloon-broken.png"
import plane from "../content/Images/airplane-line.png"
import paper from "../content/Images/paper-airplane.png"
import tShirt from "../content/Images/t-shirt-broken.png"
import egg from "../content/Images/egg.png"
import fish from "../content/Images/fish.png"
import coffee from "../content/Images/coffee.png"
import pizza from "../content/Images/pizza.png"

export default function TagCards() {
  const listOfTags = [
    gift,coffeeShop,shop,shopB,money
    ,moneyBag,balloon,plane,
    paper,fish,coffee,pizza,
    tShirt,egg,gift,shopB
  ]
  return (
    <div className='flex justify-center items-center flex-wrap'>
      {
        listOfTags?.map(item => {
          return(
            <div className='flex justify-center items-center m-4'>
              <img className={'w-[30px] h-[30px]'} src={item}/>
            </div>
          )
        })
      }
    </div>
  )
}
