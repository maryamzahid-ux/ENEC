import { useState, useEffect } from 'react';
import { initialAssets, initialAlerts, type Asset, type Alert } from './dataStore';
import { 
  Activity, 
  AlertTriangle, 
  BarChart2, 
  Cpu, 
  Database, 
  Droplet, 
  LayoutDashboard, 
  Radio, 
  ShieldAlert, 
  Thermometer, 
  TrendingUp,
  Volume2,
  Zap,
  Lock,
  User,
  CheckCircle,
  X,
  LogOut,
  Flame
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'pumps' | 'panels' | 'predictive'>('overview');
  const [assets, setAssets] = useState(initialAssets);
  const [alerts] = useState(initialAlerts);

  // Simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(currentAssets => currentAssets.map(asset => {
        const tempFluctuation = (Math.random() - 0.5) * 0.5;
        const vibFluctuation = (Math.random() - 0.5) * 0.1;
        const currentFluctuation = asset.power > 0 ? (Math.random() - 0.5) * 2.0 : 0;
        const acousticFluctuation = (Math.random() - 0.5) * 2.0;
        
        const newTemp = asset.temperature + tempFluctuation;
        const newVib = asset.vibration + vibFluctuation;
        const newCurrent = asset.power + currentFluctuation;
        const newAcoustic = asset.acoustic + acousticFluctuation;
        
        return {
          ...asset,
          temperature: parseFloat(newTemp.toFixed(1)),
          vibration: parseFloat(newVib.toFixed(2)),
          power: asset.power > 0 ? parseFloat(newCurrent.toFixed(1)) : 0,
          acoustic: parseFloat(newAcoustic.toFixed(1)),
          lastUpdated: new Date().toISOString(),
          history: [
            ...asset.history.slice(1),
            {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              temperature: parseFloat(newTemp.toFixed(1)),
              vibration: parseFloat(newVib.toFixed(2)),
              current: asset.power > 0 ? parseFloat(newCurrent.toFixed(1)) : 0,
              acoustic: parseFloat(newAcoustic.toFixed(1)),
            }
          ]
        };
      }));
    }, 3000); 
    
    return () => clearInterval(interval);
  }, []);

  const criticalCount = assets.filter(a => a.status === 'critical').length;
  const warningCount = assets.filter(a => a.status === 'warning').length;
  const normalCount = assets.filter(a => a.status === 'normal').length;

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Database color="var(--accent-blue)" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '18px' }}>ENEC</h1>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Monitoring Platform</span>
          </div>
        </div>
        <div className="sidebar-nav">
          <div className="nav-section-title">Modules</div>
          
          <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Dashboard Overview
          </div>
          
          <div className={`nav-item ${activeTab === 'pumps' ? 'active' : ''}`} onClick={() => setActiveTab('pumps')}>
            <Activity size={20} /> Pump Health
          </div>
          
          <div className={`nav-item ${activeTab === 'panels' ? 'active' : ''}`} onClick={() => setActiveTab('panels')}>
            <Flame size={20} /> Thermal Hotspots
          </div>
          
          <div className={`nav-item ${activeTab === 'predictive' ? 'active' : ''}`} onClick={() => setActiveTab('predictive')}>
            <TrendingUp size={20} /> Predictive Maint.
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-title">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'pumps' && 'Pump Health Monitoring'}
            {activeTab === 'panels' && 'Thermal Hotspot Detection'}
            {activeTab === 'predictive' && 'Predictive Maintenance Insights'}
          </div>
          <div className="topbar-actions">
            <Radio size={20} color="var(--status-normal)" />
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>Gateway: ONLINE</span>
            <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)', margin: '0 8px' }}></div>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span>Admin</span>
            </div>
            <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)', margin: '0 8px' }}></div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="grid-4" style={{ marginBottom: '24px' }}>
              <div className="panel kpi-card">
                <span className="kpi-label">Total Assets Monitored</span>
                <div className="kpi-value">{assets.length}</div>
                <div className="kpi-footer">
                  <span className="trend-up" style={{ color: 'var(--status-normal)' }}>+1 this week</span>
                </div>
              </div>
              
              <div className="panel kpi-card">
                <span className="kpi-label">Active Alerts</span>
                <div className="kpi-value" style={{ color: alerts.filter(a => a.active).length > 0 ? 'var(--status-warning)' : 'var(--text-main)'}}>
                  {alerts.filter(a => a.active).length}
                </div>
                <div className="kpi-footer">
                  <span className="trend-down" style={{ color: 'var(--status-normal)' }}>2 resolved today</span>
                </div>
              </div>

              <div className="panel kpi-card">
                <span className="kpi-label">Critical / Warning</span>
                <div className="kpi-value" style={{ color: criticalCount > 0 ? 'var(--status-critical)' : 'var(--status-warning)' }}>
                  {criticalCount} <span style={{ color: 'var(--text-muted)' }}>/</span> {warningCount}
                </div>
                <div className="kpi-footer">
                  <span style={{ color: 'var(--text-muted)' }}>Requires attention</span>
                </div>
              </div>

              <div className="panel kpi-card">
                <span className="kpi-label">System Health</span>
                <div className="kpi-value" style={{ color: 'var(--status-normal)' }}>
                  {Math.round((normalCount / assets.length) * 100)}%
                </div>
                <div className="kpi-footer">
                  <span style={{ color: 'var(--text-muted)' }}>Overall operational readiness</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && <FacilityNetwork assets={assets} alerts={alerts} />}
          {activeTab === 'pumps' && <PumpHealth assets={assets.filter(a => a.type === 'Pump')} />}
          {activeTab === 'panels' && <ElectricalPanels assets={assets.filter(a => a.type === 'Panel')} />}
          {activeTab === 'predictive' && <PredictiveMaintenance assets={assets} />}
          
        </div>
      </main>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('admin@nexus.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Database color="var(--accent-blue)" size={40} style={{ marginBottom: '16px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>ENEC Monitoring Platform</h1>
          <p style={{ color: 'var(--text-muted)' }}>Emirates Nuclear Energy Corporation</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="login-btn">
            {isLogin ? 'Secure Login' : 'Create Account'}
          </button>
        </form>

        <div className="login-footer">
          <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'var(--accent-blue)' }}>
            {isLogin ? 'Need access? Sign up' : 'Already have an account? Log in'}
          </span>
        </div>
      </div>
    </div>
  );
}

