// src/data/mockDashboards.ts

export interface Dashboard {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused' | 'completed' | 'failed';
  type: string;
  lastUpdated: string;
  createdAt: string;
  campaignType: string;
  lineOfBusiness: string;
}

export const mockDashboards: Dashboard[] = [
  {
    id: 'loc-1',
    name: 'Localizacion',
    status: 'inactive',
    type: 'Localizacion',
    lastUpdated: '2026-08-13T12:11:00Z',
    createdAt: '2026-01-15T10:00:00Z',
    campaignType: 'Outbound',
    lineOfBusiness: 'Sales',
  },
  {
    id: 'loc-mayo',
    name: 'Localizacion Mayo',
    status: 'active',
    type: 'Localizacion',
    lastUpdated: '2026-08-13T12:11:00Z',
    createdAt: '2026-05-01T09:00:00Z',
    campaignType: 'Inbound',
    lineOfBusiness: 'Marketing',
  },
  {
    id: 'loc-june',
    name: 'Localizacion Junio',
    status: 'active',
    type: 'Localizacion',
    lastUpdated: '2026-08-10T15:30:00Z',
    createdAt: '2026-06-15T08:00:00Z',
    campaignType: 'Mixta',
    lineOfBusiness: 'Customer Support',
  },
  {
    id: 'loc-july',
    name: 'Localizacion Julio',
    status: 'completed',
    type: 'Localizacion',
    lastUpdated: '2026-07-28T11:00:00Z',
    createdAt: '2026-07-01T10:00:00Z',
    campaignType: 'Outbound',
    lineOfBusiness: 'Sales',
  },
  {
    id: 'loc-august',
    name: 'Localizacion Agosto',
    status: 'paused',
    type: 'Localizacion',
    lastUpdated: '2026-08-15T09:45:00Z',
    createdAt: '2026-08-01T14:00:00Z',
    campaignType: 'Inbound',
    lineOfBusiness: 'Marketing',
  },
];
