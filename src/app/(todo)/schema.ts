import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string().trim().min(3, {
    message: 'Insira uma tarefa com no mínimo 3 caracteres',
  }),
})

export type Todo = z.infer<typeof todoSchema>

export const defaultValues = {
  title: '',
}
