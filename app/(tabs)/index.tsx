import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data - using require() for more reliable bundling
const federalBenefits = require('../../data/federal/Federal.benefits.json');
const AKBenefits = require('../../data/state/AK.benefits.json');
const ALBenefits = require('../../data/state/AL.benefits.json');
const ARBenefits = require('../../data/state/AR.benefits.json');
const AZBenefits = require('../../data/state/AZ.benefits.json');
const CABenefits = require('../../data/state/CA.benefits.json');
const COBenefits = require('../../data/state/CO.benefits.json');
const CTBenefits = require('../../data/state/CT.benefits.json');
const DEBenefits = require('../../data/state/DE.benefits.json');
const FLBenefits = require('../../data/state/FL.benefits.json');
const GABenefits = require('../../data/state/GA.benefits.json');
const HIBenefits = require('../../data/state/HI.benefits.json');
const IABenefits = require('../../data/state/IA.benefits.json');
const IDBenefits = require('../../data/state/ID.benefits.json');
const ILBenefits = require('../../data/state/IL.benefits.json');
const INBenefits = require('../../data/state/IN.benefits.json');
const KSBenefits = require('../../data/state/KS.benefits.json');
const KYBenefits = require('../../data/state/KY.benefits.json');
const LABenefits = require('../../data/state/LA.benefits.json');
const MABenefits = require('../../data/state/MA.benefits.json');
const MDBenefits = require('../../data/state/MD.benefits.json');
const MEBenefits = require('../../data/state/ME.benefits.json');
const MIBenefits = require('../../data/state/MI.benefits.json');
const MNBenefits = require('../../data/state/MN.benefits.json');
const MOBenefits = require('../../data/state/MO.benefits.json');
const MSBenefits = require('../../data/state/MS.benefits.json');
const MTBenefits = require('../../data/state/MT.benefits.json');
const NCBenefits = require('../../data/state/NC.benefits.json');
const NDBenefits = require('../../data/state/ND.benefits.json');
const NEBenefits = require('../../data/state/NE.benefits.json');
const NHBenefits = require('../../data/state/NH.benefits.json');
const NJBenefits = require('../../data/state/NJ.benefits.json');
const NMBenefits = require('../../data/state/NM.benefits.json');
const NVBenefits = require('../../data/state/NV.benefits.json');
const NYBenefits = require('../../data/state/NY.benefits.json');
const OHBenefits = require('../../data/state/OH.benefits.json');
const OKBenefits = require('../../data/state/OK.benefits.json');
const ORBenefits = require('../../data/state/OR.benefits.json');
const PABenefits = require('../../data/state/PA.benefits.json');
const RIBenefits = require('../../data/state/RI.benefits.json');
const SCBenefits = require('../../data/state/SC.benefits.json');
const SDBenefits = require('../../data/state/SD.benefits.json');
const TNBenefits = require('../../data/state/TN.benefits.json');
const TXBenefits = require('../../data/state/TX.benefits.json');
const UTBenefits = require('../../data/state/UT.benefits.json');
const VABenefits = require('../../data/state/VA.benefits.json');
const VTBenefits = require('../../data/state/VT.benefits.json');
const WABenefits = require('../../data/state/WA.benefits.json');
const WIBenefits = require('../../data/state/WI.benefits.json');
const WVBenefits = require('../../data/state/WV.benefits.json');
const WYBenefits = require('../../data/state/WY.benefits.json');

type Benefit = {
  id: string;
  title: string;
  summary?: string;
  eligibilityNotes?: string;
  sourceUrl?: string;
  scope?: 'federal' | 'state';
  state?: string;
  requirements?: any;
};
// Helper to normalize JSON imports (handles { default: [...] } in production builds)
function asBenefitArray(maybe: any): Benefit[] {
  if (Array.isArray(maybe)) return maybe;
  if (maybe && Array.isArray(maybe.default)) return maybe.default;
  return [];
}


