// Mock data for device gallery
export interface DevicePlan {
  bundle: string;
  benefits: string;
  validity: string;
  price: number;
}

export interface Device {
  id: string;
  type: 'outdoor_5g' | 'indoor_5g' | 'pocket_4g' | 'smart_4g';
  name: string;
  image: string;
  features: string[];
  plans: DevicePlan[];
  price?: number;
  freeData?: string;
}

export const mockDevices: Device[] = [
  {
    id: 'outdoor-5g',
    type: 'outdoor_5g',
    name: '5G Smart Connect - Outdoor Unit',
    image: '/images/5G-Smart-Connect-7w.png',
    features: [
      'Weather Resistant Design - Built to perform reliably in all conditions',
      'Signal Amplification - Enhances signal strength to ensure stable and uninterrupted connectivity',
      'High Gain Antenna - Offers strong and consistent indoor coverage',
      'Flexible Mounting Options - Easily install on walls, poles, or rooftops to suit your setup and location'
    ],
    plans: [
      { bundle: '5G 15Mbps_30days', benefits: '15.0 MBPS', validity: '30 Day', price: 1999 },
      { bundle: '5G 30Mbps_30days', benefits: '30.0 MBPS', validity: '30 Day', price: 2999 }
    ]
  },
  {
    id: 'indoor-5g',
    type: 'indoor_5g',
    name: '5G Smart Connect',
    image: '/images/smartconnect5gnew.png',
    features: [
      'Enjoy lightning-fast 5G speeds',
      'Up to 5 hours battery backup',
      'Unparalleled network stability and uninterrupted connection',
      'Connects to 16 devices simultaneously',
      'Unlocking a new level of performance and enjoy the benefits of 5G without the need to invest in a new 5G smartphone'
    ],
    plans: [
      { bundle: '5G 15Mbps_30days', benefits: '15.0 MBPS', validity: '30 Day', price: 1999 },
      { bundle: '5G 30Mbps_30days', benefits: '30.0 MBPS', validity: '30 Day', price: 2999 },
      { bundle: '5G Smart Connect Ultra - 300 GB @2999 (10GB/day)', benefits: '10.0 GB', validity: '30 Day', price: 2999 },
      { bundle: '5G Smart Connect Ultra - 600 GB @5,000 (20GB/day)', benefits: '20.0 GB', validity: '30 Day', price: 5000 }
    ]
  },
  {
    id: 'pocket-4g',
    type: 'pocket_4g',
    name: '4G Pocket WiFi',
    price: 3000,
    freeData: '(Free 5 GB)',
    image: '/images/4G_SmartBox2.png',
    features: [
      'Enjoy 4G speeds on your 3G Device',
      'Up to 6 hours battery backup',
      'Connect up to 10 users on WiFi',
      'Fits in Pocket'
    ],
    plans: [
      { bundle: '4G Pocket WiFi 3GB', benefits: '3.0 GB', validity: '7 Days', price: 250 },
      { bundle: 'Bazuu 7.5GB @500 (250MB/day)', benefits: '250.0 MB', validity: '30 Day', price: 500 },
      { bundle: '4G Pocket WiFi 7.5GB', benefits: '7.5 GB', validity: '30 Days', price: 500 },
      { bundle: 'Bazuu 30GB @1000 (1GB/day)', benefits: '1.0 GB', validity: '30 Day', price: 1000 },
      { bundle: '4G Pocket WiFi 30GB', benefits: '30.0 GB', validity: '30 Days', price: 1000 },
      { bundle: '4G Pocket WiFi 60GB', benefits: '60.0 GB', validity: '30 Days', price: 1500 },
      { bundle: 'Bazuu 90GB @2000 (3GB/day)', benefits: '3.0 GB', validity: '30 Day', price: 2000 },
      { bundle: '4G Pocket WiFi 120GB', benefits: '120.0 GB', validity: '30 Days', price: 2500 }
    ]
  },
  {
    id: 'smart-4g',
    type: 'smart_4g',
    name: '4G Smart Connect',
    price: 4500,
    freeData: '(Free Unlimited Data at 10Mbps speeds)',
    image: '/images/router.jpg',
    features: [
      'Enjoy fast 4G speeds up to 40Mbps',
      'Up to 4 hours battery backup',
      'Extended Wi-Fi Range',
      'Connect up to 32 users on Wi-Fi',
      'LAN/ Ethernet connection for desktop'
    ],
    plans: [
      { bundle: '4G SmartBox 40GB', benefits: '40.0 GB', validity: '30 Days', price: 2000 },
      { bundle: 'Bazuu 90GB @2000 (3GB/day)', benefits: '3.0 GB', validity: '30 Day', price: 2000 },
      { bundle: '4G SmartBox 70GB', benefits: '70.0 GB', validity: '30 Days', price: 3000 },
      { bundle: '4G SmartBox 100GB', benefits: '100.0 GB', validity: '30 Days', price: 4000 }
    ]
  }
];

export const planCategories = {
  'outdoor_5g': 'PLANS FOR 5G SMART CONNECT OUTDOOR UNIT',
  'indoor_5g': 'PLANS FOR 5G SMART CONNECT',
  'pocket_4g': 'PLANS FOR 4G POCKET WIFI',
  'smart_4g': 'PLANS FOR 4G SMART CONNECT'
};