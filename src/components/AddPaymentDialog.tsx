import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Member } from '../types';
import { parseNaira } from '../utils/currency';

interface AddPaymentDialogProps {
  members: Member[];
  onAddPayment: (payment: {
    memberId: string;
    amount: number;
    type: 'contribution' | 'penalty' | 'withdrawal';
    description?: string;
  }) => void;
}

export const AddPaymentDialog = ({ members, onAddPayment }: AddPaymentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    type: 'contribution' as const,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.memberId || !formData.amount) {
      return;
    }

    onAddPayment({
      memberId: formData.memberId,
      amount: parseNaira(formData.amount),
      type: formData.type,
      description: formData.description || undefined
    });

    setFormData({
      memberId: '',
      amount: '',
      type: 'contribution',
      description: ''
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Record Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="member">Member</Label>
            <Select
              value={formData.memberId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, memberId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {members.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="paymentType">Payment Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'contribution' | 'penalty' | 'withdrawal') => 
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contribution">Contribution</SelectItem>
                <SelectItem value="penalty">Penalty</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="paymentAmount">Amount (₦)</Label>
            <Input
              id="paymentAmount"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="e.g., 50000"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="paymentDescription">Description (optional)</Label>
            <Textarea
              id="paymentDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add a note about this payment"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Payment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};