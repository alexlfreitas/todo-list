'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ClipboardList, Github, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Dancing_Script as DancingScript } from 'next/font/google'
import { todoSchema, defaultValues, Todo } from './schema'
import { useTaskStore } from '../../store/task-store'
import { ConfirmDialog } from '@/components/confirm-dialog'

import Link from 'next/link'
import { TaskItem } from './_components/task-item'
import { ToggleTheme } from '@/components/toggle-theme'

const dancingScript = DancingScript({
  subsets: ['latin'],
  weight: '700',
})

export default function Home() {
  const { tasks, addTask, resetTasks } = useTaskStore()

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
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-b bg-gray-300 dark:bg-background">
        <div
          className={cn(
            'text-center w-full text-4xl text-white pt-[6vh] pb-[14vh] -mb-[8vh] bg-gradient-to-b from-indigo-900 to-indigo-800 dark:bg-none dark:bg-slate-900 dark:text-violet-400',
            dancingScript.className,
          )}
        >
          ToDo List
        </div>
        <div className="w-full flex justify-center px-4 flex-1">
          <div className="bg-muted w-full max-w-lg rounded-2xl p-5 flex flex-col">
            <form onSubmit={formSubmit}>
              <div className="flex items-center gap-1">
                <Input
                  placeholder="Adicione uma tarefa"
                  className="h-10 text-sm"
                  {...register('title')}
                ></Input>
                <Button
                  variant={'default'}
                  size={'icon'}
                  className="h-10 w-11 flex-shrink-0"
                >
                  <Plus />
                </Button>
              </div>
              {errors.title && (
                <div className="text-xs font-medium text-destructive dark:text-red-400 mt-3">
                  {errors.title.message}
                </div>
              )}
            </form>

            {tasks?.length ? (
              <>
                <div className="flex gap-2 items-center justify-between py-6 font-semibold">
                  <div className="text-violet-700 dark:text-violet-500">
                    Tarefas{' '}
                    <Badge className="bg-violet-700 dark:bg-violet-500">
                      {tasks?.length}
                    </Badge>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">
                    Concluídas{' '}
                    <Badge className="bg-blue-600 dark:bg-blue-400">
                      {finishedTasks?.length}
                    </Badge>
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div className="py-4 flex flex-1 flex-col gap-2 text-gray-700">
                  {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
                </div>

                <Separator className="dark:bg-gray-700" />

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
              <div className="flex flex-1 flex-col items-center justify-center text-gray-700 dark:text-gray-500">
                <ClipboardList size={70} strokeWidth={0.7} className="mb-5" />
                <strong className="font-semibold">
                  Você ainda não tem tarefas cadastradas
                </strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-1 text-xs text-gray-500 py-6">
          Coded by
          <Link
            href="https://github.com/alexlfreitas"
            target="_blank"
            className="flex gap-1 items-center justify-center hover:text-violet-700"
          >
            Alex Freitas
            <Github size={16} />
          </Link>
        </div>
      </div>
      <ToggleTheme />
    </>
  )
}
