import {useEffect,useRef,useState} from 'react'
import {cards,topics} from './data/content'
import type {Card} from './data/content'
import {LEVELS,TYPES,check,makeQ,pickQs} from './lib/quiz'
import type {Q,QT} from './lib/quiz'
import {streak,today,useStore} from './lib/store'
import type {State} from './lib/store'
import {Bar,Button,Modal,Panel} from './ui'

type Pg='home'|'study'|'cards'|'quiz'|'mistakes'|'saved'|'search'|'settings'
type P={s:State;up:(f:(s:State)=>State)=>void;go:(p:Pg,t?:string)=>void;start:(qs:Q[],label:string)=>void;topic?:string}
const T=(id:string)=>topics.find(t=>t.id===id)!
const NAV:[Pg,string,string][]=[['home','Home','🏠'],['study','Reviewer','📖'],['cards','Cards','🗂️'],['quiz','Quiz','✏️'],['mistakes','Mistakes','🔁'],['saved','Saved','🔖'],['search','Search','🔍'],['settings','Settings','⚙️']]
const fill=(c:Card)=>c.front.replace(/_{3,}/g,c.back)
const avg=(a:number[])=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0

function prog(s:State,tid:string){
  const cs=cards.filter(c=>c.topic===tid)
  const best=(c:Card)=>Math.max(0,...TYPES.map(t=>s.mastery[c.id+':'+t]?.box??0))
  const a=avg(cs.map(best));let ok=0,tot=0
  cs.forEach(c=>TYPES.forEach(t=>{const m=s.mastery[c.id+':'+t];if(m){ok+=m.ok;tot+=m.ok+m.bad}}))
  return{pct:Math.round(a/4*100),level:LEVELS[Math.round(a)],ok,tot,mastered:cs.filter(c=>best(c)>=3).length,
    known:cs.filter(c=>s.cards[c.id]==='know').length,n:cs.length}
}
function beep(ok:boolean){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination)
  o.frequency.value=ok?660:220;g.gain.value=.05;o.start();o.stop(a.currentTime+.15)}catch{}}

