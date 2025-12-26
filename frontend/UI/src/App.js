import React, { useState } from 'react';
import './App.css';
import federalBenefits from './data/federal/Federal.benefits.json';
import tnBenefits from './data/state/TN.benefits.json';
import caBenefits from './data/state/CA.benefits.json';
import txBenefits from './data/state/TX.benefits.json';
import vaBenefits from './data/state/VA.benefits.json';
import flBenefits from './data/state/FL.benefits.json';
import paBenefits from './data/state/PA.benefits.json';
import ohBenefits from './data/state/OH.benefits.json';
import NYBenefits from './data/state/NY.benefits.json';
import NCBenefits from './data/state/NC.benefits.json';
import GAbenefits from './data/state/GA.benefits.json';
import ILbenefits from './data/state/IL.benefits.json';
import WAbenefits from './data/state/WA.benefits.json';
import AZbenefits from './data/state/AZ.benefits.json';
import MIbenefits from './data/state/MI.benefits.json';
import SCbenefits from './data/state/SC.benefits.json';
import CObenefits from './data/state/CO.benefits.json';
import mobenefits from './data/state/MO.benefits.json';
import inbenefits from './data/state/IN.benefits.json';
import mdbenefits from './data/state/MD.benefits.json';
import idbenefits from './data/state/ID.benefits.json';
import alBenefits from './data/state/AL.benefits.json';
import ksBenefits from './data/state/KS.benefits.json';
import ctBenefits from './data/state/CT.benefits.json';
import kyBenefits from './data/state/KY.benefits.json';
import laBenefits from './data/state/LA.benefits.json';
import maBenefits from './data/state/MA.benefits.json';
import msbenefits from './data/state/MS.benefits.json';
import njBenefits from './data/state/NJ.benefits.json';
import okBenefits from './data/state/OK.benefits.json';
import orBenefits from './data/state/OR.benefits.json';
import wiBenefits from './data/state/WI.benefits.json';
// import txBenefits from './data/tx_benefits.json';

// Map of state codes to their benefit data
const STATE_BENEFITS = {
  'TN': tnBenefits,
  'CA': caBenefits,
  'TX': txBenefits,
  'VA': vaBenefits,
  'FL': flBenefits,
  'PA': paBenefits,
  'OH': ohBenefits,
  'NY': NYBenefits,
  'NC': NCBenefits,
  'GA': GAbenefits,
  'IL': ILbenefits,
  'WA': WAbenefits,
  'AZ': AZbenefits,
  'MI': MIbenefits,
  'SC': SCbenefits,
  'CO': CObenefits,
  'MO': mobenefits,
  'IN': inbenefits,
  'MD': mdbenefits,
  'ID': idbenefits,
  'AL': alBenefits,
  'KS': ksBenefits,
  'CT': ctBenefits,
  'KY': kyBenefits,
  'LA': laBenefits,
  'MA': maBenefits,
  'MS': msbenefits,
  'NJ': njBenefits,
  'OK': okBenefits,
  'OR': orBenefits,
  'WI': wiBenefits,
  
  
  // Add more as you create them
};

const US_STATES = [
  { code: 'federal', name: 'Federal Only' },
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

function App() {
  const [state, setState] = useState('TN');
  const [rating, setRating] = useState('0');
  const [isPermanentTotal, setIsPermanentTotal] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const checkEligibility = (benefit, userRating, userPT) => {
    const req = benefit.requirements;
    
    // No requirements - always eligible
    if (!req || Object.keys(req).length === 0) {
      return true;
    }

    // Check minDisability
    if (req.minDisability !== null && req.minDisability !== undefined) {
      if (userRating < req.minDisability) {
        return false;
      }
    }

    // Check requiresPermanentTotal
    if (req.requiresPermanentTotal === true && !userPT) {
      return false;
    }

    // Check anyOf (multiple eligibility paths)
    if (req.anyOf) {
      return req.anyOf.some(path => {
        if (path.allOf) {
          return path.allOf.every(condition => {
            if (condition.minDisability !== undefined) {
              return userRating >= condition.minDisability;
            }
            if (condition.requiresPermanentTotal !== undefined) {
              return condition.requiresPermanentTotal === userPT;
            }
            return true;
          });
        }
        return true;
      });
    }

    return true;
  };

  const findBenefits = () => {
    const userRating = parseInt(rating);
    const allBenefits = [...federalBenefits];
    
    // Add state benefits if a state is selected and has data
    if (state !== 'federal' && STATE_BENEFITS[state]) {
      allBenefits.push(...STATE_BENEFITS[state]);
    }

    const eligible = allBenefits.filter(benefit => 
      checkEligibility(benefit, userRating, isPermanentTotal)
    );

    setResults(eligible);
    setHasSearched(true);
  };

  return (
    <div className="App">
      {/* Banner at the top */}
<div className="hero-banner" style={{
  background: 'linear-gradient(135deg, #1e3a8a 0%, #dc2626 50%, #f3f4f6 100%)',
  padding: '3rem 2rem',
  marginBottom: '2rem',
  color: 'white',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'  // Adds subtle depth
}}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Benefits4Vets
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          Discover Your Benefits, Maximize Your Impact
        </p>
      </div>
      <div className="container">
        <h1>Veteran Benefits Finder</h1>
        <p className="subtitle">
          Find federal and state benefits you may be eligible for
        </p>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="state">Location</label>
            <select 
              id="state"
              value={state} 
              onChange={(e) => setState(e.target.value)}
              className="form-control"
            >
              {US_STATES.map(s => (
                <option key={s.code} value={s.code}>
                  {s.name}
                  {s.code !== 'federal' && !STATE_BENEFITS[s.code] ? ' (Coming Soon)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rating">Disability Rating</label>
            <select 
              id="rating"
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              className="form-control"
            >
              <option value="0">0%</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
              <option value="60">60%</option>
              <option value="70">70%</option>
              <option value="80">80%</option>
              <option value="90">90%</option>
              <option value="100">100%</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={isPermanentTotal}
                onChange={(e) => setIsPermanentTotal(e.target.checked)}
              />
              <span>Permanent & Total (P&T)</span>
            </label>
          </div>

          <button onClick={findBenefits} className="search-button">
            Find My Benefits
          </button>
        </div>

        <div className="results-section">
          {hasSearched && (
            <>
              <h2>Your Eligible Benefits</h2>
              <p className="results-count">
                Found {results.length} benefit{results.length !== 1 ? 's' : ''}
              </p>
              
              {results.length === 0 ? (
                <div className="no-results">
                  <p>No benefits found matching your criteria.</p>
                  <p className="note">Try adjusting your selections above.</p>
                </div>
              ) : (
                <div className="benefits-grid">
                  {results.map((benefit) => (
                    <div key={benefit.id} className="benefit-card">
                      <div className="benefit-header">
                        <h3>{benefit.title}</h3>
                        <span className={`badge ${benefit.scope}`}>
                          {benefit.scope === 'federal' ? 'Federal' : benefit.state}
                        </span>
                      </div>
                      <p className="benefit-summary">{benefit.summary}</p>
                      <p className="benefit-notes">{benefit.eligibilityNotes}</p>
                      <a 
                        href={benefit.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="learn-more"
                      >
                        Learn More & Apply →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;