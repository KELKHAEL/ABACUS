import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, 
  Alert, RefreshControl, ActivityIndicator, Platform, Modal, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ModuleCard = ({ title, category, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { borderLeftWidth: 5, borderLeftColor: color }]} onPress={onPress}>
    <View style={{ flex: 1, marginRight: 10 }}> 
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardCategory}>{category}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);

const SimulationCard = ({ title, desc, color, onPress }) => (
  <TouchableOpacity style={[styles.simCard, { borderLeftWidth: 5, borderLeftColor: color }]} onPress={onPress}>
    <View style={{ flex: 1, marginRight: 10 }}>
      <Text style={styles.simTitle}>{title}</Text>
      <Text style={styles.simDesc}>{desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);

const AnnouncementCard = ({ item }) => {
  const isRegistrar = item.author_role === 'ADMIN';
  return (
    <View style={[styles.announceCard, isRegistrar ? styles.adminBorder : styles.instructorBorder]}>
      <View style={styles.announceHeader}>
        <View style={styles.authorRow}>
          <Ionicons name={isRegistrar ? "megaphone" : "school"} size={18} color={isRegistrar ? "#d32f2f" : "#104a28"} style={{marginTop: 2}} />
          <Text style={[styles.authorText, isRegistrar ? {color: '#d32f2f'} : {color: '#104a28'}]}>
            {isRegistrar ? "Announcement from the Registrar" : item.author_name}
          </Text>
        </View>
        <Text style={styles.dateText}>{new Date(item.created_at).toLocaleDateString()}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.announceTitle}>{item.title}</Text>
      <Text style={styles.announceContent}>{item.content}</Text>
    </View>
  );
};

