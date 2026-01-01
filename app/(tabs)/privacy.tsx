import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Privacy() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:benefits4vets.feedback@gmail.com').catch(err =>
      console.error('Failed to open email:', err)
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          {/* Header */}
          <LinearGradient
            colors={['#1e3a8a', '#dc2626', '#f3f4f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Privacy Policy</Text>
            <Text style={styles.headerSubtitle}>Last Updated: December 31, 2025</Text>
          </LinearGradient>

          {/* Introduction */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
            </View>
            <View style={[styles.card, styles.highlightCard]}>
              <Text style={styles.highlightText}>
                Benefits4Vets is designed with privacy as a core principle. We do not collect, store,
                or transmit any personal information.
              </Text>
            </View>
          </View>

          {/* No Data Collection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="close-circle-outline" size={22} color="#dc2626" />
              <Text style={styles.sectionTitle}>What We DON&apos;T Collect</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>This app does NOT collect:</Text>
              <Text style={styles.bulletPoint}>• Personal identifying information (name, SSN, etc.)</Text>
              <Text style={styles.bulletPoint}>• Service records or disability information</Text>
              <Text style={styles.bulletPoint}>• Location data</Text>
              <Text style={styles.bulletPoint}>• Device identifiers</Text>
              <Text style={styles.bulletPoint}>• Usage analytics or tracking data</Text>
              <Text style={styles.bulletPoint}>• Cookies or similar tracking technologies</Text>
              <Text style={[styles.cardText, { marginTop: 16, fontWeight: 'bold' }]}>
                Your searches and selections stay entirely on your device.
              </Text>
            </View>
          </View>

          {/* Local Processing */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="phone-portrait-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Local-Only Processing</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                All benefit searches and eligibility checks are performed locally on your device. No
                information about your disability rating, location, or benefit searches is ever
                transmitted to our servers or any third party.
              </Text>
              <Text style={[styles.cardText, { marginTop: 12 }]}>
                The app works completely offline after initial installation, with the exception of
                opening external benefit application links.
              </Text>
            </View>
          </View>

          {/* No Accounts */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-remove-outline" size={22} color="#dc2626" />
              <Text style={styles.sectionTitle}>No Account Required</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Benefits4Vets does not require you to create an account, log in, or provide any
                personal information to use the app. There are no usernames, passwords, or profiles.
              </Text>
            </View>
          </View>

          {/* Third Party Services */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="link-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Third-Party Services</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                When you click &quot;Learn More & Apply&quot; on a benefit, you will be directed to the
                official government website for that benefit. Once you leave our app, you are subject
                to that website&apos;s privacy policy.
              </Text>
              <Text style={[styles.cardText, { marginTop: 12 }]}>
                We do not share any information with these websites - they cannot see what you
                searched for in our app.
              </Text>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="mail-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Voluntary Contact</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                The only way we collect information is if you voluntarily email us at:
              </Text>
              <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
                <Text style={styles.emailButtonText}>benefits4vets.feedback@gmail.com</Text>
              </TouchableOpacity>
              <Text style={[styles.cardText, { marginTop: 12 }]}>
                We will only use your email address to respond to your inquiry and will not add you
                to any mailing lists or share it with third parties.
              </Text>
            </View>
          </View>

          {/* Children's Privacy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="happy-outline" size={22} color="#10b981" />
              <Text style={styles.sectionTitle}>Children&apos;s Privacy</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                This app is designed for veterans and does not knowingly collect information from
                anyone under 13 years of age. Since we don&apos;t collect any data at all, there is no
                risk to children&apos;s privacy.
              </Text>
            </View>
          </View>

          {/* Data Security */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="lock-closed-outline" size={22} color="#10b981" />
              <Text style={styles.sectionTitle}>Data Security</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Since we don&apos;t collect or store any personal information, there is no data that could
                be breached, leaked, or compromised. Your privacy is protected by design.
              </Text>
            </View>
          </View>

          {/* Changes to Policy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Changes to This Policy</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                We may update this privacy policy from time to time. Any changes will be reflected in
                the &quot;Last Updated&quot; date at the top of this policy. Since we don&apos;t collect your
                contact information, we cannot notify you of changes directly.
              </Text>
            </View>
          </View>

          {/* Your Rights */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle-outline" size={22} color="#10b981" />
              <Text style={styles.sectionTitle}>Your Rights</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Under privacy laws like GDPR and CCPA, you have rights regarding your personal data,
                including:
              </Text>
              <Text style={styles.bulletPoint}>• Right to access your data</Text>
              <Text style={styles.bulletPoint}>• Right to delete your data</Text>
              <Text style={styles.bulletPoint}>• Right to data portability</Text>
              <Text style={[styles.cardText, { marginTop: 12, fontWeight: 'bold' }]}>
                Since we don&apos;t collect any data about you, there is nothing to access, delete, or
                port. Your privacy rights are automatically protected.
              </Text>
            </View>
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="chatbubble-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Contact Us</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                If you have questions about this privacy policy, please contact us at:
              </Text>
              <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
                <Text style={styles.emailButtonText}>benefits4vets.feedback@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Legal Compliance */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="scale-outline" size={22} color="#1976d2" />
              <Text style={styles.sectionTitle}>Legal Compliance</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardText}>This privacy policy complies with:</Text>
              <Text style={styles.bulletPoint}>• California Consumer Privacy Act (CCPA)</Text>
              <Text style={styles.bulletPoint}>• General Data Protection Regulation (GDPR)</Text>
              <Text style={styles.bulletPoint}>• Apple App Store Guidelines</Text>
              <Text style={styles.bulletPoint}>• Google Play Store Requirements</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Benefits4Vets</Text>
            <Text style={styles.footerSubtext}>Privacy-First Veteran Benefits Finder</Text>
            <Text style={styles.footerSubtext}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
    elevation: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  highlightCard: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#1976d2',
  },
  highlightText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1565c0',
    fontWeight: '600',
  },
  emailButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(25, 118, 210, 0.3)',
    elevation: 4,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginLeft: 8,
  },
  emailButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});