'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ClipboardList, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Dancing_Script as DancingScript } from 'next/font/google'
import { todoSchema, defaultValues, Todo } from './schema'
import { useTaskStore } from '../../store/task-store'
import { ConfirmDialog } from '@/components/confirm-dialog'

const dancingScript = DancingScript({
  subsets: ['latin'],
  weight: '700',
})

export default function Home() {
  const { tasks, addTask, removeTask, toggleTask, resetTasks } = useTaskStore()

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  })

  const formSubmit = handleSubmit((data) => {
    addTask(data.title)
    reset()
  })

  const finishedTasks = tasks?.filter((todo) => todo.completed === true)

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-b bg-gray-300">
      <div
        className={cn(
          'text-center w-full text-4xl text-white pt-[6vh] pb-[14vh] -mb-[8vh] bg-gradient-to-b from-violet-950 to-violet-700',
          dancingScript.className,
        )}
      >
        ToDo List
      </div>
      <div className="flex-1 bg-muted w-full max-w-lg rounded-2xl rounded-b-none p-5 flex flex-col">
        <form onSubmit={formSubmit}>
          <div className="flex gap-1">
            <Input
              placeholder="Adicione uma tarefa"
              className="text-sm"
              {...register('title')}
            ></Input>
            <Button variant={'default'} size={'icon'} className="w-11">
              <Plus />
            </Button>
          </div>
          {errors.title && (
            <div className="text-xs text-destructive mt-3">
              {errors.title.message}
            </div>
          )}
        </form>

        {tasks?.length ? (
          <>
            <div className="flex gap-2 items-center justify-between py-6 font-semibold">
              <div className="text-violet-700">
                Tarefas <Badge className="bg-violet-700">{tasks?.length}</Badge>
              </div>
              <div className="text-blue-600">
                Concluídas{' '}
                <Badge className="bg-blue-600">{finishedTasks?.length}</Badge>
              </div>
            </div>

            <Separator />

            <div className="py-4 flex flex-1 flex-col gap-2 text-gray-700">
              {tasks?.map((task) => (
                <Card
                  key={task.id}
                  className="w-full p-2 pl-4 flex items-center gap-3"
                >
                  <div className="flex items-center flex-1">
                    <Label className="flex items-center gap-2 cursor-pointer font-normal">
                      <Checkbox
                        className="flex-shrink-0 w-5 h-5 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        onCheckedChange={() => toggleTask(task.id)}
                        checked={task.completed}
                      />
                      <span
                        className={
                          task.completed ? 'line-through opacity-60' : ''
                        }
                      >
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
                      <Trash2 className="text-destructive" />
                    </Button>
                  </ConfirmDialog>
                </Card>
              ))}
            </div>

            <Separator />

            <ConfirmDialog
              title="Limpar lista?"
              description="Ao confirmar, todas as tarefas serão removidas"
              onConfirm={resetTasks}
            >
              <Button size={'lg'} className="mt-4">
                <Trash2 className="mr-1" />
                Limpar lista
              </Button>
            </ConfirmDialog>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-700">
            <ClipboardList size={70} strokeWidth={0.7} className="mb-5" />
            <strong className="font-semibold">
              Você ainda não tem tarefas cadastradas
            </strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </div>
    </div>
  )
}
