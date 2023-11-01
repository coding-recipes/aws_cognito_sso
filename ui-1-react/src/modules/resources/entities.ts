export interface Stat {
  id: number;
  kpi: string;
  period: string;
  year: number;
  month: number;
  value: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface Stats {
  data: Stat[];
}

export interface CurrentUser {
  identity: {
    sub: string;
    userName: string;
    clientId: string;
  };
  data: any;
}

export interface ServerInfo {
  swagger: string;
  framework: string;
  version: string;
  language: string;
  repo: string;
}