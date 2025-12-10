import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { projectStorage, type Project } from '../../lib/storage';
import { toast } from 'sonner@2.0.3';

export function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setProjects(projectStorage.getAll());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    projectStorage.add(formData);
    toast.success('Project added successfully!');
    setFormData({ name: '', description: '', image: '' });
    setIsAdding(false);
    loadProjects();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      projectStorage.delete(id);
      toast.success('Project deleted successfully!');
      loadProjects();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-900">Project Management</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Add Project Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Add New Project</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Project Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full min-h-[100px]"
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Project Image *</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
                  )}
                </div>
                <p className="text-gray-500 mt-1">Or enter image URL:</p>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="w-full mt-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save Project
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-600 hover:text-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !isAdding && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No projects yet. Click &quot;Add Project&quot; to get started.</p>
        </div>
      )}
    </div>
  );
}
