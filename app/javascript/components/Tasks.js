import React from "react"
import { useEffect, useState } from "react"
import handleSubmit from "./handleSubmit"


const Tasks = () => {
  const url = '/api/v1/tasks/'
  const [tasks, setTasks] = useState(null)
  const [formMode, setFormMode] = useState(false)
  const buttonText = formMode ? "Cancel" : "New"

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        buildList(body)
      })
  }, [])


  function flipFlop(e) {
    const token = document.querySelector('[name=csrf-token]').content
    const url = `api/v1/tasks/${e.target.getAttribute("data-task-id")}/complete`

    // Don't allow the user to spam the button
    e.target.setAttribute("disabled", !e.target.getAttribute("disabled"))

    fetch(url, {
      method: "PATCH",
      body: "",
      headers: {
        'X-Transaction': 'Patch',
        'X-CSRF-Token': token
      }
    }).then((response) => response.json())
      .then((body) => {
        buildList(body)
      })
  }


  function changeMode() {
    setFormMode(!formMode)
  }


  function newTask(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const token = document.querySelector('[name=csrf-token]').content

    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        'X-Transaction': 'POST Example',
        'X-CSRF-Token': token
      }
    }).then((response) => response.json())
      .then((body) => {
        buildList(body)
        changeMode()
      })
  }


  function NewTaskForm() {
    return (
      <form id="new-task-form" onSubmit={newTask}>
        <div>
          <label htmlFor="name">Task Name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="daily">Daily:</label>
          <input type="checkbox" value={true} name="daily" />
        </div>
        <button type="submit" className="button-submit">Create</button>
      </form>
    )
  }


  // Rendering Stuff

  function buildList(body) {
    console.log(body)
    // This sorting is wonky as hell, but it works
    body.sort((t1, t2) => {
      const v1 = t1.complete ? 1 : 0;
      const v2 = t2.complete ? 1 : 0;
      return v2 - v1
    })
    const list = body.map(task =>
      <li key={task.id} class="task-list-item">
        <input class="task-list-bullet" type="checkbox" data-task-id={task.id} defaultChecked={task.complete} onChange={flipFlop} />
        <h3 className="task-list-item-title">{task.name}</h3>
      </li>
    )
    setTasks(list)
  }


  function TasksList() {
    return (
      <ul id="task-list">
        {tasks}
      </ul>
    )
  }


  return (
    <React.Fragment>
      <div className="component tasks-block">
        <div className="component-header">
          <h2>Tasks</h2>
          <button onClick={changeMode} className="button button-secondary">{buttonText}</button>
        </div>
        { formMode ? <NewTaskForm /> : <TasksList /> }
      </div>
    </React.Fragment>
  )
}


export default Tasks
