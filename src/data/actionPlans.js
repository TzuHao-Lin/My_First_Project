export const actionPlans = {
  Healthcare: {
    watch: "Watch a day-in-the-life video from a doctor, nurse, pharmacist, or therapist.",
    try: "Take a first aid course, read a simple medical case, or volunteer in a health-related setting.",
    join: "Join a biology club, health science club, hospital volunteer program, or mental health awareness group.",
    learn: "Start with biology basics, human body systems, patient communication, and medical ethics."
  },
  Aviation: {
    watch: "Watch cockpit procedure videos, flight simulator tutorials, or aviation safety explainers.",
    try: "Use a flight simulator and practice following a checklist from takeoff to landing.",
    join: "Join an aviation camp, airport tour, model aircraft club, or school aviation group.",
    learn: "Start with weather, navigation, aircraft controls, communication, and safety procedures."
  },
  Language: {
    watch: "Watch translator interviews, subtitle comparison videos, or bilingual content breakdowns.",
    try: "Translate a short article, song subtitle, or school announcement into another language.",
    join: "Join a language exchange, bilingual club, writing club, or subtitle volunteer project.",
    learn: "Build vocabulary, grammar accuracy, cultural context, editing, and research habits."
  },
  Engineering: {
    watch: "Watch project breakdowns about bridges, rockets, medical devices, machines, or architecture.",
    try: "Build a small model, sketch a design, use CAD, or test a simple engineering prototype.",
    join: "Join robotics, physics club, engineering club, model rocket club, or design-build competitions.",
    learn: "Start with physics, math, CAD, prototyping, problem solving, and technical documentation."
  },
  Science: {
    watch: "Watch lab tour videos, scientist interviews, or explainers about biology and chemistry discoveries.",
    try: "Run a safe home experiment, observe samples with a microscope, or analyze a public science dataset.",
    join: "Join science club, research programs, lab volunteering, science fair, or biology/chemistry competitions.",
    learn: "Start with experimental design, lab safety, statistics, scientific writing, and observation skills."
  },
  Technology: {
    watch: "Watch beginner coding, data dashboard, or cybersecurity lab videos.",
    try: "Build a small website, analyze a dataset, or complete a beginner security challenge.",
    join: "Join a coding club, hackathon, data club, robotics team, or cybersecurity CTF group.",
    learn: "Start with JavaScript or Python, debugging, data basics, logical thinking, and project building."
  },
  Design: {
    watch: "Watch UX case studies, room makeover videos, Figma tutorials, or portfolio reviews.",
    try: "Redesign an app screen, create a room mood board, or interview someone about a product problem.",
    join: "Join art club, design club, yearbook, product design group, or a Figma community challenge.",
    learn: "Start with visual hierarchy, user research, layout, color, prototyping, and feedback loops."
  },
  Business: {
    watch: "Watch marketing campaign breakdowns, finance explainers, or startup pitch videos.",
    try: "Track a small budget, run a mock campaign, or test a simple product idea with friends.",
    join: "Join business club, DECA, student government, finance club, or entrepreneurship competitions.",
    learn: "Start with communication, spreadsheets, customer research, budgeting, strategy, and presentation."
  },
  Law: {
    watch: "Watch mock trial clips, legal case explainers, or debate strategy videos.",
    try: "Analyze a current event from both sides and write a short argument with evidence.",
    join: "Join debate club, mock trial, student government, Model UN, or public speaking groups.",
    learn: "Start with reading comprehension, logic, argument structure, evidence, and public speaking."
  },
  Media: {
    watch: "Watch creator breakdowns, journalism interviews, storytelling videos, or game design postmortems.",
    try: "Make a short video, interview someone, write an article, or design a simple game level.",
    join: "Join school newspaper, film club, media team, game jam, podcast club, or creative writing group.",
    learn: "Start with storytelling, editing, audience understanding, interviewing, and consistent publishing."
  },
  Education: {
    watch: "Watch teaching demos, tutoring strategies, or explainers about how people learn.",
    try: "Tutor a younger student or make a study guide for a topic you understand well.",
    join: "Join tutoring programs, youth mentoring, teaching assistant opportunities, or education clubs.",
    learn: "Start with communication, lesson planning, patience, classroom skills, and learning psychology."
  },
  "Public Service": {
    watch: "Watch social work, policing, emergency response, or community service day-in-the-life videos.",
    try: "Volunteer at a community event, help organize a safety project, or support a local nonprofit.",
    join: "Join service clubs, community volunteering, youth leadership, emergency response, or civic groups.",
    learn: "Start with communication, ethics, conflict resolution, community needs, and emotional resilience."
  },
  Hospitality: {
    watch: "Watch restaurant service, chef training, hotel operations, or customer experience videos.",
    try: "Cook a menu for friends, help host an event, or observe how a hotel or restaurant handles guests.",
    join: "Join culinary club, event planning, hospitality programs, customer service work, or food competitions.",
    learn: "Start with service mindset, time management, teamwork, food safety, and guest communication."
  }
};

export const ageActionPlans = {
  "middle-school": {
    title: "國中階段適合的前進方式",
    focus: "先擴大認識，不急著定生涯，重點是發現自己對什麼有感。",
    thisWeek: "這週先做一個很小的探索行動，例如看一支職業影片、記一個有興趣的職業、或問一位大人他的工作內容。",
    thisMonth: "這個月試一個活動或作品：參加社團、做小專題、去參觀、或記錄自己最有感的三件事。",
    avoid: "不要太早把自己綁死在單一職業名稱上，先累積接觸面比較重要。 "
  },
  "high-school": {
    title: "高中階段適合的前進方式",
    focus: "開始把興趣連到科系、能力和真實職業，慢慢縮小範圍。",
    thisWeek: "這週先找一個最有興趣的職業，整理它需要的能力、學科和可能的大學方向。",
    thisMonth: "這個月做一個可展示的小成果，例如小作品、觀察報告、訪談紀錄、活動參與心得。",
    avoid: "不要只查職業名稱，要開始理解這條路需要哪些能力和訓練。 "
  },
  college: {
    title: "大學階段適合的前進方式",
    focus: "把探索轉成履歷上的證據，開始準備作品、實習和更具體的方向。",
    thisWeek: "這週先挑一個方向，補一個作品、專案、研究紀錄或技能學習計畫。",
    thisMonth: "這個月去找實習、教授、社團幹部、side project 或比賽，讓自己和真實工作更靠近。",
    avoid: "不要只停留在『我好像有興趣』，要開始累積可以被別人看見的經驗。 "
  },
  adult: {
    title: "成人 / 轉職階段適合的前進方式",
    focus: "重點不是從零開始，而是看你現有經驗怎麼轉成新方向。",
    thisWeek: "這週先盤點你已經有的技能、人脈、工作經驗，找出哪些可以帶去下一個方向。",
    thisMonth: "這個月做一次真實驗證：和從業者聊天、做一個小作品、接一個小案子、或修一門直接相關課程。",
    avoid: "不要只一直想，要盡快做低風險驗證，確認自己是真的想走這條路。 "
  }
};
