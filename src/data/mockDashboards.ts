// src/data/mockDashboards.ts

export interface Dashboard {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused' | 'completed' | 'failed';
  type: string;
  lastUpdated: string;
  createdAt: string;
}

export const mockDashboards: Dashboard[] = [
  {
    id: 'loc-1',
    name: 'Localizacion',
    status: 'inactive',
    type: 'Localizacion',
    lastUpdated: '2026-08-13T12:11:00Z',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'loc-mayo',
    name: 'Localizacion Mayo',
    status: 'active',
    type: 'Localizacion',
    lastUpdated: '2026-08-13T12:11:00Z',
    createdAt: '2026-05-01T09:00:00Z',
  },
];
