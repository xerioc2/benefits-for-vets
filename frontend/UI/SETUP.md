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

## What's Included

✅ Complete React app setup
✅ Your benefit matching logic
✅ Clean, minimal UI
✅ Federal benefits JSON (9 benefits)
✅ Tennessee benefits JSON (10 benefits)
✅ Responsive design
✅ Ready to demo!

## Testing It Works

Once running, try these test cases:

**Test 1: Basic veteran (no rating)**
- State: Tennessee
- Rating: 0%
- P&T: unchecked
- Should show: basic federal benefits (healthcare, GI Bill, etc.)

**Test 2: 100% P&T veteran**
- State: Tennessee
- Rating: 100%
- P&T: checked
- Should show: ALL benefits including TN property tax relief

**Test 3: Federal only**
- State: Federal Only
- Rating: any
- Should show: only federal benefits (no TN state benefits)

## Next Steps

1. **Test the matching logic** - Make sure all benefits show correctly
2. **Record demo video** - App is ready to record!
3. **Add more states** - Copy the TN benefits format for new states
4. **Deploy to Azure** - For Imagine Cup submission

## Troubleshooting

**"npm start" still fails?**
- Make sure you're in the `frontend` folder
- Delete `node_modules` and run `npm install` again
- Check that `package.json` has the "start" script

**Changes not showing?**
- Save your files (Ctrl+S)
- The app auto-reloads when files change

**Port 3000 already in use?**
- React will prompt you to use a different port (press Y)
- Or close whatever is using port 3000

## For Your Interview Tuesday

This app demonstrates:
- ✅ Clean, functional UI
- ✅ Working backend logic (matching algorithm)
- ✅ Real-world problem solving
- ✅ Good code organization
- ✅ Data-driven architecture

Good luck! 🚀
