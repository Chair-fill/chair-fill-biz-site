import { writeFileSync } from "fs";
const UA = "ChairFill/1.0 (marketplace ingestion; admin@chairfill.co)";
const METROS = [
  { slug:"tampa-fl",   name:"Tampa",   state:"FL", bbox:"27.80,-82.65,28.20,-82.25" },
  { slug:"miami-fl",   name:"Miami",   state:"FL", bbox:"25.65,-80.45,25.95,-80.10" },
  { slug:"orlando-fl", name:"Orlando", state:"FL", bbox:"28.35,-81.55,28.65,-81.20" },
  { slug:"atlanta-ga", name:"Atlanta", state:"GA", bbox:"33.65,-84.55,33.90,-84.25" },
];
const slugify=(s)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
async function fetchMetro(m){
  const q=`[out:json][timeout:40];(node["shop"="hairdresser"]["name"~"barber",i](${m.bbox});way["shop"="hairdresser"]["name"~"barber",i](${m.bbox});node["shop"="barber"](${m.bbox});way["shop"="barber"](${m.bbox}););out center tags;`;
  for(let attempt=1;attempt<=5;attempt++){
    const res=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","User-Agent":UA},body:"data="+encodeURIComponent(q)});
    if(res.ok){const d=await res.json();return d.elements||[];}
    if(res.status===429||res.status===504){console.error(m.slug,"got",res.status,"retry",attempt,"after backoff");await sleep(8000*attempt);continue;}
    console.error(m.slug,"HTTP",res.status);return [];
  }
  console.error(m.slug,"gave up after retries");return [];
}
const all=[]; const seenSlug=new Set();
for(const m of METROS){
  const els=await fetchMetro(m); let kept=0;
  for(const e of els){
    const t=e.tags||{}; const lat=e.lat??e.center?.lat; const lng=e.lon??e.center?.lon;
    if(!t.name||lat==null||lng==null) continue;
    const street=[t["addr:housenumber"],t["addr:street"]].filter(Boolean).join(" ");
    const address=[street||null,t["addr:city"]||m.name,m.state,t["addr:postcode"]||null].filter(Boolean).join(", ");
    let base=slugify(t.name+"-"+m.slug),slug=base,n=2;while(seenSlug.has(slug)){slug=base+"-"+n++;}seenSlug.add(slug);
    all.push({slug,city:m.slug,state:m.state,name:t.name,address,phone:t.phone||t["contact:phone"]||null,claimed:false,
      description:`Barbershop in ${m.name}, ${m.state}. This listing is unclaimed — claim it to manage your booth rentals.`,
      amenities:[],gallery:[],website:t.website||t["contact:website"]||null,boothPlans:[],hidePricing:true,
      lat:+(+lat).toFixed(6),lng:+(+lng).toFixed(6)});
    kept++;
  }
  console.error(m.slug,"kept",kept); await sleep(7000);
}
writeFileSync("lib/marketplace/shops.generated.json",JSON.stringify(all,null,2));
console.error("TOTAL",all.length);
