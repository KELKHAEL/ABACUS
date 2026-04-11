import React, { useContext } from 'react';
import { View, ActivityIndicator, Platform, StatusBar, Dimensions } from 'react-native';
import { CopilotProvider } from 'react-native-copilot';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './AuthContext';

// Import Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StudentHome from './screens/StudentHome';
import LectureContentScreen from './screens/LectureContentScreen';
import TeacherHome from './screens/TeacherHome';
import ModuleDetailScreen from './screens/ModuleDetailScreen';
import MyGradesScreen from './screens/MyGradesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ModulesScreen from './screens/ModulesScreen';

// Simulations
import SetsSimulation from './screens/simulations/SetsSimulation';
import TruthTableSimulation from './screens/simulations/TruthTableSimulation';
import BitwiseSimulation from './screens/simulations/BitwiseSimulation';
import LogicCircuitSimulation from './screens/simulations/LogicCircuitSimulation';
import PermutationSimulation from './screens/simulations/PermutationSimulation';
import ProbabilitySimulation from './screens/simulations/ProbabilitySimulation';
import FrequencyDistributionTable from './screens/simulations/FrequencyDistributionTable';
import ZTableSimulation from './screens/simulations/ZTableSimulation';
import DijkstraSimulation from './screens/simulations/DijkstraSimulation';
import RelationsLab from './screens/simulations/RelationsLab';
import EuclideanLab from './screens/simulations/EuclideanLab';
import TreeTraversalLab from './screens/simulations/TreeTraversalLab';
import RSACryptographyLab from './screens/simulations/RSACryptographyLab';
import PrimeFactorization from './screens/simulations/PrimeFactorization';
import FibonacciCalculator from './screens/simulations/FibonacciCalculator';
import ModuloCalculator from './screens/simulations/ModuloCalculator';
import PigeonholeCalculator from './screens/simulations/PigeonholeCalculator';
import LinearDiophantineLab from './screens/simulations/LinearDiophantineLab';
import ChineseRemainderLab from './screens/simulations/ChineseRemainderLab';
import InclusionExclusionLab from './screens/simulations/InclusionExclusionLab';
import BinomialTheoremLab from './screens/simulations/BinomialTheoremLab';
import EulerPlanarGraphLab from './screens/simulations/EulerPlanarGraphLab';
import ScientificCalculator from './screens/simulations/ScientificCalculator';
import RecurrenceRelationLab from './screens/simulations/RecurrenceRelationLab';
import ComplexityLab from './screens/simulations/ComplexityLab';
import BayesianProbabilityLab from './screens/simulations/BayesianProbabilityLab';
import MatrixRelationsLab from './screens/simulations/MatrixRelationsLab';
import PathFinderLab from './screens/simulations/PathFinderLab';
import ModularArithmeticLab from './screens/simulations/ModularArithmeticLab';
import CaesarCipherLab from './screens/simulations/CaesarCipherLab';
import AtbashCipherLab from './screens/simulations/AtbashCipherLab';
import VigenereCipherLab from './screens/simulations/VigenereCipherLab';
import RailFenceCipherLab from './screens/simulations/RailfenceCipherLab';
import ColumnarCipherLab from './screens/simulations/ColumnarCipherLab';

// Quizzes
import QuizListScreen from './screens/QuizListScreen'; 
import QuizScreen from './screens/QuizScreen'; 

// Lectures
import IntroDiscreteMath_1_1 from './screens/lectures/IntroDiscreteMath_1_1';
import MathStatements_1_2 from './screens/lectures/MathStatements_1_2';
import AtomicMolecular_1_3 from './screens/lectures/AtomicMolecular_1_3';
import Implications_1_4 from './screens/lectures/Implications_1_4';
import PredicatesQuantifiers_1_5 from './screens/lectures/PredicatesQuantifiers_1_5';
import SetsDefinition_1_6 from './screens/lectures/SetsDefinition_1_6';
import SetsNotations_1_7 from './screens/lectures/SetsNotations_1_7';
import Relations_1_8 from './screens/lectures/Relations_1_8';
import SetOperations_1_9 from './screens/lectures/SetOperations_1_9';
import VennDiagrams_1_10 from './screens/lectures/VennDiagrams_1_10';
import Functions_1_11 from './screens/lectures/Functions_1_11';
import FunctionProperties_1_12 from './screens/lectures/FunctionProperties_1_12';
import ImageInverse_1_13 from './screens/lectures/ImageInverse_1_13';

