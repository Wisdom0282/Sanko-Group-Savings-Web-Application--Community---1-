import { useState } from 'react';
import { Group, Payment } from '../types';
import { formatNaira } from '../utils/currency';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Wallet, 
  TrendingUp, 
  Calculator, 
  Filter,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface PaymentsViewProps {
  groups: Group[];
}

export const PaymentsView = ({ groups }: PaymentsViewProps) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  
  const allPayments = groups.flatMap(group => 
    group.payments.map(payment => ({
      ...payment,
      groupName: group.name,
      memberName: group.members.find(m => m.id === payment.memberId)?.name || 'Unknown'
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredPayments = selectedGroupId === 'all' 
    ? allPayments 
    : allPayments.filter(p => {
        const group = groups.find(g => g.payments.some(gp => gp.id === p.id));
        return group?.id === selectedGroupId;
      });

  const totalAmount = filteredPayments.reduce((sum, payment) => 
    payment.type === 'contribution' ? sum + payment.amount : sum, 0);

  const contributionCount = filteredPayments.filter(p => p.type === 'contribution').length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-gray-900">Payment History</h1>
              <p className="text-gray-600 mt-1">Track all contributions and transactions across your groups</p>
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {groups.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-gray-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Contributions</div>
            <div className="text-2xl font-semibold text-gray-900">{formatNaira(totalAmount)}</div>
          </Card>
          
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-gray-600" />
              </div>
              <CheckCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Payments</div>
            <div className="text-2xl font-semibold text-gray-900">{contributionCount}</div>
          </Card>
          
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-gray-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Average Payment</div>
            <div className="text-2xl font-semibold text-gray-900">
              {contributionCount > 0 ? formatNaira(totalAmount / contributionCount) : formatNaira(0)}
            </div>
          </Card>
        </div>

        {/* Payments Table */}
        <Card className="bg-white border border-gray-200">
          {filteredPayments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No Payments Found</h3>
              <p className="text-gray-600">
                {selectedGroupId === 'all' 
                  ? 'No payments have been made yet across all groups'
                  : 'No payments have been made in this group yet'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-900">Date</TableHead>
                    <TableHead className="text-gray-900">Member</TableHead>
                    <TableHead className="text-gray-900">Group</TableHead>
                    <TableHead className="text-gray-900">Type</TableHead>
                    <TableHead className="text-gray-900">Amount</TableHead>
                    <TableHead className="text-gray-900">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString('en-NG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-gray-900">{payment.memberName}</TableCell>
                      <TableCell className="text-gray-600">{payment.groupName}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            payment.type === 'contribution' ? 'default' :
                            payment.type === 'penalty' ? 'destructive' : 'secondary'
                          }
                          className={`flex items-center space-x-1 w-fit ${
                            payment.type === 'contribution' ? 'bg-green-100 text-green-800' : ''
                          }`}
                        >
                          {payment.type === 'contribution' && <ArrowUpRight className="w-3 h-3" />}
                          {payment.type === 'withdrawal' && <ArrowDownRight className="w-3 h-3" />}
                          {payment.type === 'penalty' && <AlertCircle className="w-3 h-3" />}
                          <span className="capitalize">{payment.type}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className={`${
                        payment.type === 'contribution' ? 'text-green-700' :
                        payment.type === 'penalty' ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        <div className="flex items-center space-x-1">
                          {payment.type === 'withdrawal' ? (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          )}
                          <span>{payment.type === 'withdrawal' ? '-' : '+'}{formatNaira(payment.amount)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {payment.description || <span className="text-gray-400 italic">No description</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};