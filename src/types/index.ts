// Common types for the application
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface PresignedUrlResponse {
  uploadId: string;
  presignedUrl: string;
  s3Key: string;
  expiresIn: number;
}

export interface UploadCompleteRequest {
  uploadId: string;
  s3Key: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

// Task Management Types
export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}