function FacilityNetwork({ assets, alerts }: { assets: Asset[], alerts: Alert[] }) {
  return (
    <div className="grid-3">
      <div className="panel" style={{ gridColumn: 'span 2' }}>
        <div className="panel-header">
          <div className="panel-title"><LayoutDashboard size={20} /> Asset Overview</div>
        </div>
        <table className="asset-list">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Zone</th>
              <th>Status</th>
              <th>Telemetry (Temp / Vib)</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>
                  <div className="asset-name">
                    <div style={{ fontWeight: 600 }}>{asset.id}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{asset.name}</div>
                  </div>
                </td>
                <td>{asset.type}</td>
                <td>{asset.zone}</td>
                <td>
                  <span className={`badge ${asset.status} ${asset.status === 'critical' ? 'pulse-critical' : ''}`}>
                    {asset.status}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>
                    {asset.temperature.toFixed(1)}°C <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>|</span> {asset.vibration.toFixed(2)}mm/s
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="panel-title"><ShieldAlert size={20} /> Active Alerts</div>
        </div>
        <div className="alerts-container">
          {alerts.filter(a => a.active).map(alert => (
             <div key={alert.id} className={`alert-item ${alert.severity}`}>
              <div className="alert-icon">
                <AlertTriangle size={16} />
              </div>
              <div className="alert-content">
                <h4>{alert.assetId} - {alert.assetName}</h4>
                <p>{alert.message}</p>
                <div className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          {alerts.filter(a => a.active).length === 0 && (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active alerts. System operating normally.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PumpHealth({ assets }: { assets: Asset[] }) {
  const [selectedPumpId, setSelectedPumpId] = useState<string>(assets[0]?.id || '');
  const selectedPump = assets.find(a => a.id === selectedPumpId) || assets[0];

  if (!selectedPump) return null;

  return (
    <div className="grid-3">
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="panel-header">
          <div className="panel-title"><Droplet size={20} /> Pump Assets</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {assets.map(pump => {
            const healthScore = Math.max(0, Math.min(100, Math.round(100 - (pump.vibration - 1.0) * 8 - (pump.temperature - 40) * 1.5)));
            let healthColor = 'var(--status-normal)';
            if (pump.status === 'warning') healthColor = 'var(--status-warning)';
            if (pump.status === 'critical') healthColor = 'var(--status-critical)';
            
            return (
              <div 
                key={pump.id} 
                onClick={() => setSelectedPumpId(pump.id)}
                className={`pump-card ${selectedPump.id === pump.id ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{pump.id}</span>
                  <span className={`badge ${pump.status}`}>{pump.status}</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{pump.name}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: healthColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Activity size={12} /> Health Score: {healthScore}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="panel-header" style={{ marginBottom: 0 }}>
          <div className="panel-title"><Activity size={20} /> Telemetry Analysis - {selectedPump.id}</div>
        </div>
        
        <div className="grid-3">
          <div className="telemetry-box">
            <div className="telemetry-label"><Thermometer size={16}/> Current Temperature</div>
            <div className="telemetry-value">
              {selectedPump.temperature.toFixed(1)}<span className="telemetry-unit">°C</span>
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><Activity size={16}/> Vibration Velocity</div>
            <div className="telemetry-value">
              {selectedPump.vibration.toFixed(2)}<span className="telemetry-unit">mm/s</span>
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><Zap size={16}/> Motor Current</div>
            <div className="telemetry-value">
              {selectedPump.power.toFixed(1)}<span className="telemetry-unit">A</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px' }}>Historical Trends</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedPump.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#ef4444" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '14px' }}
              />
              <Line isAnimationActive={false} yAxisId="left" type="monotone" dataKey="temperature" name="Temp °C" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line isAnimationActive={false} yAxisId="right" type="monotone" dataKey="vibration" name="Vib mm/s" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line isAnimationActive={false} yAxisId="right" type="monotone" dataKey="current" name="Motor Current (A)" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function PredictiveMaintenance({ assets }: { assets: Asset[] }) {
  const assetsWitPredictions = assets.filter(a => a.prediction !== null);
  const [workOrderAsset, setWorkOrderAsset] = useState<Asset | null>(null);
  const [workOrderStep, setWorkOrderStep] = useState(1);
  
  const initiateWorkOrder = (asset: Asset) => {
    setWorkOrderAsset(asset);
    setWorkOrderStep(1);
  };

  const closeWorkOrder = () => {
    setWorkOrderAsset(null);
    setWorkOrderStep(1);
  };
  
  return (
    <div className="panel" style={{ position: 'relative' }}>
      <div className="panel-header" style={{ marginBottom: '24px' }}>
        <div className="panel-title"><TrendingUp size={20} /> AI Diagnostic Insights - Pattern Deviation Analysis</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {assetsWitPredictions.length > 0 ? (
          assetsWitPredictions.map(asset => (
            <div key={asset.id} className="prediction-card" style={{ flexDirection: 'column', padding: '24px', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', width: '100%' }}>
                <div className={`prediction-icon ${asset.status}`}>
                  <BarChart2 size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{asset.name} ({asset.id})</h3>
                  </div>
                  <p style={{ color: '#cbd5e1', marginBottom: '16px' }}>{asset.prediction}</p>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-dark)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>Time-Series Anomaly Detection (Current vs Baseline)</h4>
                <div className="grid-3" style={{ gap: '16px' }}>
                  <div style={{ padding: '12px', backgroundColor: 'var(--bg-panel)', borderRadius: '6px', border: asset.status === 'critical' ? '1px dashed var(--status-critical)' : '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Thermometer size={14} /> Temperature</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0', color: asset.status === 'critical' ? 'var(--status-critical)' : 'var(--text-main)' }}>{asset.temperature.toFixed(1)}°C</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Baseline limit: 70.0°C</div>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: 'var(--bg-panel)', borderRadius: '6px', border: '1px dashed var(--status-warning)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Volume2 size={14} /> Acoustic (Abnormal Noise)</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0', color: 'var(--status-warning)' }}>{asset.acoustic.toFixed(1)} dB</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Baseline: ~60.0 dB (Grinding detected)</div>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: 'var(--bg-panel)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={14} /> Motor Current (Load behavior)</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0' }}>{asset.power.toFixed(1)} A</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Load tracking slightly elevated.</div>
                  </div>
                </div>
              </div>
              
              <div className="prediction-details" style={{ width: '100%', marginTop: '0', paddingTop: '16px' }}>
                <div>
                  <span className="detail-label">Time to Failure (Est)</span>
                  <span className="detail-value" style={{ color: 'var(--text-main)' }}>
                    {asset.status === 'critical' ? '< 24 Hours' : '3-5 Days'}
                  </span>
                </div>
                <div>
                  <span className="detail-label">Pattern Deviation Alert</span>
                  <span className="detail-value" style={{ color: 'var(--status-warning)' }}>
                    {asset.temperature > 80 ? 'Thermal Drift' : asset.acoustic > 90 ? 'Acoustic / Vibration Variance' : 'Load Tracking Elevated'}
                  </span>
                </div>
                <div>
                  <span className="detail-label">Recommended Action</span>
                  <button 
                    onClick={() => initiateWorkOrder(asset)}
                    style={{ 
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--accent-blue)', 
                      cursor: 'pointer', 
                      textDecoration: 'underline',
                      padding: 0,
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      fontWeight: 600
                    }}
                  >
                    Schedule Work Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Cpu size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#e2e8f0', marginBottom: '8px' }}>No Predictive Maintenance Warnings</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
              All monitored equipment is currently operating within their specified operational profiles and historical limits.
            </p>
          </div>
        )}
      </div>

      {/* Work Order Modal Overlay */}
      {workOrderAsset && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Create Work Order</h3>
              <button 
                onClick={closeWorkOrder}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              {/* Stepper */}
              <div className="stepper">
                <div className={`step ${workOrderStep >= 1 ? 'active' : ''}`}>1. Details</div>
                <div className={`step-line ${workOrderStep >= 2 ? 'active' : ''}`}></div>
                <div className={`step ${workOrderStep >= 2 ? 'active' : ''}`}>2. Assign</div>
                <div className={`step-line ${workOrderStep >= 3 ? 'active' : ''}`}></div>
                <div className={`step ${workOrderStep >= 3 ? 'active' : ''}`}>3. Confirm</div>
              </div>

              {workOrderStep === 1 && (
                <div className="step-content">
                  <h4 style={{ marginBottom: '16px' }}>Verify Issue Details</h4>
                  <div className="modal-info-box">
                    <div><strong>Asset:</strong> {workOrderAsset.name} ({workOrderAsset.id})</div>
                    <div><strong>Zone:</strong> {workOrderAsset.zone}</div>
                    <div style={{ marginTop: '8px', color: 'var(--status-warning)' }}>
                      <strong>AI Diagnosis:</strong> {workOrderAsset.prediction}
                    </div>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Priority</label>
                      <select className="modal-select">
                        <option>Critical (Resolve in 24h)</option>
                        <option>High (Resolve in 3d)</option>
                        <option>Medium (Resolve in 7d)</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Work Type</label>
                      <select className="modal-select">
                        <option>Inspection & Calibration</option>
                        <option>Part Replacement</option>
                        <option>Complete Overhaul</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="primary-btn" onClick={() => setWorkOrderStep(2)}>Next Step</button>
                  </div>
                </div>
              )}

              {workOrderStep === 2 && (
                <div className="step-content">
                  <h4 style={{ marginBottom: '16px' }}>Assign Maintenance Team</h4>
                  <div className="form-group">
                    <label>Select Team/Technician</label>
                    <select className="modal-select" style={{ width: '100%' }}>
                      <option>Mechanical Team Alpha</option>
                      <option>Mechanical Team Beta</option>
                      <option>Electrical Support</option>
                      <option>External Contractor</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Additional Notes (Optional)</label>
                    <textarea 
                      className="modal-textarea" 
                      rows={3} 
                      placeholder="Enter specific instructions or safety protocols..."
                      defaultValue="Please verify acoustic deviation readings before disassembly."
                    ></textarea>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="secondary-btn" onClick={() => setWorkOrderStep(1)}>Back</button>
                    <button className="primary-btn" onClick={() => setWorkOrderStep(3)}>Review & Submit</button>
                  </div>
                </div>
              )}

              {workOrderStep === 3 && (
                <div className="step-content" style={{ textAlign: 'center', padding: '32px 0' }}>
                  <CheckCircle size={64} color="var(--status-normal)" style={{ marginBottom: '16px' }} />
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Work Order WO-4927 Generated</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Team Alpha has been notified and the asset schedule has been updated.
                  </p>
                  <button className="primary-btn" onClick={closeWorkOrder}>Close & Return to Dashboard</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ElectricalPanels({ assets }: { assets: Asset[] }) {
  const [selectedPanelId, setSelectedPanelId] = useState<string>(assets[0]?.id || '');
  const selectedPanel = assets.find(a => a.id === selectedPanelId) || assets[0];

  if(!selectedPanel) return null;

  return (
    <div className="grid-3">
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="panel-header">
          <div className="panel-title"><Zap size={20} /> Electrical Panels</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {assets.map(panel => (
            <div 
              key={panel.id} 
              onClick={() => setSelectedPanelId(panel.id)}
              className={`pump-card ${selectedPanel.id === panel.id ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>{panel.id}</span>
                <span className={`badge ${panel.status}`}>{panel.status}</span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{panel.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="panel-header" style={{ marginBottom: 0 }}>
          <div className="panel-title"><Flame size={20} /> Thermography Analysis - {selectedPanel.id}</div>
        </div>
        
        <div className="grid-3">
          <div className="telemetry-box" style={{ borderColor: selectedPanel.temperature > 70 ? 'var(--status-critical)' : selectedPanel.temperature > 50 ? 'var(--status-warning)' : 'var(--border-color)' }}>
            <div className="telemetry-label"><Thermometer size={16}/> IR Temperature</div>
            <div className="telemetry-value" style={{ color: selectedPanel.temperature > 70 ? 'var(--status-critical)' : 'inherit' }}>
              {selectedPanel.temperature.toFixed(1)}<span className="telemetry-unit">°C</span>
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><Zap size={16}/> Load Power</div>
            <div className="telemetry-value">
              {selectedPanel.power.toFixed(1)}<span className="telemetry-unit">kW</span>
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><Activity size={16}/> Panel Health</div>
            <div className="telemetry-value" style={{ textTransform: 'capitalize', color: selectedPanel.status === 'critical' ? 'var(--status-critical)' : selectedPanel.status === 'warning' ? 'var(--status-warning)' : 'var(--status-normal)' }}>
              {selectedPanel.status}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px' }}>Thermal Trend Analysis</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedPanel.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} stroke="#ef4444" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '14px' }}
              />
              <Line isAnimationActive={false} type="monotone" dataKey="temperature" name="Temp °C" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