import PropositionalLogic_2_1 from './screens/lectures/PropositionalLogic_2_1';
import LogicalEquivalence_2_2 from './screens/lectures/LogicalEquivalence_2_2';
import Deductions_2_3 from './screens/lectures/Deductions_2_3';
import PredicateLogic_2_4 from './screens/lectures/PredicateLogic_2_4';
import Contrapositive_2_5 from './screens/lectures/Contrapositive_2_5';
import Contradiction_2_6 from './screens/lectures/Contradiction_2_6';
import ProofByCases_2_7 from './screens/lectures/ProofByCases_2_7';
import InferenceRules_2_8 from './screens/lectures/InferenceRules_2_8';

import GroupTheory_3_1 from './screens/lectures/GroupTheory_3_1';
import AlgebraicStructures_3_2 from './screens/lectures/AlgebraicStructures_3_2';
import Groups_3_3 from './screens/lectures/Groups_3_3';
import AbelianGroup_3_4 from './screens/lectures/AbelianGroup_3_4';
import Semigroup_3_5 from './screens/lectures/Semigroup_3_5';
import Monoid_3_6 from './screens/lectures/Monoid_3_6';
import RingsSubrings_3_7 from './screens/lectures/RingsSubrings_3_7';
import RingProperties_3_8 from './screens/lectures/RingProperties_3_8';
import IntegralDomain_3_9 from './screens/lectures/IntegralDomain_3_9';
import Fields_3_10 from './screens/lectures/Fields_3_10';

import CountingTheory_4_1 from './screens/lectures/CountingTheory_4_1';
import Combinatorics_4_2 from './screens/lectures/Combinatorics_4_2';
import Principles_4_3 from './screens/lectures/Principles_4_3';
import CountingSets_4_4 from './screens/lectures/CountingSets_4_4';
import PIE_4_5 from './screens/lectures/PIE_4_5';
import BitStrings_4_6 from './screens/lectures/BitStrings_4_6';
import LatticePaths_4_7 from './screens/lectures/LatticePaths_4_7';
import BinomialCoefficients_4_8 from './screens/lectures/BinomialCoefficients_4_8';
import PascalsTriangle_4_9 from './screens/lectures/PascalsTriangle_4_9';
import PermutationsCombinations_4_10 from './screens/lectures/PermutationsCombinations_4_10';
import PigeonholePrinciple_4_11 from './screens/lectures/PigeonholePrinciple_4_11';

import Probability_5_1 from './screens/lectures/Probability_5_1';
import SampleSpace_5_2 from './screens/lectures/SampleSpace_5_2';
import ConditionalProb_5_3 from './screens/lectures/ConditionalProb_5_3';
import RandomVariables_5_4 from './screens/lectures/RandomVariables_5_4';
import DistributionFunctions_5_5 from './screens/lectures/DistributionFunctions_5_5';
import VarianceSD_5_6 from './screens/lectures/VarianceSD_5_6';

import Sequences_6_1 from './screens/lectures/Sequences_6_1';
import ArithmeticGeometric_6_2 from './screens/lectures/ArithmeticGeometric_6_2';
import PolynomialFitting_6_3 from './screens/lectures/PolynomialFitting_6_3';

