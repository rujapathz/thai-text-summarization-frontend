# Thai Text Summarization — Frontend

Thai Lizard is a web-based application for Thai text summarization, supporting text, URL, and PDF inputs.  
Built as part of CP465 Text Mining (2/2568).

---

## Features

- Supports 3 input types: **Plain Text / URL / PDF File**
- 3 summarization modes: **Teaser / Short (≤3 lines) / Normal (≤8 lines)**
- Displays **Frontend Metric Score** to indicate summary quality
- Copy to clipboard or export result as `.txt` file
- Smooth UI animations powered by Framer Motion

---

## Tech Stack

| Category | Library |
|----------|---------|
| Framework | React 18 + TypeScript |
| Build Tool | Create React App |
| State / API | Redux Toolkit + RTK Query |
| UI Library | Material UI (MUI v5) |
| Animation | Framer Motion |

---

## Project Structure
```plaintext
src/
├── components/
│   ├── landing-page/
│   │   ├── inputCard.tsx       # Input panel (text / url / pdf)
│   │   ├── resultCard.tsx      # Summary result + copy/export
│   │   └── summaryOptions.tsx  # Summarization mode selector
│   └── navbar.tsx
├── hooks/
│   └── useSummarization.ts     # Core summarization logic
├── pages/
│   └── landingPage/
│       └── landingPage.tsx
├── services/
│   ├── summarizeApi.ts         # RTK Query API calls
│   └── types/
│       └── summarizeType.ts    # TypeScript type definitions
└── styles/
    └── MUITheme.ts
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/rujapathz/thai-text-summarization-frontend.git
cd thai-text-summarization-frontend
npm install
```

### Run Development Server

```bash
npm start
```

Open your browser at `http://localhost:3000`

---

## API Configuration

The backend URL is defined in `src/services/summarizeApi.ts`:

```ts
const BASE_URL = 'http://localhost:5000';
```

To override it, create a `.env` file at the project root:
REACT_APP_API_URL=http://localhost:5000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/summarize/text` | Summarize from plain text |
| POST | `/summarize/url` | Summarize from URL |
| POST | `/summarize/pdf` | Summarize from PDF file |

**Available modes:**
- `teaser` — Short teaser/headline
- `short` — Brief summary (≤3 lines)
- `normal` — Standard summary (≤8 lines)

---

## Team

| Name | Student ID |
|------|-----------|
| Rujapa Monkhontirapat | 65102010201 |
| Siri Meesuk | 65102010202 |
| Thatchaya Siriwaseree | 65102010417 |

---

## Related Repository

- [Backend](https://github.com/rujapathz/thai-text-summarization-backend)
- [Model](https://github.com/SiriMeesuk19796/thai-text-summarization-model)
