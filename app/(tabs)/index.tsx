import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'; // ← ADD THIS
import { SafeAreaView } from 'react-native-safe-area-context';
// Data
import federalBenefits from '../../data/federal/Federal.benefits.json';
import AKBenefits from '../../data/state/AK.benefits.json';
import ALBenefits from '../../data/state/AL.benefits.json';
import ARBenefits from '../../data/state/AR.benefits.json';
import AZBenefits from '../../data/state/AZ.benefits.json';
import CABenefits from '../../data/state/CA.benefits.json';
import COBenefits from '../../data/state/CO.benefits.json';
import CTBenefits from '../../data/state/CT.benefits.json';
import DEBenefits from '../../data/state/DE.benefits.json';
import FLBenefits from '../../data/state/FL.benefits.json';
import GABenefits from '../../data/state/GA.benefits.json';
import HIBenefits from '../../data/state/HI.benefits.json';
import IABenefits from '../../data/state/IA.benefits.json';
import IDBenefits from '../../data/state/ID.benefits.json';
import ILBenefits from '../../data/state/IL.benefits.json';
import INBenefits from '../../data/state/IN.benefits.json';
import KSBenefits from '../../data/state/KS.benefits.json';
import KYBenefits from '../../data/state/KY.benefits.json';
import LABenefits from '../../data/state/LA.benefits.json';
import MABenefits from '../../data/state/MA.benefits.json';
import MDBenefits from '../../data/state/MD.benefits.json';
import MEBenefits from '../../data/state/ME.benefits.json';
import MIBenefits from '../../data/state/MI.benefits.json';
import MNBenefits from '../../data/state/MN.benefits.json';
import MOBenefits from '../../data/state/MO.benefits.json';
import MSBenefits from '../../data/state/MS.benefits.json';
import MTBenefits from '../../data/state/MT.benefits.json';
import NCBenefits from '../../data/state/NC.benefits.json';
import NDBenefits from '../../data/state/ND.benefits.json';
import NEBenefits from '../../data/state/NE.benefits.json';
import NHBenefits from '../../data/state/NH.benefits.json';
import NJBenefits from '../../data/state/NJ.benefits.json';
import NMBenefits from '../../data/state/NM.benefits.json';
import NVBenefits from '../../data/state/NV.benefits.json';
import NYBenefits from '../../data/state/NY.benefits.json';
import OHBenefits from '../../data/state/OH.benefits.json';
import OKBenefits from '../../data/state/OK.benefits.json';
import ORBenefits from '../../data/state/OR.benefits.json';
import PABenefits from '../../data/state/PA.benefits.json';
import RIBenefits from '../../data/state/RI.benefits.json';
import SCBenefits from '../../data/state/SC.benefits.json';
import SDBenefits from '../../data/state/SD.benefits.json';
import TNBenefits from '../../data/state/TN.benefits.json';
import TXBenefits from '../../data/state/TX.benefits.json';
import UTBenefits from '../../data/state/UT.benefits.json';
import VABenefits from '../../data/state/VA.benefits.json';
import VTBenefits from '../../data/state/VT.benefits.json';
import WABenefits from '../../data/state/WA.benefits.json';
import WIBenefits from '../../data/state/WI.benefits.json';
import WVBenefits from '../../data/state/WV.benefits.json';
import WYBenefits from '../../data/state/WY.benefits.json';

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
// ========== ADD THESE FUNCTIONS HERE ==========

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

  const [results, setResults] = useState<Benefit[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showRatingPicker, setShowRatingPicker] = useState(false);
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
    const userRating = Number.parseInt(rating, 10);
    const allBenefits: Benefit[] = [...(federalBenefits as Benefit[])];

    if (state !== 'federal') {
      const stateBenefits = STATE_BENEFITS[state] as unknown as Benefit[] | undefined;
      if (stateBenefits && Array.isArray(stateBenefits)) allBenefits.push(...stateBenefits);
    }

    const eligible = allBenefits.filter(b => checkEligibility(b, userRating, isPermanentTotal));

    setResults(eligible);
    setHasSearched(true);
  };

  const selectedStateName =
    US_STATES.find(s => s.code === state)?.name ?? 'Select a location';

 
  return (
    <>
<StatusBar style="dark" />

      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Hero Banner */}
          <LinearGradient
            colors={['#1e3a8a', '#dc2626', '#f3f4f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBanner}
          >
            <Text style={styles.heroTitle}>Benefits4Vets</Text>
            <Text style={styles.heroSubtitle}>Discover Your Benefits, Maximize Your Impact</Text>
          </LinearGradient>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.mainTitle}>Veteran Benefits Finder</Text>
            <Text style={styles.subtitle}>Find federal and state benefits you may be eligible for</Text>

            {/* State Picker Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
              <TouchableOpacity style={styles.selectField} onPress={() => setShowStatePicker(true)}>
                <Text style={styles.selectFieldText}>{selectedStateName}</Text>
              </TouchableOpacity>
            </View>

            {/* Rating Picker Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Disability Rating</Text>
              <TouchableOpacity style={styles.selectField} onPress={() => setShowRatingPicker(true)}>
                <Text style={styles.selectFieldText}>{rating}%</Text>
              </TouchableOpacity>
            </View>

            {/* P&T Toggle */}
            <View style={styles.formGroup}>
              <View style={styles.switchRow}>
                <Text style={styles.label}>Permanent &amp; Total (P&amp;T)</Text>
                <Switch
                  value={isPermanentTotal}
                  onValueChange={setIsPermanentTotal}
                  trackColor={{ false: '#ccc', true: '#1976d2' }}
                  thumbColor={isPermanentTotal ? '#fff' : '#f4f3f4'}
                />
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={findBenefits}>
              <Text style={styles.searchButtonText}>Find My Benefits</Text>
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
                      >
                        <Text style={styles.learnMoreText}>Learn More &amp; Apply →</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))
              )}
            </View>
          )}
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
              <TouchableOpacity onPress={() => setShowStatePicker(false)}>
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
              <TouchableOpacity onPress={() => setShowRatingPicker(false)}>
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
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
  elevation: 6,
},
searchButton: {
  backgroundColor: '#1976d2',
  padding: 16,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 8,
  boxShadow: '0px 4px 8px rgba(25, 118, 210, 0.3)',
  elevation: 4,
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
});
