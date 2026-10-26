// CONTENT LAYER — Marine Environment: Semi-Final 4 (Annex V – Garbage Management, Reception Facilities, Exemptions, Fishing Gear & Penalties)
// Replace src/data/content.ts with this file. Nothing else in the UI needs to change.
export interface Card{id:string;topic:string;term:string;front:string;back:string;alt?:string[];opts?:string[];only?:'mc'|'id';why?:string}
export interface Topic{id:string;subject:string;title:string;intro:string;remember:string;level:string;note?:string;meta?:string}

// rows: [answer, clue (the meaning), optional extra explanation shown as "why"]
const clue=(topic:string,rows:[string,string,string?][]):Card[]=>rows.map(([back,front,why],i)=>({id:topic+i,topic,term:back,front,back,...(why?{why}:{})}))
const idc=(topic:string,rows:[string,string,string?][]):Card[]=>clue(topic,rows).map(c=>({...c,only:'id' as const}))

// ───────────────────────── SEMI-FINAL 4 (MARPOL Annex V – Garbage) · IDENTIFICATION ONLY ─────────────────────────
const S4='Marine Env · Semi-Final 4'
const topicsSF4:Topic[]=[
{id:'sf4gms',subject:S4,title:'Garbage Management System',level:'Medium',
 intro:'The Garbage Management Plan, the Garbage Record Book (Part I and Part II), and the placards that must be displayed on board.',
 remember:'Plan: 100 GT and above, or certified for 15 or more persons. Record Book: 400 GT and above, or 15 or more persons on international voyages. Part I = all ships (items A–I). Part II = solid bulk cargoes only (items J–K). Placards: ships of 12 m or more.'},
{id:'sf4recv',subject:S4,title:'Reception Facilities',level:'Medium',
 intro:'Why port reception facilities matter, the role of IMO and MEPC, and the Port Reception Facility Database (PRFD).',
 remember:'IMO: reception facilities are crucial for MARPOL. MEPC 54 (March 2006): "zero tolerance of illegal discharges" can only be enforced with adequate facilities. PRFD = module of GISIS; Member States update it, the public can only view it; live 1 March 2006.'},
{id:'sf4exempt',subject:S4,title:'Exemptions: General Garbage',level:'Easy',
 intro:'The exceptions to the prohibition of garbage discharge under MARPOL Annex V for general garbage.',
 remember:'Two exceptions: (1) discharge necessary to secure the safety of the ship and those on board, or to save a life at sea; (2) accidental loss resulting from damage to the ship or its equipment, if all reasonable precautions were taken before and after the damage.'},
{id:'sf4fish',subject:S4,title:'Exemptions: Fishing Gear, Reporting & Penalties',level:'Hard',
 intro:'When fishing gear may be lost or discharged, what the fishing vessel operator must report and record, and the penalties for MARPOL breaches.',
 remember:'Fishing gear exemptions: accidental loss (with reasonable precautions) or discharge to protect the marine environment or the safety of the ship or crew. If it cannot be retrieved and is a threat: report position and reasons to the nearest port authority or JRCC; AMSA may broadcast MSI. Still record it in the Garbage Record Book. Penalties: Protection of the Sea Act 1983, power to detain vessels, owner must post a financial undertaking.',
 note:'The reporting details (JRCC Canberra, AMSA, 1800 641 792, the 1983 Act) are the Australian rules used in your slides.'}]

const sf4gms=idc('sf4gms',[
['Garbage Management','MARPOL Annex V requires ships to manage and record the waste generated on board, including discharges.'],
['Garbage Management Plan','The document that contains the procedures for collecting, storing, processing and discharging garbage, including the use of equipment on board.'],
['100 gross tonnage','Every ship of ________ and above is required to carry a Garbage Management Plan.'],
['15 or more persons','Besides ships of 100 GT and above, ships certified to carry ________ are also required to carry a Garbage Management Plan.'],
['Garbage Record Book','The book that ships of 400 GT and above, engaged in international voyages, must maintain and retain on board.'],
['400 gross tonnage','Every ship of ________ and above engaged in international voyages must maintain and retain a Garbage Record Book on board.'],
['Garbage Record Book or the ship’s official logbook','Fishing vessel operators must record the discharge or loss of fishing gear in either of these two records.'],
['Two (Part I and Part II)','The Garbage Record Book is divided into this many parts.'],
['Part I','The part of the Garbage Record Book that is used by all ships.'],
['Part II','The part of the Garbage Record Book that is required only for ships that carry solid bulk cargoes.'],
['Plastics','Garbage Record Book Part I, item A.'],
['Food wastes','Garbage Record Book Part I, item B.'],
['Domestic wastes','Garbage Record Book Part I, item C.'],
['Cooking oil','Garbage Record Book Part I, item D.'],
['Incinerator ashes','Garbage Record Book Part I, item E.'],
['Operational wastes','Garbage Record Book Part I, item F.'],
['Animal carcass(es)','Garbage Record Book Part I, item G.'],
['Fishing gear','Garbage Record Book Part I, item H.'],
['E-waste','Garbage Record Book Part I, item I.'],
['Cargo residues (non-Harmful to the Marine Environment)','Garbage Record Book Part II, item J.'],
['Cargo residues (Harmful to the Marine Environment)','Garbage Record Book Part II, item K.'],
['Placards','Notices that inform the crew and passengers of the MARPOL garbage discharge requirements for the ship.'],
['12 meters','Ships of ________ or more in length are required to display placards.'],
['Prominent places','Placards should be placed in these kinds of locations on board (e.g. galley spaces, bridge, main deck and passenger accommodation) so crew and passengers will see them.'],
['Shipboard handling and discharge of garbage','The flow chart in Table 2 of the Garbage Management Plan shows the options for this, from collection and separation up to sea discharge or port reception.']])

