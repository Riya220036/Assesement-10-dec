import { useEffect, useState } from 'react';
import { Hero } from './landing/Hero';
import { Projects } from './landing/Projects';
import { Clients } from './landing/Clients';
import { ContactForm } from './landing/ContactForm';
import { Newsletter } from './landing/Newsletter';
import { Footer } from './landing/Footer';
import { SmoothScroll } from './SmoothScroll';
import { projectStorage, clientStorage } from '../lib/storage';
import { initialProjects, initialClients } from '../lib/initialData';
import type { Project, Client } from '../lib/storage';

export function Landing() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    // Load data from storage
    let loadedProjects = projectStorage.getAll();
    let loadedClients = clientStorage.getAll();

    // Initialize with default data if empty
    if (loadedProjects.length === 0) {
      initialProjects.forEach(project => {
        projectStorage.add(project);
      });
      loadedProjects = projectStorage.getAll();
    }

    if (loadedClients.length === 0) {
      initialClients.forEach(client => {
        clientStorage.add(client);
      });
      loadedClients = clientStorage.getAll();
    }

    setProjects(loadedProjects);
    setClients(loadedClients);
  }, []);

  return (
    <div className="min-h-screen">
      <SmoothScroll />
      <Hero />
      <Projects projects={projects} />
      <Clients clients={clients} />
      <ContactForm />
      <Newsletter />
      <Footer />
    </div>
  );
}