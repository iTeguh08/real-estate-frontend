import type { Agent } from '@/types';

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Senior Property Advisor',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    avatarObjectPosition: 'center 13%',
    listingsCount: 42,
    phone: '+1 555 012 3401',
    email: 'sarah.mitchell@homzen.com',
    bio: 'Sarah specializes in luxury residential properties across New York and the tri-state area. With over 12 years of experience, she helps families find homes that match their lifestyle and long-term goals.',
  },
  {
    id: 'agent-2',
    slug: 'james-whitfield',
    name: 'James Whitfield',
    role: 'Project Manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    avatarObjectPosition: 'center 12%',
    listingsCount: 38,
    phone: '+1 555 012 3402',
    email: 'james.whitfield@homzen.com',
    bio: 'James oversees off-plan and new development projects, guiding buyers from pre-construction through handover. His structured approach keeps every transaction on schedule and transparent.',
  },
  {
    id: 'agent-3',
    slug: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Luxury Homes Specialist',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    avatarObjectPosition: 'center 67%',
    listingsCount: 51,
    phone: '+1 555 012 3403',
    email: 'marcus.chen@homzen.com',
    bio: 'Marcus focuses on high-value villas, penthouses, and waterfront estates. Clients value his discretion, market insight, and network of private listings not always on the open market.',
  },
];
