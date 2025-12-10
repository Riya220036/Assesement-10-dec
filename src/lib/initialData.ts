import { Project, Client } from './storage';

export const initialProjects: Omit<Project, 'id' | 'createdAt'>[] = [
  {
    name: 'Corporate Website Redesign',
    description: 'A modern, responsive website redesign for a leading financial services company. Features include interactive dashboards, real-time data integration, and seamless user experience.',
    image: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjUyOTI4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and advanced analytics. Built for scalability and performance.',
    image: 'https://images.unsplash.com/photo-1613211431746-aacbe481a84b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjUyOTMxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for health and fitness tracking. Includes real-time sync, social features, and personalized recommendations.',
    image: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY1MjIwODE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const initialClients: Omit<Client, 'id' | 'createdAt'>[] = [
  {
    name: 'Sarah Johnson',
    designation: 'CEO, TechCorp',
    description: 'Working with this team has been transformative for our business. Their attention to detail and commitment to excellence is unmatched. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1612116144183-d1ba477239f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMENFT3xlbnwxfHx8fDE3NjUyNDg3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Michael Chen',
    designation: 'Product Manager, InnovateLab',
    description: 'The project exceeded our expectations in every way. Professional, responsive, and delivered exactly what we needed. A true pleasure to work with.',
    image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBleGVjdXRpdmV8ZW58MXx8fHwxNzY1MjMxNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Emily Rodriguez',
    designation: 'Design Director, CreativeStudio',
    description: 'Outstanding work from start to finish. They understood our vision and brought it to life beautifully. The results speak for themselves.',
    image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTIyOTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
