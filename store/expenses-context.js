import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
   {
      id: 'e1',
      description: 'Nike shoes',
      amount: 129.99,
      date: new Date('2023-01-01'),
   },
   {
      id: 'e2',
      description: 'Jacket',
      amount: 99.99,
      date: new Date('2023-01-05'),
   },
   {
      id: 'e3',
      description: 'T-shirt',
      amount: 55,
      date: new Date('2023-01-10'),
   },
   {
      id: 'e4',
      description: 'A book',
      amount: 19.99,
      date: new Date('2023-01-08'),
   },
   {
      id: 'e5',
      description: 'A toy',
      amount: 25.99,
      date: new Date('2022-08-11'),
   },
   {
      id: 'e6',
      description: 'Nike shoes',
      amount: 129.99,
      date: new Date('2023-01-01'),
   },
   {
      id: 'e7',
      description: 'Jacket',
      amount: 99.99,
      date: new Date('2023-01-05'),
   },
   {
      id: 'e8',
      description: 'T-shirt',
      amount: 55,
      date: new Date('2023-01-10'),
   },
   {
      id: 'e9',
      description: 'A book',
      amount: 19.99,
      date: new Date('2023-01-08'),
   },
   {
      id: 'e10',
      description: 'A toy',
      amount: 25.99,
      date: new Date('2022-08-11'),
   },
];

export const ExpensesContext = createContext({
   expenses: [],
   addExpense: ({ description, amount, date }) => {},
   deleteExpense: (id) => {},
   updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
   switch (action.type) {
      case 'ADD':
         const id = new Date().toString() + Math.random().toString();
         return [{ ...action.payload, id: id }, ...state];
      case 'UPDATE':
         const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
         const updatableExpense = state[updatableExpenseIndex];
         const updatedItem = { ...updatableExpense, ...action.payload.data };
         const updatedExpenses = [...state];
         updatedExpenses[updatableExpenseIndex] = updatedItem;
         return updatedExpenses;
      case 'DELETE':
         return state.filter((expense) => expense.id !== action.payload);
      default:
         return state;
   }
}

function ExpensesContextProvider({ children }) {
   const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

   function addExpense(expenseData) {
      dispatch({ type: 'ADD', payload: expenseData });
   }

   function deleteExpense(id) {
      dispatch({ type: 'DELETE', payload: id });
   }

   function updateExpense(id, expenseData) {
      dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
   }

   const value = {
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
   };

   return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
