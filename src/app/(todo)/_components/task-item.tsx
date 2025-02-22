'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useTaskStore } from '@/store/task-store'
import { Task } from '@/types/task'
import { Trash2 } from 'lucide-react'

type TaskItemProps = {
  task: Task
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { removeTask, toggleTask } = useTaskStore()

  return (
    <Card className="w-full p-2 pl-4 flex items-center gap-3 dark:bg-gray-900">
      <div className="flex items-center flex-1">
        <Label className="flex items-center gap-2 cursor-pointer font-normal">
          <Checkbox
            className="flex-shrink-0 w-5 h-5 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            onCheckedChange={() => toggleTask(task.id)}
            checked={task.completed}
          />
          <span className={task.completed ? 'line-through opacity-60' : ''}>
            {task.title}
          </span>
        </Label>
      </div>
      <ConfirmDialog
        title="Remover tarefa?"
        description="Ao confirmar, a tarefa será removida da lista"
        onConfirm={() => removeTask(task.id)}
      >
        <Button variant="ghost" size="sm" className="flex-shrink-0">
          <Trash2 className="text-destructive dark:text-gray-600" />
        </Button>
      </ConfirmDialog>
    </Card>
  )
}
