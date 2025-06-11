import { createClient } from '@sanity/client';

const client = createClient({
 projectId: 'n7oh3tlm',
    dataset: 'production',
  apiVersion: '2024-06-01', // Bruk dagens dato eller ønsket API-versjon
  useCdn: true,
});

export default client;