// src/types/router.ts
export type BaseRouter = {
  id: string;
  name: string;
  type: 'WiFi' | 'Enterprise' | 'Home';
  updatedAt: string;
};

export type WiFiRouter = BaseRouter & {
  type: 'WiFi';
  ssid: string;
  band: '2.4GHz' | '5GHz' | 'Dual';
};

export type EnterpriseRouter = BaseRouter & {
  type: 'Enterprise';
  rackLocation: string;
  firmwareVersion: string;
};

export type HomeRouter = BaseRouter & {
  type: 'Home';
  ipAddress: string;
  connectedDevices: number;
};

export type Router = WiFiRouter | EnterpriseRouter | HomeRouter;
