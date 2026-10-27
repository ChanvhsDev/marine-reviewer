// CONTENT LAYER — Marine Environment: Semi-Final 1 + 2 (Annex IV – Sewage) + Semi-Final 3 (Annex V – Garbage) + Semi-Final 4 (Exam review + Week 4 slides)
// Replace src/data/content.ts with this file. Nothing else in the UI needs to change.
export interface Card{id:string;topic:string;term:string;front:string;back:string;alt?:string[];opts?:string[];only?:'mc'|'id';why?:string}
export interface Topic{id:string;subject:string;title:string;intro:string;remember:string;level:string;note?:string;meta?:string}

const topicsSF1:Topic[]=[
{id:'overview',subject:'Marine Env · Semi-Final 1',title:'Overview: Purpose & Applicability',level:'Easy',
 intro:'What Annex IV is, why it exists, which ships it covers, and the certificate that proves compliance.',
 remember:'Annex IV = sewage. Covers ships of 400 GT and above, or under 400 GT certified for more than 15 persons, on international voyages. Proof of compliance: the ISPPC.'},
{id:'defs',subject:'Marine Env · Semi-Final 1',title:'Regulation 1: Definitions',level:'Medium',
 intro:'Key terms: sewage, new and existing ship, holding tank, nearest land, international voyage, person and anniversary date.',
 remember:'Sewage = toilets and urinals + medical premises + spaces with living animals + other wastewater mixed with these. A new ship is delivered 3 years or more after entry into force (or contracted/keel-laid on or after it).',
 note:'Your slides name the “Director of Marine” as the approving authority (the Administration). Use that wording for your exam.'},
{id:'apply',subject:'Marine Env · Semi-Final 1',title:'Regulations 2 & 3: Application & Exemptions',level:'Medium',
 intro:'Which new and existing ships must comply, the 1983 keel-laying provision, and the two exemptions.',
 remember:'Existing ships: Annex IV applies five years after entry into force. Exemptions: safety of ship / saving life at sea, and damage to the ship or equipment (with all reasonable precautions taken).'},
{id:'discharge',subject:'Marine Env · Semi-Final 1',title:'Discharge Distances & Conditions',level:'Medium',
 intro:'What may be discharged at 0–3 nm, 3–12 nm and beyond 12 nm from the nearest land.',
 remember:'0–3 nm: only effluent from an approved STP. 3–12 nm: comminuted AND disinfected. Beyond 12 nm: untreated allowed, but ship en route, at least 4 knots, at an approved discharge rate.'},
{id:'systems',subject:'Marine Env · Semi-Final 1',title:'Regulation 9: Sewage Systems & Components',level:'Hard',
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

const cardsSF1:Card[]=[...overview,...defs,...apply,...discharge,...systems]

// ───────────────────────── SEMI-FINAL 2 ─────────────────────────
const S2='Marine Env · Semi-Final 2'
const topicsSF2:Topic[]=[
{id:'sf2stp',subject:S2,title:'Sewage Treatment Plant: Purpose & Operation',level:'Easy',
 intro:'What a shipboard STP does, why it matters, and what marine engineers must know to operate it.',
 remember:'An STP treats wastewater from toilets, showers and galleys so the effluent is safe to discharge. Engineers must know starting/stopping procedures, maintenance and checks, plus four key terms.'},
{id:'sf2terms',subject:S2,title:'Four Important STP Terms: BOD, Coliform & Solids',level:'Hard',
 intro:'Biochemical Oxygen Demand, coliform count, the kinds of solids, and the recommended levels.',
 remember:'BOD tests sewage strength (bacteria + oxygen). Coliform = pollution indicator; IMO: under 100 thermotolerant coliforms per 100 ml after treatment. Solids: dissolved, suspended, settleable.',
 note:'Your slide gives the post-treatment suspended solids level as “25 Qi/Qe mg/l”, which looks garbled, so it is not used in any question. Confirm the exact figure with your instructor.'},
{id:'sf2bio',subject:S2,title:'Biochemical Digestion: Anaerobic vs Aerobic',level:'Medium',
 intro:'How bacteria break down sewage with and without oxygen, and why the two processes give very different results.',
 remember:'Anaerobic = no free oxygen → putrefaction → noxious, toxic, corrosive by-products. Aerobic = needs free oxygen → safe products (water, CO2, inert residue).'},
{id:'sf2cert',subject:S2,title:'ISPPC: Form of Certificate (Appendix)',level:'Easy',
 intro:'What the International Sewage Pollution Prevention Certificate certifies and what particulars it lists.',
 remember:'The ISPPC certifies the ship has a sewage treatment plant, comminutor or holding tank and discharge pipeline complying with Regulations 9 and 10 of Annex IV, and lists ship particulars including the IMO Number.'},
{id:'sf2recv',subject:S2,title:'Reception Facilities (Regulation 12)',level:'Medium',
 intro:'Port facilities for receiving ship-generated waste, and the duties of governments under Regulation 12.',
 remember:'Regulation 12: governments ensure adequate sewage reception facilities at ports and terminals without delay to ships, and notify the Organization of any alleged inadequacy.'}]

const sf2stp=clue('sf2stp',[
['Sewage treatment plant','A shipboard ________ (STP) treats wastewater from toilets, showers and galleys using biological or chemical methods to produce effluent safe for discharge.'],
['Toilets, showers and galleys','An STP treats wastewater from these three sources.'],
['Prevent marine pollution','The purpose of an STP: to ________, protect aquatic life, and ensure compliance with international maritime regulations.'],
['Marine engineers','They must know the operation of the sewage plant before using it, in order to comply with the rules on discarding sewage.'],
['Starting and stopping','While operating the plant, the engineer must know the procedure for ________ the sewage treatment plant, plus its maintenance and checks.'],
['Four','Besides operating procedures, marine engineers should know ________ important terms related to sewage treatment plants.'],
['Treated','Sewage on board ships needs to be ________ before it is discharged to the sea.'],
['Less harmful','A sewage treatment plant is used to treat the sewage and make it ________ for the sea.'],
['Maintenance and checks','Engineers must know the procedure for starting and stopping the sewage treatment plant, as well as its ________.'],
['Recommended levels of pumping out solids','The four key terms are BOD, coliform count, bio-chemical digestion of sewage and ________.'],
['Bio-chemical digestion of sewage','The four key terms are BOD, coliform count, recommended levels of pumping out solids and ________.']])

const sf2terms=clue('sf2terms',[
['Biochemical Oxygen Demand','A test (BOD) to identify biologically decomposable substances and to test the strength of the sewage.'],
['Bacteria','BOD depends on the activity of ________ in the sewage, which feed on and consume organic matter in the presence of oxygen.'],
['Coliform','An organism present in the human intestine, recognized as an indicator organism of sewage pollution.'],
['Pathogens','Coliform in water indicates the presence of ________: disease-causing bacteria responsible for cholera, dysentery, typhoid and more.'],
['125 billion','Each person contributes around ________ coliforms in winter (and 400 billion in summer).'],
['400 billion','Each person contributes around 125 billion coliforms in winter and ________ in summer.'],
['100 thermotolerant coliforms per 100 ml','IMO recommends a faecal coliform count of less than ________ of effluent after treatment (updated by MEPC.159).'],
['Dissolved solids','Solids which are dissolved in the solution.'],
['Suspended solids','Solids physically suspended in sewage that can be removed by laboratory filtration and are relatively high in organic matter.'],
['Settleable solids','Suspended solids that will subside in quiescent liquid in a reasonable period of time, usually around an hour.'],
['300-400 mg/liter','The suspended solids level of raw sewage is around ________.'],
['As low as possible','After treatment, the residual disinfectant should be ________.'],
['Ultraviolet exposure','For the chlorination method, IMO recommends the use of ________ to keep residual disinfectant low.']])

const sf2bio=clue('sf2bio',[
['Anaerobic process','Bacteria in this process multiply only in the absence of free oxygen, using chemically bound oxygen to survive.'],
['Putrefaction','The breakdown of organic matter by anaerobic bacteria into water, carbon dioxide, methane, hydrogen sulphide and ammonia is called ________.'],
['Methane, hydrogen sulphide and ammonia','Besides water and carbon dioxide, anaerobic breakdown of organic matter produces ________.'],
['Noxious and toxic','The products of the anaerobic process are ________; the effluent is of poor quality and the by-products are highly corrosive.'],
['Aerobic process','In this process, bacteria require free oxygen to survive and break organic matter down into safe products.'],
['Free oxygen','Aerobic bacteria require ________ to survive.'],
['Water, carbon dioxide and inert residue','Safe products of the aerobic process (along with energy to synthesize new bacteria).']])

const sf2cert=clue('sf2cert',[
['Regulations 9 and 10','The ISPPC certifies the ship’s sewage equipment and discharge pipeline comply with ________ of Annex IV.'],
['Sewage treatment plant, comminutor or holding tank','The ISPPC certifies that the ship is equipped with a discharge pipeline and one of these: a ________.'],
['IMO Number','Ship particulars on the ISPPC include name, distinctive number or letter, port of registry, gross tonnage, number of persons certified to carry, and ________.'],
['International Sewage Pollution Prevention Certificate','The certificate (ISPPC) whose form appears in the Appendix and is issued under MARPOL provisions.']])

const sf2recv=clue('sf2recv',[
['Reception facilities','Facilities designed to receive ship-generated waste such as oily residues, garbage and other contaminants, so waste is not discharged into the ocean.'],
['Regulation 12','The regulation on reception facilities.'],
['Government of each Party','Who undertakes to ensure the provision of sewage reception facilities at ports and terminals under Regulation 12.'],
['Without causing delay','Reception facilities for sewage must be provided ________ to ships and be adequate to meet the needs of the ships using them.'],
['The Organization','The Government of each Party notifies ________ (IMO), for transmission to Contracting Governments, of all cases where facilities are alleged to be inadequate.'],
['Regulation 11.1','Regulation 12 applies to governments that require ships in their waters to comply with ________.']])


// ───────────────────────── SEMI-FINAL 3 (MARPOL Annex V – Garbage) · IDENTIFICATION ONLY ─────────────────────────
const S3='Marine Env · Semi-Final 3'
const idc=(topic:string,rows:[string,string][]):Card[]=>clue(topic,rows).map(c=>({...c,only:'id' as const}))
const topicsSF3:Topic[]=[
{id:'sf3intro',subject:S3,title:'Annex V: Purpose, Dates & Regulations',level:'Easy',
 intro:'What MARPOL Annex V regulates, when it took effect, and the regulations that allow limited discharge.',
 remember:'Annex V = garbage. In force 31 Dec 1988; revised Annex V in force 1 Jan 2013 and prohibits ALL garbage discharge unless explicitly permitted (Regs 3, 4, 5, 6). Reg 7 = emergency and non-routine exceptions. Port reception facilities are the recommended primary means of discharge.',
 note:'Garbage Management System, Reception Facilities and Exemptions are covered in the Semi-Final 4 (Week 4) topics.'},
{id:'sf3defs',subject:S3,title:'Definition of Terms (Annex V)',level:'Hard',
 intro:'Ship, garbage, waste, food wastes, plastic, domestic wastes, oil residue, rags, cargo residues, dishwater, e-waste, recycling and reuse.',
 remember:'Garbage = food wastes + domestic wastes + operational wastes + all plastics + cargo residues + incinerator ashes + cooking oil + fishing gear + animal carcasses. Domestic wastes do NOT include grey water. Recycling = reprocessing; Reuse = no reprocessing.'},
{id:'sf3disch',subject:S3,title:'General Prohibition & Discharge Rules',level:'Hard',
 intro:'Distances, screen size and conditions for discharging food waste, cargo residues, cleaning agents and animal carcasses.',
 remember:'Food waste: ground to 25 mm or less → 3 nm or more; not ground → 12 nm or more; within 500 m of a platform → no discharge. Non-HME cargo residues: en route, not less than 12 nm. HME → onshore reception facility. Mixed garbage → the more stringent rule.'},
{id:'sf3areas',subject:S3,title:'Special Areas under MARPOL',level:'Easy',
 intro:'Sea areas that get a higher level of protection under MARPOL.',
 remember:'Annex V special areas (8): Mediterranean Sea, Baltic Sea, Black Sea, Red Sea, “Gulfs” area, North Sea, Antarctic area (south of 60° S), and the Wider Caribbean region (incl. Gulf of Mexico and Caribbean Sea).'}]

const sf3intro=idc('sf3intro',[
['MARPOL Annex V','The part of MARPOL that regulates the prevention of pollution by garbage from ships.'],
['31 December 1988','The date MARPOL Annex V originally entered into force.'],
['1 January 2013','The date the revised MARPOL Annex V entered into force, prohibiting discharge of all garbage unless explicitly permitted.'],
['All ships','Unless expressly provided otherwise, Annex V applies to ________, from merchant ships and platforms to pleasure crafts and yachts.'],
['150','More than ________ countries have signed up to MARPOL Annex V.'],
['Regulations 3, 4, 5 and 6','Under the revised Annex V, discharge of all garbage into the sea is prohibited except as specifically permitted in ________.'],
['Regulation 7','The regulation that provides limited exceptions in emergency and non-routine situations.'],
['Port reception facilities','Ships are recommended to use ________ as the primary means of discharge for all garbage.'],
['Six','The Annex V Guidelines are divided into ________ sections, from Introduction to Enhancement of compliance.']])

const sf3defs=idc('sf3defs',[
['Ship','A vessel of any type whatsoever operating in the marine environment, including hydrofoil boats, air-cushioned vehicles, submersibles, floating craft and fixed or floating platforms.'],
['Shipboard incinerator','A shipboard facility designed for the primary purpose of incineration.'],
['Garbage','All kinds of food wastes, domestic wastes and operational wastes, all plastics, cargo residues, incinerator ashes, cooking oil, fishing gear and animal carcasses generated during the normal operation of the ship.'],
['Waste','Useless, unneeded or superfluous matter which is to be discarded.'],
['Food wastes','Any spoiled or unspoiled food substances, including fruits, vegetables, dairy products, poultry, meat products and food scraps generated aboard ship.'],
['Plastic','A solid material containing as an essential ingredient one or more high molecular mass polymers, formed during manufacture of the polymer or fabrication into a finished product by heat and/or pressure.'],
['Domestic wastes','All types of wastes not covered by other MARPOL Annexes that are generated in the accommodation spaces on board; this does not include grey water.'],
['Oil residue (sludge)','The residual waste oil products generated during normal operation, such as from purification of fuel or lubricating oil, separated waste oil from filtering equipment, drip tray oil, and waste hydraulic and lubricating oils.'],
['Oily rags','Rags which have been saturated with oil as controlled in Annex I to MARPOL.'],
['Contaminated rags','Rags which have been saturated with a substance defined as a harmful substance in the Annexes to MARPOL.'],
['Cargo residues','The remnants of any cargo not covered by other Annexes that remain on deck or in holds after loading or unloading, including excess or spillage, wet or dry, or entrained in wash water (but not cargo dust after sweeping).'],
['Dishwater','The residue from manual or automatic washing of dishes and cooking utensils that have been pre-cleaned so that adhering food particles would not interfere with automatic dishwashers.'],
['E-waste (electronic waste)','Electrical and electronic equipment used for the normal operation of the ship or in the accommodation spaces, including components, subassemblies and consumables, with material potentially hazardous to human health and/or the environment.'],
['Recycling','The activity of segregating and recovering components and materials for reprocessing.'],
['Reuse','The activity of recovering components and materials for further use without reprocessing.']])

const sf3disch=idc('sf3disch',[
['25 mm','Comminuted or ground food waste must be able to pass through a screen with openings no greater than ________ before discharge.'],
['3 nautical miles (3 nm)','While en route, comminuted or ground food waste can be discharged only at this distance or more from the nearest land.'],
['12 nautical miles (12 nm)','Food waste that has not been comminuted or ground can be discharged only at this distance or more from the nearest land.'],
['500 meters (500 m)','Ships operating alongside or within ________ of a fixed or floating platform cannot discharge food waste, except under very limited circumstances.'],
['Harmful to the Marine Environment (HME)','The designation for cargo residues or cleaning agents that cannot be discharged into the sea because of their hazard to aquatic ecosystems.'],
['Onshore waste reception facility','Cargo residues classified as HME must be discharged to this.'],
['12 nautical miles (12 nm)','Cargo residues not classified as HME may be discharged en route, as far as practicable from land but not less than this distance from the nearest land.'],
['International Maritime Dangerous Goods (IMDG) Code','For cleaning agents and additives, HME substances are those identified as marine pollutants in this code.'],
['Appendix of MARPOL Annex III','HME cleaning agents and additives can also be those meeting the criteria in this.'],
['The more stringent discharge requirement','When different types of garbage are combined or contaminated by prohibited substances, this rule applies.'],
['MARPOL designated special area','Animal carcasses may be discharged only when the ship is not in a ________.'],
['Thoracic and abdominal cavities','An animal carcass must be slit or cut so that these are opened (or passed through a comminuter, grinder, hogger or mincer) before discharge.'],
['Section 2.12 of the 2017 Guidelines','Animal carcass discharge must be undertaken in accordance with this.'],
['Australian Biosecurity requirements','Vessels arriving in Australian waters on an international voyage are subject to these, with additional restrictions on food and other waste.']])

const sf3areas=idc('sf3areas',[
['Special areas','Sea areas under MARPOL, with a higher level of protection than other areas, where special mandatory methods to prevent sea pollution are required for technical reasons relating to oceanographical and ecological condition and sea traffic.'],
['Eight','The number of special areas listed under Annex V (Garbage).'],
['Antarctic area','The Annex V special area south of latitude 60 degrees south.'],
['Wider Caribbean region','The Annex V special area that includes the Gulf of Mexico and the Caribbean Sea.'],
['North Sea','The Annex V special area in the list that comes after the “Gulfs” area.'],
['Higher level of protection','Special areas are provided with a ________ than other areas of the sea.']])


// ───────────────────────── SEMI-FINAL 4 · EXAM REVIEW (Identification only, grouped by priority) ─────────────────────────
const S4='Marine Env · Semi-Final 4'
const META4='Capt. Bayani L. Cataluña · October 22, 2026'
const topicsSF4:Topic[]=[
{id:'sf4high',subject:S4,meta:META4,title:'Exam Identification: High Priority (18)',level:'High Priority',
 intro:'The 18 items marked HIGH PRIORITY in the Semi-Final Examination (Annex IV and Annex V). Review these first.',
 remember:'Start here. Annex IV = sewage, Annex V = garbage. Distances: 12 nm untreated sewage; 3–12 nm comminuted and disinfected; food waste 25 mm screen, 3 nm ground, 12 nm not ground. Know BOD, coliform (under 100 per 100 ml), anaerobic vs aerobic, ISPPC, HME and Special Areas.',
 note:'In the exam key, item 2 (400 GT and above) also covers ships under 400 GT certified to carry more than 15 persons.'},
{id:'sf4imp',subject:S4,meta:META4,title:'Exam Identification: Important (12)',level:'Important',
 intro:'The 12 items marked IMPORTANT in the Semi-Final Examination.',
 remember:'Dates: Annex V in force 31 Dec 1988; revised 1 Jan 2013. Numbers: 400 billion coliform (summer), 300–400 mg/L raw suspended solids, 500 m from platforms. Regulation 12 = sewage reception facilities. Recycling = reprocessing; Reuse = no reprocessing.'},
{id:'sf4add',subject:S4,meta:META4,title:'Exam Identification: Additional Review (2)',level:'Additional Review',
 intro:'The 2 items marked ADDITIONAL REVIEW in the Semi-Final Examination.',
 remember:'Putrefaction = anaerobic breakdown of organic matter. PRFD = Port Reception Facility Database, an IMO module of GISIS.',
 note:'The PRFD item is not in your Week 1–3 slides. It comes only from the exam review.'}]

const sf4high=idc('sf4high',[
['MARPOL Annex IV','The specific MARPOL Annex that regulates the prevention of pollution by sewage from ships.'],
['400 Gross Tonnage (GT) and above','The ship size applicability threshold under MARPOL Annex IV covering every vessel engaged in international voyages.'],
['12 nautical miles (12 nm)','The minimum distance from land where untreated sewage may be discharged, provided the ship is en route and proceeding at not less than 4 knots.'],
['Biochemical Oxygen Demand (BOD)','A test used to identify biodegradable substances and measure the strength of sewage, based on the activity of bacteria consuming organic matter in the presence of oxygen.'],
['Coliform','The type of organisms present in the human intestine that serve as indicator organisms of sewage pollution and pathogen presence.'],
['Less than 100 thermotolerant coliforms per 100 ml','The maximum recommended faecal coliform count per 100 ml of effluent after treatment, as updated by IMO MEPC 159.'],
['Anaerobic process','The biological digestion process where bacteria multiply in the absence of free oxygen, producing noxious, toxic and highly corrosive by-products such as methane and hydrogen sulphide.'],
['Aerobic process','The biological digestion process that requires free oxygen to break down organic matter into safe products like water and carbon dioxide.'],
['International Sewage Pollution Prevention Certificate (ISPPC)','The official international certificate issued to a ship certifying it is equipped with an approved sewage treatment plant, comminutor or holding tank in compliance with Annex IV.'],
['MARPOL Annex V','The specific MARPOL Annex that regulates the prevention of pollution by garbage from ships.'],
['January 1, 2013','The exact date the revised MARPOL Annex V entered into force, reversing the historical presumption and strictly prohibiting the discharge of all garbage unless explicitly permitted.'],
['Food wastes','Any spoiled or unspoiled food substances, including fruits, vegetables, dairy products, poultry, meat products and food scraps generated aboard ship.'],
['Plastic','A solid material containing as an essential ingredient one or more high molecular mass polymers formed during manufacture or fabrication by heat and/or pressure.'],
['Harmful to the Marine Environment (HME)','The safety designation given to cargo residues, cleaning agents or additives that cannot be discharged into the sea due to their hazard to aquatic ecosystems.'],
['25 mm','The maximum screen opening size, in millimeters, that comminuted or ground food waste must be able to pass through before discharge at sea.'],
['3 nautical miles (3 nm)','The minimum distance from the nearest land required when discharging comminuted or ground food waste while the vessel is en route.'],
['12 nautical miles (12 nm)','The minimum distance from land required when discharging food waste that has not been comminuted or ground.'],
['Special Areas','Sea areas given a higher level of mandatory protection under MARPOL due to technical, oceanographical and ecological conditions and traffic density.']])

const sf4imp=idc('sf4imp',[
['3 to 12 nautical miles (3-12 nm)','The minimum distance range from land where sewage that has been comminuted and disinfected may be discharged.'],
['400 billion','The approximate number of coliform organisms contributed by a single human being during the summer season.'],
['300-400 mg/liter','The approximate level of suspended solids typically found in raw sewage before treatment.'],
['Regulation 12','The regulation under MARPOL Annex IV that mandates governments to ensure adequate port reception facilities for sewage without causing undue delay to ships.'],
['December 31, 1988','The exact date on which MARPOL Annex V originally entered into force.'],
['Domestic wastes','All types of wastes generated in accommodation spaces on board a ship that are not covered by other MARPOL Annexes, excluding grey water.'],
['Cargo residues','The remnants of any non-Annex cargo remaining on deck or in holds after loading or unloading, including spillage and excess.'],
['E-waste (electronic waste)','Discarded electrical and electronic equipment used in ship operations containing materials potentially hazardous to human health or the environment.'],
['Recycling','The waste management activity that involves segregating and recovering components and materials for reprocessing.'],
['Reuse','The waste management activity that involves recovering components and materials for further use without reprocessing.'],
['500 meters (500 m)','The safety distance within which ships operating alongside or within fixed or floating platforms are strictly prohibited from discharging food waste.'],
['International Maritime Dangerous Goods (IMDG) Code','The code governing substances classified as marine pollutants when evaluating cleaning agents, additives or dangerous goods.']])

const sf4add=idc('sf4add',[
['Putrefaction','The technical term for the process that occurs during anaerobic digestion of sewage.'],
['Port Reception Facility Database (PRFD)','The official database developed by the IMO as a module of GISIS to give the public and member states access to port reception facility information.']])


// ───────────────── SEMI-FINAL 4 · WEEK 4 SLIDES (Annex V: Garbage Management, Reception Facilities, Exemptions, Fishing Gear & Penalties) · IDENTIFICATION ONLY ─────────────────
const topicsSF4B:Topic[]=[
{id:'sf4gms',subject:S4,meta:META4,title:'Garbage Management System',level:'Medium',
 intro:'The Garbage Management Plan, the Garbage Record Book (Part I and Part II), the placards, and the options for shipboard handling of garbage.',
 remember:'Plan: 100 GT and above, or certified for 15 or more persons. Record Book: 400 GT and above, or 15 or more persons, on international voyages. Part I = all ships (A–I). Part II = solid bulk cargoes only (J–K). Placards: ships of 12 m or more.',
 note:'Slide 2 also lists “Impact of Garbage on the Marine Environment” as a topic, but no slide covers it yet, so there are no questions on it.'},
{id:'sf4recv',subject:S4,meta:META4,title:'Reception Facilities (Annex V)',level:'Medium',
 intro:'Why port reception facilities matter, the role of IMO and MEPC, and the Port Reception Facility Database (PRFD).',
 remember:'IMO: reception facilities are crucial for MARPOL. MEPC 54 (March 2006): “zero tolerance of illegal discharges” can only be enforced with adequate port facilities. PRFD = module of GISIS; Member States update it, the public can only view it.',
 note:'Your slide says MEPC 54 (March 2006) agreed to develop the PRFD, yet also says it went live on 1 March 2006. That looks like a possible typo. It is kept as written, so confirm the date with your instructor.'},
{id:'sf4exempt',subject:S4,meta:META4,title:'Exemptions: General Garbage',level:'Easy',
 intro:'The exceptions to the prohibition of garbage discharge under MARPOL Annex V for general garbage.',
 remember:'Two exceptions: (1) discharge necessary to secure the safety of the ship and those on board, or to save a life at sea; (2) accidental loss from damage to the ship or its equipment, if all reasonable precautions were taken before and after the damage.'},
{id:'sf4fish',subject:S4,meta:META4,title:'Exemptions: Fishing Gear, Reporting & Penalties',level:'Hard',
 intro:'When fishing gear may be lost or discharged, what the fishing vessel operator must report and record, and the penalties for MARPOL breaches.',
 remember:'Fishing gear exemptions: accidental loss (with reasonable precautions) or discharge to protect the marine environment or the safety of the ship or crew. If it cannot be retrieved and is a threat: report position and reasons to the nearest port authority or JRCC; AMSA may broadcast MSI. Still record it in the Garbage Record Book. Penalties: Protection of the Sea Act 1983, power to detain vessels, owner posts a financial undertaking.',
 note:'The reporting details (JRCC Canberra, AMSA, 1800 641 792, the 1983 Act) are the Australian rules used in your slides.'}]

const sf4gms=idc('sf4gms',[
['Garbage management','MARPOL Annex V requires ships to manage and record the waste generated on board, including discharges.'],
['Garbage Management Plan','The document that contains the procedures for collecting, storing, processing and discharging garbage, including the use of equipment on board.'],
['100 gross tonnage','Every ship of ________ and above is required to carry a Garbage Management Plan.'],
['15 or more persons','Besides ships of 100 GT and above, ships certified to carry ________ must also carry a Garbage Management Plan.'],
['Garbage Record Book','The book that ships of 400 GT and above, engaged in international voyages, must maintain and retain on board.'],
['400 gross tonnage','Every ship of ________ and above engaged in international voyages must maintain and retain a Garbage Record Book on board.'],
['Garbage Record Book or the ship’s official logbook','Fishing vessel operators must record the discharge or loss of fishing gear in either of these two records.'],
['Two','The Garbage Record Book is divided into this many parts (Part I and Part II).'],
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
['Placards','Notices that tell the crew and passengers the MARPOL garbage discharge requirements for the ship.'],
['12 meters','Ships of ________ or more in length are required to display placards.'],
['Prominent places','Placards should be placed in these kinds of locations on board (e.g. galley spaces, bridge, main deck, passenger accommodation).'],
['Shipboard handling and discharge of garbage','Table 2 of the Garbage Management Plan shows the options for this, from collection and separation up to sea discharge or port reception.'],
['Collection and separation','In the Table 2 flow chart, ship-generated garbage first goes through this step.'],
['Reusable','In the Table 2 flow chart, after collection and separation, garbage is first checked on whether it is ________.'],
['Retain and reuse on ship','In the Table 2 flow chart, reusable garbage that can be reused on the ship is sent to this.'],
['Trip-long storage','In the Table 2 flow chart, garbage that is not discharged at sea goes into this before port reception.'],
['Authorized discharge area','In the Table 2 flow chart, sea discharge is allowed only if the ship is in an ________.'],
['Port reception','In the Table 2 flow chart, trip-long storage ends in special/advanced treatment, landfill, or recycling/reuse at this.']])

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
['1 March 2006','The date the PRFD went live to the public, according to the slide.']])

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
['Cannot be reasonably retrieved and poses a significant threat','Fishing gear loss must be reported when it meets these conditions (to the marine environment and navigation).'],
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

export const topics:Topic[]=[...topicsSF1,...topicsSF2,...topicsSF3,...topicsSF4,...topicsSF4B]
export const cards:Card[]=[...cardsSF1,...sf2stp,...sf2terms,...sf2bio,...sf2cert,...sf2recv,...sf3intro,...sf3defs,...sf3disch,...sf3areas,...sf4high,...sf4imp,...sf4add,...sf4gms,...sf4recv,...sf4exempt,...sf4fish]