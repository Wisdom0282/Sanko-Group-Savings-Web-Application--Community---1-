import { Group } from '../types';
import { formatNaira } from '../utils/currency';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CreateGroupDialog } from './CreateGroupDialog';
import { AddMemberDialog } from './AddMemberDialog';
import { AddPaymentDialog } from './AddPaymentDialog';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Plus, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  User,
  ArrowLeft,
  MoreVertical,
  Activity,
  Wallet,
  PieChart,
  History
} from 'lucide-react';

interface GroupsViewProps {
  groups: Group[];
  onCreateGroup: (group: {
    name: string;
    description: string;
    targetAmount: number;
    contributionAmount: number;
    contributionFrequency: 'weekly' | 'monthly' | 'quarterly';
    startDate: string;
    endDate: string;
    status: 'active';
  }) => void;
  onGroupSelect: (groupId: string) => void;
  selectedGroup: Group | undefined;
  onAddMember: (groupId: string, member: { name: string; phone: string }) => void;
  onAddPayment: (groupId: string, payment: {
    memberId: string;
    amount: number;
    type: 'contribution' | 'penalty' | 'withdrawal';
    description?: string;
  }) => void;
}

export const GroupsView = ({ groups, onCreateGroup, onGroupSelect, selectedGroup, onAddMember, onAddPayment }: GroupsViewProps) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              {selectedGroup ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onGroupSelect('')}
                    className="hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Groups
                  </Button>
                  <div>
                    <h1 style={{ color: 'var(--foreground)' }}>{selectedGroup.name}</h1>
                    <p style={{ color: 'var(--muted)' }} className="mt-1">Group Details & Management</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 style={{ color: 'var(--foreground)' }}>Savings Groups</h1>
                  <p style={{ color: 'var(--muted)' }} className="mt-1">Manage your group savings and track contributions</p>
                </div>
              )}
            </div>
            {!selectedGroup && <CreateGroupDialog onCreateGroup={onCreateGroup} />}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedGroup ? (
          <GroupDetailView 
            group={selectedGroup} 
            onAddMember={onAddMember}
            onAddPayment={onAddPayment}
          />
        ) : (
          <GroupListView 
            groups={groups}
            onCreateGroup={onCreateGroup}
            onGroupSelect={onGroupSelect}
          />
        )}
      </div>
    </div>
  );
};

