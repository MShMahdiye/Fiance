import { useEffect } from "react";

export default function Redirect (){
  const urls = { video: "https://learning.emofid.com/meaning-and-types-of-investment/", }

  useEffect(() => {
    window.location.replace(`${urls.video}`);
  }, [])

  return <div><h3>Redirecting...</h3></div>
}

export function RedirectBook (){
  const urls = { book: "https://fidibo.com/category/management/financial-investment", }

  useEffect(() => {
    window.location.replace(`${urls.book}`);
  }, [])

  return <div><h3>Redirecting...</h3></div>
}