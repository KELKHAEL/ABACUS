import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import your content components (You will create these in the lectures folder)
import IntroContent_1_1 from './lectures/IntroDiscreteMath_1_1';
import MathStatements_1_2 from './lectures/MathStatements_1_2';
import AtomicMolecular_1_3 from './lectures/AtomicMolecular_1_3';
import Implications_1_4 from './lectures/Implications_1_4';
import PredicatesQuantifiers_1_5 from './lectures/PredicatesQuantifiers_1_5';
import SetsDefinition_1_6 from './lectures/SetsDefinition_1_6';
import SetsNotations_1_7 from './lectures/SetsNotations_1_7';
import Relations_1_8 from './lectures/Relations_1_8';
import SetOperations_1_9 from './lectures/SetOperations_1_9';
import VennDiagrams_1_10 from './lectures/VennDiagrams_1_10';
import Functions_1_11 from './lectures/Functions_1_11';
import FunctionProperties_1_12 from './lectures/FunctionProperties_1_12';
import ImageInverse_1_13 from './lectures/ImageInverse_1_13';

import PropositionalLogic_2_1 from './lectures/PropositionalLogic_2_1';
import LogicalEquivalence_2_2 from './lectures/LogicalEquivalence_2_2';
import Deductions_2_3 from './lectures/Deductions_2_3';
import PredicateLogic_2_4 from './lectures/PredicateLogic_2_4';
import Contrapositive_2_5 from './lectures/Contrapositive_2_5';
import Contradiction_2_6 from './lectures/Contradiction_2_6';
import ProofByCases_2_7 from './lectures/ProofByCases_2_7';
import InferenceRules_2_8 from './lectures/InferenceRules_2_8';

import GroupOperators_3_1 from './lectures/GroupOperators_3_1';
import GroupTheory_3_2 from './lectures/GroupTheory_3_2';
import Groups_3_3 from './lectures/Groups_3_3';
import AbelianGroup_3_4 from './lectures/AbelianGroup_3_4';
import Semigroup_3_5 from './lectures/Semigroup_3_5';
import Monoid_3_6 from './lectures/Monoid_3_6';
import RingsSubrings_3_7 from './lectures/RingsSubrings_3_7';
import RingProperties_3_8 from './lectures/RingProperties_3_8';
import IntegralDomain_3_9 from './lectures/IntegralDomain_3_9';
import Fields_3_10 from './lectures/Fields_3_10';

import CountingTheory_4_1 from './lectures/CountingTheory_4_1';
import Combinatorics_4_2 from './lectures/Combinatorics_4_2';
import Principles_4_3 from './lectures/Principles_4_3';
import CountingSets_4_4 from './lectures/CountingSets_4_4';
import PIE_4_5 from './lectures/PIE_4_5';
import BitStrings_4_6 from './lectures/BitStrings_4_6';
import LatticePaths_4_7 from './lectures/LatticePaths_4_7';
import BinomialCoefficients_4_8 from './lectures/BinomialCoefficients_4_8';
import PascalsTriangle_4_9 from './lectures/PascalsTriangle_4_9';
import PermutationsCombinations_4_10 from './lectures/PermutationsCombinations_4_10';
import PigeonholePrinciple_4_11 from './lectures/PigeonholePrinciple_4_11';

import Probability_5_1 from './lectures/Probability_5_1';
import SampleSpace_5_2 from './lectures/SampleSpace_5_2';
import ConditionalProb_5_3 from './lectures/ConditionalProb_5_3';
import RandomVariables_5_4 from './lectures/RandomVariables_5_4';
import DistributionFunctions_5_5 from './lectures/DistributionFunctions_5_5';
import VarianceSD_5_6 from './lectures/VarianceSD_5_6';

import Sequences_6_1 from './lectures/Sequences_6_1';
import ArithmeticGeometric_6_2 from './lectures/ArithmeticGeometric_6_2';
import PolynomialFitting_6_3 from './lectures/PolynomialFitting_6_3';

