import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function ImageInverse_1_13() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Functions are important for mapping elements from one set to another set. As we explore functions more deeply, we find two important concepts: <Text style={styles.bold}>image</Text> and <Text style={styles.bold}>inverse-image</Text>.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will elaborate the concept of image and inverse-image with examples for a better understanding. We will show how elements in the domain and codomain of a function are connected.
      </Text>

      {/* --- WHAT ARE FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>What are Functions?</Text>
      <Text style={styles.paragraph}>
        Before getting the idea of image and inverse-image, let us see what a function is. A function is a rule that takes elements from one set (called the domain) and maps them to elements in another set (called the codomain). The output that results from applying the function to an element in the domain is called the image of that element.
      </Text>

      {/* --- IMAGE OF A FUNCTION --- */}
      <Text style={styles.sectionHeader}>What is the Image of a Function?</Text>
      <Text style={styles.paragraph}>
        The image of a function is the set of all outputs that the function produces when applied to elements from the domain. More specifically, it is the set of all elements in the codomain that are "hit" or "mapped to" by some element in the domain.
      </Text>

      {/* 🖼️ IMAGE 1 */}
      <Image 
        source={require('../../assets/moduleImages/imginv1.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure 1: Function mapping from Domain to Codomain</Text>

      {/* --- EXAMPLE OF IMAGE --- */}
      <Text style={styles.subHeader}>Example of Image</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Consider a function <Text style={styles.bold}>f : {"{1, 2, 3, 4} → {a, b, c}"}</Text> defined as:</Text>
        <Text style={styles.exampleText}>f(1) = a, f(2) = b, f(3) = a, f(4) = c</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Here, the image of f is the set of all elements in the codomain that are mapped by the function. So in this case, the image is:</Text>
        <Text style={[styles.exampleText, styles.highlight]}>Image (f) = {"{a, b, c}"}</Text>
      </View>

      {/* 🖼️ IMAGE 2 */}
      <Image 
        source={require('../../assets/moduleImages/imginv2.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        The image includes every codomain element that is assigned to at least one domain element. In our example, every element in the codomain is part of the image because every element of {"{a, b, c}"} has at least one input from the domain.
      </Text>

      {/* --- EXAMPLE OF PARTIAL IMAGE --- */}
      <Text style={styles.subHeader}>Example of Partial Image</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Now, imagine a different function <Text style={styles.bold}>g : {"{1, 2, 3} → {x, y, z}"}</Text> defined as:</Text>
        <Text style={styles.exampleText}>g(1) = x, g(2) = y, g(3) = y</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Here, the image is:</Text>
        <Text style={[styles.exampleText, styles.highlight]}>Image (g) = {"{x, y}"}</Text>
      </View>

      {/* 🖼️ IMAGE 3 */}
      <Image 
        source={require('../../assets/moduleImages/imginv3.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        Notice that <Text style={styles.bold}>z</Text> is not part of the image because no element from the domain maps to z. This happens when some elements of the codomain are left "unused."
      </Text>

      {/* --- SUBSET IMAGE --- */}
      <Text style={styles.sectionHeader}>Subset Image</Text>
      <Text style={styles.paragraph}>
        Another concept of image is the subset image. Concept of image can also apply to a subset of the domain. If we want to know the image of only part of the domain, we can restrict the function to that subset.
      </Text>

      <Text style={styles.subHeader}>Example of Subset Image</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Consider the same function <Text style={styles.bold}>f : {"{1, 2, 3, 4} → {a, b, c}"}</Text>, defined as before. Now, we want to find the image of the subset {"{1, 4}"}:</Text>
        <Text style={[styles.exampleText, styles.highlight, {marginTop: 5}]}>Image of {"{1, 4}"} = {"{f(1), f(4)} = {a, c}"}</Text>
      </View>
      <Text style={styles.paragraph}>
        In this case, we are only concerned with the elements in the codomain that correspond to inputs from the subset {"{1, 4}"}. The image is simply {"{a, c}"}.
      </Text>

      {/* --- INVERSE-IMAGE OF A FUNCTION --- */}
      <Text style={styles.sectionHeader}>Inverse-Image of a Function</Text>
      <Text style={styles.paragraph}>
        Let us now understand the inverse-image (also called the <Text style={styles.bold}>preimage</Text>). Given an element in the codomain, which elements in the domain map to it?
      </Text>
      <Text style={styles.paragraph}>
        Instead of starting with elements from the domain and mapping to the codomain (as with the image), the inverse-image starts with elements in the codomain and traces back to their corresponding elements in the domain.
      </Text>

      {/* --- EXAMPLE OF INVERSE-IMAGE --- */}
      <Text style={styles.subHeader}>Example of Inverse-Image</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Let us consider the same function <Text style={styles.bold}>f : {"{1, 2, 3, 4} → {a, b, c}"}</Text> defined as:</Text>
        <Text style={styles.exampleText}>f(1) = a, f(2) = b, f(3) = a, f(4) = c</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Now, suppose we want to find the inverse-image of the element <Text style={styles.bold}>a</Text> in the codomain. The inverse-image of a is the set of all elements in the domain that map to a. From the definition of the function, we see that f(1) = a and f(3) = a, so:</Text>
        <Text style={[styles.exampleText, styles.highlight, {marginTop: 5}]}>f⁻¹(a) = {"{1, 3}"}</Text>
      </View>

      {/* 🖼️ IMAGE 4 */}
      <Image 
        source={require('../../assets/moduleImages/imginv4.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        The inverse-image of a includes both 1 and 3, because both of these domain elements map to a.
      </Text>

      {/* --- EMPTY INVERSE-IMAGE --- */}
      <Text style={styles.subHeader}>Empty Inverse-Image</Text>
      <Text style={styles.paragraph}>
        Sometimes, there may be codomain elements that no domain elements map to. In this case, the inverse-image of those elements is the empty set.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>For example, if we wanted to find f⁻¹(d) for our function f, we would notice that no domain element maps to d. Therefore, the inverse-image of d is:</Text>
        <Text style={[styles.exampleText, styles.highlight, {marginTop: 5}]}>f⁻¹(d) = ∅</Text>
      </View>

      {/* 🖼️ IMAGE 5 */}
      <Image 
        source={require('../../assets/moduleImages/imginv5.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        This simply means that d is not mapped by any element from the domain.
      </Text>

      {/* --- INVERSE-IMAGE OF A SUBSET --- */}
      <Text style={styles.sectionHeader}>Inverse-Image of a Subset</Text>
      <Text style={styles.paragraph}>
        Just like with the image of a subset of the domain, we can also find the inverse-image of a subset of the codomain. In this case, we look for all domain elements that map to <Text style={styles.bold}>any</Text> element in the codomain subset.
      </Text>

      <Text style={styles.subHeader}>Example of Inverse-Image of a Subset</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Again, using our function <Text style={styles.bold}>f : {"{1, 2, 3, 4} → {a, b, c}"}</Text>, let us find the inverse-image of the subset {"{a, c}"} in the codomain:</Text>
        <Text style={[styles.exampleText, styles.highlight, {marginTop: 5}]}>f⁻¹({"{"}a, c{"}"}) = {"{1, 3, 4}"}</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>This is because: f(1) = a, f(3) = a, f(4) = c</Text>
      </View>

      {/* 🖼️ IMAGE 6 */}
      <Image 
        source={require('../../assets/moduleImages/imginv6.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        Therefore, the inverse-image of {"{a, c}"} includes all domain elements that map to either a or c.
      </Text>

      {/* --- POINTS TO NOTE --- */}
      <Text style={styles.sectionHeader}>Inverse-Images: Points to Note</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>The inverse-image of an element in the codomain is always a <Text style={styles.bold}>set</Text>, not a single element. This is because multiple domain elements can map to the same codomain element, so the inverse-image might contain more than one element.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>The inverse-image only refers to which domain elements map to a given codomain element or set of elements. It is <Text style={styles.bold}>not</Text> the same as an inverse function. Inverse functions only exist when the function is a bijection (one-to-one and onto), but inverse-images exist for all types of functions.</Text>
      </View>

      {/* --- COMBINING IMAGE AND INVERSE-IMAGE --- */}
      <Text style={styles.sectionHeader}>Combining Image and Inverse-Image</Text>
      <Text style={styles.paragraph}>
        The concepts of image and inverse-image are closely related, and they are used to understand how a function behaves. The image gives us insight into which codomain elements are "hit" by the function, while the inverse-image tells us where those hits came from in the domain.
      </Text>
      <Text style={styles.paragraph}>
        In general, the image helps us see the "forward" movement of a function, from the domain to the codomain. The inverse-image allows us to trace backwards, from the codomain to the domain, and identify which domain elements correspond to certain codomain elements.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concepts of image and inverse-image in the context of functions in discrete mathematics. We have seen that the image is the set of all outputs produced by the function, while the inverse-image helps us find the inputs that lead to certain outputs. We also covered examples where we found both image and inverse-image for individual elements and subsets.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 10, paddingLeft: 5 },
  bullet: { fontSize: 18, color: '#16941c', marginRight: 10, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  highlight: { color: '#16941c', fontWeight: 'bold', fontSize: 15 },
  
  // Image Styles
  image: { width: '100%', height: 220, borderRadius: 12, marginTop: 15, marginBottom: 5, backgroundColor: '#f1f5f9' },
  imageCaption: { fontSize: 13, color: '#64748b', textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }
});