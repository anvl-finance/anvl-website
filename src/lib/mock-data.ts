import { Task, TaskStatus, TaskPriority } from '@/types';

// Mock initial tasks
export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design landing page',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-02-15',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Setup database',
    description: 'Configure PostgreSQL database and create initial schema',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-01-20',
    createdAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with examples',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-02-28',
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-12T11:00:00Z',
  },
  {
    id: '4',
    title: 'Code review',
    description: 'Review pull requests from team members',
    status: 'todo',
    priority: 'low',
    dueDate: '2024-02-10',
    createdAt: '2024-01-14T15:00:00Z',
    updatedAt: '2024-01-14T15:00:00Z',
  },
];

// localStorage key
const STORAGE_KEY = 'tasks_data';

// Initialize localStorage with mock data if empty
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
  }
}

// Get all tasks from localStorage
export function getTasks(): Task[] {
  if (typeof window === 'undefined') return initialTasks;
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initialTasks;
}

// Save tasks to localStorage
export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Create a new task
export function createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const tasks = getTasks();
  tasks.unshift(newTask);
  saveTasks(tasks);
  
  return newTask;
}

// Update an existing task
export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  tasks[index] = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveTasks(tasks);
  return tasks[index];
}

// Delete a task
export function deleteTask(id: string): boolean {
  const tasks = getTasks();
  const filtered = tasks.filter(t => t.id !== id);
  
  if (filtered.length === tasks.length) return false;
  
  saveTasks(filtered);
  return true;
}

// Get task by ID
export function getTaskById(id: string): Task | null {
  const tasks = getTasks();
  return tasks.find(t => t.id === id) || null;
}

// Filter tasks by status
export function getTasksByStatus(status: TaskStatus): Task[] {
  const tasks = getTasks();
  return tasks.filter(t => t.status === status);
}

// Filter tasks by priority
export function getTasksByPriority(priority: TaskPriority): Task[] {
  const tasks = getTasks();
  return tasks.filter(t => t.priority === priority);
}