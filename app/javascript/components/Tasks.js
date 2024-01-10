import React from "react"
import { useEffect, useState } from "react"


const Tasks = () => {
  const url = '/api/v1/tasks/'
  const [tasks, setTasks] = useState(null)
  const [formMode, setFormMode] = useState(false)
  const buttonText = formMode ? "Cancel" : "New"
  const token = document.querySelector('[name=csrf-token]').content


  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        buildList(body)
      })
  }, [])


  function flipFlop(e) {
    const token = document.querySelector('[name=csrf-token]').content
    const flipURL = url + `${e.target.getAttribute("data-task-id")}/complete`

    // Don't allow the user to spam the button
    e.target.setAttribute("disabled", !e.target.getAttribute("disabled"))

    fetch(flipURL, {
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
        setFormMode(false)
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


  function deleteTask(e) {
    const deleteURL = e.target.getAttribute("action")
    e.target.setAttribute("disabled", "true")

    fetch(deleteURL, {
      method: "DELETE",
      body: "",
      headers: {
        'X-Transaction': 'POST Example',
        'X-CSRF-Token': token
      }
    }).then((response) => response.json())
      .then((body) => {
        buildList(body)
      })
  }

  // Rendering Stuff

  function buildList(body) {
    // console.log(body)
    // This sorting is wonky as hell, but it works
    body.sort((t1, t2) => {
      const v1 = t1.complete ? 1 : 0;
      const v2 = t2.complete ? 1 : 0;
      return v1 - v2
    })
    const list = body.map(task =>
      <li key={task.id} className="task-list-item">
        <input type="checkbox" data-task-id={task.id} defaultChecked={task.complete} onChange={flipFlop} />
        <h3>{task.name}</h3>
        <button className="button button-warning hidden" action={url + task.id} onClick={deleteTask}>Delete</button>
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