// --- MAIN COMPONENT ---
export default function StudentHome({ navigation }) {
  const { user } = useContext(AuthContext); 
  const [activeTab, setActiveTab] = useState('Home'); 
  
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnounce, setLoadingAnnounce] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterSender, setFilterSender] = useState('ALL'); 
  const [filterYear, setFilterYear] = useState('ALL');
  const [filterMonth, setFilterMonth] = useState('ALL');
  const [filterDay, setFilterDay] = useState('ALL');

  // --- EXACT PIXEL MEASUREMENT REFS ---
  const profileRef = useRef(null);
  const quizzesRef = useRef(null);
  const gradesRef = useRef(null);
  const modulesRef = useRef(null);
  const labsRef = useRef(null);
  const newsRef = useRef(null);

  const [tourStep, setTourStep] = useState(0);
  const [measurements, setMeasurements] = useState({});

  const getGreetingName = (fullName) => {
    if (!fullName) return "STUDENT";
    let formattedName = fullName;
    if (fullName.includes(',')) {
      const parts = fullName.split(',');
      const lastName = parts[0].trim().split(' ')[0]; 
      let words = parts[1].trim().split(' ').filter(w => w.length > 0);
      if (words.length >= 3) words.pop(); 
      if (words.length > 1 && (words[words.length - 1].endsWith('.') || words[words.length - 1].length === 1)) words.pop(); 
      if (words.length >= 2) formattedName = `${words[0]} ${words[1]}`; 
      else if (words.length === 1) formattedName = `${words[0]} ${lastName}`; 
    } else {
      const words = fullName.split(' ').filter(w => w.length > 0);
      if (words.length >= 3) formattedName = `${words[0]} ${words[1]}`; 
      else if (words.length === 2) formattedName = `${words[0]} ${words[1]}`; 
    }
    return formattedName.toUpperCase(); 
  };

  const studentName = getGreetingName(user?.fullName);

  const fetchAnnouncements = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/announcements/student/${user.id}`);
      const text = await response.text(); 
      try {
        const data = JSON.parse(text);
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (e) {}
    } catch (error) {}
  };

  useEffect(() => {
    if (activeTab === 'Announcements') {
      setLoadingAnnounce(true);
      fetchAnnouncements().finally(() => setLoadingAnnounce(false));
    }
  }, [activeTab]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAnnouncements().finally(() => setRefreshing(false));
  }, []);

  const handleProfileClick = () => { navigation.navigate('ProfileScreen'); };

  // --- DYNAMIC TOUR MEASUREMENT ENGINE ---
  const measureElement = (ref) => {
    return new Promise(resolve => {
      if (ref && ref.current) {
        ref.current.measureInWindow((x, y, width, height) => {
          resolve({ x, y, width, height });
        });
      } else {
        resolve(null);
      }
    });
  };

  const startDynamicTour = async () => {
    setActiveTab('Home');
    
    // Wait for the tab to fully render
    setTimeout(async () => {
      const m1 = await measureElement(profileRef);
      const m2 = await measureElement(quizzesRef);
      const m3 = await measureElement(gradesRef);
      const m4 = await measureElement(modulesRef);
      const m5 = await measureElement(labsRef);
      const m6 = await measureElement(newsRef);
      
      setMeasurements({ 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6 });
      setTourStep(1);
    }, 300);
  };

  useEffect(() => {
    const checkTutorial = async () => {
      try {
        const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTour_Final');
        if (hasSeenTutorial !== 'true') {
          startDynamicTour();
          await AsyncStorage.setItem('hasSeenTour_Final', 'true');
        }
      } catch (error) {}
    };
    setTimeout(() => { checkTutorial(); }, 1500);
  }, []);

  // --- FILTER LOGIC ---
  const filteredAnnouncements = announcements.filter(item => {
    const d = new Date(item.created_at);
    if (filterYear !== 'ALL' && d.getFullYear().toString() !== filterYear) return false;
    if (filterMonth !== 'ALL' && (d.getMonth() + 1).toString() !== filterMonth) return false;
    if (filterDay !== 'ALL' && d.getDate().toString() !== filterDay) return false;
    if (filterSender !== 'ALL' && item.author_role !== filterSender) return false;
    return true;
  });

  const clearFilters = () => {
      setFilterSender('ALL'); setFilterYear('ALL'); setFilterMonth('ALL'); setFilterDay('ALL');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => (currentYear - i).toString());
  const months = Array.from({length: 12}, (_, i) => (i + 1).toString());
  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());

  // --- MODULES DATA ---
  const allModules = [
    { 
      id: 1, title: "Discrete Mathematics - Introduction", category: "Introduction for Discrete Mathematics", color: "#16941c",
      topics: [
        { id: "1.1", title: "Introduction to Discrete Mathematics", content: "Discrete mathematics is a branch of mathematics that deals with objects that can assume only distinct values." },
        { id: "1.2", title: "Mathematical Statements and Operations", content: "In this chapter, we will explain the various types of mathematical statements, logical operations, and their applications." },
        { id: "1.3", title: "Atomic and Molecular Statements", content: "Mathematical statements come in two forms: atomic and molecular." },
        { id: "1.4", title: "Implications", content: "In this chapter, we will see what implications are, how they function, and provide examples." },
        { id: "1.5", title: "Predicates and Quantifiers", content: "In this chapter, we will touch upon the basics of predicates and quantifiers." },
        { id: "1.6", title: "Sets", content: "Set theory forms the basis of several other fields of study." },
        { id: "1.7", title: "Sets and Notations", content: "In this chapter, we will have a detailed look at the concept of sets." },
        { id: "1.8", title: "Relations", content: "Relations may exist between objects of the same set or between objects of two or more sets." },
        { id: "1.9", title: "Operations on Sets", content: "In this chapter, we will have a look at some of the main set operations." },
        { id: "1.10", title: "Venn Diagram on Sets", content: "In this chapter, we will see the use of Venn diagrams in set operations." },
        { id: "1.11", title: "Functions", content: "Functions find their application in various fields like representation of the computational complexity." },
        { id: "1.12", title: "Surjetion and Bijection Functions", content: "Functions are nothing but mapping relationships between different sets." },
        { id: "1.13", title: "Image and Inverse-Image", content: "In this chapter, we will elaborate the concept of image and inverse-image." }
      ]
    },
    { 
      id: 2, title: "Mathematical Logic", category: "All about Logics", color: "#16941c",
      topics: [
        { id: "2.1", title: "Propositional Logic", content: "Propositional Logic is concerned with statements to which the truth values, true and false, can be assigned." },
        { id: "2.2", title: "Logical Equivalence", content: "Logical equivalence is a fundamental concept in propositional logic." },
        { id: "2.3", title: "Deductions", content: "In propositional logics, sometimes we deduct one logical expression from another." },
        { id: "2.4", title: "Predicate Logic", content: "Predicate Logic deals with predicates, which are propositions containing variables." },
        { id: "2.5", title: "Proof by Contrapositive", content: "Another way of proving logics is using the techniques with the proof by contrapositive." },
        { id: "2.6", title: "Proof by Contradiction", content: "Contradiction means negating a statement or when something false we care about." },
        { id: "2.7", title: "Proof by Cases", content: "Proof by Cases is a common technique used in Discrete Mathematics." },
        { id: "2.8", title: "Rules of Inference", content: "To deduce new statements from the statements whose truth that we already know, Rules of Inference are used." }
      ]
    },
    { 
      id: 3, title: "Group Theory", category: "All about Groups", color: "#16941c",
      topics: [
        { id: "3.1", title: "Operators & Postulates", content: "Group Theory is a branch of mathematics and abstract algebra." },
        { id: "3.2", title: "Group Theory", content: "Generally, a group comprises of a set of elements and an operation." },
        { id: "3.3", title: "Algebric Structure for Groups", content: "Algebraic structures are one of the fundamental concepts in abstract algebra." },
        { id: "3.4", title: "Abelian Group", content: "Among these, the Abelian group, also known as commutative group, are special." },
        { id: "3.5", title: "Semi Group", content: "A semigroup is a set paired with an operation that satisfies a specific property." },
        { id: "3.6", title: "Monoid", content: "In this context is the monoid that builds upon the ideas of both algebraic structures." },
        { id: "3.7", title: "Rings and Subring", content: "In Discrete Mathematics, groups, rings and fields are important concepts." },
        { id: "3.8", title: "Properties of Rings", content: "A ring is an algebraic structure that defines operations within a set." },
        { id: "3.9", title: "Integral Domain", content: "We know that rings and groups are fundamental algebraic structures." },
        { id: "3.10", title: "Fields", content: "Fields are often discussed in Ring Theory." }
      ]
    },
    { 
      id: 4, title: "Counting and Probability", category: "All about the possibilities in Counting and Probability", color: "#16941c",
      topics: [
        { id: "4.1", title: "Counting Theory", content: "In this topic solving mathematical theory of counting are used." },
        { id: "4.2", title: "Combinatorics", content: "Combinatorics is all about figuring out different ways to counting and arranging." },
        { id: "4.3", title: "Additive and Multiplicative Principles", content: "In discrete mathematics and combinatorics, we work with counting problems a lot." },
        { id: "4.4", title: "Counting with Sets", content: "In this chapter, we will explain how counting works with sets." },
        { id: "4.5", title: "Inclusion and Exclusion", content: "The Principle of Inclusion and Exclusion (PIE) is an important concept in Set Theory." },
        { id: "4.6", title: "Bit Strings", content: "A bit string is a sequence made up of binary digits." },
        { id: "4.7", title: "Lattice Path", content: "In discrete mathematics, lattice paths are used to solve problems." },
        { id: "4.8", title: "Binomial Coefficients", content: "Binomial coefficients are used not only in combinatorics, but also in probability and algebra." },
        { id: "4.9", title: "Pascal's Triangle", content: "The Pascals Triangle looks very simple at first glance but it has many layers to it." },
        { id: "4.10", title: "Permutation and Combinations", content: "In this chapter, we will understand with examples the basics of permutations and combinations." },
        { id: "4.11", title: "Pigeonhole Principle", content: "The Pigeonhole Principle is an interesting and important concept in Combinatorics." }
      ]
    },
    { 
      id: 5, title: "Probability Theory", category: "All about Probabilities", color: "#16941c",
      topics: [
        { id: "5.1", title: "Probability", content: "Probability can be conceptualized as finding the chance of occurrence of an event." },
        { id: "5.2", title: "Sample, Space, Outcomes and Events", content: "In Probability Theory, we work on measuring how likely something is to happen." },
        { id: "5.3", title: "Conditional Probability and Independence", content: "Conditional Probability and Independence help us to find out the likelihood of an event occurring." },
        { id: "5.4", title: "Random Variables in Probability Theory", content: "We use Random Variables to simplify the process of working with outcomes." },
        { id: "5.5", title: "Distribution Functions in Probability Theory", content: "Distribution functions help us understand and predict the likelihood of different outcomes." },
        { id: "5.6", title: "Variance and Standard Deviation", content: "In Probability Theory, we use the mean and average to find the center of data." }
      ]
    },
    { 
      id: 6, title: "Sequences", category: "All about Sequences", color: "#16941c",
      topics: [
        { id: "6.1", title: "Sequences", content: "Sequences are building blocks for patterns and series." },
        { id: "6.2", title: "Arithmetic and Geometric Sequences", content: "In Discrete Mathematics, we use the concept of sequences to understand patterns." },
        { id: "6.3", title: "Polynomial Fitting", content: "Polynomial Fitting is a powerful technique that helps us understand and predict complex patterns." }
      ]
    },
    { 
      id: 7, title: "Mathematical & Recurrence", category: "All about the Recurrences", color: "#16941c",
      topics: [
        { id: "7.1", title: "Mathematical Induction", content: "Mathematical induction, is a technique for proving results or establishing statements for natural numbers." },
        { id: "7.2", title: "Formalizing Proofs for Mathematical Induction", content: "Mathematical Inductions are one of the fundamental methods for proving statements." },
        { id: "7.3", title: "Strong and Weak Induction", content: "We use the induction theory in discrete mathematics to prove statements." },
        { id: "7.4", title: "Recurrence Relation", content: "In this chapter, we will discuss how recursive techniques can derive sequences." },
        { id: "7.5", title: "Linear Recurrence Relations", content: "Linear recurrence relations are major concept in discrete mathematics." },
        { id: "7.6", title: "Non-Homogenous Recurrence Relations", content: "Recurrence relations in discrete mathematics are quite useful in defining sequences." },
        { id: "7.7", title: "Solving Recurrence Relations", content: "From algorithm analysis to sequence problems, recurrence relations are quite useful." },
        { id: "7.8", title: "Master's Theorem", content: "Master's Theorem works on specific types of recurrence relations." },
        { id: "7.9", title: "Generating Functions", content: "In this chapter, we will see the basics of generating functions and understand how these functions work." }
      ]
    },
    { 
      id: 8, title: "Graph Theory", category: "All about Graphs", color: "#16941c",
      topics: [
        { id: "8.1", title: "Graph & Graph Models", content: "The study of graphs, or graph theory is an important part of a number of disciplines." },
        { id: "8.2", title: "More on Graphs", content: "The study of graphs, or graph theory is an important part of a number of disciplines." },
        { id: "8.3", title: "Planar Graphs", content: "In this chapter, we will see the basics of planar graphs with easy-to-understand examples." },
        { id: "8.4", title: "Non-Planar Graphs", content: "In this chapter, we will cover the basics of non-planar graphs." },
        { id: "8.5", title: "Polyhedra", content: "In this chapter, we will see the basics of polyhedra and understand some of its most well-known types." },
        { id: "8.6", title: "Introduction to Trees", content: "Tree is a discrete structure that represents hierarchical relationships between individual elements." },
        { id: "8.7", title: "Properties of Trees", content: "Trees are special types of graphs. Unlike other types of graphs, trees have some unique properties." },
        { id: "8.8", title: "Rooted and Unrooted Trees", content: "Trees are special structures in graph theory and discrete mathematics." },
        { id: "8.9", title: "Spanning Trees", content: "A spanning tree of a connected undirected graph G is a tree that minimally includes all of the vertices of G." },
        { id: "8.10", title: "Graph Coloring", content: "In simple terms, graph coloring is a problem where we assign colors to elements of a graph." },
        { id: "8.11", title: "Coloring Theory in General", content: "The graph coloring problem is useful in graph theory and discrete mathematics." },
        { id: "8.12", title: "Coloring Edges", content: "When we talk about graph coloring, generally we focus on vertex coloring." },
        { id: "8.13", title: "Euler Paths and Circuits", content: "Euler paths and circuits are the most fundamental concepts in Graph Theory." },
        { id: "8.14", title: "Hamiltonion Path", content: "The Hamiltonian path is a path that visits every vertex in a graph exactly once." }
      ]
    },
    { 
      id: 9, title: "Boolean Algebra", category: "All about Boolean Algebra", color: "#16941c",
      topics: [
        { id: "9.1", title: "Boolean Expressions & Functions", content: "Boolean algebra is algebra of logic. It deals with variables that can have two discrete values, 0 and 1." },
        { id: "9.2", title: "Simplification of Boolean Functions", content: "In this approach, one Boolean expression is minimized into an equivalent expression." }
      ]
    },
    { 
      id: 10, title: "Advanced Topics", category: "List of Advanced Topics.", color: "#16941c",
      topics: [
        { id: "10.1", title: "Number Theory", content: "Number Theory deals with the properties and relationships of numbers, particularly integers." },
        { id: "10.2", title: "Divisibility", content: "Divisibility is one of the most basic concepts in mathematics." },
        { id: "10.3", title: "Remainder Classes", content: "Remainder classes are ways of grouping numbers based on their remainders." },
        { id: "10.4", title: "Properties of Congruence", content: "The congruence logic is a way to express that two numbers are basically the same in the context of a given modulus." },
        { id: "10.5", title: "Solving Linear Diophantine Equation", content: "Diophantine equations have applications in various fields, including number theory and cryptography." }
      ]
    }
  ];

  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.innerLayout}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText} numberOfLines={1} adjustsFontSizeToFit>Hello, {studentName}</Text>
            <Text style={styles.subText}>Ready to learn Discrete Math?</Text>
          </View>

          <TouchableOpacity style={styles.tourBtn} onPress={startDynamicTour}>
             <Ionicons name="help-circle-outline" size={30} color="#104a28" />
          </TouchableOpacity>

          <TouchableOpacity ref={profileRef} style={styles.profileBtn} onPress={handleProfileClick}>
            <Ionicons name="person-circle-outline" size={36} color="#104a28" />
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity ref={quizzesRef} style={styles.actionButton} onPress={() => navigation.navigate('QuizListScreen')}>
            <Ionicons name="clipboard-outline" size={20} color="#333" />
            <Text style={styles.actionButtonText}>View Quizzes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity ref={gradesRef} style={styles.actionButton} onPress={() => navigation.navigate('MyGradesScreen')}>
            <Ionicons name="stats-chart-outline" size={20} color="#333" />
            <Text style={styles.actionButtonText}>My Grades</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Learning Modules</Text>

        <View style={styles.listContainer}>
          {allModules.map((item) => (
            <ModuleCard 
              key={item.id} title={item.title} category={item.category} color={item.color} 
              onPress={() => navigation.navigate('ModuleDetail', { moduleTitle: item.title, moduleColor: item.color, topics: item.topics || [] })} 
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderSimulations = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.innerLayout}>
        <Text style={styles.headerTitle}>Computational Simulations</Text>
        <Text style={styles.subText}>Interactive logic tools!</Text>
        <View style={{marginTop: 20, gap: 15}}>
          <SimulationCard title="Scientific Calculator" desc="A built on scientific calculator on the app!" color="#104a28" onPress={() => navigation.navigate("ScientificCalculator")} />
          <SimulationCard title="Sets Builder" desc="Venn Diagrams & Operations" color="#2D7FF9" onPress={() => navigation.navigate('SetsSimulation')} />
          <SimulationCard title="Truth Tables" desc="Logic Generator" color="#7B61FF" onPress={() => navigation.navigate('TruthTableSimulation')} />
          <SimulationCard title="Bitwise Calculator" desc="AND, OR, XOR operations." color="#824055" onPress={() => navigation.navigate("BitwiseSimulation")} />
          <SimulationCard title="Logic Circuits" desc="Visualize gates (AND, OR, NOT)." color="#71328e" onPress={() => navigation.navigate("LogicCircuitSimulation")} />
          <SimulationCard title="Permutations" desc="Calculate nPr and nCr." color="#F25487" onPress={() => navigation.navigate("PermutationSimulation")} />
          <SimulationCard title="Probability Simulation" desc="Single, Double, and Series event odds." color="#00C853" onPress={() => navigation.navigate("ProbabilitySimulation")} />
          <SimulationCard title="Bayesian Probability Lab" desc="Calculate Regions (Faces)." color="#69f575" onPress={() => navigation.navigate("BayesianProbabilityLab")} />
          <SimulationCard title="Frequency Distribution Table" desc="Convert raw data into a statistical table." color="#9C27B0" onPress={() => navigation.navigate("FrequencyDistributionTable")} />
          <SimulationCard title="Z-Table Simulation" desc="Find area under the normal curve (Left, Right, Between)." color="#E91E63" onPress={() => navigation.navigate("ZTableSimulation")} />
          <SimulationCard title="Prime Factorization" desc="Break down any integer into product of its prime building blocks." color="#38c974" onPress={() => navigation.navigate("PrimeFactorization")} />
          <SimulationCard title="Fibonacci Calculator" desc="Construct and experiment on fibonacci sequence." color="#1643d8" onPress={() => navigation.navigate("FibonacciCalculator")} />
          <SimulationCard title="Pigeonhole Calculator" desc="What is the guaranteed minimum number of items inside?" color="#4c7d96" onPress={() => navigation.navigate("PigeonholeCalculator")} />
          <SimulationCard title="Modulo Calculator" desc="Find the remainder when divided." color="#c1c426" onPress={() => navigation.navigate("ModuloCalculator")} />
          <SimulationCard title="Modular Arithmetic Lab" desc="Find the remainder when divided." color="#c1c426" onPress={() => navigation.navigate("ModularArithmeticLab")} />
          <SimulationCard title="Euclidean Lab" desc="Compute Greatest Common Divisor." color="#2700d5" onPress={() => navigation.navigate("EuclideanLab")} />
          <SimulationCard title="Linear Diophantine Lab" desc="Find the integer solutions using the Extended Euclidean Algrorithm." color="#a31d86" onPress={() => navigation.navigate("LinearDiophantineLab")} />
          <SimulationCard title="Chinese Remainder Lab" desc="Solve for 'x' in a system of two congruences." color="#ff00d4" onPress={() => navigation.navigate("ChineseRemainderLab")} />
          <SimulationCard title="Inclusion-Exclusion Lab" desc="This tool takes the cardinality (size) of individual sets and their intersections, and computes the total Union size." color="#a6202e" onPress={() => navigation.navigate("InclusionExclusionLab")} />
          <SimulationCard title="Euler Planar Graph Lab" desc="Calculate Regions (Faces)." color="#ffebab" onPress={() => navigation.navigate("EulerPlanarGraphLab")} />
          <SimulationCard title="Path Finder Lab" desc="This laboratory challenges the eulerian path and hamiltonian path that visualizes the nodes on the edges and vertices." color="#104a28" onPress={() => navigation.navigate("PathFinderLab")} />
          <SimulationCard title="Recurrence Relation Lab" desc="Calculate and define a sequence using the recurrence relation." color="#5c4b12" onPress={() => navigation.navigate("RecurrenceRelationLab")} />
          <SimulationCard title="Binomial Theorem Lab" desc="Use combinatorics to expand binomial expressions." color="#800000" onPress={() => navigation.navigate("BinomialTheoremLab")} />
          <SimulationCard title="Complexity Lab" desc="Big-O notation tells us how the work of an algorithm grows as we add more data." color="#d7a70b" onPress={() => navigation.navigate("ComplexityLab")} />
          <SimulationCard title="Dijkstra's Path Lab" desc="Compute shortest paths in a weighted graph." color="#104a28" onPress={() => navigation.navigate("DijkstraSimulation")} />
          <SimulationCard title="Matrix Relations Lab" desc="This laboratory computes every indirect path in your matrix." color="#104a28" onPress={() => navigation.navigate("MatrixRelationsLab")} />
          <SimulationCard title="Relations Lab" desc="Analyze properties (Reflexive, Symmetric, Transitive) with Boolean Matrices." color="#104a28" onPress={() => navigation.navigate("RelationsLab")} />
          <SimulationCard title="Tree Traversal Lab" desc="Build a traversal sequence binary tree." color="#104a28" onPress={() => navigation.navigate("TreeTraversalLab")} />
          <SimulationCard title="RSA Cryptography Lab" desc="A RSA cryptography technique that encrypts integer message." color="#104a28" onPress={() => navigation.navigate("RSACryptographyLab")} />
          <SimulationCard title="Caesar Cipher Lab" desc="A cryptography simulation technique that uses a shifting value that encrypts and decrypts secret message." color="#104a28" onPress={() => navigation.navigate("CaesarCipherLab")} />
          <SimulationCard title="Atbash Cipher Lab" desc="A cryptography simulation technique that mirrors to encrypt and decrypt secret message." color="#104a28" onPress={() => navigation.navigate("AtbashCipherLab")} />
          <SimulationCard title="Vigenere Cipher Lab" desc="A cryptography simulation technique that uses a certain key to encrypt and decrypt secret message." color="#104a28" onPress={() => navigation.navigate("VigenereCipherLab")} />
          <SimulationCard title="Rail Fence Cipher Lab" desc="A cryptography simulation technique that uses a rail-like fence to encrypt and decrypt secret message." color="#104a28" onPress={() => navigation.navigate("RailfenceCipherLab")} />
          <SimulationCard title="Columnar Cipher Lab" desc="A cryptography simulation technique that uses a word as a key to encrypt and decrypt secret message." color="#104a28" onPress={() => navigation.navigate("ColumnarCipherLab")} />
        </View>
      </View>
    </ScrollView>
  );

  const renderAnnouncements = () => {
    const isFiltered = filterYear !== 'ALL' || filterMonth !== 'ALL' || filterDay !== 'ALL' || filterSender !== 'ALL';
    
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.innerLayout}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                <Text style={styles.headerTitle}>Announcements</Text>
                <Text style={styles.subText}>Updates from your Instructors</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity onPress={onRefresh} style={styles.filterBtn}>
                    <Ionicons name="refresh" size={20} color="#104a28" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowFilterModal(true)} style={[styles.filterBtn, isFiltered && styles.filterBtnActive]}>
                    <Ionicons name="filter" size={20} color={isFiltered ? "white" : "#104a28"} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 20, gap: 15}}>
              {loadingAnnounce ? (
                  <ActivityIndicator size="large" color="#104a28" style={{marginTop: 20}} />
              ) : filteredAnnouncements.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Ionicons name="notifications-off-outline" size={50} color="#ccc" />
                    <Text style={styles.emptyText}>No announcements found.</Text>
                  </View>
              ) : (
                  filteredAnnouncements.map((item) => (
                    <AnnouncementCard key={item.id} item={item} />
                  ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // --- EXACT PIXEL TOUR RENDERER ---
  const renderCustomTour = () => {
    if (tourStep === 0) return null;
    
    const m = measurements[tourStep];
    // If layout hasn't settled or measurement failed, silently skip to prevent crash
    if (!m) return null; 

    const stepContent = {
      1: { title: "Profile & Logout", text: "Tap here to view your profile details or to log out." },
      2: { title: "Quizzes", text: "Take your assigned quizzes and tests right here." },
      3: { title: "My Grades", text: "Track your academic progress and quiz scores here." },
      4: { title: "Modules", text: "Download and read PDF lecture materials provided by your instructors." },
      5: { title: "Labs & Simulations", text: "Experiment with interactive computational tools and Discrete Math labs!" },
      6: { title: "Announcements", text: "Check here for the latest news and updates from your instructors or the registrar." },
    }[tourStep];

    const isBottomNav = tourStep >= 4;
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    
    // Calculates EXACTLY where to place the tooltip box relative to the button
    const tooltipTop = isBottomNav ? undefined : m.y + m.height + 15;
    const tooltipBottom = isBottomNav ? screenHeight - m.y + 15 : undefined;
    
    // Calculates EXACTLY where the center of the button is on the screen
    const centerX = m.x + (m.width / 2);
    
    // Calculates EXACTLY where to place the arrow inside the 20px-padded Tooltip Container
    let internalArrowLeft = centerX - 20 - 20; 
    
    // Safety boundaries to stop the arrow from floating off the corners of the box
    const tooltipWidth = screenWidth - 40;
    if (internalArrowLeft < 10) internalArrowLeft = 10;
    if (internalArrowLeft > tooltipWidth - 50) internalArrowLeft = tooltipWidth - 50;

    return (
      <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }} activeOpacity={1} onPress={() => {}} />
        
        <View style={{
           position: 'absolute',
           top: tooltipTop,
           bottom: tooltipBottom,
           left: 20,
           right: 20,
           backgroundColor: '#1f2937',
           padding: 20,
           borderRadius: 12,
           elevation: 10,
           shadowColor: '#000', shadowOffset: {width:0, height:4}, shadowOpacity: 0.3, shadowRadius: 5
        }}>
          {/* THE ARROW - Driven by pure coordinate math */}
          <Ionicons 
              name={isBottomNav ? 'caret-down' : 'caret-up'} 
              size={40} 
              color="#1f2937" 
              style={{ 
                  position: 'absolute', 
                  [isBottomNav ? 'bottom' : 'top']: -28, 
                  left: internalArrowLeft 
              }} 
          />
          
          <Text style={{ color: '#10b981', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{stepContent.title}</Text>
          <Text style={{ color: '#f9fafb', fontSize: 14, lineHeight: 20, marginBottom: 20 }}>{stepContent.text}</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setTourStep(0)}>
              <Text style={{ color: '#9ca3af', fontWeight: '600' }}>Skip Tour</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setTourStep(tourStep === 6 ? 0 : tourStep + 1)} 
              style={{ backgroundColor: '#10b981', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{tourStep === 6 ? 'Finish' : 'Next'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {activeTab === 'Home' && renderHome()}
      {activeTab === 'Simulations' && renderSimulations()}
      {activeTab === 'Announcements' && renderAnnouncements()}

      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'Home' && styles.navItemActive]}
            onPress={() => setActiveTab('Home')}
          >
            <Ionicons name={activeTab === 'Home' ? "home" : "home-outline"} size={22} color={activeTab === 'Home' ? "white" : "#666"} />
            {activeTab === 'Home' && <Text style={styles.navTextActive}>Home</Text>}
          </TouchableOpacity>

          <TouchableOpacity ref={modulesRef} style={styles.menuCard} onPress={() => navigation.navigate('ModulesScreen')}>
            <Ionicons name={activeTab === 'ModulesScreen' ? "document-text" : "document-text-outline"} size={22} color={activeTab === 'ModulesScreen' ? "white" : "#666"} />
            {activeTab === 'ModulesScreen' && <Text style={styles.navTextActive}>Modules</Text>}
          </TouchableOpacity>

          <TouchableOpacity ref={labsRef} style={[styles.navItem, activeTab === 'Simulations' && styles.navItemActive]} onPress={() => setActiveTab('Simulations')}>
            <Ionicons name={activeTab === 'Simulations' ? "cube" : "cube-outline"} size={22} color={activeTab === 'Simulations' ? "white" : "#666"} />
            {activeTab === 'Simulations' && <Text style={styles.navTextActive}>Labs</Text>}
          </TouchableOpacity>

          <TouchableOpacity ref={newsRef} style={[styles.navItem, activeTab === 'Announcements' && styles.navItemActive]} onPress={() => setActiveTab('Announcements')}>
            <Ionicons name={activeTab === 'Announcements' ? "notifications" : "notifications-outline"} size={22} color={activeTab === 'Announcements' ? "white" : "#666"} />
            {activeTab === 'Announcements' && <Text style={styles.navTextActive}>News</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ FIX: RE-ADDED THE MISSING FILTER MODAL UI HERE */}
      <Modal visible={showFilterModal} animationType="slide" transparent={true} onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Announcements</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.filterLabel}>From</Text>
              <View style={styles.chipRow}>
                {['ALL', 'ADMIN', 'INSTRUCTOR'].map(sender => (
                  <TouchableOpacity
                    key={sender}
                    style={[styles.chip, filterSender === sender && styles.chipActive]}
                    onPress={() => setFilterSender(sender)}
                  >
                    <Text style={[styles.chipText, filterSender === sender && styles.chipTextActive]}>
                      {sender === 'ALL' ? 'Everyone' : sender === 'ADMIN' ? 'Registrar' : 'Instructors'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterLabel}>Year</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                <TouchableOpacity style={[styles.chip, filterYear === 'ALL' && styles.chipActive]} onPress={() => setFilterYear('ALL')}>
                  <Text style={[styles.chipText, filterYear === 'ALL' && styles.chipTextActive]}>All Years</Text>
                </TouchableOpacity>
                {years.map(y => (
                  <TouchableOpacity key={y} style={[styles.chip, filterYear === y && styles.chipActive]} onPress={() => setFilterYear(y)}>
                    <Text style={[styles.chipText, filterYear === y && styles.chipTextActive]}>{y}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.filterLabel}>Month</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                <TouchableOpacity style={[styles.chip, filterMonth === 'ALL' && styles.chipActive]} onPress={() => setFilterMonth('ALL')}>
                  <Text style={[styles.chipText, filterMonth === 'ALL' && styles.chipTextActive]}>All Months</Text>
                </TouchableOpacity>
                {months.map(m => (
                  <TouchableOpacity key={m} style={[styles.chip, filterMonth === m && styles.chipActive]} onPress={() => setFilterMonth(m)}>
                    <Text style={[styles.chipText, filterMonth === m && styles.chipTextActive]}>{new Date(2000, m - 1).toLocaleString('default', { month: 'short' })}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.filterLabel}>Day</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                <TouchableOpacity style={[styles.chip, filterDay === 'ALL' && styles.chipActive]} onPress={() => setFilterDay('ALL')}>
                  <Text style={[styles.chipText, filterDay === 'ALL' && styles.chipTextActive]}>All Days</Text>
                </TouchableOpacity>
                {days.map(d => (
                  <TouchableOpacity key={d} style={[styles.chip, filterDay === d && styles.chipActive]} onPress={() => setFilterDay(d)}>
                    <Text style={[styles.chipText, filterDay === d && styles.chipTextActive]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearFilters}>
                <Text style={styles.clearBtnText}>Clear Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilterModal(false)}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {renderCustomTour()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  scrollContent: { paddingBottom: 100 },
  innerLayout: { paddingHorizontal: 24, paddingTop: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTextContainer: { flex: 1, paddingRight: 10 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#333' },
  greetingText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 14, color: '#888' },
  profileBtn: { padding: 0 }, 
  tourBtn: { padding: 5, marginRight: 10 }, 
  filterBtn: { backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8 },
  filterBtnActive: { backgroundColor: '#104a28' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  actionButton: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', borderRadius: 12, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, elevation: 1 },
  actionButtonText: { fontSize: 13, fontWeight: '600', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 15 },
  listContainer: { gap: 15 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', flexWrap: 'wrap' },
  cardCategory: { fontSize: 11, color: '#888', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  simCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  simTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  simDesc: { fontSize: 13, color: '#666', marginTop: 4 },
  announceCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, borderLeftWidth: 4 },
  adminBorder: { borderLeftColor: '#d32f2f' }, 
  instructorBorder: { borderLeftColor: '#104a28' }, 
  announceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  authorRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, flex: 1, marginRight: 8 },
  authorText: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', flexShrink: 1, flexWrap: 'wrap', lineHeight: 16 },
  dateText: { fontSize: 10, color: '#999', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 8 },
  announceTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  announceContent: { fontSize: 14, color: '#555', lineHeight: 22 }, 
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#999', marginTop: 10 },
  spacer: { height: 80 }, 
  bottomNavContainer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', width: '90%', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 35, justifyContent: 'space-around', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  navItem: { padding: 5, alignItems: 'center' },
  navItemActive: { backgroundColor: '#104a28', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 6 },
  navTextActive: { color: '#fff', fontWeight: '600', fontSize: 13 },
  menuCard: { padding: 5, alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  filterLabel: { fontSize: 14, fontWeight: 'bold', color: '#666', marginTop: 15, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb' },
  chipActive: { backgroundColor: '#e6f4ea', borderColor: '#104a28' },
  chipText: { fontSize: 13, color: '#4b5563', fontWeight: '500' },
  chipTextActive: { color: '#104a28', fontWeight: 'bold' },
  modalFooter: { flexDirection: 'row', gap: 10, marginTop: 30, paddingTop: 15, borderTopWidth: 1, borderColor: '#eee' },
  clearBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: '#fef2f2', alignItems: 'center' },
  clearBtnText: { color: '#dc2626', fontWeight: 'bold' },
  applyBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: '#104a28', alignItems: 'center' },
  applyBtnText: { color: 'white', fontWeight: 'bold' }
});