import { useState, useEffect } from 'react';
import { subscriberStorage, type Subscriber } from '../../lib/storage';
import { Calendar, Mail } from 'lucide-react';

export function SubscribersList() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    const allSubscribers = subscriberStorage.getAll();
    // Sort by most recent first
    allSubscribers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSubscribers(allSubscribers);
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
        <h2 className="text-gray-900">Newsletter Subscribers</h2>
        <p className="text-gray-600 mt-2">
          View all newsletter subscribers. Total: {subscribers.length}
        </p>
      </div>

      {subscribers.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Email Address</th>
                  <th className="px-6 py-3 text-left text-gray-700">Subscribed On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-indigo-600" />
                        <span className="text-gray-900">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(subscriber.createdAt)}
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
          <p className="text-gray-500">No newsletter subscribers yet.</p>
        </div>
      )}
    </div>
  );
}
