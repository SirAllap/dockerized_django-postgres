/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import api from "../api"
import { ToggleScreenMode } from "../components/ToggleScreenMode"
import { LogoutButton } from "../components/LogoutButton"
import { useNavigate } from "react-router-dom"
import { PokemonButton } from '../components/PokemonButton'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [editId, setEditId] = useState(null)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [attachId, setAttachId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getNotes()
    getExpenses()
  }, [])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data)
      })
      .catch((err) => console.log(err))
  }

  const getExpenses = () => {
    api
      .get("/api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        setExpenses(data)
      })
      .catch((err) => console.log(err))
  }

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log("Note deleted")
        else console.log("Failed to delete note")
        getNotes()
      })
      .catch((err) => console.log(err))
  }

  const createNote = (e) => {
    e.preventDefault()
    api
      .post("/api/notes/", {
        content: newContent,
        title: newTitle,
        expense: selectedExpense,
      })
      .then((res) => {
        if (res.status === 201) console.log("Note created")
        else console.log("Failed to make note")
        getNotes()
        setNewTitle("")
        setNewContent("")
        setSelectedExpense(null)
      })
      .catch((err) => console.log(err))
  }

  const startEditNote = (note) => {
    setEditId(note.id)
    setEditedTitle(note.title)
    setEditedContent(note.content)
  }

  const startAttachExpense = (note) => {
    setAttachId(note.id)
  }

  const applyEditNote = (id) => {
    api
      .put(`/api/notes/update/${id}/`, {
        title: editedTitle,
        content: editedContent,
        expense: selectedExpense,
      })
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) console.log("Note updated")
        else console.log("Failed to update note")
        getNotes()
        setEditId(null)
        setAttachId(null)
        setEditedTitle("")
        setEditedContent("")
        setSelectedExpense(null)
      })
      .catch((err) => console.log(err))
  }

  const cancelEdit = () => {
    setEditId(null)
  }

  return (
    <div className="max-w-screen-xl mx-auto py-5 px-5 h-svh">
      <section className="max-w-screen-xl flex flex-row justify-between">
        <div className="">
          <PokemonButton />
        </div>
        <div className="flex flex-row gap-5">
          <button
            className="border border-yellow-300 bg-yellow-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
            onClick={() => navigate("/expenses")}
          >
            Add expenses
          </button>
          <ToggleScreenMode />
          <LogoutButton />
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-between items-center my-5">
          <h2 className="text-3xl">Notes</h2>
          <h2 className="text-xl">Create a Note</h2>
        </div>
        <form
          onSubmit={createNote}
          className="max-w-screen-sm mx-auto flex flex-col gap-3"
        >
          <label htmlFor="title">Title:</label>
          <input
            className="py-2 px-2 border border-pink-300 bg-transparent rounded-md dark:text-white"
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />

          <label htmlFor="content">Content:</label>
          <textarea
            className="py-2 px-2 border border-pink-300 bg-transparent rounded-md dark:text-white"
            id="content"
            name="content"
            required
            onChange={(e) => setNewContent(e.target.value)}
            value={newContent}
          />

          <label htmlFor="content">Attach Expense:</label>
          <select
            className="py-2 px-2 border border-pink-300 bg-transparent rounded-md dark:text-white"
            onChange={(e) => {
              const expenseId = parseInt(e.target.value)
              setSelectedExpense(expenseId)
            }}
            defaultValue="Select expense"
          >
            <option value="Select expense" disabled hidden>
              Select expense
            </option>
            {expenses.map((expense) => (
              <option key={expense.id} value={expense.id}>
                {expense.content}
              </option>
            ))}
          </select>

          <input
            className="border border-pink-300 bg-pink-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-pink-500 transition-all duration-300"
            type="submit"
            value="Submit"
          />
        </form>
        <hr className="my-5" />
        <div className="flex flex-col gap-10 max-w-screen-sm mx-auto max-h-[700px] overflow-auto py-2 px-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border-2 border-dotted border-pink-400 rounded-lg py-5 px-3 flex flex-col gap-5 relative"
            >
              <section className="w-2/3 mx-auto flex flex-col gap-2 ">
                <section className="flex flex-row align-middle justify-between">
                  <h3 className="text-xl font-bold">Title:</h3>
                  {editId !== note.id ? (
                    <span className="py-1 px-2 font-normal w-full capitalize-first">
                      {note.title}
                    </span>
                  ) : (
                    <input
                      className="ml-2 py-1 px-2 w-full border border-pink-300/40 bg-transparent rounded-md"
                      type="text"
                      id="title"
                      name="title"
                      required
                      onChange={(e) => setEditedTitle(e.target.value)}
                      value={editedTitle}
                    />
                  )}
                </section>
                <section className="flex flex-row align-middle justify-between">
                  <p className="text-xl font-bold">Content:</p>
                  {editId !== note.id ? (
                    <span className="py-1 px-2 font-normal w-full capitalize-first">
                      {note.content}
                    </span>
                  ) : (
                    <textarea
                      className="ml-2 py-1 px-2 w-full border border-pink-300/40 bg-transparent rounded-md"
                      id="content"
                      name="content"
                      required
                      onChange={(e) => setEditedContent(e.target.value)}
                      value={editedContent}
                    />
                  )}
                </section>
                <section>
                  {note.expense_detail && (
                    <section className="group border-2 border-dotted border-green-400 rounded-lg py-3 px-3 hover:bg-green-300/10 transition-all duration-300 h-14 hover:h-24 overflow-clip">
                      <p className="py-1 px-2 font-bold italic">
                        Expense: {note.expense_detail.content}
                      </p>
                      <p className="py-1 px-2 font-bold italic invisible group-hover:visible transition-ease-in duration-300">
                        Price: {note.expense_detail.amount}
                      </p>
                    </section>
                  )}
                </section>
              </section>
              <section className="text-xs absolute bottom-3 left-3">
                Author of the note:{" "}
                <span className="font-bold italic">{note.author.username}</span>
              </section>
              <section className="w-full flex align-middle justify-end gap-2">
                {editId !== note.id ? (
                  <>
                    {attachId !== note.id ? (
                      !note.expense_detail && (
                        <button
                          className="border border-green-300 bg-green-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-green-500 transition-all duration-300"
                          onClick={() => startAttachExpense(note)}
                        >
                          Attach Expense
                        </button>
                      )
                    ) : (
                      <>
                        <select
                          className="py-2 px-2 w-full border border-pink-300 bg-transparent rounded-md dark:text-white"
                          onChange={(e) => {
                            const expenseId = parseInt(e.target.value)
                            setSelectedExpense(expenseId)
                            setEditedTitle(note.title)
                            setEditedContent(note.content)
                          }}
                          defaultValue="Select expense"
                        >
                          <option value="Select expense" disabled hidden>
                            Select expense
                          </option>
                          {expenses.map((expense) => (
                            <option key={expense.id} value={expense.id}>
                              {expense.content}
                            </option>
                          ))}
                        </select>
                        <button
                          className="border border-red-300 bg-red-500 py-2 px-5 text-white rounded-md hover:bg-red-500/20 hover:text-red-500 transition-all duration-300"
                          onClick={() => applyEditNote(note.id)}
                        >
                          +
                        </button>

                        <button
                          className="border border-red-300 bg-red-500 py-2 px-5 text-white rounded-md hover:bg-red-500/20 hover:text-red-500 transition-all duration-300"
                          onClick={() => setAttachId(null)}
                        >
                          X
                        </button>
                      </>
                    )}
                    <button
                      className="border border-pink-300 bg-pink-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-pink-500 transition-all duration-300"
                      onClick={() => startEditNote(note)}
                    >
                      Edit
                    </button>
                    <button
                      className="border border-red-300 bg-red-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-red-500 transition-all duration-300"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="border border-green-300 bg-green-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-green-500 transition-all duration-300"
                      onClick={() => applyEditNote(note.id)}
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
      </section>
    </div>
  )
}

export default Home
