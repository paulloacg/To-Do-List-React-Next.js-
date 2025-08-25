import React, { useState } from 'react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 transition-all duration-200 hover:shadow-lg ${
      task.completed 
        ? 'border-green-500 bg-green-50' 
        : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${
              task.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-1 text-sm ${
                task.completed 
                  ? 'line-through text-gray-400' 
                  : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="mt-2 text-xs text-gray-400">
              <span>Criado em: {formatDate(task.createdAt)}</span>
              {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                <span className="ml-4">Atualizado em: {formatDate(task.updatedAt)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          {!task.completed && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
              title="Editar tarefa"
            >
              ✏️
            </button>
          )}
          
          <button
            onClick={handleDelete}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              showDeleteConfirm
                ? 'text-white bg-red-600 hover:bg-red-700'
                : 'text-red-600 hover:bg-red-100'
            }`}
            title={showDeleteConfirm ? 'Confirmar exclusão' : 'Excluir tarefa'}
          >
            {showDeleteConfirm ? '✓' : '🗑️'}
          </button>
          
          {showDeleteConfirm && (
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Cancelar"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;