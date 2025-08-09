├── .env.example           # placeholders for OPENAI_API_KEY, SHEET_ID, GOOGLE_CREDS
├── README.md              # codebase structue and notes
├── SYLLABUS.md            # short reminder to follow the full PDF
├── app/                   # Next.js routes
│   ├── layout.tsx         # global shell + Tailwind
│   ├── page.tsx           # home page (Milestone 1 check)
│   └── dashboard/page.tsx # reads mocked rows (replace in Milestone 7)
├── csv/
│   ├── sheet_template.csv # headers only – import into Google Sheets for M2
│   └── starter_sample.csv # same 1-row sample as JSON
├── data/
│   └── sample.json        # local mock rows for the first two milestones
├── lib/
│   ├── config.ts          # env placeholders; filled in M3 & M5
│   ├── data.ts            # readLocalRows() now; TODO read/write Google Sheets later
│   └── ai.ts              # mockGenerate(); TODO real OpenAI call in M5
└── styles/...             # Tailwind base