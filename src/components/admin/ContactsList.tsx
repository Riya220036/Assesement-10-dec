import { useState, useEffect } from 'react';
import { contactStorage, type Contact } from '../../lib/storage';
import { Calendar } from 'lucide-react';

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const allContacts = contactStorage.getAll();
    // Sort by most recent first
    allContacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setContacts(allContacts);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-gray-900">Contact Form Submissions</h2>
        <p className="text-gray-600 mt-2">
          View all contact form submissions from the landing page.
        </p>
      </div>

      {contacts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Full Name</th>
                  <th className="px-6 py-3 text-left text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-gray-700">Mobile</th>
                  <th className="px-6 py-3 text-left text-gray-700">City</th>
                  <th className="px-6 py-3 text-left text-gray-700">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{contact.fullName}</td>
                    <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                    <td className="px-6 py-4 text-gray-600">{contact.mobile}</td>
                    <td className="px-6 py-4 text-gray-600">{contact.city}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No contact form submissions yet.</p>
        </div>
      )}
    </div>
  );
}
