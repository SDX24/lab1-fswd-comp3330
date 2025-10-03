import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function ExpensesList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => api.getExpenses()
  })

  if (isLoading) return <p>Loading…</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <ul className="mt-4 space-y-2">
      {data!.expenses.map(e => (
        <li key={e.id} className="flex justify-between rounded border p-2 bg-white">
          <span>{e.title}</span>
          <span>${e.amount}</span>
        </li>
      ))}
    </ul>
  )
}
