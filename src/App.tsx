import { useAppState } from './hooks/useAppState';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { GroupsView } from './components/GroupsView';
import { PaymentsView } from './components/PaymentsView';
import { SettingsView } from './components/SettingsView';
import { clearState } from './utils/storage';

export default function App() {
  const {
    state,
    createGroup,
    addMember,
    addPayment,
    setCurrentView,
    setSelectedGroup,
    getSelectedGroup,
    getTotalBalance,
    getExpectedMonthly
  } = useAppState();

  const handleClearData = () => {
    clearState();
    window.location.reload();
  };

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'dashboard':
        return (
          <Dashboard
            groups={state.groups}
            totalBalance={getTotalBalance()}
            expectedMonthly={getExpectedMonthly()}
            onGroupSelect={(groupId) => {
              setSelectedGroup(groupId);
              setCurrentView('groups');
            }}
          />
        );
      
      case 'groups':
        return (
          <GroupsView
            groups={state.groups}
            onCreateGroup={createGroup}
            onGroupSelect={(groupId) => setSelectedGroup(groupId)}
            selectedGroup={getSelectedGroup()}
            onAddMember={addMember}
            onAddPayment={addPayment}
          />
        );
      
      case 'payments':
        return <PaymentsView groups={state.groups} />;
      
      case 'settings':
        return <SettingsView onClearData={handleClearData} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentView={state.currentView} 
        onViewChange={setCurrentView} 
      />
      <main className="relative">
        {renderCurrentView()}
      </main>
    </div>
  );
}