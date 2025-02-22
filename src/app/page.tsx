import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ClipboardList, Plus, Trash2 } from 'lucide-react'

import { Dancing_Script as DancingScript } from 'next/font/google'

const dancingScript = DancingScript({
  subsets: ['latin'],
  weight: '700',
})

export default function Home() {
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
        <form>
          <div className="flex gap-1">
            <Input
              placeholder="Adicione uma tarefa"
              className="text-sm"
            ></Input>
            <Button variant={'default'} size={'icon'} className="w-11">
              <Plus />
            </Button>
          </div>
        </form>

        <div className="flex gap-2 items-center justify-between py-6 font-semibold">
          <div className="text-violet-700">
            Tarefas <Badge className="bg-violet-700">10</Badge>
          </div>
          <div className="text-blue-600">
            Concluídas <Badge className="bg-blue-600">10</Badge>
          </div>
        </div>

        <Separator />

        <div className="py-4 flex flex-1 flex-col gap-2 text-gray-700">
          <Card className="w-full p-2 pl-4 flex items-center gap-3">
            <Checkbox className="flex-shrink-0" />
            <span className="flex-1">Tarefa 1234</span>
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <Trash2 className="text-destructive" />
            </Button>
          </Card>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-gray-700">
          <ClipboardList size={70} strokeWidth={0.7} className="mb-5" />
          <strong className="font-semibold">
            Você ainda não tem tarefas cadastradas
          </strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      </div>
    </div>
  )
}
