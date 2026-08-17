// src/data/mockCalls.ts
// Mock call/recording data for campaigns

export interface Call {
  id: string;
  campaignId: string;
  contactName: string;
  phoneNumber: string;
  agentName: string;
  dateTime: string; // ISO format or formatted string
  duration: string; // e.g., "3m 56s"
  durationSeconds: number; // for sorting
  status: 'completed' | 'missed' | 'abandoned' | 'in_progress';
  statusLabel: string; // e.g., "Hecha", "Perdida"
  statusColor: string; // e.g., "#1BB54A" for green
  disposition: string; // e.g., "Enviar Dirección Cliente"
  language: string; // e.g., "Español", "Inglés"
  recordingUrl: string; // URL to audio recording
  transcriptText: string; // Full call transcript
  aiSummary: string; // AI-generated call summary
  features: string[]; // Features used: ["Localizacion", ...]
  ola: number; // SLA metric
  contactList: string; // Contact list group: "Localizacion", "Test Data Debito V2", etc.
  outcome: 'efectivo' | 'no_efectivo'; // Call result: successful or not
}

export const mockCalls: Record<string, Call[]> = {
  'loc-1': [
    {
      id: 'call-loc1-001',
      campaignId: 'loc-1',
      contactName: 'Kerlis Sanchez',
      phoneNumber: '+1-809-985-2471',
      agentName: 'Agent Smith',
      dateTime: '13/08/2026 14:32',
      duration: '3m 56s',
      durationSeconds: 236,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Enviar Dirección Cliente',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-001.mp3',
      transcriptText: 'Agent: Buenos días, ¿cómo está?\nCustomer: Bien, gracias.\nAgent: Llamaba para confirmar su dirección...',
      aiSummary: 'El cliente confirmó la dirección de residencia y la referencia para la entrega de la tarjeta, completando la gestión.',
      features: ['Localizacion'],
      ola: 1,
      contactList: 'Localizacion',
      outcome: 'efectivo',
    },
    {
      id: 'call-loc1-002',
      campaignId: 'loc-1',
      contactName: 'Maria Lopez',
      phoneNumber: '+1-809-111-5555',
      agentName: 'Agent Smith',
      dateTime: '13/08/2026 13:45',
      duration: '2m 15s',
      durationSeconds: 135,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Información Proporcionada',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-002.mp3',
      transcriptText: 'Agent: Buenos días.\nCustomer: Hola, necesito información sobre mi cuenta.\nAgent: Con gusto la asisto...',
      aiSummary: 'Se proporcionó información sobre la cuenta del cliente y se resolvieron sus dudas sobre el estado.',
      features: [],
      ola: 1,
      contactList: 'Test Data Debito V2',
      outcome: 'efectivo',
    },
    {
      id: 'call-loc1-003',
      campaignId: 'loc-1',
      contactName: 'Juan Rodriguez',
      phoneNumber: '+1-809-222-6666',
      agentName: 'Agent Johnson',
      dateTime: '13/08/2026 12:20',
      duration: '5m 42s',
      durationSeconds: 342,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Cita Agendada',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-003.mp3',
      transcriptText: 'Agent: Buenos días, gracias por comunicarse.\nCustomer: Necesito agendar una cita...',
      aiSummary: 'Se agendó exitosamente una cita para atención al cliente en la sucursal local.',
      features: ['Localizacion'],
      ola: 2,
      contactList: 'Localizacion',
      outcome: 'efectivo',
    },
    {
      id: 'call-loc1-004',
      campaignId: 'loc-1',
      contactName: 'Ana Martinez',
      phoneNumber: '+1-809-333-7777',
      agentName: 'Agent Johnson',
      dateTime: '13/08/2026 11:05',
      duration: '1m 30s',
      durationSeconds: 90,
      status: 'abandoned',
      statusLabel: 'Abandonada',
      statusColor: '#F59E0B',
      disposition: 'Cliente No Responde',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-004.mp3',
      transcriptText: 'Agent: Buenos días... [No response from customer]',
      aiSummary: 'Llamada no contestada. Cliente no respondió durante el tiempo de espera.',
      features: [],
      ola: 3,
      contactList: 'Test Localizacion Debito 001',
      outcome: 'no_efectivo',
    },
    {
      id: 'call-loc1-005',
      campaignId: 'loc-1',
      contactName: 'Carlos Diaz',
      phoneNumber: '+1-809-444-8888',
      agentName: 'Agent Smith',
      dateTime: '13/08/2026 10:30',
      duration: '4m 12s',
      durationSeconds: 252,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Problema Resuelto',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-005.mp3',
      transcriptText: 'Agent: Buenos días.\nCustomer: Tengo un problema con mi tarjeta...\nAgent: No se preocupe, vamos a resolverlo...',
      aiSummary: 'Se identificó y resolvió un problema de transacción en la tarjeta de crédito del cliente.',
      features: [],
      ola: 1,
      contactList: 'Test Data Debito V2',
      outcome: 'efectivo',
    },
    {
      id: 'call-loc1-006',
      campaignId: 'loc-1',
      contactName: 'Sofia Reyes',
      phoneNumber: '+1-809-555-9999',
      agentName: 'Agent Williams',
      dateTime: '13/08/2026 09:15',
      duration: '6m 28s',
      durationSeconds: 388,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Producto Solicitado',
      language: 'Inglés',
      recordingUrl: 'https://example.com/recordings/call-006.mp3',
      transcriptText: 'Agent: Good morning.\nCustomer: I would like to request a new credit card...',
      aiSummary: 'Customer requested and was approved for a new credit card product. Application process initiated.',
      features: ['Localizacion'],
      ola: 1,
      contactList: 'Localizacion',
      outcome: 'efectivo',
    },
  ],
  'loc-mayo': [
    {
      id: 'call-mayo-001',
      campaignId: 'loc-mayo',
      contactName: 'Roberto Flores',
      phoneNumber: '+1-809-666-1111',
      agentName: 'Agent Garcia',
      dateTime: '12/08/2026 16:45',
      duration: '2m 58s',
      durationSeconds: 178,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Información Proporcionada',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-mayo-001.mp3',
      transcriptText: 'Agent: Buenos días.\nCustomer: Quería saber sobre las tasas de interés...',
      aiSummary: 'Se explicaron las tasas de interés vigentes y se ofrecieron opciones de ahorro.',
      features: [],
      ola: 1,
      contactList: 'Test Localizacion Debito 001',
      outcome: 'efectivo',
    },
    {
      id: 'call-mayo-002',
      campaignId: 'loc-mayo',
      contactName: 'Lucia Castro',
      phoneNumber: '+1-809-777-2222',
      agentName: 'Agent Garcia',
      dateTime: '12/08/2026 15:20',
      duration: '3m 41s',
      durationSeconds: 221,
      status: 'completed',
      statusLabel: 'Hecha',
      statusColor: '#1BB54A',
      disposition: 'Enviar Documentación',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-mayo-002.mp3',
      transcriptText: 'Agent: Buenos días.\nCustomer: Necesito enviar documentos...',
      aiSummary: 'Se solicitó y acordó envío de documentación requerida para completar el proceso.',
      features: ['Localizacion'],
      ola: 2,
      contactList: 'Localizacion',
      outcome: 'efectivo',
    },
    {
      id: 'call-mayo-003',
      campaignId: 'loc-mayo',
      contactName: 'Pedro Gonzalez',
      phoneNumber: '+1-809-888-3333',
      agentName: 'Agent Williams',
      dateTime: '12/08/2026 14:00',
      duration: '1m 15s',
      durationSeconds: 75,
      status: 'missed',
      statusLabel: 'Perdida',
      statusColor: '#E53935',
      disposition: 'Cliente No Disponible',
      language: 'Español',
      recordingUrl: 'https://example.com/recordings/call-mayo-003.mp3',
      transcriptText: '[Call not answered]',
      aiSummary: 'Llamada perdida. Cliente no estaba disponible en el momento.',
      features: [],
      ola: 3,
      contactList: 'Test Localizacion Debito 001',
      outcome: 'no_efectivo',
    },
  ],
};

/**
 * Get calls for a specific campaign and agent
 */
export const getCallsForCampaign = (
  campaignId: string,
  agentName?: string,
  contactName?: string
): Call[] => {
  let calls = mockCalls[campaignId] || [];

  if (agentName) {
    calls = calls.filter((call) => call.agentName === agentName);
  }

  if (contactName) {
    calls = calls.filter((call) => call.contactName === contactName);
  }

  return calls;
};

/**
 * Get unique agent names for a campaign
 */
export const getAgentsForCampaign = (campaignId: string): string[] => {
  const calls = mockCalls[campaignId] || [];
  const agents = new Set(calls.map((call) => call.agentName));
  return Array.from(agents).sort();
};

/**
 * Get unique contacts for a campaign
 */
export const getContactsForCampaign = (campaignId: string): string[] => {
  const calls = mockCalls[campaignId] || [];
  const contacts = new Set(calls.map((call) => call.contactName));
  return Array.from(contacts).sort();
};

/**
 * Get unique contact lists for a campaign
 */
export const getContactListsForCampaign = (campaignId: string): string[] => {
  const calls = mockCalls[campaignId] || [];
  const contactLists = new Set(calls.map((call) => call.contactList));
  return Array.from(contactLists).sort();
};
