export type AssetStatus = 'normal' | 'warning' | 'critical';

export interface Asset {
  id: string;
  name: string;
  type: 'Pump' | 'Motor' | 'Heater' | 'Fan' | 'Panel';
  zone: string;
  status: AssetStatus;
  temperature: number;
  vibration: number;
  power: number;
  acoustic: number; // dB
  lastUpdated: string;
  history: { time: string; temperature: number; vibration: number; current: number; acoustic: number }[];
  prediction: string | null;
}

export interface Alert {
  id: string;
  assetId: string;
  assetName: string;
  type: 'vibration' | 'temperature' | 'power' | 'system';
  severity: 'warning' | 'critical';
  message: string;
  timestamp: string;
  active: boolean;
}

const generateHistory = (baseTemp: number, baseVib: number, baseCurrent: number = 100, baseAcoustic: number = 60) => {
  const history = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    history.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: baseTemp + (Math.random() * 5 - 2.5),
      vibration: baseVib + (Math.random() * 0.5 - 0.25),
      current: baseCurrent > 0 ? baseCurrent + (Math.random() * 5 - 2.5) : 0,
      acoustic: baseAcoustic + (Math.random() * 3 - 1.5),
    });
  }
  return history;
};

export const initialAssets: Asset[] = [
  {
    id: 'PMP-101',
    name: 'Primary Coolant Pump A',
    type: 'Pump',
    zone: 'Zone 1 - Main Reactor',
    status: 'normal',
    temperature: 45.2,
    vibration: 2.1,
    power: 120,
    acoustic: 62.5,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(45.2, 2.1, 120, 62.5),
    prediction: null,
  },
  {
    id: 'PMP-102',
    name: 'Auxiliary Coolant Pump B',
    type: 'Pump',
    zone: 'Zone 1 - Main Reactor',
    status: 'warning',
    temperature: 58.7,
    vibration: 4.8,
    power: 135,
    acoustic: 78.2,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(56.0, 4.2, 135, 72.0).map((h, i) => ({
      ...h,
      temperature: h.temperature + (i > 15 ? i * 0.2 : 0),
      vibration: h.vibration + (i > 18 ? i * 0.05 : 0),
      current: h.current + (i > 15 ? i * 1.5 : 0),
      acoustic: h.acoustic + (i > 15 ? i * 0.5 : 0)
    })),
    prediction: 'Potential bearing failure risk in 5 days due to increasing vibration trend.',
  },
  {
    id: 'MTR-201',
    name: 'Ventilation Motor North',
    type: 'Motor',
    zone: 'Zone 2 - Auxiliary',
    status: 'critical',
    temperature: 82.5,
    vibration: 7.2,
    power: 210,
    acoustic: 95.5,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(75.0, 6.0, 210, 85.0).map((h, i) => ({
      ...h,
      temperature: h.temperature + (i > 10 ? i * 0.5 : 0),
      vibration: h.vibration + (i > 20 ? i * 0.2 : 0),
      current: h.current + (i > 12 ? i * 2.0 : 0),
      acoustic: h.acoustic + (i > 15 ? i * 1.0 : 0)
    })),
    prediction: 'Imminent failure warning: Temperature and vibration exceeding critical thresholds.',
  },
  {
    id: 'HTR-305',
    name: 'Pre-heater Unit C',
    type: 'Heater',
    zone: 'Zone 3 - Processing',
    status: 'normal',
    temperature: 120.4,
    vibration: 0.5,
    power: 450,
    acoustic: 55.0,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(120.0, 0.5, 450, 55.0),
    prediction: null,
  },
  {
    id: 'FAN-402',
    name: 'Exhaust Fan East',
    type: 'Fan',
    zone: 'Zone 2 - Auxiliary',
    status: 'normal',
    temperature: 38.6,
    vibration: 1.8,
    power: 45,
    acoustic: 68.5,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(38.6, 1.8, 45, 68.5),
    prediction: null,
  },
  {
    id: 'PMP-103',
    name: 'Backup Coolant Pump',
    type: 'Pump',
    zone: 'Zone 1 - Main Reactor',
    status: 'normal',
    temperature: 41.0,
    vibration: 1.5,
    power: 0, // Standby
    acoustic: 45.0,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(41.0, 1.5, 0, 45.0),
    prediction: null,
  },
  {
    id: 'PNL-501',
    name: 'Main Switchgear Panel 1',
    type: 'Panel',
    zone: 'Electrical Room A',
    status: 'normal',
    temperature: 32.5,
    vibration: 0,
    power: 800,
    acoustic: 30.0,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(32.5, 0, 800, 30.0),
    prediction: null,
  },
  {
    id: 'PNL-502',
    name: 'Auxiliary Breaker Panel',
    type: 'Panel',
    zone: 'Electrical Room B',
    status: 'normal',
    temperature: 35.8,
    vibration: 0,
    power: 450,
    acoustic: 32.0,
    lastUpdated: new Date().toISOString(),
    history: generateHistory(35.8, 0, 450, 32.0),
    prediction: null,
  }
];

export const initialAlerts: Alert[] = [
  {
    id: 'ALT-001',
    assetId: 'MTR-201',
    assetName: 'Ventilation Motor North',
    type: 'temperature',
    severity: 'critical',
    message: 'Temperature exceeded critical threshold (80°C). Immediate inspection required.',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    active: true,
  },
  {
    id: 'ALT-002',
    assetId: 'PMP-102',
    assetName: 'Auxiliary Coolant Pump B',
    type: 'vibration',
    severity: 'warning',
    message: 'Vibration deviation detected (4.8mm/s). Suggest scheduling maintenance.',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    active: true,
  }
];
