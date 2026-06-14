import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, RefreshCcw, ShieldAlert, Clock3, User, ClipboardList, ArrowLeft } from 'lucide-react';

const API_URL = 'https://abacus-w435.onrender.com';

export default function QuizMonitoring() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [user, setUser] = useState(null);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userStr));
    } catch (parseError) {
      navigate('/login');
    }
  }, [navigate]);

  const tryLoadLogsFromBase = async (baseUrl) => {
    const response = await fetch(`${baseUrl}/quiz-violations?instructorId=${user.id}&limit=100`);
    const contentType = response.headers.get('content-type') || '';
    const rawText = await response.text();

    if (!contentType.includes('application/json')) {
      return { ok: false, retryable: true };
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      return { ok: false, retryable: false, error: 'The monitoring response was not valid JSON.' };
    }

    if (!response.ok || data.success === false) {
      return { ok: false, retryable: false, error: data.error || 'Unable to load quiz logs.' };
    }

    return { ok: true, logs: Array.isArray(data.logs) ? data.logs : [] };
  };

  const loadLogs = async (silent = false) => {
    if (!user?.id) return;
    if (!silent) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    setError('');
    try {
      const bases = [API_URL, window.location.origin].filter(Boolean);
      let lastError = '';

      for (const baseUrl of bases) {
        const result = await tryLoadLogsFromBase(baseUrl);
        if (result.ok) {
          setLogs(result.logs);
          setLastUpdated(new Date());
          return;
        }
        if (result.error) {
          lastError = result.error;
        }
      }

      if (lastError) {
        throw new Error(lastError);
      } else {
        throw new Error('Quiz monitoring backend is temporarily unavailable.');
      }
    } catch (fetchError) {
      setError(fetchError.message || 'Quiz monitoring backend is temporarily unavailable.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    loadLogs();

    if (!realtimeEnabled) {
      return undefined;
    }

    let source;
    try {
      source = new EventSource(`${API_URL}/quiz-violations/stream`);
      source.onmessage = () => {
        loadLogs(true);
      };
      source.onerror = () => {
        setRefreshing(false);
      };
    } catch (streamError) {
      console.warn('Quiz monitoring stream unavailable:', streamError);
    }

    const fallbackTimer = setInterval(() => loadLogs(true), 10000);

    return () => {
      if (source) source.close();
      clearInterval(fallbackTimer);
    };
  }, [user?.id, realtimeEnabled]);

  const stats = useMemo(() => {
    const backgrounded = logs.filter(log => log.action === 'App Backgrounded').length;
    const closed = logs.filter(log => log.action === 'App Closed').length;
    const total = logs.length;
    return { backgrounded, closed, total };
  }, [logs]);

  const formatDateTime = (value) => {
    if (!value) return '-';
    return new Date(value).toLocaleString();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '28px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => navigate('/instructor/InstructorDashboard')}
              style={{
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={18} color="#104a28" />
            </button>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#111827' }}>Quiz Monitoring</h1>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '14px' }}>
                Live alerts for quiz backgrounding, abrupt closures, and other violation events.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setRealtimeEnabled(prev => !prev)}
              style={{
                background: realtimeEnabled ? '#dcfce7' : '#fee2e2',
                color: realtimeEnabled ? '#166534' : '#991b1b',
                border: '1px solid transparent',
                borderRadius: '999px',
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 800
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '999px', background: realtimeEnabled ? '#22c55e' : '#ef4444' }} />
              {realtimeEnabled ? 'Live Monitoring On' : 'Live Monitoring Off'}
            </button>

            <button
              type="button"
              onClick={() => loadLogs(true)}
              style={{
                background: '#104a28',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 18px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700
              }}
            >
              <RefreshCcw size={16} />
              {refreshing ? 'Refreshing...' : 'Refresh Logs'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#104a28', fontWeight: 700 }}>
              <Activity size={18} /> Total Logs
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, marginTop: '10px', color: '#111827' }}>{stats.total}</div>
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b45309', fontWeight: 700 }}>
              <ShieldAlert size={18} /> Background Events
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, marginTop: '10px', color: '#111827' }}>{stats.backgrounded}</div>
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#dc2626', fontWeight: 700 }}>
              <AlertTriangle size={18} /> Closed Events
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, marginTop: '10px', color: '#111827' }}>{stats.closed}</div>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '18px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#111827' }}>Real-time Quiz Violations</h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>
                {lastUpdated ? `Last updated ${lastUpdated.toLocaleTimeString()}` : 'Waiting for data...'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '13px' }}>
              <Clock3 size={15} />
              <span>{realtimeEnabled ? 'Auto-refresh every 10 seconds' : 'Auto-refresh paused'}</span>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading monitoring data...</div>
          ) : logs.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
              <ClipboardList size={36} color="#cbd5e1" style={{ marginBottom: '10px' }} />
              <div>No quiz violations recorded yet.</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                    <th style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Student</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Quiz</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Action</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Details</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} style={{ borderTop: '1px solid #eef2f7' }}>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '999px', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                            {String(log.user_name || log.user_email || '?').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#111827' }}>{log.user_name || 'Unknown Student'}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>{log.user_email || '-'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top', color: '#111827', fontWeight: 600 }}>
                        {log.quiz_title || `Quiz #${log.quiz_id}`}
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          background: log.action === 'App Closed' ? '#fee2e2' : '#fffbeb',
                          color: log.action === 'App Closed' ? '#b91c1c' : '#b45309',
                          fontSize: '12px',
                          fontWeight: 700
                        }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top', color: '#4b5563', maxWidth: '460px', wordBreak: 'break-word' }}>
                        {log.details || '-'}
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'top', color: '#6b7280', whiteSpace: 'nowrap' }}>
                        {formatDateTime(log.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
