import React from 'react';
import { Compass, Globe, TrendingUp, Palette, Building2, ShieldCheck, Heart, Zap, Plane, Star, MessageSquare, GraduationCap } from 'lucide-react';

export const otherDestinationsData: Record<string, any> = {
    ireland: {
        id: 'ireland',
        name: 'Ireland',
        colorTheme: 'green',
        heroImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1200',
        heroBadge: 'Study in Ireland',
        heroTitle1: 'The Emerald',
        heroTitle2: 'Isle of Tech',
        heroDesc: 'Join Europe\'s fastest-growing tech hub. Experience world-class education surrounded by breathtaking landscapes and a welcoming culture.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-green-100">Dublin</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-green-100">Cork</span>, Ireland offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <MessageSquare />, title: "English-Speaking EU Country", desc: "The only majority English-speaking country in the European Union." },
            { id: 'h2', icon: <GraduationCap />, title: "Strong Academic Reputation", desc: "Home to world-class universities with a strong focus on research and innovation." },
            { id: 'h3', icon: <Building2 />, title: "Tech & Pharma Capital of EU", desc: "European headquarters for major global technology and pharmaceutical companies." },
            { id: 'h4', icon: <Heart />, title: "Quality of Life", desc: "Known for its friendly people, safe environment, and rich cultural heritage." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Ireland is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Dublin", desc: "The bustling capital, a major center for technology, finance, and literature.", stats: "Tech Hub • Historic Capital", rating: "The Silicon Docks", image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=1200" },
            { name: "Cork", desc: "A vibrant city known for its food scene, arts, and strong pharmaceutical industry.", stats: "Cultural Hub • Pharma Center", rating: "The Rebel City", image: "https://images.unsplash.com/photo-1596395819057-e37f55a8516d?q=80&w=1200" },
            { name: "Galway", desc: "The cultural heart of Ireland, famous for its festivals, music, and bohemian spirit.", stats: "Arts & Culture • Coastal City", rating: "City of Tribes", image: "https://images.unsplash.com/photo-1600676778436-1188319e5cc7?q=80&w=1200" },
            { name: "Limerick", desc: "Historic city on the River Shannon, growing tech hub and home to major industries.", stats: "Tech Hub • River City", rating: "The Treaty City", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200" },
            { name: "Belfast", desc: "Capital of Northern Ireland, Titanic heritage, and a center for rapid regeneration.", stats: "Historic Capital • Maritime Hub", rating: "The Titanic City", image: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Ireland is home to some of the world\'s most prestigious universities and institutes of technology.',
        universities: {
            "Irish Research Universities (IRUN) Network Universities": [
                { name: "Trinity College Dublin", location: "Dublin", tag: "Historic", fields: "Arts • Sciences • Business", url: "https://www.tcd.ie/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "University College Dublin", location: "Dublin", tag: "Global", fields: "Business • Engineering • Medicine", url: "https://www.ucd.ie/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "University of Galway", location: "Galway", tag: "Research", fields: "Biomedical • IT • Arts", url: "https://www.universityofgalway.ie/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "University College Cork", location: "Cork", tag: "Sustainable", fields: "Science • Food • Health", url: "https://www.ucc.ie/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "University of Limerick", location: "Limerick", tag: "Industry", fields: "Engineering • Business • Education", url: "https://www.ul.ie/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "Dublin City University", location: "Dublin", tag: "Innovation", fields: "Communications • Tech • Business", url: "https://www.dcu.ie/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Maynooth University", location: "Maynooth", tag: "Fast-Growing", fields: "Humanities • Social Sciences • IT", url: "https://www.maynoothuniversity.ie/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" }
            ],
            "Technological Universities & Institutes": [
                { name: "Technological University Dublin", location: "Dublin", tag: "Applied", fields: "Tech • Engineering • Design", url: "https://www.tudublin.ie/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Munster Technological University", location: "Cork & Kerry", tag: "Regional", fields: "Science • Business • Engineering", url: "https://www.mtu.ie/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "South East Technological University", location: "Waterford & Carlow", tag: "Research", fields: "Computing • Health • Business", url: "https://www.setu.ie/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "Atlantic Technological University", location: "West & Northwest", tag: "Coastal", fields: "Marine • Tourism • Tech", url: "https://www.atu.ie/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Technological University of the Shannon", location: "Midlands & Midwest", tag: "Innovation", fields: "Engineering • Arts • Science", url: "https://tus.ie/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "Dundalk Institute of Technology", location: "Dundalk", tag: "Industry-Focused", fields: "Computing • Creative Arts • Health", url: "https://www.dkit.ie/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" }
            ],
            "Private Colleges & Business Schools": [
                { name: "National College of Ireland", location: "Dublin", tag: "Business", fields: "Computing • Business • HR", url: "https://www.ncirl.ie/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
                { name: "Dublin Business School", location: "Dublin", tag: "Career-Ready", fields: "Business • Law • Arts", url: "https://www.dbs.ie/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "Galway Business School", location: "Galway", tag: "Boutique", fields: "Business • Management", url: "https://www.galwaybusinessschool.ie/", image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=800" },
                { name: "Griffith College Dublin", location: "Dublin", tag: "Independent", fields: "Law • Design • Computing", url: "https://www.griffith.ie/", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" },
                { name: "IBAT College Dublin", location: "Dublin", tag: "Enterprise", fields: "Business • IT • English", url: "https://www.ibat.ie/", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800" },
                { name: "CCT College Dublin", location: "Dublin", tag: "Tech", fields: "Computing • IT • Business", url: "https://www.cct.ie/", image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=800" },
                { name: "Independent College", location: "Dublin", tag: "Specialist", fields: "Law • Business • Arts", url: "https://independentcolleges.ie/", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800" },
                { name: "Shannon College of Hotel Management", location: "Clare", tag: "Hospitality", fields: "Hotel Management • Business", url: "https://www.universityofgalway.ie/shannoncollege/", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800" }
            ],
            "International & Specialist Colleges": [
                { name: "Dublin International Foundation College", location: "Dublin", tag: "Pathway", fields: "Foundation • Pre-Masters", url: "https://www.difc.ie/", image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=800" },
                { name: "American College Dublin", location: "Dublin", tag: "Liberal Arts", fields: "Arts • Business • Performance", url: "https://iamu.edu/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "UniHaven College", location: "Maynooth", tag: "Foundation", fields: "University Preparation", url: "https://unihaven.ie/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "BIMM University Ireland", location: "Dublin", tag: "Creative", fields: "Music • Film • Performing Arts", url: "https://www.bimm.ac.uk/dublin/", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800" }
            ]
        },
        chapter4Title: 'Ireland <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in the Emerald Isle.',
        didYouKnow: 'Ireland offers <span className="text-green-600 font-bold">up to 2-year post-study work visa</span> for students who complete a degree program, allowing you to gain valuable European work experience.',
        essentials: [
            { id: 'i1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Irish university." },
            { id: 'i2', step: "2", title: "Financial Proof", desc: "Show proof of funds, typically around €10,000 per year for living expenses." },
            { id: 'i3', step: "3", title: "Visa Application", desc: "Submit your student visa application online." },
            { id: 'i4', step: "4", title: "IRP Registration", desc: "Register for your Irish Residence Permit upon arrival." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Europe.',
        bentoGrid: null, // Will use a generic or null for now
        ctaTitle: 'Ready to say <br /> <span className="text-green-500 italic">Dia Duit?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Ireland.'
    },
    switzerland: {
        id: 'switzerland',
        name: 'Switzerland',
        colorTheme: 'red',
        heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200',
        heroBadge: 'Study in Switzerland',
        heroTitle1: 'The Peak of',
        heroTitle2: 'Excellence',
        heroDesc: 'Experience world-class education surrounded by breathtaking alpine landscapes and a culture of precision and innovation.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-red-100">Zurich</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-red-100">Geneva</span>, Switzerland offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <Building2 />, title: "Global Finance", desc: "Home to the European headquarters of major financial institutions." },
            { id: 'h2', icon: <Star />, title: "Hospitality Leaders", desc: "The birthplace of modern hospitality management education." },
            { id: 'h3', icon: <Zap />, title: "Research & Innovation Hub", desc: "World-leading research facilities and a thriving startup ecosystem." },
            { id: 'h4', icon: <Compass />, title: "Unmatched Natural Beauty", desc: "Study surrounded by the breathtaking scenery of the Swiss Alps." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Switzerland is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Zurich", desc: "Switzerland's largest and most cosmopolitan city, known for its world-class universities, finance, and vibrant nightlife", stats: "Finance Hub • Global City", rating: "The Economic Engine", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=1200" },
            { name: "Geneva", desc: "A truly international city hosting the UN and hundreds of global organizations, perfect for networking and cultural diversity", stats: "Diplomacy Hub • International Center", rating: "The Peace Capital", image: "https://images.unsplash.com/photo-1600676778436-1188319e5cc7?q=80&w=1200" },
            { name: "Bern", desc: "The charming federal capital with a UNESCO-listed medieval old town and a relaxed student-friendly atmosphere", stats: "Federal Capital • UNESCO Site", rating: "The Bear City", image: "https://images.unsplash.com/photo-1589824783837-6169889fd20c?q=80&w=1200" },
            { name: "Lucerne", desc: "One of Switzerland's most picturesque cities, with stunning Alpine lake views and the iconic Chapel Bridge", stats: "Tourism Hub • Historic City", rating: "The Heart of Switzerland", image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=1200" },
            { name: "Lausanne", desc: "A youthful, hilly city on Lake Geneva home to the Olympic Museum and a thriving international student community", stats: "Sports Capital • University City", rating: "The Olympic Capital", image: "https://images.unsplash.com/photo-1589824783837-6169889fd20c?q=80&w=1200" },
            { name: "Interlaken", desc: "The adventure capital of Switzerland, nestled between two lakes and surrounded by the breathtaking Swiss Alps", stats: "Adventure Capital • Alpine Hub", rating: "The Adventure Hub", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Switzerland is home to some of the world\'s most prestigious universities and hospitality schools.',
        universities: {
            "Hospitality & Tourism focused": [
                { name: "GLION Institute of Higher Education", location: "Glion-sur-Montreux", tag: "Hospitality", fields: "Hospitality • Luxury", url: "https://www.glion.edu/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "Hotel & Tourism Management Institute Switzerland (HTMi)", location: "Sörenberg", tag: "Tourism", fields: "Hotel Management", url: "https://htmi.ch/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "Les Roches Montana", location: "Bluche", tag: "Global", fields: "Hospitality Management", url: "https://lesroches.edu/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "Culinary Arts Academy (CAA)", location: "Le Bouveret", tag: "Culinary", fields: "Culinary Arts", url: "https://www.culinaryartsswitzerland.com/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Hotel Institute Montreux (HIM)", location: "Montreux", tag: "Business", fields: "Hospitality • Business", url: "https://www.hotelinstitutemontreux.com/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "EHL Swiss School of Tourism and Hospitality", location: "Passugg", tag: "Tourism", fields: "Tourism • Hospitality", url: "https://ssth.ehl.edu/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "EHL Hospitality Business School", location: "Lausanne", tag: "Elite", fields: "Hospitality Business", url: "https://www.ehl.edu/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Business & Hotel Management School (BHMS)", location: "Lucerne", tag: "Management", fields: "Business • Hotel Mgmt", url: "https://www.bhms.ch/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Swiss Hotel Management School (SHMS)", location: "Caux", tag: "Events", fields: "Events • Hospitality", url: "https://www.shms.com/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" }
            ],
            "Business & Management focused": [
                { name: "EU Business School", location: "Geneva", tag: "International", fields: "Business • Marketing", url: "https://www.euruni.edu/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "Geneva Business School", location: "Geneva", tag: "Finance", fields: "Finance • Management", url: "https://gbsge.com/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Swiss School of Business and Management (SSBM)", location: "Geneva", tag: "Global", fields: "Business Admin", url: "https://www.ssbm.ch/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "International Management Institute (IMI)", location: "Kastanienbaum", tag: "Boutique", fields: "Management", url: "https://imi-luzern.com/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "Swiss Education Academy", location: "Montreux", tag: "Education", fields: "Education • Languages", url: "https://www.swisseducationacademy.com/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
                { name: "Swiss Educational College", location: "Weggis", tag: "Applied", fields: "Applied Sciences", url: "https://www.swisseducationalcollege.ch/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "Bella Vista Institute of Higher Education Switzerland", location: "Montreux", tag: "Business", fields: "Business • Management", url: "https://www.bvihes.ch/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" }
            ],
            "International / Branch Campus Universities": [
                { name: "Webster University Geneva", location: "Geneva", tag: "American", fields: "Arts • Sciences • Business", url: "https://webster.ch/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "International University in Geneva", location: "Geneva", tag: "Global", fields: "Business • IT", url: "https://www.iun.ch/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "American Institute of Applied Sciences (in Switzerland)", location: "La Tour-de-Peilz", tag: "Applied", fields: "Applied Sciences", url: "https://www.aus.swiss/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" }
            ]
        },
        chapter4Title: 'Switzerland <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in the Alps.',
        didYouKnow: 'Switzerland offers a <span className="text-red-600 font-bold">6-month post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 's1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Swiss university." },
            { id: 's2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 's3', step: "3", title: "Visa Application", desc: "Submit your student visa application at the Swiss embassy." },
            { id: 's4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in Switzerland." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Europe.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-red-500 italic">Grüezi?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Switzerland.'
    },
    malta: {
        id: 'malta',
        name: 'Malta',
        colorTheme: 'orange',
        heroImage: 'https://images.unsplash.com/photo-1514222288957-492e72394164?q=80&w=1200',
        heroBadge: 'Study in Malta',
        heroTitle1: 'The Mediterranean',
        heroTitle2: 'Gem',
        heroDesc: 'Experience affordable English-speaking education in the heart of the Mediterranean.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-orange-100">Valletta</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-orange-100">Sliema</span>, Malta offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <MessageSquare />, title: "English-Speaking", desc: "An English-speaking country with a rich cultural heritage." },
            { id: 'h2', icon: <Compass />, title: "Mediterranean Lifestyle", desc: "Enjoy over 300 days of sunshine a year and a relaxed pace of life." },
            { id: 'h3', icon: <GraduationCap />, title: "High-quality education", desc: "Excellent academic standards with degrees recognized globally." },
            { id: 'h4', icon: <TrendingUp />, title: "Career Growth", desc: "Benefit from a growing economy and opportunities in tourism and tech." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Malta is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Valletta", desc: "The capital city, UNESCO World Heritage Site", stats: "Historic Capital • Cultural Hub", rating: "The Fortress City", image: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1200" },
            { name: "Mdina", desc: "The ancient walled \"Silent City,\" former capital", stats: "Historic City • Medieval", rating: "The Silent City", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200" },
            { name: "Sliema", desc: "Modern coastal town, shopping and dining hub", stats: "Commercial Hub • Coastal City", rating: "The Shopping Capital", image: "https://images.unsplash.com/photo-1514222288957-492e72394164?q=80&w=1200" },
            { name: "Gozo (Victoria/Rabat)", desc: "Malta's sister island with the Citadel", stats: "Island Life • Historic", rating: "The Sister Island", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1200" },
            { name: "Birgu (Vittoriosa)", desc: "Historic fortified city, part of the Three Cities", stats: "Historic Port • Maritime", rating: "The Maritime City", image: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Malta is home to some of the world\'s most prestigious universities and institutes.',
        universities: {
            "Established/Traditional Universities": [
                { name: "University of Malta", location: "Msida", tag: "Historic", fields: "Arts • Sciences • Business", url: "https://www.um.edu.mt/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "Queen Mary University (Malta)", location: "Victoria", tag: "Medical", fields: "Medicine • Surgery", url: "https://www.qmul.ac.uk/malta/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "Mediterranean University of Valletta", location: "Valletta", tag: "Global", fields: "Business • Management", url: "https://muv.edu.mt/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "International European University Ukraine (Malta)", location: "Gzira", tag: "International", fields: "Medicine • Business", url: "https://ieu.edu.ua/malta", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Saint Martin's Institute of Higher Education", location: "Hamrun", tag: "Academic", fields: "Computing • Commerce", url: "https://www.stmartins.edu/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" }
            ],
            "Business & Specialized Institutions": [
                { name: "Ascencia Business School Malta", location: "Valletta", tag: "Business", fields: "Management • Marketing", url: "https://ascencia-business-school.com/malta/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "London School of Commerce (Malta)", location: "Valletta", tag: "Commerce", fields: "Business • Finance", url: "https://www.lscmalta.edu.mt/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Global Business Studies - GBS Malta", location: "St. Julian's", tag: "Global", fields: "Business • Management", url: "https://globalbusinessstudies.com.mt/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Global College Malta", location: "SmartCity", tag: "Business", fields: "Management • Tourism", url: "https://gcmalta.com/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "European College of Innovation", location: "Valletta", tag: "Innovation", fields: "Tech • Business", url: "https://eci.edu.mt/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" }
            ],
            "Vocational & Professional Training": [
                { name: "Institute of Tourism Studies (Malta)", location: "Luqa", tag: "Tourism", fields: "Hospitality • Tourism", url: "https://its.edu.mt/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Learnkey Training Institute", location: "B'Kara", tag: "Training", fields: "IT • Business", url: "https://www.learnkey.com.mt/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "Malta International College", location: "Valletta", tag: "Professional", fields: "Management • Arts", url: "https://mic.edu.mt/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "Cross College Malta", location: "Valletta", tag: "Vocational", fields: "Skills • Training", url: "https://crosscollege.edu.mt/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" }
            ]
        },
        chapter4Title: 'Malta <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in the Mediterranean.',
        didYouKnow: 'Malta offers a <span className="text-orange-600 font-bold">9-month post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'm1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Maltese university." },
            { id: 'm2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 'm3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 'm4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in Malta." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Europe.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-orange-500 italic">Merħba?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Malta.'
    },
    canada: {
        id: 'canada',
        name: 'Canada',
        colorTheme: 'red',
        heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200',
        heroBadge: 'Study in Canada',
        heroTitle1: 'The Great',
        heroTitle2: 'White North',
        heroDesc: 'Experience high quality of life, diversity, and welcoming post-study work policies.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-red-100">Toronto</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-red-100">Vancouver</span>, Canada offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <GraduationCap />, title: "World-Class Universities", desc: "Home to some of the top-ranked universities globally." },
            { id: 'h2', icon: <Globe />, title: "Multicultural & Welcoming", desc: "Known for its friendly locals and safe, inclusive environment for international students." },
            { id: 'h3', icon: <TrendingUp />, title: "Strong Job Market", desc: "Benefit from a 3-year post-study work visa to kickstart your career in North America." },
            { id: 'h4', icon: <Compass />, title: "Stunning Landscapes", desc: "Explore diverse natural wonders from coast to coast." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Canada is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Toronto", desc: "The largest city, Canada's financial and cultural capital", stats: "Financial Hub • Cultural Capital", rating: "The Queen City", image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=1200" },
            { name: "Vancouver", desc: "Pacific coast gem, mountains meet ocean backdrop", stats: "Coastal City • Nature Hub", rating: "The Terminal City", image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=1200" },
            { name: "Montreal", desc: "Bilingual metropolis, North America's French cultural heart", stats: "Cultural Hub • Bilingual", rating: "The City of Saints", image: "https://images.unsplash.com/photo-1519178125445-5629161a096c?q=80&w=1200" },
            { name: "Quebec City", desc: "UNESCO-listed Old Town, only walled city north of Mexico", stats: "Historic City • UNESCO Site", rating: "The Old Capital", image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=1200" },
            { name: "Ottawa", desc: "The nation's capital, home to Parliament Hill and national museums", stats: "Federal Capital • Museum Hub", rating: "The Capital City", image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200" },
            { name: "Calgary", desc: "Gateway to the Rockies, host of the legendary 1988 Winter Olympics", stats: "Rockies Gateway • Olympic City", rating: "Cowtown", image: "https://images.unsplash.com/photo-1519178125445-5629161a096c?q=80&w=1200" },
            { name: "Halifax", desc: "Historic Atlantic port city, maritime heritage and vibrant waterfront", stats: "Atlantic Port • Maritime Hub", rating: "The City of Trees", image: "https://images.unsplash.com/photo-1555854816-80131246f24d?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Canada is home to some of the world\'s most prestigious universities and colleges.',
        universities: {
            "Public Colleges of Applied Arts & Technology": [
                { name: "George Brown College", location: "Toronto", tag: "Applied", fields: "Business • Arts", url: "https://www.georgebrown.ca/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "Sheridan College", location: "Oakville", tag: "Creative", fields: "Animation • Design", url: "https://www.sheridancollege.ca/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "Centennial College", location: "Toronto", tag: "Global", fields: "Business • Engineering", url: "https://www.centennialcollege.ca/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "Niagara College", location: "Welland", tag: "Applied", fields: "Hospitality • Business", url: "https://www.niagaracollege.ca/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Fanshawe College", location: "London", tag: "Applied", fields: "Arts • Tech", url: "https://www.fanshawec.ca/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "Durham College", location: "Oshawa", tag: "Applied", fields: "Business • Tech", url: "https://durhamcollege.ca/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Fleming College", location: "Peterborough", tag: "Applied", fields: "Environment • Arts", url: "https://flemingcollege.ca/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Georgian College", location: "Barrie", tag: "Applied", fields: "Business • Tech", url: "https://www.georgiancollege.ca/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Cambrian College", location: "Sudbury", tag: "Applied", fields: "Tech • Health", url: "https://cambriancollege.ca/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "Conestoga College", location: "Kitchener", tag: "Applied", fields: "Engineering • Business", url: "https://www.conestogac.on.ca/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "North Island College", location: "Courtenay", tag: "Applied", fields: "Arts • Sciences", url: "https://www.nic.bc.ca/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Lakeland College", location: "Vermilion", tag: "Applied", fields: "Agriculture • Business", url: "https://www.lakelandcollege.ca/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "Selkirk College", location: "Castlegar", tag: "Applied", fields: "Arts • Sciences", url: "https://selkirk.ca/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "Great Plains College", location: "Swift Current", tag: "Applied", fields: "Business • Tech", url: "https://www.greatplainscollege.ca/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" }
            ],
            "Polytechnics": [
                { name: "Seneca Polytechnic", location: "Toronto", tag: "Polytechnic", fields: "Business • Tech", url: "https://www.senecapolytechnic.ca/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "Humber Polytechnic", location: "Toronto", tag: "Polytechnic", fields: "Applied Tech • Business", url: "https://humber.ca/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "Saskatchewan Polytechnic", location: "Saskatoon", tag: "Polytechnic", fields: "Tech • Business", url: "https://saskpolytech.ca/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "Vancouver Film School", location: "Vancouver", tag: "Creative", fields: "Film • Animation", url: "https://vfs.edu/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "Toronto Film School", location: "Toronto", tag: "Creative", fields: "Film • Media", url: "https://www.torontofilmschool.ca/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" }
            ],
            "Research Universities": [
                { name: "University of Waterloo", location: "Waterloo", tag: "Research", fields: "Engineering • CS", url: "https://uwaterloo.ca/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "University of Ottawa", location: "Ottawa", tag: "Research", fields: "Medicine • Law", url: "https://www.uottawa.ca/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Dalhousie University", location: "Halifax", tag: "Research", fields: "Sciences • Arts", url: "https://www.dal.ca/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "University of Guelph", location: "Guelph", tag: "Research", fields: "Agri • Vet", url: "https://www.uoguelph.ca/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "University of Manitoba", location: "Winnipeg", tag: "Research", fields: "Arts • Sciences", url: "https://umanitoba.ca/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "University of Windsor", location: "Windsor", tag: "Research", fields: "Engineering • Business", url: "https://www.uwindsor.ca/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "University of Regina", location: "Regina", tag: "Research", fields: "Arts • Sciences", url: "https://www.uregina.ca/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" }
            ],
            "Urban Professional & Mid-Sized Universities": [
                { name: "Toronto Metropolitan University", location: "Toronto", tag: "Urban", fields: "Business • Media", url: "https://www.torontomu.ca/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "Brock University", location: "St. Catharines", tag: "Mid-Sized", fields: "Business • Sports", url: "https://brocku.ca/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "Lakehead University", location: "Thunder Bay", tag: "Mid-Sized", fields: "Arts • Sciences", url: "https://www.lakeheadu.ca/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
                { name: "Trent University", location: "Peterborough", tag: "Mid-Sized", fields: "Arts • Sciences", url: "https://www.trentu.ca/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "Nipissing University", location: "North Bay", tag: "Mid-Sized", fields: "Arts • Sciences", url: "https://www.nipissingu.ca/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" }
            ],
            "Regional Impact & Pathway Universities": [
                { name: "Thompson Rivers University", location: "Kamloops", tag: "Regional", fields: "Arts • Sciences", url: "https://www.tru.ca/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "Vancouver Island University", location: "Nanaimo", tag: "Regional", fields: "Arts • Sciences", url: "https://www.viu.ca/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "Capilano University", location: "North Vancouver", tag: "Regional", fields: "Arts • Sciences", url: "https://www.capilanou.ca/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Cape Breton University", location: "Sydney", tag: "Regional", fields: "Arts • Sciences", url: "https://www.cbu.ca/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "University of Winnipeg", location: "Winnipeg", tag: "Regional", fields: "Arts • Sciences", url: "https://www.uwinnipeg.ca/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" }
            ],
            "Private Academic & Global Partner Institutions": [
                { name: "University Canada West", location: "Vancouver", tag: "Private", fields: "Business • Management", url: "https://www.ucanwest.ca/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Trinity Western University", location: "Langley", tag: "Private", fields: "Arts • Sciences", url: "https://www.twu.ca/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "University of Niagara Falls", location: "Niagara Falls", tag: "Private", fields: "Business • Tech", url: "https://unfc.ca/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "Niagara University", location: "Vaughan", tag: "Private", fields: "Arts • Sciences", url: "https://www.niagara.edu/ontario/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "Vancouver Premier College", location: "Vancouver", tag: "Private", fields: "Hospitality • Business", url: "https://vpcollege.com/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Oxford International College", location: "Vancouver", tag: "Private", fields: "Pathway • Languages", url: "https://www.oxfordinternational.com/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" }
            ]
        },
        chapter4Title: 'Canada <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in North America.',
        didYouKnow: 'Canada offers a <span className="text-red-600 font-bold">3-year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'c1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Canadian Institution." },
            { id: 'c2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 'c3', step: "3", title: "Letter of Acceptance", desc: "Obtain your official Letter of Acceptance (LOA) required for your study permit." },
            { id: 'c4', step: "4", title: "Visa Application", desc: "Submit your student visa application and provide biometrics at a Visa Application Centre." },
            { id: 'c5', step: "5", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for your travel, health insurance, and life in Canada." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of North America.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-red-500 italic">Hello?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Canada.'
    },
    australia: {
        id: 'australia',
        name: 'Australia',
        colorTheme: 'blue',
        heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200',
        heroBadge: 'Study in Australia',
        heroTitle1: 'The Land',
        heroTitle2: 'Down Under',
        heroDesc: 'Experience high standard of living and top-tier research institutions.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-blue-100">Sydney</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-blue-100">Melbourne</span>, Australia offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <GraduationCap />, title: "Strong University System", desc: "World-renowned institutions offering a wide range of programs." },
            { id: 'h2', icon: <Compass />, title: "Lifestyle & Climate", desc: "Enjoy a fantastic outdoor lifestyle with great weather year-round." },
            { id: 'h3', icon: <Globe />, title: "International Community", desc: "Join a diverse student body from all over the world." },
            { id: 'h4', icon: <Heart />, title: "High Quality of Life", desc: "Consistently ranked as one of the best countries to live in." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Australia is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Sydney", desc: "Largest city, iconic Opera House and Harbour Bridge on the Pacific coast", stats: "Global City • Coastal Hub", rating: "The Emerald City", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200" },
            { name: "Melbourne", desc: "Cultural capital, world-renowned coffee scene and laneway arts", stats: "Cultural Hub • Arts Center", rating: "The Garden City", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=1200" },
            { name: "Brisbane", desc: "Sun-drenched Queensland hub, gateway to the Gold Coast", stats: "Sunshine City • River Hub", rating: "The River City", image: "https://images.unsplash.com/photo-1560728021-15038b2f3886?q=80&w=1200" },
            { name: "Perth", desc: "Remote western jewel, pristine beaches and booming mining economy", stats: "Western Hub • Mining Center", rating: "The City of Light", image: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?q=80&w=1200" },
            { name: "Adelaide", desc: "Festival city, wine regions and elegant colonial streetscapes", stats: "Festival City • Wine Hub", rating: "The City of Churches", image: "https://images.unsplash.com/photo-1558941572-887895088915?q=80&w=1200" },
            { name: "Cairns", desc: "Tropical gateway to the Great Barrier Reef and Daintree Rainforest", stats: "Tropical Hub • Reef Gateway", rating: "The Tropical Capital", image: "https://images.unsplash.com/photo-1560728021-15038b2f3886?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Australia is home to some of the world\'s most prestigious universities and colleges.',
        universities: {
            "Research & Group of Eight universities": [
                { name: "The University of New South Wales", location: "Sydney", tag: "Go8", fields: "Engineering • Business", url: "https://www.unsw.edu.au/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "The University of Queensland", location: "Brisbane", tag: "Go8", fields: "Sciences • Arts", url: "https://www.uq.edu.au/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "University of Western Australia College", location: "Perth", tag: "Go8", fields: "Arts • Sciences", url: "https://www.uwa.edu.au/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "The University of Adelaide", location: "Adelaide", tag: "Go8", fields: "Medicine • Law", url: "https://www.adelaide.edu.au/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" }
            ],
            "Regional & teaching universities": [
                { name: "University of Wollongong", location: "Wollongong", tag: "Regional", fields: "Tech • Arts", url: "https://www.uow.edu.au/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "The University of Newcastle", location: "Newcastle", tag: "Regional", fields: "Health • Engineering", url: "https://www.newcastle.edu.au/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "La Trobe University", location: "Melbourne", tag: "Teaching", fields: "Arts • Sciences", url: "https://www.latrobe.edu.au/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Swinburne University of Technology", location: "Melbourne", tag: "Tech", fields: "Design • Tech", url: "https://www.swinburne.edu.au/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Western Sydney University", location: "Sydney", tag: "Urban", fields: "Arts • Sciences", url: "https://www.westernsydney.edu.au/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "University of Tasmania", location: "Hobart", tag: "Regional", fields: "Marine • Arts", url: "https://www.utas.edu.au/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "James Cook University", location: "Townsville", tag: "Regional", fields: "Marine Science", url: "https://www.jcu.edu.au/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "CQUniversity Australia", location: "Rockhampton", tag: "Regional", fields: "Arts • Sciences", url: "https://www.cqu.edu.au/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "Charles Sturt University", location: "Bathurst", tag: "Regional", fields: "Arts • Sciences", url: "https://www.csu.edu.au/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "The University of Notre Dame Australia", location: "Fremantle", tag: "Private", fields: "Arts • Sciences", url: "https://www.nd.edu.au/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
                { name: "Victoria University", location: "Melbourne", tag: "Urban", fields: "Arts • Sciences", url: "https://www.vu.edu.au/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "University of Canberra", location: "Canberra", tag: "Urban", fields: "Arts • Sciences", url: "https://www.canberra.edu.au/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "University of the Sunshine Coast", location: "Sippy Downs", tag: "Regional", fields: "Arts • Sciences", url: "https://www.usc.edu.au/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" }
            ],
            "Private colleges & specialist providers": [
                { name: "Holmes Institute Australia", location: "Melbourne", tag: "Private", fields: "Business • IT", url: "https://www.holmes.edu.au/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "Asia Pacific International College", location: "Sydney", tag: "Private", fields: "Business • IT", url: "https://apicollege.edu.au/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Kent Institute Australia", location: "Sydney", tag: "Private", fields: "Business • IT", url: "https://kent.edu.au/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "International College of Management Sydney", location: "Manly", tag: "Private", fields: "Hospitality • Business", url: "https://www.icms.edu.au/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Engineering Institute of Technology, Perth", location: "Perth", tag: "Specialist", fields: "Engineering", url: "https://www.eit.edu.au/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Excelsia University College", location: "Sydney", tag: "Private", fields: "Arts • Business", url: "https://excelsia.edu.au/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Ironwood Institute Adelaide", location: "Adelaide", tag: "Specialist", fields: "Agri • Business", url: "https://www.ironwood.edu.au/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "Sydney Institute of Business & Technology", location: "Sydney", tag: "Pathway", fields: "Business • IT", url: "https://www.sibt.nsw.edu.au/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "South Australia Institute of Business & Technology", location: "Adelaide", tag: "Pathway", fields: "Business • IT", url: "https://www.saibt.sa.edu.au/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Russo Business School", location: "Brisbane", tag: "Private", fields: "Business", url: "https://russo.qld.edu.au/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" },
                { name: "UNSW College", location: "Sydney", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.unswcollege.edu.au/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "UTS College", location: "Sydney", tag: "Pathway", fields: "Arts • Sciences", url: "https://utscollege.edu.au/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
                { name: "Griffith College", location: "Brisbane", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.griffithcollege.edu.au/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "Deakin College", location: "Melbourne", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.deakincollege.edu.au/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "Edith Cowan College", location: "Perth", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.edithcowancollege.edu.au/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "University of Canberra College", location: "Canberra", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.canberra.edu.au/uc-college", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" }
            ],
            "Vocational education & RTOs": [
                { name: "National Academy of Professional Studies (NAPS)", location: "Sydney", tag: "Vocational", fields: "Business • Accounting", url: "https://naps.edu.au/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Australian College of Applied Professions", location: "Sydney", tag: "Vocational", fields: "Psychology • Business", url: "https://www.acap.edu.au/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "Curtin College", location: "Perth", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.curtincollege.edu.au/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Eynesbury College", location: "Adelaide", tag: "Pathway", fields: "Arts • Sciences", url: "https://www.eynesbury.navitas.com/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" }
            ]
        },
        chapter4Title: 'Australia <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying Down Under.',
        didYouKnow: 'Australia offers a <span className="text-blue-600 font-bold">2-4 year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'a1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Australian university." },
            { id: 'a2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses." },
            { id: 'a3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 'a4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in Australia." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Oceania.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-blue-500 italic">G\'day?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Australia.'
    },
    'new-zealand': {
        id: 'new-zealand',
        name: 'New Zealand',
        colorTheme: 'rose',
        heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200',
        heroBadge: 'Study in New Zealand',
        heroTitle1: 'The Land of',
        heroTitle2: 'the Long White Cloud',
        heroDesc: 'Experience safe, scenic environment excellent for research-based programs.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-rose-100">Auckland</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-rose-100">Wellington</span>, New Zealand offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <GraduationCap />, title: "Quality Education", desc: "All New Zealand universities are ranked in the top 3% globally." },
            { id: 'h2', icon: <ShieldCheck />, title: "Safety & Quality of Life", desc: "Consistently ranked as one of the safest and most peaceful countries in the world." },
            { id: 'h3', icon: <Compass />, title: "Stunning Natural Environment", desc: "Study in a country famous for its unparalleled natural beauty and outdoor lifestyle." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'New Zealand is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Auckland", desc: "The 'City of Sails,' NZ's largest urban area with a stunning harbor and diverse culture", stats: "Economic Hub • Coastal City", rating: "The City of Sails", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200" },
            { name: "Wellington", desc: "The creative, windy capital known for its vibrant arts scene and waterfront", stats: "Capital City • Creative Hub", rating: "Windy Wellington", image: "https://images.unsplash.com/photo-1589871181136-946619605470?q=80&w=1200" },
            { name: "Christchurch", desc: "The 'Garden City,' blending English heritage with modern innovation and resilience", stats: "Garden City • Innovation Hub", rating: "The Garden City", image: "https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=1200" },
            { name: "Queenstown", desc: "The world's adventure capital, famous for bungee jumping, skiing, and lake views", stats: "Adventure Capital • Tourism Hub", rating: "Adventure Capital", image: "https://images.unsplash.com/photo-1589871181136-946619605470?q=80&w=1200" },
            { name: "Rotorua", desc: "A geothermal wonderland rich in Māori culture and natural hot springs", stats: "Cultural Hub • Geothermal Center", rating: "Sulphur City", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'New Zealand offers a high-quality education system with globally recognized qualifications.',
        universities: {
            "Universities": [
                { name: "University of Auckland", location: "Auckland", tag: "Top Ranked", fields: "Arts • Sciences • Business", url: "https://www.auckland.ac.nz/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "University of Otago", location: "Dunedin", tag: "Historic", fields: "Medicine • Law • Arts", url: "https://www.otago.ac.nz/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "Victoria University of Wellington", location: "Wellington", tag: "Capital", fields: "Politics • Design • Law", url: "https://www.wgtn.ac.nz/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "University of Canterbury", location: "Christchurch", tag: "Research", fields: "Engineering • Sciences", url: "https://www.canterbury.ac.nz/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "Massey University", location: "Palmerston North", tag: "Applied", fields: "Agriculture • Aviation", url: "https://www.massey.ac.nz/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "University of Waikato", location: "Hamilton", tag: "Innovation", fields: "Management • IT", url: "https://www.waikato.ac.nz/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Lincoln University", location: "Lincoln", tag: "Specialist", fields: "Agri • Tourism • Land", url: "https://www.lincoln.ac.nz/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Auckland University of Technology (AUT)", location: "Auckland", tag: "Tech", fields: "Design • Tech • Sports", url: "https://www.aut.ac.nz/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" }
            ],
            "Institutes of technology & polytechnics (ITPs)": [
                { name: "Te Pūkenga – New Zealand Institute of Skills and Technology", location: "National", tag: "Vocational", fields: "Trades • Tech • Health", url: "https://tepukenga.ac.nz/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "Unitec Institute of Technology", location: "Auckland", tag: "Vocational", fields: "Design • Tech", url: "https://www.unitec.ac.nz/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "Otago Polytechnic", location: "Dunedin", tag: "Vocational", fields: "Arts • Tech", url: "https://www.op.ac.nz/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
                { name: "Southern Institute of Technology (SIT)", location: "Invercargill", tag: "Vocational", fields: "Tech • Arts", url: "https://www.sit.ac.nz/", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" }
            ],
            "Private training establishments (PTEs)": [
                { name: "UP Education", location: "Auckland", tag: "Private", fields: "Pathway • Vocational", url: "https://www.up.education/", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
                { name: "Navitas", location: "Auckland", tag: "Private", fields: "Pathway • Business", url: "https://www.navitas.com/", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
                { name: "Pacific International Hotel Management School (PIHMS)", location: "New Plymouth", tag: "Private", fields: "Hospitality", url: "https://www.pihms.ac.nz/", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
                { name: "Le Cordon Bleu New Zealand", location: "Wellington", tag: "Private", fields: "Culinary Arts", url: "https://www.cordonbleu.edu/newzealand", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" },
                { name: "Queenstown Resort College (QRC)", location: "Queenstown", tag: "Private", fields: "Tourism • Hospitality", url: "https://www.qrc.ac.nz/", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
                { name: "International Travel College of New Zealand (ITC)", location: "Auckland", tag: "Private", fields: "Travel • Tourism", url: "https://www.itc.co.nz/", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" },
                { name: "The Culinary Collective", location: "Auckland", tag: "Private", fields: "Culinary Arts", url: "https://www.culinarycollective.co.nz/", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800" },
                { name: "New Zealand School of Tourism", location: "National", tag: "Private", fields: "Tourism • Travel", url: "https://nzschooloftourism.co.nz/", image: "https://images.unsplash.com/photo-1525926477800-7a3afdbbeafc?q=80&w=800" },
                { name: "Whitecliffe College of Arts and Design", location: "Auckland", tag: "Private", fields: "Arts • Design • IT", url: "https://www.whitecliffe.ac.nz/", image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800" },
                { name: "Media Design School", location: "Auckland", tag: "Private", fields: "Design • Tech", url: "https://www.mediadesignschool.com/", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800" },
                { name: "Aspire2 International", location: "Auckland", tag: "Private", fields: "Business • IT • Hospitality", url: "https://aspire2international.ac.nz/", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
                { name: "Newton College of Business and Technology (NCBT)", location: "Auckland", tag: "Private", fields: "Business • IT", url: "https://www.ncbt.ac.nz/", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
                { name: "Abacus Institute of Studies", location: "Auckland", tag: "Private", fields: "Business • IT", url: "https://www.abacusinstitute.ac.nz/", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
                { name: "IBS University (International Business School)", location: "Auckland", tag: "Private", fields: "Business", url: "https://www.ibs.ac.nz/", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" }
            ]
        },
        chapter4Title: 'New Zealand <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in Oceania.',
        didYouKnow: 'New Zealand offers a <span className="text-blue-600 font-bold">3-year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'n1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen New Zealand university." },
            { id: 'n2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 'n3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 'n4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in New Zealand." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Oceania.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-blue-500 italic">Kia Ora?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in New Zealand.'
    },
    singapore: {
        id: 'singapore',
        name: 'Singapore',
        colorTheme: 'pink',
        heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200',
        heroBadge: 'Study in Singapore',
        heroTitle1: 'The Lion',
        heroTitle2: 'City',
        heroDesc: 'Experience a global business hub with top-ranked universities in Asia.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'Singapore offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <Building2 />, title: "Global Business Hub", desc: "Home to the Asian headquarters of major multinational corporations." },
            { id: 'h2', icon: <GraduationCap />, title: "World-Class Universities", desc: "Top-ranked institutions offering rigorous academic programs." },
            { id: 'h3', icon: <Plane />, title: "Gateway to Asia", desc: "Perfectly positioned for travel and business across the Asian continent." },
            { id: 'h4', icon: <Heart />, title: "Food & Lifestyle", desc: "A melting pot of cultures with an incredible culinary scene." },
            { id: 'h5', icon: <TrendingUp />, title: "Career Growth", desc: "Benefit from a strong economy and opportunities in tech and finance." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Singapore is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Singapore", desc: "The bustling financial capital, a major center for technology and business.", stats: "Finance Hub • Global City", rating: "The Economic Engine", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Singapore is home to some of the world\'s most prestigious universities and institutes.',
        universities: {
            "Top Universities": [
                { name: "National University of Singapore", location: "Singapore", tag: "Historic", fields: "Arts • Sciences • Business", url: "https://nus.edu.sg/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" }
            ]
        },
        chapter4Title: 'Singapore <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in Asia.',
        didYouKnow: 'Singapore offers a <span className="text-pink-600 font-bold">1-year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 's1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Singaporean university." },
            { id: 's2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 's3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 's4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in Singapore." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Asia.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-pink-500 italic">Hello?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Singapore.'
    },
    malaysia: {
        id: 'malaysia',
        name: 'Malaysia',
        colorTheme: 'indigo',
        heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200',
        heroBadge: 'Study in Malaysia',
        heroTitle1: 'Truly',
        heroTitle2: 'Asia',
        heroDesc: 'Experience affordable education with twinning programs from UK and Aus.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-indigo-100">Kuala Lumpur</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-indigo-100">Penang</span>, Malaysia offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <GraduationCap />, title: "Branch Campuses of Global Universities", desc: "Earn degrees from top UK, US, and Australian universities at a fraction of the cost." },
            { id: 'h2', icon: <Globe />, title: "Culturally Familiar", desc: "A diverse, multicultural society that is welcoming to international students." },
            { id: 'h3', icon: <Heart />, title: "Food & Lifestyle", desc: "Enjoy a vibrant lifestyle and some of the best food in Southeast Asia." },
            { id: 'h4', icon: <TrendingUp />, title: "Affordable Education", desc: "High-quality education and low cost of living compared to other study destinations." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'Malaysia is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Kuala Lumpur", desc: "The bustling financial capital, a major center for technology and business.", stats: "Finance Hub • Global City", rating: "The Economic Engine", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'Malaysia is home to some of the world\'s most prestigious universities and institutes.',
        universities: {
            "Top Universities": [
                { name: "University of Malaya", location: "Kuala Lumpur", tag: "Historic", fields: "Arts • Sciences • Business", url: "https://www.um.edu.my/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" }
            ]
        },
        chapter4Title: 'Malaysia <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in Asia.',
        didYouKnow: 'Malaysia offers a <span className="text-indigo-600 font-bold">1-year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'm1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen Malaysian university." },
            { id: 'm2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 'm3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 'm4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in Malaysia." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Asia.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-indigo-500 italic">Selamat Datang?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in Malaysia.'
    },
    'south-korea': {
        id: 'south-korea',
        name: 'South Korea',
        colorTheme: 'indigo',
        heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1200',
        heroBadge: 'Study in South Korea',
        heroTitle1: 'The Land of',
        heroTitle2: 'Morning Calm',
        heroDesc: 'Experience a leader in innovation with generous scholarship opportunities.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-indigo-100">Seoul</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-indigo-100">Busan</span>, South Korea offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <Zap />, title: "Tech & Innovation Hub", desc: "Home to major tech giants and a thriving, globally-leading startup ecosystem." },
            { id: 'h2', icon: <Palette />, title: "Culture", desc: "Immerse yourself in K-Pop, K-Dramas, and a rich, ancient heritage." },
            { id: 'h3', icon: <Heart />, title: "Food & Lifestyle", desc: "Enjoy a dynamic, fast-paced lifestyle and world-renowned cuisine." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'South Korea is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Seoul", desc: "The bustling financial capital, a major center for technology and business.", stats: "Finance Hub • Global City", rating: "The Economic Engine", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'South Korea is home to some of the world\'s most prestigious universities and institutes.',
        universities: {
            "Top Universities": [
                { name: "Seoul National University", location: "Seoul", tag: "Historic", fields: "Arts • Sciences • Business", url: "https://en.snu.ac.kr/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" }
            ]
        },
        chapter4Title: 'South Korea <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in Asia.',
        didYouKnow: 'South Korea offers a <span className="text-gray-600 font-bold">1-year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'sk1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen South Korean university." },
            { id: 'sk2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 'sk3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 'sk4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in South Korea." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of Asia.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-gray-500 italic">Annyeonghaseyo?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in South Korea.'
    },
    uae: {
        id: 'uae',
        name: 'UAE',
        colorTheme: 'emerald',
        heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
        heroBadge: 'Study in UAE',
        heroTitle1: 'The Pearl of',
        heroTitle2: 'the Gulf',
        heroDesc: 'Experience a global hub for business and innovation in the heart of the Middle East.',
        chapter1Title: 'A Hub of Innovation',
        chapter1Desc: 'From the historic streets of <span className="text-[#1A1F2C] border-b-2 border-emerald-100">Dubai</span> to the vibrant energy of <span className="text-[#1A1F2C] border-b-2 border-emerald-100">Abu Dhabi</span>, UAE offers an education system respected worldwide.',
        chapter1Cards: [
            { id: 'h1', icon: <GraduationCap />, title: "Fast-Growing Education Hub", desc: "Home to numerous international branch campuses and top-ranked local universities." },
            { id: 'h2', icon: <TrendingUp />, title: "Career Growth", desc: "Excellent post-study work opportunities in a booming, tax-free economy." },
            { id: 'h3', icon: <Building2 />, title: "Global Business Hub", desc: "The Middle Eastern headquarters for major multinational corporations." },
            { id: 'h4', icon: <Globe />, title: "Welcoming Culture", desc: "A highly diverse, expatriate-friendly environment with a high standard of living." }
        ],
        chapter2Title: 'Explore Vibrant Cities',
        chapter2Desc: 'UAE is a tapestry of cultures. Choose the environment that inspires you.',
        cities: [
            { name: "Dubai", desc: "The bustling financial capital, a major center for technology and business.", stats: "Finance Hub • Global City", rating: "The Economic Engine", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200" }
        ],
        chapter3Title: 'World-Class <br /> Education',
        chapter3Desc: 'UAE is home to some of the world\'s most prestigious universities and institutes.',
        universities: {
            "Top Universities": [
                { name: "United Arab Emirates University", location: "Al Ain", tag: "Historic", fields: "Arts • Sciences • Business", url: "https://www.uaeu.ac.ae/", image: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=800" }
            ]
        },
        chapter4Title: 'UAE <br /> Essentials Hub',
        chapter4Desc: 'A comprehensive overview of your journey to studying in the Middle East.',
        didYouKnow: 'UAE offers a <span className="text-emerald-600 font-bold">1-year post-study work visa</span> for students to find employment after graduation.',
        essentials: [
            { id: 'u1', step: "1", title: "University Admission", desc: "Secure your Offer Letter from your chosen UAE university." },
            { id: 'u2', step: "2", title: "Financial Proof", desc: "Show proof of funds for living expenses and tuition." },
            { id: 'u3', step: "3", title: "Visa Application", desc: "Submit your student visa application." },
            { id: 'u4', step: "4", title: "Pre-departure Briefing", desc: "Attend our briefing to prepare for life in UAE." }
        ],
        chapter5Title: 'Life Beyond Study',
        chapter5Desc: 'Real stories and vibrant lifestyle from the heart of the Middle East.',
        bentoGrid: null,
        ctaTitle: 'Ready to say <br /> <span className="text-emerald-500 italic">Marhaba?</span>',
        ctaDesc: 'Our team of experts will guide you through university selection, applications, visas, and finding your perfect home in UAE.'
    }
};
