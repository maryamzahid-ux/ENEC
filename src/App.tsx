import { useState, useEffect } from 'react';
import { initialAssets, initialAlerts, type Asset, type Alert } from './dataStore';
import { 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Droplet, 
  LayoutDashboard, 
  Radio, 
  ShieldAlert, 
  Thermometer, 
  TrendingUp,
  Zap,
  Lock,
  User,
  CheckCircle,
  X,
  LogOut,
  Flame,
  ChevronRight,
  Shield,
  Wifi,
  Server,
  Brain
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import enecLogo from './assets/enec_logo.png';

const SystemFlow = () => (
  <div style={{ marginBottom: '24px' }}>
    <div className="retrofit-banner" style={{ background: 'linear-gradient(90deg, #eff6ff 0%, #ffffff 100%)', border: '1px solid #bfdbfe', color: '#1e3a8a', marginBottom: '16px', padding: '12px 20px', fontSize: '14px', lineHeight: '1.4' }}>
      <Shield size={20} style={{ flexShrink: 0 }} />
      <span>
        <strong>POC Context:</strong> This POC demonstrates how wireless, battery-powered sensors can be deployed on existing equipment without wiring to enable real-time monitoring and predictive insights across pumps, motors, heaters, and electrical panels.
      </span>
    </div>
    
    <div className="system-flow" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0' }}>
      <div className="flow-node" style={{ flex: 1, cursor: 'default' }}>
        <div className="flow-icon-circle"><Wifi size={24} /></div>
        <span className="flow-label">1. Sensors</span>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
          Wireless, battery-powered capture of vibration, temp, & current.
        </p>
      </div>
      <ChevronRight className="flow-arrow" size={20} style={{ marginTop: '24px' }} />
      <div className="flow-node" style={{ flex: 1, cursor: 'default' }}>
        <div className="flow-icon-circle"><Radio size={24} /></div>
        <span className="flow-label">2. IoT Gateway (BLE/LoRa → Local Server)</span>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
          Collects via BLE / LoRaWAN; relays to local server.
        </p>
      </div>
      <ChevronRight className="flow-arrow" size={20} style={{ marginTop: '24px' }} />
      <div className="flow-node" style={{ flex: 1, cursor: 'default' }}>
        <div className="flow-icon-circle"><Server size={24} /></div>
        <span className="flow-label">3. Local Platform</span>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
          On-premise secure data processing and storage.
        </p>
      </div>
      <ChevronRight className="flow-arrow" size={20} style={{ marginTop: '24px' }} />
      <div className="flow-node" style={{ flex: 1, cursor: 'default' }}>
        <div className="flow-icon-circle"><LayoutDashboard size={24} /></div>
        <span className="flow-label">4. Dashboard</span>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
          Real-time facility-wide monitoring and visualization.
        </p>
      </div>
      <ChevronRight className="flow-arrow" size={20} style={{ marginTop: '24px' }} />
      <div className="flow-node" style={{ flex: 1, cursor: 'default' }}>
        <div className="flow-icon-circle"><Brain size={24} /></div>
        <span className="flow-label">5. AI / Analytics</span>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
          Anomaly detection, trends, and failure prediction.
        </p>
      </div>
    </div>
  </div>
);

const ArchitectureIntro = ({ onContinue }: { onContinue: () => void }) => (
  <div className="intro-container">
    <div className="intro-content">
      <div className="intro-header">
        <img src={enecLogo} alt="ENEC Logo" style={{ height: '80px', marginBottom: '24px' }} />
        <h2>Industrial IoT Architecture</h2>
        <h1>Reliable Assets. Unified Intelligence.</h1>
      </div>

      <div className="intro-flow">
        <div className="intro-node node-1">
          <div className="intro-icon"><Wifi size={40} /></div>
          <span className="intro-node-label">Sensors</span>
          <span className="intro-node-desc">Wireless retrofit sensors for vibration & heat.</span>
        </div>
        <div className="intro-node node-2">
          <div className="intro-icon"><Radio size={40} /></div>
          <span className="intro-node-label">Gateway</span>
          <span className="intro-node-desc">LoRaWAN/BLE Industrial Edge Gateway.</span>
        </div>
        <div className="intro-node node-3">
          <div className="intro-icon"><Server size={40} /></div>
          <span className="intro-node-label">Local Platform</span>
          <span className="intro-node-desc">Secure on-prem data processing layer.</span>
        </div>
        <div className="intro-node node-4">
          <div className="intro-icon"><LayoutDashboard size={40} /></div>
          <span className="intro-node-label">Dashboard</span>
          <span className="intro-node-desc">Real-time alerts & AI-driven diagnostics.</span>
        </div>
      </div>

      <div className="intro-action">
        <button className="primary-btn" onClick={onContinue} style={{ padding: '16px 48px', fontSize: '18px', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)' }}>
          Access Secure Platform <ChevronRight size={24} />
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [appPhase, setAppPhase] = useState<'intro' | 'login' | 'setup' | 'dashboard'>('intro');
  const [activeTab, setActiveTab] = useState<'overview' | 'pumps' | 'panels' | 'predictive' | 'inventory'>('overview');
  const [assets, setAssets] = useState<Asset[]>([]); // Start empty to simulate connection process
  const [alerts] = useState(initialAlerts);

  // Simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(currentAssets => currentAssets.map(asset => {
        const update: any = { ...asset, lastUpdated: new Date().toISOString() };
        
        if (asset.vibration !== undefined) {
          update.vibration = parseFloat((asset.vibration + (Math.random() - 0.5) * 0.1).toFixed(2));
        }
        if (asset.current !== undefined) {
          update.current = parseFloat((asset.current + (Math.random() - 0.5) * 0.5).toFixed(1));
        }
        if (asset.temperature !== undefined) {
          update.temperature = parseFloat((asset.temperature + (Math.random() - 0.5) * 0.5).toFixed(1));
        }

        // Add to history
        const newPoint: any = { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
        };
        if (update.vibration !== undefined) newPoint.vibration = update.vibration;
        if (update.current !== undefined) newPoint.current = update.current;
        if (update.temperature !== undefined) newPoint.temperature = update.temperature;

        update.history = [...asset.history.slice(1), newPoint];

        // Update health status based on thresholds
        if (update.vibration !== undefined) {
          if (update.vibration > 6) update.status = 'critical';
          else if (update.vibration > 3) update.status = 'warning';
          else update.status = 'normal';
        } else if (update.current !== undefined) {
          if (update.current > 18) update.status = 'critical';
          else if (update.current > 15) update.status = 'warning';
          else update.status = 'normal';
        } else if (update.temperature !== undefined) {
          if (update.temperature > 80) update.status = 'critical';
          else if (update.temperature > 60) update.status = 'warning';
          else update.status = 'normal';
        }

        return update;
      }));
    }, 3000); 
    
    return () => clearInterval(interval);
  }, []);


  if (appPhase === 'intro') {
    return <ArchitectureIntro onContinue={() => setAppPhase('login')} />;
  }

  if (appPhase === 'login') {
    return <LoginPage onLogin={() => setAppPhase('setup')} />;
  }

  if (appPhase === 'setup') {
    return <SetupScreen onComplete={() => setAppPhase('dashboard')} onConnectAsset={(asset) => setAssets(prev => [...prev, asset])} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ padding: '16px' }}>
          <img src={enecLogo} alt="ENEC Logo" className="branding-logo" style={{ height: '50px', width: 'auto' }} />
        </div>
        <div className="sidebar-nav">
          <div className="nav-section-title">Operations</div>
          
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

          <div className="nav-section-title" style={{ marginTop: '24px' }}>IoT Infrastructure</div>
          <div className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <Cpu size={20} /> Sensor Inventory
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header" style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Wireless Retrofit Monitoring
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500, maxWidth: '600px' }}>
              Monitoring for pumps, motors, heaters, fans, and electrical panels.
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="meta-badge meta-security" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
              <Shield size={14} /> Isolated On-Prem
            </div>
            <div style={{ height: '32px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <div className="user-profile">
              <div className="avatar" style={{ background: 'var(--accent-blue)' }}>A</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '13px' }}>Admin Portal</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Secure Access</span>
              </div>
            </div>
            <button 
              onClick={() => setAppPhase('intro')}
              style={{ background: 'transparent', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'overview' && <SystemFlow />}
          {activeTab === 'overview' && (
            <div className="grid-3" style={{ marginBottom: '24px' }}>
              <div className="panel kpi-card" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
                <span className="kpi-label">Wireless Nodes Deployed</span>
                <div className="kpi-value" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {assets.length}
                  <span className="badge-wireless" style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '12px' }}>LoRaWAN</span>
                </div>
                <div className="kpi-footer">
                  <span style={{ color: 'var(--text-muted)' }}>100% Wireless Infrastructure</span>
                </div>
              </div>
              
              <div className="panel kpi-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <span className="kpi-label">Retrofit Assets Monitored</span>
                <div className="kpi-value" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {assets.filter(a => a.installationType?.includes('Retrofit')).length}
                  <span className="badge-retrofit" style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '12px' }}>Plug-and-Play</span>
                </div>
                <div className="kpi-footer">
                  <span style={{ color: 'var(--text-muted)' }}>Zero disruption installation</span>
                </div>
              </div>

              <div className="panel kpi-card" style={{ borderLeft: '4px solid #10b981' }}>
                <span className="kpi-label">No Wiring Installations</span>
                <div className="kpi-value" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {assets.length}
                  <span className="badge-battery" style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '12px' }}>Battery Powered</span>
                </div>
                <div className="kpi-footer">
                  <span style={{ color: 'var(--text-muted)' }}>Avg Battery Life: 3.5 Years</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && <FacilityNetwork assets={assets} alerts={alerts} />}
          {activeTab === 'pumps' && <PumpHealth assets={assets.filter(a => a.type === 'Pump')} />}
          {activeTab === 'panels' && <ElectricalPanels assets={assets.filter(a => a.type === 'Panel')} />}
          {activeTab === 'predictive' && <PredictiveMaintenance assets={assets} />}
          {activeTab === 'inventory' && <SensorInventory assets={assets} onAddAsset={(a) => setAssets(prev => [...prev, a])} />}
          
        </div>
      </main>
    </div>
  );
}

