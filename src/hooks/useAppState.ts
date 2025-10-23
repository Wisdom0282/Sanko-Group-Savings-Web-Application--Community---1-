import { useState, useEffect } from 'react';
import { AppState, Group, Member, Payment } from '../types';
import { loadState, saveState } from '../utils/storage';
import { createSampleData } from '../utils/sampleData';

const initialState: AppState = {
  groups: [],
  selectedGroupId: null,
  currentView: 'dashboard'
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>(() => {
    const stored = loadState();
    if (stored) {
      return stored;
    }
    
    // Initialize with sample data for new users
    const sampleState: AppState = {
      ...initialState,
      groups: createSampleData()
    };
    
    saveState(sampleState);
    return sampleState;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const createGroup = (group: Omit<Group, 'id' | 'createdAt' | 'currentAmount' | 'members' | 'payments'>) => {
    const newGroup: Group = {
      ...group,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      currentAmount: 0,
      members: [],
      payments: []
    };

    setState(prev => ({
      ...prev,
      groups: [...prev.groups, newGroup]
    }));

    return newGroup.id;
  };

  const addMember = (groupId: string, member: Omit<Member, 'id' | 'joinedAt' | 'totalContributed' | 'status'>) => {
    const newMember: Member = {
      ...member,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString(),
      totalContributed: 0,
      status: 'active'
    };

    setState(prev => ({
      ...prev,
      groups: prev.groups.map(group =>
        group.id === groupId
          ? { ...group, members: [...group.members, newMember] }
          : group
      )
    }));
  };

  const addPayment = (groupId: string, payment: Omit<Payment, 'id' | 'date'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      groups: prev.groups.map(group => {
        if (group.id === groupId) {
          const updatedMembers = group.members.map(member =>
            member.id === payment.memberId
              ? {
                  ...member,
                  totalContributed: member.totalContributed + (payment.type === 'contribution' ? payment.amount : 0),
                  lastPaymentDate: new Date().toISOString(),
                  status: 'active' as const
                }
              : member
          );

          return {
            ...group,
            members: updatedMembers,
            payments: [...group.payments, newPayment],
            currentAmount: payment.type === 'contribution' 
              ? group.currentAmount + payment.amount 
              : group.currentAmount
          };
        }
        return group;
      })
    }));
  };

  const setCurrentView = (view: AppState['currentView']) => {
    setState(prev => ({ ...prev, currentView: view }));
  };

  const setSelectedGroup = (groupId: string | null) => {
    setState(prev => ({ ...prev, selectedGroupId: groupId }));
  };

  const getSelectedGroup = () => {
    return state.groups.find(group => group.id === state.selectedGroupId);
  };

  const getTotalBalance = () => {
    return state.groups.reduce((total, group) => total + group.currentAmount, 0);
  };

  const getExpectedMonthly = () => {
    return state.groups.reduce((total, group) => {
      if (group.contributionFrequency === 'monthly') {
        return total + (group.contributionAmount * group.members.length);
      } else if (group.contributionFrequency === 'weekly') {
        return total + (group.contributionAmount * group.members.length * 4.33);
      } else if (group.contributionFrequency === 'quarterly') {
        return total + (group.contributionAmount * group.members.length / 3);
      }
      return total;
    }, 0);
  };

  return {
    state,
    createGroup,
    addMember,
    addPayment,
    setCurrentView,
    setSelectedGroup,
    getSelectedGroup,
    getTotalBalance,
    getExpectedMonthly
  };
};