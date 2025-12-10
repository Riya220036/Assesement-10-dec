import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Landing } from './components/Landing';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Toggle between Landing and Admin */}
      <button
        onClick={() => setIsAdminView(!isAdminView)}
        className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl hover:bg-gray-800 transition-all flex items-center gap-2 group"
        title={isAdminView ? 'View Landing Page' : 'Open Admin Panel'}
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline">{isAdminView ? 'Landing' : 'Admin'}</span>
      </button>

      {isAdminView ? <AdminPanel /> : <Landing />}
    </div>
  );
}