import MathematicalInduction_7_1 from './screens/lectures/MathematicalInduction_7_1';
import FormalInduction_7_2 from './screens/lectures/FormalInduction_7_2';
import InductionTypes_7_3 from './screens/lectures/InductionTypes_7_3';
import RecurrenceRelations_7_4 from './screens/lectures/RecurrenceRelations_7_4';
import LinearRecurrence_7_5 from './screens/lectures/LinearRecurrence_7_5';
import NonHomogeneous_7_6 from './screens/lectures/NonHomogeneous_7_6';
import SolvingRecurrence_7_7 from './screens/lectures/SolvingRecurrence_7_7';
import MastersTheorem_7_8 from './screens/lectures/MastersTheorem_7_8';
import GeneratingFunctions_7_9 from './screens/lectures/GeneratingFunctions_7_9';

import GraphModels_8_1 from './screens/lectures/GraphModels_8_1';
import MoreOnGraphs_8_2 from './screens/lectures/MoreOnGraphs_8_2';
import PlanarGraphs_8_3 from './screens/lectures/PlanarGraphs_8_3';
import NonPlanarGraphs_8_4 from './screens/lectures/NonPlanarGraph_8_4';
import Polyhedra_8_5 from './screens/lectures/Polyhedra_8_5';
import IntroductionToTrees_8_6 from './screens/lectures/IntroTrees_8_6';
import TreeProperties_8_7 from './screens/lectures/TreeProperties_8_7';
import RootedUnrootedTrees_8_8 from './screens/lectures/RootedUnrooted_8_8';
import SpanningTrees_8_9 from './screens/lectures/SpanningTrees_8_9';
import GraphColoring_8_10 from './screens/lectures/GraphColoring_8_10';
import ColoringTheory_8_11 from './screens/lectures/ColoringTheory_8_11';
import ColoringEdges_8_12 from './screens/lectures/ColoringEdges_8_12';
import EulerPaths_8_13 from './screens/lectures/EulerPathCircuit_8_13';
import HamiltonianPaths_8_14 from './screens/lectures/HamiltonianPath_8_14';
import BooleanLogic_9_1 from './screens/lectures/BooleanExpressions_9_1';
import BooleanSimplification_9_2 from './screens/lectures/SimplificationBoolean_9_2';

import NumberTheory_10_1 from './screens/lectures/NumberTheory_10_1';
import Divisibility_10_2 from './screens/lectures/Divisibility_10_2';
import RemainderClasses_10_3 from './screens/lectures/RemainderClasses_10_3';
import CongruenceProperties_10_4 from './screens/lectures/CongruenceProperties_10_4';
import LinearDiophantine_10_5 from './screens/lectures/LinearDiophantine_10_5';

const Stack = createNativeStackNavigator();

// --- SMART DEVICE DETECTION ---
const { width, height } = Dimensions.get('window');
// Standard React Native tablet detection (if shortest side is >= 600px, it's a tablet)
const isTablet = Math.min(width, height) >= 600; 