import MathematicalInduction_7_1 from './lectures/MathematicalInduction_7_1';
import FormalInduction_7_2 from './lectures/FormalInduction_7_2';
import InductionTypes_7_3 from './lectures/InductionTypes_7_3';
import RecurrenceRelations_7_4 from './lectures/RecurrenceRelations_7_4';
import LinearRecurrence_7_5 from './lectures/LinearRecurrence_7_5';
import NonHomogeneous_7_6 from './lectures/NonHomogeneous_7_6';
import SolvingRecurrence_7_7 from './lectures/SolvingRecurrence_7_7';
import MastersTheorem_7_8 from './lectures/MastersTheorem_7_8';
import GeneratingFunctions_7_9 from './lectures/GeneratingFunctions_7_9';

import GraphModels_8_1 from './lectures/GraphModels_8_1';
import MoreOnGraphs_8_2 from './lectures/MoreOnGraphs_8_2';
import PlanarGraphs_8_3 from './lectures/PlanarGraphs_8_3';
import NonPlanarGraphs_8_4 from './lectures/NonPlanarGraph_8_4';
import Polyhedra_8_5 from './lectures/Polyhedra_8_5';
import IntroductionToTrees_8_6 from './lectures/IntroTrees_8_6';
import TreeProperties_8_7 from './lectures/TreeProperties_8_7';
import RootedUnrootedTrees_8_8 from './lectures/RootedUnrooted_8_8';
import SpanningTrees_8_9 from './lectures/SpanningTrees_8_9';
import GraphColoring_8_10 from './lectures/GraphColoring_8_10';
import ColoringTheory_8_11 from './lectures/ColoringTheory_8_11';
import ColoringEdges_8_12 from './lectures/ColoringEdges_8_12';
import EulerPaths_8_13 from './lectures/EulerPathCircuit_8_13';
import HamiltonianPaths_8_14 from './lectures/HamiltonianPath_8_14';
import BooleanLogic_9_1 from './lectures/BooleanExpressions_9_1';
import BooleanSimplification_9_2 from './lectures/SimplificationBoolean_9_2';

import NumberTheory_10_1 from './lectures/NumberTheory_10_1';
import Divisibility_10_2 from './lectures/Divisibility_10_2';
import RemainderClasses_10_3 from './lectures/RemainderClasses_10_3';
import CongruenceProperties_10_4 from './lectures/CongruenceProperties_10_4';
import LinearDiophantine_10_5 from './lectures/LinearDiophantine_10_5';

