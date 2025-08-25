'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import Toast from '@/components/Toast';
import { Task, TaskFormData } from '@/types/task';
import { getTasks, saveTasks, generateId } from '@/utils/storage';

type FilterType = 'all' | 'pending' | 'completed';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    isVisible: false
  });

  // Carregar tarefas do localStorage na inicialização
  useEffect(() => {
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  // Salvar tarefas no localStorage sempre que a lista mudar
  useEffect(() => {
    if (tasks.length > 0 || getTasks().length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
    showToast('Tarefa adicionada com sucesso!', 'success');
  };

  const handleEditTask = (formData: TaskFormData) => {
    if (!editingTask) return;

    setTasks(prev => prev.map(task => 
      task.id === editingTask.id 
        ? {
            ...task,
            title: formData.title,
            description: formData.description,
            updatedAt: new Date()
          }
        : task
    ));

    setEditingTask(null);
    setShowForm(false);
    showToast('Tarefa atualizada com sucesso!', 'success');
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? {
            ...task,
            completed: !task.completed,
            updatedAt: new Date()
          }
        : task
    ));

    const task = tasks.find(t => t.id === id);
    if (task) {
      showToast(
        task.completed ? 'Tarefa marcada como pendente' : 'Tarefa concluída!',
        'success'
      );
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    showToast('Tarefa excluída com sucesso!', 'success');
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const { total, completed, pending } = getTaskCounts();

  return (
    <Layout>
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{total}</div>
          <div className="text-sm text-gray-600">Total de Tarefas</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{pending}</div>
          <div className="text-sm text-gray-600">Pendentes</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{completed}</div>
          <div className="text-sm text-gray-600">Concluídas</div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todas ({total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pendentes ({pending})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Concluídas ({completed})
          </button>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            ➕ Nova Tarefa
          </button>
        )}
      </div>

      {/* Formulário */}
      <TaskForm
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        onCancel={handleCancelEdit}
        editingTask={editingTask}
        isVisible={showForm}
      />

      {/* Lista de Tarefas */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {filter === 'all' && 'Nenhuma tarefa encontrada'}
              {filter === 'pending' && 'Nenhuma tarefa pendente'}
              {filter === 'completed' && 'Nenhuma tarefa concluída'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' && 'Comece adicionando sua primeira tarefa!'}
              {filter === 'pending' && 'Todas as tarefas foram concluídas! 🎉'}
              {filter === 'completed' && 'Nenhuma tarefa foi concluída ainda.'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      {/* Toast de Notificação */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </Layout>
  );
}
