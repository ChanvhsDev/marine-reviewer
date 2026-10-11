import {useEffect} from 'react'
import type {ButtonHTMLAttributes,ReactNode} from 'react'
export const Panel=({children,className=''}:{children:ReactNode;className?:string})=>
  <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}>{children}</div>
export const Button=({v='p',className='',...r}:ButtonHTMLAttributes<HTMLButtonElement>&{v?:'p'|'s'|'g'})=>
  <button {...r} className={`rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-50 ${v==='p'?'bg-rose-600 text-white hover:bg-rose-700':v==='s'?'border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700':'hover:bg-slate-100 dark:hover:bg-slate-700'} ${className}`}/>
export const Bar=({pct,label}:{pct:number;label:string})=>
  <div role="progressbar" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
    <div className="h-2 rounded-full bg-rose-600 transition-all" style={{width:pct+'%'}}/></div>
export function Modal({title,children,onClose}:{title:string;children:ReactNode;onClose:()=>void}){
  useEffect(()=>{const f=(e:KeyboardEvent)=>e.key==='Escape'&&onClose();addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[onClose])
  return<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
    <div role="dialog" aria-modal="true" aria-label={title} className="pop w-full max-w-sm rounded-2xl bg-white p-5 dark:bg-slate-800" onClick={e=>e.stopPropagation()}>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>{children}</div></div>
}