// If it's an Android tablet, we pull the highlight UP by the exact height of the Status Bar.
// If it's an Android phone, we leave it at 0 because it works perfectly.
const copilotOffset = (isTablet && Platform.OS === 'android') ? -(StatusBar.currentHeight || 24) : 0;
// --- Main Navigator Component ---
// This uses the context to decide which screen stack to show
const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext); // ✅ Listen to Context

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#104a28" />
      </View>
    );
  }

  return (
    // ✅ WRAP WITH COPILOT PROVIDER
    <CopilotProvider 
      overlay="svg" 
      animated={true} 
      stepNumberComponent={() => null} // Hides the step numbers for a cleaner look
      labels={{ previous: "Back", next: "Next", skip: "Skip Tour", finish: "Got it!" }}
      verticalOffset={copilotOffset}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {user ? (
            // --- LOGGED IN SCREENS ---
            <>
              {user.role === 'ADMIN' || user.role === 'Admin' || user.role === 'INSTRUCTOR' || user.role === 'TEACHER' ? (
                  <Stack.Screen name="TeacherHome" component={TeacherHome} />
              ) : (
                  <Stack.Screen name="StudentHome" component={StudentHome} />
              )}
              
              {/* Features */}
              <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
              <Stack.Screen name="LectureContent" component={LectureContentScreen} />
              <Stack.Screen name="MyGradesScreen" component={MyGradesScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="ModulesScreen" component={ModulesScreen} />
              
              {/* Simulations */}
              <Stack.Screen name="SetsSimulation" component={SetsSimulation} />
              <Stack.Screen name="TruthTableSimulation" component={TruthTableSimulation} />
              <Stack.Screen name="BitwiseSimulation" component={BitwiseSimulation} />
              <Stack.Screen name="LogicCircuitSimulation" component={LogicCircuitSimulation} />
              <Stack.Screen name="PermutationSimulation" component={PermutationSimulation} />
              <Stack.Screen name="ProbabilitySimulation" component={ProbabilitySimulation} />
              <Stack.Screen name="FrequencyDistributionTable" component={FrequencyDistributionTable} />
              <Stack.Screen name="ZTableSimulation" component={ZTableSimulation} />
              <Stack.Screen name="DijkstraSimulation" component={DijkstraSimulation} />
              <Stack.Screen name="RelationsLab" component={RelationsLab} />
              <Stack.Screen name="EuclideanLab" component={EuclideanLab} />
              <Stack.Screen name="TreeTraversalLab" component={TreeTraversalLab} />
              <Stack.Screen name="RSACryptographyLab" component={RSACryptographyLab} />
              <Stack.Screen name="PrimeFactorization" component={PrimeFactorization} />
              <Stack.Screen name="FibonacciCalculator" component={FibonacciCalculator} />
              <Stack.Screen name="ModuloCalculator" component={ModuloCalculator} />
              <Stack.Screen name="PigeonholeCalculator" component={PigeonholeCalculator} />
              <Stack.Screen name="LinearDiophantineLab" component={LinearDiophantineLab} />
              <Stack.Screen name="ChineseRemainderLab" component={ChineseRemainderLab} />
              <Stack.Screen name="InclusionExclusionLab" component={InclusionExclusionLab} />
              <Stack.Screen name="BinomialTheoremLab" component={BinomialTheoremLab} />
              <Stack.Screen name="EulerPlanarGraphLab" component={EulerPlanarGraphLab} />
              <Stack.Screen name="ScientificCalculator" component={ScientificCalculator} />
              <Stack.Screen name="RecurrenceRelationLab" component={RecurrenceRelationLab} />
              <Stack.Screen name="ComplexityLab" component={ComplexityLab} />
              <Stack.Screen name="BayesianProbabilityLab" component={BayesianProbabilityLab} />
              <Stack.Screen name="MatrixRelationsLab" component={MatrixRelationsLab} />
              <Stack.Screen name="PathFinderLab" component={PathFinderLab} />
              <Stack.Screen name="ModularArithmeticLab" component={ModularArithmeticLab} />
              <Stack.Screen name="CaesarCipherLab" component={CaesarCipherLab} />
              <Stack.Screen name="AtbashCipherLab" component={AtbashCipherLab} />
              <Stack.Screen name="VigenereCipherLab" component={VigenereCipherLab} />
              <Stack.Screen name="RailfenceCipherLab" component={RailFenceCipherLab} />
              <Stack.Screen name="ColumnarCipherLab" component={ColumnarCipherLab} />
              
              {/* Quizzes */}
              <Stack.Screen name="QuizListScreen" component={QuizListScreen} />
              <Stack.Screen name="QuizScreen" component={QuizScreen} />

              {/* Lectures */}
              <Stack.Screen name="IntroDiscreteMath_1_1" component={IntroDiscreteMath_1_1} />
              <Stack.Screen name="MathStatements_1_2" component={MathStatements_1_2} />
              <Stack.Screen name="AtomicMolecular_1_3" component={AtomicMolecular_1_3} />
              <Stack.Screen name="Implications_1_4" component={Implications_1_4}/>
              <Stack.Screen name="PredicatesQuantifiers_1_5" component={PredicatesQuantifiers_1_5}/>
              <Stack.Screen name="SetsDefinition_1_6" component={SetsDefinition_1_6}/>
              <Stack.Screen name="SetsNotations_1_7" component={SetsNotations_1_7}/>
              <Stack.Screen name="Relations_1_8" component={Relations_1_8}/>
              <Stack.Screen name="SetOperations_1_9" component={SetOperations_1_9}/>
              <Stack.Screen name="VennDiagrams_1_10" component={VennDiagrams_1_10}/>
              <Stack.Screen name="Functions_1_11" component={Functions_1_11}/>
              <Stack.Screen name="FunctionsProperties_1_12" component={FunctionProperties_1_12}/>
              <Stack.Screen name="ImageInverse_1_13" component={ImageInverse_1_13}/>

              <Stack.Screen name="PropositionalLogic_2_1" component={PropositionalLogic_2_1}/>
              <Stack.Screen name="LogicalEquivalence_2_2" component={LogicalEquivalence_2_2}/>
              <Stack.Screen name="Deductions_2_3" component={Deductions_2_3}/>
              <Stack.Screen name="PredicateLogic_2_4" component={PredicateLogic_2_4}/>
              <Stack.Screen name="Contrapositive_2_5" component={Contrapositive_2_5}/>
              <Stack.Screen name="Contradiction_2_6" component={Contradiction_2_6}/>
              <Stack.Screen name="ProofByCases_2_7" component={ProofByCases_2_7}/>
              <Stack.Screen name="InferenceRules_2_8" component={InferenceRules_2_8}/>

              <Stack.Screen name="GroupTheory_3_1" component={GroupTheory_3_1}/>
              <Stack.Screen name="AlgebraicStructures_3_2" component={AlgebraicStructures_3_2}/>
              <Stack.Screen name="Groups_3_3" component={Groups_3_3}/>
              <Stack.Screen name="AbelianGroup_3_4" component={AbelianGroup_3_4}/>
              <Stack.Screen name="Semigroup_3_5" component={Semigroup_3_5}/>
              <Stack.Screen name="Monoid_3_6" component={Monoid_3_6}/>
              <Stack.Screen name="RingsSubrings_3_7" component={RingsSubrings_3_7}/>
              <Stack.Screen name="RingProperties_3_8" component={RingProperties_3_8}/>
              <Stack.Screen name="IntegralDomain_3_9" component={IntegralDomain_3_9}/>
              <Stack.Screen name="Fields_3_10" component={Fields_3_10}/>

              <Stack.Screen name="CountingTheory_4_1" component={CountingTheory_4_1}/>
              <Stack.Screen name="Combinatorics_4_2" component={Combinatorics_4_2}/>
              <Stack.Screen name="Principles_4_3" component={Principles_4_3}/>
              <Stack.Screen name="CountingSets_4_4" component={CountingSets_4_4}/>
              <Stack.Screen name="PIE_4_5" component={PIE_4_5}/>
              <Stack.Screen name="BitStrings_4_6" component={BitStrings_4_6}/>
              <Stack.Screen name="LatticePaths_4_7" component={LatticePaths_4_7}/>
              <Stack.Screen name="BinomialCoefficients" component={BinomialCoefficients_4_8}/>
              <Stack.Screen name="PascalsTriangle_4_9" component={PascalsTriangle_4_9}/>
              <Stack.Screen name="PermutationsCombinations_4_10" component={PermutationsCombinations_4_10}/>
              <Stack.Screen name="PigeonholePrinciple_4_11" component={PigeonholePrinciple_4_11}/>

              <Stack.Screen name="Probability_5_1" component={Probability_5_1}/>
              <Stack.Screen name="SampleSpace_5_2" component={SampleSpace_5_2}/>
              <Stack.Screen name="ConditionalProb_5_3" component={ConditionalProb_5_3}/>
              <Stack.Screen name="RandomVariables_5_4" component={RandomVariables_5_4}/>
              <Stack.Screen name="DistributionFunctions_5_5" component={DistributionFunctions_5_5}/>
              <Stack.Screen name="VarianceSD_5_6" component={VarianceSD_5_6}/>

              <Stack.Screen name="Sequences_6_1" component={Sequences_6_1}/>
              <Stack.Screen name="ArithmeticGeometric_6_2" component={ArithmeticGeometric_6_2}/>
              <Stack.Screen name="PolynomialFitting_6_3" component={PolynomialFitting_6_3}/>

              <Stack.Screen name="MathematicalInduction_7_1" component={MathematicalInduction_7_1}/>
              <Stack.Screen name="FormalInduction_7_2" component={FormalInduction_7_2}/>
              <Stack.Screen name="InductionTypes_7_3" component={InductionTypes_7_3}/>
              <Stack.Screen name="RecurrenceRelations_7_4" component={RecurrenceRelations_7_4}/>
              <Stack.Screen name="LinearRecurrence_7_5" component={LinearRecurrence_7_5}/>
              <Stack.Screen name="NonHomogeneous_7_6" component={NonHomogeneous_7_6}/>
              <Stack.Screen name="SolvingRecurrence_7_7" component={SolvingRecurrence_7_7}/>
              <Stack.Screen name="MastersTheorem_7_8" component={MastersTheorem_7_8}/>
              <Stack.Screen name="GeneratingFunctions_7_9" component={GeneratingFunctions_7_9}/>

              <Stack.Screen name="GraphModels_8_1" component={GraphModels_8_1}/>
              <Stack.Screen name="MoreOnGraphs_8_2" component={MoreOnGraphs_8_2}/>
              <Stack.Screen name="PlanarGraphs_8_3" component={PlanarGraphs_8_3}/>
              <Stack.Screen name="NonPlanarGraph_8_4" component={NonPlanarGraphs_8_4}/>
              <Stack.Screen name="Polyhedra" component={Polyhedra_8_5}/>
              <Stack.Screen name="IntroTrees_8_6" component={IntroductionToTrees_8_6}/>
              <Stack.Screen name="TreeProperties_8_7" component={TreeProperties_8_7}/>
              <Stack.Screen name="RootedUnrooted_8_8" component={RootedUnrootedTrees_8_8}/>
              <Stack.Screen name="SpanningTrees_8_9" component={SpanningTrees_8_9}/>
              <Stack.Screen name="GraphColoring_8_10" component={GraphColoring_8_10}/>
              <Stack.Screen name="ColoringTheory_8_11" component={ColoringTheory_8_11}/>
              <Stack.Screen name="ColoringEdges_8_12" component={ColoringEdges_8_12}/>
              <Stack.Screen name="EulerPathCircuit_8_13" component={EulerPaths_8_13}/>
              <Stack.Screen name="HamiltonianPath_8_14" component={HamiltonianPaths_8_14}/>

              <Stack.Screen name="BooleanExpressions_9_1" component={BooleanLogic_9_1}/>
              <Stack.Screen name="SimplificationBoolean_9_2" component={BooleanSimplification_9_2}/>

              <Stack.Screen name="NumberTheory_10_1" component={NumberTheory_10_1}/>
              <Stack.Screen name="Divisibility_10_2" component={Divisibility_10_2}/>
              <Stack.Screen name="RemainderClasses_10_3" component={RemainderClasses_10_3}/>
              <Stack.Screen name="CongruenceProperties_10_4" component={CongruenceProperties_10_4}/>
              <Stack.Screen name="LinearDiophantine_10_5" component={LinearDiophantine_10_5}/>
            </>
          ) : (
            // --- LOGGED OUT SCREENS ---
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </CopilotProvider>
  );
};

// --- Main App Component ---
// Wraps the navigator in the AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}