export default function LectureContentScreen({ route, navigation }) {
  const { topicId, topicTitle, moduleColor } = route.params;

  // Logic to render the correct component based on ID
  const renderContent = () => {
    switch (topicId) {
      // Module 1
      case "1.1": return <IntroContent_1_1 />;
      case "1.2": return <MathStatements_1_2 />;
      case "1.3": return <AtomicMolecular_1_3 />;
      case "1.4": return <Implications_1_4 />;
      case "1.5": return <PredicatesQuantifiers_1_5 />;
      case "1.6": return <SetsDefinition_1_6 />;
      case "1.7": return <SetsNotations_1_7 />;
      case "1.8": return <Relations_1_8 />;
      case "1.9": return <SetOperations_1_9 />;
      case "1.10": return <VennDiagrams_1_10 />;
      case "1.11": return <Functions_1_11 />;
      case "1.12": return <FunctionProperties_1_12 />;
      case "1.13": return <ImageInverse_1_13 />;
      // Module 2
      case "2.1": return <PropositionalLogic_2_1 />;
      case "2.2": return <LogicalEquivalence_2_2 />;
      case "2.3": return <Deductions_2_3 />;
      case "2.4": return <PredicateLogic_2_4 />;
      case "2.5": return <Contrapositive_2_5 />;
      case "2.6": return <Contradiction_2_6 />;
      case "2.7": return <ProofByCases_2_7 />;
      case "2.8": return <InferenceRules_2_8 />;
      // Module 3
      case "3.1": return <GroupOperators_3_1 />;
      case "3.2": return <GroupTheory_3_2 />;
      case "3.3": return <Groups_3_3 />;
      case "3.4": return <AbelianGroup_3_4 />;
      case "3.5": return <Semigroup_3_5 />;
      case "3.6": return <Monoid_3_6 />;
      case "3.7": return <RingsSubrings_3_7 />;
      case "3.8": return <RingProperties_3_8 />;
      case "3.9": return <IntegralDomain_3_9 />;
      case "3.10": return <Fields_3_10 />;
      // Module 4
      case "4.1": return <CountingTheory_4_1 />;
      case "4.2": return <Combinatorics_4_2 />;
      case "4.3": return <Principles_4_3 />;
      case "4.4": return <CountingSets_4_4 />;
      case "4.5": return <PIE_4_5 />;
      case "4.6": return <BitStrings_4_6 />;
      case "4.7": return <LatticePaths_4_7 />;
      case "4.8": return <BinomialCoefficients_4_8 />;
      case "4.9": return <PascalsTriangle_4_9 />;
      case "4.10": return <PermutationsCombinations_4_10 />;
      case "4.11": return <PigeonholePrinciple_4_11 />;
      // Module 5
      case "5.1": return <Probability_5_1 />;
      case "5.2": return <SampleSpace_5_2 />;
      case "5.3": return <ConditionalProb_5_3 />;
      case "5.4": return <RandomVariables_5_4 />;
      case "5.5": return <DistributionFunctions_5_5 />;
      case "5.6": return <VarianceSD_5_6 />;
      // Module 6
      case "6.1": return <Sequences_6_1 />;
      case "6.2": return <ArithmeticGeometric_6_2 />;
      case "6.3": return <PolynomialFitting_6_3 />;
      // Module 7
      case "7.1": return <MathematicalInduction_7_1 />;
      case "7.2": return <FormalInduction_7_2 />;
      case "7.3": return <InductionTypes_7_3 />;
      case "7.4": return <RecurrenceRelations_7_4 />;
      case "7.5": return <LinearRecurrence_7_5 />;
      case "7.6": return <NonHomogeneous_7_6 />;
      case "7.7": return <SolvingRecurrence_7_7 />;
      case "7.8": return <MastersTheorem_7_8 />;
      case "7.9": return <GeneratingFunctions_7_9 />;
      // Module 8
      case "8.1": return <GraphModels_8_1 />;
      case "8.2": return <MoreOnGraphs_8_2 />;
      case "8.3": return <PlanarGraphs_8_3 />;
      case "8.4": return <NonPlanarGraphs_8_4 />;
      case "8.5": return <Polyhedra_8_5 />;
      case "8.6": return <IntroductionToTrees_8_6 />;
      case "8.7": return <TreeProperties_8_7 />;
      case "8.8": return <RootedUnrootedTrees_8_8 />;
      case "8.9": return <SpanningTrees_8_9 />;
      case "8.10": return <GraphColoring_8_10 />;
      case "8.11": return <ColoringTheory_8_11 />;
      case "8.12": return <ColoringEdges_8_12 />;
      case "8.13": return <EulerPaths_8_13 />;
      case "8.14": return <HamiltonianPaths_8_14 />;
      // Module 9
      case "9.1": return <BooleanLogic_9_1 />;
      case "9.2": return <BooleanSimplification_9_2 />;
      // Module 10
      case "10.1": return <NumberTheory_10_1 />;
      case "10.2": return <Divisibility_10_2 />;
      case "10.3": return <RemainderClasses_10_3 />;
      case "10.4": return <CongruenceProperties_10_4 />;
      case "10.5": return <LinearDiophantine_10_5 />;
      default: return <Text style={styles.placeholder}>Academic content for this section is being prepared...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerId}>MODULE SECTION {topicId}</Text>
        <View style={{width: 28}} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={[styles.mainTitle, { color: moduleColor }]}>{topicTitle}</Text>
        <View style={[styles.accentBar, { backgroundColor: moduleColor }]} />
        
        {/* Full Academic Module Content rendered here */}
        {renderContent()}

        <View style={{height: 60}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerId: { fontSize: 10, fontWeight: 'bold', color: '#94A3B8', letterSpacing: 2 },
  scrollContainer: { padding: 25 },
  mainTitle: { fontSize: 26, fontWeight: '900', marginBottom: 10 },
  accentBar: { width: 60, height: 6, borderRadius: 3, marginBottom: 30 },
  placeholder: { color: '#94A3B8', fontStyle: 'italic', textAlign: 'center', marginTop: 50 },
  labButton: { flexDirection: 'row', padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 40, elevation: 4 },
  labButtonText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});