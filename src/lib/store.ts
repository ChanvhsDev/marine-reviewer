import {useEffect,useState} from 'react'
export interface Miss{prompt:string;given:string;answer:string;why:string;cardId:string;type:string;topic:string}
export interface State{name:string;theme:'light'|'dark';sound:boolean;anim:boolean;last?:string
  mastery:Record<string,{box:number;ok:number;bad:number;due:number}>;cards:Record<string,'know'|'again'>
  marks:string[];wrong:Record<string,Miss>;history:{t:number;score:number;total:number;secs:number;label:string}[];days:string[]}
const init:State={name:'Love',theme:'dark',sound:false,anim:true,mastery:{},cards:{},marks:[],wrong:{},history:[],days:[]}
const KEY='marine-reviewer-v1'
export function useStore(){
  const [s,set]=useState<State>(()=>{try{return{...init,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return init}})
  useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(s))
    document.documentElement.classList.toggle('dark',s.theme==='dark')
    document.documentElement.classList.toggle('no-anim',!s.anim)},[s])
  return[s,set] as const
}
export const today=()=>new Date().toISOString().slice(0,10)
export function streak(days:string[]){let c=0;const d=new Date();if(!days.includes(today()))d.setDate(d.getDate()-1)
  while(days.includes(d.toISOString().slice(0,10))){c++;d.setDate(d.getDate()-1)}return c}