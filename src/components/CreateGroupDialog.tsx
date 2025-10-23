import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { parseNaira } from '../utils/currency';

interface CreateGroupDialogProps {
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
}

export const CreateGroupDialog = ({ onCreateGroup }: CreateGroupDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAmount: '',
    contributionAmount: '',
    contributionFrequency: 'monthly' as const,
    startDate: '',
    endDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.contributionAmount || !formData.startDate || !formData.endDate) {
      return;
    }

    onCreateGroup({
      name: formData.name,
      description: formData.description,
      targetAmount: parseNaira(formData.targetAmount),
      contributionAmount: parseNaira(formData.contributionAmount),
      contributionFrequency: formData.contributionFrequency,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'active'
    });

    setFormData({
      name: '',
      description: '',
      targetAmount: '',
      contributionAmount: '',
      contributionFrequency: 'monthly',
      startDate: '',
      endDate: ''
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Savings Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Vacation Fund 2025"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What is this group saving for?"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="targetAmount">Target Amount (₦)</Label>
            <Input
              id="targetAmount"
              value={formData.targetAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
              placeholder="e.g., 2000000"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="contributionAmount">Contribution Amount (₦)</Label>
            <Input
              id="contributionAmount"
              value={formData.contributionAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, contributionAmount: e.target.value }))}
              placeholder="e.g., 50000"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="frequency">Contribution Frequency</Label>
            <Select
              value={formData.contributionFrequency}
              onValueChange={(value: 'weekly' | 'monthly' | 'quarterly') => 
                setFormData(prev => ({ ...prev, contributionFrequency: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};