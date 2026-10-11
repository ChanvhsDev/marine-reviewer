// CONTENT LAYER — Marine Environment, Semi-Final Week 1 (MARPOL Annex IV – Sewage)
// Replace src/data/content.ts with this file. Nothing else in the UI needs to change.
export interface Card{id:string;topic:string;term:string;front:string;back:string;alt?:string[];opts?:string[];only?:'mc';why?:string}
export interface Topic{id:string;subject:string;title:string;intro:string;remember:string;level:string;note?:string}

export const topics:Topic[]=[
{id:'overview',subject:'MARPOL Annex IV',title:'Overview: Purpose & Applicability',level:'Easy',
 intro:'What Annex IV is, why it exists, which ships it covers, and the certificate that proves compliance.',
 remember:'Annex IV = sewage. Covers ships of 400 GT and above, or under 400 GT certified for more than 15 persons, on international voyages. Proof of compliance: the ISPPC.'},
{id:'defs',subject:'MARPOL Annex IV',title:'Regulation 1: Definitions',level:'Medium',
 intro:'Key terms: sewage, new and existing ship, holding tank, nearest land, international voyage, person and anniversary date.',
 remember:'Sewage = toilets and urinals + medical premises + spaces with living animals + other wastewater mixed with these. A new ship is delivered 3 years or more after entry into force (or contracted/keel-laid on or after it).',
 note:'Your slides name the “Director of Marine” as the approving authority (the Administration). Use that wording for your exam.'},
{id:'apply',subject:'MARPOL Annex IV',title:'Regulations 2 & 3: Application & Exemptions',level:'Medium',
 intro:'Which new and existing ships must comply, the 1983 keel-laying provision, and the two exemptions.',
 remember:'Existing ships: Annex IV applies five years after entry into force. Exemptions: safety of ship / saving life at sea, and damage to the ship or equipment (with all reasonable precautions taken).'},
{id:'discharge',subject:'MARPOL Annex IV',title:'Discharge Distances & Conditions',level:'Medium',
 intro:'What may be discharged at 0–3 nm, 3–12 nm and beyond 12 nm from the nearest land.',
 remember:'0–3 nm: only effluent from an approved STP. 3–12 nm: comminuted AND disinfected. Beyond 12 nm: untreated allowed, but ship en route, at least 4 knots, at an approved discharge rate.'},
{id:'systems',subject:'MARPOL Annex IV',title:'Regulation 9: Sewage Systems & Components',level:'Hard',
 intro:'The three approved systems and how each one works, with the parts of a sewage treatment plant and a comminuting system.',
 remember:'A ship needs ONE of three: approved STP, comminuting and disinfecting system (with temporary storage for within 3 nm), or holding tank (with a visual content indicator).'}]

const clue=(topic:string,rows:[string,string][]):Card[]=>rows.map(([back,front],i)=>({id:topic+i,topic,term:back,front,back}))

const overview=clue('overview',[
['MARPOL Annex IV','The part of MARPOL that controls and prevents pollution by sewage from ships.'],
['International Maritime Organization','The body (IMO) whose regulation controls and prevents pollution by sewage from ships.'],
['Untreated sewage','Annex IV protects marine and coastal environments from the harmful effects of discharging ________.'],
['400 gross tonnage','Annex IV applies to ships of ________ (GT) and above engaged in international voyages.'],
['15 persons','Ships under 400 GT are covered by Annex IV if certified to carry more than ________.'],
['International Sewage Pollution Prevention Certificate','The certificate, abbreviated ISPPC, that compliant ships engaged in international trade must hold.']])

