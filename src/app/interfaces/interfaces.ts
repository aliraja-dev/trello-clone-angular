export interface Board {
  uid: string;
  userId?: string;
  title: string;
  priority?: number;
  createdAt?: Date | string;
  tasks?: Task[];
}

/**
 * To sort the tasks, by date, we need to use the Date type.
 */

export interface Task {
  description: string;
  label: 'purple' | 'green' | 'yellow' | 'red' | 'blue' | 'orange';
  createdAt: Date | string;
}


export interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}
