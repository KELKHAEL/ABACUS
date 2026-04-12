import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function FunctionProperties_1_12() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Functions are nothing but mapping relationships between different sets. To fully understand functions, we need to understand three key concepts: surjection, injection, and bijection. In this chapter, we will see each of these function types with examples and see how they differ from one another.
      </Text>

      {/* --- FUNCTIONS IN SETS AND RELATIONS --- */}
      <Text style={styles.sectionHeader}>Functions in Sets and Relations</Text>
      <Text style={styles.paragraph}>
        A function is a rule that takes elements from one set (domain) and assigns them to elements in another set (codomain). Every element in the domain must map to exactly one element in the codomain. However, the reverse is not necessarily true. For example, imagine we assign every student in a class a locker. Each student gets exactly one locker, but some lockers may remain unused.
      </Text>
      <Text style={styles.paragraph}>
        Here is another example. Take a look at the following mapping: Here, each number from left has a square on the right −
      </Text>

      {/* 🖼️ IMAGE 1: Function Mapping (Squares) */}
      <Image 
        source={require('../../assets/moduleImages/func1.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* --- SURJECTION FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>Surjection Functions That Are "Onto"</Text>
      <Text style={styles.paragraph}>
        A surjective function, also known as an "onto" function. It is a function where every element in the codomain is the image of at least one element in the domain. In simpler words, there are no unused elements in the codomain.
      </Text>
      <Text style={styles.paragraph}>
        Formally, a function is surjective if every element of the codomain is the image of at least one element from the domain. Nothing in the codomain is left out.
      </Text>

      {/* 🖼️ IMAGE 2: Surjective vs Not Surjective Nodes */}
      <Image 
        source={require('../../assets/moduleImages/func2.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example of Surjection</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Let us consider the function <Text style={styles.bold}>f : {"{1, 2, 3}"} → {"{a, b, c}"}</Text> defined by: <Text style={styles.bold}>f(1) = a, f(2) = b, f(3) = c</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        Here, every element in the codomain {"{a, b, c}"} has been "hit" by some element from the domain {"{1, 2, 3}"}. This means <Text style={styles.bold}>f</Text> is a surjective function because there are no elements left out in the codomain.
      </Text>
      <Text style={styles.paragraph}>The following mapping presents another example −</Text>

      {/* 🖼️ IMAGE 3: Surjective Example Diagram */}
      <Image 
        source={require('../../assets/moduleImages/func3.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example of Non-Surjective</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Now, consider a function <Text style={styles.bold}>g : {"{1, 2, 3}"} → {"{a, b, c}"}</Text> where: <Text style={styles.bold}>g(1) = a, g(2) = a, g(3) = c</Text>.</Text>
      </View>
      <Text style={styles.paragraph}>
        In this case, the element b from the codomain is never "hit" by any element from the domain. This means g is <Text style={styles.bold}>not</Text> surjective because something in the codomain is left out.
      </Text>
      <Text style={styles.paragraph}>
        Surjections are important when we want to ensure that every possible output is covered. There is no leaving "gaps."
      </Text>

      {/* --- INJECTION FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>Injection Functions That Are "One-to-One"</Text>
      <Text style={styles.paragraph}>
        On the other hand, the injective function, or "one-to-one" function, shows that no two different elements in the domain map to the same element in the codomain. This means every element in the codomain is the image of at most <Text style={{fontStyle: 'italic'}}>one</Text> element in the domain.
      </Text>
      <Text style={styles.paragraph}>
        Formally, a function is injective if every element of the codomain is the image of at most one element from the domain. There are no "repeated" images in the codomain.
      </Text>

      {/* 🖼️ IMAGE 4: Injective vs Not Injective Nodes */}
      <Image 
        source={require('../../assets/moduleImages/func4.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example of Injection</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Let us consider <Text style={styles.bold}>f : Z → Z</Text> (where Z represents all integers) is defined by: <Text style={styles.bold}>f(n) = 3n</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        For every integer n, f(n) produces a unique result. No two different integers will give the same value after being multiplied by 3. Therefore, this function is injective. It does not "reuse" codomain elements for different domain inputs.
      </Text>

      <Text style={styles.subHeader}>Example of Non-Injective</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Consider a function <Text style={styles.bold}>h : {"{1, 2, 3}"} → {"{a, b}"}</Text> defined by: <Text style={styles.bold}>h(1) = a, h(2) = a, h(3) = b</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        In this case, both h(1) and h(2) are mapped to a. Since two different domain elements are assigned to the same codomain element, h is <Text style={styles.bold}>not</Text> injective. Injection fails when there is "overlap" in the codomain.
      </Text>

      {/* 🖼️ IMAGE 5: Non-Injective Example Diagram */}
      <Image 
        source={require('../../assets/moduleImages/func5.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* --- BIJECTION FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>Bijection The Perfect Function</Text>
      <Text style={styles.paragraph}>
        Next comes the bijection functions. It is both injective and surjective. In other words, every element in the domain maps to a unique element in the codomain, and every element in the codomain is covered. This makes bijections "perfect" functions because they pair every element in the domain with one (and only one) element in the codomain, with no repeats and no leftovers.
      </Text>
      <Text style={styles.paragraph}>
        Formally, a function is bijective if it is both injective and surjective, meaning it’s a one-to-one correspondence between the domain and codomain.
      </Text>

      <Text style={styles.subHeader}>Example of Bijection</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Consider the function <Text style={styles.bold}>f : {"{1, 2, 3}"} → {"{a, b, c}"}</Text>, defined as: <Text style={styles.bold}>f(1) = a, f(2) = b, f(3) = c</Text>.</Text>
      </View>
      <Text style={styles.paragraph}>
        This is a bijection because every element in the domain has a unique match in the codomain, and every codomain element is used. There are no repeated values and no leftover elements.
      </Text>

      {/* 🖼️ IMAGE 6: Bijection Example Diagram */}
      <Image 
        source={require('../../assets/moduleImages/func6.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example of Non-Bijective Function</Text>
      <Text style={styles.paragraph}>
        If we modify <Text style={styles.bold}>f</Text> such that <Text style={styles.bold}>f(2) = a</Text>, then the function is no longer bijective. It might still be surjective (depending on the other values), but it is no longer injective because two elements in the domain share the same codomain value.
      </Text>

      {/* 🖼️ IMAGE 7: Non-Bijective Example Diagram */}
      <Image 
        source={require('../../assets/moduleImages/func7.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* --- COMBINING CONCEPTS --- */}
      <Text style={styles.sectionHeader}>Combining Concepts: Injective vs Surjective</Text>
      <Text style={styles.paragraph}>
        We understood the idea of injective and surjective. But these are essential to understand that injective and surjective functions are not opposites. A function can be injective but not surjective; surjective but not injective; both; or neither.
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A function can be injective but miss out some elements in the codomain, making it not surjective.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A function can be surjective but reuse elements of the codomain, making it not injective.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A bijection is both injective and surjective, satisfying both properties.</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of surjection, injection, and bijection functions in discrete mathematics. Surjection functions cover every element in the codomain. Injection functions avoid reusing codomain elements. Bijection functions do both. We also touched on inverse functions and how they only exist for bijections.
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
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  
  // Image Styles
  image: { width: '100%', height: 220, borderRadius: 12, marginTop: 15, marginBottom: 20, backgroundColor: '#f1f5f9' },
});