export default function App(){
  const [s,set]=useStore()
  const up=(f:(s:State)=>State)=>set(f)
  const [v,setV]=useState<{p:Pg;t?:string}>({p:'home'})
  const [sess,setSess]=useState<{qs:Q[];label:string;k:number}|null>(null)
  const go=(p:Pg,t?:string)=>{setV({p,t});if(p!=='quiz')setSess(null);scrollTo(0,0)}
  const start=(qs:Q[],label:string)=>{if(!qs.length)return;setSess({qs,label,k:Date.now()});setV({p:'quiz'});scrollTo(0,0)}
  const record=(q:Q,ok:boolean,given:string)=>up(s=>{
    const m=s.mastery[q.id]||{box:0,ok:0,bad:0,due:0};const box=ok?Math.min(4,m.box+1):1
    const wrong={...s.wrong};if(ok)delete wrong[q.id];else wrong[q.id]={prompt:q.prompt,given,answer:q.answer,why:q.card.why||`${q.card.back}: ${fill(q.card)}`,cardId:q.card.id,type:q.type,topic:q.card.topic}
    return{...s,last:q.card.topic,mastery:{...s.mastery,[q.id]:{box,ok:m.ok+ +ok,bad:m.bad+ +!ok,due:Date.now()+[0,0,1,3,7][box]*864e5}},wrong,
      days:s.days.includes(today())?s.days:[...s.days,today()]}})
  const finish=(score:number,total:number,secs:number,label:string)=>up(s=>({...s,history:[...s.history,{t:Date.now(),score,total,secs,label}]}))
  const p:P={s,up,go,start,topic:v.t}
  return<div className="min-h-screen bg-slate-50 text-slate-900 md:flex dark:bg-slate-900 dark:text-slate-100">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2 focus:text-black">Skip to content</a>
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col gap-1 border-r border-slate-200 p-4 md:flex dark:border-slate-700">
      <div className="mb-4 text-lg font-semibold">Marine Env ♡</div>
      <nav aria-label="Main" className="flex flex-col gap-1">{NAV.map(([k,l,i])=><button key={k} onClick={()=>go(k)} aria-current={v.p===k?'page':undefined}
        className={`rounded-xl px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-rose-600 ${v.p===k?'bg-rose-100 font-semibold text-rose-800 dark:bg-rose-950 dark:text-rose-200':'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{i} {l}</button>)}</nav></aside>
    <div className="min-w-0 flex-1 pb-24 md:pb-8">
      <header className="flex items-center justify-between p-4 md:hidden"><span className="font-semibold">Marine Env ♡</span>
        <span><Button v="g" aria-label="Search" onClick={()=>go('search')}>🔍</Button><Button v="g" aria-label="Settings" onClick={()=>go('settings')}>⚙️</Button></span></header>
      <main id="main" className="mx-auto max-w-3xl p-4 md:p-8">
        {v.p==='home'&&<Home {...p}/>}{v.p==='study'&&<Study {...p}/>}{v.p==='cards'&&<Flash {...p}/>}
        {v.p==='quiz'&&(sess?<Quiz key={sess.k} sess={sess} s={s} record={record} finish={finish} go={go} retry={()=>start(sess.qs.map(q=>makeQ(q.card,q.type)),sess.label)}/>:<QuizSetup {...p}/>)}
        {v.p==='mistakes'&&<Mistakes {...p}/>}{v.p==='saved'&&<Saved {...p}/>}{v.p==='search'&&<Search {...p}/>}{v.p==='settings'&&<Settings {...p}/>}
      </main></div>
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-800">
      {NAV.slice(0,6).map(([k,l,i])=><button key={k} onClick={()=>go(k)} aria-current={v.p===k?'page':undefined}
        className={`flex flex-col items-center py-2 text-[11px] focus-visible:outline-2 focus-visible:outline-rose-600 ${v.p===k?'font-bold text-rose-700 dark:text-rose-300':''}`}><span aria-hidden>{i}</span>{l}</button>)}</nav>
  </div>
}

const H=({children}:{children:React.ReactNode})=><h1 className="mb-4 text-2xl font-bold">{children}</h1>

function Home({s,go,start}:P){
  const ps=topics.map(t=>({t,...prog(s,t.id)}))
  const overall=Math.round(avg(ps.map(x=>x.pct)))
  const wrongN=Object.keys(s.wrong).length
  const weak=[...ps].sort((a,b)=>a.pct-b.pct)[0]
  const cont=ps.find(x=>x.t.id===s.last)||weak
  const last=s.history[s.history.length-1]
  const daily=()=>start(pickQs(cards,10,s.mastery,Object.values(s.wrong).map(w=>w.cardId)),'Daily Review')
  return<div className="space-y-4">
    <div><H>Welcome back, {s.name} ♡</H><p className="-mt-3 text-slate-600 dark:text-slate-300">You got this! 🔥 Streak: {streak(s.days)} day(s)</p></div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Panel><h2 className="font-semibold">Continue Reviewing</h2><p className="my-2">{cont.t.title}</p><Bar pct={cont.pct} label="Topic progress"/><p className="my-2 text-sm">{cont.pct}% · {cont.level}</p><Button onClick={()=>go('study',cont.t.id)}>Continue Review</Button></Panel>
      <Panel><h2 className="font-semibold">Recommended</h2>
        {wrongN?<><p className="my-2">You missed {wrongN} question(s). These concepts could use another review.</p><Button onClick={()=>go('mistakes')}>Review Mistakes</Button></>
        :<><p className="my-2">Next up: “{weak.t.title}” — {weak.pct}% so far.</p><Button onClick={()=>go('quiz')}>Start a Quiz</Button></>}</Panel>
      <Panel><h2 className="font-semibold">Today’s Review</h2><p className="my-2">10 questions · about 5 minutes</p><Button onClick={daily}>Start Review</Button></Panel>
      <Panel><h2 className="font-semibold">Progress</h2><div className="my-2"><Bar pct={overall} label="Overall progress"/></div>
        <p className="text-sm">Overall {overall}% · Recent quiz: {last?`${last.score}/${last.total}`:'none yet'} · Saved: {s.marks.length}</p></Panel></div>
    <h2 className="pt-2 text-lg font-semibold">Topics</h2>
    <div className="grid gap-3 sm:grid-cols-2">{ps.map(x=><Panel key={x.t.id}><div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{x.t.subject} · {x.t.level}</div>
      <h3 className="my-1 font-semibold">{x.t.title}</h3><Bar pct={x.pct} label={x.t.title+' progress'}/>
      <p className="my-2 text-sm">{x.pct}% · {x.level} · Questions: {x.ok}/{x.tot} correct · Flashcards: {x.known}/{x.n} known</p>
      <div className="flex gap-2"><Button v="s" onClick={()=>go('study',x.t.id)}>Review</Button><Button v="s" onClick={()=>go('cards',x.t.id)}>Cards</Button>
      <Button v="s" onClick={()=>start(pickQs(cards.filter(c=>c.topic===x.t.id),10,s.mastery),x.t.title)}>Quiz</Button></div></Panel>)}</div></div>
}

function Study({s,up,go,start,topic}:P){
  if(!topic)return<div><H>Reviewer</H><div className="space-y-3">{topics.map(t=><Panel key={t.id}><h2 className="font-semibold">{t.title}</h2><p className="my-1 text-sm">{t.intro}</p>
    <Button v="s" onClick={()=>go('study',t.id)}>Open</Button></Panel>)}</div></div>
  const t=T(topic),cs=cards.filter(c=>c.topic===topic),key='sec:'+topic,on=s.marks.includes(key)
  const rows:[string,string][]=topic==='periods'?Object.entries(cs.reduce((a,c)=>{(a[c.back]??=[]).push(c.term);return a},{} as Record<string,string[]>)).map(([k,v])=>[k,v.join(' · ')])
    :cs.map(c=>[c.term,c.why&&c.id.endsWith('Ev')?c.why:fill(c)])
  return<div className="space-y-4"><Button v="g" onClick={()=>go('study')}>← All topics</Button>
    <div className="flex items-start justify-between gap-2"><div><div className="text-sm text-slate-500 dark:text-slate-400">{t.subject} · {t.level}</div><H>{t.title}</H></div>
      <Button v="s" aria-pressed={on} onClick={()=>up(x=>({...x,marks:on?x.marks.filter(m=>m!==key):[...x.marks,key]}))}>{on?'🔖 Saved':'Save'}</Button></div>
    <p>{t.intro}</p>
    <Panel className="border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950"><h2 className="font-semibold">Remember This</h2><p>{t.remember}</p></Panel>
    {t.note&&<Panel className="border-amber-400"><h2 className="font-semibold">⚠ Note on your source</h2><p className="text-sm">{t.note}</p></Panel>}
    <h2 className="text-lg font-semibold">{topic==='periods'?'Period → Works & Features':'Important Terms'}</h2>
    <dl className="space-y-2">{rows.map(([k,d])=><Panel key={k}><dt className="font-semibold">{k}</dt><dd className="text-sm">{d}</dd></Panel>)}</dl>
    <div className="flex gap-2"><Button onClick={()=>go('cards',topic)}>Flashcards</Button><Button onClick={()=>start(pickQs(cs,8,s.mastery),t.title)}>Quick Practice</Button></div></div>
}

function Flash({s,up,topic}:P){
  const [tid,setTid]=useState(topic||'all')
  const mk=(id:string)=>cards.filter(c=>id==='all'||c.topic===id)
  const [deck,setDeck]=useState<Card[]>(()=>mk(topic||'all'));const [i,setI]=useState(0);const [flip,setFlip]=useState(false)
  const c=deck[i];const nav=(d:number)=>{setI((i+d+deck.length)%deck.length);setFlip(false)}
  const reload=(id:string,shuffle=false)=>{const d=mk(id);setDeck(shuffle?[...d].sort(()=>Math.random()-.5):d);setI(0);setFlip(false)}
  const mark=(k:'know'|'again')=>{up(x=>({...x,cards:{...x.cards,[c.id]:k}}));nav(1)}
  useEffect(()=>{const f=(e:KeyboardEvent)=>{if((e.target as HTMLElement).tagName==='BUTTON'&&e.key===' ')return
    if(e.key==='ArrowRight')nav(1);if(e.key==='ArrowLeft')nav(-1);if(e.key===' '){e.preventDefault();setFlip(x=>!x)}}
    addEventListener('keydown',f);return()=>removeEventListener('keydown',f)})
  const key='card:'+c.id,on=s.marks.includes(key),st=s.cards[c.id]
  return<div><H>Flashcards</H>
    <label className="mb-3 block text-sm">Deck <select value={tid} onChange={e=>{setTid(e.target.value);reload(e.target.value)}} className="ml-2 rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-600 dark:bg-slate-800">
      <option value="all">All topics</option>{topics.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></label>
    <p className="mb-2 text-sm" aria-live="polite">Card {i+1} / {deck.length}{st&&` · marked: ${st==='know'?'I know this':'review again'}`}</p>
    <Bar pct={Math.round((i+1)/deck.length*100)} label="Deck position"/>
    <button onClick={()=>setFlip(!flip)} aria-label={flip?'Answer. Press to show question':'Question. Press to show answer'} className="pop mt-4 flex min-h-56 w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm focus-visible:outline-2 focus-visible:outline-rose-600 dark:border-slate-700 dark:bg-slate-800">
      <span className="mb-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{flip?'Answer':'Question'} · tap to flip</span>
      <span className={flip?'text-2xl font-bold text-rose-700 dark:text-rose-300':'text-lg'}>{flip?c.back:c.front}</span></button>
    <div className="mt-4 flex flex-wrap gap-2"><Button v="s" onClick={()=>nav(-1)}>← Prev</Button><Button v="s" onClick={()=>nav(1)}>Next →</Button>
      <Button v="s" onClick={()=>reload(tid,true)}>🔀 Shuffle</Button>
      <Button v="s" aria-pressed={on} onClick={()=>up(x=>({...x,marks:on?x.marks.filter(m=>m!==key):[...x.marks,key]}))}>{on?'🔖 Saved':'Save'}</Button></div>
    <div className="mt-3 flex gap-2"><Button onClick={()=>mark('know')}>✓ I Know This</Button><Button v="s" onClick={()=>mark('again')}>↻ Review Again</Button></div></div>
}

function QuizSetup({s,start,go}:P){
  const [tid,setTid]=useState('all');const [n,setN]=useState(10)
  const pool=cards.filter(c=>tid==='all'||c.topic===tid)
  const w=Object.values(s.wrong)
  return<div className="space-y-4"><H>Quiz</H>
    <Panel><label className="block text-sm">Topic <select value={tid} onChange={e=>setTid(e.target.value)} className="ml-2 rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-600 dark:bg-slate-800"><option value="all">All topics</option>{topics.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></label>
      <label className="mt-3 block text-sm">Questions <select value={n} onChange={e=>setN(+e.target.value)} className="ml-2 rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-600 dark:bg-slate-800">{[5,10,15,20].map(x=><option key={x}>{x}</option>)}</select></label>
      <Button className="mt-4" onClick={()=>start(pickQs(pool,n,s.mastery),tid==='all'?'Mixed Quiz':T(tid).title)}>Start Quiz</Button></Panel>
    <Panel><h2 className="font-semibold">Today’s Review</h2><p className="my-1 text-sm">10 questions from weak spots, past mistakes and new material (~5 min).</p>
      <Button v="s" onClick={()=>start(pickQs(cards,10,s.mastery,w.map(x=>x.cardId)),'Daily Review')}>Start Review</Button></Panel>
    {w.length>0&&<Panel><h2 className="font-semibold">{w.length} missed question(s)</h2><Button v="s" onClick={()=>go('mistakes')}>My Mistakes</Button></Panel>}</div>
}

function Quiz({sess,s,record,finish,go,retry}:{sess:{qs:Q[];label:string};s:State;record:(q:Q,ok:boolean,g:string)=>void;finish:(a:number,b:number,c:number,l:string)=>void;go:(p:Pg,t?:string)=>void;retry:()=>void}){
  const {qs}=sess;const [i,setI]=useState(0);const [res,setRes]=useState<boolean|null>(null);const [given,setGiven]=useState('')
  const [hint,setHint]=useState(false);const [log,setLog]=useState<{q:Q;ok:boolean;g:string}[]>([]);const [secs,setSecs]=useState<number|null>(null)
  const t0=useRef(Date.now());const q=qs[i]
  useEffect(()=>{if(secs!==null)finish(log.filter(l=>l.ok).length,qs.length,secs,sess.label)},[secs])
  const submit=(g:string)=>{if(res!==null)return;const ok=check(q,g);setGiven(g);setRes(ok);setLog(l=>[...l,{q,ok,g}]);record(q,ok,g);if(s.sound)beep(ok)}
  const next=()=>{if(i+1>=qs.length)setSecs(Math.round((Date.now()-t0.current)/1000));else{setI(i+1);setRes(null);setGiven('');setHint(false)}}
  if(secs!==null){
    const score=log.filter(l=>l.ok).length,by:Record<string,[number,number]>={}
    log.forEach(l=>{const t=T(l.q.card.topic).title;by[t]=by[t]||[0,0];by[t][1]++;if(l.ok)by[t][0]++})
    const acc=Math.round(score/qs.length*100)
    return<div className="space-y-4"><H>Quiz Complete! ♡</H>
      <Panel><p className="text-3xl font-bold">Score: {score} / {qs.length}</p><p>Accuracy: {acc}% · Time: {Math.floor(secs/60)}m {secs%60}s · Correct {score} · Incorrect {qs.length-score}</p>
        <p className="mt-2">{acc>=80?'Proud of you! ♡':'Nice work — every review makes it stick.'}</p></Panel>
      <Panel><h2 className="font-semibold">By topic</h2><ul className="mt-2 space-y-1 text-sm">{Object.entries(by).map(([k,[a,b]])=><li key={k}>{a/b>=.7?'✓ Performed well':'↻ Needs review'}: {k} ({a}/{b})</li>)}</ul></Panel>
      {score<qs.length&&<Panel><h2 className="font-semibold">Questions to revisit</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{log.filter(l=>!l.ok).map(l=><li key={l.q.id}>{l.q.prompt} — <b>{l.q.answer}</b></li>)}</ul></Panel>}
      <div className="flex flex-wrap gap-2"><Button onClick={()=>go('mistakes')}>Review Mistakes</Button><Button v="s" onClick={retry}>Retry Quiz</Button><Button v="s" onClick={()=>go('home')}>Continue Studying</Button></div></div>}
  return<div><div className="mb-2 flex justify-between text-sm"><span>{sess.label} · Question {i+1} of {qs.length}</span><span>{{mc:'Multiple choice',id:'Identification',tf:'True / False'}[q.type as QT]}</span></div>
    <Bar pct={Math.round(i/qs.length*100)} label="Quiz progress"/>
    <Panel className="mt-4"><p className="text-lg" id="qtext">{q.prompt}</p>
      {q.options?<div role="group" aria-labelledby="qtext" className="mt-4 grid gap-2">{q.options.map(o=>{
        const done=res!==null,right=o===q.answer,mine=o===given
        return<button key={o} disabled={done} onClick={()=>submit(o)} className={`rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-rose-600 ${done&&right?'border-emerald-600 bg-emerald-50 dark:bg-emerald-950':done&&mine?'border-rose-600 bg-rose-50 dark:bg-rose-950':'border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700'}`}>
          {done&&right&&'✓ '}{done&&mine&&!right&&'✗ '}{o}{done&&right&&' (correct)'}{done&&mine&&!right&&' (your answer)'}</button>})}</div>
      :<form className="mt-4 flex gap-2" onSubmit={e=>{e.preventDefault();submit(given)}}><label className="sr-only" htmlFor="ans">Your answer</label>
        <input id="ans" autoFocus autoComplete="off" disabled={res!==null} value={given} onChange={e=>setGiven(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-900" placeholder="Type your answer"/>
        <Button type="submit" disabled={res!==null||!given.trim()}>Check</Button></form>}
      {res===null&&<div className="mt-3"><Button v="g" onClick={()=>setHint(true)}>💡 Hint</Button>{hint&&<p className="mt-1 text-sm" role="note">{q.hint}</p>}</div>}</Panel>
    {res!==null&&<Panel className="pop mt-4" ><div role="status"><p className="font-semibold">{res?'✓ Nice! That’s correct. ♡':'✗ Not quite — let’s review this one.'}</p>
      {!res&&<p className="mt-1 text-sm">Your Answer: <b>{given||'(blank)'}</b><br/>Correct Answer: <b>{q.answer}</b></p>}
      <p className="mt-1 text-sm">Why: {q.card.why||`${q.card.back} — ${fill(q.card)}`}</p>
      <p className="mt-1 text-sm">Memory Tip: say “{q.card.term}” out loud together with its meaning, then try the flashcard again.</p></div>
      <div className="mt-3 flex gap-2"><Button onClick={next} autoFocus>{i+1>=qs.length?'Finish':'Next question →'}</Button></div></Panel>}</div>
}

function Mistakes({s,start}:P){
  const w=Object.entries(s.wrong)
  return<div><H>My Mistakes</H>{!w.length?<Panel>No mistakes right now — nice work! ♡</Panel>:<>
    <Button className="mb-4" onClick={()=>start(w.map(([,m])=>makeQ(cards.find(c=>c.id===m.cardId)!,m.type as QT)),'My Mistakes')}>Practice My Mistakes</Button>
    <div className="space-y-3">{w.map(([id,m])=><Panel key={id}><p className="text-xs text-slate-500 dark:text-slate-400">{T(m.topic).title}</p><p className="my-1 font-medium">{m.prompt}</p>
      <p className="text-sm">✗ Your answer: <b>{m.given||'(blank)'}</b><br/>✓ Correct: <b>{m.answer}</b></p><p className="mt-1 text-sm">Why: {m.why}</p></Panel>)}</div></>}</div>
}

function Saved({s,up,go}:P){
  const secs=s.marks.filter(m=>m.startsWith('sec:')).map(m=>T(m.slice(4))),cs=s.marks.filter(m=>m.startsWith('card:')).map(m=>cards.find(c=>c.id===m.slice(5))!).filter(Boolean)
  const rm=(k:string)=>up(x=>({...x,marks:x.marks.filter(m=>m!==k)}))
  return<div><H>Saved</H>{!s.marks.length&&<Panel>Nothing saved yet. Tap “Save” on a reviewer section, flashcard or quiz question.</Panel>}
    <div className="space-y-3">{secs.map(t=><Panel key={t.id}><b>{t.title}</b><div className="mt-2 flex gap-2"><Button v="s" onClick={()=>go('study',t.id)}>Open</Button><Button v="g" onClick={()=>rm('sec:'+t.id)}>Remove</Button></div></Panel>)}
    {cs.map(c=><Panel key={c.id}><p className="text-sm">{c.front}</p><p className="font-semibold">→ {c.back}</p><Button v="g" onClick={()=>rm('card:'+c.id)}>Remove</Button></Panel>)}</div></div>
}

function Search({go}:P){
  const [q,setQ]=useState('');const k=q.trim().toLowerCase()
  const ts=k?topics.filter(t=>(t.title+t.intro+t.remember).toLowerCase().includes(k)):[]
  const cs=k?cards.filter(c=>(c.term+c.front+c.back).toLowerCase().includes(k)):[]
  return<div><H>Search</H><label className="sr-only" htmlFor="sq">Search the reviewer</label>
    <input id="sq" autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Try “Cubism”, “Mozart”, “Parthenon”…" className="mb-4 w-full rounded-xl border border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-800"/>
    {k&&!ts.length&&!cs.length&&<p>No results.</p>}
    <div className="space-y-3">{ts.map(t=><Panel key={t.id}><p className="text-xs">Reviewer</p><b>{t.title}</b><div><Button v="s" className="mt-2" onClick={()=>go('study',t.id)}>Open</Button></div></Panel>)}
    {cs.map(c=><Panel key={c.id}><p className="text-xs text-slate-500 dark:text-slate-400">Flashcard · {T(c.topic).title}</p><p className="text-sm">{c.front}</p><p className="font-semibold">→ {c.back}</p>
      <div className="mt-2 flex gap-2"><Button v="s" onClick={()=>go('study',c.topic)}>Reviewer</Button><Button v="s" onClick={()=>go('cards',c.topic)}>Flashcards</Button></div></Panel>)}</div></div>
}

function Settings({s,up}:P){
  const [ask,setAsk]=useState<null|'progress'|'history'>(null)
  const sw=(l:string,on:boolean,f:()=>void)=><label className="flex items-center justify-between py-2"><span>{l}</span><input type="checkbox" role="switch" checked={on} onChange={f} className="h-5 w-5 accent-rose-600"/></label>
  return<div className="space-y-4"><H>Settings</H><Panel>
    <label className="block text-sm">Display name<input value={s.name} onChange={e=>up(x=>({...x,name:e.target.value}))} className="mt-1 block w-full rounded-xl border border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-900"/></label>
    {sw('Dark mode',s.theme==='dark',()=>up(x=>({...x,theme:x.theme==='dark'?'light':'dark'})))}
    {sw('Sound effects',s.sound,()=>up(x=>({...x,sound:!x.sound})))}{sw('Animations',s.anim,()=>up(x=>({...x,anim:!x.anim})))}</Panel>
    <Panel><div className="flex flex-wrap gap-2"><Button v="s" onClick={()=>setAsk('progress')}>Reset Progress</Button><Button v="s" onClick={()=>setAsk('history')}>Reset Quiz History</Button></div></Panel>
    {ask&&<Modal title="Are you sure?" onClose={()=>setAsk(null)}><p className="mb-4 text-sm">{ask==='progress'?'This erases mastery, flashcard marks, mistakes, saved items and streak.':'This erases your quiz score history.'} It can’t be undone.</p>
      <div className="flex justify-end gap-2"><Button v="s" onClick={()=>setAsk(null)}>Cancel</Button><Button onClick={()=>{up(x=>ask==='progress'?{...x,mastery:{},cards:{},wrong:{},marks:[],days:[],last:undefined}:{...x,history:[]});setAsk(null)}}>Yes, reset</Button></div></Modal>}</div>
}
