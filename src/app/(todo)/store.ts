import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task } from './types'

type TaskStore = {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
  resetTasks: () => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title: string) => {
        const newTask: Task = {
          id: Date.now().toString(),
          title,
          completed: false,
        }
        set((state) => ({ tasks: [...state.tasks, newTask] }))
      },
      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        }))
      },
      removeTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
      resetTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'task-storage',
    },
  ),
)
