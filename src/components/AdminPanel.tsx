import { useState } from 'react';
import { LayoutDashboard, FolderOpen, Users, Mail, Send } from 'lucide-react';
import { ProjectManagement } from './admin/ProjectManagement';
import { ClientManagement } from './admin/ClientManagement';
import { ContactsList } from './admin/ContactsList';
import { SubscribersList } from './admin/SubscribersList';

type Tab = 'projects' | 'clients' | 'contacts' | 'subscribers';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const tabs = [
    { id: 'projects' as Tab, label: 'Projects', icon: FolderOpen },
    { id: 'clients' as Tab, label: 'Clients', icon: Users },
    { id: 'contacts' as Tab, label: 'Contact Forms', icon: Mail },
    { id: 'subscribers' as Tab, label: 'Subscribers', icon: Send },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'clients' && <ClientManagement />}
        {activeTab === 'contacts' && <ContactsList />}
        {activeTab === 'subscribers' && <SubscribersList />}
      </main>
    </div>
  );
}
