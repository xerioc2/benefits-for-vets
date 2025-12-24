import React, { useState } from 'react';
import './App.css';
import federalBenefits from './data/federal_benefits.json';
import tnBenefits from './data/tn_benefits.json';

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
    
    // Add state benefits if a state is selected
    if (state === 'TN') {
      allBenefits.push(...tnBenefits);
    }

    const eligible = allBenefits.filter(benefit => 
      checkEligibility(benefit, userRating, isPermanentTotal)
    );

    setResults(eligible);
    setHasSearched(true);
  };

  return (
    <div className="App">
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
              <option value="TN">Tennessee</option>
              <option value="federal">Federal Only</option>
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
