import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// EXACT SAME IMPORTS AS WEB APP - All 50 states
import federalBenefits from './data/federal/Federal.benefits.json';
import AKBenefits from './data/state/AK.benefits.json';
import ALBenefits from './data/state/AL.benefits.json';
import ARBenefits from './data/state/AR.benefits.json';
import AZBenefits from './data/state/AZ.benefits.json';
import CABenefits from './data/state/CA.benefits.json';
import COBenefits from './data/state/CO.benefits.json';
import CTBenefits from './data/state/CT.benefits.json';
import DEBenefits from './data/state/DE.benefits.json';
import FLBenefits from './data/state/FL.benefits.json';
import GABenefits from './data/state/GA.benefits.json';
import HIBenefits from './data/state/HI.benefits.json';
import IABenefits from './data/state/IA.benefits.json';
import IDBenefits from './data/state/ID.benefits.json';
import ILBenefits from './data/state/IL.benefits.json';
import INBenefits from './data/state/IN.benefits.json';
import KSBenefits from './data/state/KS.benefits.json';
import KYBenefits from './data/state/KY.benefits.json';
import LABenefits from './data/state/LA.benefits.json';
import MABenefits from './data/state/MA.benefits.json';
import MDBenefits from './data/state/MD.benefits.json';
import MEBenefits from './data/state/ME.benefits.json';
import MIBenefits from './data/state/MI.benefits.json';
import MNBenefits from './data/state/MN.benefits.json';
import MOBenefits from './data/state/MO.benefits.json';
import MSBenefits from './data/state/MS.benefits.json';
import MTBenefits from './data/state/MT.benefits.json';
import NCBenefits from './data/state/NC.benefits.json';
import NDBenefits from './data/state/ND.benefits.json';
import NEBenefits from './data/state/NE.benefits.json';
import NHBenefits from './data/state/NH.benefits.json';
import NJBenefits from './data/state/NJ.benefits.json';
import NMBenefits from './data/state/NM.benefits.json';
import NVBenefits from './data/state/NV.benefits.json';
import NYBenefits from './data/state/NY.benefits.json';
import OHBenefits from './data/state/OH.benefits.json';
import OKBenefits from './data/state/OK.benefits.json';
import ORBenefits from './data/state/OR.benefits.json';
import PABenefits from './data/state/PA.benefits.json';
import RIBenefits from './data/state/RI.benefits.json';
import SCBenefits from './data/state/SC.benefits.json';
import SDBenefits from './data/state/SD.benefits.json';
import TNBenefits from './data/state/TN.benefits.json';
import TXBenefits from './data/state/TX.benefits.json';
import UTBenefits from './data/state/UT.benefits.json';
import VABenefits from './data/state/VA.benefits.json';
import VTBenefits from './data/state/VT.benefits.json';
import WABenefits from './data/state/WA.benefits.json';
import WIBenefits from './data/state/WI.benefits.json';
import WVBenefits from './data/state/WV.benefits.json';
import WYBenefits from './data/state/WY.benefits.json';

// EXACT SAME MAP AS WEB APP
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
};

// EXACT SAME ARRAY AS WEB APP
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
  { code: 'WY', name: 'Wyoming' },
];

function App() {
  // EXACT SAME STATE AS WEB APP
  const [state, setState] = useState('TN');
  const [rating, setRating] = useState('0');
  const [isPermanentTotal, setIsPermanentTotal] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // EXACT SAME FUNCTION AS WEB APP
  const checkEligibility = (benefit, userRating, userPT) => {
    const req = benefit.requirements;

    if (!req || Object.keys(req).length === 0) {
      return true;
    }

    if (req.minDisability !== null && req.minDisability !== undefined) {
      if (userRating < req.minDisability) {
        return false;
      }
    }

    if (req.requiresPermanentTotal === true && !userPT) {
      return false;
    }

    if (req.anyOf) {
      return req.anyOf.some((path) => {
        if (path.allOf) {
          return path.allOf.every((condition) => {
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

  // EXACT SAME FUNCTION AS WEB APP
  const findBenefits = () => {
    const userRating = parseInt(rating);
    const allBenefits = [...federalBenefits];

    if (state !== 'federal' && STATE_BENEFITS[state]) {
      allBenefits.push(...STATE_BENEFITS[state]);
    }

    const eligible = allBenefits.filter((benefit) =>
      checkEligibility(benefit, userRating, isPermanentTotal)
    );

    setResults(eligible);
    setHasSearched(true);
  };

  return (
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
          <Text style={styles.heroSubtitle}>
            Discover Your Benefits, Maximize Your Impact
          </Text>
        </LinearGradient>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.mainTitle}>Veteran Benefits Finder</Text>
          <Text style={styles.subtitle}>
            Find federal and state benefits you may be eligible for
          </Text>

          {/* State Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={state}
                onValueChange={setState}
                style={styles.picker}
              >
                {US_STATES.map((s) => (
                  <Picker.Item
                    key={s.code}
                    label={
                      s.name +
                      (s.code !== 'federal' && !STATE_BENEFITS[s.code]
                        ? ' (Coming Soon)'
                        : '')
                    }
                    value={s.code}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Rating Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Disability Rating</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={rating}
                onValueChange={setRating}
                style={styles.picker}
              >
                <Picker.Item label="0%" value="0" />
                <Picker.Item label="10%" value="10" />
                <Picker.Item label="20%" value="20" />
                <Picker.Item label="30%" value="30" />
                <Picker.Item label="40%" value="40" />
                <Picker.Item label="50%" value="50" />
                <Picker.Item label="60%" value="60" />
                <Picker.Item label="70%" value="70" />
                <Picker.Item label="80%" value="80" />
                <Picker.Item label="90%" value="90" />
                <Picker.Item label="100%" value="100" />
              </Picker>
            </View>
          </View>

          {/* P&T Toggle */}
          <View style={styles.formGroup}>
            <View style={styles.switchRow}>
              <Text style={styles.label}>Permanent & Total (P&T)</Text>
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
                <Text style={styles.noResultsText}>
                  No benefits found matching your criteria.
                </Text>
                <Text style={styles.noResultsNote}>
                  Try adjusting your selections above.
                </Text>
              </View>
            ) : (
              results.map((benefit) => (
                <View key={benefit.id} style={styles.benefitCard}>
                  <View style={styles.benefitHeader}>
                    <Text style={styles.benefitTitle} numberOfLines={2}>
                      {benefit.title}
                    </Text>
                    <View
                      style={[
                        styles.badge,
                        benefit.scope === 'federal'
                          ? styles.federalBadge
                          : styles.stateBadge,
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {benefit.scope === 'federal' ? 'Federal' : benefit.state}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.benefitSummary}>{benefit.summary}</Text>
                  <Text style={styles.benefitNotes}>
                    {benefit.eligibilityNotes}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(benefit.sourceUrl)}
                    style={styles.learnMoreButton}
                  >
                    <Text style={styles.learnMoreText}>
                      Learn More & Apply →
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
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
  searchButton: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
  },
  noResultsNote: {
    fontSize: 14,
    color: '#666',
  },
  benefitCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
});

export default App;