function SetupScreen({ onComplete, onConnectAsset }: { onComplete: () => void, onConnectAsset: (asset: Asset) => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [discovered, setDiscovered] = useState<Asset[]>([]);
  const [connected, setConnected] = useState<Asset[]>([]);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setDiscovered([]);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setDiscovered(initialAssets);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const connectAsset = (asset: Asset) => {
    if (connected.find(a => a.id === asset.id)) return;
    
    setConnected(prev => [...prev, asset]);
    onConnectAsset(asset);
  };

  const connectAll = () => {
    const newAssets = discovered.filter(d => !connected.find(c => c.id === d.id));
    setConnected(prev => [...prev, ...newAssets]);
    newAssets.forEach(a => onConnectAsset(a));
  };

  return (
    <div className="setup-container" style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: 'var(--bg-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at top right, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src={enecLogo} alt="ENEC Logo" style={{ height: '60px', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
            Wireless Device Provisioning
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', fontWeight: 500 }}>
            Connect and verify industrial IoT sensors for your facility.
          </p>
        </header>

        <div className="grid-2" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', alignItems: 'start' }}>
          {/* Controls Panel */}
          <div className="panel" style={{ position: 'sticky', top: '40px' }}>
            <div className="panel-header">
              <div className="panel-title"><Radio size={20} color="var(--accent-blue)" /> IoT Gateway Control</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ padding: '20px', backgroundColor: 'var(--bg-subpanel)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Gateway Status</span>
                  <span className="badge normal">Active</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-normal)' }}></div>
                  LoRaWAN Industrial Edge G24
                </div>
              </div>

              {!isScanning && discovered.length === 0 ? (
                <button 
                  className="primary-btn" 
                  onClick={startScan}
                  style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', borderRadius: '40px' }}
                >
                  <Wifi size={20} /> Scan for Nearby Devices
                </button>
              ) : isScanning ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'var(--accent-blue)', transition: 'width 0.1s linear' }}></div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-blue)' }}>Scanning Frequencies... {progress}%</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '16px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', color: '#1e40af', fontSize: '14px', fontWeight: 500 }}>
                    <Wifi size={16} style={{ marginBottom: '4px' }} />
                    Scanning Complete. Found {discovered.length} Nodes ready for provisioning.
                  </div>
                  
                  {connected.length > 0 && (
                    <div style={{ padding: '16px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', color: '#065f46', fontSize: '14px', fontWeight: 500, animation: 'fadeIn 0.3s ease-out' }}>
                      <CheckCircle size={16} style={{ marginBottom: '4px' }} />
                      Provisioning Successful. {connected.length} Sensors Connected to Gateway.
                    </div>
                  )}

                  <button 
                    className="secondary-btn" 
                    onClick={startScan}
                    style={{ borderRadius: '40px' }}
                  >
                    Rescan Frequencies
                  </button>
                  {connected.length > 0 && (
                    <button 
                      className="primary-btn" 
                      onClick={onComplete}
                      style={{ borderRadius: '40px', padding: '16px', marginTop: '12px', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }}
                    >
                      Enter Facility Dashboard <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Devices List */}
          <div className="panel" style={{ minHeight: '500px' }}>
            <div className="panel-header">
              <div className="panel-title"><Cpu size={20} /> Discovered & Connected Devices</div>
              {discovered.length > 0 && connected.length < discovered.length && (
                <button className="text-btn" onClick={connectAll} style={{ color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}>Connect All</button>
              )}
            </div>

            {discovered.length === 0 && !isScanning ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', opacity: 0.5 }}>
                 <Wifi size={48} style={{ marginBottom: '16px' }} />
                 <p style={{ fontWeight: 500 }}>No devices discovered yet.</p>
                 <p style={{ fontSize: '13px' }}>Click "Scan" to find wireless sensors in range.</p>
              </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Connected Section */}
                  {connected.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--status-normal)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={14} /> Connected Nodes ({connected.length})
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {connected.map(asset => (
                          <div key={asset.id} className="setup-device-card connected" style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1px solid #bbf7d0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#f0fdf4',
                            transition: 'all 0.2s ease'
                          }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                                {asset.type === 'Pump' ? <Droplet size={16} /> : <Zap size={16} />}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '14px' }}>{asset.id}</div>
                                <div style={{ fontSize: '11px', color: '#166534' }}>{asset.name}</div>
                              </div>
                            </div>
                            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px' }}>CONNECTED</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Discovered Section */}
                  {discovered.filter(d => !connected.find(c => c.id === d.id)).length > 0 ? (
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Available for Provisioning ({discovered.length - connected.length})
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {discovered.filter(d => !connected.find(c => c.id === d.id)).map(asset => (
                          <div key={asset.id} className="setup-device-card" style={{
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'var(--bg-panel)',
                            transition: 'all 0.2s ease'
                          }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                {asset.type === 'Pump' ? <Droplet size={20} /> : <Zap size={20} />}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '15px' }}>{asset.id}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{asset.name} • {asset.type}</div>
                              </div>
                            </div>
                            <button 
                              className="secondary-btn" 
                              onClick={() => connectAsset(asset)}
                              style={{ padding: '6px 16px', fontSize: '12px', borderRadius: '20px' }}
                            >
                              Connect
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (discovered.length > 0 && connected.length === discovered.length) ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--status-normal)', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                      <CheckCircle size={32} style={{ marginBottom: '12px' }} />
                      <p style={{ fontWeight: 700 }}>All discovered sensors connected successfully.</p>
                    </div>
                  ) : null}
                </div>
            )}
          </div>
        </div>
      </div>
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
          <img src={enecLogo} alt="ENEC Logo" style={{ height: '80px', marginBottom: '24px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>Monitoring Platform</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Emirates Nuclear Energy Corporation</p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span className="meta-badge meta-security"><Shield size={12} /> Secure On-Prem</span>
          </div>
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
  const resolvedAlerts = [
    { id: 'ALT-RE-01', asset: 'PMP-101', issue: 'Minor Vib Deviation', resolved: '2026-03-23 14:20' },
    { id: 'ALT-RE-02', asset: 'FAN-402', issue: 'Sensor Calibration', resolved: '2026-03-23 09:15' },
    { id: 'ALT-RE-03', asset: 'MTR-A2', issue: 'Load Balancing', resolved: '2026-03-22 18:45' },
  ];

  return (
    <div className="grid-3" style={{ alignItems: 'start' }}>
      <div className="panel" style={{ gridColumn: 'span 2' }}>
        <div className="panel-header">
          <div className="panel-title"><Activity size={20} /> Field Equipment & Sensor Mapping</div>
        </div>
        <table className="asset-list">
          <thead>
            <tr>
              <th>Equipment / Sensor Mapping</th>
              <th>Type</th>
              <th>Connectivity</th>
              <th>Health Status</th>
              <th>Real-time Telemetry</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>
                  <div className="asset-name">
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{asset.id}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {asset.name} → {asset.type === 'Motor' ? 'Current (A)' : 
                                      asset.type === 'Heater' || asset.type === 'Panel' ? 'Temp (°C)' : 
                                      'Vibration (mm/s)'}
                    </div>
                  </div>
                </td>
                <td>{asset.type}</td>
                <td>
                  <div className="connectivity-chip">
                    <div className="connectivity-item"><Wifi size={12} style={{ color: 'var(--accent-blue)' }} /> LoRaWAN Node</div>
                    <div className="connectivity-item"><Zap size={12} style={{ color: asset.batteryStatus! < 20 ? 'var(--status-critical)' : '#f59e0b' }} /> {asset.batteryStatus}% Battery</div>
                    <div className="connectivity-item" style={{ color: '#10b981', fontWeight: 600 }}>No Wiring Required</div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${asset.status} ${asset.status === 'critical' ? 'pulse-critical' : ''}`}>
                    {asset.status === 'normal' ? 'Healthy' : asset.status}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: asset.status === 'critical' ? 'var(--status-critical)' : 'inherit' }}>
                    {asset.type === 'Pump' || asset.type === 'Fan' ? `${asset.vibration!.toFixed(2)} mm/s` : 
                     asset.type === 'Motor' ? `${asset.current!.toFixed(1)} A` : 
                     `${asset.temperature!.toFixed(1)} °C`}
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
                <h4 style={{ fontWeight: 700 }}>{alert.assetId} - {alert.assetName}</h4>
                <p style={{ fontWeight: 500 }}>{alert.message}</p>
                <div className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          {alerts.filter(a => a.active).length === 0 && (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active alerts. System healthy.
            </div>
          )}
        </div>

        <div className="panel-header" style={{ marginTop: '24px' }}>
          <div className="panel-title" style={{ fontSize: '14px' }}>Resolved Alert History</div>
        </div>
        <div className="resolved-alerts">
          {resolvedAlerts.map(ra => (
            <div key={ra.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{ra.asset}</div>
                <div style={{ color: 'var(--text-muted)' }}>{ra.issue}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--status-normal)', fontWeight: 600 }}>RESOLVED</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{ra.resolved}</div>
              </div>
            </div>
          ))}
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
            const vibVal = pump.vibration || 1.5;
            const tempVal = pump.temperature || 40;
            const healthScore = Math.max(0, Math.min(100, Math.round(100 - (vibVal - 1.0) * 8 - (tempVal - 40) * 1.5)));
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
                  <span style={{ fontWeight: 700 }}>{pump.id}</span>
                  <span className={`badge ${pump.status}`}>{pump.status === 'normal' ? 'Healthy' : pump.status}</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>{pump.name}</div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span className="meta-badge badge-wireless">Wireless</span>
                  <span className="meta-badge badge-battery">{pump.batteryStatus}% Batt</span>
                  <span className="meta-badge badge-retrofit">Retrofit</span>
                </div>
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
          {selectedPump.temperature !== undefined && (
            <div className="telemetry-box">
              <div className="telemetry-label"><Thermometer size={16}/> Temperature</div>
              <div className="telemetry-value">
                {selectedPump.temperature.toFixed(1)}<span className="telemetry-unit">°C</span>
              </div>
            </div>
          )}
          <div className="telemetry-box" style={{ borderColor: selectedPump.vibration! > 6 ? 'var(--status-critical)' : 'var(--border-color)' }}>
             <div className="telemetry-label"><Activity size={16}/> Vibration Velocity</div>
            <div className="telemetry-value" style={{ color: selectedPump.vibration! > 6 ? 'var(--status-critical)' : 'inherit' }}>
              {selectedPump.vibration!.toFixed(2)}<span className="telemetry-unit">mm/s</span>
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><CheckCircle size={16}/> Installation</div>
            <div className="telemetry-value" style={{ fontSize: '1rem', color: '#10b981' }}>
              {selectedPump.installationType}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px' }}>Historical Trends</h4>
          <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedPump.history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Line isAnimationActive={false} type="monotone" dataKey="vibration" name="Vibration (mm/s)" stroke="var(--accent-blue)" strokeWidth={3} dot={false} />
                {selectedPump.temperature !== undefined && (
                  <Line isAnimationActive={false} type="monotone" dataKey="temperature" name="Temp (°C)" stroke="var(--status-critical)" strokeWidth={2} dot={false} />
                )}
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
                  <Brain size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{asset.id} Analysis</h3>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{asset.name}</div>
                    </div>
                    <div className={`risk-level ${asset.status === 'critical' ? 'risk-high' : 'risk-medium'}`}>
                      Failure Risk: {asset.status === 'critical' ? 'High' : 'Medium'}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-main)', marginBottom: '16px', fontWeight: 500, borderLeft: '3px solid var(--accent-blue)', paddingLeft: '12px' }}>
                    {asset.prediction}
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-dark)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', width: '100%' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pattern Deviation Analysis vs Baseline
                </h4>
                <div className="grid-3" style={{ gap: '16px' }}>
                  <div className="prediction-stat">
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {asset.current !== undefined ? <Zap size={14} /> : 
                       asset.vibration !== undefined ? <Activity size={14} /> : 
                       <Thermometer size={14} />} 
                      Real-time Reading vs Baseline
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                      <div style={{ fontSize: '28px', fontWeight: 800 }}>
                        {asset.current !== undefined ? `${asset.current.toFixed(1)} A` : 
                         asset.vibration !== undefined ? `${asset.vibration.toFixed(2)}` : 
                         `${asset.temperature!.toFixed(1)}°C`}
                      </div>
                      <span className={`stat-diff ${asset.status === 'normal' ? 'negative' : 'positive'}`} style={{ fontSize: '14px' }}>
                        {asset.status === 'normal' ? '-2%' : asset.status === 'warning' ? '+28%' : '+42%'} deviation
                      </span>
                    </div>
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Failure Risk:</div>
                      <span className={`badge risk-${asset.status === 'normal' ? 'low' : asset.status === 'warning' ? 'medium' : 'high'}`} style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                        {asset.status === 'normal' ? 'LOW' : asset.status === 'warning' ? 'MEDIUM' : 'HIGH'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ height: '120px', marginTop: '20px' }}>
                   <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={asset.history}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={asset.status === 'critical' ? 'var(--status-critical)' : 'var(--accent-blue)'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={asset.status === 'critical' ? 'var(--status-critical)' : 'var(--accent-blue)'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                      />
                      <Area type="monotone" dataKey="vibration" stroke={asset.status === 'critical' ? 'var(--status-critical)' : 'var(--accent-blue)'} fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="prediction-details" style={{ width: '100%', marginTop: '0', paddingTop: '16px' }}>
                <div>
                  <span className="detail-label">Est. Time to Failure</span>
                  <span className="detail-value" style={{ color: asset.status === 'critical' ? 'var(--status-critical)' : 'var(--text-main)', fontSize: '16px' }}>
                    {asset.status === 'critical' ? '18 Hours (High Urgency)' : '4-6 Days (Monitor)'}
                  </span>
                </div>
                <div>
                  <span className="detail-label">Confidence Score</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--bg-dark)', borderRadius: '3px' }}>
                      <div style={{ width: asset.status === 'critical' ? '94%' : '78%', height: '100%', backgroundColor: 'var(--status-normal)', borderRadius: '3px' }}></div>
                    </div>
                    <span style={{ fontWeight: 700 }}>{asset.status === 'critical' ? '94%' : '78%'}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button 
                    className="primary-btn"
                    onClick={() => initiateWorkOrder(asset)}
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    Generate Actionable Work Order
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
              className={`thermal-card ${selectedPanel.id === panel.id ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700 }}>{panel.id}</span>
                <span className={`badge ${panel.status}`}>{panel.status === 'normal' ? 'Healthy' : panel.status}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{panel.name}</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                <span className="meta-badge badge-wireless" style={{ fontSize: '8px', padding: '1px 4px' }}>Wireless</span>
                <span className="meta-badge badge-retrofit" style={{ fontSize: '8px', padding: '1px 4px' }}>Retrofit</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '18px', marginTop: '8px' }}>
                {panel.temperature?.toFixed(1)}°C
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="panel-header" style={{ marginBottom: 0 }}>
          <div className="panel-title"><Flame size={20} /> Thermography Analysis - {selectedPanel.id}</div>
        </div>
        
        <div className="grid-3">
          <div className="telemetry-box" style={{ borderColor: selectedPanel.status !== 'normal' ? (selectedPanel.status === 'critical' ? 'var(--status-critical)' : 'var(--status-warning)') : 'var(--border-color)' }}>
            <div className="telemetry-label"><Thermometer size={16}/> IR Temperature</div>
            <div className="telemetry-value" style={{ color: selectedPanel.status !== 'normal' ? (selectedPanel.status === 'critical' ? 'var(--status-critical)' : 'var(--status-warning)') : 'inherit' }}>
              {selectedPanel.temperature!.toFixed(1)}<span className="telemetry-unit">°C</span>
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><CheckCircle size={16}/> Health Status</div>
            <div className="telemetry-value" style={{ textTransform: 'capitalize', color: selectedPanel.status === 'critical' ? 'var(--status-critical)' : selectedPanel.status === 'warning' ? 'var(--status-warning)' : 'var(--status-normal)' }}>
              {selectedPanel.status === 'normal' ? 'Healthy' : selectedPanel.status}
            </div>
          </div>
          <div className="telemetry-box">
             <div className="telemetry-label"><Shield size={16}/> Protocol</div>
            <div className="telemetry-value" style={{ fontSize: '1rem' }}>
              Secure On-Prem
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px' }}>Thermal Trend Analysis</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedPanel.history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={['auto', 'auto']} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
              />
              <Line isAnimationActive={false} type="monotone" dataKey="temperature" name="Temp °C" stroke="var(--status-critical)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SensorInventory({ assets, onAddAsset }: { assets: Asset[], onAddAsset: (a: Asset) => void }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNode, setNewNode] = useState<{id: string, name: string, type: Asset['type']}>({
    id: '',
    name: '',
    type: 'Pump'
  });

  const handleAddAsset = () => {
    if(!newNode.id || !newNode.name) return;
    
    const asset: Asset = {
      id: newNode.id,
      name: newNode.name,
      type: newNode.type,
      zone: 'Zone 4 - External Area',
      status: 'normal',
      vibration: newNode.type === 'Pump' ? 1.0 : undefined,
      temperature: newNode.type === 'Panel' || newNode.type === 'Heater' ? 35.0 : undefined,
      current: newNode.type === 'Motor' ? 10.0 : undefined,
      batteryStatus: 100,
      rssi: -55,
      installationType: 'Retrofit - Wireless Node',
      lastUpdated: new Date().toISOString(),
      history: [],
      prediction: null
    };

    onAddAsset(asset);
    setShowAddModal(false);
    setNewNode({ id: '', name: '', type: 'Pump' });
  };

  return (
    <div className="panel" style={{ position: 'relative' }}>
      <div className="panel-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="panel-title"><Cpu size={20} /> IoT Sensor Inventory & Connectivity Status</div>
        <button className="primary-btn" onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}>
          <Wifi size={16} /> Provision New Sensor
        </button>
      </div>

      <div className="inventory-grid">
        {assets.map(asset => (
          <div key={asset.id} className="sensor-card">
            <div className="sensor-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: 'var(--bg-subpanel)', borderRadius: '8px', color: 'var(--accent-blue)' }}>
                  <Wifi size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px' }}>{asset.id.includes('-') ? `NODE-${asset.id.split('-')[1]}` : `NODE-${asset.id}`}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>LoRaWAN Node v2.1</div>
                </div>
              </div>
              <span className={`badge ${asset.status}`} style={{ fontSize: '10px' }}>{asset.status === 'normal' ? 'Online' : 'Warning'}</span>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div className="sensor-info-row" style={{ marginBottom: '8px' }}>
                <span>Mapped Equipment:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{asset.id}</span>
              </div>
              <div className="sensor-info-row">
                <span>Signal Strength:</span>
                <span style={{ color: asset.rssi! < -80 ? 'var(--status-critical)' : 'var(--status-normal)', fontWeight: 700 }}>{asset.rssi} dBm</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                <span>Battery Level</span>
                <span style={{ color: asset.batteryStatus! < 20 ? 'var(--status-critical)' : 'inherit' }}>{asset.batteryStatus}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${asset.batteryStatus}%`, 
                  height: '100%', 
                  backgroundColor: asset.batteryStatus! < 20 ? 'var(--status-critical)' : 'var(--status-normal)',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <Activity size={12} /> Last Uplink: {new Date(asset.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <button 
                className="text-btn" 
                style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 700, padding: 0 }}
                onClick={() => alert(`Opening advanced configuration for ${asset.id}`)}
              >
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Provision New Sensor</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label>Node ID / Tag MAC</label>
                  <input 
                    type="text" 
                    className="modal-select" 
                    placeholder="e.g. SENSOR-901" 
                    value={newNode.id} 
                    onChange={e => setNewNode({...newNode, id: e.target.value})} 
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="form-group">
                  <label>Asset Name</label>
                  <input 
                    type="text" 
                    className="modal-select" 
                    placeholder="e.g. Cooling Fan 5" 
                    value={newNode.name} 
                    onChange={e => setNewNode({...newNode, name: e.target.value})} 
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="form-group">
                  <label>Device Type</label>
                  <select 
                    className="modal-select" 
                    value={newNode.type} 
                    onChange={e => setNewNode({...newNode, type: e.target.value as any})}
                    style={{ width: '100%' }}
                  >
                    <option value="Pump">Pump-Vibration</option>
                    <option value="Motor">Motor-Current</option>
                    <option value="Fan">Fan-Vibration</option>
                    <option value="Panel">Electrical Panel-Thermal</option>
                    <option value="Heater">Heater-Thermal</option>
                  </select>
                </div>
                <button 
                  className="primary-btn" 
                  onClick={handleAddAsset}
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  Confirm Provisioning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
