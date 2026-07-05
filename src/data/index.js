export const projects = [
  { id:1, title:"HaloSemeton",                  subtitle:"WhatsApp & Telegram AI Chatbot",    desc:"Multi-agent chatbot for public statistics services. PDF-based RAG system, automated customer service, and Supabase + Google Sheets integration — deployed on Ubuntu VPS via Cloudflare Tunnel.",             tags:["OpenClaw","Supabase","Node.js","WhatsApp API","Telegram Bot"],    gold:false, iconKey:"Bot",   status:"Live",     wide:true  },
  { id:2, title:"SILA PST",                     subtitle:"Digital Guest Book & Queue System", desc:"Digital guest book, queue management, and officer dashboard for the Public Statistics Service Center. Deployed on Vercel with a custom domain.",                                                                tags:["React","Vercel","Cloudflare","Dashboard"],                        gold:false, iconKey:"Clip",  status:"Live",     wide:false },
  { id:3, title:"Economic Phenomena Dashboard", subtitle:"News-Based Economic Intelligence",  desc:"News scraping dashboard for detecting digital economic phenomena — analyzing business trends, market sentiment, and economic activity from real-time news data.",                                               tags:["Python","BeautifulSoup","Pandas","React","Scraping"],             gold:true,  iconKey:"Trend", status:"Deployed", wide:false },
  { id:4, title:"AppScript & Bot Automation",   subtitle:"Workflow Automation Suite",         desc:"Google AppScript automation suite: structured renaming of scanned documents, automated questionnaire and job form-filling bots — significantly reducing repetitive administrative workload.",                  tags:["Google AppScript","Drive API","Sheets API","Bot","Python"],       gold:false, iconKey:"Gear",  status:"Deployed", wide:false },
  { id:5, title:"Village Statistics Governance",subtitle:"Statistical Capacity Building",     desc:"Village-level statistical governance program — building the capacity of local officials in data collection, management, and utilization for evidence-based development planning.",                             tags:["Training","Data Governance","Village Program","Field Survey"],    gold:false, iconKey:"Map",   status:"Live",     wide:false },
  { id:6, title:"Data Education Pipeline",      subtitle:"Automated WhatsApp Infographics",   desc:"Automated pipeline: Google Sheets → press release scraping → AI summary generation → infographic rendering → scheduled WhatsApp delivery to staff groups.",                                                   tags:["Python","DeepSeek","Matplotlib","Pillow","WhatsApp"],             gold:true,  iconKey:"Bar",   status:"Deployed", wide:true  },
];

export const skillGroups = [
  { category: "Languages & Frameworks", items: ["Python", "JavaScript", "Node.js", "React", "Google AppScript"] },
  { category: "AI & Data Science",      items: ["DeepSeek API", "IndoBERT", "BeautifulSoup", "Pandas", "OCR / Vision"] },
  { category: "Bot & Automation",       items: ["OpenClaw", "WhatsApp Business API", "Telegram Bot API", "Drive API", "Sheets API"] },
  { category: "Frontend & Viz",         items: ["Recharts", "Matplotlib", "Pillow", "Tailwind CSS", "Dashboard Design"] },
  { category: "Infrastructure",         items: ["Supabase", "Vercel", "Cloudflare Tunnel", "Ubuntu VPS", "PostgreSQL"] },
  { category: "Statistics & Research",  items: ["Survey Design", "Data Governance", "BPS Methodology", "SPSS", "R"] },
];

export const achievements = [
  { iconKey:"Trophy", title:"Australia Awards Scholarships",   desc:"AAS Awardee — Master's degree recipient, competitive national scholarship",                                        gold:true  },
  { iconKey:"Cpu",    title:"AI Automation Pioneer",           desc:"First to deploy multi-agent WhatsApp AI for public statistics service in Central Lombok",                           gold:false },
  { iconKey:"Trend",  title:"Economic Intelligence Builder",   desc:"Designed news-based scraping dashboard for detecting hidden digital economic phenomena in real time",               gold:false },
  { iconKey:"Bldg",   title:"Government Digital Champion",     desc:"Led digital transformation at Pusat Pelayanan Statistik — from queue management to full digital ecosystem",        gold:false },
  { iconKey:"Map",    title:"Data Dissemination Leader",       desc:"Bridging national statistics to grassroots village communities through statistical governance programs",           gold:true  },
];

export const aboutItems = [
  { iconKey:"Cpu",   label:"AI & Automation"  },
  { iconKey:"Bar",   label:"Data Storytelling" },
  { iconKey:"Link",  label:"API Integration"  },
  { iconKey:"Bldg",  label:"Gov Innovation"   },
  { iconKey:"Brain", label:"NLP & Vision AI"  },
  { iconKey:"Gear",  label:"VPS Engineering"  },
];

export const statusDot = { Live:"#10B981", Deployed:"#3B82F6", "R&D":"#F59E0B" };
