import React, { useContext, useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';

// ❗ REPLACE WITH YOUR PC'S IP ADDRESS
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const isStudent = user?.role === 'STUDENT';
  const displayName = user?.role === 'ADMIN' ? "Administrator" : (user?.fullName || "Instructor");

  // --- FETCH GRADES (Only for Students) ---
  useEffect(() => {
    if (!isStudent) {
        setLoading(false);
        return;
    }

    const fetchHistory = async () => {
      try {
        if (!user) return;
        const response = await fetch(`${API_URL}/grades`);
        const allGrades = await response.json();
        const myGrades = allGrades.filter(g => g.user_id === user.id);
        setGrades(myGrades);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user, isStudent]);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isStudent ? "Student Profile" : "Account Profile"}</Text>
        <View style={{width: 24}}/>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* --- ID CARD DESIGN --- */}
        <View style={styles.idCard}>
          {/* Green Header Strip */}
          <View style={styles.idHeader}>
            <View style={styles.logoCircle}>
                <Text style={styles.logoText}>A</Text>
            </View>
            <View>
                <Text style={styles.uniName}>ABACUS</Text>
                <Text style={styles.uniSub}>Cavite State University - Tanza</Text>
            </View>
          </View>

          <View style={styles.idBody}>
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name={isStudent ? "person" : "shield-checkmark"} size={50} color="#ccc" />
              </View>
              <Text style={styles.idLabel}>{user?.role || "USER"}</Text>
            </View>

            {/* Info Section */}
            <View style={styles.infoContainer}>
                
                {/* Full Name */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.valueLarge} numberOfLines={2}>
                        {displayName}
                    </Text>
                </View>

                {/* Email (Visible to everyone) */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user?.email || "N/A"}
                    </Text>
                </View>

                {/* --- STUDENT SPECIFIC FIELDS (Hidden for Admin/Instructor) --- */}
                {isStudent && (
                    <>
                        <View style={styles.rowSplit}>
                            <View style={{flex: 1}}>
                                <Text style={styles.label}>Student No.</Text>
                                <Text style={styles.value}>{user?.studentId || "N/A"}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>{user?.status || "Regular"}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Program</Text>
                            <Text style={styles.value} numberOfLines={2}>
                                {user?.program || "BSIT"}
                            </Text>
                        </View>

                        <View style={styles.rowSplit}>
                            <View style={{flex: 1}}>
                                <Text style={styles.label}>Year & Section</Text>
                                <Text style={styles.value}>{user?.yearLevel} - {user?.section}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={styles.label}>Initial Grade</Text>
                                <Text style={styles.value}>{user?.initialGrade || "N/A"}</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>
          </View>
          
          <View style={styles.barcodeStrip}>
             <View style={styles.barcodeLines} />
          </View>
        </View>

        {/* --- ACADEMIC RECORD (Students Only) --- */}
        {isStudent && (
            <>
                <Text style={styles.sectionTitle}>Quizzes Finished</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#104a28" style={{marginTop: 20}}/>
                ) : grades.length === 0 ? (
                    <Text style={styles.emptyText}>No quizzes taken yet.</Text>
                ) : (
                    grades.map((item, index) => {
                        const isPass = parseFloat(item.grade) >= 75;
                        return (
                            <View key={index} style={styles.gradeRow}>
                                <View style={styles.gradeLeft}>
                                    <Text style={styles.quizTitle}>{item.subjectTitle}</Text>
                                    <Text style={styles.quizDate}>
                                        {item.dateTaken ? new Date(item.dateTaken).toDateString() : "Recently"}
                                    </Text>
                                </View>
                                <View style={styles.gradeRight}>
                                    <Text style={[styles.percentageText, {color: isPass ? '#104a28' : '#d32f2f'}]}>
                                        {item.grade}%
                                    </Text>
                                    <Text style={[styles.statusSmall, {color: isPass ? '#104a28' : '#d32f2f'}]}>
                                        {isPass ? "Passed" : "Failed"}
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                )}
            </>
        )}

        {/* --- LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#d32f2f" />
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
    elevation: 2 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  backBtn: { padding: 5 },
  content: { padding: 20, paddingBottom: 50 },

  // ID CARD STYLES
  idCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 5,
    shadowColor: '#000', shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.15, shadowRadius: 5,
    marginBottom: 30,
  },
  idHeader: {
    backgroundColor: '#104a28',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  logoCircle: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center'
  },
  logoText: { color: '#104a28', fontWeight: '900', fontSize: 24 },
  uniName: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  uniSub: { color: '#cfd8dc', fontSize: 11, textTransform: 'uppercase' },

  idBody: { flexDirection: 'row', padding: 20 },
  avatarContainer: { alignItems: 'center', marginRight: 15 },
  avatar: { 
    width: 80, height: 80, borderRadius: 5, backgroundColor: '#f0f0f0', 
    borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center',
    marginBottom: 8
  },
  idLabel: { fontSize: 10, fontWeight: 'bold', color: '#555', letterSpacing: 1 },

  infoContainer: { flex: 1, gap: 12 },
  infoRow: { marginBottom: 2 },
  rowSplit: { flexDirection: 'row', gap: 10, marginBottom: 2 },
  label: { fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 2 },
  value: { fontSize: 14, fontWeight: '600', color: '#222', flexWrap: 'wrap' }, 
  valueLarge: { fontSize: 16, fontWeight: 'bold', color: '#104a28', flexWrap: 'wrap' },
  
  statusBadge: { backgroundColor: '#e8f5e9', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontSize: 11, color: '#104a28', fontWeight: 'bold', textTransform: 'uppercase' },

  barcodeStrip: { height: 30, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
  barcodeLines: { height: 15, width: '80%', backgroundColor: '#333', opacity: 0.1 }, 

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  gradeRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10,
    borderLeftWidth: 4, borderLeftColor: '#104a28',
    elevation: 1 
  },
  gradeLeft: { flex: 1 },
  quizTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
  quizDate: { fontSize: 12, color: '#888', marginTop: 2 },
  gradeRight: { alignItems: 'flex-end' },
  percentageText: { fontSize: 16, fontWeight: 'bold' },
  statusSmall: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  emptyText: { color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 20 },

  logoutBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 40, padding: 15, backgroundColor: '#ffebee', borderRadius: 12,
    borderWidth: 1, borderColor: '#ffcdd2'
  },
  logoutText: { color: '#d32f2f', fontWeight: 'bold', fontSize: 15 }
});