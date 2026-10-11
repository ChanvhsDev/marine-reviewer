import {cards,topics} from '../data/content'
import type {Card} from '../data/content'
export type QT='mc'|'id'|'tf'
export interface Q{id:string;card:Card;type:QT;prompt:string;options?:string[];answer:string;hint:string}
export const LEVELS=['New','Learning','Practicing','Almost Mastered','Mastered']
export const TYPES:QT[]=['mc','id','tf']
const sh=<T,>(a:T[]):T[]=>[...a].sort(()=>Math.random()-.5)
const norm=(x:string)=>x.toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim()
const STOP=new Set(['art','and','the','of','van'])

export function makeQ(c:Card,type:QT):Q{
  if(c.only)type=c.only
  const tt=topics.find(t=>t.id===c.topic)!.title
  const hint=`Review “${tt}”. The answer has ${c.back.split(/\s+/).length} word(s) and starts with “${c.back[0]}”.`
  const same=[...new Set(cards.filter(x=>x.topic===c.topic&&x.back!==c.back).map(x=>x.back))]
  const other=[...new Set(cards.filter(x=>x.topic!==c.topic&&x.back!==c.back).map(x=>x.back))]
  const wrong=c.opts??sh([...sh(same),...sh(other)]).slice(0,3)
  const base={id:c.id+':'+type,card:c,type,hint,answer:c.back}
  if(type==='mc')return{...base,prompt:c.front,options:sh([c.back,...wrong])}
  if(type==='tf'){const t=Math.random()<.5;const shown=t?c.back:sh(c.opts??same.concat(other))[0]
    return{...base,prompt:`True or False: the answer to “${c.front}” is “${shown}”.`,options:['True','False'],answer:shown===c.back?'True':'False'}}
  return{...base,prompt:c.front}
}
export function check(q:Q,given:string){
  if(q.type!=='id')return given===q.answer
  const g=norm(given);if(!g)return false
  if(g===norm(q.answer))return true
  const gw=g.split(' ').filter(w=>!STOP.has(w));const aw=norm(q.answer).split(' ')
  return gw.length>0&&gw.every(w=>aw.includes(w))
}
type M=Record<string,{box:number;due:number}>
export function pickQs(pool:Card[],n:number,m:M,prefer:string[]=[]):Q[]{
  const now=Date.now()
  const key=(c:Card)=>{const e=TYPES.map(t=>m[c.id+':'+t]).filter(Boolean);const box=e.length?Math.min(...e.map(x=>x.box)):0
    return(prefer.includes(c.id)?-3:0)+box+(e.length&&e.every(x=>x.due>now)?1.5:0)+Math.random()*1.5}
  return pool.map(c=>[key(c),c] as const).sort((a,b)=>a[0]-b[0]).slice(0,n).map(([,c])=>makeQ(c,TYPES[Math.floor(Math.random()*3)]))
}
