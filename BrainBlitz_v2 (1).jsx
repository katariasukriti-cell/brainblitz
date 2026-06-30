import { useState, useEffect, useRef } from "react";

const FL = document.createElement("link");
FL.rel = "stylesheet";
FL.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(FL);

const THEMES = {
  light: { name:"Light", bg:"#FAF9F6", card:"#FFFFFF", border:"#ECEAE3", text:"#1A1A1A", sub:"#8A8578", accent:"#1A1A1A", accentAlt:"#3D3A33", accentText:"#FFFFFF", nav:"#FFFFFF", pill:"#F2F0EA", pillText:"#6B665C", heroOverlay:"linear-gradient(to top,rgba(0,0,0,0.62) 0%,rgba(0,0,0,0.05) 60%)", gradText:"#1A1A1A", cardGrad:"#F5F3EE" },
  dark: { name:"Dark", bg:"#0E0E10", card:"#1A1A1E", border:"#2A2A30", text:"#F4F3F0", sub:"#7A7680", accent:"#F4F3F0", accentAlt:"#C8C4BC", accentText:"#0E0E10", nav:"#1A1A1E", pill:"#26262C", pillText:"#9A96A0", heroOverlay:"linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.1) 60%)", gradText:"#F4F3F0", cardGrad:"#1F1F24" }
};

const PASTELS = [
  { bg:"#E8E4F0", fg:"#5A4E7C" },
  { bg:"#F3E8DC", fg:"#9C6B3D" },
  { bg:"#E0EDE4", fg:"#4A7058" },
  { bg:"#E2EAF2", fg:"#3E5A78" },
  { bg:"#F3E4E8", fg:"#8E4A5C" },
  { bg:"#F2EEDC", fg:"#85753D" }
];

const CATS = [
  { id:"Science", icon:"\u{1F52C}", color:"#00D4FF", bg:"rgba(0,212,255,0.12)" },
  { id:"History", icon:"\u{1F3DB}\uFE0F", color:"#FF9F43", bg:"rgba(255,159,67,0.12)" },
  { id:"Psychology", icon:"\u{1F9E0}", color:"#BF5AF2", bg:"rgba(191,90,242,0.12)" },
  { id:"Technology", icon:"\u{1F4A1}", color:"#00FF88", bg:"rgba(0,255,136,0.12)" },
  { id:"Nature", icon:"\u{1F33F}", color:"#26D07C", bg:"rgba(38,208,124,0.12)" },
  { id:"Philosophy", icon:"\u{1F300}", color:"#F7B731", bg:"rgba(247,183,49,0.12)" },
  { id:"Economics", icon:"\u{1F4C8}", color:"#45AAF2", bg:"rgba(69,170,242,0.12)" },
  { id:"Art & Culture", icon:"\u{1F3A8}", color:"#FF6B9D", bg:"rgba(255,107,157,0.12)" },
  { id:"Health", icon:"\u2764\uFE0F", color:"#FF4757", bg:"rgba(255,71,87,0.12)" },
  { id:"Space", icon:"\u{1F680}", color:"#5352ED", bg:"rgba(83,82,237,0.12)" },
  { id:"Politics", icon:"\u2696\uFE0F", color:"#A29BFE", bg:"rgba(162,155,254,0.12)" },
  { id:"Mathematics", icon:"\u{1F522}", color:"#FD9644", bg:"rgba(253,150,68,0.12)" },
  { id:"Environment", icon:"\u{1F30D}", color:"#2ED573", bg:"rgba(46,213,115,0.12)" },
  { id:"Literature", icon:"\u{1F4D6}", color:"#ECCC68", bg:"rgba(236,204,104,0.12)" },
  { id:"Sport", icon:"\u26BD", color:"#1E90FF", bg:"rgba(30,144,255,0.12)" },
  { id:"Food & Nutrition", icon:"\u{1F957}", color:"#FF6348", bg:"rgba(255,99,72,0.12)" },
  { id:"Architecture", icon:"\u{1F3D9}\uFE0F", color:"#747D8C", bg:"rgba(116,125,140,0.12)" },
  { id:"Music", icon:"\u{1F3B5}", color:"#FF4ECD", bg:"rgba(255,78,205,0.12)" }
];

