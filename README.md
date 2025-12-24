# Veteran Benefits Finder

A privacy-first, anonymous tool that helps U.S. veterans discover federal and state benefits they may be eligible for based on location and disability rating, without requiring account creation or personal data storage.

## For Imagine Cup 2026

This project was created for the Microsoft Imagine Cup competition, demonstrating how technology can improve veterans' lives by making benefit discovery simple and accessible.

## Features

- **Simple, intuitive interface** - Three inputs: Location, Disability Rating, and P&T checkbox
- **Privacy-focused** - No accounts, no data storage, completely anonymous
- **Comprehensive results** - Shows federal and state-specific benefits
- **Direct links** - Each benefit includes a link to official VA/state resources
- **Mobile responsive** - Works on any device

## Current Coverage

- **Federal**: All major VA benefits (healthcare, disability compensation, home loans, education, burial benefits, etc.)
- **States**: Tennessee (TN) - more states coming soon

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with static files ready to deploy.

## How It Works

### User Interface
1. Select your location (Tennessee or Federal Only)
2. Select your disability rating (0% - 100%)
3. Check "Permanent & Total" if applicable
4. Click "Find My Benefits"

### Matching Logic
The app filters benefits based on eligibility requirements:
- Minimum disability rating requirements
- Permanent & Total (P&T) status
- Service-connected requirements
- Complex eligibility rules (anyOf, allOf logic)

### Data Structure
Benefits are stored in JSON files:
- `src/data/federal_benefits.json` - All federal VA benefits
- `src/data/tn_benefits.json` - Tennessee state benefits

Each benefit includes:
- Title and summary
- Eligibility requirements
- Detailed notes
- Official source URL
- Tags for categorization

## Tech Stack

- **Frontend**: React
- **Styling**: Pure CSS (no frameworks)
- **Data**: JSON files
- **Planned Backend**: Azure (for Imagine Cup)

## Adding More States

To add benefits for a new state:

1. Create a new JSON file: `src/data/XX_benefits.json` (where XX is state code)
2. Follow the existing JSON structure
3. Add the state option in `App.js` dropdown
4. Update the benefit loading logic

## Project Structure

```
veteran-benefits-finder/
├── public/              # Static assets
├── src/
│   ├── data/           # Benefit JSON files
│   │   ├── federal_benefits.json
│   │   └── tn_benefits.json
│   ├── App.js          # Main component with UI and logic
│   ├── App.css         # Styling
│   └── index.js        # Entry point
├── package.json        # Dependencies
└── README.md          # This file
```

## Future Enhancements

- [ ] Add more states (priority: states with large veteran populations)
- [ ] Add service-connected checkbox
- [ ] Add wartime service checkbox
- [ ] County-level benefits
- [ ] Search/filter results by category
- [ ] Save favorite benefits (local storage)
- [ ] Print-friendly benefit checklist
- [ ] Multi-language support
- [ ] Backend API for dynamic data updates
- [ ] Admin panel for benefit management

## For Demo Video

When recording your Imagine Cup demo:
1. Show the simple, clean interface
2. Demonstrate finding benefits for different ratings
3. Highlight the privacy aspect (no login required)
4. Show both federal and state results
5. Click through to official sources
6. Emphasize the problem being solved (veterans missing out on benefits)

## License

This project is open source and available for use in the Imagine Cup competition.

## Contact

Created by Michael for the 2026 Microsoft Imagine Cup
School: Austin Peay State University
