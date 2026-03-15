import React, { useState, useContext, useEffect, useCallback } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, 
  Alert, RefreshControl, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 

// ❗ IMPORTANT: CHECK THIS URL MATCHES YOUR CURRENT NGROK TERMINAL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

// Module Card Component
const ModuleCard = ({ title, category, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { borderLeftWidth: 5, borderLeftColor: color }]} onPress={onPress}>
    <View style={{ flex: 1, marginRight: 10 }}> 
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardCategory}>{category}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);

// Simulation Card Component
const SimulationCard = ({ title, desc, color, onPress }) => (
  <TouchableOpacity style={[styles.simCard, { borderLeftWidth: 5, borderLeftColor: color }]} onPress={onPress}>
    <View style={{ flex: 1, marginRight: 10 }}>
      <Text style={styles.simTitle}>{title}</Text>
      <Text style={styles.simDesc}>{desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);

// --- UPDATED ANNOUNCEMENT CARD (FIXED FOR SMALL SCREENS) ---
const AnnouncementCard = ({ item }) => {
  const isRegistrar = item.author_role === 'ADMIN';
  
  return (
    <View style={[styles.announceCard, isRegistrar ? styles.adminBorder : styles.instructorBorder]}>
      {/* Header: Author + Date */}
      <View style={styles.announceHeader}>
        <View style={styles.authorRow}>
          <Ionicons 
            name={isRegistrar ? "megaphone" : "school"} 
            size={18} 
            color={isRegistrar ? "#d32f2f" : "#104a28"} 
            style={{marginTop: 2}} // Align icon with top of text
          />
          <Text style={[styles.authorText, isRegistrar ? {color: '#d32f2f'} : {color: '#104a28'}]}>
            {isRegistrar ? "Announcement from the Registrar" : item.author_name}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.divider} />

      <Text style={styles.announceTitle}>{item.title}</Text>
      <Text style={styles.announceContent}>{item.content}</Text>
    </View>
  );
};