const sf4recv=idc('sf4recv',[
['Reception facilities','IMO recognized that the provision of these is crucial for effective MARPOL implementation.'],
['Marine Environment Protection Committee (MEPC)','The IMO committee that strongly encouraged Member States to fulfil their treaty obligations on providing adequate reception facilities.'],
['Port States','The Parties to MARPOL that are particularly urged to provide adequate reception facilities.'],
['MEPC 54','The March 2006 session that emphasized the importance of adequate reception facilities in the chain of implementation of MARPOL.'],
['Zero tolerance of illegal discharges from ships','The policy that could only be effectively enforced when there were adequate reception facilities in ports.'],
['Port Reception Facility Database (PRFD)','The database the Committee agreed to develop as a module of IMO GISIS, covering reception facilities.'],
['Global Integrated Shipping Information System (GISIS)','The IMO system of which the PRFD is a module.'],
['Member States','Those who can update the PRFD via a log-in password.'],
['View-only basis','The public can access all the information in the PRFD on this basis.'],
['1 March 2006','The date the PRFD went live to the public.']])

const sf4exempt=idc('sf4exempt',[
['Exemptions','Exceptions to the prohibition of garbage discharge under MARPOL Annex V.'],
['Safety of the ship and those on board, or saving a life at sea','Discharge of garbage from a ship is allowed when it is necessary for this.'],
['Accidental loss of garbage resulting from damage to a ship or its equipment','This kind of loss is exempt, provided all reasonable precautions were taken before and after the damage to prevent or minimise it.'],
['All reasonable precautions','To qualify for the exemption for accidental loss from damage, these must have been taken before and after the damage occurred.']])

const sf4fish=idc('sf4fish',[
['Accidental loss of fishing gear','This is exempt from the garbage discharge prohibition, provided all reasonable precautions were taken to prevent such loss.'],
['Protection of the marine environment or safety of the ship or crew','Discharge of fishing gear from a ship is allowed for either of these purposes.'],
['Fishing gear','Nets, long lines, fish traps or any human-made contraptions designed to catch fish.'],
['Catch fish','Fishing gear refers to any human-made contraption designed to ________.'],
['Fishing vessel operator','The person required to report the loss or discharge of fishing gear that cannot be reasonably retrieved and poses a significant threat.'],
['Cannot be reasonably retrieved and poses a significant threat to the marine environment and navigation','Fishing gear loss must be reported when it meets these conditions.'],
['Approximate position and reasons for the loss','These are what the fishing vessel operator must report for lost fishing gear.'],
['Nearest port authority or the Joint Rescue Coordination Centre (JRCC)','The places where the operator must report the position and reasons for the loss of fishing gear.'],
['Canberra','The city where the Joint Rescue Coordination Centre mentioned in the lesson is located.'],
['1800 641 792','The telephone number of the JRCC in Canberra for reporting lost fishing gear.'],
['AMSA (Australian Maritime Safety Authority)','The authority that can broadcast Maritime Safety Information if there is a significant risk to navigation.'],
['Maritime Safety Information (MSI)','The warning broadcast by AMSA when lost fishing gear poses a significant risk to navigation.'],
['Garbage Record Book','Even after reporting, the loss of fishing gear must still be recorded here.'],
['Protection of the Sea (Prevention of Pollution from Ships) Act 1983','The law that contains substantial penalties for MARPOL breaches.'],
['Power to detain vessels','Besides penalties, this power is given under the Protection of the Sea Act 1983 for MARPOL breaches.'],
['Undertaking of considerable financial security','A detention requires the owner to post this.']])

export const topics:Topic[]=[...topicsSF4]
export const cards:Card[]=[...sf4gms,...sf4recv,...sf4exempt,...sf4fish]
