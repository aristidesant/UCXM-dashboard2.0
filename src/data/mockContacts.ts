// src/data/mockContacts.ts

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  status?: string;
  action: string;
  listName: string;
}

export const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Yamilet Sanchez',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
    listName: 'Prospectos',
  },
  {
    id: 'contact-2',
    name: 'Kerlis Sanchez',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
    listName: 'Clientes Activos',
  },
  {
    id: 'contact-3',
    name: 'Steve Socorro',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
    listName: 'Prospectos',
  },
  {
    id: 'contact-4',
    name: 'Enmanuel Placido',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
    listName: 'Clientes Inactivos',
  },
  {
    id: 'contact-5',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
    listName: 'Clientes Activos',
  },
  {
    id: 'contact-6',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Enviar Dirección Cliente',
    listName: 'Prospectos',
  },
  {
    id: 'contact-7',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Llamada finalizo antes de tiempo',
    listName: 'Clientes Activos',
  },
  {
    id: 'contact-8',
    name: 'Elvyn Soriano',
    avatar: '👤',
    action: 'Llamada finalizo antes de tiempo',
    listName: 'Clientes Inactivos',
  },
];