const STATE_BENEFITS = {
  AL: ALBenefits,
  AK: AKBenefits,
  AR: ARBenefits,
  AZ: AZBenefits,
  CA: CABenefits,
  CO: COBenefits,
  CT: CTBenefits,
  FL: FLBenefits,
  GA: GABenefits,
  IA: IABenefits,
  ID: IDBenefits,
  IL: ILBenefits,
  IN: INBenefits,
  KS: KSBenefits,
  KY: KYBenefits,
  LA: LABenefits,
  MA: MABenefits,
  MD: MDBenefits,
  MI: MIBenefits,
  MN: MNBenefits,
  MO: MOBenefits,
  MS: MSBenefits,
  NC: NCBenefits,
  NJ: NJBenefits,
  NV: NVBenefits,
  NY: NYBenefits,
  OH: OHBenefits,
  OK: OKBenefits,
  OR: ORBenefits,
  PA: PABenefits,
  SC: SCBenefits,
  TN: TNBenefits,
  TX: TXBenefits,
  VA: VABenefits,
  WA: WABenefits,
  WI: WIBenefits,
  DE: DEBenefits,
  MT: MTBenefits,
  VT: VTBenefits,
  WY: WYBenefits,
  NM: NMBenefits,
  UT: UTBenefits,
  WV: WVBenefits,
  NE: NEBenefits,
  ME: MEBenefits,
  HI: HIBenefits,
  NH: NHBenefits,
  ND: NDBenefits,
  RI: RIBenefits,
  SD: SDBenefits,
} as const;

type StateCode = keyof typeof STATE_BENEFITS | 'federal';

const US_STATES: { code: StateCode; name: string }[] = [
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
  { code: 'WY', name: 'Wyoming' },
];

const RATINGS = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'] as const;

// Storage keys
const STORAGE_KEYS = {
  STATE: '@benefits4vets_state',
  RATING: '@benefits4vets_rating',
  PERMANENT_TOTAL: '@benefits4vets_pt',
};

// Load saved preferences
const loadPreferences = async () => {
  try {
    const savedState = await AsyncStorage.getItem(STORAGE_KEYS.STATE);
    const savedRating = await AsyncStorage.getItem(STORAGE_KEYS.RATING);
    const savedPT = await AsyncStorage.getItem(STORAGE_KEYS.PERMANENT_TOTAL);

    return {
      state: savedState || 'TN',
      rating: savedRating || '0',
      isPermanentTotal: savedPT === 'true',
    };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {
      state: 'TN',
      rating: '0',
      isPermanentTotal: false,
    };
  }
};

// Save preferences
const savePreference = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving preference:', error);
  }
};

export default function Index() {
  const [state, setState] = useState<StateCode>('TN');
  const [rating, setRating] = useState<(typeof RATINGS)[number]>('0');
  const [isPermanentTotal, setIsPermanentTotal] = useState(false);
  const [ptInfoVisible, setPtInfoVisible] = useState(false);

  const [results, setResults] = useState<Benefit[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showRatingPicker, setShowRatingPicker] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    loadPreferences().then((prefs) => {
      setState(prefs.state as StateCode);
      setRating(prefs.rating as (typeof RATINGS)[number]);
      setIsPermanentTotal(prefs.isPermanentTotal);
    });
  }, []);

  // Save state selection
  useEffect(() => {
    savePreference(STORAGE_KEYS.STATE, state);
  }, [state]);

  // Save rating selection
  useEffect(() => {
    savePreference(STORAGE_KEYS.RATING, rating);
  }, [rating]);

  // Save P&T toggle
  useEffect(() => {
    savePreference(STORAGE_KEYS.PERMANENT_TOTAL, isPermanentTotal.toString());
  }, [isPermanentTotal]);

  const checkEligibility = (benefit: Benefit, userRating: number, userPT: boolean) => {
    const req = benefit.requirements;

    if (!req || Object.keys(req).length === 0) return true;

    if (req.minDisability !== null && req.minDisability !== undefined) {
      if (userRating < req.minDisability) return false;
    }

    if (req.requiresPermanentTotal === true && !userPT) return false;

    if (req.anyOf) {
      return req.anyOf.some((path: any) => {
        if (path.allOf) {
          return path.allOf.every((condition: any) => {
            if (condition.minDisability !== undefined) return userRating >= condition.minDisability;
            if (condition.requiresPermanentTotal !== undefined)
              return condition.requiresPermanentTotal === userPT;
            return true;
          });
        }
        return true;
      });
    }

    return true;
  };

