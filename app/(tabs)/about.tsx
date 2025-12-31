import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function About() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:benefits4vets.feedback@gmail.com').catch(err =>
      console.error('Failed to open email:', err)
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <LinearGradient
          colors={['#1e3a8a', '#dc2626', '#f3f4f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerIcon}>🇺🇸</Text>
          <Text style={styles.headerTitle}>Benefits4Vets</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </LinearGradient>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 About This App</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Benefits4Vets helps veterans discover federal and state benefits they may be eligible
              for. With over 800 benefits across all 50 states, we make it easy to find the support
              you&apos;ve earned through your service.
            </Text>
          </View>
        </View>

        {/* Data Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Data Sources</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              All benefit information is compiled from official government sources including:
            </Text>
            <Text style={styles.bulletPoint}>• U.S. Department of Veterans Affairs (VA)</Text>
            <Text style={styles.bulletPoint}>• State Departments of Veterans Affairs</Text>
            <Text style={styles.bulletPoint}>• Official state government websites</Text>
            <Text style={styles.cardNote}>Last updated: December 2025</Text>
          </View>
        </View>

        {/* Important Disclaimer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Important Disclaimer</Text>
          <View style={[styles.card, styles.warningCard]}>
            <Text style={styles.cardText}>
              This app is NOT affiliated with or endorsed by the U.S. Department of Veterans
              Affairs, any state government, or any government agency.
            </Text>
            <Text style={[styles.cardText, { marginTop: 12 }]}>
              Information provided is for informational purposes only and should not be considered
              legal or financial advice. Always verify benefit details with official sources before
              applying.
            </Text>
          </View>
        </View>

        {/* Privacy Protection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Privacy Protection</Text>
          <View style={[styles.card, styles.successCard]}>
            <Text style={styles.cardText}>
              We take your privacy seriously. This app:
            </Text>
            <Text style={styles.bulletPoint}>• Does NOT collect any personal data</Text>
            <Text style={styles.bulletPoint}>• Does NOT require login or registration</Text>
            <Text style={styles.bulletPoint}>• Does NOT track your usage</Text>
            <Text style={styles.bulletPoint}>• Processes everything locally on your device</Text>
            <Text style={[styles.cardText, { marginTop: 12 }]}>
              Your search history stays on your phone and is never transmitted anywhere.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📧 Contact Us</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Have feedback, questions, or found an error? We&apos;d love to hear from you!
            </Text>
            <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
              <Text style={styles.emailButtonText}>benefits4vets.feedback@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Credits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Credits</Text>
          <View style={styles.card}>
            <Text style={styles.creditText}>Developed by Michael</Text>
            <Text style={styles.creditSubtext}>U.S. Military Veteran</Text>
            <Text style={styles.creditSubtext}>Austin Peay State University</Text>
            <Text style={[styles.creditSubtext, { marginTop: 12 }]}>
              Built with React Native & Expo
            </Text>
            <Text style={styles.creditSubtext}>Microsoft Imagine Cup 2026</Text>
            <Text style={[styles.cardText, { marginTop: 16, fontStyle: 'italic' }]}>
              Dedicated to helping veterans access the benefits they&apos;ve earned through their
              service.
            </Text>
          </View>
        </View>

        {/* Legal Link */}
        <View style={styles.section}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy →</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your service 🇺🇸</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  warningCard: {
    backgroundColor: '#fff9e6',
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  successCard: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  cardNote: {
    fontSize: 13,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginLeft: 8,
  },
  emailButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  emailButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  creditText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  creditSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  linkText: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