export default function StudentHome({ navigation }) {
  const { user } = useContext(AuthContext); 
  const [activeTab, setActiveTab] = useState('Home'); 
  
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnounce, setLoadingAnnounce] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Name handling
  const studentName = user?.fullName 
    ? (user.fullName.includes(',') ? user.fullName.split(',')[1].trim() : user.fullName) 
    : "Student";

  // --- FETCH ANNOUNCEMENTS ---
  const fetchAnnouncements = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/announcements/student/${user.id}`);
      const text = await response.text(); 

      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          setAnnouncements(data);
        } else {
          setAnnouncements([]); 
        }
      } catch (e) {
        console.error("Server HTML Error");
      }
    } catch (error) {
      console.error("Network Error");
    }
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

  const handleProfileClick = () => {
    navigation.navigate('ProfileScreen');
  };

  // --- MODULES DATA ---
  const allModules = [
    { 
      id: 1, 
      title: "Discrete Mathematics - Introduction", 
      category: "Introduction for Discrete Mathematics", 
      color: "#16941c",
      topics: [
        { id: "1.1", title: "Introduction to Discrete Mathematics", content: "Discrete mathematics is a branch of mathematics that deals with objects that can assume only distinct values. This is in contrast to continuous mathematics that focuses on continuous, smooth functions. Discrete mathematics shows structures that are fundamentally discrete. The term discrete refers to the fact that these structures can be counted in whole numbers, unlike continuous structures that can take on any value within a range." },
        { id: "1.2", title: "Mathematical Statements and Operations", content: "In this chapter, we will explain the various types of mathematical statements, logical operations, and their applications in discrete mathematics and computer science. We will break down complex ideas into simpler terms for a better understanding." },
        { id: "1.3", title: "Atomic and Molecular Statements", content: "One of the key concepts in discrete mathematics is mathematical statements. They are used to express ideas that can be either True or False. Mathematical statements come in two forms: atomic and molecular." },
        { id: "1.4", title: "Implications", content: "In this chapter, we will see what implications are, how they function, and provide examples that illustrate their role in logic and mathematics. We will also cover the truth conditions for implications, discuss how to prove them, and understand the related concepts like contrapositive and converse statements." },
        { id: "1.5", title: "Predicates and Quantifiers", content: "In this chapter, we will touch upon the basics of predicates and quantifiers, explain their types, and provide examples to see their use in mathematical reasoning. We will also understand how predicates are different from statements and how quantifiers modify their meanings." },
        { id: "1.6", title: "Sets", content: "Set theory forms the basis of several other fields of study like counting theory, relations, graph theory and finite state machines. In this chapter, we will cover the different aspects of Set Theory." },
        { id: "1.7", title: "Sets and Notations", content: "In this chapter, we will have a detailed look at the concept of sets, their notations, and the various operations that can be performed on them." },
        { id: "1.8", title: "Relations", content: "Whenever sets are being discussed, the relationship between the elements of the sets is the next thing that comes up. Relations may exist between objects of the same set or between objects of two or more sets." },
        { id: "1.9", title: "Operations on Sets", content: "In this chapter, we will have a look at some of the main set operations such as union, intersection, complement, difference, and Cartesian product." },
        { id: "1.10", title: "Venn Diagram on Sets", content: "In this chapter, we will see the use of Venn diagrams in set operations, understand how they provide a visual approach to union, intersection, difference, and more with examples for a better understanding." },
        { id: "1.11", title: "Functions", content: "In this chapter, Functions find their application in various fields like representation of the computational complexity of algorithms, counting objects, study of sequences and strings, to name a few. The third and final chapter of this part highlights the important aspects of functions." },
        { id: "1.12", title: "Surjetion and Bijection Functions", content: "Functions are nothing but mapping relationships between different sets. To fully understand functions, we need to understand three key concepts: surjection, injection, and bijection. In this chapter, we will see each of these function types with examples and see how they differ from one another." },
        { id: "1.13", title: "Image and Inverse-Image", content: "In this chapter, we will elaborate the concept of image and inverse-image with examples for a better understanding. We will show how elements in the domain and codomain of a function are connected." }
      ]
    },
    { 
      id: 2, 
      title: "Mathematical Logic", 
      category: "All about Logics", 
      color: "#16941c",
      topics: [
        { id: "2.1", title: "Propositional Logic", content: "Propositional Logic is concerned with statements to which the truth values, true and false, can be assigned. The purpose is to analyze these statements either individually or in a composite manner." },
        { id: "2.2", title: "Logical Equivalence", content: "Logical equivalence is a fundamental concept in propositional logic. It is used in analyzing and transforming logical statements into more manageable forms." },
        { id: "2.3", title: "Deductions", content: "In propositional logics, sometimes we deduct one logical expression from another; we call them deductions. Deductions form the backbone of logical reasoning." },
        { id: "2.4", title: "Predicate Logic", content: "Predicate Logic deals with predicates, which are propositions containing variables." },
        { id: "2.5", title: "Proof by Contrapositive", content: "In Discrete mathematics, we use logics to deduct and prove in several ways. Another way of proving logics is using the techniques with the proof by contrapositive." },
        { id: "2.6", title: "Proof by Contradiction", content: "Contradiction means negating a statement or when something false we care about." },
        { id: "2.7", title: "Proof by Cases", content: "Proof by Cases is a common technique used in Discrete Mathematics to prove statements that may be True in different scenarios." },
        { id: "2.8", title: "Rules of Inference", content: "To deduce new statements from the statements whose truth that we already know, Rules of Inference are used." }
      ]
    },
    { 
      id: 3, 
      title: "Group Theory", 
      category: "All about Groups", 
      color: "#16941c",
      topics: [
        { id: "3.1", title: "Operators & Postulates", content: "Group Theory is a branch of mathematics and abstract algebra that defines an algebraic structure named as group. Generally, a group comprises of a set of elements and an operation over any two elements on that set to form a third element also in that set." },
        { id: "3.2", title: "Group Theory", content: "Group Theory is a branch of mathematics and abstract algebra that defines an algebraic structure named as group. Generally, a group comprises of a set of elements and an operation over any two elements on that set to form a third element also in that set." },
        { id: "3.3", title: "Algebric Structure for Groups", content: "Algebraic structures are one of the fundamental concepts in abstract algebra. These structures are used to organize and understand the mathematical systems that operate under specific rules. One of the most common structures is groups." },
        { id: "3.4", title: "Abelian Group", content: "In discrete mathematics, groups are one of the core topics that help in understanding how different sets of elements can work under specific operations. Among these, the Abelian group, also known as commutative group, are special because of a special property it has: commutativity." },
        { id: "3.5", title: "Semi Group", content: "Algebraic Structures play an important role in Group Theory and Discrete Mathematics. Among these structures, one of the useful structures is a semigroup. A semigroup is a set paired with an operation that satisfies a specific property." },
        { id: "3.6", title: "Monoid", content: "In this context is the monoid that builds upon the ideas of both algebraic structures and semigroups but includes an additional feature that sets it apart: the identity element." },
        { id: "3.7", title: "Rings and Subring", content: "In Discrete Mathematics, groups, rings and fields are important concepts related to Algebraic Structures that extends the concept of groups. But what exactly is a ring, and how does it differ from groups or other algebraic structures like semigroups?" },
        { id: "3.8", title: "Properties of Rings", content: "Groups and Rings are quite similar but they have several different properties. A ring is an algebraic structure that defines operations within a set." },
        { id: "3.9", title: "Integral Domain", content: "We know that rings and groups are fundamental algebraic structures that have a wide range of applications in discrete mathematics." },
        { id: "3.10", title: "Fields", content: "Fields are often discussed in Ring Theory, but here, we will see primarily what fields are, how they work, and what sets them apart from other algebraic structures." }
      ]
    },
    { 
      id: 4, 
      title: "Counting and Probability", 
      category: "All about the possibilities in Counting and Probability", 
      color: "#16941c",
      topics: [
        { id: "4.1", title: "Counting Theory", content: "In this topic solving mathematical theory of counting are used. Counting mainly encompasses fundamental counting rule, the permutation rule, and the combination rule." },
        { id: "4.2", title: "Combinatorics", content: "Combinatorics is all about figuring out different ways to counting and arranging to solve problems on discrete objects." },
        { id: "4.3", title: "Additive and Multiplicative Principles", content: "In discrete mathematics and combinatorics, we work with counting problems a lot and we aim to calculate the number of ways certain outcomes can be produced." },
        { id: "4.4", title: "Counting with Sets", content: "In this chapter, we will explain how counting works with sets. We will be focusing on important concepts like union, intersection, and Cartesian products. In addition, we will present several examples to demonstrate these principles in action." },
        { id: "4.5", title: "Inclusion and Exclusion", content: "The Principle of Inclusion and Exclusion (PIE) is an important concept in Set Theory that helps in calculating the cardinality of the union of multiple sets; this is True even when those sets overlap." },
        { id: "4.6", title: "Bit Strings", content: "A bit string is a sequence made up of binary digits. They are commonly referred to as bits. These bits can take either of the two values, 0 or 1, which makes them the fundamental building blocks of many computational and theoretical concepts." },
        { id: "4.7", title: "Lattice Path", content: "In discrete mathematics, lattice paths are used to solve problems related to counting the number of ways we can reach a certain point on a grid. Read this chapter to learn the basics of lattice paths and how they work." },
        { id: "4.8", title: "Binomial Coefficients", content: "Binomial coefficients are used not only in combinatorics, but also in probability and algebra. They are useful in counting, especially when we are choosing elements from a set without considering the order." },
        { id: "4.9", title: "Pascal's Triangle", content: "The Pascals Triangle looks very simple at first glance but it has many layers to it. Whether we are counting combinations, working with binomial expansions, or figuring out recursive patterns, the Pascals Triangle helps in making our job easier." },
        { id: "4.10", title: "Permutation and Combinations", content: "In this chapter, we will understand with examples the basics of permutations and combinations. We will focus on explaining the concepts through examples to make the math more relatable." },
        { id: "4.11", title: "Pigeonhole Principle", content: "The Pigeonhole Principle is an interesting and important concept in Combinatorics and Counting Theory of Discrete Mathematics." }
      ]
    },
    { 
      id: 5, 
      title: "Probability Theory", 
      category: "All about Probabilities", 
      color: "#16941c",
      topics: [
        { id: "5.1", title: "Probability", content: "Probability can be conceptualized as finding the chance of occurrence of an event. Mathematically, it is the study of random processes and their outcomes. The laws of probability have a wide applicability in a variety of fields like genetics, weather forecasting, opinion polls, stock markets etc." },
        { id: "5.2", title: "Sample, Space, Outcomes and Events", content: "In Probability Theory, we work on measuring how likely something is to happen. Whether we are flipping a coin, rolling a dice, or predicting the weather, Probability helps us find out the chances." },
        { id: "5.3", title: "Conditional Probability and Independence", content: "Conditional Probability and Independence are the concepts in Probability Theory that help us to find out the likelihood of an event occurring, given that something else has already occurred. In this chapter, we will explain what Conditional Probability and Independence means in Probability." },
        { id: "5.4", title: "Random Variables in Probability Theory", content: "We use Random Variables to simplify the process of working with outcomes from a random experiment. In Probability Theory, random variables is used to take all the outcomes of an experiment and put them into one package. Read this chapter to learn the basics of random variables in probability theory." },
        { id: "5.5", title: "Distribution Functions in Probability Theory", content: "Distribution functions help us understand and predict the likelihood of different outcomes. Distribution functions describe how probabilities are assigned to different possible outcomes of a random variable. They help us make sense of both discrete and continuous data." },
        { id: "5.6", title: "Variance and Standard Deviation", content: "In Probability Theory, we use the mean and average to find the center of data, but they don't show how spread out the data is. For that, we need to find the Variance (sometimes called Standard Deviation) that helps us understand how far the values in a data set deviate from the mean." }
      ]
    },
    { 
      id: 6, 
      title: "Sequences", 
      category: "All about Sequences", 
      color: "#16941c",
      topics: [
        { id: "6.1", title: "Sequences", content: "Sequences are building blocks for patterns and series. They are often used to solve real-world problems across different fields, like computer science, physics, and economics." },
        { id: "6.2", title: "Arithmetic and Geometric Sequences", content: "In Discrete Mathematics, we use the concept of sequences to understand patterns and predict the subsequent terms in ordered lists of numbers." },
        { id: "6.3", title: "Polynomial Fitting", content: "Polynomial Fitting is a powerful technique that helps us understand and predict complex patterns in sequences. In discrete mathematics, this method comes in handy while working with sequences that do not follow simple arithmetic or geometric progressions." }
      ]
    },
    { 
      id: 7, 
      title: "Mathematical & Recurrence", 
      category: "All about the Recurrences", 
      color: "#16941c",
      topics: [
        { id: "7.1", title: "Mathematical Induction", content: "Mathematical induction, is a technique for proving results or establishing statements for natural numbers. This part illustrates the method through a variety of examples." },
        { id: "7.2", title: "Formalizing Proofs for Mathematical Induction", content: "Mathematical Inductions are one of the fundamental methods for proving statements or conjectures about natural numbers and sequences." },
        { id: "7.3", title: "Strong and Weak Induction", content: "We use the induction theory in discrete mathematics to prove statements or conjectures by capturing the patterns. There are two types of induction techniques: the weak induction and the strong induction." },
        { id: "7.4", title: "Recurrence Relation", content: "In this chapter, we will discuss how recursive techniques can derive sequences and be used for solving counting problems. The procedure for finding the terms of a sequence in a recursive manner is called recurrence relation." },
        { id: "7.5", title: "Linear Recurrence Relations", content: "Linear recurrence relations are major concept in discrete mathematics that provide a mathematical way to define sequences based on prior terms." },
        { id: "7.6", title: "Non-Homogenous Recurrence Relations", content: "Recurrence relations in discrete mathematics are quite useful in defining sequences based on previous terms. It allows us to predict future values or patterns. Up to this point, we may be familiar with homogeneous recurrence relations, where each term in a sequence depends only on its previous terms." },
        { id: "7.7", title: "Solving Recurrence Relations", content: "From algorithm analysis to sequence problems, recurrence relations are quite useful in discrete mathematics. Recurrence relations give us a way to express terms in a sequence based on prior terms." },
        { id: "7.8", title: "Master's Theorem", content: "Master's Theorem works on specific types of recurrence relations. It is a powerful tool to determine the asymptotic behavior of recurrence relations. It follows a specific form, which is to estimate the time complexity without going through a lengthy, step-by-step expansion." },
        { id: "7.9", title: "Generating Functions", content: "In this chapter, we will see the basics of generating functions and understand how these functions work. In addition, we will cover the various types generating functions and also how they are applied to solve mathematical problems." }
      ]
    },
    { 
      id: 8, 
      title: "Graph Theory", 
      category: "All about Graphs", 
      color: "#16941c",
      topics: [
        { id: "8.1", title: "Graph & Graph Models", content: "The study of graphs, or graph theory is an important part of a number of disciplines in the fields of mathematics, engineering and computer science." },
        { id: "8.2", title: "More on Graphs", content: "The study of graphs, or graph theory is an important part of a number of disciplines in the fields of mathematics, engineering and computer science." },
        { id: "8.3", title: "Planar Graphs", content: "In this chapter, we will see the basics of planar graphs with easy-to-understand examples along with the explanations of core concepts like Eulers formula and non-planar graphs." },
        { id: "8.4", title: "Non-Planar Graphs", content: "In this chapter, we will cover the basics of non-planar graphs, check some famous examples, and understand the proofs and reasoning behind non-planarity." },
        { id: "8.5", title: "Polyhedra", content: "In this chapter, we will see the basics of polyhedra and understand some of its most well-known types." },
        { id: "8.6", title: "Introduction to Trees", content: "Tree is a discrete structure that represents hierarchical relationships between individual elements or nodes. A tree in which a parent has no more than two children is called a binary tree." },
        { id: "8.7", title: "Properties of Trees", content: "Trees are special types of graphs. Unlike other types of graphs, trees have some unique properties. A tree is a connected graph with no cycles. It is a simple yet powerful structure that finds its applications across many fields such as data organization, algorithms, network design, and biology." },
        { id: "8.8", title: "Rooted and Unrooted Trees", content: "Trees are special structures in graph theory and discrete mathematics. Trees are used for representing hierarchies and connections without cycles. The rooted and unrooted trees gives us two different ways to structure and interpret such data." },
        { id: "8.9", title: "Spanning Trees", content: "A spanning tree of a connected undirected graph G is a tree that minimally includes all of the vertices of G. A graph may have many spanning trees." },
        { id: "8.10", title: "Graph Coloring", content: "In simple terms, graph coloring is a problem where we assign colors to elements of a graph. The colors can be assigned on vertices or edges. When specific conditions are met, we can color them." },
        { id: "8.11", title: "Coloring Theory in General", content: "The graph coloring problem is useful in graph theory and discrete mathematics. Graph coloring ensures that no two adjacent vertices will have the same color. This technique has applications across diverse fields, from scheduling problems to frequency assignment for radio stations." },
        { id: "8.12", title: "Coloring Edges", content: "When we talk about graph coloring, generally we focus on vertex coloring. Coloring the edges is equally important in discrete mathematics." },
        { id: "8.13", title: "Euler Paths and Circuits", content: "Euler paths and circuits are the most fundamental concepts in Graph Theory. With these concepts, we can solve real-world problems like network traversal, delivering mail along a specific route, planning circuits, etc." },
        { id: "8.14", title: "Hamiltonion Path", content: "The Hamiltonian path is a path that visits every vertex in a graph exactly once. This is named after the Irish mathematician Sir William Rowan Hamilton. The concept is quite useful in areas like circuit design, puzzle solving, and optimization in route planning." }
      ]
    },
    { 
      id: 9, 
      title: "Boolean Algebra", 
      category: "All about Boolean Algebra", 
      color: "#16941c",
      topics: [
        { id: "9.1", title: "Boolean Expressions & Functions", content: "Boolean algebra is algebra of logic. It deals with variables that can have two discrete values, 0 (False) and 1 (True); and operations that have logical significance. The earliest method of manipulating symbolic logic was invented by George Boole and subsequently came to be known as Boolean Algebra." },
        { id: "9.2", title: "Simplification of Boolean Functions", content: "In this approach, one Boolean expression is minimized into an equivalent expression by applying Boolean identities." }
      ]
    },
    { 
      id: 10, 
      title: "Advanced Topics", 
      category: "List of Advanced Topics.", 
      color: "#16941c",
      topics: [
        { id: "10.1", title: "Number Theory", content: "Number Theory deals with the properties and relationships of numbers, particularly integers. It has applications in cryptography, coding theory, and computer science. It is also known as the Queen of Mathematics." },
        { id: "10.2", title: "Divisibility", content: "Divisibility is one of the most basic concepts in mathematics. It helps us find out whether a number can fit into another without leaving a remainder. When we work with multiples and factors, divisibility helps us understand how numbers interact." },
        { id: "10.3", title: "Remainder Classes", content: "Remainder classes are ways of grouping numbers based on their remainders when divided by a certain number. Remainder classes have a wide range of applications, especially in domains that require working with integers or finite sets." },
        { id: "10.4", title: "Properties of Congruence", content: "The congruence logic is a way to express that two numbers are basically the same in the context of a given modulus. The concept of congruence is quite useful of modular arithmetic. It is used for simplifying calculations and patterns across integers." },
        { id: "10.5", title: "Solving Linear Diophantine Equation", content: "Diophantine equations have applications in various fields, including number theory and cryptography. They are particularly useful for solving problems that require integer-only solutions." }
      ]
    }
  ];

  // --- RENDER FUNCTIONS ---
  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greetingText} numberOfLines={1} adjustsFontSizeToFit>
            Hello, {studentName}
          </Text>
          <Text style={styles.subText}>Ready to learn Discrete Math?</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn} onPress={handleProfileClick}>
          <Ionicons name="person-circle-outline" size={36} color="#104a28" />
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('QuizListScreen')}>
          <Ionicons name="clipboard-outline" size={20} color="#333" />
          <Text style={styles.actionButtonText}>View Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('MyGradesScreen')}>
          <Ionicons name="stats-chart-outline" size={20} color="#333" />
          <Text style={styles.actionButtonText}>My Grades</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Learning Modules</Text>

      <View style={styles.listContainer}>
        {allModules.map((item) => (
          <ModuleCard 
            key={item.id} 
            title={item.title} 
            category={item.category} 
            color={item.color} 
            onPress={() => navigation.navigate('ModuleDetail', { 
                moduleTitle: item.title, 
                moduleColor: item.color,
                topics: item.topics 
            })} 
          />
        ))}
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );

  const renderSimulations = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitle}>Computational Simulations</Text>
      <Text style={styles.subText}>Interactive logic tools!</Text>
      
      <View style={{marginTop: 20, gap: 15}}>
        <SimulationCard title="Sets Builder" desc="Venn Diagrams & Operations" color="#2D7FF9" onPress={() => navigation.navigate('SetsSimulation')} />
        <SimulationCard title="Truth Tables" desc="Logic Generator" color="#7B61FF" onPress={() => navigation.navigate('TruthTableSimulation')} />
        <SimulationCard title="Bitwise Calculator" desc="AND, OR, XOR operations." color="#824055" onPress={() => navigation.navigate("BitwiseSimulation")} />
        <SimulationCard title="Logic Circuits" desc="Visualize gates (AND, OR, NOT)." color="#71328e" onPress={() => navigation.navigate("LogicCircuitSimulation")} />
        <SimulationCard title="Permutations" desc="Calculate nPr and nCr." color="#F25487" onPress={() => navigation.navigate("PermutationSimulation")} />
        <SimulationCard title="Probability Simulation" desc="Single, Double, and Series event odds." color="#00C853" onPress={() => navigation.navigate("ProbabilitySimulation")} />
        <SimulationCard title="Frequency Distribution Table" desc="Convert raw data into a statistical table." color="#9C27B0" onPress={() => navigation.navigate("FrequencyDistributionTable")} />
        <SimulationCard title="Z-Table Simulation" desc="Find area under the normal curve (Left, Right, Between)." color="#E91E63" onPress={() => navigation.navigate("ZTableSimulation")} />
        <SimulationCard title="Dijkstra's Path Lab" desc="Compute shortest paths in a weighted graph." color="#104a28" onPress={() => navigation.navigate("DijkstraSimulation")} />
        <SimulationCard title="Relations Lab" desc="Analyze properties (Reflexive, Symmetric, Transitive) with Boolean Matrices." color="#104a28" onPress={() => navigation.navigate("RelationsLab")} />
        <SimulationCard title="Euclidean Lab" desc="Compute Greatest Common Divisor." color="#104a28" onPress={() => navigation.navigate("EuclideanLab")} />
        <SimulationCard title="Tree Traversal Lab" desc="Build a traversal sequence binary tree." color="#104a28" onPress={() => navigation.navigate("TreeTraversalLab")} />
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );

  const renderAnnouncements = () => (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.headerTitle}>Announcements</Text>
      <Text style={styles.subText}>Updates from your Instructors & Registrar</Text>

      <View style={{marginTop: 20, gap: 15}}>
        {loadingAnnounce ? (
           <ActivityIndicator size="large" color="#104a28" style={{marginTop: 20}} />
        ) : announcements.length === 0 ? (
           <View style={styles.emptyState}>
             <Ionicons name="notifications-off-outline" size={50} color="#ccc" />
             <Text style={styles.emptyText}>No announcements yet.</Text>
           </View>
        ) : (
           announcements.map((item) => (
             <AnnouncementCard key={item.id} item={item} />
           ))
        )}
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
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
            {activeTab === 'Home' && <Text style={styles.navTextActive}>Modules</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'Simulations' && styles.navItemActive]}
            onPress={() => setActiveTab('Simulations')}
          >
            <Ionicons name={activeTab === 'Simulations' ? "cube" : "cube-outline"} size={22} color={activeTab === 'Simulations' ? "white" : "#666"} />
            {activeTab === 'Simulations' && <Text style={styles.navTextActive}>Labs</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'Announcements' && styles.navItemActive]}
            onPress={() => setActiveTab('Announcements')}
          >
            <Ionicons name={activeTab === 'Announcements' ? "notifications" : "notifications-outline"} size={22} color={activeTab === 'Announcements' ? "white" : "#666"} />
            {activeTab === 'Announcements' && <Text style={styles.navTextActive}>News</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 24, paddingBottom: 100 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTextContainer: { flex: 1, paddingRight: 10 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#333' },
  greetingText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 14, color: '#888' },
  profileBtn: { padding: 0 }, 

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  actionButton: { 
    width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', borderRadius: 12, 
    paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, elevation: 1 
  },
  actionButtonText: { fontSize: 13, fontWeight: '600', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 15 },
  listContainer: { gap: 15 },
  
  card: { 
    backgroundColor: '#fff', borderRadius: 12, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', flexWrap: 'wrap' },
  cardCategory: { fontSize: 11, color: '#888', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  simCard: {
    backgroundColor: 'white', padding: 20, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  simTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  simDesc: { fontSize: 13, color: '#666', marginTop: 4 },

  // --- UPDATED ANNOUNCEMENT STYLES ---
  announceCard: {
    backgroundColor: 'white', borderRadius: 12, padding: 16, 
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    borderLeftWidth: 4
  },
  adminBorder: { borderLeftColor: '#d32f2f' }, 
  instructorBorder: { borderLeftColor: '#104a28' }, 
  
  // FIX: Use flex-start alignment and allow wrapping
  announceHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', // Allows text to wrap without pushing date down weirdly
    marginBottom: 8 
  },
  authorRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', // Align icon with top line of text
    gap: 6,
    flex: 1, // Take available width
    marginRight: 8 // Space before date
  },
  authorText: { 
    fontSize: 12, 
    fontWeight: '700', 
    textTransform: 'uppercase',
    flexShrink: 1, // Allow shrinking
    flexWrap: 'wrap', // Force wrapping on small screens
    lineHeight: 16 // Better spacing when wrapped
  },
  dateText: { 
    fontSize: 10, // Slightly smaller for better fit
    color: '#999',
    marginTop: 2
  },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 8 },
  announceTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  announceContent: { fontSize: 14, color: '#555', lineHeight: 22 }, // Better reading spacing
  
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#999', marginTop: 10 },

  spacer: { height: 80 }, 

  bottomNavContainer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  bottomNav: { 
    flexDirection: 'row', backgroundColor: '#fff', width: '90%', paddingVertical: 12, paddingHorizontal: 20, 
    borderRadius: 35, justifyContent: 'space-around', alignItems: 'center', 
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 
  },
  navItem: { padding: 5, alignItems: 'center' },
  navItemActive: { backgroundColor: '#104a28', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 6 },
  navTextActive: { color: '#fff', fontWeight: '600', fontSize: 13 }
});