import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import ExpensesListPage from './routes/expenses.list'
import ExpenseDetailPage from './routes/expenses.detail'
import ExpenseNewPage from './routes/expenses.new'

const rootRoute = createRootRoute({
  component: () => <App />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <p>Home Page</p>,
})

const expensesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expenses',
  component: ExpensesListPage,
})

// Update just this route:
const expenseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expenses/$id',
  component: ExpenseDetailPage, // No need to pass params here
})

// Add this route for creating new expenses
const expenseNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expenses/new',
  component: ExpenseNewPage,
})

// Make sure to include the new routes in your route tree
const routeTree = rootRoute.addChildren([
  indexRoute, 
  expensesRoute,
  expenseNewRoute,  // Note: place this before expenseDetailRoute for proper matching
  expenseDetailRoute,
])

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({ routeTree })

router.update({
  defaultNotFoundComponent: () => <p>Page not found</p>,
  defaultErrorComponent: ({ error }) => <p>Error: {(error as Error).message}</p>,
})
export function AppRouter() {
  return <RouterProvider router={router} />
}
