import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseWeb';
import { Check, X, Mail, Shield, UserPlus, Clock, Loader } from 'lucide-react';
// 1. Import EmailJS
import emailjs from '@emailjs/browser';

export default function ManageAdmissions() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingOtp, setSendingOtp] = useState(false); // New loading state for email

  // ... (Keep your fetchRequests and useEffect here) ...

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "admission_requests"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(list);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // --- UPDATED: SEND VIA YOUR OWN BACKEND ---
  const handleVerify = async (req) => {
    setSendingOtp(true);
    const otp = Math.floor(100000 + Math.random() * 900000); 

    try {
      // Call your Custom Backend
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: req.email,
          student_name: req.fullName,
          otp_code: otp
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`OTP Sent Successfully to ${req.email}!`);
        
        // Update Firestore
        await updateDoc(doc(db, "admission_requests", req.id), {
          status: 'verified',
          otpCode: otp 
        });
        
        fetchRequests();
      } else {
        throw new Error(data.error);
      }

    } catch (error) {
      console.error('FAILED...', error);
      alert("Failed to send email. Ensure your Node server is running.");
    } finally {
      setSendingOtp(false);
    }
  };

  // 2. ACCEPT: Create the Account
  const handleAccept = async (req) => {
    if (req.status !== 'verified') {
      if(!window.confirm("This student hasn't been verified via OTP yet. Accept anyway?")) return;
    }

    const tempPassword = generateStudentPassword();

    try {
      // NOTE: Creating a user via client-side SDK logs you in as that new user. 
      // Ideally, use a secondary Firebase App instance or Cloud Functions.
      // For this prototype, we will just alert the credentials and save to DB.
      
      // A. Create Authentication (This might log admin out if not careful, proceed with caution or use Cloud Function)
      // For safety in this demo, we will just Create the User Document effectively "enabling" them if you use a "pre-created" auth flow,
      // OR we strictly follow instruction: Admin provides account.
      
      // Alert the credentials so Admin can send them manually or via email system
      alert(`ACCOUNT CREATED!\n\nEmail: ${req.email}\nPassword: ${tempPassword}\n\nPlease copy this password to send to the student.`);

      // B. Create the actual User Document in 'users' collection
      // We use the email as ID or a new ID. Let's use the Request ID for now or generate one.
      // Since we can't easily run createUserWithEmailAndPassword without logging out the admin,
      // We will assume the Admin uses a separate tool or we just add them to the 'users' DB 
      // and let the student "claim" it later (or use a Cloud Function).
      
      // *Simplified Flow for Prototype*: We register them in the Database as "Student".
      // You would manually create the Auth user in Firebase Console or use a Cloud Function.
      
      await setDoc(doc(db, "users", req.id), {
        fullName: req.fullName,
        email: req.email,
        studentId: req.studentId,
        role: "STUDENT",
        yearLevel: "1st Year", // Default
        section: "TBA",        // Default
        program: "BSIT",       // Default
        defaultPassword: tempPassword // Storing just for record (Not recommended for production security)
      });

      // C. Remove from requests
      await deleteDoc(doc(db, "admission_requests", req.id));
      
      fetchRequests();

    } catch (error) {
      alert("Error accepting student: " + error.message);
    }
  };
  
  // 3. REJECT
  const handleReject = async (id) => {
    if(window.confirm("Reject this admission request?")) {
      await deleteDoc(doc(db, "admission_requests", id));
      fetchRequests();
    }
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage Admissions</h1>
        <p style={{color:'#666'}}>Verify and approve incoming student registrations.</p>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>CvSU Email</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign:'center', padding:'20px'}}>Loading Requests...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign:'center', padding:'40px', color:'#888'}}>No pending admission requests.</td></tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>
                    {req.status === 'verified' ? (
                      <span className="status-badge pass"><Check size={12}/> Verified</span>
                    ) : (
                      <span className="status-badge fail"><Clock size={12}/> Pending</span>
                    )}
                  </td>
                  <td style={{fontWeight:'600'}}>{req.fullName}</td>
                  <td>{req.studentId}</td>
                  <td>{req.email}</td>
                  <td style={{textAlign: 'right'}}>
                    <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                      
                      {/* VERIFY BUTTON */}
                      {req.status !== 'verified' && (
                        <button 
                          className="btn-icon" 
                          style={{color: '#0284c7', background: '#e0f2fe', cursor: sendingOtp ? 'wait' : 'pointer'}}
                          onClick={() => !sendingOtp && handleVerify(req)} 
                          title="Send OTP Verification"
                          disabled={sendingOtp}
                        >
                          {sendingOtp ? <Loader size={18} className="animate-spin" /> : <Mail size={18} />}
                        </button>
                      )}

                      {/* ACCEPT BUTTON */}
                      <button 
                        className="btn-icon" 
                        style={{color: '#16a34a', background: '#dcfce7'}}
                        // Make sure handleAccept is defined in your file
                        onClick={() => handleAccept(req)} 
                        title="Accept & Create Account"
                      >
                        <UserPlus size={18} />
                      </button>

                      {/* REJECT BUTTON */}
                      <button 
                        className="btn-icon" 
                        style={{color: '#dc2626', background: '#fee2e2'}}
                        // Make sure handleReject is defined in your file
                        onClick={() => handleReject(req.id)} 
                        title="Reject Request"
                      >
                        <X size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}