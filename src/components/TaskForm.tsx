import React, { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
  editingTask?: Task | null;
  isVisible: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  editingTask,
  isVisible
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || ''
      });
    } else {
      setFormData({ title: '', description: '' });
    }
    setErrors({});
  }, [editingTask, isVisible]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined
      });
      
      if (!editingTask) {
        setFormData({ title: '', description: '' });
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
    onCancel?.();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingTask ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
              errors.title 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="Digite o título da tarefa..."
            maxLength={100}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        <div>
          <label 
            htmlFor="description" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none"
            placeholder="Adicione uma descrição para sua tarefa..."
            rows={3}
            maxLength={500}
          />
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.description?.length || 0}/500 caracteres
          </div>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            {editingTask ? '💾 Salvar Alterações' : '➕ Adicionar Tarefa'}
          </button>
          
          {(editingTask || onCancel) && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              ✕ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;