const defs=clue('defs',[
['Sewage','Drainage and wastes from toilets and urinals, from medical premises, and from spaces containing living animals, plus other wastewater mixed with these.'],
['New ship','A ship whose building contract was placed (or keel laid) on or after the Annex’s entry into force, or which is delivered three years or more after that date.'],
['Existing ship','Any ship that is not a new ship.'],
['Holding tank','A tank used for the collection and storage of sewage.'],
['Nearest land','“From the ________” means from the baseline from which the territorial sea is established in accordance with international law.'],
['International voyage','A voyage from a country to which the Convention applies to a port outside that country, or conversely.'],
['Person','A member of the crew or a passenger.'],
['Anniversary date','The day and month each year that corresponds to the expiry date of the International Sewage Pollution Prevention Certificate.'],
['North Eastern Coast of Australia','The area with a special “nearest land” line defined by 12 coordinate points, from 11°00′ S, 142°08′ E down to 24°42′ S, 153°15′ E.']])

const apply=clue('apply',[
['Five years','Existing ships fall under Annex IV this long after the date of entry into force.'],
['2 October 1983','Existing ships whose keels were laid before this date must be equipped, as far as practicable, to discharge sewage per Regulation 11.'],
['Regulation 3','The regulation that lists exemptions from the sewage discharge requirements.'],
['Saving life at sea','Discharge is exempt when necessary to secure the safety of the ship and those on board, or for ________.'],
['Damage to the ship or its equipment','Discharge resulting from ________ is exempt if all reasonable precautions were taken before and after to prevent or minimize it.'],
['Regulation 2','The regulation on application: which new and existing ships on international voyages must comply.']])

const discharge=clue('discharge',[
['Prohibited','Discharging raw sewage within 3 nautical miles is ________ unless it has been processed through an approved sewage treatment plant.'],
['Approved sewage treatment plant','Within 3 nm, only sewage that has been processed through an ________ may be discharged.'],
['Between 3 and 12 nautical miles','Comminuted and disinfected sewage may be discharged only within this distance range from the nearest land.'],
['Comminuted and disinfected','Between 3 and 12 nm, sewage may be discharged only if it has been ________ using an approved system.'],
['Beyond 12 nautical miles','Untreated sewage may be discharged only at this distance from the nearest land.'],
['En route','When discharging untreated sewage beyond 12 nm, the ship must be ________ (underway).'],
['4 knots','When discharging untreated sewage beyond 12 nm, the ship’s speed must be at least ________.'],
['Approved discharge rate','Untreated sewage beyond 12 nm must be released following the ________.']])

const systems=clue('systems',[
['Three','A ship must be equipped with one of ________ approved sewage systems.'],
['Director of Marine','The authority that approves the type of sewage treatment plant and the comminuting system, and the holding tank capacity.'],
['Sewage treatment plant','The system whose type must be approved taking into account standards and test methods developed by the Organization.'],
['Comminuting and disinfecting system','The system that must have facilities for temporary storage of sewage when the ship is less than 3 nm from the nearest land.'],
['Holding tank','The system with capacity for retention of all sewage and a means to indicate visually the amount of its contents.'],
['Screen filter','The part of the STP that catches large debris coming in from the inlets.'],
['Grey water','Drainage from sinks and showers, which enters the STP through its own inlet, separate from black water.'],
['Aeration chamber','The STP section where blowers supply oxygen to aerobic bacteria that digest the waste.'],
['Settlement chamber','The STP section where digested sludge settles; sludge is sent back through the sludge return line.'],
['Chlorinator','The STP equipment that disinfects the effluent in the chlorination and collection chamber before it goes overboard.'],
['High-level and low-level floats','The HL and LL float switches that control the automatic start and stop of the overboard discharge pump.'],
['Grinder pump','The comminuting system pump that pulverizes solid waste into fine particles.'],
['Sludge retention tank','The comminuting system tank that retains concentrated solids when discharge is not permitted.']])
systems.push({id:'systemsNot',topic:'systems',term:'Oily water separator',front:'Which of these is NOT one of the three sewage systems allowed under Regulation 9?',back:'Oily water separator',opts:['Sewage treatment plant','Comminuting and disinfecting system','Holding tank'],only:'mc',why:'Regulation 9 allows only a sewage treatment plant, a comminuting and disinfecting system, or a holding tank. An oily water separator is not one of them.'})

export const cards:Card[]=[...overview,...defs,...apply,...discharge,...systems]