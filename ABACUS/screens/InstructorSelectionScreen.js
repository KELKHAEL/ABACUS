import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function InstructorSelectionScreen({ navigation }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch Teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "TEACHER"));
        const querySnapshot = await getDocs(q);
        const teacherList = [];
        querySnapshot.forEach((doc) => {
          teacherList.push({ id: doc.id, ...doc.data() });
        });
        setTeachers(teacherList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not load instructors.");
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Save Selection
  const handleConfirm = async () => {
    if (!selectedTeacher) return;
    setSaving(true);
    try {
      const studentRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(studentRef, {
        instructorId: selectedTeacher.id,
        instructorName: selectedTeacher.fullName || selectedTeacher.email
      });
      navigation.replace('StudentHome');
    } catch (error) {
      setSaving(false);
      Alert.alert("Error", "Failed to join class.");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, selectedTeacher?.id === item.id && styles.selectedCard]} 
      onPress={() => setSelectedTeacher(item)}
    >
      <Text style={styles.name}>{item.fullName || item.email}</Text>
      {selectedTeacher?.id === item.id && <Text>✅</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select Your Instructor</Text>
      {loading ? <ActivityIndicator size="large" color="#2D7FF9" /> : (
        <FlatList data={teachers} renderItem={renderItem} keyExtractor={item => item.id} />
      )}
      <TouchableOpacity 
        style={[styles.btn, !selectedTeacher && {backgroundColor: '#ccc'}]} 
        onPress={handleConfirm}
        disabled={!selectedTeacher || saving}
      >
        <Text style={styles.btnText}>{saving ? "Saving..." : "Confirm"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 20, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' },
  selectedCard: { backgroundColor: '#E3F2FD', borderWidth: 1, borderColor: '#2D7FF9' },
  name: { fontSize: 16 },
  btn: { backgroundColor: '#2D7FF9', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold' }
});