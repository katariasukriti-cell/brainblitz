import { readFileSync, writeFileSync } from 'fs';

const OLD_START = '// ─── CONNECTIONS GAME ────────────────────────────────────────────────────────';
const OLD_END = '\nfunction ChallengeScreen(';

const NEW_CODE = `// ─── CONNECTIONS GAME ────────────────────────────────────────────────────────
const GROUP_COLOURS = ["#10B981","#3B82F6","#8B5CF6","#F59E0B","#EF4444","#EC4899"];

const CONNECTIONS_PUZZLES = [
  { id:1, title:"World Knowledge", groups:[
    { label:"Rivers of the world", emoji:"🌊", items:["Amazon","Nile","Ganges","Yangtze"] },
    { label:"Planets in our solar system", emoji:"🪐", items:["Venus","Saturn","Uranus","Neptune"] },
    { label:"Currencies", emoji:"💰", items:["Yen","Rupee","Krona","Real"] },
    { label:"Parts of a cell", emoji:"🧫", items:["Nucleus","Mitochondria","Ribosome","Vacuole"] },
    { label:"Classical Indian dance forms", emoji:"💃", items:["Bharatanatyam","Kathak","Odissi","Manipuri"] },
    { label:"Types of cloud", emoji:"☁️", items:["Cumulus","Cirrus","Stratus","Nimbus"] },
  ]},
  { id:2, title:"Science & Nature", groups:[
    { label:"Things named after scientists", emoji:"🔬", items:["Pasteurisation","Bunsen burner","Fahrenheit","Watt"] },
    { label:"Nobel Prize categories", emoji:"🏆", items:["Physics","Chemistry","Literature","Peace"] },
    { label:"Elements on the periodic table", emoji:"⚗️", items:["Neon","Cobalt","Argon","Xenon"] },
    { label:"Australian animals", emoji:"🦘", items:["Quokka","Cassowary","Echidna","Wombat"] },
    { label:"Biomes", emoji:"🌿", items:["Tundra","Savannah","Taiga","Chaparral"] },
    { label:"Parts of a flower", emoji:"🌸", items:["Stamen","Pistil","Sepal","Anther"] },
  ]},
  { id:3, title:"History & Empires", groups:[
    { label:"Mughal Emperors", emoji:"🏰", items:["Babur","Akbar","Aurangzeb","Shah Jahan"] },
    { label:"Ancient Greek philosophers", emoji:"🏺", items:["Socrates","Plato","Aristotle","Epicurus"] },
    { label:"Causes of WWI (M.A.I.N.)", emoji:"⚔️", items:["Militarism","Alliances","Imperialism","Nationalism"] },
    { label:"French Revolution key terms", emoji:"🗽", items:["Guillotine","Bastille","Jacobins","Enlightenment"] },
    { label:"Ancient Indian texts", emoji:"📿", items:["Rigveda","Upanishads","Mahabharata","Arthashastra"] },
    { label:"Indian independence figures", emoji:"🇮🇳", items:["Gandhi","Nehru","Ambedkar","Bose"] },
  ]},
  { id:4, title:"Arts & Ideas", groups:[
    { label:"Works by Shakespeare", emoji:"📜", items:["Othello","Macbeth","Hamlet","Prospero"] },
    { label:"Impressionist painters", emoji:"🎨", items:["Monet","Renoir","Degas","Pissarro"] },
    { label:"Architectural styles", emoji:"🏛️", items:["Baroque","Brutalism","Gothic","Modernism"] },
    { label:"Musical terms", emoji:"🎵", items:["Adagio","Fortissimo","Staccato","Legato"] },
    { label:"Big Five personality traits", emoji:"🎭", items:["Openness","Conscientiousness","Extraversion","Neuroticism"] },
    { label:"Piaget's cognitive stages", emoji:"🧒", items:["Sensorimotor","Preoperational","Concrete operational","Formal operational"] },
  ]},
  { id:5, title:"Tech & Mind", groups:[
    { label:"Programming languages", emoji:"💻", items:["Python","Rust","Kotlin","Swift"] },
    { label:"Tech companies founded in garages", emoji:"🏠", items:["Apple","Google","Amazon","HP"] },
    { label:"Types of AI system", emoji:"🤖", items:["Neural network","Transformer","Diffusion model","Decision tree"] },
    { label:"Types of memory", emoji:"💭", items:["Semantic","Episodic","Procedural","Working"] },
    { label:"Freud's personality structures", emoji:"🧠", items:["Id","Ego","Superego","Libido"] },
    { label:"Social media launched before 2010", emoji:"📱", items:["Facebook","Twitter","YouTube","LinkedIn"] },
  ]},
  { id:6, title:"Food & Geography", groups:[
    { label:"Spices originating in South Asia", emoji:"🌶️", items:["Turmeric","Cardamom","Cloves","Black pepper"] },
    { label:"Foods from the Columbian Exchange", emoji:"🌽", items:["Potato","Tomato","Chocolate","Chilli"] },
    { label:"Traditional Japanese dishes", emoji:"🍣", items:["Ramen","Tempura","Miso soup","Sashimi"] },
    { label:"Capitals of South America", emoji:"🌎", items:["Brasília","Lima","Buenos Aires","Bogotá"] },
    { label:"Capitals of Africa", emoji:"🌍", items:["Nairobi","Accra","Dakar","Addis Ababa"] },
    { label:"Capitals of Southeast Asia", emoji:"🌏", items:["Bangkok","Jakarta","Manila","Hanoi"] },
  ]},
  { id:7, title:"World Wonders", groups:[
    { label:"UNESCO World Heritage Sites in India", emoji:"🏛️", items:["Taj Mahal","Ajanta Caves","Hampi","Qutub Minar"] },
    { label:"Capitals of Scandinavia & Nordic", emoji:"❄️", items:["Oslo","Stockholm","Helsinki","Reykjavik"] },
    { label:"Nobel Peace Prize winners", emoji:"☮️", items:["Gandhi","Mandela","Malala","Mother Teresa"] },
    { label:"Elements discovered in the 20th century", emoji:"⚛️", items:["Plutonium","Francium","Technetium","Astatine"] },
    { label:"Layers of Earth's atmosphere", emoji:"🌍", items:["Troposphere","Stratosphere","Mesosphere","Thermosphere"] },
    { label:"Types of rock", emoji:"🪨", items:["Igneous","Sedimentary","Metamorphic","Volcanic"] },
  ]},
  { id:8, title:"Mixed Mastery", groups:[
    { label:"Ancient wonders of the world", emoji:"🏺", items:["Colosseum","Petra","Machu Picchu","Chichen Itza"] },
    { label:"Branches of philosophy", emoji:"💡", items:["Epistemology","Ontology","Ethics","Aesthetics"] },
    { label:"Economic systems", emoji:"💰", items:["Capitalism","Socialism","Feudalism","Mercantilism"] },
    { label:"Types of government", emoji:"🗳️", items:["Democracy","Monarchy","Oligarchy","Theocracy"] },
    { label:"Layers of the rainforest", emoji:"🌿", items:["Emergent","Canopy","Understory","Forest floor"] },
    { label:"Writing systems of the world", emoji:"✍️", items:["Cyrillic","Devanagari","Hanzi","Arabic"] },
  ]},
];

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function ConnectionsGame({ theme, goBack }) {
  const todayPuzzle = seededShuffle(CONNECTIONS_PUZZLES, TODAY+"con")[0];
  const doneTodayKey = "bb_con_done_" + TODAY;
  const doneToday = S.get(doneTodayKey, false);

  const [screen, setScreen] = useState(doneToday ? "done" : "play");
  const [puzzle, setPuzzle] = useState(todayPuzzle);
  const [tiles, setTiles] = useState(() => {
    const groups = todayPuzzle.groups.map((g,gi)=>({...g,colour:GROUP_COLOURS[gi]}));
    return shuffleArr(groups.flatMap((g,gi)=>g.items.map(item=>({item,groupIdx:gi}))));
  });
  const [selected, setSelected] = useState([]);
  const [solved, setSolved] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [shakeTiles, setShakeTiles] = useState([]);
  const [hint, setHint] = useState(null);
  const [won, setWon] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const MAX_MISTAKES = 4;

  const puzzleGroups = puzzle.groups.map((g,gi)=>({...g,colour:GROUP_COLOURS[gi]}));

  function loadPuzzle(p) {
    const groups = p.groups.map((g,gi)=>({...g,colour:GROUP_COLOURS[gi]}));
    const allItems = shuffleArr(groups.flatMap((g,gi)=>g.items.map(item=>({item,groupIdx:gi}))));
    setPuzzle(p); setTiles(allItems); setSelected([]); setSolved([]); setMistakes(0); setShakeTiles([]); setHint(null); setWon(false);
    setScreen("play"); setShowPicker(false);
  }

  function toggleTile(idx) {
    if (shakeTiles.length) return;
    setSelected(prev=>prev.includes(idx)?prev.filter(i=>i!==idx):prev.length>=4?prev:[...prev,idx]);
    setHint(null);
  }

  function shuffleTiles() {
    setTiles(prev=>{
      const ss=new Set(solved.flatMap(s=>s.indices)); const u=[],pos=[];
      prev.forEach((t,i)=>{if(!ss.has(i)){u.push(t);pos.push(i);}});
      const sh=shuffleArr(u); const next=[...prev]; pos.forEach((p,i)=>{next[p]=sh[i];}); return next;
    });
    setSelected([]);
  }

  function submit() {
    if (selected.length!==4) return;
    const gIdxs = selected.map(i=>tiles[i].groupIdx);
    const allSame = gIdxs.every(g=>g===gIdxs[0]);
    if (allSame) {
      const gi=gIdxs[0]; const group=puzzleGroups[gi];
      const ns=[...solved,{group,indices:selected}];
      setSolved(ns); setSelected([]); setHint({msg:'✅ "'+group.label+'" — well spotted!',type:"correct"});
      if (ns.length===puzzle.groups.length) {
        setTimeout(()=>{ setWon(true); setScreen("end"); S.set(doneTodayKey,true); },800);
      }
    } else {
      const counts={}; gIdxs.forEach(g=>{counts[g]=(counts[g]||0)+1;});
      const isOneAway=Math.max(...Object.values(counts))===3;
      setMistakes(m=>{
        const next=m+1;
        if(next>=MAX_MISTAKES){setHint({msg:"No more guesses — revealing answers.",type:"wrong"});setTimeout(()=>{setWon(false);setScreen("end"); S.set(doneTodayKey,true);},900);}
        else setHint(isOneAway?{msg:"🔥 One away! Three from the same group.",type:"close"}:{msg:"Not quite — try a different combination.",type:"wrong"});
        return next;
      });
      setShakeTiles([...selected]); setTimeout(()=>setShakeTiles([]),500); setSelected([]);
    }
  }

  const hdr = (sub) => (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
      <button onClick={sub?()=>setShowPicker(false):goBack} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text,display:"flex",alignItems:"center",justifyContent:"center"}}>{"←"}</button>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:theme.text}}>🔗 Connections</div>
    </div>
  );

  if (showPicker) return (
    <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
      {hdr(true)}
      <div style={{fontSize:13,color:theme.sub,marginBottom:16}}>{CONNECTIONS_PUZZLES.length} puzzles to explore</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {CONNECTIONS_PUZZLES.map(p=>{
          const isToday = p.id===todayPuzzle.id;
          return (
            <button key={p.id} onClick={()=>loadPuzzle(p)} style={{background:theme.card,borderRadius:16,padding:"16px 18px",border:"1px solid "+(isToday?theme.accent:theme.border),cursor:"pointer",fontFamily:"inherit",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:26,flexShrink:0}}>{p.groups[0].emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:theme.text}}>{p.title}</div>
                <div style={{fontSize:12,color:theme.sub,marginTop:3}}>{p.groups.map(g=>g.label).join(" · ")}</div>
              </div>
              {isToday && <div style={{fontSize:10,fontWeight:700,color:theme.accent,letterSpacing:1,textTransform:"uppercase"}}>Today</div>}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (screen==="done") return (
    <div style={{padding:"28px 20px",textAlign:"center",paddingTop:60,animation:"fadeUp 0.4s ease"}}>
      <div style={{fontSize:60,marginBottom:16}}>✅</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:12,color:theme.text}}>All connected!</div>
      <div style={{fontSize:14,color:theme.sub,lineHeight:1.7,marginBottom:30}}>You've completed today's Connections puzzle. Come back tomorrow for a new set!</div>
      <button onClick={()=>setShowPicker(true)} style={{background:theme.pill,color:theme.text,border:"1px solid "+theme.border,borderRadius:14,padding:"13px 24px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:12,width:"100%"}}>Browse all puzzles</button>
      <button onClick={goBack} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"13px 24px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",width:"100%"}}>← Back</button>
    </div>
  );

  if (screen==="end") {
    const allGroups = puzzleGroups;
    return (
      <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
        {hdr(false)}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:60,marginBottom:12}}>{won?"🏆":"🧩"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,marginBottom:8,color:theme.text}}>{won?"Solved it!":"Better luck next time"}</div>
          <div style={{fontSize:14,color:theme.sub,marginBottom:24}}>{won?("Found all "+puzzle.groups.length+" groups"+(mistakes===0?" without a single mistake!":" with "+mistakes+" mistake"+(mistakes!==1?"s":"."))):"Here's how it all connected:"}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {allGroups.map((group,gi)=>(
            <div key={gi} style={{borderRadius:14,padding:"14px 18px",background:group.colour+"22",border:"1px solid "+group.colour+"55"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <span style={{fontSize:18}}>{group.emoji}</span>
                <span style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:group.colour}}>{group.label}</span>
              </div>
              <div style={{fontSize:13,color:group.colour,opacity:0.85}}>{group.items.join(" · ")}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>loadPuzzle(puzzle)} style={{width:"100%",background:theme.pill,color:theme.text,border:"1px solid "+theme.border,borderRadius:14,padding:"14px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>Play Again</button>
        <button onClick={()=>setShowPicker(true)} style={{width:"100%",background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"14px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Browse all puzzles →</button>
      </div>
    );
  }

  const solvedIdxs = new Set(solved.flatMap(s=>s.indices));
  const remaining = tiles.filter((_,i)=>!solvedIdxs.has(i));
  return (
    <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
      <style>{"@keyframes conShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}} @keyframes conPop{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}"}</style>
      {hdr(false)}
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:theme.sub,marginBottom:4}}>{puzzle.title}</div>
      <div style={{fontSize:12,color:theme.sub,marginBottom:16}}>Select 4 items that share a hidden connection</div>

      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
        <span style={{fontSize:12,color:theme.sub}}>Mistakes remaining:</span>
        {Array.from({length:MAX_MISTAKES}).map((_,i)=>(
          <div key={i} style={{width:11,height:11,borderRadius:"50%",background:i>=MAX_MISTAKES-mistakes?theme.border:theme.accent,transition:"background 0.3s"}} />
        ))}
        <button onClick={()=>setShowPicker(true)} style={{marginLeft:"auto",background:"none",border:"none",fontSize:12,color:theme.sub,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Other puzzles</button>
      </div>

      {solved.map((s,i)=>(
        <div key={i} style={{borderRadius:12,padding:"12px 16px",marginBottom:8,background:s.group.colour+"22",border:"1px solid "+s.group.colour+"55",animation:"conPop 0.35s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <span style={{fontSize:16}}>{s.group.emoji}</span>
            <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:s.group.colour}}>{s.group.label}</span>
          </div>
          <div style={{fontSize:12,color:s.group.colour,opacity:0.85}}>{s.group.items.join(" · ")}</div>
        </div>
      ))}

      {hint && hint.type!=="correct" && (
        <div style={{textAlign:"center",fontSize:13,padding:"10px 14px",background:theme.card,border:"1px solid "+(hint.type==="wrong"?"rgba(255,71,87,0.4)":"rgba(255,190,0,0.4)"),borderRadius:10,marginBottom:10,color:hint.type==="wrong"?"#FF4757":"#FFD700"}}>
          {hint.msg}
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:14}}>
        {tiles.map((t,idx)=>{
          if(solvedIdxs.has(idx)) return null;
          const isSel=selected.includes(idx); const isShaking=shakeTiles.includes(idx);
          return (
            <button key={idx} onClick={()=>toggleTile(idx)} disabled={!!shakeTiles.length}
              style={{aspectRatio:"1",borderRadius:12,border:"1.5px solid "+(isSel?theme.accent:theme.border),background:isSel?theme.accent+"33":theme.card,cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:600,color:isSel?theme.text:theme.text,textAlign:"center",padding:"4px 2px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1.2,animation:isShaking?"conShake 0.4s ease":undefined,transform:isSel?"translateY(-2px)":"none",transition:"all 0.15s",boxShadow:isSel?"0 4px 12px rgba(0,0,0,0.15)":"none"}}>
              {t.item}
            </button>
          );
        })}
      </div>

      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>setSelected([])} style={{flex:1,padding:"12px 8px",borderRadius:12,border:"1px solid "+theme.border,background:theme.card,color:theme.sub,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer"}}>Clear</button>
        <button onClick={shuffleTiles} style={{flex:1,padding:"12px 8px",borderRadius:12,border:"1px solid "+theme.border,background:theme.card,color:theme.sub,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer"}}>Shuffle</button>
        <button onClick={submit} disabled={selected.length!==4} style={{flex:2,padding:"12px 8px",borderRadius:12,border:"none",background:selected.length===4?theme.accent:theme.pill,color:selected.length===4?theme.accentText:theme.sub,fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:selected.length===4?"pointer":"default",transition:"all 0.2s"}}>Submit</button>
      </div>
    </div>
  );
}

// ─── FACT OR FICTION GAME ────────────────────────────────────────────────────
const FOF_FACTS = [
  {statement:"A teaspoon of healthy topsoil contains more living organisms than there are humans on Earth.",verdict:true,explanation:"A single teaspoon of healthy topsoil harbours billions of bacteria, fungi, nematodes, and other organisms — far exceeding Earth's human population of 8 billion.",category:"Science",emoji:"🌱"},
  {statement:"The human body contains more bacterial cells than human cells.",verdict:true,explanation:"Recent estimates put the ratio at roughly 1:1, but bacteria are far more numerous by count in the gut. We are, in a real sense, more microbe than human.",category:"Science",emoji:"🧫"},
  {statement:"Sharks are older than trees.",verdict:true,explanation:"Sharks have existed for around 450 million years. Trees only evolved approximately 350 million years ago — meaning sharks swam the oceans before forests existed.",category:"Science",emoji:"🦈"},
  {statement:"DNA is the same molecule in every organism on Earth, from bacteria to blue whales.",verdict:true,explanation:"All known life uses DNA as its genetic material and the same genetic code — powerful evidence for a single common ancestor.",category:"Science",emoji:"🧬"},
  {statement:"Lightning is hotter than the Sun's surface.",verdict:true,explanation:"A lightning bolt reaches approximately 30,000 Kelvin — five times hotter than the Sun's surface temperature of around 5,778 Kelvin.",category:"Science",emoji:"⚡"},
  {statement:"The Great Wall of China is visible from space with the naked eye.",verdict:false,explanation:"This is one of history's most persistent myths. The Wall is too narrow (roughly 5–8 metres wide) to be seen from orbit. Even Chinese astronaut Yang Liwei confirmed he couldn't see it.",category:"Science",emoji:"🏯"},
  {statement:"Water always boils at 100°C regardless of altitude.",verdict:false,explanation:"Water boils at lower temperatures at higher altitudes because atmospheric pressure decreases. At the summit of Mount Everest, water boils at approximately 70°C.",category:"Science",emoji:"💧"},
  {statement:"Humans have five senses.",verdict:false,explanation:"Beyond the classic five, humans also have proprioception (body position), thermoception (temperature), vestibular sense (balance), interoception (internal body states), and others.",category:"Science",emoji:"👁️"},
  {statement:"The universe is approximately 13.8 billion years old.",verdict:true,explanation:"Based on measurements of the cosmic microwave background and the rate of the universe's expansion, scientists estimate the universe formed around 13.8 billion years ago.",category:"Space",emoji:"🌌"},
  {statement:"Napoleon Bonaparte was unusually short for his era.",verdict:false,explanation:"Napoleon stood approximately 5 foot 7 inches (170 cm) — average for a Frenchman of his time. The myth arose partly from British propaganda and confusion between French and English inches.",category:"History",emoji:"👑"},
  {statement:"Cleopatra lived closer in time to the Moon landing than to the Great Pyramid.",verdict:true,explanation:"The Great Pyramid was built around 2560 BC. Cleopatra lived around 30 BC — about 2,500 years after the pyramid and only 2,000 years before the 1969 Moon landing.",category:"History",emoji:"🏛️"},
  {statement:"The Black Death killed roughly a third of Europe's population in the 14th century.",verdict:true,explanation:"Estimates range from 30% to 60% of Europe's population dying between 1347 and 1351 — the deadliest pandemic in recorded human history.",category:"History",emoji:"🐀"},
  {statement:"Einstein failed mathematics at school.",verdict:false,explanation:"Einstein excelled at mathematics from a young age, mastering calculus by 15. The myth arose from a misunderstanding of Swiss grading scales.",category:"History",emoji:"🧠"},
  {statement:"The Hundred Years War lasted exactly 100 years.",verdict:false,explanation:"The Hundred Years War lasted from 1337 to 1453 — approximately 116 years. It was named retrospectively by historians.",category:"History",emoji:"⚔️"},
  {statement:"Octopuses have three hearts.",verdict:true,explanation:"Octopuses have three hearts: two pump blood through the gills, and one pumps it through the body. Their blood is blue because it contains copper-based haemocyanin.",category:"Nature",emoji:"🐙"},
  {statement:"Goldfish have a memory span of only three seconds.",verdict:false,explanation:"This is a persistent myth. Research shows goldfish can remember things for months. They can be trained to press levers, navigate mazes, and recognise their owners.",category:"Nature",emoji:"🐠"},
  {statement:"Bats are blind.",verdict:false,explanation:"No bat species is blind. While many use echolocation in darkness, all bats have functional eyes and many have excellent vision.",category:"Nature",emoji:"🦇"},
  {statement:"A snail can sleep for up to three years.",verdict:true,explanation:"Snails can enter a deep hibernation-like state called estivation when conditions are too dry or cold. In some cases, this dormancy can last up to three years.",category:"Nature",emoji:"🐌"},
  {statement:"Honeybees die after they sting you.",verdict:true,explanation:"When a honeybee stings a mammal, its barbed stinger is torn from its body as it pulls away — causing the bee to die. Wasps and bumblebees can sting multiple times.",category:"Nature",emoji:"🐝"},
  {statement:"A day on Venus is longer than a year on Venus.",verdict:true,explanation:"Venus rotates so slowly (243 Earth days per rotation) that a Venusian day is longer than a Venusian year (225 Earth days to orbit the Sun).",category:"Space",emoji:"🪐"},
  {statement:"Australia is wider than the Moon.",verdict:true,explanation:"Australia measures approximately 4,000 km east to west. The Moon's diameter is only about 3,474 km — making Australia wider than the Moon.",category:"Geography",emoji:"🌏"},
  {statement:"Russia shares a border with the United States.",verdict:true,explanation:"Russia and the USA are separated by only about 3.8 km at their closest point — the Diomede Islands in the Bering Strait.",category:"Geography",emoji:"🗺️"},
  {statement:"Iceland is covered in ice and Greenland is green.",verdict:false,explanation:"It's largely the reverse. Iceland has lush green landscapes. Greenland is covered by a massive ice sheet — the second largest on Earth.",category:"Geography",emoji:"🧊"},
  {statement:"The Amazon River flows into the Atlantic Ocean.",verdict:true,explanation:"The Amazon discharges into the Atlantic near Marajó in Brazil, releasing approximately 20% of all fresh water that enters the world's oceans.",category:"Geography",emoji:"🌊"},
  {statement:"Shakespeare invented over 1,700 words we still use today.",verdict:true,explanation:"Shakespeare is credited with coining or first recording words including 'bedroom', 'lonely', 'generous', 'obscene', and 'luggage'.",category:"Literature",emoji:"📜"},
  {statement:"The Mona Lisa has no eyebrows.",verdict:true,explanation:"Leonardo da Vinci never finished the eyebrows, or they may have faded. High-resolution scans suggest very faint traces once existed.",category:"Art & Culture",emoji:"🖼️"},
  {statement:"Beethoven was completely deaf when he composed his Ninth Symphony.",verdict:true,explanation:"Beethoven had lost virtually all hearing by 1824. He reportedly had to be turned around to see the applauding audience at the premiere because he could not hear them.",category:"Music",emoji:"🎵"},
  {statement:"Honey never expires.",verdict:true,explanation:"Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible. Honey's low moisture, acidic pH, and hydrogen peroxide make it virtually indestructible.",category:"Food & Nutrition",emoji:"🍯"},
  {statement:"Carrots improve your night vision.",verdict:false,explanation:"Carrots contain Vitamin A essential for eye health, but eating them won't give you better-than-normal night vision. The myth was partly spread by British WWII propaganda to conceal radar.",category:"Food & Nutrition",emoji:"🥕"},
  {statement:"Tomatoes are botanically a fruit.",verdict:true,explanation:"Botanically, a tomato is a fruit — specifically a berry. The US Supreme Court ruled it a vegetable in 1893, but for tax purposes, not botanical ones.",category:"Food & Nutrition",emoji:"🍅"},
  {statement:"Humans use only 10% of their brain.",verdict:false,explanation:"Virtually all brain regions are active almost all the time. Brain imaging shows activity throughout the entire brain, and damage to almost any area produces noticeable effects.",category:"Psychology",emoji:"🧠"},
  {statement:"You can tell if someone is lying by whether they look left or right.",verdict:false,explanation:"The idea that eye movement direction reveals lying has been thoroughly debunked. Studies find no reliable relationship between gaze direction and deception.",category:"Psychology",emoji:"👁️"},
  {statement:"Yawning is contagious even when reading about it.",verdict:true,explanation:"Research suggests that reading or thinking about yawning triggers the contagious response in many people — you may have just yawned reading this.",category:"Psychology",emoji:"😴"},
  {statement:"The first iPhone was released in 2007.",verdict:true,explanation:"Steve Jobs announced and released the original iPhone on 29 June 2007 — a device that changed the mobile industry.",category:"Technology & AI",emoji:"📱"},
  {statement:"The internet and the World Wide Web are the same thing.",verdict:false,explanation:"The internet is the global network of connected computers. The World Wide Web is one service that runs over the internet, invented by Tim Berners-Lee in 1989.",category:"Technology & AI",emoji:"🌐"},
  {statement:"India was the world's largest economy for most of the last 2,000 years.",verdict:true,explanation:"According to economic historian Angus Maddison, India and China together accounted for roughly 50% of world GDP for most of the past two millennia.",category:"Indian History & Culture",emoji:"🏛️"},
  {statement:"Zero was invented in India.",verdict:true,explanation:"The concept of zero as a number with arithmetic rules was formalised by the Indian mathematician Brahmagupta in 628 AD, then spread to the Islamic world and Europe.",category:"Indian History & Culture",emoji:"0️⃣"},
  {statement:"There is no sound in space.",verdict:true,explanation:"Sound requires a medium to travel through. In the vacuum of space, there are too few particles to transmit sound waves.",category:"Space",emoji:"🚀"},
  {statement:"Jupiter has more moons than any other planet in our solar system.",verdict:true,explanation:"As of 2024, Jupiter has 95 confirmed moons — more than any other planet. Saturn is a close second with 146. The count keeps rising as telescopes improve.",category:"Space",emoji:"🪐"},
  {statement:"The Roman Empire fell in 476 AD.",verdict:false,explanation:"The Western Roman Empire fell in 476 AD, but the Eastern Roman Empire (Byzantine Empire) continued until 1453 — nearly a thousand years longer.",category:"History",emoji:"🏛️"},
  {statement:"Polar bears have white fur.",verdict:false,explanation:"Polar bear fur is actually transparent and hollow. It appears white because it scatters light. Their skin underneath is black.",category:"Nature",emoji:"🐻‍❄️"},
  {statement:"The Great Barrier Reef is the largest living structure on Earth.",verdict:true,explanation:"The Great Barrier Reef stretches over 2,300 km along Australia's northeast coast and is the world's largest living structure — visible from outer space.",category:"Geography",emoji:"🐠"},
  {statement:"Coffee is the world's most widely traded commodity after oil.",verdict:false,explanation:"This claim is often repeated but unsupported. Coffee is one of the most valuable agricultural exports, but it trails behind wheat, sugar, and corn in global trade value.",category:"Food & Nutrition",emoji:"☕"},
  {statement:"The word 'robot' comes from a Czech play.",verdict:true,explanation:"The word 'robot' was coined by Czech writer Karel Čapek in his 1920 play R.U.R. It derives from the Czech word 'robota', meaning forced labour.",category:"Technology & AI",emoji:"🤖"},
  {statement:"More people have access to a mobile phone than to a toilet.",verdict:true,explanation:"Estimates suggest approximately 6 billion people have access to mobile phones while only around 4.5 billion have access to safely managed sanitation.",category:"Current Affairs",emoji:"📞"},
];

const TOTAL_FOF = 10;

function FactOrFictionGame({ theme, goBack }) {
  const doneTodayKey = "bb_fof_done_" + TODAY;
  const doneToday = S.get(doneTodayKey, false);
  const todayQs = seededShuffle(FOF_FACTS, TODAY+"fof").slice(0, TOTAL_FOF);

  const [questions] = useState(todayQs);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  if (doneToday && !done) return (
    <div style={{padding:"28px 20px",textAlign:"center",paddingTop:60,animation:"fadeUp 0.4s ease"}}>
      <div style={{fontSize:60,marginBottom:16}}>✅</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:12,color:theme.text}}>Already done today!</div>
      <div style={{fontSize:14,color:theme.sub,lineHeight:1.7,marginBottom:30}}>Come back tomorrow for 10 new statements to challenge you!</div>
      <button onClick={goBack} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"14px 32px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
    </div>
  );

  function handleAnswer(choice) {
    if (answered) return;
    const q = questions[current];
    const isCorr = choice===q.verdict;
    setAnswered(true); setChosen(choice);
    if (isCorr) {
      setScore(s=>s+(10+streak*5)); setCorrect(c=>c+1);
      const ns=streak+1; setStreak(ns); setBestStreak(b=>Math.max(b,ns));
    } else { setStreak(0); }
  }

  function handleNext() {
    if (current+1>=TOTAL_FOF) { setDone(true); S.set(doneTodayKey,true); }
    else { setCurrent(c=>c+1); setAnswered(false); setChosen(null); }
  }

  if (!questions.length) return null;

  if (done) {
    const pct=Math.round((correct/TOTAL_FOF)*100);
    const grade=pct===100?"🏆 Perfect score!":pct>=90?"⭐ Genius-level.":pct>=75?"🔥 Sharp as ever.":pct>=60?"✅ Solid knowledge.":"📚 More reading ahead!";
    return (
      <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <button onClick={goBack} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text}}>{"←"}</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:theme.text}}>🧠 Fact or Fiction</div>
        </div>
        <div style={{textAlign:"center",paddingTop:20}}>
          <div style={{fontSize:60,marginBottom:16}}>{pct>=80?"🏆":pct>=60?"⭐":"📚"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,marginBottom:8,color:theme.text}}>{pct>=80?"Brilliant!":pct>=60?"Well done!":"Keep reading!"}</div>
          <div style={{fontSize:15,color:theme.sub,marginBottom:28}}>{correct}/{TOTAL_FOF} correct · {score} pts · {grade}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:28}}>
            {[{num:correct,lbl:"Correct",col:"#00FF88"},{num:TOTAL_FOF-correct,lbl:"Wrong",col:"#FF4757"},{num:bestStreak,lbl:"Best streak",col:"#FF9F43"}].map((s,i)=>(
              <div key={i} style={{background:theme.card,border:"1px solid "+theme.border,borderRadius:14,padding:"14px 8px"}}>
                <div style={{fontSize:24,fontWeight:700,color:s.col}}>{s.num}</div>
                <div style={{fontSize:11,color:theme.sub,marginTop:3}}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:13,color:theme.sub,marginBottom:24}}>Come back tomorrow for 10 new statements!</div>
          <button onClick={goBack} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"16px 40px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Done</button>
        </div>
      </div>
    );
  }

  const q=questions[current];
  const progress=((current+(answered?1:0))/TOTAL_FOF)*100;
  const isCorr=answered&&chosen===q.verdict;

  function factBtnStyle(forTrue) {
    const c=forTrue?"#00FF88":"#FF4757";
    if (!answered) return {background:theme.card,borderColor:theme.border,color:theme.text};
    const thisVerdict = forTrue ? true : false;
    if (chosen===thisVerdict) return isCorr&&chosen===thisVerdict?{background:"rgba(0,255,136,0.1)",borderColor:"rgba(0,255,136,0.4)",color:"#00FF88"}:chosen!==q.verdict?{background:"rgba(255,71,87,0.1)",borderColor:"rgba(255,71,87,0.4)",color:"#FF4757"}:{background:theme.card,borderColor:theme.border,color:theme.sub};
    if (q.verdict===thisVerdict) return {background:"rgba(0,255,136,0.08)",borderColor:"rgba(0,255,136,0.3)",color:"#00FF88"};
    return {background:theme.card,borderColor:theme.border,color:theme.sub,opacity:0.5};
  }

  return (
    <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={goBack} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text}}>{"←"}</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:theme.text}}>🧠 Fact or Fiction</div>
        <div style={{marginLeft:"auto",background:theme.card,border:"1px solid "+theme.border,borderRadius:999,padding:"5px 12px",fontSize:13,fontWeight:600,color:"#FF9F43"}}>{"🔥 "+score+" pts"}</div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {questions.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<current?theme.accent:i===current?theme.accent:theme.border,opacity:i<=current?1:0.4}} />)}
      </div>

      {streak>=2 && <div style={{fontSize:13,color:"#FF9F43",fontWeight:600,marginBottom:12}}>{"🔥 "+streak+" in a row! +"+(streak*5)+" bonus pts"}</div>}

      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:theme.pill,borderRadius:999,padding:"4px 12px",fontSize:11,fontWeight:600,color:theme.sub,marginBottom:14}}>
        <span>{q.emoji}</span><span>{q.category}</span>
      </div>

      <div style={{background:theme.card,borderRadius:18,padding:"24px 20px",marginBottom:20,border:"1px solid "+(answered?(isCorr?"rgba(0,255,136,0.4)":"rgba(255,71,87,0.4)"):theme.border),transition:"border-color 0.3s"}}>
        <div style={{fontSize:11,color:theme.sub,marginBottom:10,letterSpacing:1,textTransform:"uppercase"}}>Statement {current+1} of {TOTAL_FOF}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,lineHeight:1.4,color:theme.text}}>"{q.statement}"</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {[{label:"✓ Fact",val:true},{label:"✗ Fiction",val:false}].map(({label,val})=>(
          <button key={String(val)} onClick={()=>handleAnswer(val)} disabled={answered}
            style={{padding:"18px 12px",borderRadius:14,border:"1.5px solid",cursor:answered?"default":"pointer",fontFamily:"inherit",fontSize:15,fontWeight:700,transition:"all 0.18s",...factBtnStyle(val)}}>
            {label}
          </button>
        ))}
      </div>

      {answered && (
        <div style={{borderRadius:14,padding:"14px 18px",marginBottom:16,background:isCorr?"rgba(0,255,136,0.08)":"rgba(255,71,87,0.08)",border:"1px solid "+(isCorr?"rgba(0,255,136,0.3)":"rgba(255,71,87,0.3)")}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{fontSize:18}}>{isCorr?"✅":"❌"}</span>
            <span style={{fontSize:13,fontWeight:700,color:isCorr?"#00FF88":"#FF4757"}}>{isCorr?"Correct — ":"Wrong — "}it{"'"}s {q.verdict?"a fact!":"fiction!"}</span>
          </div>
          <div style={{fontSize:13,lineHeight:1.6,color:theme.sub}}>{q.explanation}</div>
        </div>
      )}

      {answered && (
        <button onClick={handleNext} style={{width:"100%",background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
          {current+1>=TOTAL_FOF?"See Results →":"Next →"}
        </button>
      )}
    </div>
  );
}

`;

let content = readFileSync('src/App.jsx', 'utf8');
const startIdx = content.indexOf(OLD_START);
const endIdx = content.indexOf(OLD_END, startIdx);
if (startIdx === -1 || endIdx === -1) { console.error('Markers not found'); process.exit(1); }
content = content.slice(0, startIdx) + NEW_CODE + content.slice(endIdx);
writeFileSync('src/App.jsx', content, 'utf8');
console.log('Games rewritten successfully');
