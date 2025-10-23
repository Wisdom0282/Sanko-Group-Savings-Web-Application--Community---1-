import { Group } from '../types';

export const createSampleData = (): Group[] => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
  const twelveMonthsFromNow = new Date(now.getTime() + 12 * 30 * 24 * 60 * 60 * 1000);
  
  return [
    {
      id: '1',
      name: 'Vacation Fund 2025',
      description: 'Saving for a family vacation to Dubai',
      targetAmount: 2000000,
      currentAmount: 1250000,
      contributionAmount: 50000,
      contributionFrequency: 'monthly',
      startDate: sixMonthsAgo.toISOString(),
      endDate: twelveMonthsFromNow.toISOString(),
      status: 'active',
      createdAt: sixMonthsAgo.toISOString(),
      members: [
        {
          id: 'm1',
          name: 'John Adebayo',
          phone: '+234 801 234 5678',
          joinedAt: sixMonthsAgo.toISOString(),
          totalContributed: 300000,
          lastPaymentDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: 'm2',
          name: 'Sarah Okafor',
          phone: '+234 802 345 6789',
          joinedAt: new Date(sixMonthsAgo.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          totalContributed: 250000,
          lastPaymentDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }
      ],
      payments: [
        {
          id: 'p1',
          memberId: 'm1',
          amount: 50000,
          date: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'contribution',
          description: 'Monthly contribution - January'
        },
        {
          id: 'p2',
          memberId: 'm2',
          amount: 50000,
          date: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'contribution',
          description: 'Monthly contribution - January'
        },
        {
          id: 'p3',
          memberId: 'm1',
          amount: 50000,
          date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'contribution',
          description: 'Monthly contribution - February'
        }
      ]
    },
    {
      id: '2',
      name: 'Emergency Fund',
      description: 'Building an emergency fund for unexpected expenses',
      targetAmount: 1000000,
      currentAmount: 780000,
      contributionAmount: 30000,
      contributionFrequency: 'monthly',
      startDate: new Date(sixMonthsAgo.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(twelveMonthsFromNow.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      createdAt: new Date(sixMonthsAgo.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      members: [
        {
          id: 'm3',
          name: 'Michael Okonkwo',
          phone: '+234 803 456 7890',
          joinedAt: new Date(sixMonthsAgo.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          totalContributed: 420000,
          lastPaymentDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: 'm4',
          name: 'Grace Nnenna',
          phone: '+234 804 567 8901',
          joinedAt: new Date(sixMonthsAgo.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          totalContributed: 360000,
          lastPaymentDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }
      ],
      payments: [
        {
          id: 'p4',
          memberId: 'm3',
          amount: 30000,
          date: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'contribution',
          description: 'Emergency fund contribution'
        },
        {
          id: 'p5',
          memberId: 'm4',
          amount: 30000,
          date: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'contribution',
          description: 'Emergency fund contribution'
        },
        {
          id: 'p6',
          memberId: 'm3',
          amount: 30000,
          date: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'contribution',
          description: 'February contribution'
        }
      ]
    }
  ];
};