const mongoose = require('mongoose');
require('dotenv').config();

const Client = require('./models/Client');
const Project = require('./models/Project');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-overview';

const clients = [
  {
    name: 'Sarah Johnson',
    designation: 'CEO, TechCorp',
    description: 'Working with this team has been transformative for our business.',
    image: 'https://images.unsplash.com/photo-1612116144183-d1ba477239f9',
  },
  {
    name: 'Michael Chen',
    designation: 'Product Manager, InnovateLab',
    description: 'The project exceeded our expectations in every way.',
    image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
  },
];

const projects = [
  {
    title: 'Corporate Website Redesign',
    description: 'A modern, responsive website redesign for a leading financial services company.',
    status: 'active',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and analytics.',
    status: 'planned',
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB');

  await Client.deleteMany({});
  await Project.deleteMany({});

  const createdClients = await Client.insertMany(clients);
  console.log('Inserted clients:', createdClients.length);

  // Attach first client to first project if available
  if (createdClients.length > 0) {
    projects[0].client = createdClients[0]._id;
  }

  const createdProjects = await Project.insertMany(projects);
  console.log('Inserted projects:', createdProjects.length);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