const findBenefits = () => {
  try {
    const userRating = Number.parseInt(rating, 10);

    // Normalize federal benefits
    const fed = asBenefitArray(federalBenefits);
    const allBenefits: Benefit[] = [...fed];

    console.log('Federal benefits count:', fed.length);
    console.log('Selected state:', state);

    if (state !== 'federal') {
      const rawStateBenefits = (STATE_BENEFITS as any)[state];
      const st = asBenefitArray(rawStateBenefits);

      console.log('State benefits count:', st.length);
      allBenefits.push(...st);
    }

    console.log('Total benefits before filtering:', allBenefits.length);

    const eligible = allBenefits.filter((b) =>
      checkEligibility(b, userRating, isPermanentTotal)
    );

    console.log('Eligible benefits:', eligible.length);

    setResults(eligible);
    setHasSearched(true);
  } catch (error) {
    console.error('Error finding benefits:', error);
    alert('Error loading benefits. Please try again.');
  }
};
  const selectedStateName =
    US_STATES.find(s => s.code === state)?.name ?? 'Select a location';

 
  return (
    <>

      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Hero Banner */}
<LinearGradient
  colors={['#1e3a8a', '#dc2626', '#f3f4f6']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.heroBanner}
>
  <View style={styles.heroOverlay}>
    <Text style={styles.heroTitle}>Benefits4Vets</Text>
    <Text style={styles.heroSubtitle}>Discover Your Benefits, Maximize Your Impact</Text>
  </View>
