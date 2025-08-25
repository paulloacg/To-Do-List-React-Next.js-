import { Task } from '@/types/task';

const STORAGE_KEY = 'todo-tasks';

export const getTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    if (!tasks) return [];
    
    const parsedTasks = JSON.parse(tasks);
    return parsedTasks.map((task: Omit<Task, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string }) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }));
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};