const S = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : d; } catch (e) { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const TODAY = new Date().toDateString();

const ARTICLES = [
  {id:1,emoji:"🔬",title:"The wonders of science: how the universe actually works",category:"Science",readTime:11,date:"Today",image:"https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=800&q=80",body:"Science is humanity's most reliable method for understanding reality. At its core, every scientific discovery begins with a question and ends with evidence. The ancient Greeks asked why objects fall, but it was Isaac Newton who gave us the answer in mathematical form: gravity. Newton's three laws of motion, published in 1687, remain the foundation of classical mechanics and explain everything from a falling apple to a spacecraft's trajectory.\n\nThe building blocks of all matter are atoms, made of protons, neutrons, and electrons. The proton count in an atom's nucleus determines which element it is — hydrogen has one, carbon has six, gold has 79. The periodic table, now containing 118 confirmed elements, arranges them by atomic number and reveals patterns in their properties that chemists exploit every day.\n\nLife itself operates at the molecular level. DNA, or deoxyribonucleic acid, carries the genetic instructions for every living organism. Its famous double-helix structure stores information in sequences of four chemical bases. When a cell divides, the DNA replicates itself through a process called replication. Errors in copying are mutations, the raw material of evolution by natural selection.\n\nEnergy is the currency of the universe. Einstein's equation E=mc² revealed that mass and energy are interconvertible, explaining the enormous power of nuclear reactions. In living systems, the mitochondria convert chemical energy from food into ATP. Plants perform photosynthesis, capturing light energy and using it to build sugars from carbon dioxide and water — producing the oxygen we breathe.\n\nThe scientific method — observe, hypothesise, test, revise — is what separates science from guesswork. Theories are explanations supported by vast bodies of evidence and capable of making accurate predictions. When evidence contradicts a theory, the theory changes. That self-correcting quality is science's greatest strength, and the reason its discoveries actually work when applied to the real world.",quiz:{"type": "mcq", "questions": [{"q": "What is the chemical formula for water?", "opts": ["CO2", "H2O", "O2", "H2O2"], "ans": 1}, {"q": "Which scientist proposed the theory of general relativity?", "opts": ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"], "ans": 2}, {"q": "What does DNA stand for?", "opts": ["Deoxyribonucleic acid", "Dinucleic acid", "Deoxyribose nitrogen acid", "Double nucleic acid"], "ans": 0}]}},
  {id:2,emoji:"🏛️",title:"History's turning points: moments that changed everything",category:"History",readTime:12,date:"Today",image:"https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80",body:"History is not simply a list of dates — it is the story of how human decisions, accidents, and ideas reshaped civilisations. Few moments loom larger than the fall of the Western Roman Empire in 476 AD, which ended a millennium of Roman dominance and ushered in the medieval period. Yet Rome's influence never truly died; its laws, language, and architecture still shape Western society today.\n\nThe Renaissance, beginning in 14th-century Italy, marked a rebirth of art, science, and philosophy. Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512. Leonardo da Vinci painted the Mona Lisa. Gutenberg's invention of the printing press around 1440 allowed ideas to spread at unprecedented speed, directly enabling the Protestant Reformation when Martin Luther published his 95 Theses in 1517.\n\nThe 18th and 19th centuries brought revolutions in politics and production. The French Revolution began in 1789, overthrowing the monarchy and introducing ideas of liberty and equality that rippled across the world. The Industrial Revolution, beginning in Britain, transformed how goods were made and how people lived. Steam power, factories, and railways rewired economies and created the modern urban world.\n\nThe 20th century was defined by two catastrophic world wars and a Cold War between the USA and Soviet Union that shaped global politics for five decades. World War II ended in 1945 after atomic bombs were dropped on Hiroshima and Nagasaki. The Berlin Wall, the most potent symbol of Cold War division, fell in 1989. The Soviet Union dissolved in 1991.\n\nUnderstanding history helps us recognise patterns in the present. Empires rise and fall. Revolutions are often followed by reactions. Technological change disrupts old orders and creates new ones. The study of history is not nostalgia — it is the essential context for understanding why the world is the way it is, and what might come next.",quiz:{"type": "mcq", "questions": [{"q": "In which year did the Berlin Wall fall?", "opts": ["1987", "1989", "1991", "1993"], "ans": 1}, {"q": "Who painted the ceiling of the Sistine Chapel?", "opts": ["Da Vinci", "Raphael", "Michelangelo", "Donatello"], "ans": 2}, {"q": "The Industrial Revolution began in which country?", "opts": ["USA", "Germany", "France", "Britain"], "ans": 3}]}},
  {id:3,emoji:"🌍",title:"Our remarkable planet: geography's most astonishing facts",category:"Geography",readTime:10,date:"Yesterday",image:"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",body:"Earth is a planet of extremes. The Mariana Trench in the Pacific Ocean plunges nearly 11 kilometres below sea level — deep enough to submerge Mount Everest entirely. Everest itself, on the Nepal-China border, reaches 8,849 metres, the highest point on the planet's surface. Between these two extremes lies a world of staggering geographic variety.\n\nWater defines our world. The Pacific Ocean covers more area than all of Earth's landmasses combined. The Nile, flowing through 11 countries to the Mediterranean Sea, contests with the Amazon for the title of world's longest river. The Amazon rainforest, mostly in Brazil, produces around 20% of the world's freshwater oxygen output. The world's largest desert is not the Sahara — it is the Antarctic Desert.\n\nThe world's deserts reveal geography's paradoxes. The driest non-polar desert is the Atacama in South America, where some weather stations have never recorded rainfall. The Gobi spans Mongolia and northern China. Meanwhile, tropical rainforests receive several metres of rainfall annually. Geography shapes climate, and climate shapes everything — what grows, what animals survive, and how civilisations develop.\n\nHuman geography is equally fascinating. Russia spans 11 time zones and is the world's largest country by area. Canada has the longest coastline of any nation. Vatican City, enclosed within Rome, is the world's smallest country. Bangladesh, smaller than many individual states, is among the most densely populated nations on Earth. Singapore is simultaneously a city, a country, and one of the world's most successful economies.\n\nGeography shapes history, economics, and culture. Countries with natural harbours became trading powers. Nations with mountains developed distinct regional cultures. Rivers determined where cities grew. As climate change alters coastlines, glacier cover, and rainfall patterns, geography itself is being rewritten — making it one of the most dynamic and consequential fields of study in the 21st century.",quiz:{"type": "mcq", "questions": [{"q": "Which is the largest ocean on Earth?", "opts": ["Atlantic", "Indian", "Arctic", "Pacific"], "ans": 3}, {"q": "Which is the largest desert in the world?", "opts": ["Sahara", "Gobi", "Antarctic Desert", "Arabian"], "ans": 2}, {"q": "Which country has the longest coastline in the world?", "opts": ["Australia", "Russia", "Canada", "Indonesia"], "ans": 2}]}},
  {id:4,emoji:"🚀",title:"The universe is stranger and larger than you can imagine",category:"Space",readTime:11,date:"2 days ago",image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",body:"The observable universe is approximately 93 billion light-years across — and a light-year is roughly 9.5 trillion kilometres. The Sun's light takes about 8 minutes to reach Earth; light from the nearest star, Proxima Centauri, takes over 4 years. The Andromeda Galaxy, our nearest large galactic neighbour, is 2.5 million light-years away. These numbers are not merely large — they are incomprehensible on a human scale.\n\nOur solar system contains eight planets. Mercury is closest to the Sun and has a day longer than its year. Venus is the hottest planet despite not being nearest the Sun, due to its thick carbon dioxide atmosphere. Mars hosts Olympus Mons, the largest volcano in the solar system. Jupiter, the largest planet, has a storm called the Great Red Spot that has raged for centuries and is wider than Earth.\n\nSaturn's rings are made mostly of ice particles. Uranus rotates on its side. Neptune takes 165 Earth years to orbit the Sun. Beyond the planets lies the Kuiper Belt and the Oort Cloud, where comets originate. Pluto, reclassified as a dwarf planet in 2006, orbits in the Kuiper Belt along with hundreds of other icy bodies.\n\nHuman space exploration began on 4 October 1957 when the Soviet Union launched Sputnik 1. Yuri Gagarin became the first human in space in 1961. Neil Armstrong stepped onto the Moon on 20 July 1969. The International Space Station has been continuously crewed since November 2000. In 2021, NASA's James Webb Space Telescope was launched to observe the earliest galaxies. In 2024, Japan became the fifth country to land a spacecraft on the Moon.\n\nThe greatest mysteries remain unsolved. Dark matter makes up roughly 27% of the universe's total mass-energy but has never been directly detected. Dark energy, comprising about 68%, is causing the universe's expansion to accelerate. Black holes warp spacetime so severely that not even light can escape their event horizon. The more we discover about space, the stranger and more magnificent it becomes.",quiz:{"type": "mcq", "questions": [{"q": "Which planet has the most confirmed moons (as of 2025)?", "opts": ["Jupiter", "Saturn", "Uranus", "Neptune"], "ans": 1}, {"q": "What is our galaxy called?", "opts": ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"], "ans": 1}, {"q": "Who was the first human in space?", "opts": ["Neil Armstrong", "Alan Shepard", "Yuri Gagarin", "John Glenn"], "ans": 2}]}},
  {id:5,emoji:"🧠",title:"Why we think the way we do: the science of the mind",category:"Psychology",readTime:11,date:"3 days ago",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",body:"Psychology is the scientific study of how and why people think, feel, and behave. Sigmund Freud, the father of psychoanalysis, introduced the idea of the unconscious mind — a reservoir of memories and desires that shape behaviour without our awareness. His structural model of the mind divided it into the id (primitive drives), ego (rational mediator), and superego (internalised social rules).\n\nMuch of what we consider rational decision-making is shaped by cognitive biases. Confirmation bias leads us to seek information that confirms what we already believe. The Dunning-Kruger effect describes how people with limited knowledge in a domain overestimate their competence. The bystander effect means people are less likely to help someone in distress when others are present, as responsibility becomes diffused across the group.\n\nIvan Pavlov demonstrated classical conditioning through his famous experiments with dogs. B.F. Skinner extended this with operant conditioning: behaviours that are rewarded increase, while those that are punished decrease. Abraham Maslow proposed a hierarchy of needs, arguing that basic needs like food and safety must be met before higher needs like belonging and self-actualisation can be pursued.\n\nThe brain's neuroplasticity — its ability to reorganise and form new connections — means that learning and experience physically change our neural architecture. Serotonin regulates mood and wellbeing; adrenaline triggers the fight-or-flight response. Sleep plays a critical role in memory consolidation, with REM sleep particularly important for processing emotional memories. Sleep deprivation impairs decision-making more severely than most people realise.\n\nCognitive Behavioural Therapy (CBT) helps people identify and change unhelpful thought patterns and is one of the most evidence-based psychological treatments available. The placebo effect — improvement from expectation alone — can be as powerful as some active treatments. Recognising our own biases, understanding conditioning, and appreciating neuroplasticity gives us genuine tools to improve how we think, feel, and respond to the world.",quiz:{"type": "mcq", "questions": [{"q": "Who is known as the founder of psychoanalysis?", "opts": ["Carl Jung", "Sigmund Freud", "Alfred Adler", "Wilhelm Wundt"], "ans": 1}, {"q": "What is cognitive dissonance?", "opts": ["Memory loss", "Discomfort from conflicting beliefs", "Fear of new ideas", "Learning difficulty"], "ans": 1}, {"q": "Neuroplasticity refers to the brain's ability to do what?", "opts": ["Grow larger", "Reorganise and form new connections", "Resist disease", "Speed up reactions"], "ans": 1}]}},
  {id:6,emoji:"💡",title:"From ARPANET to AI: how technology reshaped civilisation",category:"Technology",readTime:11,date:"4 days ago",image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",body:"The digital revolution is the most transformative shift in human communication since the printing press. ARPANET, the forerunner of the internet, connected four US universities in 1969. The first message sent was 'LO' — the system crashed after two letters. From that humble beginning emerged the network now used by over 5.5 billion people. Tim Berners-Lee invented the World Wide Web in 1991, adding a navigable layer of linked documents that made the internet accessible to everyone.\n\nThe technology industry's founding stories are largely American. Microsoft was founded by Bill Gates and Paul Allen in 1975. Apple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976. Google was created by Larry Page and Sergey Brin in 1998. Amazon began in Jeff Bezos's garage in 1994. Facebook, launched by Mark Zuckerberg from his Harvard dorm room in 2004, became the blueprint for social media. These companies now rank among the most valuable in human history.\n\nThe smartphone era transformed daily life. Apple's iPhone, launched in 2007, put the internet in everyone's pocket. Android, developed by Google, became the world's most widely used mobile operating system. Social media platforms — Instagram, WhatsApp, X (formerly Twitter), TikTok — collectively connect billions. Elon Musk acquired Twitter in 2022 and renamed it X. TikTok, developed by Chinese company ByteDance, became one of history's fastest-growing apps.\n\nArtificial intelligence has moved from science fiction to daily life. Google DeepMind's AlphaGo defeated world Go champions in 2016. ChatGPT reached 100 million users faster than any product in history. In January 2025, Chinese startup DeepSeek released a powerful AI model at a fraction of competitors' costs, reshaking industry assumptions. Cryptocurrencies, built on blockchain technology, began with Bitcoin — created by the pseudonymous Satoshi Nakamoto.\n\nThe next frontiers include quantum computing, which could solve problems impossible for classical computers, and augmented reality, which overlays digital information onto the physical world. The Internet of Things (IoT) connects everyday objects to the internet. As AI, biotech, and computing converge, the pace of technological change is accelerating — creating opportunities and risks that societies are only beginning to grapple with.",quiz:{"type": "mcq", "questions": [{"q": "Who is considered the father of the World Wide Web?", "opts": ["Bill Gates", "Tim Berners-Lee", "Vint Cerf", "Steve Jobs"], "ans": 1}, {"q": "Which company created ChatGPT?", "opts": ["Google", "Meta", "OpenAI", "Microsoft"], "ans": 2}, {"q": "What does AI stand for in technology?", "opts": ["Automated Internet", "Artificial Intelligence", "Advanced Integration", "Applied Informatics"], "ans": 1}]}},
  {id:7,emoji:"🌿",title:"The natural world: extraordinary life on Earth",category:"Nature",readTime:10,date:"5 days ago",image:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",body:"Life on Earth is more diverse, more interconnected, and more astonishing than any human invention. Scientists estimate there are 8.7 million species, of which only about 1.2 million have been formally described. Insects alone account for over 60% of all animal species — and their role as pollinators makes human agriculture possible. Bees are the primary pollinator of most food crops worldwide, making their decline one of the most serious ecological threats we face.\n\nThe ocean is the planet's greatest wilderness. The blue whale, reaching up to 30 metres in length, is the largest animal ever known to have lived. The peregrine falcon, diving at over 320 km/h, is the fastest animal on Earth. The cheetah reaches 112 km/h on land. The saltwater crocodile has the strongest bite force of any living animal. The reticulated python is the longest snake. The golden poison dart frog is among the most poisonous vertebrates.\n\nAnimal intelligence never ceases to surprise. Octopuses have three hearts, blue blood, and can navigate mazes and open jars. Crows can recognise individual human faces and use tools. Chimpanzees share approximately 98.7% of our DNA. Dolphins develop signature whistles — essentially unique names — that they use throughout their lives. Elephants mourn their dead, exhibit empathy, and have exceptional memories.\n\nPlants communicate in ways we are still discovering. Trees in forests are connected by underground mycorrhizal fungal networks through which they exchange nutrients and chemical signals. Some trees warn neighbours of insect attacks by releasing airborne chemical compounds. Bristlecone pines in California can live over 5,000 years. Sequoias are among the largest organisms by mass ever to exist on Earth.\n\nNature's interconnectedness means losing one species can cascade through an entire ecosystem. When wolves were reintroduced to Yellowstone in 1995, their presence changed deer behaviour, allowed riverbanks to revegetate, stabilised water flow, and literally changed the course of rivers. This trophic cascade shows the natural world is not a collection of separate organisms but a single interwoven system — one we are still learning to understand and protect.",quiz:{"type": "mcq", "questions": [{"q": "What is the fastest land animal?", "opts": ["Lion", "Cheetah", "Pronghorn", "Greyhound"], "ans": 1}, {"q": "How many hearts does an octopus have?", "opts": ["1", "2", "3", "4"], "ans": 2}, {"q": "Which animal is the closest living relative to humans?", "opts": ["Gorilla", "Orangutan", "Chimpanzee", "Baboon"], "ans": 2}]}},
  {id:8,emoji:"📖",title:"The greatest books ever written and why they endure",category:"Literature",readTime:11,date:"6 days ago",image:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",body:"Literature is the art of using language to capture truth about human nature, society, and the experience of being alive. The oldest surviving epic poem, the Epic of Gilgamesh, written around 2100 BC, already grapples with friendship, loss, and the search for immortality. Homer's Iliad and Odyssey shaped how the ancient Greeks understood heroism and fate. These foundational texts established storytelling as one of humanity's most important technologies.\n\nWilliam Shakespeare produced 37 plays and 154 sonnets that remain the most performed works in any language. Hamlet's 'To be or not to be' is perhaps the most famous passage in English. Miguel de Cervantes' Don Quixote (1605) is often called the first modern novel. Jane Austen pioneered psychological realism. Leo Tolstoy's War and Peace and Fyodor Dostoevsky's Crime and Punishment represent the heights of 19th-century Russian literature. Victor Hugo's Les Misérables tackled poverty and justice with unforgettable force.\n\nThe 20th century brought radical experimentation. James Joyce's Ulysses revolutionised narrative form. Franz Kafka's work created a new adjective — Kafkaesque — to describe bureaucratic absurdity and existential dread. George Orwell's 1984 and Aldous Huxley's Brave New World defined the dystopian genre and remain urgently relevant. Marcel Proust's In Search of Lost Time explores how memory shapes identity across seven volumes.\n\nNon-Western literature transformed global reading. Gabriel Garcia Marquez's One Hundred Years of Solitude introduced magical realism to the world. Chinua Achebe's Things Fall Apart reframed the African colonial experience from the inside. Toni Morrison's Beloved confronted American slavery's legacy with devastating power. Salman Rushdie's Midnight's Children used India's independence as a canvas for narrative experiment. These works expanded literature's scope and challenged whose stories were told.\n\nBooks do something no other medium fully replicates: they grant access to another person's interior life with sustained depth and intimacy. Reading literary fiction improves empathy and the ability to understand different perspectives. The greatest books endure not because they are easy but because they are true — capturing something essential about human experience that remains recognisable across centuries.",quiz:{"type": "mcq", "questions": [{"q": "Who wrote '1984'?", "opts": ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], "ans": 1}, {"q": "Who wrote 'One Hundred Years of Solitude'?", "opts": ["Pablo Neruda", "Gabriel Garcia Marquez", "Mario Vargas Llosa", "Jorge Luis Borges"], "ans": 1}, {"q": "Who created the detective Sherlock Holmes?", "opts": ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "Raymond Chandler"], "ans": 1}]}},
  {id:9,emoji:"🎨",title:"Art, culture, and the human need to create",category:"Art & Culture",readTime:10,date:"7 days ago",image:"https://images.unsplash.com/photo-1541367777708-7905fe3296c4?w=800&q=80",body:"Human beings have been making art for at least 45,000 years — the age of the oldest known cave paintings. Art is not a luxury; it is one of the defining characteristics of our species. From ancient figurines to the Sistine Chapel to Banksy's anonymous street art, the compulsion to mark, shape, and represent the world is universal across cultures and millennia.\n\nThe Renaissance transformed Western art by rediscovering classical principles. Leonardo da Vinci's Mona Lisa and Michelangelo's David represent its twin peaks. The Louvre in Paris now houses the Mona Lisa; the Hermitage in St Petersburg and the Uffizi in Florence hold other world-defining collections. Impressionism, pioneered by Claude Monet, broke from academic tradition by capturing fleeting light and atmosphere. Vincent van Gogh's Starry Night was painted while he was in an asylum — a reminder that creativity and suffering can coexist.\n\nPablo Picasso and Georges Braque co-founded Cubism, fragmenting form and perspective. Salvador Dalí's melting clocks defined Surrealism. Andy Warhol's Campbell's Soup Cans made Pop Art the voice of consumer culture. Jackson Pollock's drip paintings challenged what painting even was. Every generation produces artists who force a redefinition of the form.\n\nCulture encompasses far more than fine art. Flamenco dance emerged from southern Spain; kabuki theatre evolved in Japan; the samba parade defines Rio de Janeiro's carnival. Diwali celebrates light over darkness. The Day of the Dead in Mexico transforms grief into celebration. K-pop has created a genuinely global fanbase. These cultural forms are how societies transmit values, memories, and identities across generations.\n\nArt and culture are not frivolous — they are how societies remember, process, and transmit meaning. The endurance of ancient artworks reminds us that despite all change, human experience has a remarkable continuity. The challenge and beauty of culture is that it constantly evolves, absorbing new influences and producing new forms, while remaining recognisably human at its core.",quiz:{"type": "mcq", "questions": [{"q": "Who painted 'The Starry Night'?", "opts": ["Claude Monet", "Vincent van Gogh", "Paul Cezanne", "Salvador Dali"], "ans": 1}, {"q": "Which art movement is Andy Warhol associated with?", "opts": ["Surrealism", "Pop Art", "Impressionism", "Cubism"], "ans": 1}, {"q": "Which artist co-founded the Cubist movement?", "opts": ["Henri Matisse", "Pablo Picasso", "Marc Chagall", "Joan Miro"], "ans": 1}]}},
  {id:10,emoji:"🎵",title:"Music: the universal language that shapes the brain",category:"Music",readTime:10,date:"8 days ago",image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",body:"Music is the only art form that activates every known area of the human brain simultaneously. When you listen to a song you love, your brain releases dopamine. Music has been present in every known human culture. Mozart composed over 600 works before dying at 35. Beethoven composed his Ninth Symphony while completely deaf. Vivaldi's Four Seasons remains one of the most performed compositions ever written.\n\nThe 20th century produced an explosion of popular music genres. Jazz emerged from New Orleans in the early 1900s, blending African American musical traditions with European harmony. Reggae, popularised globally by Bob Marley, originated in Jamaica. The Beatles recorded Abbey Road and dozens of other landmark albums, becoming the best-selling music act in history. Michael Jackson's Thriller remains the best-selling album of all time. Beyoncé, who rose to fame with Destiny's Child, became one of the most awarded artists in Grammy history.\n\nMusic crosses every cultural boundary. The tango originated in Argentina; samba in Brazil; flamenco in Spain. K-pop has created a genuinely global fanbase. Jazz guitarist BB King was known as the King of the Blues. The Rolling Stones, featuring Mick Jagger and Keith Richards, defined what a rock band could be. ABBA, from Sweden, produced some of the most enduring pop songs ever written.\n\nThe science of music reveals why it moves us so profoundly. Rhythm synchronises groups — it is why armies march and congregations sing. Music therapy is used to support people with dementia, anxiety, and chronic pain. Learning to play an instrument strengthens cognitive abilities including memory, attention, and mathematical reasoning. The emotional power of music appears to be partly hardwired — certain chord progressions and rhythms produce consistent emotional responses across cultures.\n\nStreaming transformed the music industry in the 2010s and 2020s, making virtually all music accessible to anyone with internet access. Taylor Swift's Eras Tour became the first concert tour to gross over one billion dollars. The Grammy for Album of the Year 2024 went to Taylor Swift. Music has never been more globally accessible — or more commercially complex.",quiz:{"type": "mcq", "questions": [{"q": "Which composer became deaf later in life but kept composing?", "opts": ["Mozart", "Beethoven", "Chopin", "Haydn"], "ans": 1}, {"q": "Jazz music originated in which US city?", "opts": ["Chicago", "New York", "Memphis", "New Orleans"], "ans": 3}, {"q": "Who sang 'Bohemian Rhapsody'?", "opts": ["Led Zeppelin", "Queen", "The Eagles", "Aerosmith"], "ans": 1}]}},
  {id:11,emoji:"🌀",title:"Philosophy: the questions that define how we live",category:"Philosophy",readTime:11,date:"9 days ago",image:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",body:"Philosophy asks the questions that other disciplines take for granted. What is knowledge? What is reality? What is the right way to act? What makes a life worth living? These are not abstract puzzles — they are the deepest practical questions humans face. Every ethical framework used in law, medicine, policy, and business has philosophical roots.\n\nAncient Greek philosophy laid the foundations. Socrates taught by asking relentless questions — the Socratic method. His student Plato argued in The Republic that reality is a shadow of a higher realm of perfect Forms, and that justice is the central organising principle of both the soul and the city. Plato's student Aristotle tutored Alexander the Great and produced foundational works on logic, biology, ethics, and politics. Aristotle believed knowledge came from observation, not just pure reason.\n\nRené Descartes sought certainty in an age of scientific revolution. His conclusion — 'I think, therefore I am' — established the thinking mind as the one thing that cannot be doubted. John Locke argued the mind begins as a blank slate shaped entirely by experience. Immanuel Kant, perhaps the greatest modern philosopher, argued in the Critique of Pure Reason that our minds actively structure what we experience. His categorical imperative in ethics holds that we should act only by principles we could will to be universal laws.\n\nEthics asks how we should act. Utilitarianism holds that the right action produces the greatest good for the greatest number. Aristotle's virtue ethics focuses on character — becoming the kind of person who naturally does good. Jean-Paul Sartre's existentialism insists we are 'condemned to be free': there is no predefined human nature, so we create ourselves through choices. Stoicism, refined by Marcus Aurelius in his Meditations, offers perhaps the most practical philosophy: focus only on what you can control.\n\nPhilosophy has never been more relevant. Questions about AI consciousness, genetic engineering, global inequality, and the nature of truth are deeply philosophical. Occam's Razor — that the simplest explanation is usually correct — guides scientists and detectives alike. The trolley problem, once a classroom exercise in ethics, now directly applies to decisions programmed into autonomous vehicles. Philosophy is not an academic exercise; it is the map we use to navigate the hardest questions.",quiz:{"type": "mcq", "questions": [{"q": "Who said 'I think, therefore I am'?", "opts": ["Aristotle", "Immanuel Kant", "René Descartes", "John Locke"], "ans": 2}, {"q": "Which school of philosophy teaches accepting what you cannot control?", "opts": ["Epicureanism", "Cynicism", "Stoicism", "Skepticism"], "ans": 2}, {"q": "Utilitarianism holds that the right action produces what?", "opts": ["Personal happiness", "Greatest good for greatest number", "Individual freedom", "Divine approval"], "ans": 1}]}},
  {id:12,emoji:"📈",title:"How economies work: wealth, markets, and money",category:"Economics",readTime:10,date:"10 days ago",image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",body:"Economics is the study of how people allocate scarce resources. Adam Smith's insight in The Wealth of Nations (1776) — that when individuals pursue their own interests in competitive markets, they are guided by an 'invisible hand' to produce outcomes that benefit society — underpins modern capitalism. Markets operate through supply and demand: when supply exceeds demand, prices fall; when demand exceeds supply, prices rise.\n\nJohn Maynard Keynes, writing during the Great Depression, argued that markets could get stuck in low-demand equilibria and that governments should intervene through fiscal policy — spending and taxation — to stimulate growth. Central banks use monetary policy, including interest rates and quantitative easing, to manage inflation and growth. The US Federal Reserve, European Central Bank, and Bank of England are among the most powerful institutions in the global economy.\n\nGDP (Gross Domestic Product) measures the total value of goods and services produced by a country. Inflation is a general rise in prices; deflation is a fall. A recession is defined as two consecutive quarters of negative GDP growth. The Gini coefficient measures income inequality; high values indicate greater inequality. In 2024, the USA remained the world's largest economy by nominal GDP, with China close behind.\n\nGlobal economic power continues to shift. The BRICS group (Brazil, Russia, India, China, South Africa, plus new 2024 members including Ethiopia) represents an emerging counterweight to Western-dominated institutions. Cryptocurrency, built on blockchain technology, began with Bitcoin — created by the pseudonymous Satoshi Nakamoto. The question of whether decentralised digital currencies can complement or challenge traditional monetary systems is one of economics' most active debates.\n\nMicroeconomics focuses on individual and firm decisions; macroeconomics on national and global trends. Game theory analyses strategic interaction — the mathematics of situations where outcomes depend on what others do. As automation and AI reshape labour markets, economists debate whether existing theories of work and value remain adequate for the century ahead. Economics is not just about money — it is about how societies organise to meet human needs and wants.",quiz:{"type": "mcq", "questions": [{"q": "What does GDP stand for?", "opts": ["Gross Domestic Product", "General Domestic Price", "Global Development Plan", "Gross Development Percentage"], "ans": 0}, {"q": "The 'invisible hand' concept was introduced by which economist?", "opts": ["Karl Marx", "Adam Smith", "John Keynes", "Milton Friedman"], "ans": 1}, {"q": "What is a 'recession' defined as?", "opts": ["1 quarter of negative growth", "2 consecutive quarters of negative GDP growth", "A fall in stock markets", "High unemployment"], "ans": 1}]}},
  {id:13,emoji:"❤️",title:"Understanding your body: the science of health",category:"Health",readTime:10,date:"11 days ago",image:"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",body:"The human body contains approximately 37 trillion cells, 206 bones, and over 600 muscles, coordinated by a nervous system that transmits signals at up to 120 metres per second. The heart beats around 100,000 times a day, pumping blood through roughly 100,000 kilometres of blood vessels. The body's complexity is extraordinary — and understanding how it works is among the most practically valuable knowledge anyone can have.\n\nThe immune system defends against infection through white blood cells that identify and destroy pathogens. Vaccines work by presenting the immune system with a harmless version of a pathogen, allowing it to build defences without risk of actual disease. Edward Jenner created the first vaccine against smallpox in 1796; smallpox was officially eradicated in 1980 — the only human disease ever completely eliminated. Alexander Fleming's discovery of penicillin in 1928 transformed medicine's ability to treat bacterial infections.\n\nNutrition underpins health at every level. Carbohydrates are the body's primary energy source. Proteins build and repair tissue. Fats, despite their reputation, are essential for brain function and hormone production. Vitamin C prevents scurvy; Vitamin D supports bone health and immune function. Iron carries oxygen in haemoglobin. Calcium is essential for bones and teeth. Iodine is critical for thyroid function. Most deficiencies are preventable through a varied diet.\n\nMental and physical health are inseparable. Chronic stress elevates cortisol, which over time damages the cardiovascular system, impairs immunity, and shrinks the hippocampus — critical for memory. Regular aerobic exercise reduces risk of heart disease, type 2 diabetes, depression, and dementia. Seven to nine hours of sleep is optimal for adults; deprivation impairs decision-making severely. The gut microbiome — trillions of microorganisms in the digestive tract — is increasingly linked to immune function, mood, and metabolic health.\n\nMedical science has extended human life expectancy from around 32 years in 1900 to over 72 today. CRISPR gene-editing technology holds the potential to cure genetic diseases. The challenge now is not just extending life but maintaining quality of life — the WHO defines health as physical, mental, and social wellbeing, not merely the absence of disease. Prevention through lifestyle remains the single most powerful medical intervention available.",quiz:{"type": "mcq", "questions": [{"q": "Which vitamin is produced when skin is exposed to sunlight?", "opts": ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], "ans": 3}, {"q": "What is the medical term for high blood pressure?", "opts": ["Hypotension", "Hypertension", "Hyperglycemia", "Tachycardia"], "ans": 1}, {"q": "Which organ produces insulin?", "opts": ["Liver", "Kidney", "Pancreas", "Spleen"], "ans": 2}]}},
  {id:14,emoji:"🔢",title:"Mathematics: the hidden language of the universe",category:"Mathematics",readTime:10,date:"12 days ago",image:"https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80",body:"Many mathematicians believe mathematics is not invented but discovered — that its patterns exist independently of human minds. The ratio of a circle's circumference to its diameter is always π (approximately 3.14159), whether calculated in ancient Egypt or a modern lab. Euclid's geometry, developed around 300 BC, was so logically rigorous that it served as the model for mathematical proof for two millennia and remains foundational today.\n\nPrime numbers — integers divisible only by 1 and themselves — are the atoms of arithmetic. The sequence begins 2, 3, 5, 7, 11, 13... and continues infinitely, as Euclid proved. Despite their simplicity, primes hide extraordinary mysteries. The Riemann Hypothesis, one of the Millennium Prize Problems worth one million dollars to its solver, concerns the distribution of primes and remains unsolved after 165 years. Goldbach's Conjecture — that every even number greater than 2 is the sum of two primes — has been verified up to enormous numbers but never formally proved.\n\nThe Pythagorean theorem — a squared plus b squared equals c squared for right-angled triangles — underlies all of Euclidean geometry, navigation, and engineering. The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13...) appears throughout nature — in spiral shells, sunflower seed arrangements, and branching trees. A dodecagon has 12 sides; an octagon has 8. A quadrilateral's angles always sum to 360 degrees.\n\nStatistics and probability govern how we understand uncertainty. The probability of flipping heads on a fair coin is exactly one half. The normal distribution — the bell curve — describes how many naturally occurring variables cluster around an average. Bayes' theorem provides a mathematically rigorous way to update beliefs in light of new evidence, underpinning spam filters, medical diagnostics, and machine learning algorithms.\n\nMathematics increasingly underpins all other fields. Physics describes the universe in equations. Economics uses game theory and calculus. Computer science is applied mathematics. Cryptography — the security of every online transaction — relies on the difficulty of factoring large prime numbers. When Galileo said the universe is written in the language of mathematics, he captured something profound: the patterns mathematics describes are the patterns reality itself follows.",quiz:{"type": "mcq", "questions": [{"q": "What is the value of pi to two decimal places?", "opts": ["3.12", "3.14", "3.16", "3.18"], "ans": 1}, {"q": "Which famous theorem relates the sides of a right triangle?", "opts": ["Euclid's theorem", "Pythagorean theorem", "Fermat's theorem", "Bayes' theorem"], "ans": 1}, {"q": "What is the only even prime number?", "opts": ["0", "1", "2", "4"], "ans": 2}]}},
  {id:15,emoji:"🌱",title:"Our planet under pressure: environment and climate",category:"Environment",readTime:11,date:"13 days ago",image:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",body:"The Earth's climate has changed throughout its history, but what is happening now is unprecedented in its speed and its cause. Carbon dioxide levels have risen from around 280 parts per million before industrialisation to over 420 ppm today — higher than any point in at least 800,000 years. The primary driver is burning fossil fuels, releasing CO2 that has been locked underground for millions of years. The Paris Agreement commits nations to limiting warming to well below 2°C above pre-industrial levels.\n\nThe consequences of warming are already visible. Arctic sea ice is declining at roughly 13% per decade. Coral bleaching, caused by warming seas, has damaged the Great Barrier Reef and coral systems worldwide. Sea level rise threatens low-lying nations and cities. Extreme weather events — heatwaves, floods, droughts, and wildfires — are becoming more frequent. In January 2025, devastating wildfires struck the Los Angeles area, killing dozens and destroying thousands of homes.\n\nBiodiversity loss is the second great environmental crisis. The current rate of species extinction is estimated at 1,000 times the natural background rate — a mass extinction driven by habitat destruction, pollution, and climate change. The Amazon rainforest, home to perhaps 10% of all species, is being cleared at alarming rates. Coral reefs, built by tiny animals called polyps, support about 25% of all marine species despite covering less than 1% of the ocean floor.\n\nThe Montreal Protocol of 1987, which restricted chlorofluorocarbons (CFCs), demonstrated what international action can achieve: the ozone hole is healing. Renewable energy — solar, wind, and geothermal — is now cost-competitive with fossil fuels in most markets. Electric vehicles are rapidly displacing internal combustion engines. Rewilding — restoring degraded ecosystems to natural states — can simultaneously restore biodiversity and carbon storage.\n\nIndividual action matters less than systemic change, but the two reinforce each other. The choices made in this decade will determine whether the worst outcomes can be avoided. China is the world's largest CO2 emitter but also the world's largest investor in renewable energy. The ESG framework (Environmental, Social, Governance) is pushing corporations to account for environmental impact. The environmental crisis is not a future problem — its consequences are here now, and its solutions are available.",quiz:{"type": "mcq", "questions": [{"q": "The Paris Agreement aims to limit global warming to below how many degrees Celsius?", "opts": ["1°C", "2°C", "3°C", "4°C"], "ans": 1}, {"q": "Which gas is the primary greenhouse gas emitted by humans?", "opts": ["Oxygen", "Methane", "CO2", "Nitrous oxide"], "ans": 2}, {"q": "Which international agreement tackled the ozone hole?", "opts": ["Kyoto Protocol", "Paris Agreement", "Montreal Protocol", "Rio Convention"], "ans": 2}]}},
  {id:16,emoji:"🍽️",title:"Food, flavour, and the culture of eating",category:"Food & Nutrition",readTime:10,date:"14 days ago",image:"https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80",body:"Food is simultaneously fuel, culture, identity, and pleasure. The cuisines of the world reflect the histories, geographies, and values of the people who created them. Sushi began as a method of fermenting fish with rice for preservation; paella emerged from Valencia's rice fields; pizza was developed in Naples before becoming globally adapted. Every great cuisine is the product of centuries of adaptation and exchange.\n\nThe flavours we perceive are shaped by five taste categories: sweet, sour, salty, bitter, and umami — the savoury quality found in meat, aged cheese, miso, and fermented sauces, identified by Japanese scientist Kikunae Ikeda in 1908. Smell accounts for roughly 80% of what we experience as flavour. Saffron, made from dried crocus stigmas, is the world's most expensive spice by weight. The spice trade motivated European exploration of Africa and the Americas.\n\nNutrition science has evolved considerably. The Mediterranean diet — rich in olive oil, fish, vegetables, and legumes — is consistently associated with longevity. Fermented foods like kimchi, miso, and kefir support the gut microbiome, which is increasingly linked to immune function and mood. The concept of 'al dente' pasta — firm to the bite — reflects Italian precision about texture. Chocolate derives from cacao trees originally cultivated by Mesoamerican civilisations before being transformed by European tastes.\n\nCoffee originated in Ethiopia; Brazil is now the world's largest producer. Spain produces the most olive oil. The Netherlands is famous for Gouda and Edam cheeses. Quinoa was a staple of the Inca civilisation. Tempura is Japanese. Bouillabaisse is French. Baklava is a sweet pastry from Turkish and Middle Eastern culinary traditions. Food geography — where dishes come from and how they travelled — is a lens onto global history.\n\nFood security is a defining challenge of the century. The world produces enough calories to feed everyone, yet over 800 million people are chronically undernourished — a problem of distribution and conflict rather than production. A third of all food produced is wasted. Alternative proteins — insects, lab-grown meat, plant-based alternatives — are being developed to feed a growing population with a smaller environmental footprint. What we eat is one of the most powerful choices we make for our health and for the planet.",quiz:{"type": "mcq", "questions": [{"q": "Which spice is the most expensive by weight?", "opts": ["Vanilla", "Cardamom", "Saffron", "Cinnamon"], "ans": 2}, {"q": "What is 'umami', often called the fifth taste?", "opts": ["Sweet", "Savoury/meaty", "Bitter", "Sour"], "ans": 1}, {"q": "Which country is the world's largest producer of coffee?", "opts": ["Colombia", "Vietnam", "Ethiopia", "Brazil"], "ans": 3}]}},
  {id:17,emoji:"🏗️",title:"Built to last: architecture through the ages",category:"Architecture",readTime:10,date:"15 days ago",image:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",body:"Architecture is the art of designing spaces for human life, and what civilisations build reveals what they value most. The pyramids at Giza, completed around 2560 BC, are the only surviving ancient wonder of the world. The Great Pyramid remained the tallest human-made structure for nearly 4,000 years. Across the ancient world — the Parthenon in Athens, the Colosseum in Rome, Angkor Wat in Cambodia, Machu Picchu in Peru — monumental architecture marked civilisations' grandest aspirations.\n\nThe Parthenon, built in the Doric order, used subtle optical corrections to counter visual illusions. Roman architects invented concrete, enabling construction at scales impossible with stone alone. The Colosseum held up to 50,000 spectators and used sophisticated vaulted corridors for crowd management — principles still used in modern stadiums. Gothic architecture from the 12th century used pointed arches, rib vaults, and flying buttresses to build soaring cathedrals. Notre-Dame de Paris, damaged by fire in 2019, reopened after painstaking restoration in December 2024.\n\nRenaissance architecture returned to classical principles of symmetry and proportion. The Baroque added drama and ornamentation. Modern architecture broke all historical rules. Frank Lloyd Wright's Fallingwater cantilevered a house over a waterfall. Jorn Utzon's Sydney Opera House, with its distinctive shell-like roofs, became a city's entire global identity. The Louvre's glass pyramid entrance was designed by I.M. Pei. The Guggenheim Bilbao, designed by Frank Gehry, proved that a building could regenerate an entire city's economy.\n\nThe Burj Khalifa in Dubai, completed in 2010, stands at 828 metres — the world's tallest building. The Sagrada Familia in Barcelona, designed by Antoni Gaudí and still under construction, will be the world's tallest church upon completion. Ancient Petra in Jordan was carved entirely from red rock. The Hagia Sophia in Istanbul has functioned as a cathedral, mosque, museum, and mosque again across 1,500 years.\n\nSustainable architecture is now one of the field's central challenges. Buildings account for nearly 40% of global energy use. Green roofs, passive solar design, and natural ventilation are increasingly standard in new construction. The future of architecture must solve not just the problem of beauty but of ecological survival — designing buildings that work with natural systems rather than against them.",quiz:{"type": "mcq", "questions": [{"q": "Which architectural style features pointed arches and flying buttresses?", "opts": ["Romanesque", "Renaissance", "Gothic", "Baroque"], "ans": 2}, {"q": "In which city is the Burj Khalifa?", "opts": ["Abu Dhabi", "Riyadh", "Dubai", "Doha"], "ans": 2}, {"q": "Who designed the Sydney Opera House?", "opts": ["Frank Lloyd Wright", "Oscar Niemeyer", "Jorn Utzon", "Harry Seidler"], "ans": 2}]}},
  {id:18,emoji:"⚽",title:"Sport, competition, and the human drive to excel",category:"Sport",readTime:10,date:"16 days ago",image:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",body:"Sport is one of humanity's oldest cultural institutions. The ancient Olympic Games, held at Olympia from 776 BC, were a religious festival where Greek city-states suspended warfare. The modern Olympics, revived in Athens in 1896, now brings together athletes from virtually every nation. Paris hosted the 2024 Summer Olympics, where the USA topped the gold medal count and gymnast Simone Biles returned from a three-year absence to win multiple medals.\n\nFootball is the world's most popular sport, played by over 250 million people across 200+ countries. Brazil has won the FIFA World Cup five times — more than any other nation. Pelé is widely considered the greatest player of all time. Argentina won the 2022 World Cup in Qatar, with Lionel Messi finally claiming the one major trophy that had eluded him. Spain won Euro 2024. The 2026 World Cup will be co-hosted by the USA, Canada, and Mexico. Formula 1's Max Verstappen won four consecutive world championships from 2021 to 2024.\n\nIndividual achievement inspires across every sport. Usain Bolt's world records in the 100m and 200m sprints have not been broken. Michael Phelps won 23 Olympic gold medals in swimming. Serena Williams won 23 Grand Slam singles titles. Novak Djokovic holds the record for most men's Grand Slam titles in tennis, winning Wimbledon 2024. Tiger Woods won 15 major golf titles. Female gymnast Simone Biles is widely considered the greatest gymnast of all time.\n\nSports science has transformed elite performance. Nutrition, biomechanics, psychology, and analytics now matter as much as raw talent. High-altitude training, recovery science, and marginal gains thinking have redefined the limits of human performance. Anti-doping remains a constant challenge as testing technology battles new performance-enhancing substances. Meanwhile, technology in sport — VAR in football, Hawk-Eye in cricket and tennis, GPS tracking — is changing how games are played and officiated.\n\nSport reflects and shapes society. Jackie Robinson broke baseball's colour barrier in 1947. Muhammad Ali refused Vietnam War service and paid with three years out of boxing. The Black Power salute at the 1968 Mexico Olympics became iconic. Today athletes use their platforms for social advocacy. India won the T20 Cricket World Cup in 2024. The Ashes rivalry between England and Australia continues. Sport is never just sport — it is a mirror of who we are.",quiz:{"type": "mcq", "questions": [{"q": "Which country has won the most FIFA World Cups?", "opts": ["Germany", "Argentina", "Brazil", "Italy"], "ans": 2}, {"q": "Which swimmer has won the most Olympic gold medals?", "opts": ["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Caeleb Dressel"], "ans": 1}, {"q": "Which tennis player has won the most men's Grand Slam singles titles (as of 2024)?", "opts": ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"], "ans": 2}]}},
  {id:19,emoji:"⚖️",title:"Politics and power: how societies govern themselves",category:"Politics",readTime:10,date:"17 days ago",image:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",body:"Politics is the process by which groups make collective decisions. The ancient Athenians invented democracy around 500 BC, though their version excluded women, slaves, and non-citizens. Modern democracy, incorporating universal suffrage and protected rights, took centuries to develop. The Magna Carta of 1215 established the principle that even the monarch was subject to the law. The US Constitution, written in 1787, is the oldest written national constitution still in use — beginning with 'We the People'.\n\nPolitical ideologies provide frameworks for organising society. Classical liberalism favours individual rights, free markets, and limited government. Socialism argues for collective ownership and redistribution. Conservatism emphasises tradition, order, and gradual change. In practice, most modern democracies blend elements of different ideologies. Political systems range from direct democracy to representative democracy, from constitutional monarchy to presidential republic.\n\nInternational politics is shaped by the system of sovereign nation-states. The United Nations, founded in 1945, has 193 member states and a Security Council with five permanent members (USA, UK, France, Russia, China) each with veto power. NATO expanded significantly after Russia's invasion of Ukraine; Sweden became its 32nd member in 2024. The EU represents the world's most ambitious attempt at supranational governance. The G20 brings together the leaders of the world's 20 largest economies.\n\nIn 2024, more people voted in elections than any year in history. Keir Starmer became UK Prime Minister after Labour's landslide victory in July. Donald Trump won the US presidential election in November, returning to the White House for a second non-consecutive term. Emmanuel Macron remained France's president. Narendra Modi won a third term in India. Javier Milei, Argentina's libertarian president elected in 2023, pursued radical economic reform.\n\nDemocracy faces challenges globally. The rise of populism, social media's role in political discourse, and democratic backsliding in multiple countries are among the defining political challenges of the 21st century. The tension between national sovereignty and global cooperation on issues like climate change, AI governance, and pandemic preparedness may define politics for generations. Understanding how power works — and how to hold it accountable — is one of the most important forms of civic knowledge.",quiz:{"type": "mcq", "questions": [{"q": "Which document begins with 'We the People'?", "opts": ["Declaration of Independence", "US Constitution", "Magna Carta", "Bill of Rights"], "ans": 1}, {"q": "How many permanent members does the UN Security Council have?", "opts": ["3", "5", "7", "10"], "ans": 1}, {"q": "Who became UK Prime Minister after the July 2024 general election?", "opts": ["Rishi Sunak", "Boris Johnson", "Keir Starmer", "Liz Truss"], "ans": 2}]}},
  {id:20,emoji:"📰",title:"The world in 2024-2025: stories that shaped our time",category:"Current Affairs",readTime:10,date:"18 days ago",image:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",body:"The years 2024 and 2025 were among the most consequential in recent memory. Over half the world's population went to the polls in 2024 — the largest electoral year in history. Donald Trump won the US presidential election in November 2024, returning to the White House. In the UK, Keir Starmer's Labour Party won a landslide election in July 2024, ending 14 years of Conservative government. Emmanuel Macron's snap election in France produced a hung parliament.\n\nParis hosted the 2024 Summer Olympics with an extraordinary opening ceremony along the River Seine. Simone Biles returned from her 2021 withdrawal to win multiple medals. Leon Marchand electrified the home crowd with four individual gold medals in swimming. Spain won the men's Euro 2024 football tournament. Argentina's Javier Milei and other populist leaders continued to reshape global politics through provocative economic and cultural stances.\n\nIn culture, Taylor Swift's Eras Tour became the first concert tour to gross over one billion dollars. The film Oppenheimer won Best Picture at the 2024 Academy Awards. In March 2025, Anora won Best Picture at the Oscars. Notre-Dame de Paris cathedral, severely damaged by fire in April 2019, reopened after a remarkable restoration in December 2024, returning one of the world's greatest architectural treasures to Paris.\n\nPope Francis, who served as the first pope from the Americas for 12 years, died in April 2025. His successor took the name Leo XIV, becoming the first American-born pope in history. Devastating wildfires struck the Los Angeles area in January 2025, killing dozens and destroying thousands of homes in one of California's costliest natural disasters. The Nobel Peace Prize 2024 was awarded to Nihon Hidankyo, a Japanese organisation of atomic bomb survivors advocating for a nuclear-weapons-free world.\n\nTechnology continued to reshape society. AI became ubiquitous: ChatGPT, Claude, and Gemini are used by hundreds of millions. China's DeepSeek released a powerful AI model in January 2025 at a fraction of competitors' costs, challenging assumptions about Western AI dominance. India's Chandrayaan-3 had landed near the Moon's south pole in 2023, making India the fourth country to achieve a Moon landing. As the world navigates geopolitical uncertainty, technological disruption, and climate pressure, understanding current affairs has never felt more urgent.",quiz:{"type": "mcq", "questions": [{"q": "Who won the 2024 US presidential election?", "opts": ["Joe Biden", "Kamala Harris", "Donald Trump", "Ron DeSantis"], "ans": 2}, {"q": "Which famous Paris cathedral reopened in December 2024?", "opts": ["Sacre-Coeur", "Notre-Dame", "Sainte-Chapelle", "Saint-Sulpice"], "ans": 1}, {"q": "Which film won Best Picture Oscar in March 2025?", "opts": ["Wicked", "The Brutalist", "Anora", "Conclave"], "ans": 2}]}},
];

const QUESTION_BANK = [
  {q:"What is the capital of Australia?",opts:["Sydney", "Melbourne", "Canberra", "Perth"],ans:2,category:"Geography"},
  {q:"Which is the longest river in the world?",opts:["Amazon", "Nile", "Yangtze", "Mississippi"],ans:1,category:"Geography"},
  {q:"Which is the largest ocean on Earth?",opts:["Atlantic", "Indian", "Arctic", "Pacific"],ans:3,category:"Geography"},
  {q:"Mount Everest lies on the border of Nepal and which country?",opts:["India", "China", "Bhutan", "Pakistan"],ans:1,category:"Geography"},
  {q:"Which is the largest desert in the world?",opts:["Sahara", "Gobi", "Antarctic Desert", "Arabian"],ans:2,category:"Geography"},
  {q:"What is the capital of Canada?",opts:["Toronto", "Vancouver", "Montreal", "Ottawa"],ans:3,category:"Geography"},
  {q:"Which country has the largest population in the world (2025)?",opts:["China", "India", "USA", "Indonesia"],ans:1,category:"Geography"},
  {q:"The Great Barrier Reef is located off the coast of which country?",opts:["Brazil", "Australia", "Philippines", "Mexico"],ans:1,category:"Geography"},
  {q:"Which is the smallest country in the world by area?",opts:["Monaco", "Malta", "Vatican City", "San Marino"],ans:2,category:"Geography"},
  {q:"Which river flows through Paris?",opts:["Thames", "Seine", "Rhine", "Danube"],ans:1,category:"Geography"},
  {q:"What is the capital of Japan?",opts:["Osaka", "Kyoto", "Tokyo", "Nagoya"],ans:2,category:"Geography"},
  {q:"Which continent is the largest by land area?",opts:["Africa", "North America", "Asia", "Europe"],ans:2,category:"Geography"},
  {q:"The Andes mountain range is located on which continent?",opts:["Asia", "South America", "Africa", "Europe"],ans:1,category:"Geography"},
  {q:"Which country is known as the Land of the Rising Sun?",opts:["China", "Thailand", "Japan", "South Korea"],ans:2,category:"Geography"},
  {q:"What is the capital of Brazil?",opts:["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"],ans:2,category:"Geography"},
  {q:"Which is the largest country in the world by area?",opts:["Canada", "China", "USA", "Russia"],ans:3,category:"Geography"},
  {q:"The Sahara Desert is primarily located on which continent?",opts:["Asia", "Africa", "Australia", "South America"],ans:1,category:"Geography"},
  {q:"Which strait separates Europe from Africa?",opts:["Bering Strait", "Strait of Gibraltar", "Strait of Hormuz", "Bosphorus"],ans:1,category:"Geography"},
  {q:"What is the capital of Egypt?",opts:["Alexandria", "Giza", "Cairo", "Luxor"],ans:2,category:"Geography"},
  {q:"Which country has the most natural lakes?",opts:["Russia", "USA", "Canada", "Finland"],ans:2,category:"Geography"},
  {q:"The Amazon rainforest is mostly located in which country?",opts:["Peru", "Colombia", "Brazil", "Venezuela"],ans:2,category:"Geography"},
  {q:"Which is the deepest ocean trench in the world?",opts:["Tonga Trench", "Java Trench", "Mariana Trench", "Puerto Rico Trench"],ans:2,category:"Geography"},
  {q:"What is the capital of South Korea?",opts:["Busan", "Seoul", "Incheon", "Daegu"],ans:1,category:"Geography"},
  {q:"Which European city is built on more than 100 islands?",opts:["Amsterdam", "Stockholm", "Venice", "Copenhagen"],ans:2,category:"Geography"},
  {q:"Which African country was formerly known as Abyssinia?",opts:["Kenya", "Ethiopia", "Sudan", "Somalia"],ans:1,category:"Geography"},
  {q:"What is the capital of New Zealand?",opts:["Auckland", "Christchurch", "Wellington", "Hamilton"],ans:2,category:"Geography"},
  {q:"The Dead Sea borders Israel and which other country?",opts:["Egypt", "Syria", "Jordan", "Lebanon"],ans:2,category:"Geography"},
  {q:"Which is the longest mountain range in the world?",opts:["Himalayas", "Rockies", "Andes", "Alps"],ans:2,category:"Geography"},
  {q:"What is the capital of Russia?",opts:["St Petersburg", "Moscow", "Kazan", "Novosibirsk"],ans:1,category:"Geography"},
  {q:"Which country is both in Europe and Asia?",opts:["Greece", "Turkey", "Bulgaria", "Romania"],ans:1,category:"Geography"},
  {q:"The Panama Canal connects the Atlantic Ocean with which ocean?",opts:["Indian", "Arctic", "Pacific", "Southern"],ans:2,category:"Geography"},
  {q:"Which is the largest island in the world?",opts:["Madagascar", "Borneo", "New Guinea", "Greenland"],ans:3,category:"Geography"},
  {q:"What is the capital of Italy?",opts:["Milan", "Venice", "Rome", "Naples"],ans:2,category:"Geography"},
  {q:"Which US state is the largest by area?",opts:["Texas", "California", "Alaska", "Montana"],ans:2,category:"Geography"},
  {q:"Victoria Falls lies on the border of Zambia and which country?",opts:["Botswana", "Zimbabwe", "Mozambique", "Namibia"],ans:1,category:"Geography"},
  {q:"What is the capital of Spain?",opts:["Barcelona", "Seville", "Valencia", "Madrid"],ans:3,category:"Geography"},
  {q:"Which sea is the saltiest natural body of water on Earth?",opts:["Red Sea", "Dead Sea", "Caspian Sea", "Black Sea"],ans:1,category:"Geography"},
  {q:"Which country has the longest coastline in the world?",opts:["Australia", "Russia", "Canada", "Indonesia"],ans:2,category:"Geography"},
  {q:"What is the capital of Germany?",opts:["Munich", "Frankfurt", "Hamburg", "Berlin"],ans:3,category:"Geography"},
  {q:"Mount Kilimanjaro is located in which country?",opts:["Kenya", "Tanzania", "Uganda", "Ethiopia"],ans:1,category:"Geography"},
  {q:"Which two countries share the longest international border?",opts:["USA and Mexico", "Russia and China", "USA and Canada", "Argentina and Chile"],ans:2,category:"Geography"},
  {q:"What is the capital of India?",opts:["Mumbai", "Kolkata", "New Delhi", "Chennai"],ans:2,category:"Geography"},
  {q:"Which desert covers much of Mongolia and northern China?",opts:["Thar", "Kalahari", "Gobi", "Atacama"],ans:2,category:"Geography"},
  {q:"Which is the world\'s highest waterfall?",opts:["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],ans:2,category:"Geography"},
  {q:"What is the capital of Argentina?",opts:["Cordoba", "Buenos Aires", "Rosario", "Mendoza"],ans:1,category:"Geography"},
  {q:"The Suez Canal is located in which country?",opts:["Saudi Arabia", "Israel", "Egypt", "Jordan"],ans:2,category:"Geography"},
  {q:"Which country is known as the Land of a Thousand Lakes?",opts:["Sweden", "Norway", "Finland", "Canada"],ans:2,category:"Geography"},
  {q:"What is the capital of China?",opts:["Shanghai", "Beijing", "Guangzhou", "Shenzhen"],ans:1,category:"Geography"},
  {q:"Which is the driest non-polar desert in the world?",opts:["Sahara", "Atacama", "Gobi", "Namib"],ans:1,category:"Geography"},
  {q:"The Alps stretch across how many main countries (approximately)?",opts:["3", "5", "8", "12"],ans:2,category:"Geography"},
  {q:"What is the capital of Kenya?",opts:["Mombasa", "Nairobi", "Kisumu", "Nakuru"],ans:1,category:"Geography"},
  {q:"Which line of latitude divides the Earth into Northern and Southern Hemispheres?",opts:["Tropic of Cancer", "Prime Meridian", "Equator", "Tropic of Capricorn"],ans:2,category:"Geography"},
  {q:"Which country owns Greenland?",opts:["Norway", "Canada", "Denmark", "Iceland"],ans:2,category:"Geography"},
  {q:"What is the capital of Mexico?",opts:["Guadalajara", "Cancun", "Mexico City", "Monterrey"],ans:2,category:"Geography"},
  {q:"Which Asian city-state is both a city and a country?",opts:["Hong Kong", "Macau", "Singapore", "Dubai"],ans:2,category:"Geography"},
  {q:"Lake Baikal, the world\'s deepest lake, is in which country?",opts:["Mongolia", "Kazakhstan", "Russia", "China"],ans:2,category:"Geography"},
  {q:"What is the capital of Turkey?",opts:["Istanbul", "Ankara", "Izmir", "Antalya"],ans:1,category:"Geography"},
  {q:"The Nile flows into which sea?",opts:["Red Sea", "Mediterranean Sea", "Arabian Sea", "Black Sea"],ans:1,category:"Geography"},
  {q:"Which country is nicknamed the Emerald Isle?",opts:["Scotland", "Iceland", "Ireland", "New Zealand"],ans:2,category:"Geography"},
  {q:"Which is the only continent with land in all four hemispheres?",opts:["Asia", "Africa", "South America", "Europe"],ans:1,category:"Geography"},
  {q:"In which year did World War II end?",opts:["1943", "1944", "1945", "1946"],ans:2,category:"History"},
  {q:"Who was the first President of the United States?",opts:["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"],ans:2,category:"History"},
  {q:"The Great Wall of China was primarily built to protect against invasions from which direction?",opts:["South", "East", "North", "West"],ans:2,category:"History"},
  {q:"In which year did the Titanic sink?",opts:["1905", "1912", "1918", "1923"],ans:1,category:"History"},
  {q:"Who was the famous queen of ancient Egypt allied with Julius Caesar?",opts:["Nefertiti", "Hatshepsut", "Cleopatra", "Isis"],ans:2,category:"History"},
  {q:"The French Revolution began in which year?",opts:["1776", "1789", "1799", "1804"],ans:1,category:"History"},
  {q:"Who painted the ceiling of the Sistine Chapel?",opts:["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],ans:2,category:"History"},
  {q:"In which year did the Berlin Wall fall?",opts:["1987", "1989", "1991", "1993"],ans:1,category:"History"},
  {q:"Which empire was ruled by Genghis Khan?",opts:["Ottoman Empire", "Roman Empire", "Mongol Empire", "Persian Empire"],ans:2,category:"History"},
  {q:"Who was the British Prime Minister during most of World War II?",opts:["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"],ans:1,category:"History"},
  {q:"The ancient city of Rome was traditionally founded in which year?",opts:["753 BC", "500 BC", "250 BC", "100 AD"],ans:0,category:"History"},
  {q:"Which ship carried the Pilgrims to America in 1620?",opts:["Santa Maria", "Mayflower", "Endeavour", "Beagle"],ans:1,category:"History"},
  {q:"Who was assassinated in Sarajevo in 1914, sparking World War I?",opts:["Kaiser Wilhelm II", "Tsar Nicholas II", "Archduke Franz Ferdinand", "Otto von Bismarck"],ans:2,category:"History"},
  {q:"The Renaissance began in which country?",opts:["France", "Italy", "Greece", "Spain"],ans:1,category:"History"},
  {q:"Who was the first man to step on the Moon?",opts:["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],ans:2,category:"History"},
  {q:"In which year did India gain independence from Britain?",opts:["1942", "1945", "1947", "1950"],ans:2,category:"History"},
  {q:"Which civilization built Machu Picchu?",opts:["Aztec", "Maya", "Inca", "Olmec"],ans:2,category:"History"},
  {q:"Who wrote the 95 Theses, starting the Protestant Reformation?",opts:["John Calvin", "Martin Luther", "Henry VIII", "Erasmus"],ans:1,category:"History"},
  {q:"The Cold War was primarily between the USA and which country?",opts:["China", "Germany", "Soviet Union", "Japan"],ans:2,category:"History"},
  {q:"Who was the Egyptian boy king whose tomb was discovered in 1922?",opts:["Ramses II", "Tutankhamun", "Akhenaten", "Khufu"],ans:1,category:"History"},
  {q:"Which year did Christopher Columbus first reach the Americas?",opts:["1488", "1492", "1498", "1502"],ans:1,category:"History"},
  {q:"Napoleon Bonaparte was finally defeated at which battle in 1815?",opts:["Austerlitz", "Trafalgar", "Waterloo", "Leipzig"],ans:2,category:"History"},
  {q:"Which ancient wonder was located in Alexandria, Egypt?",opts:["Hanging Gardens", "Colossus", "The Lighthouse (Pharos)", "Temple of Artemis"],ans:2,category:"History"},
  {q:"Who was the leader of Nazi Germany?",opts:["Benito Mussolini", "Adolf Hitler", "Joseph Stalin", "Francisco Franco"],ans:1,category:"History"},
  {q:"The Magna Carta was signed in which country in 1215?",opts:["France", "England", "Spain", "Germany"],ans:1,category:"History"},
  {q:"Which Indian leader led the non-violent independence movement?",opts:["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"],ans:1,category:"History"},
  {q:"The Roman Empire split into Eastern and Western halves; the Eastern half became known as what?",opts:["Holy Roman Empire", "Ottoman Empire", "Byzantine Empire", "Carthaginian Empire"],ans:2,category:"History"},
  {q:"Who was the first female Prime Minister of the United Kingdom?",opts:["Theresa May", "Margaret Thatcher", "Indira Gandhi", "Angela Merkel"],ans:1,category:"History"},
  {q:"In which year did the American Civil War end?",opts:["1861", "1863", "1865", "1870"],ans:2,category:"History"},
  {q:"Which explorer led the first expedition to circumnavigate the globe?",opts:["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"],ans:2,category:"History"},
  {q:"The Industrial Revolution began in which country?",opts:["USA", "Germany", "France", "Britain"],ans:3,category:"History"},
  {q:"Who was the South African leader imprisoned for 27 years before becoming president?",opts:["Desmond Tutu", "Nelson Mandela", "Thabo Mbeki", "Steve Biko"],ans:1,category:"History"},
  {q:"Which city was destroyed by a volcanic eruption of Mount Vesuvius in 79 AD?",opts:["Athens", "Pompeii", "Carthage", "Troy"],ans:1,category:"History"},
  {q:"The Hundred Years\' War was fought between England and which country?",opts:["Spain", "Germany", "France", "Netherlands"],ans:2,category:"History"},
  {q:"Who was the US President during the Cuban Missile Crisis?",opts:["Dwight Eisenhower", "John F. Kennedy", "Lyndon Johnson", "Richard Nixon"],ans:1,category:"History"},
  {q:"Which dynasty built most of the Great Wall of China as it stands today?",opts:["Han", "Tang", "Ming", "Qing"],ans:2,category:"History"},
  {q:"The Russian Revolution took place in which year?",opts:["1905", "1914", "1917", "1922"],ans:2,category:"History"},
  {q:"Who discovered penicillin in 1928?",opts:["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Robert Koch"],ans:1,category:"History"},
  {q:"Which queen ruled Britain for over 63 years during the 19th century?",opts:["Queen Anne", "Queen Victoria", "Queen Mary", "Queen Elizabeth I"],ans:1,category:"History"},
  {q:"The Aztec Empire was located in present-day which country?",opts:["Peru", "Mexico", "Guatemala", "Colombia"],ans:1,category:"History"},
  {q:"Who was the first Emperor of unified China?",opts:["Qin Shi Huang", "Han Wudi", "Kublai Khan", "Sun Yat-sen"],ans:0,category:"History"},
  {q:"D-Day landings in 1944 took place on the beaches of which region?",opts:["Brittany", "Normandy", "Provence", "Flanders"],ans:1,category:"History"},
  {q:"Which US President abolished slavery with the Emancipation Proclamation?",opts:["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Ulysses Grant"],ans:2,category:"History"},
  {q:"The Ottoman Empire was centred in which modern-day country?",opts:["Greece", "Iran", "Turkey", "Egypt"],ans:2,category:"History"},
  {q:"Who flew the first powered aeroplane in 1903?",opts:["Charles Lindbergh", "The Wright brothers", "Amelia Earhart", "Glenn Curtiss"],ans:1,category:"History"},
  {q:"Which wall divided a European capital city from 1961 to 1989?",opts:["Hadrian's Wall", "Berlin Wall", "Warsaw Wall", "Vienna Wall"],ans:1,category:"History"},
  {q:"The Black Death pandemic occurred mainly in which century?",opts:["12th", "14th", "16th", "18th"],ans:1,category:"History"},
  {q:"Who was the longest-reigning British monarch in history?",opts:["Queen Victoria", "King George III", "Queen Elizabeth II", "King Henry VIII"],ans:2,category:"History"},
  {q:"Which ancient Greek city-state is famous for its military society?",opts:["Athens", "Corinth", "Sparta", "Thebes"],ans:2,category:"History"},
  {q:"Apartheid officially ended in South Africa in which decade?",opts:["1970s", "1980s", "1990s", "2000s"],ans:2,category:"History"},
  {q:"Who was the Soviet leader during the Cuban Missile Crisis?",opts:["Joseph Stalin", "Nikita Khrushchev", "Leonid Brezhnev", "Mikhail Gorbachev"],ans:1,category:"History"},
  {q:"Which document begins with \'We the People\'?",opts:["Declaration of Independence", "US Constitution", "Magna Carta", "Bill of Rights"],ans:1,category:"History"},
  {q:"Joan of Arc was a heroine of which country?",opts:["England", "Italy", "France", "Spain"],ans:2,category:"History"},
  {q:"Which empire built the Colosseum?",opts:["Greek", "Roman", "Byzantine", "Persian"],ans:1,category:"History"},
  {q:"Hiroshima was bombed in which year?",opts:["1943", "1944", "1945", "1946"],ans:2,category:"History"},
  {q:"Which famous trade route connected China with the Mediterranean?",opts:["Spice Route", "Silk Road", "Amber Road", "Tea Route"],ans:1,category:"History"},
  {q:"Who was the first Tsar of Russia?",opts:["Peter the Great", "Ivan the Terrible", "Nicholas I", "Alexander I"],ans:1,category:"History"},
  {q:"Which country gifted the Statue of Liberty to the USA?",opts:["Britain", "Spain", "France", "Italy"],ans:2,category:"History"},
  {q:"The Vikings originally came from which region?",opts:["British Isles", "Scandinavia", "Germany", "Iceland"],ans:1,category:"History"},
  {q:"In which year did the Soviet Union dissolve?",opts:["1989", "1990", "1991", "1993"],ans:2,category:"History"},
  {q:"What is the chemical symbol for gold?",opts:["Go", "Gd", "Au", "Ag"],ans:2,category:"Science"},
  {q:"What is the chemical symbol for oxygen?",opts:["O", "Ox", "Om", "On"],ans:0,category:"Science"},
  {q:"How many bones are in the adult human body?",opts:["196", "206", "216", "226"],ans:1,category:"Science"},
  {q:"What gas do plants absorb from the atmosphere for photosynthesis?",opts:["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],ans:2,category:"Science"},
  {q:"What is the hardest natural substance on Earth?",opts:["Quartz", "Diamond", "Titanium", "Graphene"],ans:1,category:"Science"},
  {q:"What is the speed of light in a vacuum (approximately)?",opts:["300,000 km/s", "150,000 km/s", "500,000 km/s", "1 million km/s"],ans:0,category:"Science"},
  {q:"Which scientist proposed the theory of general relativity?",opts:["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],ans:2,category:"Science"},
  {q:"What is the chemical formula for water?",opts:["CO2", "H2O", "O2", "H2O2"],ans:1,category:"Science"},
  {q:"Which element has the atomic number 1?",opts:["Helium", "Oxygen", "Hydrogen", "Carbon"],ans:2,category:"Science"},
  {q:"What part of the cell contains genetic material?",opts:["Mitochondria", "Ribosome", "Nucleus", "Cytoplasm"],ans:2,category:"Science"},
  {q:"What force keeps planets in orbit around the Sun?",opts:["Magnetism", "Friction", "Gravity", "Inertia"],ans:2,category:"Science"},
  {q:"Which blood type is known as the universal donor?",opts:["A", "B", "AB", "O negative"],ans:3,category:"Science"},
  {q:"What is the most abundant gas in Earth\'s atmosphere?",opts:["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],ans:2,category:"Science"},
  {q:"Who developed the theory of evolution by natural selection?",opts:["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Alfred Wallace alone"],ans:1,category:"Science"},
  {q:"What is the boiling point of water at sea level?",opts:["90°C", "95°C", "100°C", "110°C"],ans:2,category:"Science"},
  {q:"Which organ produces insulin?",opts:["Liver", "Kidney", "Pancreas", "Spleen"],ans:2,category:"Science"},
  {q:"What is the chemical symbol for iron?",opts:["Ir", "In", "Fe", "I"],ans:2,category:"Science"},
  {q:"DNA stands for what?",opts:["Deoxyribonucleic acid", "Dinucleic acid", "Deoxyribose nitrogen acid", "Double nucleic acid"],ans:0,category:"Science"},
  {q:"What type of energy is stored in a stretched spring?",opts:["Kinetic", "Thermal", "Potential", "Chemical"],ans:2,category:"Science"},
  {q:"Which particle has a negative charge?",opts:["Proton", "Neutron", "Electron", "Photon"],ans:2,category:"Science"},
  {q:"What is the largest organ of the human body?",opts:["Liver", "Brain", "Skin", "Lungs"],ans:2,category:"Science"},
  {q:"Sound cannot travel through which of these?",opts:["Water", "Steel", "Air", "A vacuum"],ans:3,category:"Science"},
  {q:"What is the chemical symbol for sodium?",opts:["So", "Sd", "Na", "Sm"],ans:2,category:"Science"},
  {q:"Which vitamin is produced when skin is exposed to sunlight?",opts:["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],ans:3,category:"Science"},
  {q:"What is the pH of pure water?",opts:["5", "6", "7", "8"],ans:2,category:"Science"},
  {q:"Which metal is liquid at room temperature?",opts:["Lead", "Mercury", "Gallium only", "Tin"],ans:1,category:"Science"},
  {q:"What do we call animals that eat both plants and meat?",opts:["Herbivores", "Carnivores", "Omnivores", "Detritivores"],ans:2,category:"Science"},
  {q:"Which scientist discovered gravity after observing a falling apple, according to legend?",opts:["Galileo", "Isaac Newton", "Kepler", "Copernicus"],ans:1,category:"Science"},
  {q:"What is the smallest unit of life?",opts:["Atom", "Molecule", "Cell", "Organ"],ans:2,category:"Science"},
  {q:"Which gas makes up about 21% of Earth\'s atmosphere?",opts:["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"],ans:1,category:"Science"},
  {q:"What instrument measures atmospheric pressure?",opts:["Thermometer", "Barometer", "Hygrometer", "Anemometer"],ans:1,category:"Science"},
  {q:"Which part of the brain controls balance?",opts:["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"],ans:1,category:"Science"},
  {q:"What is the chemical symbol for potassium?",opts:["P", "Po", "K", "Pt"],ans:2,category:"Science"},
  {q:"Which famous physicist developed the three laws of motion?",opts:["Einstein", "Newton", "Faraday", "Maxwell"],ans:1,category:"Science"},
  {q:"What is the process by which plants make food using sunlight?",opts:["Respiration", "Fermentation", "Photosynthesis", "Transpiration"],ans:2,category:"Science"},
  {q:"Which is the only metal that is magnetic at room temperature among these?",opts:["Copper", "Aluminium", "Iron", "Zinc"],ans:2,category:"Science"},
  {q:"How many chromosomes do humans typically have?",opts:["23", "44", "46", "48"],ans:2,category:"Science"},
  {q:"What is the term for a substance that speeds up a chemical reaction?",opts:["Inhibitor", "Catalyst", "Reactant", "Solvent"],ans:1,category:"Science"},
  {q:"Which organ pumps blood around the body?",opts:["Lungs", "Brain", "Heart", "Liver"],ans:2,category:"Science"},
  {q:"What is the lightest element in the periodic table?",opts:["Helium", "Hydrogen", "Lithium", "Oxygen"],ans:1,category:"Science"},
  {q:"Which scientist is known for the law of conservation of mass?",opts:["Lavoisier", "Dalton", "Boyle", "Avogadro"],ans:0,category:"Science"},
  {q:"What kind of waves are used in sonar?",opts:["Light waves", "Radio waves", "Sound waves", "Microwaves"],ans:2,category:"Science"},
  {q:"Which gas is commonly known as laughing gas?",opts:["Carbon monoxide", "Nitrous oxide", "Methane", "Ozone"],ans:1,category:"Science"},
  {q:"What is the human body\'s normal temperature in Celsius?",opts:["35°C", "36°C", "37°C", "38.5°C"],ans:2,category:"Science"},
  {q:"Which planet\'s atmosphere is mostly carbon dioxide with sulfuric acid clouds?",opts:["Mars", "Venus", "Mercury", "Jupiter"],ans:1,category:"Science"},
  {q:"What is the study of fungi called?",opts:["Botany", "Mycology", "Zoology", "Virology"],ans:1,category:"Science"},
  {q:"Which element is essential for thyroid function?",opts:["Iron", "Calcium", "Iodine", "Zinc"],ans:2,category:"Science"},
  {q:"What does a Geiger counter measure?",opts:["Sound", "Radiation", "Wind speed", "Humidity"],ans:1,category:"Science"},
  {q:"Which famous scientist won Nobel Prizes in both Physics and Chemistry?",opts:["Einstein", "Marie Curie", "Bohr", "Rutherford"],ans:1,category:"Science"},
  {q:"What is the main component of natural gas?",opts:["Propane", "Butane", "Methane", "Ethanol"],ans:2,category:"Science"},
  {q:"How many chambers does the human heart have?",opts:["2", "3", "4", "5"],ans:2,category:"Science"},
  {q:"Which type of rock is formed from cooled lava?",opts:["Sedimentary", "Metamorphic", "Igneous", "Composite"],ans:2,category:"Science"},
  {q:"What is the unit of electrical resistance?",opts:["Volt", "Ampere", "Ohm", "Watt"],ans:2,category:"Science"},
  {q:"Which acid is found in the human stomach?",opts:["Sulfuric acid", "Hydrochloric acid", "Nitric acid", "Citric acid"],ans:1,category:"Science"},
  {q:"What is the name for animals without a backbone?",opts:["Vertebrates", "Invertebrates", "Amphibians", "Mollusks only"],ans:1,category:"Science"},
  {q:"Which scientist first proposed that the Earth orbits the Sun?",opts:["Galileo", "Copernicus", "Kepler", "Ptolemy"],ans:1,category:"Science"},
  {q:"What is the powerhouse of the cell?",opts:["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],ans:2,category:"Science"},
  {q:"Which gas is responsible for the smell of rotten eggs?",opts:["Methane", "Hydrogen sulfide", "Ammonia", "Chlorine"],ans:1,category:"Science"},
  {q:"What is absolute zero in Celsius (approximately)?",opts:["-100°C", "-173°C", "-273°C", "-373°C"],ans:2,category:"Science"},
  {q:"Which famous equation relates energy and mass?",opts:["F=ma", "E=mc²", "PV=nRT", "a²+b²=c²"],ans:1,category:"Science"},
  {q:"Which planet is known as the Red Planet?",opts:["Venus", "Jupiter", "Mars", "Saturn"],ans:2,category:"Space"},
  {q:"Which planet has the most confirmed moons (as of 2025)?",opts:["Jupiter", "Saturn", "Uranus", "Neptune"],ans:1,category:"Space"},
  {q:"What is the closest star to Earth?",opts:["Proxima Centauri", "Sirius", "The Sun", "Alpha Centauri A"],ans:2,category:"Space"},
  {q:"Which planet is the largest in our solar system?",opts:["Saturn", "Neptune", "Jupiter", "Uranus"],ans:2,category:"Space"},
  {q:"How long does light from the Sun take to reach Earth (approximately)?",opts:["8 seconds", "8 minutes", "8 hours", "8 days"],ans:1,category:"Space"},
  {q:"What is the name of our galaxy?",opts:["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],ans:1,category:"Space"},
  {q:"Which was the first artificial satellite launched into space?",opts:["Explorer 1", "Sputnik 1", "Vostok 1", "Telstar"],ans:1,category:"Space"},
  {q:"Who was the first human in space?",opts:["Neil Armstrong", "Alan Shepard", "Yuri Gagarin", "John Glenn"],ans:2,category:"Space"},
  {q:"Which planet is famous for its prominent ring system?",opts:["Jupiter", "Uranus", "Saturn", "Neptune"],ans:2,category:"Space"},
  {q:"What is a light-year a measure of?",opts:["Time", "Speed", "Distance", "Brightness"],ans:2,category:"Space"},
  {q:"Which planet is closest to the Sun?",opts:["Venus", "Mercury", "Mars", "Earth"],ans:1,category:"Space"},
  {q:"What is the name of NASA\'s telescope launched in 2021 to observe deep space?",opts:["Hubble", "Kepler", "James Webb", "Spitzer"],ans:2,category:"Space"},
  {q:"Which dwarf planet was reclassified from planet status in 2006?",opts:["Ceres", "Eris", "Pluto", "Makemake"],ans:2,category:"Space"},
  {q:"What is the hottest planet in our solar system?",opts:["Mercury", "Venus", "Mars", "Jupiter"],ans:1,category:"Space"},
  {q:"Which space agency landed the Perseverance rover on Mars in 2021?",opts:["ESA", "Roscosmos", "NASA", "ISRO"],ans:2,category:"Space"},
  {q:"The Moon takes approximately how many days to orbit Earth?",opts:["7", "14", "27", "45"],ans:2,category:"Space"},
  {q:"What is the Great Red Spot on Jupiter?",opts:["A volcano", "A giant storm", "An ocean", "A crater"],ans:1,category:"Space"},
  {q:"Which mission first landed humans on the Moon?",opts:["Apollo 8", "Apollo 11", "Apollo 13", "Gemini 4"],ans:1,category:"Space"},
  {q:"What is the term for a star that suddenly explodes?",opts:["Black hole", "Supernova", "Pulsar", "Quasar"],ans:1,category:"Space"},
  {q:"Which planet rotates on its side?",opts:["Neptune", "Saturn", "Uranus", "Mars"],ans:2,category:"Space"},
  {q:"In 2023, India\'s Chandrayaan-3 landed near which part of the Moon?",opts:["Equator", "North pole", "South pole", "Far side centre"],ans:2,category:"Space"},
  {q:"What is the boundary around a black hole called?",opts:["Photon ring", "Event horizon", "Singularity edge", "Dark zone"],ans:1,category:"Space"},
  {q:"Which company developed the reusable Falcon 9 rocket?",opts:["Blue Origin", "Boeing", "SpaceX", "Virgin Galactic"],ans:2,category:"Space"},
  {q:"How many planets are in our solar system?",opts:["7", "8", "9", "10"],ans:1,category:"Space"},
  {q:"Which planet has a day longer than its year?",opts:["Mercury", "Venus", "Mars", "Neptune"],ans:1,category:"Space"},
  {q:"What are Saturn\'s rings mostly made of?",opts:["Rock and dust", "Ice particles", "Gas", "Metal fragments"],ans:1,category:"Space"},
  {q:"What is the name of the first space station to host long-term international crews continuously since 2000?",opts:["Mir", "Skylab", "ISS", "Tiangong"],ans:2,category:"Space"},
  {q:"Which constellation contains the North Star (Polaris)?",opts:["Orion", "Ursa Minor", "Cassiopeia", "Draco"],ans:1,category:"Space"},
  {q:"Halley\'s Comet appears approximately every how many years?",opts:["25", "50", "76", "100"],ans:2,category:"Space"},
  {q:"Which planet is known as Earth\'s twin due to similar size?",opts:["Mars", "Venus", "Mercury", "Neptune"],ans:1,category:"Space"},
  {q:"What is the largest animal ever known to have lived?",opts:["African elephant", "Blue whale", "Megalodon", "Argentinosaurus"],ans:1,category:"Nature"},
  {q:"Which bird is the fastest in a dive?",opts:["Golden eagle", "Peregrine falcon", "Swift", "Albatross"],ans:1,category:"Nature"},
  {q:"How many legs does a spider have?",opts:["6", "8", "10", "12"],ans:1,category:"Nature"},
  {q:"Which is the tallest land animal?",opts:["Elephant", "Giraffe", "Ostrich", "Camel"],ans:1,category:"Nature"},
  {q:"What do bees collect from flowers to make honey?",opts:["Pollen only", "Nectar", "Sap", "Dew"],ans:1,category:"Nature"},
  {q:"Which is the largest land carnivore?",opts:["Lion", "Tiger", "Polar bear", "Grizzly bear"],ans:2,category:"Nature"},
  {q:"What is a group of lions called?",opts:["Pack", "Herd", "Pride", "Colony"],ans:2,category:"Nature"},
  {q:"Which animal is known as the King of the Jungle?",opts:["Tiger", "Lion", "Elephant", "Gorilla"],ans:1,category:"Nature"},
  {q:"How many hearts does an octopus have?",opts:["1", "2", "3", "4"],ans:2,category:"Nature"},
  {q:"Which mammal is capable of true sustained flight?",opts:["Flying squirrel", "Bat", "Sugar glider", "Colugo"],ans:1,category:"Nature"},
  {q:"What is the fastest land animal?",opts:["Lion", "Cheetah", "Pronghorn", "Greyhound"],ans:1,category:"Nature"},
  {q:"Which tree produces acorns?",opts:["Maple", "Birch", "Oak", "Pine"],ans:2,category:"Nature"},
  {q:"Which animal has the longest lifespan among these?",opts:["Elephant", "Giant tortoise", "Parrot", "Whale shark"],ans:1,category:"Nature"},
  {q:"What is the process by which caterpillars become butterflies?",opts:["Evolution", "Metamorphosis", "Mutation", "Migration"],ans:1,category:"Nature"},
  {q:"Which big cat cannot roar?",opts:["Lion", "Tiger", "Cheetah", "Jaguar"],ans:2,category:"Nature"},
  {q:"What is the largest species of shark?",opts:["Great white", "Hammerhead", "Whale shark", "Tiger shark"],ans:2,category:"Nature"},
  {q:"Which bird lays the largest eggs?",opts:["Emu", "Eagle", "Ostrich", "Albatross"],ans:2,category:"Nature"},
  {q:"Penguins are mostly found in which hemisphere?",opts:["Northern", "Southern", "Both equally", "Equatorial"],ans:1,category:"Nature"},
  {q:"What is a baby kangaroo called?",opts:["Cub", "Joey", "Kit", "Calf"],ans:1,category:"Nature"},
  {q:"Which animal is the closest living relative to humans?",opts:["Gorilla", "Orangutan", "Chimpanzee", "Baboon"],ans:2,category:"Nature"},
  {q:"Which insect is the primary pollinator of crops worldwide?",opts:["Butterfly", "Bee", "Beetle", "Moth"],ans:1,category:"Nature"},
  {q:"What is the only mammal that lays eggs besides the echidna?",opts:["Opossum", "Platypus", "Sloth", "Armadillo"],ans:1,category:"Nature"},
  {q:"Which animal can regrow lost limbs?",opts:["Frog", "Axolotl", "Snake", "Turtle"],ans:1,category:"Nature"},
  {q:"Which is the largest living bird by weight?",opts:["Condor", "Ostrich", "Emu", "Albatross"],ans:1,category:"Nature"},
  {q:"Sequoia trees, among the largest in the world, are native to which US state?",opts:["Oregon", "Washington", "California", "Colorado"],ans:2,category:"Nature"},
  {q:"Which animal sleeps standing up most of the time?",opts:["Cow", "Horse", "Pig", "Sheep"],ans:1,category:"Nature"},
  {q:"What is the main diet of giant pandas?",opts:["Fish", "Insects", "Bamboo", "Fruit"],ans:2,category:"Nature"},
  {q:"Which ocean creature has blue blood?",opts:["Shark", "Octopus", "Dolphin", "Sea turtle"],ans:1,category:"Nature"},
  {q:"How many stomach compartments does a cow have?",opts:["1", "2", "3", "4"],ans:3,category:"Nature"},
  {q:"Which animal is known for building dams?",opts:["Otter", "Beaver", "Muskrat", "Platypus"],ans:1,category:"Nature"},
  {q:"Which snake is the longest in the world?",opts:["King cobra", "Anaconda", "Reticulated python", "Boa constrictor"],ans:2,category:"Nature"},
  {q:"Coral reefs are built by which type of organism?",opts:["Plants", "Tiny animals (polyps)", "Algae alone", "Bacteria"],ans:1,category:"Nature"},
  {q:"Which animal\'s fingerprints are nearly identical to humans\'?",opts:["Chimpanzee", "Koala", "Gorilla", "Orangutan"],ans:1,category:"Nature"},
  {q:"What do you call animals active at night?",opts:["Diurnal", "Nocturnal", "Crepuscular", "Seasonal"],ans:1,category:"Nature"},
  {q:"Which bird can fly backwards?",opts:["Swift", "Hummingbird", "Kingfisher", "Swallow"],ans:1,category:"Nature"},
  {q:"Which is the world\'s largest rainforest?",opts:["Congo", "Amazon", "Daintree", "Borneo"],ans:1,category:"Nature"},
  {q:"Elephants are afraid of which animal, according to popular belief tested by scientists?",opts:["Mice", "Bees", "Snakes", "Dogs"],ans:1,category:"Nature"},
  {q:"What is the largest reptile in the world?",opts:["Komodo dragon", "Saltwater crocodile", "Green anaconda", "Leatherback turtle"],ans:1,category:"Nature"},
  {q:"Which fish is known for swimming upstream to spawn?",opts:["Tuna", "Salmon", "Cod", "Mackerel"],ans:1,category:"Nature"},
  {q:"A group of crows is called a what?",opts:["Flock", "Murder", "Gaggle", "Parliament"],ans:1,category:"Nature"},
  {q:"Who wrote \'Romeo and Juliet\'?",opts:["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],ans:1,category:"Literature"},
  {q:"Who wrote \'Pride and Prejudice\'?",opts:["Emily Bronte", "Jane Austen", "Charlotte Bronte", "George Eliot"],ans:1,category:"Literature"},
  {q:"Which novel begins with \'Call me Ishmael\'?",opts:["The Old Man and the Sea", "Moby-Dick", "Treasure Island", "Robinson Crusoe"],ans:1,category:"Literature"},
  {q:"Who created the detective Sherlock Holmes?",opts:["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "Raymond Chandler"],ans:1,category:"Literature"},
  {q:"Who wrote \'1984\'?",opts:["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],ans:1,category:"Literature"},
  {q:"Which author wrote the Harry Potter series?",opts:["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "Roald Dahl"],ans:2,category:"Literature"},
  {q:"Who wrote \'The Great Gatsby\'?",opts:["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],ans:1,category:"Literature"},
  {q:"\'Don Quixote\' was written by which Spanish author?",opts:["Lorca", "Cervantes", "Marquez", "Borges"],ans:1,category:"Literature"},
  {q:"Who wrote \'To Kill a Mockingbird\'?",opts:["Harper Lee", "Toni Morrison", "Maya Angelou", "Flannery O'Connor"],ans:0,category:"Literature"},
  {q:"Which epic poems are attributed to Homer?",opts:["Aeneid and Metamorphoses", "Iliad and Odyssey", "Beowulf and Paradise Lost", "Inferno and Purgatorio"],ans:1,category:"Literature"},
  {q:"Who wrote \'War and Peace\'?",opts:["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"],ans:1,category:"Literature"},
  {q:"The character Atticus Finch appears in which novel?",opts:["The Grapes of Wrath", "To Kill a Mockingbird", "East of Eden", "A Time to Kill"],ans:1,category:"Literature"},
  {q:"Who wrote \'One Hundred Years of Solitude\'?",opts:["Pablo Neruda", "Gabriel Garcia Marquez", "Mario Vargas Llosa", "Jorge Luis Borges"],ans:1,category:"Literature"},
  {q:"Which Shakespeare play features the characters Rosencrantz and Guildenstern?",opts:["Macbeth", "Othello", "Hamlet", "King Lear"],ans:2,category:"Literature"},
  {q:"Who wrote \'The Lord of the Rings\'?",opts:["C.S. Lewis", "J.R.R. Tolkien", "George R.R. Martin", "Terry Pratchett"],ans:1,category:"Literature"},
  {q:"\'Crime and Punishment\' was written by whom?",opts:["Tolstoy", "Dostoevsky", "Gogol", "Pushkin"],ans:1,category:"Literature"},
  {q:"Which dystopian novel features \'Big Brother\'?",opts:["Brave New World", "Fahrenheit 451", "1984", "Animal Farm"],ans:2,category:"Literature"},
  {q:"Who wrote \'The Adventures of Huckleberry Finn\'?",opts:["Mark Twain", "Jack London", "Herman Melville", "Nathaniel Hawthorne"],ans:0,category:"Literature"},
  {q:"Which author created Middle-earth?",opts:["C.S. Lewis", "J.R.R. Tolkien", "Ursula K. Le Guin", "Frank Herbert"],ans:1,category:"Literature"},
  {q:"\'The Old Man and the Sea\' was written by whom?",opts:["John Steinbeck", "Ernest Hemingway", "William Faulkner", "Norman Mailer"],ans:1,category:"Literature"},
  {q:"Which novel features the character Jay Gatsby?",opts:["This Side of Paradise", "The Great Gatsby", "Tender Is the Night", "The Beautiful and Damned"],ans:1,category:"Literature"},
  {q:"Who wrote the play \'A Midsummer Night\'s Dream\'?",opts:["Marlowe", "Shakespeare", "Jonson", "Webster"],ans:1,category:"Literature"},
  {q:"\'Things Fall Apart\' was written by which Nigerian author?",opts:["Wole Soyinka", "Chinua Achebe", "Chimamanda Adichie", "Ben Okri"],ans:1,category:"Literature"},
  {q:"Which children\'s author wrote \'Charlie and the Chocolate Factory\'?",opts:["Enid Blyton", "Roald Dahl", "Dr. Seuss", "Lewis Carroll"],ans:1,category:"Literature"},
  {q:"Who wrote \'Frankenstein\'?",opts:["Bram Stoker", "Mary Shelley", "Edgar Allan Poe", "Robert Louis Stevenson"],ans:1,category:"Literature"},
  {q:"\'The Divine Comedy\' was written by which Italian poet?",opts:["Petrarch", "Dante Alighieri", "Boccaccio", "Virgil"],ans:1,category:"Literature"},
  {q:"Which novel by George Orwell features farm animals overthrowing humans?",opts:["1984", "Animal Farm", "Burmese Days", "Coming Up for Air"],ans:1,category:"Literature"},
  {q:"Who wrote \'Wuthering Heights\'?",opts:["Charlotte Bronte", "Emily Bronte", "Anne Bronte", "Jane Austen"],ans:1,category:"Literature"},
  {q:"Sherlock Holmes lived at which famous address?",opts:["10 Downing Street", "221B Baker Street", "42 Wallaby Way", "4 Privet Drive"],ans:1,category:"Literature"},
  {q:"Who wrote \'The Catcher in the Rye\'?",opts:["Jack Kerouac", "J.D. Salinger", "Kurt Vonnegut", "Saul Bellow"],ans:1,category:"Literature"},
  {q:"\'Dracula\' was written by which author?",opts:["Mary Shelley", "Bram Stoker", "H.P. Lovecraft", "Oscar Wilde"],ans:1,category:"Literature"},
  {q:"Which Greek philosopher wrote \'The Republic\'?",opts:["Aristotle", "Plato", "Socrates", "Epicurus"],ans:1,category:"Literature"},
  {q:"Who wrote \'The Picture of Dorian Gray\'?",opts:["Oscar Wilde", "Henry James", "Thomas Hardy", "E.M. Forster"],ans:0,category:"Literature"},
  {q:"The \'Game of Thrones\' TV series is based on books by which author?",opts:["J.R.R. Tolkien", "George R.R. Martin", "Brandon Sanderson", "Robert Jordan"],ans:1,category:"Literature"},
  {q:"Who wrote the poem \'The Raven\'?",opts:["Walt Whitman", "Edgar Allan Poe", "Robert Frost", "Emily Dickinson"],ans:1,category:"Literature"},
  {q:"Who painted the Mona Lisa?",opts:["Michelangelo", "Leonardo da Vinci", "Raphael", "Botticelli"],ans:1,category:"Art & Culture"},
  {q:"Who painted \'The Starry Night\'?",opts:["Claude Monet", "Vincent van Gogh", "Paul Cezanne", "Salvador Dali"],ans:1,category:"Art & Culture"},
  {q:"Which artist co-founded the Cubist movement?",opts:["Henri Matisse", "Pablo Picasso", "Marc Chagall", "Joan Miro"],ans:1,category:"Art & Culture"},
  {q:"The Louvre museum is located in which city?",opts:["London", "Rome", "Paris", "Madrid"],ans:2,category:"Art & Culture"},
  {q:"Who sculpted \'David\'?",opts:["Donatello", "Bernini", "Michelangelo", "Rodin"],ans:2,category:"Art & Culture"},
  {q:"Which Spanish artist is famous for melting clocks in his paintings?",opts:["Picasso", "Dali", "Goya", "Miro"],ans:1,category:"Art & Culture"},
  {q:"\'The Scream\' was painted by which artist?",opts:["Gustav Klimt", "Edvard Munch", "Egon Schiele", "Wassily Kandinsky"],ans:1,category:"Art & Culture"},
  {q:"Which museum houses the Mona Lisa?",opts:["Uffizi", "The Louvre", "The Prado", "The Met"],ans:1,category:"Art & Culture"},
  {q:"Who painted the \'Water Lilies\' series?",opts:["Renoir", "Monet", "Manet", "Degas"],ans:1,category:"Art & Culture"},
  {q:"Which art movement is Andy Warhol associated with?",opts:["Surrealism", "Pop Art", "Impressionism", "Cubism"],ans:1,category:"Art & Culture"},
  {q:"The famous statue \'The Thinker\' was created by whom?",opts:["Michelangelo", "Auguste Rodin", "Henry Moore", "Constantin Brancusi"],ans:1,category:"Art & Culture"},
  {q:"Which Dutch artist painted \'Girl with a Pearl Earring\'?",opts:["Rembrandt", "Vermeer", "Van Gogh", "Frans Hals"],ans:1,category:"Art & Culture"},
  {q:"In which city is the Sistine Chapel located?",opts:["Florence", "Venice", "Vatican City", "Milan"],ans:2,category:"Art & Culture"},
  {q:"Which artist cut off part of his own ear?",opts:["Gauguin", "Van Gogh", "Toulouse-Lautrec", "Cezanne"],ans:1,category:"Art & Culture"},
  {q:"\'Guernica\' is a famous anti-war painting by whom?",opts:["Dali", "Picasso", "Miro", "Goya"],ans:1,category:"Art & Culture"},
  {q:"Origami is the traditional art of paper folding from which country?",opts:["China", "Korea", "Japan", "Vietnam"],ans:2,category:"Art & Culture"},
  {q:"Which festival is known as the Festival of Lights in India?",opts:["Holi", "Diwali", "Navratri", "Eid"],ans:1,category:"Art & Culture"},
  {q:"Which country is famous for flamenco dancing?",opts:["Portugal", "Italy", "Spain", "Mexico"],ans:2,category:"Art & Culture"},
  {q:"The ancient theatre tradition of Kabuki comes from which country?",opts:["China", "Japan", "Thailand", "Indonesia"],ans:1,category:"Art & Culture"},
  {q:"What is the national flower of Japan?",opts:["Rose", "Lotus", "Cherry blossom", "Chrysanthemum only"],ans:2,category:"Art & Culture"},
  {q:"Which carnival city is famous for its annual samba parade?",opts:["Venice", "Rio de Janeiro", "New Orleans", "Barcelona"],ans:1,category:"Art & Culture"},
  {q:"Which painting style uses small dots of colour?",opts:["Cubism", "Pointillism", "Fauvism", "Baroque"],ans:1,category:"Art & Culture"},
  {q:"The Taj Mahal was built as a monument to whom?",opts:["A king", "An emperor's wife", "A goddess", "A war hero"],ans:1,category:"Art & Culture"},
  {q:"Which artist painted the ceiling of the Sistine Chapel?",opts:["Raphael", "Leonardo", "Michelangelo", "Titian"],ans:2,category:"Art & Culture"},
  {q:"Manga comics originated in which country?",opts:["South Korea", "China", "Japan", "Taiwan"],ans:2,category:"Art & Culture"},
  {q:"Which city hosts the famous La Tomatina tomato-throwing festival?",opts:["Lisbon", "Bunol, Spain", "Naples", "Marseille"],ans:1,category:"Art & Culture"},
  {q:"What are the traditional Japanese poems of 17 syllables called?",opts:["Tanka", "Haiku", "Senryu", "Renga"],ans:1,category:"Art & Culture"},
  {q:"Which famous opera house is located in Sydney?",opts:["Royal Opera House", "Sydney Opera House", "La Scala", "Met Opera"],ans:1,category:"Art & Culture"},
  {q:"Day of the Dead is a famous holiday in which country?",opts:["Spain", "Brazil", "Mexico", "Peru"],ans:2,category:"Art & Culture"},
  {q:"Which artist is famous for Campbell\'s Soup Cans?",opts:["Roy Lichtenstein", "Andy Warhol", "Jackson Pollock", "Keith Haring"],ans:1,category:"Art & Culture"},
  {q:"Ballet originated in which country during the Renaissance?",opts:["France", "Russia", "Italy", "Austria"],ans:2,category:"Art & Culture"},
  {q:"The Hermitage Museum is located in which city?",opts:["Moscow", "St Petersburg", "Kyiv", "Warsaw"],ans:1,category:"Art & Culture"},
  {q:"Which style of painting did Claude Monet pioneer?",opts:["Expressionism", "Impressionism", "Realism", "Romanticism"],ans:1,category:"Art & Culture"},
  {q:"What is the traditional Japanese tea ceremony called?",opts:["Ikebana", "Chanoyu", "Origami", "Bonsai"],ans:1,category:"Art & Culture"},
  {q:"Which famous street artist\'s identity remains anonymous?",opts:["Shepard Fairey", "Banksy", "Invader", "Kaws"],ans:1,category:"Art & Culture"},
  {q:"Which composer wrote the \'Fifth Symphony\' with its famous four-note opening?",opts:["Mozart", "Beethoven", "Bach", "Brahms"],ans:1,category:"Music"},
  {q:"Which band recorded the album \'Abbey Road\'?",opts:["The Rolling Stones", "The Beatles", "The Who", "Pink Floyd"],ans:1,category:"Music"},
  {q:"Who is known as the King of Pop?",opts:["Elvis Presley", "Michael Jackson", "Prince", "Stevie Wonder"],ans:1,category:"Music"},
  {q:"How many strings does a standard guitar have?",opts:["4", "5", "6", "7"],ans:2,category:"Music"},
  {q:"Which composer became deaf later in life but kept composing?",opts:["Mozart", "Beethoven", "Chopin", "Haydn"],ans:1,category:"Music"},
  {q:"Which instrument has 88 keys?",opts:["Organ", "Piano", "Harpsichord", "Accordion"],ans:1,category:"Music"},
  {q:"Who sang \'Bohemian Rhapsody\'?",opts:["Led Zeppelin", "Queen", "The Eagles", "Aerosmith"],ans:1,category:"Music"},
  {q:"Which composer wrote \'The Four Seasons\'?",opts:["Bach", "Vivaldi", "Handel", "Corelli"],ans:1,category:"Music"},
  {q:"Reggae music originated in which country?",opts:["Cuba", "Jamaica", "Trinidad", "Barbados"],ans:1,category:"Music"},
  {q:"Who was the lead singer of Nirvana?",opts:["Eddie Vedder", "Kurt Cobain", "Chris Cornell", "Layne Staley"],ans:1,category:"Music"},
  {q:"Which female artist released the album \'1989\'?",opts:["Beyonce", "Adele", "Taylor Swift", "Lady Gaga"],ans:2,category:"Music"},
  {q:"Mozart was born in which country?",opts:["Germany", "Austria", "Switzerland", "Hungary"],ans:1,category:"Music"},
  {q:"Which instrument does a violinist use to play the strings?",opts:["Pick", "Bow", "Hammer", "Reed"],ans:1,category:"Music"},
  {q:"K-pop originates from which country?",opts:["Japan", "China", "South Korea", "Thailand"],ans:2,category:"Music"},
  {q:"Who composed \'Fur Elise\'?",opts:["Mozart", "Beethoven", "Schubert", "Liszt"],ans:1,category:"Music"},
  {q:"Which genre did Bob Marley popularize worldwide?",opts:["Ska", "Reggae", "Calypso", "Soca"],ans:1,category:"Music"},
  {q:"Elvis Presley\'s home, Graceland, is in which US city?",opts:["Nashville", "Memphis", "New Orleans", "Atlanta"],ans:1,category:"Music"},
  {q:"Which singer is known as the Queen of Soul?",opts:["Whitney Houston", "Aretha Franklin", "Diana Ross", "Tina Turner"],ans:1,category:"Music"},
  {q:"The didgeridoo is a traditional instrument from which country?",opts:["New Zealand", "Australia", "Papua New Guinea", "Fiji"],ans:1,category:"Music"},
  {q:"Which band wrote the rock opera \'The Wall\'?",opts:["The Who", "Pink Floyd", "Genesis", "Yes"],ans:1,category:"Music"},
  {q:"How many musicians are in a quartet?",opts:["2", "3", "4", "5"],ans:2,category:"Music"},
  {q:"Which artist recorded \'Thriller\', the best-selling album of all time?",opts:["Prince", "Michael Jackson", "Madonna", "Whitney Houston"],ans:1,category:"Music"},
  {q:"Beyonce rose to fame as part of which group?",opts:["TLC", "Destiny's Child", "En Vogue", "SWV"],ans:1,category:"Music"},
  {q:"Which classical composer wrote over 600 works before dying at 35?",opts:["Beethoven", "Mozart", "Schubert", "Mendelssohn"],ans:1,category:"Music"},
  {q:"The tango dance and music originated in which country?",opts:["Brazil", "Argentina", "Spain", "Cuba"],ans:1,category:"Music"},
  {q:"How many players are on a soccer team on the field?",opts:["9", "10", "11", "12"],ans:2,category:"Sport"},
  {q:"Which country has won the most FIFA World Cups?",opts:["Germany", "Argentina", "Brazil", "Italy"],ans:2,category:"Sport"},
  {q:"In which sport would you perform a slam dunk?",opts:["Volleyball", "Basketball", "Tennis", "Handball"],ans:1,category:"Sport"},
  {q:"How often are the Summer Olympic Games held?",opts:["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],ans:2,category:"Sport"},
  {q:"Which country hosted the 2024 Summer Olympics?",opts:["Japan", "USA", "France", "Australia"],ans:2,category:"Sport"},
  {q:"Argentina won the FIFA World Cup in 2022; who was their captain?",opts:["Di Maria", "Messi", "Martinez", "Aguero"],ans:1,category:"Sport"},
  {q:"In tennis, what is a score of zero called?",opts:["Nil", "Love", "Duck", "Blank"],ans:1,category:"Sport"},
  {q:"Which sport uses a shuttlecock?",opts:["Tennis", "Squash", "Badminton", "Racquetball"],ans:2,category:"Sport"},
  {q:"How many rings are on the Olympic flag?",opts:["4", "5", "6", "7"],ans:1,category:"Sport"},
  {q:"Which boxer was known as \'The Greatest\'?",opts:["Mike Tyson", "Muhammad Ali", "Joe Frazier", "George Foreman"],ans:1,category:"Sport"},
  {q:"In cricket, how many runs is a boundary hit along the ground worth?",opts:["2", "4", "6", "8"],ans:1,category:"Sport"},
  {q:"Which country invented table tennis as an after-dinner game?",opts:["China", "Japan", "England", "USA"],ans:2,category:"Sport"},
  {q:"Usain Bolt set world records in which athletic events?",opts:["Long jump", "100m and 200m sprints", "Marathon", "110m hurdles"],ans:1,category:"Sport"},
  {q:"The Tour de France is a famous race in which sport?",opts:["Running", "Motor racing", "Cycling", "Rowing"],ans:2,category:"Sport"},
  {q:"Which Grand Slam tennis tournament is played on grass?",opts:["US Open", "French Open", "Wimbledon", "Australian Open"],ans:2,category:"Sport"},
  {q:"How many points is a touchdown worth in American football?",opts:["3", "6", "7", "10"],ans:1,category:"Sport"},
  {q:"Which country won the Cricket World Cup in 2023?",opts:["India", "England", "Australia", "New Zealand"],ans:2,category:"Sport"},
  {q:"Michael Jordan is a legend of which sport?",opts:["Baseball", "Basketball", "American football", "Golf"],ans:1,category:"Sport"},
  {q:"In golf, what is one stroke under par called?",opts:["Eagle", "Bogey", "Birdie", "Albatross"],ans:2,category:"Sport"},
  {q:"Which nation traditionally performs the haka before rugby matches?",opts:["Australia", "Fiji", "New Zealand", "Samoa"],ans:2,category:"Sport"},
  {q:"Spain won the UEFA Euro tournament in which recent year?",opts:["2016", "2021", "2024", "2012 only"],ans:2,category:"Sport"},
  {q:"How long is a marathon (approximately)?",opts:["26.2 miles", "20 miles", "30 miles", "13.1 miles"],ans:0,category:"Sport"},
  {q:"Which sport is known as \'the beautiful game\'?",opts:["Cricket", "Football (soccer)", "Tennis", "Rugby"],ans:1,category:"Sport"},
  {q:"Serena Williams won how many Grand Slam singles titles?",opts:["18", "20", "23", "25"],ans:2,category:"Sport"},
  {q:"Formula 1 driver Max Verstappen races for which team (as of 2024)?",opts:["Ferrari", "Mercedes", "Red Bull", "McLaren"],ans:2,category:"Sport"},
  {q:"Which country won the first FIFA World Cup in 1930?",opts:["Brazil", "Italy", "Uruguay", "Argentina"],ans:2,category:"Sport"},
  {q:"In which sport do you use a puck?",opts:["Field hockey", "Ice hockey", "Lacrosse", "Hurling"],ans:1,category:"Sport"},
  {q:"The Ashes is a famous cricket rivalry between England and which country?",opts:["India", "South Africa", "Australia", "West Indies"],ans:2,category:"Sport"},
  {q:"Which swimmer has won the most Olympic gold medals?",opts:["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Caeleb Dressel"],ans:1,category:"Sport"},
  {q:"How many players are on a basketball team on court?",opts:["4", "5", "6", "7"],ans:1,category:"Sport"},
  {q:"Which city will host the 2028 Summer Olympics?",opts:["Paris", "Brisbane", "Los Angeles", "Tokyo"],ans:2,category:"Sport"},
  {q:"Pele, one of football\'s greatest players, was from which country?",opts:["Argentina", "Portugal", "Brazil", "Spain"],ans:2,category:"Sport"},
  {q:"In darts, what is the highest score with a single dart?",opts:["50", "60", "100", "180"],ans:1,category:"Sport"},
  {q:"Which sport features the terms \'strike\' and \'spare\'?",opts:["Baseball", "Bowling", "Cricket", "Softball"],ans:1,category:"Sport"},
  {q:"India won the T20 Cricket World Cup in which year most recently?",opts:["2021", "2022", "2024", "2016"],ans:2,category:"Sport"},
  {q:"Which tennis player has won the most men\'s Grand Slam singles titles (as of 2024)?",opts:["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],ans:2,category:"Sport"},
  {q:"What colour jersey does the Tour de France leader wear?",opts:["Green", "Yellow", "White", "Polka dot"],ans:1,category:"Sport"},
  {q:"Which country dominates international rugby\'s World Cup with the most titles?",opts:["England", "Australia", "South Africa", "France"],ans:2,category:"Sport"},
  {q:"Baseball\'s World Series is primarily contested in which country?",opts:["Japan", "Cuba", "USA", "Mexico"],ans:2,category:"Sport"},
  {q:"Which female gymnast won multiple golds at Paris 2024 after returning to the sport?",opts:["Gabby Douglas", "Simone Biles", "Suni Lee", "Aly Raisman"],ans:1,category:"Sport"},
  {q:"Who co-founded Apple alongside Steve Wozniak?",opts:["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page"],ans:1,category:"Technology"},
  {q:"What does \'WWW\' stand for?",opts:["World Wide Web", "Web World Wide", "Wide World Web", "World Web Wave"],ans:0,category:"Technology"},
  {q:"Who is considered the father of the World Wide Web?",opts:["Bill Gates", "Tim Berners-Lee", "Vint Cerf", "Steve Jobs"],ans:1,category:"Technology"},
  {q:"Which company developed the Android operating system?",opts:["Apple", "Microsoft", "Google", "Samsung"],ans:2,category:"Technology"},
  {q:"What does \'CPU\' stand for?",opts:["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],ans:0,category:"Technology"},
  {q:"Which company created the iPhone?",opts:["Samsung", "Nokia", "Apple", "Motorola"],ans:2,category:"Technology"},
  {q:"What does \'AI\' stand for in technology?",opts:["Automated Internet", "Artificial Intelligence", "Advanced Integration", "Applied Informatics"],ans:1,category:"Technology"},
  {q:"Which company created ChatGPT?",opts:["Google", "Meta", "OpenAI", "Microsoft"],ans:2,category:"Technology"},
  {q:"Who founded Microsoft with Paul Allen?",opts:["Steve Jobs", "Bill Gates", "Jeff Bezos", "Michael Dell"],ans:1,category:"Technology"},
  {q:"What does \'USB\' stand for?",opts:["Universal Serial Bus", "United System Board", "Universal System Backup", "Unified Serial Base"],ans:0,category:"Technology"},
  {q:"Which social media platform is famous for 280-character posts?",opts:["Facebook", "Instagram", "X (Twitter)", "LinkedIn"],ans:2,category:"Technology"},
  {q:"Elon Musk is the CEO of which electric car company?",opts:["Rivian", "Lucid", "Tesla", "Polestar"],ans:2,category:"Technology"},
  {q:"What was the first widely-used web browser called?",opts:["Internet Explorer", "Mosaic", "Netscape", "Chrome"],ans:1,category:"Technology"},
  {q:"Which company owns Instagram and WhatsApp?",opts:["Google", "Meta", "Apple", "Amazon"],ans:1,category:"Technology"},
  {q:"What does \'HTML\' stand for?",opts:["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Mark Language", "Home Tool Markup Language"],ans:0,category:"Technology"},
  {q:"Who founded Amazon?",opts:["Elon Musk", "Jeff Bezos", "Jack Ma", "Larry Ellison"],ans:1,category:"Technology"},
  {q:"Which programming language is named after a snake?",opts:["Java", "Ruby", "Python", "Perl"],ans:2,category:"Technology"},
  {q:"Bluetooth technology is named after a king from which region?",opts:["Germany", "Scandinavia", "Britain", "Russia"],ans:1,category:"Technology"},
  {q:"What does \'GPS\' stand for?",opts:["Global Positioning System", "General Position Service", "Global Path Signal", "Geographic Position Satellite"],ans:0,category:"Technology"},
  {q:"Which company developed the Windows operating system?",opts:["Apple", "IBM", "Microsoft", "Intel"],ans:2,category:"Technology"},
  {q:"In what decade was the first email sent?",opts:["1960s", "1970s", "1980s", "1990s"],ans:1,category:"Technology"},
  {q:"Which video platform is owned by Google?",opts:["Vimeo", "TikTok", "YouTube", "Twitch"],ans:2,category:"Technology"},
  {q:"What is the name of Apple\'s voice assistant?",opts:["Alexa", "Cortana", "Siri", "Bixby"],ans:2,category:"Technology"},
  {q:"Cryptocurrency Bitcoin was created by a person/group under which pseudonym?",opts:["Vitalik Buterin", "Satoshi Nakamoto", "Hal Finney", "Nick Szabo"],ans:1,category:"Technology"},
  {q:"Which Chinese AI company released a low-cost model called R1 in January 2025?",opts:["Alibaba", "Baidu", "DeepSeek", "Tencent"],ans:2,category:"Technology"},
  {q:"What does \'VR\' stand for?",opts:["Visual Reality", "Virtual Reality", "Video Rendering", "Variable Resolution"],ans:1,category:"Technology"},
  {q:"The QWERTY layout refers to what device?",opts:["Mouse", "Keyboard", "Monitor", "Printer"],ans:1,category:"Technology"},
  {q:"Which company makes the PlayStation console?",opts:["Microsoft", "Nintendo", "Sony", "Sega"],ans:2,category:"Technology"},
  {q:"Moore\'s Law relates to the growth of what?",opts:["Internet speed", "Transistors on chips", "Battery life", "Screen resolution"],ans:1,category:"Technology"},
  {q:"Which messaging app is known for end-to-end encryption and a green logo?",opts:["Telegram", "WhatsApp", "Signal", "Viber"],ans:1,category:"Technology"},
  {q:"What is the value of pi to two decimal places?",opts:["3.12", "3.14", "3.16", "3.18"],ans:1,category:"Mathematics"},
  {q:"What is the only even prime number?",opts:["0", "1", "2", "4"],ans:2,category:"Mathematics"},
  {q:"How many degrees are in a triangle\'s angles combined?",opts:["90", "180", "270", "360"],ans:1,category:"Mathematics"},
  {q:"What is 12 multiplied by 12?",opts:["124", "134", "144", "154"],ans:2,category:"Mathematics"},
  {q:"What is the square root of 144?",opts:["10", "11", "12", "14"],ans:2,category:"Mathematics"},
  {q:"In Roman numerals, what does \'L\' represent?",opts:["10", "50", "100", "500"],ans:1,category:"Mathematics"},
  {q:"What is the next prime number after 7?",opts:["8", "9", "10", "11"],ans:3,category:"Mathematics"},
  {q:"A polygon with eight sides is called what?",opts:["Hexagon", "Heptagon", "Octagon", "Nonagon"],ans:2,category:"Mathematics"},
  {q:"Which famous theorem relates the sides of a right triangle?",opts:["Euclid's theorem", "Pythagorean theorem", "Fermat's theorem", "Bayes' theorem"],ans:1,category:"Mathematics"},
  {q:"What is 25% of 200?",opts:["25", "40", "50", "75"],ans:2,category:"Mathematics"},
  {q:"The Fibonacci sequence starts 0, 1, 1, 2, 3... what comes next?",opts:["4", "5", "6", "7"],ans:1,category:"Mathematics"},
  {q:"How many sides does a dodecagon have?",opts:["10", "11", "12", "20"],ans:2,category:"Mathematics"},
  {q:"What is the term for a number divisible only by 1 and itself?",opts:["Composite", "Prime", "Perfect", "Rational"],ans:1,category:"Mathematics"},
  {q:"How many degrees in a full circle?",opts:["180", "270", "360", "400"],ans:2,category:"Mathematics"},
  {q:"What is 7 squared?",opts:["14", "21", "49", "77"],ans:2,category:"Mathematics"},
  {q:"Which vitamin is abundant in citrus fruits?",opts:["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],ans:2,category:"Health"},
  {q:"How many hours of sleep are generally recommended for adults?",opts:["4-5", "5-6", "7-9", "10-12"],ans:2,category:"Health"},
  {q:"Which nutrient is the body\'s main source of energy?",opts:["Protein", "Carbohydrates", "Vitamins", "Minerals"],ans:1,category:"Health"},
  {q:"Which mineral is essential for strong bones?",opts:["Iron", "Calcium", "Potassium", "Sodium"],ans:1,category:"Health"},
  {q:"What does \'BMI\' stand for?",opts:["Body Mass Index", "Bone Mineral Indicator", "Basic Metabolic Index", "Body Muscle Indicator"],ans:0,category:"Health"},
  {q:"Which organ filters waste from the blood?",opts:["Liver", "Kidneys", "Lungs", "Spleen"],ans:1,category:"Health"},
  {q:"Anaemia is caused by a deficiency of which mineral most commonly?",opts:["Calcium", "Zinc", "Iron", "Magnesium"],ans:2,category:"Health"},
  {q:"Which exercise type strengthens the heart and lungs?",opts:["Stretching", "Aerobic exercise", "Weightlifting only", "Balance training"],ans:1,category:"Health"},
  {q:"What is the medical term for high blood pressure?",opts:["Hypotension", "Hypertension", "Hyperglycemia", "Tachycardia"],ans:1,category:"Health"},
  {q:"Which vaccine eradicated a major disease worldwide by 1980?",opts:["Polio vaccine", "Smallpox vaccine", "Measles vaccine", "Tuberculosis vaccine"],ans:1,category:"Health"},
  {q:"Which part of the eye controls how much light enters?",opts:["Retina", "Cornea", "Iris", "Lens"],ans:2,category:"Health"},
  {q:"Dehydration is a lack of what in the body?",opts:["Salt", "Sugar", "Water", "Oxygen"],ans:2,category:"Health"},
  {q:"Which fat is considered healthiest?",opts:["Trans fat", "Saturated fat", "Unsaturated fat", "Hydrogenated fat"],ans:2,category:"Health"},
  {q:"How many teeth does a typical adult human have?",opts:["28", "30", "32", "36"],ans:2,category:"Health"},
  {q:"Insulin regulates the level of what in the blood?",opts:["Oxygen", "Sugar (glucose)", "Iron", "Cholesterol"],ans:1,category:"Health"},
  {q:"What does \'GDP\' stand for?",opts:["Gross Domestic Product", "General Domestic Price", "Global Development Plan", "Gross Development Percentage"],ans:0,category:"Economics"},
  {q:"Which currency is used in Japan?",opts:["Won", "Yuan", "Yen", "Ringgit"],ans:2,category:"Economics"},
  {q:"What is the currency of the United Kingdom?",opts:["Euro", "Pound sterling", "Dollar", "Franc"],ans:1,category:"Economics"},
  {q:"Which organization sets interest rates in the USA?",opts:["World Bank", "IMF", "Federal Reserve", "Treasury"],ans:2,category:"Economics"},
  {q:"Inflation refers to a general rise in what?",opts:["Wages", "Prices", "Employment", "Exports"],ans:1,category:"Economics"},
  {q:"Which country uses the euro?",opts:["Switzerland", "Norway", "Germany", "Denmark"],ans:2,category:"Economics"},
  {q:"The \'invisible hand\' concept was introduced by which economist?",opts:["Karl Marx", "Adam Smith", "John Keynes", "Milton Friedman"],ans:1,category:"Economics"},
  {q:"What does \'IMF\' stand for?",opts:["International Monetary Fund", "Industrial Management Federation", "International Market Forum", "Internal Money Foundation"],ans:0,category:"Economics"},
  {q:"Which is the world\'s largest economy by nominal GDP (2025)?",opts:["China", "USA", "Japan", "Germany"],ans:1,category:"Economics"},
  {q:"A market with a single seller is called a what?",opts:["Oligopoly", "Monopoly", "Duopoly", "Cartel"],ans:1,category:"Economics"},
  {q:"How many member states does the United Nations have (approximately)?",opts:["150", "174", "193", "210"],ans:2,category:"Politics"},
  {q:"Where is the headquarters of the United Nations?",opts:["Geneva", "New York", "Paris", "Vienna"],ans:1,category:"Politics"},
  {q:"Which document is the supreme law of the United States?",opts:["Declaration of Independence", "The Constitution", "Bill of Rights", "Federalist Papers"],ans:1,category:"Politics"},
  {q:"What does \'NATO\' stand for?",opts:["North Atlantic Treaty Organization", "National Alliance Treaty Office", "Northern Area Trade Organization", "New Atlantic Territorial Order"],ans:0,category:"Politics"},
  {q:"Which country joined NATO in 2024?",opts:["Ukraine", "Sweden", "Austria", "Ireland"],ans:1,category:"Politics"},
  {q:"The United Kingdom\'s parliament is located in which building?",opts:["Buckingham Palace", "Palace of Westminster", "Windsor Castle", "Downing Street"],ans:1,category:"Politics"},
  {q:"How many permanent members does the UN Security Council have?",opts:["3", "5", "7", "10"],ans:1,category:"Politics"},
  {q:"Which form of government is rule by the people?",opts:["Autocracy", "Democracy", "Oligarchy", "Monarchy"],ans:1,category:"Politics"},
  {q:"Who became UK Prime Minister after the July 2024 general election?",opts:["Rishi Sunak", "Boris Johnson", "Keir Starmer", "Liz Truss"],ans:2,category:"Politics"},
  {q:"Javier Milei became president of which country in 2023?",opts:["Chile", "Argentina", "Peru", "Uruguay"],ans:1,category:"Politics"},
  {q:"Sushi originated in which country?",opts:["China", "Japan", "Korea", "Thailand"],ans:1,category:"Food & Nutrition"},
  {q:"Which country is famous for inventing pizza?",opts:["France", "Greece", "Italy", "Spain"],ans:2,category:"Food & Nutrition"},
  {q:"What is the main ingredient in guacamole?",opts:["Tomato", "Avocado", "Cucumber", "Pepper"],ans:1,category:"Food & Nutrition"},
  {q:"Which spice is the most expensive by weight?",opts:["Vanilla", "Cardamom", "Saffron", "Cinnamon"],ans:2,category:"Food & Nutrition"},
  {q:"Paella is a traditional dish from which country?",opts:["Portugal", "Mexico", "Spain", "Italy"],ans:2,category:"Food & Nutrition"},
  {q:"What type of food is a \'baguette\'?",opts:["Cheese", "Bread", "Pastry", "Sausage"],ans:1,category:"Food & Nutrition"},
  {q:"Which fruit is known as the \'king of fruits\' in Southeast Asia?",opts:["Mango", "Durian", "Jackfruit", "Rambutan"],ans:1,category:"Food & Nutrition"},
  {q:"Chocolate is made from the beans of which tree?",opts:["Coffee tree", "Cacao tree", "Carob tree", "Vanilla orchid"],ans:1,category:"Food & Nutrition"},
  {q:"Which country consumes the most coffee per capita?",opts:["USA", "Italy", "Finland", "Brazil"],ans:2,category:"Food & Nutrition"},
  {q:"Hummus is primarily made from which ingredient?",opts:["Lentils", "Chickpeas", "Black beans", "Peas"],ans:1,category:"Food & Nutrition"},
  {q:"What is the main ingredient of traditional Japanese miso soup?",opts:["Seaweed only", "Fermented soybean paste", "Fish stock only", "Rice"],ans:1,category:"Food & Nutrition"},
  {q:"Croissants are associated with France but originated in which country?",opts:["Belgium", "Austria", "Switzerland", "Italy"],ans:1,category:"Food & Nutrition"},
  {q:"Which nut is used to make marzipan?",opts:["Walnut", "Cashew", "Almond", "Pistachio"],ans:2,category:"Food & Nutrition"},
  {q:"Kimchi is a fermented dish from which country?",opts:["Japan", "China", "South Korea", "Vietnam"],ans:2,category:"Food & Nutrition"},
  {q:"What gives red wine its colour?",opts:["Added dye", "Grape skins", "Barrel aging", "Yeast"],ans:1,category:"Food & Nutrition"},
  {q:"Who won the 2024 US presidential election?",opts:["Joe Biden", "Kamala Harris", "Donald Trump", "Ron DeSantis"],ans:2,category:"Current Affairs"},
  {q:"Which city hosted the 2024 Summer Olympics?",opts:["Los Angeles", "Tokyo", "Paris", "Rome"],ans:2,category:"Current Affairs"},
  {q:"Which famous Paris cathedral reopened in December 2024 after fire restoration?",opts:["Sacre-Coeur", "Notre-Dame", "Sainte-Chapelle", "Saint-Sulpice"],ans:1,category:"Current Affairs"},
  {q:"Who became Pope in May 2025, taking the name Leo XIV?",opts:["An Italian cardinal", "The first American pope", "A Brazilian cardinal", "An African cardinal"],ans:1,category:"Current Affairs"},
  {q:"Which film won the Best Picture Oscar in 2024?",opts:["Barbie", "Oppenheimer", "Killers of the Flower Moon", "Poor Things"],ans:1,category:"Current Affairs"},
  {q:"Which film won the Best Picture Oscar in March 2025?",opts:["Wicked", "The Brutalist", "Anora", "Conclave"],ans:2,category:"Current Affairs"},
  {q:"King Charles III was crowned in which year?",opts:["2022", "2023", "2024", "2025"],ans:1,category:"Current Affairs"},
  {q:"Which country\'s spacecraft Chandrayaan-3 landed on the Moon in 2023?",opts:["China", "Japan", "India", "UAE"],ans:2,category:"Current Affairs"},
  {q:"The Nobel Peace Prize 2024 went to Nihon Hidankyo, an organization of survivors of what?",opts:["Earthquakes", "Atomic bombings", "Chernobyl", "Tsunamis"],ans:1,category:"Current Affairs"},
  {q:"Which AI chatbot, launched in late 2022, reached 100 million users faster than any app before it?",opts:["Gemini", "ChatGPT", "Claude", "Copilot"],ans:1,category:"Current Affairs"},
  {q:"Which country became NATO\'s 31st member in 2023?",opts:["Sweden", "Finland", "Ukraine", "Georgia"],ans:1,category:"Current Affairs"},
  {q:"Devastating wildfires struck which US city in January 2025?",opts:["San Francisco", "Los Angeles", "Seattle", "Phoenix"],ans:1,category:"Current Affairs"},
  {q:"Which team won the Super Bowl in February 2025?",opts:["Kansas City Chiefs", "San Francisco 49ers", "Philadelphia Eagles", "Buffalo Bills"],ans:2,category:"Current Affairs"},
  {q:"Spain\'s men\'s team won which major football tournament in 2024?",opts:["World Cup", "Euro 2024", "Copa America", "Nations League"],ans:1,category:"Current Affairs"},
  {q:"Pope Francis, who died in April 2025, was the first pope from which continent?",opts:["Africa", "Asia", "South America", "North America"],ans:2,category:"Current Affairs"},
  {q:"Which tech CEO acquired Twitter and renamed it X?",opts:["Mark Zuckerberg", "Elon Musk", "Jeff Bezos", "Sundar Pichai"],ans:1,category:"Current Affairs"},
  {q:"Which country hosted the COP28 climate summit in 2023?",opts:["Egypt", "UAE", "Brazil", "UK"],ans:1,category:"Current Affairs"},
  {q:"Taylor Swift\'s record-breaking 2023-2024 world tour was called what?",opts:["Reputation Tour", "The Eras Tour", "Midnights Tour", "Folklore Tour"],ans:1,category:"Current Affairs"},
  {q:"In 2024, which European country elected its first female president, Maia Sandu, to a second term?",opts:["Romania", "Moldova", "Bulgaria", "Croatia"],ans:1,category:"Current Affairs"},
  {q:"Which spacecraft returned asteroid samples to Earth in 2023 for NASA?",opts:["Artemis I", "OSIRIS-REx", "Lucy", "Juno"],ans:1,category:"Current Affairs"},
  {q:"What is the capital of Portugal?",opts:["Porto", "Lisbon", "Faro", "Braga"],ans:1,category:"Geography"},
  {q:"Which is the smallest continent by land area?",opts:["Europe", "Antarctica", "Australia", "South America"],ans:2,category:"Geography"},
  {q:"Through how many countries does the River Danube flow?",opts:["5", "7", "8", "10"],ans:3,category:"Geography"},
  {q:"Which country has the most active volcanoes?",opts:["Japan", "Indonesia", "Iceland", "USA"],ans:1,category:"Geography"},
  {q:"What is the capital of Norway?",opts:["Bergen", "Oslo", "Stavanger", "Trondheim"],ans:1,category:"Geography"},
  {q:"The Strait of Malacca separates which two landmasses?",opts:["Africa and Arabia", "Malay Peninsula and Sumatra", "India and Sri Lanka", "Java and Bali"],ans:1,category:"Geography"},
  {q:"Which is the longest river in Europe?",opts:["Rhine", "Danube", "Volga", "Thames"],ans:2,category:"Geography"},
  {q:"What is the capital of Poland?",opts:["Krakow", "Gdansk", "Warsaw", "Wroclaw"],ans:2,category:"Geography"},
  {q:"Which country is known as the \'Land of Fire and Ice\'?",opts:["Norway", "Greenland", "Iceland", "Finland"],ans:2,category:"Geography"},
  {q:"Lake Titicaca, the world\'s highest navigable lake, borders Peru and which country?",opts:["Chile", "Bolivia", "Ecuador", "Colombia"],ans:1,category:"Geography"},
  {q:"What is the capital of South Africa\'s administrative government?",opts:["Cape Town", "Johannesburg", "Pretoria", "Durban"],ans:2,category:"Geography"},
  {q:"Which island is the largest in the Mediterranean Sea?",opts:["Sardinia", "Corsica", "Sicily", "Cyprus"],ans:2,category:"Geography"},
  {q:"What is the capital of Sweden?",opts:["Gothenburg", "Malmo", "Uppsala", "Stockholm"],ans:3,category:"Geography"},
  {q:"The Bosphorus strait runs through which city?",opts:["Athens", "Cairo", "Istanbul", "Thessaloniki"],ans:2,category:"Geography"},
  {q:"Which US state is known as the Sunshine State?",opts:["California", "Hawaii", "Arizona", "Florida"],ans:3,category:"Geography"},
  {q:"What is the capital of Austria?",opts:["Salzburg", "Graz", "Innsbruck", "Vienna"],ans:3,category:"Geography"},
  {q:"Which African country has the largest land area?",opts:["Sudan", "Libya", "Algeria", "DR Congo"],ans:2,category:"Geography"},
  {q:"Through which country does most of the Mekong River flow?",opts:["Thailand", "Vietnam", "Laos", "Cambodia"],ans:1,category:"Geography"},
  {q:"What is the capital of the Philippines?",opts:["Cebu", "Manila", "Davao", "Quezon City"],ans:1,category:"Geography"},
  {q:"Which European microstate is surrounded entirely by Italy?",opts:["Monaco", "Vatican City", "Andorra", "San Marino"],ans:3,category:"Geography"},
  {q:"The Gobi Desert spans China and which other country?",opts:["Kazakhstan", "Russia", "Mongolia", "Kyrgyzstan"],ans:2,category:"Geography"},
  {q:"What is the capital of Saudi Arabia?",opts:["Mecca", "Medina", "Jeddah", "Riyadh"],ans:3,category:"Geography"},
  {q:"Which ocean is the smallest?",opts:["Indian", "Atlantic", "Arctic", "Southern"],ans:2,category:"Geography"},
  {q:"The Rock of Gibraltar is an overseas territory of which country?",opts:["Spain", "France", "United Kingdom", "Portugal"],ans:2,category:"Geography"},
  {q:"What is the capital of Greece?",opts:["Thessaloniki", "Corinth", "Sparta", "Athens"],ans:3,category:"Geography"},
  {q:"Which country has the most UNESCO World Heritage Sites?",opts:["China", "France", "Italy", "Spain"],ans:2,category:"Geography"},
  {q:"Mount Logan is the highest peak in which country?",opts:["USA", "Canada", "Russia", "Greenland"],ans:1,category:"Geography"},
  {q:"What is the capital of Iran?",opts:["Isfahan", "Shiraz", "Mashhad", "Tehran"],ans:3,category:"Geography"},
  {q:"The Nile River passes through how many countries?",opts:["5", "8", "11", "14"],ans:2,category:"Geography"},
  {q:"Which country has the most islands in the world?",opts:["Indonesia", "Philippines", "Sweden", "Norway"],ans:3,category:"Geography"},
  {q:"What is the capital of Ukraine?",opts:["Lviv", "Odessa", "Kharkiv", "Kyiv"],ans:3,category:"Geography"},
  {q:"Patagonia is a region found in which country?",opts:["Chile only", "Argentina and Chile", "Bolivia", "Peru"],ans:1,category:"Geography"},
  {q:"What is the capital of the Netherlands?",opts:["Rotterdam", "The Hague", "Utrecht", "Amsterdam"],ans:3,category:"Geography"},
  {q:"Which country does the island of Bali belong to?",opts:["Malaysia", "Philippines", "Indonesia", "Brunei"],ans:2,category:"Geography"},
  {q:"The Dead Sea is the lowest point on Earth\'s surface at how far below sea level?",opts:["200m", "300m", "430m", "500m"],ans:2,category:"Geography"},
  {q:"What is the capital of Pakistan?",opts:["Karachi", "Lahore", "Islamabad", "Peshawar"],ans:2,category:"Geography"},
  {q:"Which river forms much of the border between the USA and Mexico?",opts:["Colorado", "Missouri", "Rio Grande", "Arkansas"],ans:2,category:"Geography"},
  {q:"What is the capital of Vietnam?",opts:["Ho Chi Minh City", "Da Nang", "Hue", "Hanoi"],ans:3,category:"Geography"},
  {q:"Which sea lies between Italy and the Balkans?",opts:["Tyrrhenian", "Ligurian", "Adriatic", "Ionian"],ans:2,category:"Geography"},
  {q:"Lesotho is a landlocked country entirely surrounded by which nation?",opts:["Zimbabwe", "Mozambique", "South Africa", "Namibia"],ans:2,category:"Geography"},
  {q:"What is the capital of Colombia?",opts:["Medellin", "Cali", "Cartagena", "Bogota"],ans:3,category:"Geography"},
  {q:"Which mountain is the second highest in the world?",opts:["Kangchenjunga", "K2", "Lhotse", "Makalu"],ans:1,category:"Geography"},
  {q:"The Caribbean island of Hispaniola is shared between Haiti and which country?",opts:["Cuba", "Dominican Republic", "Puerto Rico", "Jamaica"],ans:1,category:"Geography"},
  {q:"What is the capital of Thailand?",opts:["Chiang Mai", "Phuket", "Pattaya", "Bangkok"],ans:3,category:"Geography"},
  {q:"Which US state has the most people?",opts:["Texas", "New York", "Florida", "California"],ans:3,category:"Geography"},
  {q:"What is the world\'s most densely populated country (excluding microstates)?",opts:["India", "Bangladesh", "South Korea", "Japan"],ans:1,category:"Geography"},
  {q:"The Himalayas were formed by the collision of which two tectonic plates?",opts:["Pacific and Eurasian", "Indian and Eurasian", "Arabian and African", "African and Eurasian"],ans:1,category:"Geography"},
  {q:"What is the capital of Nigeria?",opts:["Lagos", "Kano", "Ibadan", "Abuja"],ans:3,category:"Geography"},
  {q:"Which European capital city is divided by the Danube?",opts:["Vienna", "Budapest", "Belgrade", "Bratislava"],ans:1,category:"Geography"},
  {q:"What is the largest city in Africa by population?",opts:["Cairo", "Kinshasa", "Lagos", "Johannesburg"],ans:2,category:"Geography"},
  {q:"The Aurora Borealis is most commonly seen in which hemisphere?",opts:["Southern", "Northern", "Both equally", "Equatorial"],ans:1,category:"Geography"},
  {q:"What is the capital of Bangladesh?",opts:["Chittagong", "Dhaka", "Khulna", "Sylhet"],ans:1,category:"Geography"},
  {q:"Which peninsula is shared by Sweden, Norway, and part of Finland?",opts:["Iberian", "Balkan", "Scandinavian", "Jutland"],ans:2,category:"Geography"},
  {q:"Easter Island belongs to which country?",opts:["Australia", "New Zealand", "Chile", "Peru"],ans:2,category:"Geography"},
  {q:"What is the capital of Morocco?",opts:["Casablanca", "Marrakech", "Fez", "Rabat"],ans:3,category:"Geography"},
  {q:"Which is the only country to border both the Atlantic and Indian Oceans without using any islands?",opts:["Nigeria", "South Africa", "Angola", "Tanzania"],ans:1,category:"Geography"},
  {q:"Which ancient wonder was a giant statue at the entrance to Rhodes harbour?",opts:["Lighthouse of Alexandria", "Colossus of Rhodes", "Hanging Gardens", "Statue of Zeus"],ans:1,category:"History"},
  {q:"The Opium Wars in the 1800s were fought between China and which country?",opts:["France", "USA", "Britain", "Russia"],ans:2,category:"History"},
  {q:"Who was the first woman to win a Nobel Prize (1903)?",opts:["Rosalind Franklin", "Marie Curie", "Florence Nightingale", "Harriet Tubman"],ans:1,category:"History"},
  {q:"The Battle of Thermopylae was famously fought by a small force of how many Spartans?",opts:["100", "300", "500", "1000"],ans:1,category:"History"},
  {q:"Which two world powers competed in the Space Race during the Cold War?",opts:["UK and France", "USA and China", "USA and USSR", "Germany and Japan"],ans:2,category:"History"},
  {q:"The Boston Tea Party of 1773 was a protest against taxes imposed by which government?",opts:["French", "British", "Spanish", "Dutch"],ans:1,category:"History"},
  {q:"Who was the last Tsar of Russia?",opts:["Alexander III", "Nicholas I", "Alexander II", "Nicholas II"],ans:3,category:"History"},
  {q:"Which empire was known as the \'Empire on which the sun never sets\'?",opts:["French Empire", "Mongol Empire", "Spanish Empire", "British Empire"],ans:3,category:"History"},
  {q:"Julius Caesar was assassinated in which year?",opts:["63 BC", "44 BC", "27 BC", "14 AD"],ans:1,category:"History"},
  {q:"The Meiji Restoration transformed which country into a modern state?",opts:["China", "Korea", "Japan", "Vietnam"],ans:2,category:"History"},
  {q:"Which US president was assassinated in 1963?",opts:["Dwight Eisenhower", "John F. Kennedy", "Lyndon Johnson", "Robert Kennedy"],ans:1,category:"History"},
  {q:"The Reformation split Christianity into Catholic and which other major branch?",opts:["Orthodox", "Coptic", "Protestant", "Anglican only"],ans:2,category:"History"},
  {q:"Cleopatra was a member of which Greek-origin dynasty ruling Egypt?",opts:["Ptolemaic", "Macedonian", "Seleucid", "Lagid"],ans:0,category:"History"},
  {q:"The Aztec capital Tenochtitlan stood where which modern city is now?",opts:["Guadalajara", "Puebla", "Mexico City", "Oaxaca"],ans:2,category:"History"},
  {q:"Who wrote \'The Communist Manifesto\' alongside Karl Marx?",opts:["Vladimir Lenin", "Friedrich Engels", "Leon Trotsky", "Rosa Luxemburg"],ans:1,category:"History"},
  {q:"The Great Fire of London occurred in which year?",opts:["1605", "1666", "1707", "1750"],ans:1,category:"History"},
  {q:"Which ancient civilisation built Stonehenge?",opts:["Romans", "Vikings", "Celtic Britons", "Unknown Neolithic peoples"],ans:3,category:"History"},
  {q:"The Thirty Years\' War ended with which treaty in 1648?",opts:["Treaty of Paris", "Peace of Westphalia", "Treaty of Utrecht", "Peace of Augsburg"],ans:1,category:"History"},
  {q:"Who was the Egyptian pharaoh during the Exodus described in the Bible?",opts:["Thutmose III", "Akhenaten", "Ramesses II", "Cleopatra"],ans:2,category:"History"},
  {q:"Genghis Khan founded the Mongol Empire in which century?",opts:["11th", "12th", "13th", "14th"],ans:2,category:"History"},
  {q:"Which war was fought between North and South Korea (1950-1953)?",opts:["Vietnam War", "Korean War", "Boxer Rebellion", "Sino-Korean War"],ans:1,category:"History"},
  {q:"The Parthenon was a temple dedicated to which Greek goddess?",opts:["Aphrodite", "Hera", "Artemis", "Athena"],ans:3,category:"History"},
  {q:"Karl Marx lived and wrote much of his work in which city?",opts:["Paris", "Berlin", "London", "Vienna"],ans:2,category:"History"},
  {q:"Which empire sacked Rome in 410 AD under Alaric?",opts:["Vandals", "Huns", "Visigoths", "Ostrogoths"],ans:2,category:"History"},
  {q:"Simon Bolivar is known for liberating which region from Spanish rule?",opts:["North America", "Central America", "South America", "Caribbean"],ans:2,category:"History"},
  {q:"The Suez Canal was nationalised in 1956 by the leader of which country?",opts:["Israel", "Egypt", "Britain", "Jordan"],ans:1,category:"History"},
  {q:"Who was the first female Prime Minister of Australia?",opts:["Julia Gillard", "Julie Bishop", "Penny Wong", "Jacinda Ardern"],ans:0,category:"History"},
  {q:"The Korean alphabet Hangul was created in which century?",opts:["11th", "13th", "15th", "17th"],ans:2,category:"History"},
  {q:"Which battle of 1805 established British naval supremacy under Nelson?",opts:["Battle of Waterloo", "Battle of the Nile", "Battle of Trafalgar", "Battle of Copenhagen"],ans:2,category:"History"},
  {q:"Who declared \'I have a dream\' in 1963?",opts:["Malcolm X", "Thurgood Marshall", "Martin Luther King Jr.", "John Lewis"],ans:2,category:"History"},
  {q:"The Scramble for Africa mainly took place in which century?",opts:["17th", "18th", "19th", "20th"],ans:2,category:"History"},
  {q:"Who was the first democratically elected female head of government in the world?",opts:["Indira Gandhi", "Margaret Thatcher", "Sirimavo Bandaranaike", "Golda Meir"],ans:2,category:"History"},
  {q:"The storming of the Bastille on 14 July 1789 symbolised which revolution?",opts:["American", "Russian", "French", "Industrial"],ans:2,category:"History"},
  {q:"Which ancient empire built Persepolis?",opts:["Babylonian", "Persian", "Assyrian", "Median"],ans:1,category:"History"},
  {q:"The Rwandan Genocide occurred in which year?",opts:["1990", "1992", "1994", "1996"],ans:2,category:"History"},
  {q:"Who was the British monarch during the American War of Independence?",opts:["George II", "George III", "George IV", "William IV"],ans:1,category:"History"},
  {q:"The \'shot heard round the world\' began which war?",opts:["War of 1812", "American Civil War", "American Revolutionary War", "French-Indian War"],ans:2,category:"History"},
  {q:"Alexander the Great was tutored by which philosopher?",opts:["Socrates", "Plato", "Aristotle", "Pythagoras"],ans:2,category:"History"},
  {q:"The Colosseum in Rome was completed in approximately which year?",opts:["50 BC", "42 AD", "80 AD", "150 AD"],ans:2,category:"History"},
  {q:"Which country was formerly known as Persia?",opts:["Iraq", "Syria", "Iran", "Turkey"],ans:2,category:"History"},
  {q:"The Bolshevik Revolution of 1917 led to the creation of which state?",opts:["Russian Empire", "Soviet Union", "Poland", "East Germany"],ans:1,category:"History"},
  {q:"Who invented the printing press with movable type in Europe around 1440?",opts:["Gutenberg", "Caxton", "Luther", "Aldus Manutius"],ans:0,category:"History"},
  {q:"Which US president served the shortest time in office after dying of pneumonia in 1841?",opts:["James Polk", "William Henry Harrison", "Zachary Taylor", "James Garfield"],ans:1,category:"History"},
  {q:"The Battle of Hastings in 1066 was won by whom?",opts:["King Harold", "Alfred the Great", "William the Conqueror", "Richard I"],ans:2,category:"History"},
  {q:"Hirohito was the emperor of which country during World War II?",opts:["China", "Korea", "Japan", "Vietnam"],ans:2,category:"History"},
  {q:"The Marshall Plan after WW2 was a US programme to rebuild which region?",opts:["Asia", "Latin America", "Western Europe", "Middle East"],ans:2,category:"History"},
  {q:"Ancient Carthage was located in modern-day which country?",opts:["Libya", "Algeria", "Morocco", "Tunisia"],ans:3,category:"History"},
  {q:"Who was the first US Secretary of the Treasury?",opts:["Thomas Jefferson", "John Adams", "Alexander Hamilton", "James Madison"],ans:2,category:"History"},
  {q:"The Gulf War of 1990-1991 began when Iraq invaded which country?",opts:["Iran", "Saudi Arabia", "Kuwait", "Bahrain"],ans:2,category:"History"},
  {q:"Which Chinese dynasty built the Forbidden City?",opts:["Han", "Tang", "Ming", "Qing"],ans:2,category:"History"},
  {q:"The first modern Olympic Games of the current era were held in which city?",opts:["London", "Paris", "Athens", "Stockholm"],ans:2,category:"History"},
  {q:"Who was Nelson Mandela\'s political party in South Africa?",opts:["ZANU-PF", "ANC", "PAC", "DA"],ans:1,category:"History"},
  {q:"The Treaty of Versailles ending World War I was signed in which year?",opts:["1917", "1918", "1919", "1920"],ans:2,category:"History"},
  {q:"Feudalism was the dominant social system in which era?",opts:["Ancient Rome", "Medieval Europe", "Industrial Britain", "Colonial America"],ans:1,category:"History"},
  {q:"Which explorer first circumnavigated Australia?",opts:["Captain Cook", "Abel Tasman", "Matthew Flinders", "William Bligh"],ans:2,category:"History"},
  {q:"The Partition of India in 1947 created India and which new nation?",opts:["Bangladesh", "Sri Lanka", "Pakistan", "Myanmar"],ans:2,category:"History"},
  {q:"Which branch of science studies living organisms?",opts:["Chemistry", "Physics", "Biology", "Geology"],ans:2,category:"Science"},
  {q:"What type of bond holds water molecules together?",opts:["Ionic", "Covalent", "Hydrogen", "Metallic"],ans:2,category:"Science"},
  {q:"What is the chemical formula for table salt?",opts:["NaCl", "KCl", "CaCl2", "MgCl2"],ans:0,category:"Science"},
  {q:"Which gas is produced when acid reacts with a metal?",opts:["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],ans:2,category:"Science"},
  {q:"What is the term for the bending of light as it passes through different mediums?",opts:["Reflection", "Refraction", "Diffraction", "Absorption"],ans:1,category:"Science"},
  {q:"Which scientist developed the first polio vaccine?",opts:["Louis Pasteur", "Jonas Salk", "Alexander Fleming", "Edward Jenner"],ans:1,category:"Science"},
  {q:"What is the name for the tendency of an object to resist changes in motion?",opts:["Gravity", "Momentum", "Inertia", "Friction"],ans:2,category:"Science"},
  {q:"How many elements are in the periodic table (as of 2025)?",opts:["108", "112", "118", "124"],ans:2,category:"Science"},
  {q:"What type of energy does a moving object possess?",opts:["Potential", "Thermal", "Nuclear", "Kinetic"],ans:3,category:"Science"},
  {q:"Which vitamin deficiency causes scurvy?",opts:["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],ans:2,category:"Science"},
  {q:"What is the term for the process by which a liquid becomes a gas?",opts:["Condensation", "Sublimation", "Evaporation", "Melting"],ans:2,category:"Science"},
  {q:"Which part of the brain is responsible for emotions and memory?",opts:["Cerebellum", "Limbic system", "Brainstem", "Frontal lobe"],ans:1,category:"Science"},
  {q:"What does an electroencephalogram (EEG) measure?",opts:["Heart activity", "Brain electrical activity", "Muscle movement", "Blood pressure"],ans:1,category:"Science"},
  {q:"Chlorophyll gives plants which colour?",opts:["Yellow", "Red", "Blue", "Green"],ans:3,category:"Science"},
  {q:"Which subatomic particle determines the element of an atom?",opts:["Neutron", "Electron", "Proton", "Quark"],ans:2,category:"Science"},
  {q:"What is the process called when ice turns directly to vapour?",opts:["Evaporation", "Condensation", "Sublimation", "Deposition"],ans:2,category:"Science"},
  {q:"Which gas law states that pressure and volume are inversely proportional?",opts:["Charles's Law", "Boyle's Law", "Dalton's Law", "Gay-Lussac's Law"],ans:1,category:"Science"},
  {q:"Which organ is responsible for producing bile?",opts:["Gallbladder", "Pancreas", "Liver", "Kidneys"],ans:2,category:"Science"},
  {q:"What is the most common blood type in humans?",opts:["AB+", "B+", "O+", "A+"],ans:2,category:"Science"},
  {q:"Which invention by Galileo greatly advanced astronomy?",opts:["Microscope", "Telescope", "Barometer", "Thermometer"],ans:1,category:"Science"},
  {q:"What is the unit of frequency?",opts:["Joule", "Pascal", "Hertz", "Newton"],ans:2,category:"Science"},
  {q:"Neurons transmit signals using which type of signals?",opts:["Chemical only", "Electrical only", "Both electrical and chemical", "Magnetic"],ans:2,category:"Science"},
  {q:"Which layer of the atmosphere contains the ozone layer?",opts:["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],ans:1,category:"Science"},
  {q:"What is the term for an organism that makes its own food?",opts:["Heterotroph", "Decomposer", "Autotroph", "Parasite"],ans:2,category:"Science"},
  {q:"What are the building blocks of proteins?",opts:["Fatty acids", "Glucose", "Amino acids", "Nucleotides"],ans:2,category:"Science"},
  {q:"Which blood cells fight infection?",opts:["Red blood cells", "Platelets", "White blood cells", "Plasma cells"],ans:2,category:"Science"},
  {q:"What type of radiation has the shortest wavelength?",opts:["Radio waves", "Infrared", "Visible light", "Gamma rays"],ans:3,category:"Science"},
  {q:"Which planet is named after the Roman god of the sea?",opts:["Uranus", "Saturn", "Neptune", "Jupiter"],ans:2,category:"Science"},
  {q:"What is measured in \'decibels\'?",opts:["Light intensity", "Sound level", "Electric charge", "Temperature"],ans:1,category:"Science"},
  {q:"The Big Bang theory describes the origin of what?",opts:["Earth", "The solar system", "The universe", "The Milky Way only"],ans:2,category:"Science"},
  {q:"Which scientist proposed the heliocentric model of the solar system?",opts:["Galileo", "Copernicus", "Kepler", "Brahe"],ans:1,category:"Science"},
  {q:"What is the chemical name for rust?",opts:["Iron sulfide", "Iron carbonate", "Iron oxide", "Iron chloride"],ans:2,category:"Science"},
  {q:"CRISPR technology is used to edit what?",opts:["Proteins", "Viruses", "DNA", "Neurons"],ans:2,category:"Science"},
  {q:"What type of sugar is found in fruit?",opts:["Glucose", "Sucrose", "Fructose", "Lactose"],ans:2,category:"Science"},
  {q:"Which phenomenon explains why the sky is blue?",opts:["Reflection", "Refraction", "Scattering (Rayleigh)", "Absorption"],ans:2,category:"Science"},
  {q:"What is the function of red blood cells?",opts:["Fight infection", "Carry oxygen", "Clot blood", "Produce antibodies"],ans:1,category:"Science"},
  {q:"In which organ does digestion primarily occur?",opts:["Stomach", "Liver", "Small intestine", "Large intestine"],ans:2,category:"Science"},
  {q:"What is \'half-life\' a measure of in physics?",opts:["Speed of decay", "Time for half a radioactive sample to decay", "Energy released", "Half the atom's mass"],ans:1,category:"Science"},
  {q:"Which metal is the best conductor of electricity?",opts:["Gold", "Copper", "Aluminium", "Silver"],ans:3,category:"Science"},
  {q:"What does RNA stand for?",opts:["Ribose Nucleic Acid", "Ribonucleic Acid", "Repeated Nucleic Acid", "Ribose Nitrogen Acid"],ans:1,category:"Science"},
  {q:"Which sense uses the cochlea to function?",opts:["Sight", "Smell", "Hearing", "Touch"],ans:2,category:"Science"},
  {q:"What is the name for an atom with an electric charge?",opts:["Isotope", "Molecule", "Ion", "Compound"],ans:2,category:"Science"},
  {q:"Which process produces identical copies of DNA?",opts:["Transcription", "Translation", "Replication", "Mutation"],ans:2,category:"Science"},
  {q:"What is the pH of an acidic solution?",opts:["Above 7", "Exactly 7", "Below 7", "Above 14"],ans:2,category:"Science"},
  {q:"Which effect describes the change in frequency of a wave due to movement?",opts:["Bernoulli effect", "Doppler effect", "Photoelectric effect", "Hall effect"],ans:1,category:"Science"},
  {q:"What holds the nucleus of an atom together?",opts:["Electromagnetic force", "Gravity", "Nuclear strong force", "Weak force"],ans:2,category:"Science"},
  {q:"The appendix is a vestigial organ of which body system?",opts:["Respiratory", "Digestive", "Nervous", "Reproductive"],ans:1,category:"Science"},
  {q:"What is the study of earthquakes called?",opts:["Volcanology", "Meteorology", "Seismology", "Oceanography"],ans:2,category:"Science"},
  {q:"Which metal is used in thermometers?",opts:["Lead", "Tin", "Mercury", "Zinc"],ans:2,category:"Science"},
  {q:"Stem cells are remarkable because they can do what?",opts:["Destroy viruses", "Become different cell types", "Produce hormones only", "Conduct electricity"],ans:1,category:"Science"},
  {q:"Newton\'s third law states that for every action there is what?",opts:["A greater reaction", "An equal and opposite reaction", "An unequal reaction", "No reaction in a vacuum"],ans:1,category:"Science"},
  {q:"What is the chemical symbol for silver?",opts:["Si", "Sl", "Ag", "Sv"],ans:2,category:"Science"},
  {q:"Which organism is used to make bread rise?",opts:["Bacteria", "Mould", "Yeast", "Algae"],ans:2,category:"Science"},
  {q:"What type of lens is used in a magnifying glass?",opts:["Concave", "Convex", "Planar", "Bifocal"],ans:1,category:"Science"},
  {q:"Which planet has the shortest day?",opts:["Earth", "Mars", "Jupiter", "Venus"],ans:2,category:"Science"},
  {q:"The speed of sound in air is approximately how fast?",opts:["340 m/s", "1,000 m/s", "3,000 m/s", "150 m/s"],ans:0,category:"Science"},
  {q:"Who is known as the founder of psychoanalysis?",opts:["Carl Jung", "Sigmund Freud", "Alfred Adler", "Wilhelm Wundt"],ans:1,category:"Psychology"},
  {q:"What is the term for an extreme and irrational fear?",opts:["Phobia", "Anxiety", "Panic disorder", "OCD"],ans:0,category:"Psychology"},
  {q:"Pavlov\'s famous experiment with dogs demonstrated what type of learning?",opts:["Operant conditioning", "Classical conditioning", "Observational learning", "Cognitive learning"],ans:1,category:"Psychology"},
  {q:"Which psychologist proposed the hierarchy of needs?",opts:["B.F. Skinner", "Carl Rogers", "Abraham Maslow", "Erik Erikson"],ans:2,category:"Psychology"},
  {q:"What does IQ stand for?",opts:["Individual Quotient", "Intelligence Quotient", "Intellectual Quality", "Index of Quickness"],ans:1,category:"Psychology"},
  {q:"The placebo effect occurs when improvement happens due to what?",opts:["Real treatment", "Expectation alone", "Exercise", "Diet"],ans:1,category:"Psychology"},
  {q:"What is the term for remembering events as more positive than they were?",opts:["Rosy retrospection", "Confirmation bias", "Hindsight bias", "Availability heuristic"],ans:0,category:"Psychology"},
  {q:"Which part of Freud\'s personality model represents societal rules?",opts:["Id", "Ego", "Superego", "Libido"],ans:2,category:"Psychology"},
  {q:"The Milgram experiment tested obedience to whom?",opts:["Peers", "Parents", "Authority figures", "Random strangers"],ans:2,category:"Psychology"},
  {q:"What is \'cognitive dissonance\'?",opts:["Memory loss", "Discomfort from conflicting beliefs", "Fear of new ideas", "Learning difficulty"],ans:1,category:"Psychology"},
  {q:"Which therapy focuses on changing negative thought patterns?",opts:["Psychoanalysis", "CBT (Cognitive Behavioural Therapy)", "Hypnotherapy", "Gestalt therapy"],ans:1,category:"Psychology"},
  {q:"Autism Spectrum Disorder (ASD) primarily affects what?",opts:["Physical coordination", "Social communication and behaviour", "Memory only", "Vision"],ans:1,category:"Psychology"},
  {q:"What is the term for unconsciously attributing your own feelings to others?",opts:["Projection", "Repression", "Sublimation", "Rationalisation"],ans:0,category:"Psychology"},
  {q:"The Stanford Prison Experiment studied what?",opts:["Memory", "Conformity and authority", "Sleep deprivation", "Language learning"],ans:1,category:"Psychology"},
  {q:"Which psychologist developed the concept of the collective unconscious?",opts:["Freud", "Adler", "Jung", "James"],ans:2,category:"Psychology"},
  {q:"\'Positive reinforcement\' means rewarding behaviour to do what?",opts:["Stop it", "Increase it", "Ignore it", "Punish it"],ans:1,category:"Psychology"},
  {q:"What is the medical term for extreme mood swings between highs and lows?",opts:["Schizophrenia", "Bipolar disorder", "PTSD", "BPD"],ans:1,category:"Psychology"},
  {q:"The \'bystander effect\' means people are less likely to help when what?",opts:["They are tired", "Others are present", "It is raining", "They know the victim"],ans:1,category:"Psychology"},
  {q:"Which sense is most closely linked to memory and emotion?",opts:["Sight", "Hearing", "Smell", "Touch"],ans:2,category:"Psychology"},
  {q:"What is the term for a mental shortcut used to make quick decisions?",opts:["Algorithm", "Schema", "Heuristic", "Deduction"],ans:2,category:"Psychology"},
  {q:"Sleep deprivation primarily affects which cognitive function first?",opts:["Long-term memory", "Decision-making and attention", "Motor skills", "Language"],ans:1,category:"Psychology"},
  {q:"Which disorder involves repeated unwanted thoughts and compulsive behaviours?",opts:["PTSD", "GAD", "OCD", "Phobia"],ans:2,category:"Psychology"},
  {q:"Neuroplasticity refers to the brain\'s ability to do what?",opts:["Grow larger", "Reorganise and form new connections", "Resist disease", "Speed up reactions"],ans:1,category:"Psychology"},
  {q:"The \'fight-or-flight\' response is triggered by which hormone?",opts:["Insulin", "Cortisol", "Adrenaline", "Serotonin"],ans:2,category:"Psychology"},
  {q:"Serotonin is often called the \'feel-good\' chemical because it regulates what?",opts:["Pain only", "Sleep only", "Mood, happiness, and wellbeing", "Heart rate"],ans:2,category:"Psychology"},
  {q:"Who said \'I think, therefore I am\'?",opts:["Aristotle", "Immanuel Kant", "René Descartes", "John Locke"],ans:2,category:"Philosophy"},
  {q:"Which ancient Greek philosopher was the teacher of Plato?",opts:["Aristotle", "Pythagoras", "Socrates", "Thales"],ans:2,category:"Philosophy"},
  {q:"Aristotle was the tutor of which ancient conqueror?",opts:["Caesar", "Hannibal", "Alexander the Great", "Xerxes"],ans:2,category:"Philosophy"},
  {q:"What is the philosophical study of knowledge called?",opts:["Ontology", "Ethics", "Epistemology", "Aesthetics"],ans:2,category:"Philosophy"},
  {q:"Which philosopher wrote \'Critique of Pure Reason\'?",opts:["Hegel", "Nietzsche", "Kant", "Hume"],ans:2,category:"Philosophy"},
  {q:"What is the study of right and wrong called?",opts:["Metaphysics", "Ethics", "Logic", "Aesthetics"],ans:1,category:"Philosophy"},
  {q:"Nietzsche famously declared that \'God is what\'?",opts:["Everywhere", "Dead", "Unknowable", "Great"],ans:1,category:"Philosophy"},
  {q:"Utilitarianism holds that the right action produces what?",opts:["Personal happiness", "Greatest good for greatest number", "Individual freedom", "Divine approval"],ans:1,category:"Philosophy"},
  {q:"Which philosopher wrote \'Leviathan\', defending strong government?",opts:["John Locke", "Thomas Hobbes", "Jean-Jacques Rousseau", "Montesquieu"],ans:1,category:"Philosophy"},
  {q:"The concept of the \'social contract\' is associated with which philosopher?",opts:["Descartes", "Kant", "Rousseau", "Voltaire"],ans:2,category:"Philosophy"},
  {q:"Plato\'s famous philosophical work \'The Republic\' is primarily about what?",opts:["War", "Justice and ideal society", "Love", "Mathematics"],ans:1,category:"Philosophy"},
  {q:"Which school of philosophy teaches accepting what you cannot control?",opts:["Epicureanism", "Cynicism", "Stoicism", "Skepticism"],ans:2,category:"Philosophy"},
  {q:"Who wrote \'Meditations\' while serving as Roman Emperor?",opts:["Seneca", "Marcus Aurelius", "Cicero", "Pliny"],ans:1,category:"Philosophy"},
  {q:"John Locke believed people are born as what?",opts:["Naturally evil", "Blank slates (tabula rasa)", "Naturally good", "Divinely guided"],ans:1,category:"Philosophy"},
  {q:"Existentialism is most closely associated with which philosopher?",opts:["Kant", "Hegel", "Jean-Paul Sartre", "Wittgenstein"],ans:2,category:"Philosophy"},
  {q:"Which ancient philosophy taught that pleasure is the highest good?",opts:["Stoicism", "Cynicism", "Epicureanism", "Aristotelianism"],ans:2,category:"Philosophy"},
  {q:"What is \'Occam\'s Razor\'?",opts:["The simplest explanation is usually correct", "All actions have consequences", "Truth is subjective", "Logic always prevails"],ans:0,category:"Philosophy"},
  {q:"The trolley problem is a famous thought experiment in which field?",opts:["Physics", "Political theory", "Ethics", "Economics"],ans:2,category:"Philosophy"},
  {q:"Which philosopher is associated with \'tabula rasa\' (blank slate)?",opts:["Descartes", "Leibniz", "John Locke", "Spinoza"],ans:2,category:"Philosophy"},
  {q:"What did Plato call his ideal realm of perfect, unchanging concepts?",opts:["The Cosmos", "The World of Forms", "The Agora", "The Symposium"],ans:1,category:"Philosophy"},
  {q:"Which space probe, launched in 1977, has travelled furthest from Earth?",opts:["Pioneer 10", "Voyager 1", "New Horizons", "Cassini"],ans:1,category:"Space"},
  {q:"What causes a lunar eclipse?",opts:["Moon passes between Earth and Sun", "Earth passes between Sun and Moon", "Sun passes between Earth and Moon", "Clouds cover the Moon"],ans:1,category:"Space"},
  {q:"Which planet has a moon called Titan with a thick atmosphere?",opts:["Jupiter", "Uranus", "Saturn", "Neptune"],ans:2,category:"Space"},
  {q:"What is a neutron star?",opts:["A dying star", "The ultra-dense remnant of a supernova", "A young star", "The Sun's core"],ans:1,category:"Space"},
  {q:"Which mission put the first woman on the Moon?",opts:["Artemis I", "Artemis III", "Apollo 20", "Luna 3"],ans:1,category:"Space"},
  {q:"Olympus Mons, the largest volcano in the solar system, is on which planet?",opts:["Venus", "Earth", "Mars", "Jupiter"],ans:2,category:"Space"},
  {q:"How many Earth years does it take for Neptune to orbit the Sun?",opts:["30", "84", "165", "248"],ans:2,category:"Space"},
  {q:"The dark side of the Moon always faces which direction?",opts:["Earth", "Sun", "Both equally", "Deep space"],ans:3,category:"Space"},
  {q:"What is the name of the force that causes a massive object to warp spacetime?",opts:["Electromagnetism", "Nuclear force", "Gravity", "Dark energy"],ans:2,category:"Space"},
  {q:"How far is the Moon from Earth approximately?",opts:["80,000 km", "384,000 km", "1,000,000 km", "150,000 km"],ans:1,category:"Space"},
  {q:"Which constellation is called the Hunter?",opts:["Ursa Major", "Pegasus", "Orion", "Scorpius"],ans:2,category:"Space"},
  {q:"What was the first space station launched by the USA?",opts:["Mir", "Skylab", "Salyut", "ISS"],ans:1,category:"Space"},
  {q:"Which planet has the longest day (slowest rotation)?",opts:["Mercury", "Venus", "Jupiter", "Uranus"],ans:1,category:"Space"},
  {q:"Dark matter makes up approximately what percentage of the universe\'s total mass-energy?",opts:["5%", "27%", "68%", "95%"],ans:1,category:"Space"},
  {q:"SpaceX\'s Starship is designed for travel to which destination?",opts:["The Moon only", "Mars primarily", "Asteroid belt", "Venus"],ans:1,category:"Space"},
  {q:"Which gas giant does the moon Io orbit?",opts:["Saturn", "Uranus", "Neptune", "Jupiter"],ans:3,category:"Space"},
  {q:"A solar flare is an eruption of energy from which part of the Sun?",opts:["Core", "Convection zone", "Chromosphere/surface", "Photosphere ring"],ans:2,category:"Space"},
  {q:"What is the name of the boundary of the solar system where the Sun\'s solar wind stops?",opts:["Oort Cloud", "Heliopause", "Kuiper Belt edge", "Magnetopause"],ans:1,category:"Space"},
  {q:"Kepler\'s laws describe the motion of what?",opts:["Stars", "Galaxies", "Planets in orbit", "Comets only"],ans:2,category:"Space"},
  {q:"What is the closest galaxy to the Milky Way?",opts:["Triangulum", "Large Magellanic Cloud", "Andromeda", "Canis Major dwarf"],ans:3,category:"Space"},
  {q:"Which two gases make up most of the Sun?",opts:["Oxygen and nitrogen", "Hydrogen and helium", "Carbon and oxygen", "Helium and neon"],ans:1,category:"Space"},
  {q:"The Cassini spacecraft studied which planet before its 2017 mission end?",opts:["Jupiter", "Uranus", "Saturn", "Neptune"],ans:2,category:"Space"},
  {q:"What does the Hubble Space Telescope orbit around?",opts:["The Sun", "The Moon", "Earth", "The ISS"],ans:2,category:"Space"},
  {q:"Which country became the third to land on the Moon in 2024 with the SLIM lander?",opts:["India", "China", "Japan", "UAE"],ans:2,category:"Space"},
  {q:"What is a comet\'s tail made of?",opts:["Rock dust", "Ice and dust blown by solar wind", "Methane gas", "Magnetic fields"],ans:1,category:"Space"},
  {q:"What does CO2 stand for?",opts:["Carbon monoxide", "Carbon dioxide", "Carbon trioxide", "Cobalt dioxide"],ans:1,category:"Environment"},
  {q:"Which gas is the primary greenhouse gas?",opts:["Oxygen", "Methane", "CO2", "Nitrous oxide"],ans:2,category:"Environment"},
  {q:"The Paris Agreement aims to limit global warming to below how many degrees Celsius above pre-industrial levels?",opts:["1°C", "2°C", "3°C", "4°C"],ans:1,category:"Environment"},
  {q:"Which ocean plastic patch is famously the size of Texas (or larger)?",opts:["North Atlantic Gyre", "Indian Ocean patch", "Great Pacific Garbage Patch", "Arctic patch"],ans:2,category:"Environment"},
  {q:"Deforestation is most severe in which type of biome?",opts:["Temperate forests", "Tropical rainforests", "Boreal forests", "Mangroves"],ans:1,category:"Environment"},
  {q:"Which international agreement (1987) tackled the ozone hole?",opts:["Kyoto Protocol", "Paris Agreement", "Montreal Protocol", "Rio Convention"],ans:2,category:"Environment"},
  {q:"What is the main cause of ocean acidification?",opts:["Oil spills", "Absorption of excess CO2", "Nuclear waste", "Overfishing"],ans:1,category:"Environment"},
  {q:"\'Biodiversity\' refers to the variety of what?",opts:["Habitats only", "Life forms and ecosystems", "Plant species only", "Genetic mutations"],ans:1,category:"Environment"},
  {q:"Which renewable energy source uses the heat from inside the Earth?",opts:["Solar", "Wind", "Tidal", "Geothermal"],ans:3,category:"Environment"},
  {q:"A \'carbon footprint\' measures the total what?",opts:["Land usage", "Greenhouse gas emissions from an activity", "Water used", "Waste produced"],ans:1,category:"Environment"},
  {q:"Which major river delta is most threatened by rising sea levels?",opts:["Mississippi", "Amazon", "Nile", "Ganges-Brahmaputra"],ans:3,category:"Environment"},
  {q:"The dodo bird went extinct primarily because of what?",opts:["Climate change", "Hunting and introduced species", "Habitat loss only", "Disease"],ans:1,category:"Environment"},
  {q:"What percentage of Earth\'s water is fresh (approximate)?",opts:["1%", "3%", "10%", "25%"],ans:1,category:"Environment"},
  {q:"Which country is the world\'s largest emitter of CO2 (2024)?",opts:["USA", "India", "Russia", "China"],ans:3,category:"Environment"},
  {q:"Coral bleaching is caused primarily by what?",opts:["Sea pollution", "Ocean warming", "Fishing nets", "Sunlight increase"],ans:1,category:"Environment"},
  {q:"What does \'ESG\' stand for in business?",opts:["Economic, Social, Governance", "Environmental, Social, Governance", "Environmental, Sustainability, Growth", "Equity, Sector, Growth"],ans:1,category:"Environment"},
  {q:"The Great Barrier Reef is under threat primarily due to what?",opts:["Tourism only", "Fishing only", "Climate change and warming seas", "Oil drilling"],ans:2,category:"Environment"},
  {q:"Which gas is mainly responsible for ozone depletion?",opts:["Carbon dioxide", "Methane", "CFCs (chlorofluorocarbons)", "Nitrous oxide"],ans:2,category:"Environment"},
  {q:"What is \'rewilding\'?",opts:["Breeding animals in zoos", "Restoring ecosystems to natural states", "Planting urban gardens", "Banning hunting"],ans:1,category:"Environment"},
  {q:"Earth Overshoot Day marks when humanity has used more than what?",opts:["Half the year's energy", "Earth's yearly resource budget", "All freshwater", "Annual rainfall"],ans:1,category:"Environment"},
  {q:"Which country generates the highest percentage of electricity from wind (2024)?",opts:["Germany", "UK", "Denmark", "USA"],ans:2,category:"Environment"},
  {q:"What is the Kyoto Protocol?",opts:["A trade deal", "An international treaty on greenhouse gas emissions", "A nuclear non-proliferation agreement", "A biodiversity convention"],ans:1,category:"Environment"},
  {q:"Permafrost thawing in the Arctic releases which dangerous greenhouse gas?",opts:["CO2 only", "Methane", "Ozone", "Hydrogen"],ans:1,category:"Environment"},
  {q:"Which term describes species at risk of extinction?",opts:["Vulnerable", "Threatened", "Endangered", "All of the above on the IUCN scale"],ans:3,category:"Environment"},
  {q:"Solar panels convert sunlight into which type of energy?",opts:["Heat", "Chemical", "Electrical", "Mechanical"],ans:2,category:"Environment"},
  {q:"What is \'supply and demand\'?",opts:["A government pricing system", "The relationship between product availability and consumer desire", "A trade agreement", "A tax system"],ans:1,category:"Economics"},
  {q:"Which country has the world\'s largest sovereign wealth fund?",opts:["Saudi Arabia", "UAE", "Norway", "China"],ans:2,category:"Economics"},
  {q:"What does a \'bear market\' indicate in finance?",opts:["Rising stock prices", "Stable markets", "Falling stock prices by 20%+", "High volatility"],ans:2,category:"Economics"},
  {q:"Which institution is described as the \'lender of last resort\' for countries?",opts:["World Bank", "IMF", "WTO", "UN Development Programme"],ans:1,category:"Economics"},
  {q:"What is \'quantitative easing\'?",opts:["Raising taxes", "Central banks buying assets to stimulate economy", "Cutting government spending", "Increasing interest rates"],ans:1,category:"Economics"},
  {q:"What does the NASDAQ primarily list?",opts:["Energy companies", "Financial stocks", "Technology companies", "Government bonds"],ans:2,category:"Economics"},
  {q:"What is \'deflation\'?",opts:["Rising prices", "Falling prices over time", "Stable prices", "Currency devaluation"],ans:1,category:"Economics"},
  {q:"Which economic term describes the cost of the next best alternative foregone?",opts:["Sunk cost", "Opportunity cost", "Marginal cost", "Fixed cost"],ans:1,category:"Economics"},
  {q:"The \'Gini coefficient\' measures what?",opts:["Economic growth", "Income inequality", "Unemployment", "Trade balance"],ans:1,category:"Economics"},
  {q:"What is a \'recession\' defined as?",opts:["1 quarter of negative growth", "2 consecutive quarters of negative GDP growth", "A fall in stock markets", "High unemployment"],ans:1,category:"Economics"},
  {q:"Which country joined the BRICS group at the start of 2024?",opts:["Indonesia", "Saudi Arabia", "Nigeria", "Ethiopia"],ans:3,category:"Economics"},
  {q:"Cryptocurrency uses which technology as its backbone?",opts:["Cloud computing", "Blockchain", "Artificial intelligence", "Quantum computing"],ans:1,category:"Economics"},
  {q:"Which US stock exchange is the largest by market capitalisation?",opts:["NASDAQ", "AMEX", "NYSE", "Chicago Board"],ans:2,category:"Economics"},
  {q:"What does \'fiscal policy\' refer to?",opts:["Central bank interest rates", "Government spending and taxation", "Trade regulations", "Currency management"],ans:1,category:"Economics"},
  {q:"Which country introduced the world\'s first carbon tax?",opts:["Germany", "Sweden", "Canada", "New Zealand"],ans:1,category:"Economics"},
  {q:"Adam Smith\'s famous book on free markets is called what?",opts:["Das Kapital", "The General Theory", "The Wealth of Nations", "Principles of Economics"],ans:2,category:"Economics"},
  {q:"What is \'microeconomics\' concerned with?",opts:["National economies", "Global trade", "Individual and firm decisions", "Government policy only"],ans:2,category:"Economics"},
  {q:"The World Trade Organization (WTO) was founded in which year?",opts:["1945", "1960", "1975", "1995"],ans:3,category:"Economics"},
  {q:"Which country has the most billionaires (2024)?",opts:["China", "India", "Germany", "USA"],ans:3,category:"Economics"},
  {q:"What does \'ROI\' stand for in business?",opts:["Rate of Inflation", "Return on Investment", "Range of Income", "Revenue Over Interest"],ans:1,category:"Economics"},
  {q:"Which architectural style features pointed arches and flying buttresses?",opts:["Romanesque", "Renaissance", "Gothic", "Baroque"],ans:2,category:"Architecture"},
  {q:"The Sagrada Familia cathedral is located in which city?",opts:["Madrid", "Valencia", "Barcelona", "Seville"],ans:2,category:"Architecture"},
  {q:"Who designed the Eiffel Tower?",opts:["Gustave Eiffel", "Le Corbusier", "Georges Hausmann", "Hector Guimard"],ans:0,category:"Architecture"},
  {q:"The Parthenon was built in which architectural order?",opts:["Ionic", "Doric", "Corinthian", "Tuscan"],ans:1,category:"Architecture"},
  {q:"Which architect designed the Guggenheim Museum Bilbao?",opts:["Zaha Hadid", "Renzo Piano", "Frank Gehry", "I.M. Pei"],ans:2,category:"Architecture"},
  {q:"In which city is the Burj Khalifa, the world\'s tallest building?",opts:["Abu Dhabi", "Riyadh", "Dubai", "Doha"],ans:2,category:"Architecture"},
  {q:"The ancient Petra city was carved from rock in which modern country?",opts:["Israel", "Egypt", "Jordan", "Saudi Arabia"],ans:2,category:"Architecture"},
  {q:"Which material was most commonly used in Roman aqueducts?",opts:["Wood", "Brick and concrete", "Marble", "Iron"],ans:1,category:"Architecture"},
  {q:"Who designed the Sydney Opera House?",opts:["Frank Lloyd Wright", "Oscar Niemeyer", "Jorn Utzon", "Harry Seidler"],ans:2,category:"Architecture"},
  {q:"The Hagia Sophia was originally built as what?",opts:["Mosque", "Synagogue", "Cathedral", "Palace"],ans:2,category:"Architecture"},
  {q:"Art Deco architecture is most associated with which decade?",opts:["1900s", "1920s-1930s", "1950s", "1970s"],ans:1,category:"Architecture"},
  {q:"Which skyscraper held the title of world\'s tallest building from 1931 to 1970?",opts:["Chrysler Building", "Woolworth Building", "Empire State Building", "One World Trade Center"],ans:2,category:"Architecture"},
  {q:"The ancient city of Angkor Wat is a temple complex in which country?",opts:["Thailand", "Myanmar", "Cambodia", "Laos"],ans:2,category:"Architecture"},
  {q:"Which architectural feature distributes a building\'s weight outward and down?",opts:["Buttress", "Arch", "Lintel", "Vault"],ans:0,category:"Architecture"},
  {q:"Fallingwater, a famous modern house cantilevered over a waterfall, was designed by whom?",opts:["Mies van der Rohe", "Walter Gropius", "Frank Lloyd Wright", "Louis Sullivan"],ans:2,category:"Architecture"},
  {q:"The Colosseum in Rome could hold approximately how many spectators?",opts:["10,000", "30,000", "50,000", "100,000"],ans:2,category:"Architecture"},
  {q:"Which country is home to the ancient city of Machu Picchu?",opts:["Bolivia", "Ecuador", "Peru", "Colombia"],ans:2,category:"Architecture"},
  {q:"The Louvre Pyramid entrance was designed by which architect?",opts:["Frank Gehry", "Renzo Piano", "I.M. Pei", "Norman Foster"],ans:2,category:"Architecture"},
  {q:"Which US city is famous for its unique shotgun houses?",opts:["New York", "Chicago", "New Orleans", "San Francisco"],ans:2,category:"Architecture"},
  {q:"The Bauhaus design school was founded in which country?",opts:["France", "Germany", "Austria", "Switzerland"],ans:1,category:"Architecture"},
  {q:"Who wrote \'Brave New World\'?",opts:["George Orwell", "Ray Bradbury", "Aldous Huxley", "H.G. Wells"],ans:2,category:"Literature"},
  {q:"Which Shakespeare play features the line \'To be or not to be\'?",opts:["Macbeth", "King Lear", "Othello", "Hamlet"],ans:3,category:"Literature"},
  {q:"Who created the fictional detective Hercule Poirot?",opts:["Dorothy Sayers", "Agatha Christie", "Ngaio Marsh", "Ruth Rendell"],ans:1,category:"Literature"},
  {q:"\'Anna Karenina\' was written by which author?",opts:["Dostoevsky", "Turgenev", "Chekhov", "Tolstoy"],ans:3,category:"Literature"},
  {q:"The Booker Prize is awarded for fiction written in which language?",opts:["French", "Spanish", "English", "German"],ans:2,category:"Literature"},
  {q:"Who wrote \'The Alchemist\', the bestselling novel about following your dreams?",opts:["Jorge Amado", "Gabriel Garcia Marquez", "Paulo Coelho", "Isabel Allende"],ans:2,category:"Literature"},
  {q:"\'Ulysses\', considered one of the greatest modernist novels, was written by whom?",opts:["T.S. Eliot", "Virginia Woolf", "James Joyce", "D.H. Lawrence"],ans:2,category:"Literature"},
  {q:"Which author created the character Bilbo Baggins?",opts:["C.S. Lewis", "J.R.R. Tolkien", "George MacDonald", "E.R. Eddison"],ans:1,category:"Literature"},
  {q:"Emily Dickinson was primarily known as what type of writer?",opts:["Novelist", "Playwright", "Poet", "Short story writer"],ans:2,category:"Literature"},
  {q:"Who wrote \'The Canterbury Tales\'?",opts:["Geoffrey Chaucer", "William Langland", "Thomas Malory", "John Gower"],ans:0,category:"Literature"},
  {q:"\'Midnight\'s Children\' was written by which author?",opts:["Vikram Seth", "Salman Rushdie", "Arundhati Roy", "Amitav Ghosh"],ans:1,category:"Literature"},
  {q:"Which dystopian novel by Margaret Atwood features the Republic of Gilead?",opts:["Oryx and Crake", "The Blind Assassin", "The Handmaid's Tale", "Alias Grace"],ans:2,category:"Literature"},
  {q:"Who wrote \'In Search of Lost Time\' (À la recherche du temps perdu)?",opts:["Gustave Flaubert", "Marcel Proust", "Émile Zola", "Victor Hugo"],ans:1,category:"Literature"},
  {q:"\'Beloved\', a Pulitzer Prize winning novel, was written by whom?",opts:["Alice Walker", "Toni Morrison", "Maya Angelou", "Zora Neale Hurston"],ans:1,category:"Literature"},
  {q:"Which ancient epic poem follows the hero Gilgamesh?",opts:["Beowulf", "Mahabharata", "Epic of Gilgamesh", "Iliad"],ans:2,category:"Literature"},
  {q:"Who wrote \'The Trial\' and \'The Metamorphosis\'?",opts:["Thomas Mann", "Franz Kafka", "Stefan Zweig", "Robert Musil"],ans:1,category:"Literature"},
  {q:"\'The Hitchhiker\'s Guide to the Galaxy\' was written by whom?",opts:["Terry Pratchett", "Neil Gaiman", "Douglas Adams", "Kurt Vonnegut"],ans:2,category:"Literature"},
  {q:"Which Shakespeare play features the character Shylock?",opts:["Othello", "The Merchant of Venice", "The Taming of the Shrew", "Much Ado About Nothing"],ans:1,category:"Literature"},
  {q:"Who wrote \'Invisible Man\' (1952) about Black American experience?",opts:["James Baldwin", "Richard Wright", "Ralph Ellison", "Langston Hughes"],ans:2,category:"Literature"},
  {q:"\'Lolita\' is a controversial novel written by which author?",opts:["Vladimir Nabokov", "Milan Kundera", "Albert Camus", "Henry Miller"],ans:0,category:"Literature"},
  {q:"Who wrote \'Les Misérables\'?",opts:["Émile Zola", "Alexandre Dumas", "Honoré de Balzac", "Victor Hugo"],ans:3,category:"Literature"},
  {q:"\'The Sun Also Rises\' was written by which American author?",opts:["Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "John Steinbeck"],ans:1,category:"Literature"},
  {q:"Who wrote \'Sense and Sensibility\'?",opts:["George Eliot", "Jane Austen", "Charlotte Bronte", "Elizabeth Gaskell"],ans:1,category:"Literature"},
  {q:"\'Doctor Zhivago\' was written by which Russian author?",opts:["Tolstoy", "Dostoevsky", "Boris Pasternak", "Mikhail Bulgakov"],ans:2,category:"Literature"},
  {q:"Which children\'s book features a rabbit called Peter?",opts:["Watership Down", "The Tale of Peter Rabbit", "Velveteen Rabbit", "Fantastic Mr Fox"],ans:1,category:"Literature"},
  {q:"Who wrote \'The Count of Monte Cristo\'?",opts:["Victor Hugo", "Jules Verne", "Alexandre Dumas", "Stendhal"],ans:2,category:"Literature"},
  {q:"\'Siddhartha\' was written by which author exploring Buddhist themes?",opts:["Rabindranath Tagore", "Hermann Hesse", "Thomas Mann", "Stefan Zweig"],ans:1,category:"Literature"},
  {q:"The Pulitzer Prize is awarded for achievements in which country?",opts:["UK", "USA", "France", "Germany"],ans:1,category:"Literature"},
  {q:"Who wrote \'Gulliver\'s Travels\'?",opts:["Daniel Defoe", "Henry Fielding", "Jonathan Swift", "Lawrence Sterne"],ans:2,category:"Literature"},
  {q:"Which South American author wrote \'The House of the Spirits\'?",opts:["Isabela Allende", "Gabriela Mistral", "Mario Vargas Llosa", "Octavio Paz"],ans:0,category:"Literature"},
  {q:"What sport is played at the US Masters Tournament?",opts:["Tennis", "Golf", "Motor racing", "Polo"],ans:1,category:"Sport"},
  {q:"Snooker originated in which country?",opts:["England", "Scotland", "Ireland", "India"],ans:3,category:"Sport"},
  {q:"The Ryder Cup is a biennial golf competition between the USA and whom?",opts:["UK", "Australia", "Europe", "Rest of World"],ans:2,category:"Sport"},
  {q:"Which athlete won the 800m gold at Paris 2024 Olympics?",opts:["David Rudisha", "Emmanuel Korir", "Emmanuel Wanyonyi", "Marco Arop"],ans:2,category:"Sport"},
  {q:"In Formula 1, how many constructors\' championships has Ferrari won?",opts:["8", "10", "12", "16"],ans:3,category:"Sport"},
  {q:"Which country won the Women\'s FIFA World Cup in 2023?",opts:["USA", "England", "Spain", "Germany"],ans:2,category:"Sport"},
  {q:"What is the length of an Olympic swimming pool?",opts:["25m", "50m", "75m", "100m"],ans:1,category:"Sport"},
  {q:"Which nation has won the most Rugby World Cups?",opts:["Australia", "England", "New Zealand", "South Africa"],ans:2,category:"Sport"},
  {q:"At the Paris Olympics 2024, which country topped the gold medal count?",opts:["USA", "China", "France", "Australia"],ans:0,category:"Sport"},
  {q:"In chess, which piece can only move diagonally?",opts:["Rook", "Knight", "Bishop", "Queen"],ans:2,category:"Sport"},
  {q:"What is the highest break possible in a single snooker frame?",opts:["147", "150", "155", "159"],ans:0,category:"Sport"},
  {q:"Which sport uses the term \'love-fifteen\'?",opts:["Badminton", "Squash", "Tennis", "Table tennis"],ans:2,category:"Sport"},
  {q:"Decathlon consists of how many events?",opts:["7", "8", "10", "12"],ans:2,category:"Sport"},
  {q:"Which nation has won the Cricket World Cup (ODI) the most times?",opts:["West Indies", "Australia", "India", "England"],ans:1,category:"Sport"},
  {q:"What is the maximum weight for a boxing heavyweight championship fight?",opts:["There is no maximum", "Over 200 lbs", "Over 175 lbs", "Over 154 lbs"],ans:0,category:"Sport"},
  {q:"Who won Wimbledon Men\'s Singles in 2024?",opts:["Novak Djokovic", "Carlos Alcaraz", "Jannik Sinner", "Daniil Medvedev"],ans:1,category:"Sport"},
  {q:"In basketball, how many points is a three-pointer worth?",opts:["2", "3", "4", "5"],ans:1,category:"Sport"},
  {q:"The Superbowl is the championship of which American sport?",opts:["Basketball", "Baseball", "American football", "Ice hockey"],ans:2,category:"Sport"},
  {q:"Which martial art translates to \'gentle way\' in Japanese?",opts:["Karate", "Taekwondo", "Judo", "Kung fu"],ans:2,category:"Sport"},
  {q:"Carlos Sainz won which famous off-road race in January 2024?",opts:["Silk Way Rally", "Baja 1000", "Dakar Rally", "Nürburgring 24h"],ans:2,category:"Sport"},
  {q:"What is the standard height of a basketball hoop?",opts:["8 feet", "9 feet", "10 feet", "11 feet"],ans:2,category:"Sport"},
  {q:"In which sport would you perform an Axel jump?",opts:["Gymnastics", "Ice skating", "Diving", "Skiing"],ans:1,category:"Sport"},
  {q:"The Bledisloe Cup is contested by Australia and which nation?",opts:["South Africa", "British Isles", "New Zealand", "Argentina"],ans:2,category:"Sport"},
  {q:"How many players are in a polo team?",opts:["2", "4", "6", "8"],ans:1,category:"Sport"},
  {q:"What is the term for scoring three goals in a row by one player in football?",opts:["Hat-trick", "Turkey", "Triple", "Treble"],ans:0,category:"Sport"},
  {q:"Which city hosted the 2022 FIFA World Cup?",opts:["Dubai", "Doha (Qatar)", "Riyadh", "Abu Dhabi"],ans:1,category:"Sport"},
  {q:"In rowing, what does \'sculling\' mean?",opts:["Standing up", "Each rower uses two oars", "Steering only", "Rowing backwards"],ans:1,category:"Sport"},
  {q:"Leon Marchand won four individual golds at Paris 2024 in which sport?",opts:["Athletics", "Gymnastics", "Swimming", "Cycling"],ans:2,category:"Sport"},
  {q:"Which team sport uses a broom and a circular stone?",opts:["Bocce", "Bowls", "Curling", "Pétanque"],ans:2,category:"Sport"},
  {q:"How long is a standard marathon in kilometres (approximately)?",opts:["40km", "42.2km", "45km", "48km"],ans:1,category:"Sport"},
  {q:"Which country is the world\'s largest producer of coffee?",opts:["Colombia", "Vietnam", "Ethiopia", "Brazil"],ans:3,category:"Food & Nutrition"},
  {q:"What is the main ingredient of tahini?",opts:["Walnuts", "Almonds", "Sesame seeds", "Sunflower seeds"],ans:2,category:"Food & Nutrition"},
  {q:"Tempura is a style of cooking associated with which country?",opts:["China", "Thailand", "Japan", "South Korea"],ans:2,category:"Food & Nutrition"},
  {q:"Which spice gives turmeric its bright yellow colour?",opts:["Curcumin", "Saffronin", "Capsaicin", "Flavonoid"],ans:0,category:"Food & Nutrition"},
  {q:"What type of pastry is used to make a traditional croissant?",opts:["Shortcrust", "Filo", "Choux", "Puff/laminated dough"],ans:3,category:"Food & Nutrition"},
  {q:"Gouda and Edam are cheeses originating from which country?",opts:["Belgium", "Denmark", "Netherlands", "Germany"],ans:2,category:"Food & Nutrition"},
  {q:"Which vitamin is found in eggs that helps brain function?",opts:["Vitamin K", "Choline (related to B)", "Vitamin A", "Vitamin E"],ans:1,category:"Food & Nutrition"},
  {q:"What is the traditional Italian dish \'risotto\' made from?",opts:["Pasta", "Polenta", "Rice", "Barley"],ans:2,category:"Food & Nutrition"},
  {q:"Sriracha hot sauce originates from which country?",opts:["Mexico", "India", "USA", "Thailand"],ans:3,category:"Food & Nutrition"},
  {q:"Which fruit is botanically a berry but commonly not called one?",opts:["Strawberry", "Raspberry", "Banana", "Cherry"],ans:2,category:"Food & Nutrition"},
  {q:"Mole sauce, containing chocolate and chilis, is a dish from which country?",opts:["Brazil", "Mexico", "Spain", "Peru"],ans:1,category:"Food & Nutrition"},
  {q:"What does \'al dente\' mean in pasta cooking?",opts:["Very soft", "Fully cooked", "Firm to the bite", "Overcooked"],ans:2,category:"Food & Nutrition"},
  {q:"Which country produces the most olive oil?",opts:["Greece", "Italy", "Tunisia", "Spain"],ans:3,category:"Food & Nutrition"},
  {q:"Yerba mate is a caffeinated drink popular in which region?",opts:["West Africa", "South Asia", "South America", "Southeast Asia"],ans:2,category:"Food & Nutrition"},
  {q:"What is \'umami\', often called the fifth taste?",opts:["Sweet", "Savoury/meaty", "Bitter", "Sour"],ans:1,category:"Food & Nutrition"},
  {q:"Which ancient grain was a staple of the Inca civilisation?",opts:["Wheat", "Rice", "Quinoa", "Barley"],ans:2,category:"Food & Nutrition"},
  {q:"What is the main ingredient of a traditional French bouillabaisse?",opts:["Chicken", "Seafood", "Vegetables", "Lamb"],ans:1,category:"Food & Nutrition"},
  {q:"Which country is famous for peri-peri chicken?",opts:["Nigeria", "South Africa", "Mozambique", "Kenya"],ans:1,category:"Food & Nutrition"},
  {q:"Baklava is a sweet pastry originating from which cuisine?",opts:["Greek only", "Turkish/Middle Eastern", "Lebanese only", "Persian"],ans:1,category:"Food & Nutrition"},
  {q:"What is the process of preserving food in vinegar or brine called?",opts:["Fermenting", "Smoking", "Pickling", "Curing"],ans:2,category:"Food & Nutrition"},
  {q:"Which animal has the strongest bite force on Earth?",opts:["Great white shark", "Saltwater crocodile", "Hippopotamus", "Hyena"],ans:1,category:"Nature"},
  {q:"What percentage of all species on Earth are insects (approximately)?",opts:["20%", "40%", "60%", "80%"],ans:2,category:"Nature"},
  {q:"The pitcher plant is famous for being what?",opts:["The fastest growing plant", "A carnivorous plant", "The tallest plant", "A flowering desert plant"],ans:1,category:"Nature"},
  {q:"Which bird migrates the longest distance annually?",opts:["Monarch butterfly", "Arctic tern", "Bar-tailed godwit", "Albatross"],ans:1,category:"Nature"},
  {q:"What is the name for a group of fish swimming together?",opts:["Pod", "Shoal/School", "Colony", "Pack"],ans:1,category:"Nature"},
  {q:"Which tree is known to be the oldest living organism, some over 5,000 years?",opts:["Baobab", "Giant sequoia", "Bristlecone pine", "Olive"],ans:2,category:"Nature"},
  {q:"How do spiders primarily kill their prey?",opts:["Constriction", "Venom injection", "Suffocation in web", "Crushing"],ans:1,category:"Nature"},
  {q:"Which is the world\'s most venomous snake?",opts:["Black mamba", "King cobra", "Inland taipan", "Russell's viper"],ans:2,category:"Nature"},
  {q:"What is the gestation period of an elephant (approximately)?",opts:["9 months", "12 months", "18 months", "22 months"],ans:3,category:"Nature"},
  {q:"Which ocean phenomenon refers to the periodic warming of Pacific surface waters?",opts:["La Niña", "Indian Dipole", "El Niño", "Monsoon cycle"],ans:2,category:"Nature"},
  {q:"What colour is a polar bear\'s skin under its white fur?",opts:["Pink", "White", "Grey", "Black"],ans:3,category:"Nature"},
  {q:"Which mammal is the only one that cannot jump?",opts:["Hippopotamus", "Elephant", "Rhinoceros", "Sloth"],ans:1,category:"Nature"},
  {q:"Trees communicate with each other partly through which underground network?",opts:["Root chemicals only", "Mycorrhizal fungal network", "Underground streams", "Electrical signals"],ans:1,category:"Nature"},
  {q:"How long can a tardigrade (water bear) survive without water?",opts:["Days", "Weeks", "Months", "Decades"],ans:3,category:"Nature"},
  {q:"What is the wingspan of the Wandering Albatross (largest of any bird)?",opts:["2.0m", "2.5m", "3.0m", "3.5m"],ans:2,category:"Nature"},
  {q:"Which type of forest stores the most carbon per acre?",opts:["Tropical rainforest", "Temperate deciduous", "Boreal/Taiga", "Mangrove"],ans:0,category:"Nature"},
  {q:"What is the term for animals that are active at dawn and dusk?",opts:["Nocturnal", "Diurnal", "Crepuscular", "Seasonal"],ans:2,category:"Nature"},
  {q:"Which insect produces honey other than bees?",opts:["Ants", "Wasps", "Hornets", "Flies"],ans:1,category:"Nature"},
  {q:"How fast can a peregrine falcon dive (approximately)?",opts:["150 kph", "240 kph", "320 kph", "390 kph"],ans:2,category:"Nature"},
  {q:"Which South American rodent is the world\'s largest?",opts:["Nutria", "Beaver", "Capybara", "Patagonian mara"],ans:2,category:"Nature"},
  {q:"Wildebeest migrate between Tanzania and which country?",opts:["Uganda", "Kenya", "Mozambique", "Ethiopia"],ans:1,category:"Nature"},
  {q:"What is the world\'s most poisonous frog called?",opts:["Red dart frog", "Blue poison frog", "Golden poison dart frog", "Strawberry frog"],ans:2,category:"Nature"},
  {q:"Which animal has the largest brain relative to body size?",opts:["Dolphin", "Chimpanzee", "Human", "Sperm whale"],ans:2,category:"Nature"},
  {q:"What is the primary material that makes up a bird\'s feathers?",opts:["Chitin", "Cellulose", "Keratin", "Collagen"],ans:2,category:"Nature"},
  {q:"A \'murder\' is the collective noun for a group of which bird?",opts:["Ravens", "Crows", "Magpies", "Rooks"],ans:1,category:"Nature"},
  {q:"Which reptile can change colour to match its surroundings?",opts:["Gecko", "Iguana", "Chameleon", "Skink"],ans:2,category:"Nature"},
  {q:"Which fish can generate electric fields to navigate and stun prey?",opts:["Anglerfish", "Electric ray", "Electric eel", "Stonefish"],ans:2,category:"Nature"},
  {q:"How many eyes does a bee have?",opts:["2", "3", "5", "8"],ans:2,category:"Nature"},
  {q:"What is the name for a animal that hibernates through summer due to heat?",opts:["Hibernator", "Aestivator", "Torpor animal", "Diapause organism"],ans:1,category:"Nature"},
  {q:"Which animal can live for up to 500 years and is among the longest-lived?",opts:["Giant tortoise", "Greenland shark", "Bowhead whale", "Ocean quahog clam"],ans:1,category:"Nature"},
  {q:"Which classical composer wrote the opera \'The Magic Flute\'?",opts:["Beethoven", "Haydn", "Mozart", "Schubert"],ans:2,category:"Music"},
  {q:"What is the fastest tempo marking in music?",opts:["Allegro", "Presto", "Vivace", "Prestissimo"],ans:3,category:"Music"},
  {q:"Which rapper has won the most Grammy Awards?",opts:["Jay-Z", "Eminem", "Kanye West", "Kendrick Lamar"],ans:0,category:"Music"},
  {q:"Jazz music originated in which US city?",opts:["Chicago", "New York", "Memphis", "New Orleans"],ans:3,category:"Music"},
  {q:"What does \'forte\' mean in musical notation?",opts:["Soft", "Very soft", "Loud", "Very loud"],ans:2,category:"Music"},
  {q:"The Grammy Award for Album of the Year 2024 went to which artist?",opts:["Beyonce", "Taylor Swift", "Billie Eilish", "SZA"],ans:1,category:"Music"},
  {q:"Which metal band is known for lead singer Ozzy Osbourne?",opts:["Metallica", "Iron Maiden", "Black Sabbath", "Judas Priest"],ans:2,category:"Music"},
  {q:"Samba music and dance originated in which country?",opts:["Cuba", "Colombia", "Brazil", "Argentina"],ans:2,category:"Music"},
  {q:"Which instrument is Yo-Yo Ma famous for playing?",opts:["Violin", "Viola", "Cello", "Double bass"],ans:2,category:"Music"},
  {q:"The \'Moonlight Sonata\' was composed by whom?",opts:["Chopin", "Schubert", "Beethoven", "Liszt"],ans:2,category:"Music"},
  {q:"What musical term describes gradually getting louder?",opts:["Decrescendo", "Diminuendo", "Crescendo", "Fortissimo"],ans:2,category:"Music"},
  {q:"Which female artist released the album \'Renaissance\' in 2022?",opts:["Taylor Swift", "Rihanna", "Beyonce", "Adele"],ans:2,category:"Music"},
  {q:"Bluegrass music is associated with which part of the USA?",opts:["Deep South", "Appalachian region", "Pacific Northwest", "Midwest"],ans:1,category:"Music"},
  {q:"Which legendary rock band features Mick Jagger and Keith Richards?",opts:["The Beatles", "The Doors", "The Rolling Stones", "Led Zeppelin"],ans:2,category:"Music"},
  {q:"What does a conductor\'s baton control?",opts:["Volume only", "Tempo and expression", "Harmony", "Lyrics"],ans:1,category:"Music"},
  {q:"Which Scandinavian country produced ABBA?",opts:["Norway", "Denmark", "Finland", "Sweden"],ans:3,category:"Music"},
  {q:"\'Clair de Lune\' is a famous piece by which French composer?",opts:["Ravel", "Saint-Saens", "Debussy", "Chopin"],ans:2,category:"Music"},
  {q:"Which legendary blues guitarist was known as \'The King of the Blues\'?",opts:["Robert Johnson", "Muddy Waters", "BB King", "Howlin Wolf"],ans:2,category:"Music"},
  {q:"What is a \'capella\' music?",opts:["Singing with full orchestra", "Singing with piano only", "Singing without instrumental accompaniment", "Outdoor music"],ans:2,category:"Music"},
  {q:"Which country gave the world opera as an art form?",opts:["France", "Germany", "Italy", "Austria"],ans:2,category:"Music"},
  {q:"Who is the head of government in the United Kingdom?",opts:["The Monarch", "Prime Minister", "Lord Chancellor", "Speaker of the House"],ans:1,category:"Politics"},
  {q:"Which country has a constitution written in 1787, making it the oldest still in use?",opts:["France", "UK", "USA", "Australia"],ans:2,category:"Politics"},
  {q:"What is the term for a government ruled by a small elite group?",opts:["Democracy", "Oligarchy", "Theocracy", "Autocracy"],ans:1,category:"Politics"},
  {q:"Which country has the world\'s oldest parliament (Althing, founded 930 AD)?",opts:["England", "Denmark", "Iceland", "Norway"],ans:2,category:"Politics"},
  {q:"The Eurozone is made up of EU countries that use which currency?",opts:["The Pound", "The Euro", "The ECU", "The Frank"],ans:1,category:"Politics"},
  {q:"What does \'veto\' mean in political terms?",opts:["Vote for a law", "Reject or block a law", "Propose legislation", "Debate a law"],ans:1,category:"Politics"},
  {q:"Emmanuel Macron is the president of which country?",opts:["Belgium", "Luxembourg", "Canada", "France"],ans:3,category:"Politics"},
  {q:"Which political ideology generally favours free markets and limited government?",opts:["Socialism", "Communism", "Liberalism (classical)/Conservatism", "Anarchism"],ans:2,category:"Politics"},
  {q:"The G20 brings together the leaders of approximately how many countries and bodies?",opts:["10", "15", "20", "25"],ans:2,category:"Politics"},
  {q:"Narendra Modi is the Prime Minister of which country?",opts:["Pakistan", "Sri Lanka", "Bangladesh", "India"],ans:3,category:"Politics"},
  {q:"What does \'IoT\' stand for?",opts:["Internet of Things", "Integration of Technology", "Index of Tech", "Internal Operations Tracking"],ans:0,category:"Technology"},
  {q:"Which company makes the Galaxy smartphone series?",opts:["Apple", "Huawei", "Sony", "Samsung"],ans:3,category:"Technology"},
  {q:"What does \'5G\' refer to in telecommunications?",opts:["Fifth Generation wireless", "Five gigabytes", "Fifth grade technology", "Five giga-hertz"],ans:0,category:"Technology"},
  {q:"Which programming language is most used for web front-end development?",opts:["Python", "Java", "JavaScript", "C++"],ans:2,category:"Technology"},
  {q:"Who founded Tesla alongside Elon Musk (among others)?",opts:["Peter Thiel", "Martin Eberhard", "Reid Hoffman", "Larry Page"],ans:1,category:"Technology"},
  {q:"What is \'open source\' software?",opts:["Free software with public source code", "Software without bugs", "Government software", "Software for scientists"],ans:0,category:"Technology"},
  {q:"Which tech giant operates the cloud platform AWS?",opts:["Google", "Microsoft", "Apple", "Amazon"],ans:3,category:"Technology"},
  {q:"What is the primary function of a \'firewall\' in computing?",opts:["Speed up internet", "Block unauthorised access", "Store data", "Display graphics"],ans:1,category:"Technology"},
  {q:"Which country is home to the tech companies Alibaba and Tencent?",opts:["Japan", "South Korea", "India", "China"],ans:3,category:"Technology"},
  {q:"What does \'URL\' stand for?",opts:["Universal Reference Locator", "Uniform Resource Locator", "Unique Record Link", "Universal Resource Link"],ans:1,category:"Technology"},
  {q:"In which decade was the first commercial smartphone introduced?",opts:["1980s", "1990s", "2000s", "2010s"],ans:2,category:"Technology"},
  {q:"What is \'machine learning\'?",opts:["Robots learning to walk", "AI systems learning from data patterns", "Mechanical automation", "Computer programming"],ans:1,category:"Technology"},
  {q:"Which protocol secures websites (shown as HTTPS)?",opts:["FTP", "SSL/TLS", "HTTP", "SMTP"],ans:1,category:"Technology"},
  {q:"Who co-founded Google with Sergey Brin?",opts:["Elon Musk", "Mark Zuckerberg", "Larry Page", "Jeff Bezos"],ans:2,category:"Technology"},
  {q:"What is \'phishing\' in cybersecurity?",opts:["Hacking servers", "Deceiving users into revealing credentials", "Installing malware", "Stealing physical hardware"],ans:1,category:"Technology"},
  {q:"Which company created the Swift programming language?",opts:["Google", "Microsoft", "Apple", "Meta"],ans:2,category:"Technology"},
  {q:"What is the purpose of a VPN?",opts:["Speed up internet", "Create encrypted private network connections", "Boost WiFi signal", "Store passwords"],ans:1,category:"Technology"},
  {q:"Which social media platform is most popular in China (domestic equivalent)?",opts:["Weibo/WeChat", "TikTok (export version)", "Baidu", "Taobao"],ans:0,category:"Technology"},
  {q:"Moore\'s Law predicted transistor count would double approximately every how many years?",opts:["1", "2", "4", "5"],ans:1,category:"Technology"},
  {q:"What is \'RAM\' in a computer?",opts:["Random Access Memory", "Read and Activate Module", "Rapid Allocation Memory", "Remote Access Manager"],ans:0,category:"Technology"},
  {q:"Which company developed the Java programming language?",opts:["Microsoft", "Apple", "Sun Microsystems", "IBM"],ans:2,category:"Technology"},
  {q:"What does \'the cloud\' refer to in technology?",opts:["Weather prediction software", "Online data storage and computing services", "A type of network cable", "Wireless internet"],ans:1,category:"Technology"},
  {q:"Which AI model, developed by Google DeepMind, beat world champions at the board game Go?",opts:["Watson", "AlphaGo", "GPT-4", "Gemini"],ans:1,category:"Technology"},
  {q:"What is \'augmented reality\' (AR)?",opts:["Fully virtual environments", "Digital elements overlaid on the real world", "A type of VR headset", "3D cinema"],ans:1,category:"Technology"},
  {q:"What term describes software that locks your files and demands payment?",opts:["Spyware", "Adware", "Ransomware", "Trojan"],ans:2,category:"Technology"},
  {q:"Which organ produces red blood cells?",opts:["Liver", "Spleen", "Bone marrow", "Kidneys"],ans:2,category:"Health"},
  {q:"What does \'HDL\' cholesterol stand for?",opts:["High Density Lipoprotein", "Hard Dense Lipid", "Heavy Dietary Lipid", "High Dietary Level"],ans:0,category:"Health"},
  {q:"Which disease is caused by a deficiency of Vitamin D?",opts:["Scurvy", "Rickets", "Pellagra", "Beriberi"],ans:1,category:"Health"},
  {q:"The cornea is part of which sense organ?",opts:["Ear", "Nose", "Eye", "Tongue"],ans:2,category:"Health"},
  {q:"How many calories are in one gram of fat?",opts:["4", "7", "9", "11"],ans:2,category:"Health"},
  {q:"What is the medical term for low blood sugar?",opts:["Hyperglycaemia", "Hypoglycaemia", "Hypotension", "Hypertension"],ans:1,category:"Health"},
  {q:"Which blood vessel carries blood away from the heart?",opts:["Vein", "Capillary", "Artery", "Venule"],ans:2,category:"Health"},
  {q:"What is the largest joint in the human body?",opts:["Hip", "Shoulder", "Elbow", "Knee"],ans:3,category:"Health"},
  {q:"How many vertebrae does the human spine have?",opts:["24", "33", "42", "36"],ans:1,category:"Health"},
  {q:"Which test measures electrical activity of the heart?",opts:["EEG", "MRI", "ECG", "CT scan"],ans:2,category:"Health"},
  {q:"What is \'tinnitus\'?",opts:["Ringing in the ears", "Blurred vision", "Numbness in hands", "Difficulty swallowing"],ans:0,category:"Health"},
  {q:"Which vitamin helps blood clotting?",opts:["Vitamin A", "Vitamin C", "Vitamin E", "Vitamin K"],ans:3,category:"Health"},
  {q:"What is the sum of angles in a quadrilateral?",opts:["180°", "270°", "360°", "450°"],ans:2,category:"Mathematics"},
  {q:"What is 15% of 80?",opts:["8", "10", "12", "15"],ans:2,category:"Mathematics"},
  {q:"Which number is neither prime nor composite?",opts:["0", "1", "2", "4"],ans:1,category:"Mathematics"},
  {q:"What is the formula for the area of a circle?",opts:["2πr", "πr²", "πd", "2πr²"],ans:1,category:"Mathematics"},
  {q:"How many faces does a cube have?",opts:["4", "5", "6", "8"],ans:2,category:"Mathematics"},
  {q:"What is the term for the distance around a circle?",opts:["Diameter", "Radius", "Circumference", "Arc"],ans:2,category:"Mathematics"},
  {q:"If a = 3 and b = 4, what is √(a²+b²)?",opts:["5", "6", "7", "8"],ans:0,category:"Mathematics"},
  {q:"What is 2 to the power of 10?",opts:["512", "1024", "2048", "256"],ans:1,category:"Mathematics"},
  {q:"What is the Roman numeral for 1000?",opts:["C", "D", "M", "L"],ans:2,category:"Mathematics"},
  {q:"What do you call a triangle with all sides equal?",opts:["Isosceles", "Scalene", "Equilateral", "Right-angled"],ans:2,category:"Mathematics"},
  {q:"What is the probability of flipping heads on a fair coin?",opts:["1/4", "1/3", "1/2", "2/3"],ans:2,category:"Mathematics"},
  {q:"What is the cube root of 27?",opts:["3", "4", "9", "6"],ans:0,category:"Mathematics"},
  {q:"The ancient Colosseum was used primarily for what?",opts:["Religious ceremonies", "Gladiatorial combat and spectacles", "Political speeches", "Trade markets"],ans:1,category:"Art & Culture"},
  {q:"Which dance style originated in the Bronx in the 1970s?",opts:["Salsa", "Hip-hop/breakdancing", "Disco", "Merengue"],ans:1,category:"Art & Culture"},
  {q:"The Uffizi Gallery is located in which Italian city?",opts:["Rome", "Venice", "Milan", "Florence"],ans:3,category:"Art & Culture"},
  {q:"Noh and Bunraku are traditional theatrical arts from which country?",opts:["China", "Korea", "Japan", "Vietnam"],ans:2,category:"Art & Culture"},
  {q:"Which festival celebrates the end of Ramadan?",opts:["Eid al-Adha", "Diwali", "Eid al-Fitr", "Holi"],ans:2,category:"Art & Culture"},
  {q:"The Aztec sun stone (calendar stone) is on display in which country?",opts:["Spain", "USA", "Mexico", "UK"],ans:2,category:"Art & Culture"},
  {q:"Which art movement features realistic dream-like imagery?",opts:["Cubism", "Impressionism", "Surrealism", "Fauvism"],ans:2,category:"Art & Culture"},
  {q:"The Bolshoi Theatre is famous for ballet and opera in which city?",opts:["St. Petersburg", "Kyiv", "Moscow", "Warsaw"],ans:2,category:"Art & Culture"},
];

const REVIEW_QS = [
  {q:"What is the chemical symbol for gold?",opts:["Go", "Gd", "Au", "Ag"],ans:2,source:"Science",articleId:1},
  {q:"What is the chemical symbol for oxygen?",opts:["O", "Ox", "Om", "On"],ans:0,source:"Science",articleId:1},
  {q:"How many bones are in the adult human body?",opts:["196", "206", "216", "226"],ans:1,source:"Science",articleId:1},
  {q:"In which year did World War II end?",opts:["1943", "1944", "1945", "1946"],ans:2,source:"History",articleId:2},
  {q:"Who was the first President of the United States?",opts:["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"],ans:2,source:"History",articleId:2},
  {q:"The Great Wall of China was primarily built to protect against invasions from which direction?",opts:["South", "East", "North", "West"],ans:2,source:"History",articleId:2},
  {q:"What is the capital of Australia?",opts:["Sydney", "Melbourne", "Canberra", "Perth"],ans:2,source:"Geography",articleId:3},
  {q:"Which is the longest river in the world?",opts:["Amazon", "Nile", "Yangtze", "Mississippi"],ans:1,source:"Geography",articleId:3},
  {q:"Which is the largest ocean on Earth?",opts:["Atlantic", "Indian", "Arctic", "Pacific"],ans:3,source:"Geography",articleId:3},
  {q:"Which planet is known as the Red Planet?",opts:["Venus", "Jupiter", "Mars", "Saturn"],ans:2,source:"Space",articleId:4},
  {q:"Which planet has the most confirmed moons (as of 2025)?",opts:["Jupiter", "Saturn", "Uranus", "Neptune"],ans:1,source:"Space",articleId:4},
  {q:"What is the closest star to Earth?",opts:["Proxima Centauri", "Sirius", "The Sun", "Alpha Centauri A"],ans:2,source:"Space",articleId:4},
  {q:"Who is known as the founder of psychoanalysis?",opts:["Carl Jung", "Sigmund Freud", "Alfred Adler", "Wilhelm Wundt"],ans:1,source:"Psychology",articleId:5},
  {q:"What is the term for an extreme and irrational fear?",opts:["Phobia", "Anxiety", "Panic disorder", "OCD"],ans:0,source:"Psychology",articleId:5},
  {q:"Pavlov\'s famous experiment with dogs demonstrated what type of learning?",opts:["Operant conditioning", "Classical conditioning", "Observational learning", "Cognitive learning"],ans:1,source:"Psychology",articleId:5},
  {q:"Who co-founded Apple alongside Steve Wozniak?",opts:["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page"],ans:1,source:"Technology",articleId:6},
  {q:"What does \'WWW\' stand for?",opts:["World Wide Web", "Web World Wide", "Wide World Web", "World Web Wave"],ans:0,source:"Technology",articleId:6},
  {q:"Who is considered the father of the World Wide Web?",opts:["Bill Gates", "Tim Berners-Lee", "Vint Cerf", "Steve Jobs"],ans:1,source:"Technology",articleId:6},
  {q:"What is the largest animal ever known to have lived?",opts:["African elephant", "Blue whale", "Megalodon", "Argentinosaurus"],ans:1,source:"Nature",articleId:7},
  {q:"Which bird is the fastest in a dive?",opts:["Golden eagle", "Peregrine falcon", "Swift", "Albatross"],ans:1,source:"Nature",articleId:7},
  {q:"How many legs does a spider have?",opts:["6", "8", "10", "12"],ans:1,source:"Nature",articleId:7},
  {q:"Who wrote \'Romeo and Juliet\'?",opts:["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],ans:1,source:"Literature",articleId:8},
  {q:"Who wrote \'Pride and Prejudice\'?",opts:["Emily Bronte", "Jane Austen", "Charlotte Bronte", "George Eliot"],ans:1,source:"Literature",articleId:8},
  {q:"Which novel begins with \'Call me Ishmael\'?",opts:["The Old Man and the Sea", "Moby-Dick", "Treasure Island", "Robinson Crusoe"],ans:1,source:"Literature",articleId:8},
  {q:"Who painted the Mona Lisa?",opts:["Michelangelo", "Leonardo da Vinci", "Raphael", "Botticelli"],ans:1,source:"Art & Culture",articleId:9},
  {q:"Who painted \'The Starry Night\'?",opts:["Claude Monet", "Vincent van Gogh", "Paul Cezanne", "Salvador Dali"],ans:1,source:"Art & Culture",articleId:9},
  {q:"Which artist co-founded the Cubist movement?",opts:["Henri Matisse", "Pablo Picasso", "Marc Chagall", "Joan Miro"],ans:1,source:"Art & Culture",articleId:9},
  {q:"Which composer wrote the \'Fifth Symphony\' with its famous four-note opening?",opts:["Mozart", "Beethoven", "Bach", "Brahms"],ans:1,source:"Music",articleId:10},
  {q:"Which band recorded the album \'Abbey Road\'?",opts:["The Rolling Stones", "The Beatles", "The Who", "Pink Floyd"],ans:1,source:"Music",articleId:10},
  {q:"Who is known as the King of Pop?",opts:["Elvis Presley", "Michael Jackson", "Prince", "Stevie Wonder"],ans:1,source:"Music",articleId:10},
  {q:"Who said \'I think, therefore I am\'?",opts:["Aristotle", "Immanuel Kant", "René Descartes", "John Locke"],ans:2,source:"Philosophy",articleId:11},
  {q:"Which ancient Greek philosopher was the teacher of Plato?",opts:["Aristotle", "Pythagoras", "Socrates", "Thales"],ans:2,source:"Philosophy",articleId:11},
  {q:"Aristotle was the tutor of which ancient conqueror?",opts:["Caesar", "Hannibal", "Alexander the Great", "Xerxes"],ans:2,source:"Philosophy",articleId:11},
  {q:"What does \'GDP\' stand for?",opts:["Gross Domestic Product", "General Domestic Price", "Global Development Plan", "Gross Development Percentage"],ans:0,source:"Economics",articleId:12},
  {q:"Which currency is used in Japan?",opts:["Won", "Yuan", "Yen", "Ringgit"],ans:2,source:"Economics",articleId:12},
  {q:"What is the currency of the United Kingdom?",opts:["Euro", "Pound sterling", "Dollar", "Franc"],ans:1,source:"Economics",articleId:12},
  {q:"Which vitamin is abundant in citrus fruits?",opts:["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],ans:2,source:"Health",articleId:13},
  {q:"How many hours of sleep are generally recommended for adults?",opts:["4-5", "5-6", "7-9", "10-12"],ans:2,source:"Health",articleId:13},
  {q:"Which nutrient is the body\'s main source of energy?",opts:["Protein", "Carbohydrates", "Vitamins", "Minerals"],ans:1,source:"Health",articleId:13},
  {q:"What is the value of pi to two decimal places?",opts:["3.12", "3.14", "3.16", "3.18"],ans:1,source:"Mathematics",articleId:14},
  {q:"What is the only even prime number?",opts:["0", "1", "2", "4"],ans:2,source:"Mathematics",articleId:14},
  {q:"How many degrees are in a triangle\'s angles combined?",opts:["90", "180", "270", "360"],ans:1,source:"Mathematics",articleId:14},
  {q:"What does CO2 stand for?",opts:["Carbon monoxide", "Carbon dioxide", "Carbon trioxide", "Cobalt dioxide"],ans:1,source:"Environment",articleId:15},
  {q:"Which gas is the primary greenhouse gas?",opts:["Oxygen", "Methane", "CO2", "Nitrous oxide"],ans:2,source:"Environment",articleId:15},
  {q:"The Paris Agreement aims to limit global warming to below how many degrees Celsius above pre-industrial levels?",opts:["1°C", "2°C", "3°C", "4°C"],ans:1,source:"Environment",articleId:15},
  {q:"Sushi originated in which country?",opts:["China", "Japan", "Korea", "Thailand"],ans:1,source:"Food & Nutrition",articleId:16},
  {q:"Which country is famous for inventing pizza?",opts:["France", "Greece", "Italy", "Spain"],ans:2,source:"Food & Nutrition",articleId:16},
  {q:"What is the main ingredient in guacamole?",opts:["Tomato", "Avocado", "Cucumber", "Pepper"],ans:1,source:"Food & Nutrition",articleId:16},
  {q:"Which architectural style features pointed arches and flying buttresses?",opts:["Romanesque", "Renaissance", "Gothic", "Baroque"],ans:2,source:"Architecture",articleId:17},
  {q:"The Sagrada Familia cathedral is located in which city?",opts:["Madrid", "Valencia", "Barcelona", "Seville"],ans:2,source:"Architecture",articleId:17},
  {q:"Who designed the Eiffel Tower?",opts:["Gustave Eiffel", "Le Corbusier", "Georges Hausmann", "Hector Guimard"],ans:0,source:"Architecture",articleId:17},
  {q:"How many players are on a soccer team on the field?",opts:["9", "10", "11", "12"],ans:2,source:"Sport",articleId:18},
  {q:"Which country has won the most FIFA World Cups?",opts:["Germany", "Argentina", "Brazil", "Italy"],ans:2,source:"Sport",articleId:18},
  {q:"In which sport would you perform a slam dunk?",opts:["Volleyball", "Basketball", "Tennis", "Handball"],ans:1,source:"Sport",articleId:18},
  {q:"How many member states does the United Nations have (approximately)?",opts:["150", "174", "193", "210"],ans:2,source:"Politics",articleId:19},
  {q:"Where is the headquarters of the United Nations?",opts:["Geneva", "New York", "Paris", "Vienna"],ans:1,source:"Politics",articleId:19},
  {q:"Which document is the supreme law of the United States?",opts:["Declaration of Independence", "The Constitution", "Bill of Rights", "Federalist Papers"],ans:1,source:"Politics",articleId:19},
  {q:"Who won the 2024 US presidential election?",opts:["Joe Biden", "Kamala Harris", "Donald Trump", "Ron DeSantis"],ans:2,source:"Current Affairs",articleId:20},
  {q:"Which city hosted the 2024 Summer Olympics?",opts:["Los Angeles", "Tokyo", "Paris", "Rome"],ans:2,source:"Current Affairs",articleId:20},
  {q:"Which famous Paris cathedral reopened in December 2024 after fire restoration?",opts:["Sacre-Coeur", "Notre-Dame", "Sainte-Chapelle", "Saint-Sulpice"],ans:1,source:"Current Affairs",articleId:20},
];

const DAILY_QS = [
  {q:"Which process produces identical copies of DNA?",opts:["Transcription", "Translation", "Replication", "Mutation"],ans:2,exp:"Category: Science. Answer: Replication."},
  {q:"Hiroshima was bombed in which year?",opts:["1943", "1944", "1945", "1946"],ans:2,exp:"Category: History. Answer: 1945."},
  {q:"What is the capital of New Zealand?",opts:["Auckland", "Christchurch", "Wellington", "Hamilton"],ans:2,exp:"Category: Geography. Answer: Wellington."},
  {q:"What is the Kyoto Protocol?",opts:["A trade deal", "An international treaty on greenhouse gas emissions", "A nuclear non-proliferation agreement", "A biodiversity convention"],ans:1,exp:"Category: Environment. Answer: An international treaty on greenhouse gas emissions."},
  {q:"Which Greek philosopher wrote \'The Republic\'?",opts:["Aristotle", "Plato", "Socrates", "Epicurus"],ans:1,exp:"Category: Literature. Answer: Plato."},
  {q:"Who wrote \'Romeo and Juliet\'?",opts:["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],ans:1,exp:"Category: Literature. Answer: William Shakespeare."},
  {q:"What is a baby kangaroo called?",opts:["Cub", "Joey", "Kit", "Calf"],ans:1,exp:"Category: Nature. Answer: Joey."},
  {q:"What is the chemical symbol for sodium?",opts:["So", "Sd", "Na", "Sm"],ans:2,exp:"Category: Science. Answer: Na."},
  {q:"The Great Barrier Reef is under threat primarily due to what?",opts:["Tourism only", "Fishing only", "Climate change and warming seas", "Oil drilling"],ans:2,exp:"Category: Environment. Answer: Climate change and warming seas."},
  {q:"Who flew the first powered aeroplane in 1903?",opts:["Charles Lindbergh", "The Wright brothers", "Amelia Earhart", "Glenn Curtiss"],ans:1,exp:"Category: History. Answer: The Wright brothers."},
];


function seededShuffle(arr, seedStr) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 2147483647;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) % 2147483647;
    const j = seed % (i + 1);
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

export default function BrainBlitz() {
  const [themeKey, setThemeKey] = useState(() => S.get("bb_theme", "light"));
  const theme = THEMES[themeKey];

  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState("home");
  const [activeArticle, setActiveArticle] = useState(null);
  const [browseCategory, setBrowseCategory] = useState(null);
  const [quizLock, setQuizLock] = useState(false);
  const [leaveModal, setLeaveModal] = useState(null);

  const [streak, setStreak] = useState(() => S.get("bb_streak", 0));
  const [learned, setLearned] = useState(() => S.get("bb_learned", []));
  const [dailyDone, setDailyDone] = useState(() => S.get("bb_daily", "") === TODAY);
  const [reviewDone, setReviewDone] = useState(() => S.get("bb_rdone", ""));
  const [xp, setXp] = useState(() => S.get("bb_xp", 0));
  const [userName, setUserName] = useState(() => S.get("bb_name", "Explorer"));
  const [photo, setPhoto] = useState(() => S.get("bb_photo", ""));
  const [userTopics, setUserTopics] = useState(() => S.get("bb_topics", CATS.map(c => c.id)));
  const [notifTime, setNotifTime] = useState(() => S.get("bb_ntime", "08:00"));
  const [readingGoal, setReadingGoal] = useState(() => S.get("bb_goal", 2));
  const [reviewFreq, setReviewFreq] = useState(() => S.get("bb_rfreq", 2));
  const [reviewOn, setReviewOn] = useState(() => S.get("bb_ron", false));
  const [quizScores, setQuizScores] = useState(() => S.get("bb_scores", []));

  useEffect(() => { if (!S.get("bb_install", null)) S.set("bb_install", Date.now()); }, []);

  const go = (s) => {
    if (quizLock) { setLeaveModal(s); return; }
    setPrevScreen(screen); setScreen(s);
  };
  const forceGo = (s) => { setQuizLock(false); setLeaveModal(null); setPrevScreen(screen); setScreen(s); };
  const goBack = () => go(prevScreen === screen ? "home" : prevScreen);

  const changeTheme = (k) => { setThemeKey(k); S.set("bb_theme", k); };
  const openArticle = (a) => { setActiveArticle(a); setPrevScreen(screen); setScreen("article"); };

  const markLearned = (id) => {
    if (learned.includes(id)) return;
    const n = [...learned, id]; setLearned(n); S.set("bb_learned", n);
    setXp(x => { const nx = x + 50; S.set("bb_xp", nx); return nx; });
  };

  const recordScore = (label, correct, total) => {
    const n = [...quizScores, { label, correct, total, date: TODAY }].slice(-7);
    setQuizScores(n); S.set("bb_scores", n);
  };

  const finishDaily = (correct) => {
    setQuizLock(false);
    setDailyDone(true); S.set("bb_daily", TODAY);
    if (S.get("bb_sdate", "") !== TODAY) {
      const ns = streak + 1; setStreak(ns); S.set("bb_streak", ns); S.set("bb_sdate", TODAY);
    }
    setXp(x => { const nx = x + correct * 30; S.set("bb_xp", nx); return nx; });
    recordScore("Daily", correct, DAILY_QS.length);
  };

  const finishReview = (correct, total) => {
    setQuizLock(false);
    setReviewDone(TODAY); S.set("bb_rdone", TODAY);
    S.set("bb_rlast", Date.now());
    setXp(x => { const nx = x + correct * 50; S.set("bb_xp", nx); return nx; });
    recordScore("Review", correct, total);
  };

  const saveProfile = (data) => {
    setUserName(data.name); S.set("bb_name", data.name);
    setPhoto(data.photo); S.set("bb_photo", data.photo);
    setUserTopics(data.topics); S.set("bb_topics", data.topics);
    setNotifTime(data.ntime); S.set("bb_ntime", data.ntime);
    setReadingGoal(data.goal); S.set("bb_goal", data.goal);
    setReviewFreq(data.rfreq); S.set("bb_rfreq", data.rfreq);
    setReviewOn(data.ron); S.set("bb_ron", data.ron);
  };

  const level = Math.floor(xp / 200) + 1;
  const learnedArticles = ARTICLES.filter(a => learned.includes(a.id));

  const suggested = (() => {
    const unread = ARTICLES.filter(a => !learned.includes(a.id) && userTopics.includes(a.category));
    return seededShuffle(unread, TODAY);
  })();

  const reviewDue = (() => {
    if (!reviewOn || learnedArticles.length === 0) return false;
    if (reviewDone === TODAY) return false;
    const last = S.get("bb_rlast", null);
    const base = last || S.get("bb_install", Date.now());
    const days = reviewFreq * 7;
    return (Date.now() - base) >= days * 24 * 60 * 60 * 1000;
  })();

  const reviewQuestions = (() => {
    const learnedCats = [...new Set(learnedArticles.map(a => a.category))];
    if (learnedCats.length === 0) return REVIEW_QS.slice(0, 15);
    const pool = QUESTION_BANK.filter(q => learnedCats.includes(q.category));
    const shuffled = seededShuffle(pool, TODAY + "rv");
    return shuffled.slice(0, 15);
  })();

  const daysUntilReview = (() => {
    if (!reviewOn) return null;
    const last = S.get("bb_rlast", null);
    const base = last || S.get("bb_install", Date.now());
    const days = reviewFreq * 7;
    const left = Math.ceil((base + days * 86400000 - Date.now()) / 86400000);
    return left > 0 ? left : 0;
  })();

  const shared = { theme, go, goBack, streak, xp, level, userName, photo, learned, learnedArticles };
  const isSub = ["article", "daily", "review", "learnings", "personalise"].includes(screen);

  const NAV = [
    { id:"home", icon:"home", label:"Home" },
    { id:"browse", icon:"browse", label:"Browse" },
    { id:"challenge", icon:"challenge", label:"Challenge" },
    { id:"progress", icon:"progress", label:"Progress" }
  ];

  return (
    <div style={{minHeight:"100vh",background:theme.bg,fontFamily:"'DM Sans',sans-serif",color:theme.text,position:"relative",overflow:"hidden"}}>
      <style>{CSS}</style>
      <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative"}}>
        <div style={{flex:1,overflowY:"auto",paddingBottom:isSub?0:78}}>
          {screen==="home" && <HomeScreen theme={theme} go={go} openArticle={openArticle} suggested={suggested} streak={streak} level={level} userName={userName} photo={photo} dailyDone={dailyDone} reviewDue={reviewDue} />}
          {screen==="browse" && <BrowseScreen theme={theme} openArticle={openArticle} learned={learned} browseCategory={browseCategory} setBrowseCategory={setBrowseCategory} />}
          {screen==="article" && activeArticle && <ArticleScreen theme={theme} goBack={goBack} article={activeArticle} learnedThis={learned.includes(activeArticle.id)} markLearned={markLearned} setQuizLock={setQuizLock} />}
          {screen==="challenge" && <ChallengeScreen theme={theme} go={go} dailyDone={dailyDone} reviewOn={reviewOn} reviewDue={reviewDue} reviewDone={reviewDone===TODAY} reviewFreq={reviewFreq} daysUntilReview={daysUntilReview} streak={streak} learnedCount={learnedArticles.length} />}
          {screen==="daily" && <DailyQuiz theme={theme} go={go} dailyDone={dailyDone} onFinish={finishDaily} streak={streak} setQuizLock={setQuizLock} />}
          {screen==="review" && <ReviewQuiz theme={theme} go={go} questions={reviewQuestions} onFinish={finishReview} setQuizLock={setQuizLock} />}
          {screen==="progress" && <ProgressScreen theme={theme} go={go} xp={xp} level={level} streak={streak} learnedArticles={learnedArticles} quizScores={quizScores} />}
          {screen==="learnings" && <LearningsScreen theme={theme} go={go} learnedArticles={learnedArticles} openArticle={openArticle} />}
          {screen==="personalise" && <PersonaliseScreen theme={theme} goBack={goBack} themeKey={themeKey} changeTheme={changeTheme} userName={userName} photo={photo} userTopics={userTopics} notifTime={notifTime} readingGoal={readingGoal} reviewFreq={reviewFreq} reviewOn={reviewOn} onSave={saveProfile} />}
        </div>
        {!isSub && (
          <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:theme.nav,borderTop:"1px solid "+theme.border,display:"flex",zIndex:100}}>
            {NAV.map(t => {
              const active = screen===t.id || (t.id==="challenge" && ["daily","review"].includes(screen));
              return (
                <button key={t.id} onClick={()=>go(t.id)} style={{flex:1,padding:"12px 0 16px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontFamily:"'DM Sans',sans-serif",position:"relative"}}>
                  <span style={{opacity:active?1:0.45,display:"flex"}}><NavIcon name={t.icon} color={active?theme.text:theme.sub} active={active} /></span>
                  <span style={{fontSize:9.5,letterSpacing:0.5,textTransform:"uppercase",color:active?theme.text:theme.sub,fontWeight:active?600:400}}>{t.label}</span>
                  {active && <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:22,height:2.5,borderRadius:2,background:theme.text}} />}
                </button>
              );
            })}
          </div>
        )}
        {leaveModal && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px"}}>
            <div style={{background:theme.card,borderRadius:20,padding:"28px 24px",maxWidth:340,width:"100%",border:"1px solid "+theme.border,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:12}}>{"\u26A0\uFE0F"}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,marginBottom:8}}>Leave the quiz?</div>
              <div style={{fontSize:14,color:theme.sub,lineHeight:1.6,marginBottom:24}}>Your progress will be lost if you leave now.</div>
              <button onClick={()=>setLeaveModal(null)} style={{width:"100%",background:theme.accent,color:theme.accentText,border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>Keep going</button>
              <button onClick={()=>forceGo(leaveModal)} style={{width:"100%",background:theme.pill,color:theme.sub,border:"1px solid "+theme.border,borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Leave anyway</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function catOf(id) { return CATS.find(c => c.id === id) || { id, icon:"\u{1F4D6}", color:"#888", bg:"rgba(136,136,136,0.12)" }; }

function CatTag({ theme, category, small }) {
  const c = catOf(category);
  return <span style={{background:c.bg,color:c.color,borderRadius:20,padding:small?"3px 9px":"4px 12px",fontSize:small?10:11,fontWeight:500,display:"inline-block"}}>{c.icon} {c.id}</span>;
}

function Avatar({ theme, photo, userName, size }) {
  const s = size || 38;
  if (photo) return <span style={{fontSize:s*0.55,lineHeight:1}}>{photo}</span>;
  return <span style={{fontSize:s*0.42,fontWeight:700,color:theme.accentText,fontFamily:"'Playfair Display',serif"}}>{userName.charAt(0).toUpperCase()}</span>;
}

function HomeScreen({ theme, go, openArticle, suggested, streak, level, userName, photo, dailyDone, reviewDue }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const hero = suggested[0] || ARTICLES[0];
  const rest = suggested.slice(1);
  return (
    <div style={{animation:"fadeUp 0.4s ease"}}>
      <div style={{padding:"26px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:27,fontWeight:900,color:theme.text}}>BrainBlitz</div>
          <div style={{fontSize:13,color:theme.sub,marginTop:3}}>{greeting}, {userName.split(" ")[0]}</div>
        </div>
        <button onClick={()=>go("personalise")} style={{width:42,height:42,borderRadius:"50%",border:"2px solid "+theme.accent,background:theme.accent,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0}}>
          <Avatar theme={theme} photo={photo} userName={userName} size={42} />
        </button>
      </div>

      <div onClick={()=>openArticle(hero)} style={{margin:"18px 20px 0",borderRadius:22,overflow:"hidden",cursor:"pointer",position:"relative"}}>
        <img src={hero.image} alt="" style={{width:"100%",height:210,objectFit:"cover",display:"block"}} />
        <div style={{position:"absolute",inset:0,background:theme.heroOverlay}} />
        <div style={{position:"absolute",top:14,left:14}}><span style={{background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",borderRadius:20,padding:"5px 14px",fontSize:11,color:"#fff",letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>{"\u2728"} Today's Pick</span></div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 18px 18px"}}>
          <CatTag theme={theme} category={hero.category} small />
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff",lineHeight:1.35,marginTop:8}}>{hero.emoji} {hero.title}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:6}}>{"\u{1F4D6}"} {hero.readTime} min read</div>
        </div>
      </div>

      <div onClick={()=>go("challenge")} style={{margin:"16px 20px 0",borderRadius:16,padding:"16px 18px",background:theme.cardGrad,border:"1px solid "+(dailyDone?theme.border:theme.accent+"55"),cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:46,height:46,borderRadius:14,background:dailyDone?theme.pill:theme.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{dailyDone?"\u2705":"\u26A1"}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:15,fontWeight:700,color:theme.text,marginBottom:3}}>{reviewDue?"Challenges waiting for you":dailyDone?"Challenges done for today":"Your challenges are ready"}</div>
          <div style={{fontSize:12,color:theme.sub}}>{reviewDue?"Daily quiz + retention review":dailyDone?("\u{1F525} "+streak+"-day streak"):"Tap to test your knowledge and earn XP"}</div>
        </div>
        <div style={{fontSize:18,color:theme.sub}}>{"\u2192"}</div>
      </div>

      <div style={{padding:"22px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Suggested for you</div>
        <button onClick={()=>go("browse")} style={{background:"none",border:"none",color:theme.accent,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Browse all {"\u2192"}</button>
      </div>

      {rest.length === 0 && suggested.length === 0 ? (
        <div style={{textAlign:"center",padding:"40px 24px"}}>
          <div style={{fontSize:46,marginBottom:12}}>{"\u{1F389}"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,marginBottom:6}}>All caught up!</div>
          <div style={{fontSize:13,color:theme.sub,lineHeight:1.6}}>You have read everything in your topics. New articles arrive daily.</div>
        </div>
      ) : (
        <div style={{padding:"14px 20px 8px",display:"flex",flexDirection:"column",gap:14}}>
          {rest.map((a, i) => <ArticleCard key={a.id} theme={theme} article={a} delay={i*0.05} onClick={()=>openArticle(a)} />)}
        </div>
      )}
    </div>
  );
}

function ArticleCard({ theme, article, onClick, delay }) {
  return (
    <div className="bb-press" onClick={onClick} style={{background:theme.card,borderRadius:22,overflow:"hidden",cursor:"pointer",border:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.04)",animation:"fadeUp 0.5s "+(delay||0)+"s ease both"}}>
      <div style={{position:"relative",overflow:"hidden"}}>
        <img src={article.image} alt="" style={{width:"100%",height:130,objectFit:"cover",display:"block"}} />
        <div style={{position:"absolute",bottom:10,left:12}}><CatTag theme={theme} category={article.category} small /></div>
      </div>
      <div style={{padding:"14px 16px 16px"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,lineHeight:1.35,marginBottom:7}}>{article.emoji} {article.title}</div>
        <div style={{fontSize:11,color:theme.sub,display:"flex",gap:12}}><span>{"\u{1F4D6}"} {article.readTime} min</span><span>{"\u{1F552}"} {article.date}</span></div>
      </div>
    </div>
  );
}

function BrowseScreen({ theme, openArticle, learned, browseCategory, setBrowseCategory }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = q ? ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.body.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  ) : [];

  if (browseCategory && !q) {
    const c = catOf(browseCategory);
    const list = ARTICLES.filter(a => a.category === browseCategory);
    return (
      <div style={{padding:"24px 20px 20px",animation:"fadeUp 0.3s ease"}}>
        <button onClick={()=>setBrowseCategory(null)} style={{background:theme.pill,border:"none",borderRadius:20,padding:"8px 16px",color:theme.text,fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:20}}>{"\u2190"} Back to Browse</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <div style={{width:48,height:48,borderRadius:14,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{c.icon}</div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>{c.id}</div>
            <div style={{fontSize:12,color:theme.sub}}>{list.length} article{list.length!==1?"s":""}</div>
          </div>
        </div>
        {list.length === 0 ? (
          <div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:40,marginBottom:12}}>{c.icon}</div><div style={{fontSize:15,color:theme.sub}}>More {c.id} articles coming soon!</div></div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {list.map((a,i)=>(
              <div key={a.id} style={{position:"relative"}}>
                <ArticleCard theme={theme} article={a} delay={i*0.05} onClick={()=>openArticle(a)} />
                {learned.includes(a.id) && <div style={{position:"absolute",top:10,right:10,background:"rgba(0,255,136,0.2)",border:"1px solid rgba(0,255,136,0.4)",borderRadius:20,padding:"3px 10px",fontSize:10,color:"#00FF88",fontWeight:600}}>{"\u2713"} Read</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{padding:"24px 20px 20px",animation:"fadeUp 0.4s ease"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,marginBottom:4,color:theme.text}}>Browse</div>
      <div style={{fontSize:13,color:theme.sub,marginBottom:20}}>Search articles or explore by topic</div>

      <div style={{position:"relative",marginBottom:q?16:24}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16,pointerEvents:"none"}}>{"\u{1F50D}"}</span>
        <input value={query} onChange={(e)=>{setQuery(e.target.value); if(browseCategory) setBrowseCategory(null);}} placeholder="Search topics or keywords..." style={{width:"100%",background:theme.card,border:"1px solid "+theme.border,borderRadius:14,padding:"14px 40px 14px 42px",fontSize:14,fontFamily:"'DM Sans',sans-serif",color:theme.text,outline:"none",boxSizing:"border-box"}} />
        {q && <button onClick={()=>setQuery("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:15,color:theme.sub}}>{"\u2715"}</button>}
      </div>

      {q ? (
        <div>
          <div style={{fontSize:12,color:theme.sub,marginBottom:14}}>{results.length>0?(results.length+" result"+(results.length!==1?"s":"")+" for \""+query+"\""):("No results for \""+query+"\"")}</div>
          {results.length === 0 ? (
            <div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:46,marginBottom:12}}>{"\u{1F50D}"}</div><div style={{fontSize:15,fontWeight:600,marginBottom:6}}>Nothing found</div><div style={{fontSize:13,color:theme.sub}}>Try a different keyword, topic, or name.</div></div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {results.map((a,i)=>{
                const bodyLower = a.body.toLowerCase();
                const mi = bodyLower.indexOf(q);
                const snippet = mi >= 0 ? ("..." + a.body.slice(Math.max(0,mi-30), mi+70).trim() + "...") : (a.body.slice(0,90)+"...");
                return (
                  <div key={a.id} onClick={()=>openArticle(a)} style={{background:theme.card,borderRadius:16,padding:"16px",border:"1px solid "+theme.border,cursor:"pointer",animation:"fadeUp 0.3s "+(i*0.04)+"s ease both"}}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                      <div style={{fontSize:30,flexShrink:0}}>{a.emoji}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                          <CatTag theme={theme} category={a.category} small />
                          <span style={{fontSize:10,color:theme.sub}}>{"\u{1F4D6}"} {a.readTime} min</span>
                          {learned.includes(a.id) && <span style={{background:"rgba(0,255,136,0.15)",color:"#00FF88",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:500}}>{"\u2713"} Read</span>}
                        </div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,lineHeight:1.35,marginBottom:7}}>{a.title}</div>
                        <div style={{fontSize:12,color:theme.sub,lineHeight:1.55}}>{snippet}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {CATS.map((c,i)=>{
            const count = ARTICLES.filter(a => a.category === c.id).length;
            return (
              <div key={c.id} onClick={()=>setBrowseCategory(c.id)} style={{background:theme.card,border:"1px solid "+theme.border,borderRadius:16,padding:"16px",cursor:"pointer",animation:"fadeUp 0.3s "+(i*0.03)+"s ease both"}}>
                <div style={{width:40,height:40,borderRadius:12,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:10}}>{c.icon}</div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{c.id}</div>
                <div style={{fontSize:11,color:theme.sub}}>{count} article{count!==1?"s":""}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ArticleScreen({ theme, goBack, article, learnedThis, markLearned, setQuizLock }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const paras = article.body.split("\n\n").filter(Boolean);

  const openQuiz = () => { setShowQuiz(true); setQuizLock(true); };
  const completeQuiz = () => { setShowQuiz(false); setQuizDone(true); setQuizLock(false); };
  const onScroll = (e) => {
    const el = e.target;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(el.scrollTop / max, 1) * 100 : 0);
  };

  return (
    <div style={{background:theme.bg,minHeight:"100vh",position:"relative"}}>
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,height:3,zIndex:60}}>
        <div style={{height:"100%",width:progress+"%",background:theme.accent,transition:"width 0.1s linear"}} />
      </div>
      <div onScroll={onScroll} style={{height:"100vh",overflowY:"auto"}}>
        <div style={{position:"sticky",top:0,zIndex:50,padding:"14px 20px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={goBack} className="bb-press" style={{background:"rgba(0,0,0,0.4)",border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{"\u2190"}</button>
        </div>
        <div style={{marginTop:-64}}>
          <div style={{position:"relative",overflow:"hidden"}}>
            <img src={article.image} alt="" style={{width:"100%",height:280,objectFit:"cover",display:"block",animation:"heroZoom 8s ease-out forwards"}} />
            <div style={{position:"absolute",inset:0,background:theme.heroOverlay}} />
          </div>
          <div style={{padding:"0 22px 120px",marginTop:-50,position:"relative"}}>
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
              <CatTag theme={theme} category={article.category} />
              <span style={{background:theme.pill,color:theme.sub,borderRadius:20,padding:"4px 12px",fontSize:11}}>{"\u{1F4D6}"} {article.readTime} min read</span>
              {learnedThis && <span style={{background:"rgba(74,112,88,0.14)",color:"#4A7058",borderRadius:20,padding:"4px 12px",fontSize:11}}>{"\u2713"} Read</span>}
            </div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,lineHeight:1.25,marginBottom:22}}>{article.emoji} {article.title}</h1>
            {paras.map((p,i)=>(
              <p key={i} style={{fontSize:16,lineHeight:1.85,opacity:0.88,marginBottom:18}}>
                {i===0 ? <span style={{float:"left",fontFamily:"'Playfair Display',serif",fontSize:54,lineHeight:0.82,fontWeight:900,paddingRight:10,paddingTop:4,color:theme.accent}}>{p.charAt(0)}</span> : null}
                {i===0 ? p.slice(1) : p}
              </p>
            ))}

            <div style={{background:theme.cardGrad,borderRadius:18,padding:"20px",marginBottom:24}}>
              <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>{"\u{1F4A1}"} Key Takeaways</div>
              {paras.slice(0,3).map((p,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:i<2?14:0}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:theme.accent,color:theme.accentText,fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</div>
                  <div style={{fontSize:14,lineHeight:1.6,opacity:0.8}}>{p.split(".")[0]}.</div>
                </div>
              ))}
            </div>

            {!learnedThis && <button onClick={()=>markLearned(article.id)} className="bb-press" style={{width:"100%",background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"17px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:14}}>{"\u2713"} Mark as learned (+50 XP)</button>}
            {learnedThis && <div style={{textAlign:"center",marginBottom:14,padding:"13px",background:"rgba(74,112,88,0.1)",borderRadius:12,fontSize:13,color:"#4A7058",fontWeight:500,border:"1px solid rgba(74,112,88,0.25)"}}>{"\u2713"} You have read this article</div>}

            {!showQuiz && !quizDone && <button onClick={openQuiz} className="bb-press" style={{width:"100%",background:"transparent",color:theme.accent,border:"1.5px solid "+theme.accent,borderRadius:14,padding:"15px",fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>{"\u{1F3AF}"} Test your understanding</button>}
            {showQuiz && <QuizBlock theme={theme} quiz={article.quiz} onComplete={completeQuiz} />}
            {quizDone && (
              <div style={{position:"relative",background:"rgba(74,112,88,0.08)",borderRadius:16,padding:"20px",textAlign:"center",border:"1px solid rgba(74,112,88,0.25)",animation:"pop 0.4s ease",overflow:"hidden"}}>
                <Confetti colors={["#5A4E7C","#9C6B3D","#4A7058","#3E5A78","#8E4A5C"]} />
                <div style={{fontSize:34,marginBottom:8}}>{"\u{1F389}"}</div>
                <div style={{fontSize:16,fontWeight:600,color:"#4A7058"}}>Knowledge locked in!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizBlock({ theme, quiz, onComplete }) {
  if (quiz.type === "mcq") return <MCQQuiz theme={theme} questions={quiz.questions} onComplete={onComplete} />;
  return <MatchQuiz theme={theme} pairs={quiz.pairs} onComplete={onComplete} />;
}

function MCQQuiz({ theme, questions, onComplete }) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const q = questions[qi];
  const pick = (i) => {
    if (answered) return;
    setSel(i); setAnswered(true);
    setTimeout(() => {
      if (qi + 1 >= questions.length) onComplete();
      else { setQi(qi+1); setSel(null); setAnswered(false); }
    }, 1300);
  };
  return (
    <div style={{background:theme.card,borderRadius:16,padding:"20px",border:"1px solid "+theme.border,animation:"fadeUp 0.3s ease"}}>
      <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>{"\u{1F3AF}"} Quick check {qi+1}/{questions.length}</div>
      <div style={{fontSize:15,fontWeight:500,lineHeight:1.5,marginBottom:16}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.opts.map((opt,i)=>{
          let bg=theme.pill, col=theme.text, bd="1px solid transparent";
          if (answered) { if (i===q.ans) { bg="rgba(0,255,136,0.1)"; col="#00FF88"; bd="1px solid rgba(0,255,136,0.4)"; } else if (i===sel) { bg="rgba(255,71,87,0.1)"; col="#FF4757"; bd="1px solid rgba(255,71,87,0.4)"; } }
          return <button key={i} onClick={()=>pick(i)} style={{background:bg,color:col,border:bd,borderRadius:10,padding:"12px 14px",textAlign:"left",fontSize:13,fontFamily:"inherit",cursor:answered?"default":"pointer"}}>{opt}</button>;
        })}
      </div>
    </div>
  );
}

function MatchQuiz({ theme, pairs, onComplete }) {
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState([]);
  const rights = useRef(seededShuffle(pairs.map((p,i)=>({ right:p.right, idx:i })), "match")).current;
  const pickLeft = (i) => { if (matched.includes(i)) return; setSel(sel===i?null:i); };
  const pickRight = (ri) => {
    if (sel === null) return;
    if (rights[ri].idx === sel) {
      const nm = [...matched, sel];
      setMatched(nm); setSel(null);
      if (nm.length === pairs.length) setTimeout(onComplete, 700);
    } else { setSel(null); }
  };
  if (matched.length === pairs.length) return <div style={{background:"rgba(0,255,136,0.08)",borderRadius:16,padding:"20px",textAlign:"center",border:"1px solid rgba(0,255,136,0.25)",animation:"pop 0.4s ease"}}><div style={{fontSize:34,marginBottom:8}}>{"\u{1F389}"}</div><div style={{fontSize:15,fontWeight:600,color:"#00FF88"}}>All matched!</div></div>;
  return (
    <div style={{background:theme.card,borderRadius:16,padding:"20px",border:"1px solid "+theme.border,animation:"fadeUp 0.3s ease"}}>
      <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>{"\u{1F517}"} Match the pairs</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {pairs.map((p,i)=>{
            const done = matched.includes(i);
            return <button key={i} onClick={()=>pickLeft(i)} style={{padding:"10px 12px",borderRadius:10,fontSize:12,fontFamily:"inherit",cursor:"pointer",textAlign:"left",border:"1.5px solid "+(done?"rgba(0,255,136,0.4)":sel===i?theme.accent:theme.border),background:done?"rgba(0,255,136,0.08)":sel===i?theme.accent:theme.pill,color:done?"#00FF88":sel===i?"#fff":theme.text}}>{p.left}</button>;
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {rights.map((r,ri)=>{
            const done = matched.includes(r.idx);
            return <button key={ri} onClick={()=>pickRight(ri)} style={{padding:"10px 12px",borderRadius:10,fontSize:12,fontFamily:"inherit",cursor:"pointer",textAlign:"left",border:"1.5px solid "+(done?"rgba(0,255,136,0.4)":theme.border),background:done?"rgba(0,255,136,0.08)":theme.pill,color:done?"#00FF88":theme.text}}>{r.right}</button>;
          })}
        </div>
      </div>
    </div>
  );
}

function ChallengeScreen({ theme, go, dailyDone, reviewOn, reviewDue, reviewDone, reviewFreq, daysUntilReview, streak, learnedCount }) {
  const freqLabel = reviewFreq === 1 ? "Weekly" : reviewFreq === 2 ? "Fortnightly" : "Monthly";
  return (
    <div style={{padding:"28px 20px",animation:"fadeUp 0.4s ease"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,marginBottom:4,color:theme.text}}>Challenges</div>
      <div style={{fontSize:13,color:theme.sub,marginBottom:24}}>Test yourself, earn XP, build your streak</div>

      <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Daily</div>
      <div onClick={()=>go("daily")} className="bb-press" style={{background:theme.card,borderRadius:18,padding:"22px 20px",cursor:"pointer",marginBottom:28,border:dailyDone?"1px solid "+theme.border:"none",boxShadow:dailyDone?"none":"0 6px 20px rgba(0,0,0,0.08)",display:"flex",gap:16,alignItems:"center"}}>
        <div style={{width:54,height:54,borderRadius:15,background:dailyDone?theme.pill:theme.cardGrad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>{dailyDone?"\u2705":"\u26A1"}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:dailyDone?theme.sub:theme.text}}>Daily Knowledge Challenge</div>
          <div style={{fontSize:13,color:theme.sub,marginTop:4}}>{dailyDone?("Done! \u{1F525} "+streak+"-day streak"):"5 questions, 15 seconds each, earn XP"}</div>
        </div>
        {!dailyDone && <div style={{fontSize:20,color:theme.sub}}>{"\u2192"}</div>}
      </div>

      <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>{freqLabel} Review</div>
      {!reviewOn ? (
        <div style={{background:theme.card,border:"none",boxShadow:"0 6px 20px rgba(0,0,0,0.08)",borderRadius:18,padding:"22px 20px",textAlign:"center"}}>
          <div style={{fontSize:34,marginBottom:10}}>{"\u{1F4CB}"}</div>
          <div style={{fontSize:15,fontWeight:600,marginBottom:6,color:theme.text}}>Retention Review Quiz</div>
          <div style={{fontSize:13,color:theme.sub,lineHeight:1.7,marginBottom:16}}>Enable periodic reviews to test how much you have retained. Retrieval practice can boost long-term memory by up to 50%.</div>
          <button onClick={()=>go("personalise")} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:12,padding:"12px 24px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Enable in settings {"\u2192"}</button>
        </div>
      ) : (
        <div onClick={reviewDue?(()=>go("review")):undefined} style={{background:reviewDue?"rgba(255,190,0,0.08)":theme.card,borderRadius:18,padding:"22px 20px",cursor:reviewDue?"pointer":"default",border:reviewDue?"1px solid rgba(255,190,0,0.3)":"none",boxShadow:reviewDue?"none":"0 6px 20px rgba(0,0,0,0.08)",display:"flex",gap:16,alignItems:"center"}}>
          <div style={{fontSize:38}}>{reviewDone?"\u2705":reviewDue?"\u{1F9EA}":"\u{1F4CB}"}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:700,color:reviewDue?"#FFD700":theme.text}}>{freqLabel} Retention Review</div>
            <div style={{fontSize:13,color:theme.sub,marginTop:4}}>{reviewDone?"Completed, great work!":reviewDue?("15 questions from your "+learnedCount+" read articles"):learnedCount===0?"Read articles to unlock this quiz":("Unlocks in "+daysUntilReview+" day"+(daysUntilReview!==1?"s":""))}</div>
          </div>
          {reviewDue && <div style={{fontSize:20,color:theme.sub}}>{"\u2192"}</div>}
        </div>
      )}

      <div style={{background:theme.cardGrad,borderRadius:16,padding:"18px 20px",marginTop:24,border:"1px solid "+theme.border}}>
        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Why it works</div>
        <div style={{fontSize:13,color:theme.text,lineHeight:1.7,fontWeight:700}}>Active recall beats passive reading for retention. Both quizzes trigger the retrieval effect, strengthening the neural pathways you built while reading.</div>
      </div>
    </div>
  );
}

function DailyQuiz({ theme, go, dailyDone, onFinish, streak, setQuizLock }) {
  const dailyQs = seededShuffle(QUESTION_BANK, TODAY + "dq").slice(0, 5);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [time, setTime] = useState(15);
  const [done, setDone] = useState(false);
  const correct = useRef(0);
  const timer = useRef(null);
  const q = dailyQs[qi];

  useEffect(() => { if (!dailyDone) setQuizLock(true); }, []);
  useEffect(() => {
    if (done || answered || dailyDone) return;
    setTime(15);
    timer.current = setInterval(() => setTime(t => {
      if (t <= 1) { clearInterval(timer.current); setAnswered(true); setTimeout(advance, 1500); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer.current);
  }, [qi, done, answered, dailyDone]);

  const pick = (i) => {
    if (answered) return;
    clearInterval(timer.current);
    if (i === q.ans) correct.current++;
    setSel(i); setAnswered(true);
    setTimeout(advance, 1600);
  };
  const advance = () => {
    if (qi + 1 >= dailyQs.length) { onFinish(correct.current); setDone(true); }
    else { setQi(qi+1); setSel(null); setAnswered(false); }
  };
  const tc = time > 9 ? "#00FF88" : time > 4 ? "#FF9F43" : "#FF4757";

  if (dailyDone && !done) return (
    <div style={{padding:"28px 20px",textAlign:"center",paddingTop:60,animation:"fadeUp 0.4s ease"}}>
      <div style={{fontSize:60,marginBottom:16}}>{"\u2705"}</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:12}}>Already done today!</div>
      <div style={{fontSize:14,color:theme.sub,lineHeight:1.7,marginBottom:30}}>Come back tomorrow to keep your streak alive. {"\u{1F525}"}</div>
      <div style={{background:theme.card,borderRadius:16,padding:"20px",border:"1px solid "+theme.border,marginBottom:24,display:"inline-block",minWidth:140}}>
        <div style={{fontSize:32,fontWeight:700,color:"#FF6B35"}}>{"\u{1F525}"} {streak}</div>
        <div style={{fontSize:13,color:theme.sub,marginTop:4}}>Day streak</div>
      </div>
      <div><button onClick={()=>go("challenge")} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"14px 32px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{"\u2190"} Back</button></div>
    </div>
  );

  return (
    <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={()=>go("challenge")} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text}}>{"\u2190"}</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Daily Challenge</div>
      </div>
      {done ? (
        <div style={{textAlign:"center",paddingTop:20,animation:"fadeUp 0.4s ease",position:"relative"}}>
          {correct.current>=3 && <Confetti colors={["#5A4E7C","#9C6B3D","#4A7058","#3E5A78","#8E4A5C"]} />}
          <div style={{fontSize:60,marginBottom:16}}>{correct.current>=4?"\u{1F3C6}":correct.current>=3?"\u{1F389}":"\u{1F4AA}"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,marginBottom:8,color:theme.text}}>{correct.current>=4?"Brilliant!":correct.current>=3?"Well done!":"Keep going!"}</div>
          <div style={{fontSize:15,color:theme.sub,marginBottom:30}}>{correct.current}/{dailyQs.length} correct, +{correct.current*30} XP</div>
          <button onClick={()=>go("challenge")} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"16px 40px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Done</button>
        </div>
      ) : (
        <div>
          <div style={{display:"flex",gap:5,marginBottom:20}}>
            {DAILY_QS.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<qi?theme.accent:i===qi?theme.accent:theme.border,opacity:i<=qi?1:0.4}} />)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:12,color:theme.sub}}>Question {qi+1} of {dailyQs.length}</span>
            <span style={{fontSize:20,fontWeight:700,color:tc}}>{time}s</span>
          </div>
          <div style={{height:5,background:theme.border,borderRadius:3,overflow:"hidden",marginBottom:20}}>
            <div style={{height:"100%",background:tc,borderRadius:3,width:(time/15*100)+"%",transition:"width 1s linear"}} />
          </div>
          <div style={{background:theme.card,borderRadius:18,padding:"24px 20px",marginBottom:20,border:"1px solid "+theme.border}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,lineHeight:1.4}}>{q.q}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {q.opts.map((opt,i)=>{
              let bg=theme.card, col=theme.text, bd="1px solid "+theme.border;
              if (answered) { if (i===q.ans) { bg="rgba(0,255,136,0.1)"; col="#00FF88"; bd="1px solid rgba(0,255,136,0.4)"; } else if (i===sel) { bg="rgba(255,71,87,0.1)"; col="#FF4757"; bd="1px solid rgba(255,71,87,0.4)"; } }
              return <button key={i} onClick={()=>pick(i)} style={{background:bg,color:col,border:bd,borderRadius:14,padding:"16px 18px",textAlign:"left",fontSize:14,fontFamily:"inherit",cursor:answered?"default":"pointer"}}>{opt}</button>;
            })}
          </div>
          {answered && q.exp && <div style={{marginTop:14,padding:"14px 16px",background:"rgba(255,190,0,0.08)",borderRadius:12,border:"1px solid rgba(255,190,0,0.25)",fontSize:13,color:"#FFD700",lineHeight:1.6}}>{"\u{1F4A1}"} {q.exp}</div>}
        </div>
      )}
    </div>
  );
}

function ReviewQuiz({ theme, go, questions, onFinish, setQuizLock }) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const correct = useRef(0);
  const q = questions[qi];

  useEffect(() => { setQuizLock(true); }, []);

  if (!q && !done) return (
    <div style={{padding:"40px 20px",textAlign:"center"}}>
      <div style={{fontSize:46,marginBottom:12}}>{"\u{1F4DA}"}</div>
      <div style={{fontSize:15,color:theme.sub,marginBottom:20}}>Read some articles first to build your review quiz.</div>
      <button onClick={()=>{setQuizLock(false);go("challenge");}} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:12,padding:"12px 24px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{"\u2190"} Back</button>
    </div>
  );

  const pick = (i) => {
    if (answered) return;
    if (i === q.ans) correct.current++;
    setSel(i); setAnswered(true);
    setTimeout(() => {
      if (qi + 1 >= questions.length) { onFinish(correct.current, questions.length); setDone(true); }
      else { setQi(qi+1); setSel(null); setAnswered(false); }
    }, 1500);
  };

  return (
    <div style={{padding:"24px 20px 40px",animation:"fadeUp 0.4s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
        <button onClick={()=>go("challenge")} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text,flexShrink:0}}>{"\u2190"}</button>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Retention Review</div>
          <div style={{fontSize:12,color:theme.sub}}>From articles you have read</div>
        </div>
      </div>
      {done ? (
        <div style={{textAlign:"center",paddingTop:32,animation:"fadeUp 0.4s ease",position:"relative"}}>
          {correct.current>=questions.length*0.5 && <Confetti colors={["#5A4E7C","#9C6B3D","#4A7058","#3E5A78","#8E4A5C"]} />}
          <div style={{fontSize:60,marginBottom:16}}>{correct.current>=questions.length*0.8?"\u{1F3C6}":correct.current>=questions.length*0.5?"\u{1F389}":"\u{1F4D6}"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,marginBottom:8,color:theme.text}}>{correct.current>=questions.length*0.8?"Outstanding!":correct.current>=questions.length*0.5?"Great memory!":"Keep reviewing!"}</div>
          <div style={{fontSize:15,color:theme.sub,marginBottom:30}}>{correct.current}/{questions.length} correct, +{correct.current*50} XP</div>
          <button onClick={()=>go("challenge")} style={{background:theme.accent,color:theme.accentText,border:"none",borderRadius:14,padding:"16px 40px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Done</button>
        </div>
      ) : (
        <div>
          <div style={{display:"flex",gap:3,margin:"16px 0"}}>
            {questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=qi?theme.accent:theme.border,opacity:i<=qi?1:0.4}} />)}
          </div>
          <div style={{background:"rgba(255,190,0,0.08)",borderRadius:10,padding:"8px 14px",marginBottom:16,fontSize:12,color:"#FFD700",border:"1px solid rgba(255,190,0,0.2)"}}>{"\u{1F4D6}"} From: <b>{q.source}</b>, {qi+1} of {questions.length}</div>
          <div style={{background:theme.card,borderRadius:18,padding:"24px 20px",marginBottom:20,border:"1px solid "+theme.border}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,lineHeight:1.4}}>{q.q}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {q.opts.map((opt,i)=>{
              let bg=theme.card, col=theme.text, bd="1px solid "+theme.border;
              if (answered) { if (i===q.ans) { bg="rgba(0,255,136,0.1)"; col="#00FF88"; bd="1px solid rgba(0,255,136,0.4)"; } else if (i===sel) { bg="rgba(255,71,87,0.1)"; col="#FF4757"; bd="1px solid rgba(255,71,87,0.4)"; } }
              return <button key={i} onClick={()=>pick(i)} style={{background:bg,color:col,border:bd,borderRadius:14,padding:"16px 18px",textAlign:"left",fontSize:14,fontFamily:"inherit",cursor:answered?"default":"pointer"}}>{opt}</button>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function PieChart({ theme, learnedArticles }) {
  const counts = {};
  learnedArticles.forEach(a => { counts[a.category] = (counts[a.category] || 0) + 1; });
  const entries = Object.keys(counts).map(k => ({ cat:k, n:counts[k], c:catOf(k) }));
  const total = learnedArticles.length;
  const [hover, setHover] = useState(null);

  if (total === 0) return <div style={{textAlign:"center",padding:"30px 0"}}><div style={{fontSize:34,marginBottom:8}}>{"\u{1F967}"}</div><div style={{fontSize:13,color:theme.sub}}>Read articles to see your learning breakdown</div></div>;

  const cx = 100, cy = 100, r = 72, ir = 46;
  let angle = -90;
  const slices = entries.map((e) => {
    const frac = e.n / total;
    const a0 = angle, a1 = angle + frac * 360;
    angle = a1;
    const rad = (d) => d * Math.PI / 180;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    const large = frac > 0.5 ? 1 : 0;
    const d = "M " + cx + " " + cy + " L " + x0 + " " + y0 + " A " + r + " " + r + " 0 " + large + " 1 " + x1 + " " + y1 + " Z";
    return { d, frac, e };
  });
  const hv = hover !== null ? slices[hover].e : null;

  return (
    <div>
      <svg viewBox="0 0 200 200" width="100%" style={{maxWidth:200,display:"block",margin:"0 auto"}}>
        {slices.map((s,i)=>(
          <path key={i} d={s.d} fill={s.e.c.color} opacity={hover===null?0.9:hover===i?1:0.3} stroke={theme.bg} strokeWidth="1.5" style={{cursor:"pointer"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} />
        ))}
        <circle cx={cx} cy={cy} r={ir} fill={theme.card} />
        <text x={cx} y={cy-6} textAnchor="middle" style={{fontSize:22,fontWeight:700,fill:theme.text,fontFamily:"'Playfair Display',serif"}}>{hv?hv.n:total}</text>
        <text x={cx} y={cy+12} textAnchor="middle" style={{fontSize:9,fill:theme.sub}}>{hv?hv.cat:"articles read"}</text>
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginTop:14}}>
        {entries.map((e,i)=>(
          <div key={e.cat} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:20,background:hover===i?e.c.color+"22":theme.pill,border:"1px solid "+(hover===i?e.c.color+"55":theme.border),cursor:"pointer"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:e.c.color}} />
            <span style={{fontSize:11,color:hover===i?e.c.color:theme.sub}}>{e.c.icon} {e.cat}</span>
            <span style={{fontSize:10,color:theme.sub}}>({e.n})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressScreen({ theme, go, xp, level, streak, learnedArticles, quizScores }) {
  const xpPct = (xp % 200) / 200 * 100;
  const totalQ = quizScores.length;
  const avg = totalQ > 0 ? Math.round(quizScores.reduce((s,v)=>s+v.correct/v.total*100,0)/totalQ) : 0;
  return (
    <div style={{padding:"28px 20px 20px",animation:"fadeUp 0.4s ease"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,marginBottom:4,color:theme.text}}>My Progress</div>
      <div style={{fontSize:13,color:theme.sub,marginBottom:20}}>Track your learning journey</div>

      <div style={{background:theme.accent,borderRadius:22,padding:"24px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
          <div><div style={{fontSize:11,color:theme.accentText,opacity:0.55,letterSpacing:2,textTransform:"uppercase"}}>Level</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:34,fontWeight:900,color:theme.accentText}}><CountUp value={level} /></div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:theme.accentText,opacity:0.55,letterSpacing:2,textTransform:"uppercase"}}>Total XP</div><div style={{fontSize:30,fontWeight:800,color:theme.accentText}}><CountUp value={xp} /></div></div>
        </div>
        <div style={{height:6,background:theme.accentText,opacity:0.2,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:xpPct+"%",background:theme.accentText,borderRadius:3,animation:"barFill 1.1s ease"}} /></div>
        <div style={{fontSize:11,color:theme.accentText,opacity:0.55,marginTop:8}}>{200-(xp%200)} XP to Level {level+1}</div>
      </div>

      <button onClick={()=>go("learnings")} style={{width:"100%",background:theme.card,borderRadius:22,padding:"18px 20px",border:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.04)",cursor:"pointer",display:"flex",alignItems:"center",gap:16,marginBottom:12,fontFamily:"inherit",textAlign:"left"}}>
        <div style={{fontSize:34}}>{"\u{1F4DA}"}</div>
        <div style={{flex:1}}><div style={{fontSize:26,fontWeight:700}}>{learnedArticles.length}</div><div style={{fontSize:13,color:theme.sub}}>Articles Read</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:12,color:theme.accent,fontWeight:600}}>View learnings {"\u2192"}</div></div>
      </button>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <div style={{background:theme.pill,borderRadius:18,padding:"18px"}}><div style={{fontSize:24,marginBottom:6,animation:"flame 1.8s ease-in-out infinite",transformOrigin:"center bottom",display:"inline-block"}}>{"\u{1F525}"}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:theme.text}}><CountUp value={streak} /></div><div style={{fontSize:12,color:theme.sub,marginTop:2}}>Day Streak</div></div>
        <div style={{background:theme.pill,borderRadius:18,padding:"18px"}}><div style={{fontSize:24,marginBottom:6}}>{"\u{1F3AF}"}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:theme.text}}><CountUp value={avg} />%</div><div style={{fontSize:12,color:theme.sub,marginTop:2}}>Avg Quiz Score</div></div>
      </div>

      <div style={{background:theme.card,borderRadius:22,padding:"20px",marginBottom:16,border:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>
        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>{"\u{1F4CA}"} Learning Breakdown</div>
        <PieChart theme={theme} learnedArticles={learnedArticles} />
      </div>

      <div style={{background:theme.card,borderRadius:22,padding:"20px",border:"none",boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>
        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>{"\u{1F4C8}"} Recent Quiz Scores</div>
        {quizScores.length === 0 ? (
          <div style={{textAlign:"center",fontSize:13,color:theme.sub,padding:"10px 0"}}>Complete quizzes to see your scores</div>
        ) : (
          <div style={{display:"flex",alignItems:"flex-end",gap:8,height:80}}>
            {quizScores.map((s,i)=>{
              const pct = Math.round(s.correct/s.total*100);
              const col = s.label === "Daily" ? theme.accent : theme.accentAlt;
              return (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{fontSize:9,color:theme.sub}}>{pct}%</div>
                  <div style={{width:"100%",height:50,background:theme.border,borderRadius:4,display:"flex",alignItems:"flex-end",overflow:"hidden"}}><div style={{width:"100%",height:pct+"%",background:col,borderRadius:4}} /></div>
                  <div style={{fontSize:9,color:theme.sub}}>{s.label==="Daily"?"D":"R"}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function LearningsScreen({ theme, go, learnedArticles, openArticle }) {
  return (
    <div style={{padding:"24px 20px 40px",animation:"slideIn 0.3s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={()=>go("progress")} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text,flexShrink:0}}>{"\u2190"}</button>
        <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>My Learnings</div><div style={{fontSize:12,color:theme.sub}}>{learnedArticles.length} article{learnedArticles.length!==1?"s":""} read</div></div>
      </div>
      {learnedArticles.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:46,marginBottom:12}}>{"\u{1F4D6}"}</div><div style={{fontSize:16,fontWeight:500,marginBottom:8}}>Nothing here yet</div><div style={{fontSize:13,color:theme.sub}}>Read articles and mark them as learned</div></div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {learnedArticles.map((a,i)=>(
            <div key={a.id} onClick={()=>openArticle(a)} style={{background:theme.card,borderRadius:16,padding:"16px",cursor:"pointer",border:"1px solid "+theme.border,animation:"fadeUp 0.3s "+(i*0.04)+"s ease both",display:"flex",gap:14}}>
              <div style={{fontSize:30,flexShrink:0}}>{a.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <CatTag theme={theme} category={a.category} small />
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,lineHeight:1.35,margin:"7px 0"}}>{a.title}</div>
                <div style={{fontSize:11,color:theme.accent,fontWeight:500}}>Revisit and quiz {"\u2192"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonaliseScreen({ theme, goBack, themeKey, changeTheme, userName, photo, userTopics, notifTime, readingGoal, reviewFreq, reviewOn, onSave }) {
  const [name, setName] = useState(userName);
  const [pic, setPic] = useState(photo);
  const [topics, setTopics] = useState(userTopics);
  const [ntime, setNtime] = useState(notifTime);
  const [goal, setGoal] = useState(readingGoal);
  const [freq, setFreq] = useState(reviewFreq);
  const [ron, setRon] = useState(reviewOn);
  const [saved, setSaved] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const AVATARS = ["\u{1F9E0}","\u{1F680}","\u{1F30D}","\u26A1","\u{1F52C}","\u{1F4DA}","\u{1F3AF}","\u{1F33F}","\u{1F3A8}","\u{1F3C6}","\u{1F4A1}","\u{1F30C}","\u{1F981}","\u{1F42C}","\u{1F98B}","\u{1F319}","\u2600\uFE0F","\u{1F3AD}"];

  const toggleTopic = (t) => setTopics(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
  const save = () => { onSave({ name, photo:pic, topics, ntime, goal, rfreq:freq, ron }); setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  return (
    <div style={{background:theme.bg,minHeight:"100vh",animation:"slideIn 0.3s ease"}}>
      {showPicker && (
        <div onClick={()=>setShowPicker(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={(e)=>e.stopPropagation()} style={{background:theme.card,borderRadius:"24px 24px 0 0",padding:"26px 24px 40px",width:"100%",maxWidth:430,border:"1px solid "+theme.border,animation:"slideUp 0.3s ease"}}>
            <div style={{width:40,height:4,borderRadius:2,background:theme.border,margin:"0 auto 22px"}} />
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,marginBottom:6}}>Choose your avatar</div>
            <div style={{fontSize:13,color:theme.sub,marginBottom:20}}>Tap one to select it</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
              {AVATARS.map(a=>(
                <button key={a} onClick={()=>{setPic(a);setShowPicker(false);}} style={{aspectRatio:"1",borderRadius:"50%",border:"2px solid "+(pic===a?theme.accent:theme.border),background:pic===a?theme.accent+"22":theme.pill,fontSize:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{padding:"24px 20px 0",display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={goBack} style={{background:theme.pill,border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:16,color:theme.text,flexShrink:0}}>{"\u2190"}</button>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:theme.text}}>My Profile</div>
      </div>

      <div style={{padding:"0 20px 90px"}}>
        <div style={{background:theme.card,borderRadius:20,padding:"24px 20px",marginBottom:20,border:"1px solid "+theme.border,textAlign:"center"}}>
          <div style={{position:"relative",width:88,height:88,margin:"0 auto 16px"}}>
            <div style={{width:88,height:88,borderRadius:"50%",border:"3px solid "+theme.accent,background:theme.accent,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Avatar theme={theme} photo={pic} userName={name} size={88} />
            </div>
            <button onClick={()=>setShowPicker(true)} style={{position:"absolute",bottom:0,right:0,width:30,height:30,borderRadius:"50%",background:theme.accent,border:"2px solid "+theme.bg,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{"\u270F\uFE0F"}</button>
          </div>
          <label style={{display:"block",fontSize:11,color:theme.sub,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Display name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} style={{width:"100%",background:theme.pill,border:"1px solid "+theme.border,borderRadius:10,padding:"12px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",color:theme.text,outline:"none",boxSizing:"border-box",textAlign:"center"}} />
        </div>

        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>App theme</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {Object.keys(THEMES).map(k=>{
            const th = THEMES[k];
            return (
              <button key={k} onClick={()=>changeTheme(k)} style={{background:th.card,border:"2px solid "+(themeKey===k?th.accent:th.border),borderRadius:16,padding:"18px 14px",cursor:"pointer",textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,"+th.accent+","+th.accentAlt+")",margin:"0 auto 10px"}} />
                <div style={{fontSize:14,fontWeight:themeKey===k?700:400,color:th.text}}>{th.name}</div>
                {themeKey===k && <div style={{fontSize:11,color:th.accent,marginTop:4,fontWeight:600}}>{"\u2713"} Active</div>}
              </button>
            );
          })}
        </div>

        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Topics I follow ({topics.length}/{CATS.length})</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
          {CATS.map(c=>{
            const on = topics.includes(c.id);
            return <button key={c.id} onClick={()=>toggleTopic(c.id)} style={{background:on?c.bg:theme.pill,color:on?c.color:theme.sub,border:"1.5px solid "+(on?c.color+"55":"transparent"),borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:on?600:400,cursor:"pointer",fontFamily:"inherit"}}>{c.icon} {on?"\u2713 ":""}{c.id}</button>;
          })}
        </div>

        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Periodic review quiz</div>
        <div style={{background:theme.card,borderRadius:16,padding:"20px",marginBottom:20,border:"1px solid "+theme.border}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:ron?16:0}}>
            <div><div style={{fontSize:14,fontWeight:600,color:theme.text}}>Enable review quiz</div><div style={{fontSize:12,color:theme.sub,marginTop:2}}>15 questions from articles you have read</div></div>
            <div onClick={()=>setRon(!ron)} style={{width:50,height:28,borderRadius:14,background:ron?theme.accent:theme.border,cursor:"pointer",position:"relative",flexShrink:0}}><div style={{width:22,height:22,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:ron?25:3,transition:"left 0.2s"}} /></div>
          </div>
          {ron && (
            <div>
              <div style={{fontSize:13,color:theme.sub,marginBottom:10}}>Review frequency:</div>
              <div style={{display:"flex",gap:8}}>
                {[[1,"Weekly"],[2,"Fortnightly"],[4,"Monthly"]].map(o=>(
                  <button key={o[0]} onClick={()=>setFreq(o[0])} style={{flex:1,padding:"11px 0",background:freq===o[0]?theme.accent:theme.pill,color:freq===o[0]?theme.accentText:theme.text,border:"none",borderRadius:10,fontSize:12,fontWeight:freq===o[0]?700:400,cursor:"pointer",fontFamily:"inherit"}}>{o[1]}</button>
                ))}
              </div>
              <div style={{fontSize:11,color:theme.sub,marginTop:10,textAlign:"center"}}>First quiz unlocks {freq===1?"1 week":freq===2?"2 weeks":"1 month"} after install</div>
            </div>
          )}
        </div>

        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Daily reading goal</div>
        <div style={{background:theme.card,borderRadius:16,padding:"20px",marginBottom:20,border:"1px solid "+theme.border}}>
          <div style={{display:"flex",gap:8}}>
            {[1,2,3,5].map(n=>(
              <button key={n} onClick={()=>setGoal(n)} style={{flex:1,padding:"13px 0",background:goal===n?theme.accent:theme.pill,color:goal===n?theme.accentText:theme.text,border:"none",borderRadius:10,fontSize:16,fontWeight:goal===n?700:400,cursor:"pointer",fontFamily:"inherit"}}>{n}</button>
            ))}
          </div>
          <div style={{fontSize:11,color:theme.sub,marginTop:10,textAlign:"center"}}>{goal} article{goal!==1?"s":""} per day</div>
        </div>

        <div style={{fontSize:11,color:theme.sub,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Notification time</div>
        <div style={{background:theme.card,borderRadius:16,padding:"20px",marginBottom:24,border:"1px solid "+theme.border}}>
          <input type="time" value={ntime} onChange={(e)=>setNtime(e.target.value)} style={{width:"100%",background:theme.pill,border:"1px solid "+theme.border,borderRadius:10,padding:"12px 14px",fontSize:16,fontFamily:"inherit",color:theme.text,outline:"none",boxSizing:"border-box"}} />
        </div>

        <button onClick={save} style={{width:"100%",background:saved?"#4A7058":theme.accent,color:saved?"#FFFFFF":theme.accentText,border:"none",borderRadius:14,padding:"17px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{saved?"\u2713 Saved!":"Save preferences"}</button>
      </div>
    </div>
  );
}

const CSS = "@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{transform:translateX(28px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideBack{from{transform:translateX(-28px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes pop{0%{transform:scale(0.85);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}@keyframes heroZoom{from{transform:scale(1)}to{transform:scale(1.07)}}@keyframes flame{0%,100%{transform:scale(1) rotate(-3deg)}50%{transform:scale(1.18) rotate(3deg)}}@keyframes barFill{from{width:0}}@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(320px) rotate(720deg);opacity:0}}@keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(0,0,0,0.18)}70%{box-shadow:0 0 0 14px rgba(0,0,0,0)}100%{box-shadow:0 0 0 0 rgba(0,0,0,0)}}*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}::-webkit-scrollbar{display:none}input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.5)}.bb-press{transition:transform 0.12s ease}.bb-press:active{transform:scale(0.975)}.bb-shimmer{background:linear-gradient(90deg,rgba(140,140,140,0.08) 25%,rgba(140,140,140,0.18) 50%,rgba(140,140,140,0.08) 75%);background-size:800px 100%;animation:shimmer 1.4s infinite linear}";

function CountUp({ value, duration, style }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now(); const dur = duration || 900;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span style={style}>{n}</span>;
}

function Confetti({ colors }) {
  const pieces = useRef(Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    dur: 1.6 + Math.random() * 1.2,
    size: 6 + Math.random() * 7,
    color: colors[i % colors.length],
    round: Math.random() > 0.5
  }))).current;
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:5}}>
      {pieces.map(p => (
        <div key={p.id} style={{position:"absolute",top:0,left:p.left+"%",width:p.size,height:p.size,background:p.color,borderRadius:p.round?"50%":2,animation:"confettiFall "+p.dur+"s "+p.delay+"s ease-in forwards"}} />
      ))}
    </div>
  );
}

function NavIcon({ name, color, active }) {
  const sw = active ? 2.3 : 1.8;
  const common = { width:23, height:23, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth:sw, strokeLinecap:"round", strokeLinejoin:"round" };
  if (name === "home") return <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>;
  if (name === "browse") return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>;
  if (name === "challenge") return <svg {...common}><path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l1-8z" /></svg>;
  if (name === "progress") return <svg {...common}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16l3.5-4 3 2.5L20 8" /></svg>;
  return null;
}