</LinearGradient>
          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.mainTitle}>Veteran Benefits Finder</Text>
            <Text style={styles.subtitle}>Find federal and state benefits you may be eligible for</Text>

            {/* State Picker Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
<TouchableOpacity 
  style={styles.selectField} 
  onPress={() => setShowStatePicker(true)}
  activeOpacity={0.7}  // ← ADD THIS
>
                <Text style={styles.selectFieldText}>{selectedStateName}</Text>
              </TouchableOpacity>
            </View>

            {/* Rating Picker Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Disability Rating</Text>
<TouchableOpacity 
  style={styles.selectField} 
  onPress={() => setShowRatingPicker(true)}
  activeOpacity={0.7}  // ← ADD THIS
>
                <Text style={styles.selectFieldText}>{rating}%</Text>
              </TouchableOpacity>
            </View>
{/* P&T Toggle */}
<View style={styles.formGroup}>
  <View style={styles.switchRow}>
    <View style={styles.ptLabelRow}>
      <Text style={styles.label}>Permanent & Total (P&T)</Text>
      <TouchableOpacity
        onPress={() => setPtInfoVisible(true)}
        style={styles.infoIcon}
        activeOpacity={0.7}
      >
        <Text style={styles.infoIconText}>ⓘ</Text>
      </TouchableOpacity>
    </View>

    <Switch
      value={isPermanentTotal}
      onValueChange={setIsPermanentTotal}
      trackColor={{ false: '#ccc', true: '#1976d2' }}
      thumbColor={isPermanentTotal ? '#fff' : '#f4f3f4'}
    />
  </View>

  {/* P&T Info Modal */}
  <Modal transparent visible={ptInfoVisible} animationType="fade" onRequestClose={() => setPtInfoVisible(false)}>
    <TouchableOpacity
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={() => setPtInfoVisible(false)}
    >
      <View style={styles.infoModalCard}>
        <Text style={styles.infoTitle}>Permanent & Total (P&T)</Text>
        <Text style={styles.infoBody}>
          P&T typically means a 100% service-connected disability that is considered permanent. Some benefits require P&T specifically (for example: certain tax exemptions or dependent education benefits).
        </Text>
        <TouchableOpacity onPress={() => setPtInfoVisible(false)} style={styles.infoCloseBtn} activeOpacity={0.7}>
          <Text style={styles.infoCloseText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
</View>


{/* Search Button */}
<TouchableOpacity onPress={findBenefits} activeOpacity={0.85}>
  <LinearGradient
    colors={['#2196f3', '#1976d2']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.searchButton}
  >
    <Text style={styles.searchButtonText}>Find My Benefits</Text>
  </LinearGradient>
</TouchableOpacity>
          </View>

          {/* Results Section */}
          {hasSearched && (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>Your Eligible Benefits</Text>
              <Text style={styles.resultsCount}>
                Found {results.length} benefit{results.length !== 1 ? 's' : ''}
              </Text>

              {results.length === 0 ? (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No benefits found matching your criteria.</Text>
                  <Text style={styles.noResultsNote}>Try adjusting your selections above.</Text>
                </View>
              ) : (
                results.map(benefit => (
                  <View key={benefit.id} style={styles.benefitCard}>
                    <View style={styles.benefitHeader}>
                      <Text style={styles.benefitTitle} numberOfLines={2}>
                        {benefit.title}
                      </Text>

                      <View
                        style={[
                          styles.badge,
                          benefit.scope === 'federal' ? styles.federalBadge : styles.stateBadge,
                        ]}
                      >
                        <Text style={styles.badgeText}>
                          {benefit.scope === 'federal' ? 'Federal' : benefit.state ?? 'State'}
                        </Text>
                      </View>
                    </View>

                    {!!benefit.summary && <Text style={styles.benefitSummary}>{benefit.summary}</Text>}
                    {!!benefit.eligibilityNotes && (
                      <Text style={styles.benefitNotes}>{benefit.eligibilityNotes}</Text>
                    )}

{!!benefit.sourceUrl && (
  <TouchableOpacity
    onPress={() => Linking.openURL(benefit.sourceUrl as string)}
    style={styles.learnMoreButton}
    activeOpacity={0.7}
  >
    <Text style={styles.learnMoreText}>Learn More →</Text>
  </TouchableOpacity>
)}
                  </View>
                ))
              )}
            </View>
          )}

          {/* Disclaimer */}
          <View style={styles.disclaimerSection}>
            <Text style={styles.disclaimerText}>
              ⚠️ Information provided is for informational purposes only and should not be considered legal or financial advice. Always verify benefit details with official sources before applying.
            </Text>
            <Text style={styles.disclaimerSubtext}>
              Last updated: December 2025
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* State Picker Modal */}
      <Modal
        visible={showStatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatePicker(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowStatePicker(false)} activeOpacity={0.7}>
                <Text style={styles.modalAction}>Done</Text>
              </TouchableOpacity>
            </View>

            <Picker
              style={{ height: 220 }}
              selectedValue={state}
              onValueChange={(value: StateCode) => setState(value)}
            >
              {US_STATES.map(s => (
                <Picker.Item key={s.code} label={s.name} value={s.code} color="#111" />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Rating Picker Modal */}
      <Modal
        visible={showRatingPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRatingPicker(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowRatingPicker(false)} activeOpacity={0.7}>
                <Text style={styles.modalAction}>Done</Text>
              </TouchableOpacity>
            </View>

            <Picker
              style={{ height: 220 }}
              selectedValue={rating}
              onValueChange={(value: (typeof RATINGS)[number]) => setRating(value)}
            >
              {RATINGS.map(v => (
                <Picker.Item key={v} label={`${v}%`} value={v} color="#111" />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroBanner: {
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
heroTitle: {
  fontSize: 40,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 8,
  textAlign: 'center',
  letterSpacing: -1,
  textShadowColor: 'rgba(0, 0, 0, 0.3)',  // ← ADD
  textShadowOffset: { width: 0, height: 2 },  // ← ADD
  textShadowRadius: 4,  // ← ADD
},
  heroSubtitle: {
    fontSize: 20,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  formSection: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },

  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: '#1a1a1a',
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  resultsSection: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  resultsCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },

  noResults: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  noResultsNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
benefitCard: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 16,
  marginBottom: 16,
  // Remove: boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
  // Remove: elevation: 6,
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: 6,
    },
  }),
},

searchButton: {
  padding: 16,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 8,
  // Remove: boxShadow: '0px 4px 8px rgba(25, 118, 210, 0.3)',
  // Remove: elevation: 4,
  ...Platform.select({
    ios: {
      shadowColor: '#1976d2',
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: 4,
    },
  }),
},
  benefitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    color: '#1a1a1a',
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  federalBadge: {
    backgroundColor: '#1976d2',
  },
  stateBadge: {
    backgroundColor: '#4caf50',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  benefitSummary: {
    fontSize: 15,
    marginBottom: 8,
    color: '#333',
    lineHeight: 22,
  },
  benefitNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },

  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#1976d2',
    fontSize: 15,
    fontWeight: '600',
  },

  selectField: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  selectFieldText: {
    fontSize: 16,
    color: '#111',
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'flex-end',
  },
  modalAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
  },
  disclaimerSection: {
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  disclaimerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  heroOverlay: {
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.15)',
  alignItems: 'center',
},
ptLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
infoIcon: { paddingHorizontal: 6, paddingVertical: 2 },
infoIconText: { fontSize: 16, fontWeight: '700', color: '#1976d2' },

modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: 'rgba(0,0,0,0.5)',
},
infoModalCard: {
  width: '100%',
  maxWidth: 420,
  borderRadius: 14,
  padding: 16,
  backgroundColor: '#fff',
},
infoTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
infoBody: { fontSize: 14, lineHeight: 20, marginBottom: 14 },
infoCloseBtn: { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 12 },
infoCloseText: { fontSize: 14, fontWeight: '700' },


});