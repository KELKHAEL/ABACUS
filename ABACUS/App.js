import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; 

// Import Screens
import LoginScreen from './screens/LoginScreen';
import StudentHome from './screens/StudentHome';
import TeacherHome from './screens/TeacherHome';
import ModuleDetailScreen from './screens/ModuleDetailScreen';
import MyGradesScreen from './screens/MyGradesScreen';

// Simulations
import SetsSimulation from './screens/simulations/SetsSimulation';
import TruthTableSimulation from './screens/simulations/TruthTableSimulation';
import BitwiseSimulation from './screens/simulations/BitwiseSimulation';
import LogicCircuitSimulation from './screens/simulations/LogicCircuitSimulation';
import PermutationSimulation from './screens/simulations/PermutationSimulation';
import ProbabilitySimulation from './screens/simulations/ProbabilitySimulation';
import FrequencyDistributionTable from './screens/simulations/FrequencyDistributionTable';

// Quizzes
import QuizListScreen from './screens/QuizListScreen'; 
import QuizScreen from './screens/QuizScreen';         

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#104a28" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {user ? (
          <>
            <Stack.Screen name="StudentHome" component={StudentHome} />
            <Stack.Screen name="TeacherHome" component={TeacherHome} />
            
            {/* Features */}
            <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
            
            {/* Simulations */}
            <Stack.Screen name="SetsSimulation" component={SetsSimulation} />
            <Stack.Screen name="TruthTableSimulation" component={TruthTableSimulation} />
            <Stack.Screen name="BitwiseSimulation" component={BitwiseSimulation} />
            <Stack.Screen name="LogicCircuitSimulation" component={LogicCircuitSimulation} />
            <Stack.Screen name="PermutationSimulation" component={PermutationSimulation} />
            <Stack.Screen name="ProbabilitySimulation" component={ProbabilitySimulation} />
            <Stack.Screen name="FrequencyDistributionTable" component={FrequencyDistributionTable} />
            
            <Stack.Screen name="QuizListScreen" component={QuizListScreen} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
            <Stack.Screen name="MyGradesScreen" component={MyGradesScreen} />
          </>
        ):(
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}