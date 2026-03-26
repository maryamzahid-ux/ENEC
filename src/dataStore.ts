export type AssetStatus = 'normal' | 'warning' | 'critical';

export interface Asset {
  id: string;
  name: string;
  type: 'Pump' | 'Motor' | 'Heater' | 'Fan' | 'Panel';
  zone: string;
  status: AssetStatus;
  vibration?: number;   // mm/s
  current?: number;     // A
  temperature?: number; // °C
  batteryStatus?: number; // %
  rssi?: number; // dBm
  installationType?: string;
  lastUpdated: string;
  history: {
    time: string;
    vibration?: number;
    current?: number;
    temperature?: number;
  }[];
  prediction: string | null;
}

export interface Alert {
  id: string;
  assetId: string;
  assetName: string;
  type: 'vibration' | 'temperature' | 'current' | 'system';
  severity: 'warning' | 'critical';
  message: string;
  timestamp: string;
  active: boolean;
}

export const generateHistory = (type: 'Pump' | 'Motor' | 'Heater' | 'Fan' | 'Panel', baseVal: number, baseTemp?: number) => {
  const history = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    const point: any = {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (type === 'Pump' || type === 'Fan') {
      point.vibration = baseVal + (Math.random() * 0.4 - 0.2);
      if (baseTemp) point.temperature = baseTemp + (Math.random() * 2 - 1);
    } else if (type === 'Motor') {
      point.current = baseVal + (Math.random() * 1.5 - 0.75);
      if (baseTemp) point.temperature = baseTemp + (Math.random() * 2 - 1);
    } else if (type === 'Heater' || type === 'Panel') {
      point.temperature = baseVal + (Math.random() * 2 - 1);
    }

    history.push(point);
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
    vibration: 2.1,
    temperature: 42.5,
    batteryStatus: 92,
    rssi: -61,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Pump', 2.1, 42.5),
    prediction: null,
  },
  {
    id: 'PMP-102',
    name: 'Auxiliary Coolant Pump B',
    type: 'Pump',
    zone: 'Zone 1 - Main Reactor',
    status: 'warning',
    vibration: 4.8,
    temperature: 58.0,
    batteryStatus: 84,
    rssi: -68,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Pump', 4.8, 55.0).map((h, i) => ({
      ...h,
      vibration: h.vibration! + (i > 15 ? i * 0.05 : 0)
    })),
    prediction: '+28% vibration spike detected. Pattern deviation vs baseline. Failure risk: Medium.',
  },
  {
    id: 'MTR-A2',
    name: 'Ventilation Motor A2',
    type: 'Motor',
    zone: 'Zone 2 - Auxiliary',
    status: 'critical',
    current: 18.5,
    temperature: 82.5,
    batteryStatus: 78,
    rssi: -82,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Motor', 12.0, 75.0).map((h, i) => ({
      ...h,
      current: h.current! + (i > 10 ? i * 0.5 : 0),
      temperature: h.temperature! + (i > 12 ? i * 0.5 : 0)
    })),
    prediction: 'Critical current overload detected vs baseline. Thermal drift +42%. Failure risk: High.',
  },
  {
    id: 'HTR-3',
    name: 'Pre-heater Unit 3',
    type: 'Heater',
    zone: 'Zone 3 - Processing',
    status: 'normal',
    temperature: 55.4,
    batteryStatus: 88,
    rssi: -72,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Heater', 55.4),
    prediction: null,
  },
  {
    id: 'FAN-402',
    name: 'Exhaust Fan East',
    type: 'Fan',
    zone: 'Zone 2 - Auxiliary',
    status: 'normal',
    vibration: 1.8,
    temperature: 38.6,
    batteryStatus: 95,
    rssi: -58,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Fan', 1.8, 38.6),
    prediction: null,
  },
  {
    id: 'PMP-103',
    name: 'Backup Coolant Pump',
    type: 'Pump',
    zone: 'Zone 1 - Main Reactor',
    status: 'normal',
    vibration: 1.2,
    batteryStatus: 92,
    rssi: -65,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Pump', 1.2),
    prediction: null,
  },
  {
    id: 'PNL-3',
    name: 'Main Switchgear Panel 3',
    type: 'Panel',
    zone: 'Electrical Room A',
    status: 'normal',
    temperature: 35.2,
    batteryStatus: 82,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Panel', 35.2),
    prediction: null,
  },
  {
    id: 'PNL-502',
    name: 'Auxiliary Breaker Panel',
    type: 'Panel',
    zone: 'Electrical Room B',
    status: 'normal',
    temperature: 38.5,
    batteryStatus: 86,
    installationType: 'Retrofit - No Wiring',
    lastUpdated: new Date().toISOString(),
    history: generateHistory('Panel', 38.5),
    prediction: null,
  }
];

export const initialAlerts: Alert[] = [
  {
    id: 'ALT-001',
    assetId: 'MTR-A2',
    assetName: 'Ventilation Motor A2',
    type: 'current',
    severity: 'critical',
    message: 'Current overload (18.5 A) exceeded high limit. Immediate check required.',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    active: true,
  },
  {
    id: 'ALT-002',
    assetId: 'PMP-102',
    assetName: 'Auxiliary Coolant Pump B',
    type: 'vibration',
    severity: 'warning',
    message: 'Vibration high (4.8 mm/s). Vibration deviation detected.',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    active: true,
  }
];