// Group List View Component
const GroupListView = ({ groups, onCreateGroup, onGroupSelect }: {
  groups: Group[];
  onCreateGroup: any;
  onGroupSelect: (groupId: string) => void;
}) => {
  return (
    <div className="space-y-6">
      {groups.length === 0 ? (
        <Card className="p-12 text-center" style={{ backgroundColor: 'var(--card)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--secondary)' }}>
            <Users className="w-8 h-8" style={{ color: 'var(--muted)' }} />
          </div>
          <h3 className="mb-2" style={{ color: 'var(--foreground)' }}>Create Your First Group</h3>
          <p style={{ color: 'var(--muted)' }} className="mb-6 max-w-md mx-auto">
            Start a savings group with friends, family, or colleagues to achieve your financial goals together.
          </p>
          <CreateGroupDialog onCreateGroup={onCreateGroup} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => {
            const progress = group.targetAmount > 0 ? (group.currentAmount / group.targetAmount) * 100 : 0;
            const daysLeft = Math.ceil((new Date(group.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isEndingSoon = daysLeft <= 30 && daysLeft > 0;
            const hasOverdueMembers = group.members.some(m => m.status === 'overdue');
            
            return (
              <Card 
                key={group.id} 
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                onClick={() => onGroupSelect(group.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 style={{ color: 'var(--foreground)' }}>{group.name}</h3>
                      <div className="flex space-x-2">
                        <Badge 
                          variant={group.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {group.status}
                        </Badge>
                        {hasOverdueMembers && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                        {isEndingSoon && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-600 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {daysLeft} days left
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p style={{ color: 'var(--muted)' }} className="mb-4 text-sm">{group.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
                    <TrendingUp className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--muted)' }} />
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>Current</div>
                    <div style={{ color: 'var(--foreground)' }}>{formatNaira(group.currentAmount)}</div>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
                    <Target className="w-4 h-4 mx-auto mb-1" style={{ color: 'var(--muted)' }} />
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>Target</div>
                    <div style={{ color: 'var(--foreground)' }}>{formatNaira(group.targetAmount)}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--muted)' }}>Progress</span>
                    <span style={{ color: 'var(--foreground)' }}>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center text-sm" style={{ color: 'var(--muted)' }}>
                    <Users className="w-4 h-4 mr-1" />
                    {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--muted)' }}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatNaira(group.contributionAmount)} {group.contributionFrequency}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Group Detail View Component
const GroupDetailView = ({ group, onAddMember, onAddPayment }: {
  group: Group;
  onAddMember: (groupId: string, member: { name: string; phone: string }) => void;
  onAddPayment: (groupId: string, payment: {
    memberId: string;
    amount: number;
    type: 'contribution' | 'penalty' | 'withdrawal';
    description?: string;
  }) => void;
}) => {
  const progress = group.targetAmount > 0 ? (group.currentAmount / group.targetAmount) * 100 : 0;
  const daysLeft = Math.ceil((new Date(group.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isEndingSoon = daysLeft <= 30 && daysLeft > 0;
  const hasOverdueMembers = group.members.some(m => m.status === 'overdue');
  const totalContributed = group.payments
    .filter(p => p.type === 'contribution')
    .reduce((sum, p) => sum + p.amount, 0);
  const averageContribution = group.members.length > 0 
    ? totalContributed / group.members.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Group Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
              <Wallet className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Current Balance</p>
              <p style={{ color: 'var(--foreground)' }}>{formatNaira(group.currentAmount)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
              <Target className="w-6 h-6" style={{ color: 'var(--success)' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Target Amount</p>
              <p style={{ color: 'var(--foreground)' }}>{formatNaira(group.targetAmount)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
              <Users className="w-6 h-6" style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Members</p>
              <p style={{ color: 'var(--foreground)' }}>{group.members.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
              <PieChart className="w-6 h-6" style={{ color: 'var(--warning)' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Progress</p>
              <p style={{ color: 'var(--foreground)' }}>{progress.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress & Status */}
      <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 style={{ color: 'var(--foreground)' }}>Savings Progress</h3>
            <div className="flex items-center space-x-2">
              <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {group.status}
              </Badge>
              {hasOverdueMembers && (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Overdue
                </Badge>
              )}
              {isEndingSoon && (
                <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {daysLeft} days left
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>
                {formatNaira(group.currentAmount)} of {formatNaira(group.targetAmount)}
              </span>
              <span style={{ color: 'var(--muted)' }}>
                {formatNaira(group.targetAmount - group.currentAmount)} remaining
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Contribution</p>
              <p style={{ color: 'var(--foreground)' }}>{formatNaira(group.contributionAmount)}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{group.contributionFrequency}</p>
            </div>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Average per Member</p>
              <p style={{ color: 'var(--foreground)' }}>{formatNaira(averageContribution)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Start Date</p>
              <p style={{ color: 'var(--foreground)' }}>{new Date(group.startDate).toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>End Date</p>
              <p style={{ color: 'var(--foreground)' }}>{new Date(group.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Members Section */}
        <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex justify-between items-center mb-6">
            <h4 className="flex items-center" style={{ color: 'var(--foreground)' }}>
              <Users className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
              Members ({group.members.length})
            </h4>
            <AddMemberDialog 
              onAddMember={(member) => onAddMember(group.id, member)} 
            />
          </div>
          
          {group.members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted)' }} />
              <p style={{ color: 'var(--muted)' }} className="mb-2">No members yet</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Add members to start collecting contributions</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-opacity-50 transition-colors" style={{ border: '1px solid var(--border)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--secondary)' }}>
                      <User className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <div style={{ color: 'var(--foreground)' }}>{member.name}</div>
                      <div className="text-sm flex items-center" style={{ color: 'var(--muted)' }}>
                        <Phone className="w-3 h-3 mr-1" />
                        {member.phone}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: 'var(--foreground)' }}>{formatNaira(member.totalContributed)}</div>
                    <Badge 
                      variant={member.status === 'active' ? 'default' : member.status === 'overdue' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {member.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {member.status === 'overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {member.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Payments Section */}
        <Card className="p-6" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex justify-between items-center mb-6">
            <h4 className="flex items-center" style={{ color: 'var(--foreground)' }}>
              <History className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
              Recent Payments
            </h4>
            {group.members.length > 0 && (
              <AddPaymentDialog 
                members={group.members}
                onAddPayment={(payment) => onAddPayment(group.id, payment)}
              />
            )}
          </div>
          
          {group.payments.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted)' }} />
              <p style={{ color: 'var(--muted)' }} className="mb-2">No payments yet</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Payments will appear here once members start contributing</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {group.payments.slice(-10).reverse().map((payment) => {
                const member = group.members.find(m => m.id === payment.memberId);
                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        payment.type === 'contribution' ? 'bg-green-100' :
                        payment.type === 'penalty' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <Activity className={`w-4 h-4 ${
                          payment.type === 'contribution' ? 'text-green-600' :
                          payment.type === 'penalty' ? 'text-red-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <div style={{ color: 'var(--foreground)' }}>{member?.name || 'Unknown'}</div>
                        <div className="text-sm" style={{ color: 'var(--muted)' }}>
                          {new Date(payment.date).toLocaleDateString()} • {payment.type}
                          {payment.description && (
                            <span className="ml-2">• {payment.description}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`${
                      payment.type === 'contribution' ? 'text-green-600' :
                      payment.type === 'penalty' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {payment.type === 'withdrawal' ? '-' : '+'}{formatNaira(payment.amount)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};