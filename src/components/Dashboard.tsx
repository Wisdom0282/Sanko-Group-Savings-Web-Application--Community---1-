import { formatNaira } from '../utils/currency';
import { Group } from '../types';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight, 
  PiggyBank, 
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface DashboardProps {
  groups: Group[];
  totalBalance: number;
  expectedMonthly: number;
  onGroupSelect: (groupId: string) => void;
}

export const Dashboard = ({ groups, totalBalance, expectedMonthly, onGroupSelect }: DashboardProps) => {
  const activeGroups = groups.filter(g => g.status === 'active').length;
  const overdueMembers = groups.reduce((acc, group) => 
    acc + group.members.filter(m => m.status === 'overdue').length, 0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">
              Your Savings Dashboard
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track your group savings and monitor contributions.
            </p>
          </div>
          
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <PiggyBank className="w-5 h-5 text-gray-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Total Savings</div>
              <div className="text-2xl font-semibold text-gray-900">{formatNaira(totalBalance)}</div>
            </Card>
            
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Active Groups</div>
              <div className="text-2xl font-semibold text-gray-900">{activeGroups}</div>
            </Card>
            
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex items-center space-x-1">
                  {overdueMembers > 0 ? (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">Expected Monthly</div>
              <div className="text-2xl font-semibold text-gray-900">{formatNaira(expectedMonthly)}</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Savings Groups</h2>
            {overdueMembers > 0 && (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{overdueMembers} overdue payment{overdueMembers !== 1 ? 's' : ''}</span>
              </Badge>
            )}
          </div>
          
          {groups.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Savings Journey</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create your first savings group and start building wealth together with friends and family.
              </p>
              <Button 
                onClick={() => {/* Navigate to groups */}} 
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Create Your First Group
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6">
              {groups.map((group) => {
                const progress = group.targetAmount > 0 ? (group.currentAmount / group.targetAmount) * 100 : 0;
                const daysLeft = Math.ceil((new Date(group.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isEndingSoon = daysLeft <= 30 && daysLeft > 0;
                const hasOverdueMembers = group.members.some(m => m.status === 'overdue');
                
                return (
                  <Card 
                    key={group.id} 
                    className="p-6 cursor-pointer hover:shadow-sm transition-shadow bg-white border border-gray-200 group"
                    onClick={() => onGroupSelect(group.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {group.name}
                          </h3>
                          <div className="flex space-x-2">
                            <Badge 
                              variant={group.status === 'active' ? 'default' : 'secondary'}
                              className={group.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {group.status}
                            </Badge>
                            {hasOverdueMembers && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Overdue
                              </Badge>
                            )}
                            {isEndingSoon && (
                              <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">
                                <Calendar className="w-3 h-3 mr-1" />
                                {daysLeft} days left
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{group.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-600">Members</div>
                            <div className="text-lg font-semibold text-gray-900">{group.members.length}</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-md">
                            <div className="text-sm text-gray-600">Saved</div>
                            <div className="text-lg font-semibold text-green-700">{formatNaira(group.currentAmount)}</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-md">
                            <div className="text-sm text-gray-600">Target</div>
                            <div className="text-lg font-semibold text-blue-700">{formatNaira(group.targetAmount)}</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-600">Per {group.contributionFrequency}</div>
                            <div className="text-lg font-semibold text-gray-900">{formatNaira(group.contributionAmount)}</div>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{progress.toFixed(1)}% complete</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};