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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Dancing_Script as DancingScript } from 'next/font/google'
import { useState } from 'react'

const dancingScript = DancingScript({
  subsets: ['latin'],
  weight: '700',
})

type Task = {
  id: string
  title: string
  completed: boolean
}

const todoSchema = z.object({
  title: z.string().min(3, {
    message: 'Insira uma tarefa com no mínimo 3 caracteres',
  }),
})

const defaultValues = {
  title: '',
}

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>()

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues,
  })

  const formSubmit = handleSubmit((data) => {
    setTaskList((prev) => [
      ...(prev || []),
      {
        id: Math.random().toString(36),
        title: data.title,
        completed: false,
      },
    ])

    reset()
  })

  const finishedTasks = taskList?.filter((todo) => todo.completed === true)

  const deleteTask = (id: string) => {
    setTaskList((prev) => prev?.filter((task) => task.id !== id))
  }

  const deleteAllTasks = () => {
    setTaskList([])
  }

  const completeTask = (id: string) => {
    setTaskList((prev) =>
      prev?.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task
      }),
    )
  }

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

        {taskList?.length ? (
          <>
            <div className="flex gap-2 items-center justify-between py-6 font-semibold">
              <div className="text-violet-700">
                Tarefas{' '}
                <Badge className="bg-violet-700">{taskList?.length}</Badge>
              </div>
              <div className="text-blue-600">
                Concluídas{' '}
                <Badge className="bg-blue-600">{finishedTasks?.length}</Badge>
              </div>
            </div>

            <Separator />

            <div className="py-4 flex flex-1 flex-col gap-2 text-gray-700">
              {taskList?.map((task) => (
                <Card
                  key={task.id}
                  className="w-full p-2 pl-4 flex items-center gap-3"
                >
                  <div className="flex items-center flex-1">
                    <Label className="flex items-center gap-2 cursor-pointer font-normal">
                      <Checkbox
                        className="flex-shrink-0 w-5 h-5 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        onCheckedChange={() => completeTask(task.id)}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>

            <Separator />

            <Button size={'lg'} className="mt-4" onClick={deleteAllTasks}>
              <Trash2 className="mr-1" />
              Limpar lista
            </Button>
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
