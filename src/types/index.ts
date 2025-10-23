export interface Member {
  id: string;
  name: string;
  phone: string;
  joinedAt: string;
  totalContributed: number;
  lastPaymentDate?: string;
  status: 'active' | 'inactive' | 'overdue';
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  type: 'contribution' | 'penalty' | 'withdrawal';
  description?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  contributionAmount: number;
  contributionFrequency: 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate: string;
  members: Member[];
  payments: Payment[];
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
}

export interface AppState {
  groups: Group[];
  selectedGroupId: string | null;
  currentView: 'dashboard' | 'groups' | 'payments' | 'settings';
}