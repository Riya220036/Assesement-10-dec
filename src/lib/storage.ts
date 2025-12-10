// Local storage utilities for data persistence

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

// Storage keys
const PROJECTS_KEY = 'cms_projects';
const CLIENTS_KEY = 'cms_clients';
const CONTACTS_KEY = 'cms_contacts';
const SUBSCRIBERS_KEY = 'cms_subscribers';

// Generic storage functions
function getFromStorage<T>(key: string, defaultValue: T[] = []): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Projects
export const projectStorage = {
  getAll: (): Project[] => getFromStorage<Project>(PROJECTS_KEY),
  save: (projects: Project[]) => saveToStorage(PROJECTS_KEY, projects),
  add: (project: Omit<Project, 'id' | 'createdAt'>): Project => {
    const projects = projectStorage.getAll();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    projectStorage.save(projects);
    // background sync to backend
    (async () => {
      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        });
      } catch {
        // ignore network errors; localStorage remains source of truth
      }
    })();
    return newProject;
  },
  delete: (id: string) => {
    const projects = projectStorage.getAll().filter(p => p.id !== id);
    projectStorage.save(projects);
    (async () => {
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      } catch {
        // ignore
      }
    })();
  },
};

// Clients
export const clientStorage = {
  getAll: (): Client[] => getFromStorage<Client>(CLIENTS_KEY),
  save: (clients: Client[]) => saveToStorage(CLIENTS_KEY, clients),
  add: (client: Omit<Client, 'id' | 'createdAt'>): Client => {
    const clients = clientStorage.getAll();
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    clients.push(newClient);
    clientStorage.save(clients);
    (async () => {
      try {
        await fetch('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newClient),
        });
      } catch {}
    })();
    return newClient;
  },
  delete: (id: string) => {
    const clients = clientStorage.getAll().filter(c => c.id !== id);
    clientStorage.save(clients);
    (async () => {
      try {
        await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      } catch {}
    })();
  },
};

// Contacts
export const contactStorage = {
  getAll: (): Contact[] => getFromStorage<Contact>(CONTACTS_KEY),
  save: (contacts: Contact[]) => saveToStorage(CONTACTS_KEY, contacts),
  add: (contact: Omit<Contact, 'id' | 'createdAt'>): Contact => {
    const contacts = contactStorage.getAll();
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    contactStorage.save(contacts);
    (async () => {
      try {
        await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newContact),
        });
      } catch {}
    })();
    return newContact;
  },
};

// Subscribers
export const subscriberStorage = {
  getAll: (): Subscriber[] => getFromStorage<Subscriber>(SUBSCRIBERS_KEY),
  save: (subscribers: Subscriber[]) => saveToStorage(SUBSCRIBERS_KEY, subscribers),
  add: (email: string): Subscriber | null => {
    const subscribers = subscriberStorage.getAll();
    // Check if email already exists
    if (subscribers.some(s => s.email === email)) {
      return null;
    }
    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };
    subscribers.push(newSubscriber);
    subscriberStorage.save(subscribers);
    (async () => {
      try {
        await fetch('/api/subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch {}
    })();
    return newSubscriber;
  },
};
