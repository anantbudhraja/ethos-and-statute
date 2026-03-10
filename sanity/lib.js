import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'xk1ff2ne',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})