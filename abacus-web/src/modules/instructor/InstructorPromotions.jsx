import React, { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, FileImage, ShieldCheck, Filter, AlertCircle, Users, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function InstructorPromotions() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dynamic Filters based strictly on instructor's assigned classes
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  
  // Modal, Selection & Zoom State
  const [viewImage, setViewImage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  const canMassSelect = programFilter !== "All" && yearFilter !== "All" && sectionFilter !== "All";

  const user = JSON.parse(localStorage.getItem("user"));
  const instructorId = user?.id;

  const fetchData = async () => {
    if (!instructorId) return;
    setLoading(true);
    setSelectedIds([]); 
    try {
      const res = await fetch(`http://localhost:5000/instructor/${instructorId}/promotions/pending`);
      const data = await res.json();

      const uppercaseData = data.map(s => ({
          ...s, 
          full_name: s.full_name ? s.full_name.toUpperCase() : ''
      }));

      setPendingRequests(uppercaseData);
      setFilteredRequests(uppercaseData);
      
      setAvailablePrograms([...new Set(data.map(s => s.program))]);
      setAvailableYears([...new Set(data.map(s => s.pending_year))]);
      setAvailableSections([...new Set(data.map(s => s.pending_section))]);
      
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [instructorId]);

  useEffect(() => {
    let result = [...pendingRequests];

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(s => 
        (s.full_name && s.full_name.toLowerCase().includes(lower)) ||
        (s.student_id && s.student_id.toLowerCase().includes(lower))
      );
    }

    if (programFilter !== "All") result = result.filter(s => s.program === programFilter);
    if (yearFilter !== "All") result = result.filter(s => s.pending_year === yearFilter);
    if (sectionFilter !== "All") result = result.filter(s => s.pending_section === sectionFilter);

    result.sort((a, b) => {
      const getSurname = (name) => {
        if (!name) return "";
        const nameParts = name.trim().split(" ");
        return nameParts[nameParts.length - 1].toLowerCase(); 
      };
      return getSurname(a.full_name).localeCompare(getSurname(b.full_name));
    });

    setFilteredRequests(result);
    setSelectedIds([]); 
  }, [search, programFilter, yearFilter, sectionFilter, pendingRequests]);

  const handleApprove = async (id, name) => {
    if (!window.confirm(`Approve promotion for ${name} into your class?`)) return;
    try {
      await fetch(`http://localhost:5000/admin/promotions/${id}/approve`, { method: 'PUT' });
      fetchData();
    } catch (err) { alert("Failed to approve request."); }
  };

  const handleReject = async (id, name) => {
    if (!window.confirm(`Reject promotion for ${name}? This flags them as rejected.`)) return;
    try {
      await fetch(`http://localhost:5000/admin/promotions/${id}/reject`, { method: 'PUT' });
      fetchData();
    } catch (err) { alert("Failed to reject request."); }
  };

  const handleMassApprove = async () => {
    if (selectedIds.length === 0) return alert("Select at least one student to approve.");
    if (!window.confirm(`Are you sure you want to MASS APPROVE ${selectedIds.length} students into Year ${yearFilter} - Section ${sectionFilter}?`)) return;
    
    try {
      await fetch('http://localhost:5000/admin/promotions/mass-approve', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds })
      });
      fetchData();
    } catch(e) {
      alert("Failed to mass approve.");
    }
  };

  const toggleSelectAll = () => {
      if (selectedIds.length === filteredRequests.length) {
          setSelectedIds([]); 
      } else {
          setSelectedIds(filteredRequests.map(s => s.id));
      }
  };

  const toggleSelectOne = (id) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      } else {
          setSelectedIds([...selectedIds, id]);
      }
  };

  const openImagePreview = (url) => {
      setViewImage(url);
      setZoomLevel(1); 
  };

  const closeImagePreview = () => {
      setViewImage(null);
      setZoomLevel(1);
  };

  return (
    <div style={{ padding: '30px', background: '#F8F9FD', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
            <h2 style={{ fontSize: '28px', color: '#104a28', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 8px 0' }}>
                <ShieldCheck size={28}/> Class Roster Verification
            </h2>
            <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
                Review and approve students requesting to join your assigned classes.
            </p>
        </div>

        {canMassSelect && selectedIds.length > 0 && (
            <button onClick={handleMassApprove} style={{ background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'}}>
                <Users size={18}/> Mass Approve ({selectedIds.length})
            </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e5e7eb', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontWeight: 'bold', borderRight: '1px solid #e5e7eb', paddingRight: '15px' }}>
            <Filter size={18}/> My Classes
        </div>
        
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', background: '#f3f4f6', padding: '0 15px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
          <Search size={18} color="#6b7280" />
          <input 
            type="text" 
            placeholder="Search name or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 10px', border: 'none', background: 'transparent', outline: 'none', fontSize: '14px' }}
          />
        </div>

        <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)} style={selectStyle}>
            <option value="All">All Programs</option>
            {availablePrograms.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} style={selectStyle}>
            <option value="All">All Years</option>
            {availableYears.map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>

        <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)} style={selectStyle}>
            <option value="All">All Sections</option>
            {availableSections.map(s => <option key={s} value={s}>Section {s}</option>)}
        </select>
      </div>

      {!canMassSelect && availableYears.length > 0 && (
          <div style={{ marginBottom: '15px', padding: '12px', background: '#eff6ff', color: '#1e40af', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16}/> <strong>Notice:</strong> To use Mass Approval, select a specific Program, Year, and Section from your assignments above.
          </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#104a28', color: 'white' }}>
            <tr>
              {canMassSelect && (
                 <th style={{...thStyle, width: '40px', textAlign: 'center'}}>
                    <input 
                        type="checkbox" 
                        onChange={toggleSelectAll} 
                        checked={filteredRequests.length > 0 && selectedIds.length === filteredRequests.length}
                        style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                 </th>
              )}
              <th style={thStyle}>Student Info</th>
              <th style={thStyle}>Current Class</th>
              <th style={thStyle}>Requesting to Join</th>
              <th style={{...thStyle, textAlign: 'center'}}>Proof (COR)</th>
              <th style={{...thStyle, textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={canMassSelect ? 6 : 5} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading requests...</td></tr>
            ) : filteredRequests.length === 0 ? (
              <tr>
                  <td colSpan={canMassSelect ? 6 : 5} style={{ padding: '60px', textAlign: 'center', color: '#9ca3af' }}>
                      <AlertCircle size={40} color="#d1d5db" style={{marginBottom: '10px'}}/>
                      <br/>No pending promotion requests found for your classes.
                  </td>
              </tr>
            ) : (
              filteredRequests.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', background: selectedIds.includes(student.id) ? '#f0fdf4' : 'white' }} onMouseOver={e => {if(!selectedIds.includes(student.id)) e.currentTarget.style.background = '#f9fafb'}} onMouseOut={e => {if(!selectedIds.includes(student.id)) e.currentTarget.style.background = 'white'}}>
                  
                  {canMassSelect && (
                      <td style={{...tdStyle, textAlign: 'center'}}>
                         <input 
                            type="checkbox" 
                            checked={selectedIds.includes(student.id)} 
                            onChange={() => toggleSelectOne(student.id)}
                            style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                         />
                      </td>
                  )}

                  <td style={tdStyle}>
                    <strong style={{ color: '#111', fontSize: '15px' }}>{student.full_name}</strong>
                    <div style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>{student.student_id}</div>
                    <div style={{fontSize: '11px', color: '#8b5cf6', marginTop: '4px', fontWeight: 'bold'}}>{student.program}</div>
                  </td>
                  
                  {/* ✅ FIX: Replaces the ugly 4-(to be assigned) text with a clean badge */}
                  <td style={tdStyle}>
                     {student.section === 'To be assigned' || !student.section ? (
                         <span style={{background: '#f1f5f9', color: '#475569', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold'}}>
                            Unassigned / Previous Term
                         </span>
                     ) : (
                         <span style={{color: '#6b7280', fontSize: '13px'}}>
                            Year {student.year_level} - Sec {student.section}
                         </span>
                     )}
                  </td>

                  <td style={tdStyle}>
                    <span style={{background: '#fef3c7', color: '#b45309', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold'}}>
                        Year {student.pending_year} - Sec {student.pending_section}
                    </span>
                    <div style={{fontSize: '11px', color: '#d97706', marginTop: '6px', fontWeight: 'bold'}}>PENDING YOUR APPROVAL</div>
                  </td>
                  
                  <td style={{...tdStyle, textAlign: 'center'}}>
                    <button 
                        onClick={() => openImagePreview(`http://localhost:5000${student.cor_image_url}`)}
                        style={{background: '#f3f4f6', border: '1px solid #d1d5db', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#4b5563'}}
                    >
                        <FileImage size={18} color="#3b82f6"/> View COR
                    </button>
                  </td>

                  <td style={{...tdStyle, textAlign: 'center'}}>
                     <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                        <button onClick={() => handleApprove(student.id, student.full_name)} style={iconBtnStyle} title="Approve">
                            <CheckCircle size={28} color="#10b981"/>
                        </button>
                        <button onClick={() => handleReject(student.id, student.full_name)} style={iconBtnStyle} title="Reject">
                            <XCircle size={28} color="#ef4444"/>
                        </button>
                     </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewImage && (
          <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(4px)'}} onClick={closeImagePreview}>
              <div style={{background: 'white', padding: '24px', borderRadius: '16px', position: 'relative', width: '90%', maxWidth: '1000px', height: '90%', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'}} onClick={e => e.stopPropagation()}>
                  <button onClick={closeImagePreview} style={{position: 'absolute', top: -15, right: -15, background: '#ef4444', color: 'white', border: '2px solid white', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>X</button>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <h3 style={{margin: 0, color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <FileImage size={20} color="#104a28"/> COR Document Preview
                      </h3>
                      <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.25))} style={zoomBtnStyle} title="Zoom Out"><ZoomOut size={16}/> Zoom Out</button>
                          <button onClick={() => setZoomLevel(1)} style={zoomBtnStyle} title="Reset Size"><RotateCcw size={16}/> Reset</button>
                          <button onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.25))} style={zoomBtnStyle} title="Zoom In"><ZoomIn size={16}/> Zoom In</button>
                      </div>
                  </div>
                  
                  <div style={{background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <img 
                          src={viewImage} 
                          alt="COR Preview" 
                          style={{
                              width: `${zoomLevel * 100}%`, 
                              transition: 'width 0.2s ease-in-out', 
                              objectFit: 'contain', 
                              display: 'block', 
                              margin: '0 auto'
                          }} 
                      />
                  </div>
                  
                  <p style={{textAlign: 'center', marginTop: '15px', marginBottom: 0, color: '#6b7280', fontSize: '13px', background: '#f3f4f6', padding: '8px', borderRadius: '6px', fontFamily: 'monospace'}}>
                      {viewImage.split('/').pop()}
                  </p>
              </div>
          </div>
      )}
    </div>
  );
}

// Inline Styles
const selectStyle = { padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontSize: '14px', outline: 'none', cursor: 'pointer', minWidth: '150px' };
const thStyle = { padding: '16px 24px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' };
const tdStyle = { padding: '20px 24px', verticalAlign: 'middle' };
const iconBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', padding: '5px' };
const zoomBtnStyle = { display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' };