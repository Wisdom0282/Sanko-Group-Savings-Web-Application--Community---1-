import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Info, 
  Shield, 
  Trash2, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Calendar,
  Target,
  HelpCircle,
  AlertTriangle,
  PiggyBank
} from 'lucide-react';

interface SettingsViewProps {
  onClearData: () => void;
}

export const SettingsView = ({ onClearData }: SettingsViewProps) => {
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onClearData();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">App information and data management</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* About Sanko */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-gray-900">About Sanko</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Version</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                    v1.0.0
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Platform</span>
                  <span className="text-gray-900">Nigerian Group Savings</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Currency</span>
                  <span className="text-gray-900">Nigerian Naira (₦)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Storage</span>
                  <span className="text-gray-900">Local Browser</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-gray-900">Features</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900">Group Creation & Management</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Member Management</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Payment Tracking</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Multiple Frequencies</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Target className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Progress Tracking</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Complete Audit Trail</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-gray-900">Data & Privacy</h3>
            </div>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-900">Privacy First</span>
                </div>
                <p className="text-sm text-blue-800">
                  Your data is stored locally in your browser. No information is sent to external servers, 
                  ensuring complete privacy and control over your financial information.
                </p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h4 className="text-red-900">Danger Zone</h4>
              </div>
              <p className="text-sm text-red-800 mb-4">
                This action will permanently delete all your groups, members, and payment history. 
                This cannot be undone.
              </p>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleClearData}
                className="flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All Data</span>
              </Button>
            </div>
          </Card>

          {/* Support & Help */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-gray-900">Help & Support</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-900 mb-2">Getting Started</h4>
                <p className="text-gray-600">
                  Sanko is designed to be simple and intuitive. Create groups, add members, 
                  and track contributions to reach your savings goals together.
                </p>
              </div>
              <div>
                <h4 className="text-gray-900 mb-3">Best Practices</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Target className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900">Set Realistic Goals</div>
                      <div className="text-sm text-gray-600">Choose achievable contribution amounts</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900">Regular Tracking</div>
                      <div className="text-sm text-gray-600">Monitor payments and progress regularly</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900">Clear Communication</div>
                      <div className="text-sm text-gray-600">Keep all members informed and engaged</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <div className="text-gray-900">Define Timelines</div>
                      <div className="text-sm text-gray-600">Set clear start and end dates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};