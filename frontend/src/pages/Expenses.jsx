import { useState, useEffect } from "react"
import api from "../api"
import { ToggleScreenMode } from "../components/ToggleScreenMode"
import { LogoutButton } from "../components/LogoutButton"
import { useNavigate } from "react-router-dom"
import { PokemonButton } from '../components/PokemonButton'

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [editId, setEditId] = useState(null)
  const [editedAmount, setEditedAmount] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [newContent, setNewContent] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getExpenses()
  }, [])

  const getExpenses = () => {
    api
      .get("/api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        setExpenses(data)
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .post("/api/expenses/", { amount: newAmount, content: newContent })
      .then((res) => {
        if (res.status === 201) console.log("Expense created")
        else console.log("Failed to create expense")
        getExpenses()
        setNewAmount("")
        setNewContent("")
      })
      .catch((err) => console.log(err))
  }

  const deleteExpense = (id) => {
    api
      .delete(`/api/expenses/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log("Expenses deleted")
        else console.log("Failed to delete expense")
        getExpenses()
      })
      .catch((err) => console.log(err))
  }

  const startEditExpense = (expense) => {
    setEditId(expense.id)
    setEditedAmount(expense.amount)
    setEditedContent(expense.content)
  }

  const applyEditExpense = (id) => {
    api
      .put(`/api/expenses/update/${id}/`, {
        amount: editedAmount,
        content: editedContent,
      })
      .then((res) => {
        if (res.status === 200) console.log("Expense updated")
        else console.log("Failed to update expense")
        getExpenses()
        setEditId(null)
      })
      .catch((err) => console.log(err))
  }

  const cancelEdit = () => {
    setEditId(null)
  }

  return (
    <div className="max-w-screen-xl mx-auto py-5 px-5">
      <section className="max-w-screen-xl flex flex-row justify-between">
        <div className="">
          <PokemonButton />
        </div>
        <div className="flex flex-row gap-5">
          <button
            className="border border-yellow-300 bg-yellow-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Add notes
          </button>
          <ToggleScreenMode />
          <LogoutButton />
        </div>
      </section>
      <div className="flex flex-col justify-between items-center my-5">
        <h2 className="text-3xl">Expenses</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-sm mx-auto flex flex-col gap-3"
      >
        <label htmlFor="amount">Amount:</label>
        <input
          className="py-2 px-2 border border-indigo-300 bg-transparent rounded-md dark:text-white"
          type="number"
          id="amount"
          name="amount"
          required
          onChange={(e) => setNewAmount(e.target.value)}
          value={newAmount}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          className="py-2 px-2 border border-indigo-300 bg-transparent rounded-md dark:text-white"
          id="content"
          name="content"
          required
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
        />

        <input
          className="border border-indigo-300 bg-indigo-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300"
          type="submit"
          value="Submit"
        />
      </form>

      <hr className="my-5" />
      <div className="flex flex-col gap-10 max-w-screen-sm mx-auto max-h-[900px] overflow-auto py-2 px-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="border-2 border-dotted border-indigo-400 rounded-lg py-5 px-3 flex flex-col gap-5 relative"
          >
            <section className="max-w-xl mx-auto flex flex-col gap-2">
              <section className="flex flex-row align-middle justify-between">
                <h3 className="text-xl font-bold">Amount:</h3>
                {editId !== expense.id ? (
                  <span className="py-1 px-2 font-normal w-full capitalize-first">
                    {expense.amount} €
                  </span>
                ) : (
                  <input
                    className="ml-2 py-1 px-2 w-full border border-indigo-300/40 bg-transparent rounded-md"
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setEditedAmount(e.target.value)}
                    value={editedAmount}
                  />
                )}
              </section>
              <section className="flex flex-row align-middle justify-between">
                <p className="text-xl font-bold">Content:</p>
                {editId !== expense.id ? (
                  <span className="py-1 px-2 font-normal w-full capitalize-first">
                    {expense.content}
                  </span>
                ) : (
                  <textarea
                    className="ml-2 py-1 px-2 w-full border border-indigo-300/40 bg-transparent rounded-md"
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setEditedContent(e.target.value)}
                    value={editedContent}
                  />
                )}
              </section>
            </section>
            <section className="text-xs absolute bottom-3 left-3">
              Date:{" "}
              <span className="font-bold italic">
                {expense.created_at.slice(0, 10)}
              </span>
            </section>

            <section className="w-full flex align-middle justify-end gap-2">
              {editId !== expense.id ? (
                <>
                  <button
                    className="border border-indigo-300 bg-indigo-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300"
                    onClick={() => startEditExpense(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-red-300 bg-red-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-red-500 transition-all duration-300"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="border border-green-300 bg-green-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-green-500 transition-all duration-300"
                    onClick={() => applyEditExpense(expense.id)}
                  >
                    Apply
                  </button>
                  <button
                    className="border border-yellow-300 bg-yellow-500 py-2 px-5 min-w-20 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              )}
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Expenses
