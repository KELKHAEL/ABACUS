import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Custom Mapping Flow Visual for Image and Inverse-Image
const MappingFlow = ({ direction = 'forward' }) => {
  const isForward = direction === 'forward';
  return (
    <View style={styles.flowOuter}>
      <View style={styles.flowContainer}>
        <View style={styles.setBox}>
          <Text style={styles.setBoxLabel}>Domain (X)</Text>
          <View style={styles.pointGroup}>
            <View style={[styles.dot, !isForward && styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.arrowPath}>
          <Text style={styles.fLabel}>{isForward ? "f(x)" : "f⁻¹(y)"}</Text>
          <Ionicons 
            name={isForward ? "arrow-forward" : "arrow-back"} 
            size={24} 
            color="#16941c" 
          />
        </View>

        <View style={styles.setBox}>
          <Text style={styles.setBoxLabel}>Codomain (Y)</Text>
          <View style={styles.pointGroup}>
            <View style={[styles.dot, isForward && styles.activeDot]} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
      <Text style={styles.caption}>
        {isForward 
          ? "Image: Mapping forward from Domain to Codomain." 
          : "Inverse-Image: Tracing backward from Codomain to Domain."}
      </Text>
    </View>
  );
};

export default function ImageInverse_1_13() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Functions are important for mapping elements from one set to another. As we explore functions more deeply, we find two important concepts: <Text style={styles.bold}>image</Text> and <Text style={styles.bold}>inverse-image</Text>.
      </Text>

      {/* SECTION: IMAGE */}
      <Text style={styles.sectionHeader}>What is the Image of a Function?</Text>
      <MappingFlow direction="forward" />
      <Text style={styles.paragraph}>
        The image of a function is the set of all outputs that the function produces when applied to elements from the domain. More specifically, it is the set of all elements in the codomain that are "hit" or "mapped to" by some element in the domain.
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example of Image:</Text>
        <Text style={styles.exampleText}>Consider f: {"{1, 2, 3, 4} → {a, b, c}"}</Text>
        <Text style={styles.exampleText}>f(1)=a, f(2)=b, f(3)=a, f(4)=c</Text>
        <Text style={[styles.exampleText, styles.highlight]}>Image(f) = {"{a, b, c}"}</Text>
      </View>

      <Text style={styles.subHeader}>Partial and Subset Image</Text>
      <Text style={styles.paragraph}>
        If some elements of the codomain are left "unused," they are not part of the image. We can also find the image of a specific subset of the domain.
      </Text>

      {/* SECTION: INVERSE-IMAGE */}
      <Text style={styles.sectionHeader}>Inverse-Image (Preimage)</Text>
      <MappingFlow direction="backward" />
      <Text style={styles.paragraph}>
        Given an element in the codomain, the inverse-image is the set of <Text style={styles.bold}>all</Text> elements in the domain that map to it. 
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example of Inverse-Image:</Text>
        <Text style={styles.exampleText}>Using the same function f, find the inverse-image of 'a'.</Text>
        <Text style={styles.exampleText}>Since f(1)=a and f(3)=a...</Text>
        <Text style={[styles.exampleText, styles.highlight]}>f⁻¹(a) = {"{1, 3}"}</Text>
      </View>

      <Text style={styles.subHeader}>Important Points to Note</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• The inverse-image of an element is always a <Text style={styles.bold}>set</Text>, not a single element.</Text>
        <Text style={styles.infoText}>• Unlike inverse functions, inverse-images exist for <Text style={styles.bold}>all</Text> types of functions.</Text>
        <Text style={styles.infoText}>• Trace "backward" from codomain to domain to identify the pre-image.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concepts of image and inverse-image. The image helps us see the "forward" movement of a function, while the inverse-image allows us to trace "backwards" to identify which domain elements correspond to certain outputs.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5, fontFamily: 'monospace' },
  highlight: { color: '#16941c', fontWeight: 'bold' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 20 },
  
  // Flow Visualization
  flowOuter: { alignItems: 'center', marginVertical: 20 },
  flowContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' },
  setBox: { width: 100, height: 80, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  setBoxLabel: { fontSize: 10, fontWeight: 'bold', color: '#94A3B8', marginBottom: 5 },
  pointGroup: { flexDirection: 'row', gap: 10 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#E2E8F0' },
  activeDot: { backgroundColor: '#16941c' },
  arrowPath: { flex: 1, alignItems: 'center' },
  fLabel: { fontSize: 12, fontWeight: 'bold', color: '#16941c', marginBottom: 5 },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 15, fontStyle: 'italic', textAlign: 'center' }
});