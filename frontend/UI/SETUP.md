# Setup Instructions for Benefits4Vets Frontend

## Quick Start (3 steps!)

### 1. Copy these files into your `benefits-for-vets/frontend/` folder

Replace your current frontend folder with all the files I've created:
- `package.json`
- `public/` folder with `index.html`
- `src/` folder with all the React files
- `.gitignore`

### 2. Install dependencies

Open PowerShell in your `frontend` folder:
```powershell
cd C:\Users\xerio\Desktop\Benefits4Vets\benefits-for-vets\frontend\UI
npm install
```

This will take about 1-2 minutes to download all React dependencies.

### 3. Start the app

```powershell
npm start
```

Your browser will automatically open to `http://localhost:3000` and you'll see your app running!

## Folder Structure (after setup)

```
benefits-for-vets/
├── backend/           (for later)
├── frontend/
│   ├── node_modules/  (created by npm install)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── data/
│   │   │   ├── federal_benefits.json
│   │   │   └── tn_benefits.json
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
└── README.md
```

