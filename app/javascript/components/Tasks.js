import React from "react"
import { useEffect, useState } from "react"

const Tasks = (props) => {
  const url = '/api/v1/tasks/'
  const [tasks, setTasks] = useState(null)
  const [formMode, setFormMode] = useState(false)
  const buttonText = formMode ? "Cancel" : "New"

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        setTasks(buildList(body))
      })
  }, [])

  function buildList(body) {
    console.log(body)
    const list = body.map(task =>
      <li key={task.id}>{task.name}</li>
    )
    return list
  }

  function changeMode() {
    setFormMode(!formMode)
  }

  function newTask(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const token = document.querySelector('[name=csrf-token]').content

    // Uncomment to see form data in console
    const formJson = Object.fromEntries(data.entries());
    console.log(formJson);


    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        'X-Transaction': 'POST Example',
        'X-CSRF-Token': token
      }
    }).then((response) => response.json())
      .then((body) => {
        setTasks(buildList(body))
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

  function TasksList() {
    return (
      <ul>
        {tasks}
      </ul>
    )
  }

  function TasksBody() {
    if (formMode) {
      return (
        <NewTaskForm />
      )
    }
    return (
      <TasksList />
    )
  }


  return (
    <React.Fragment>
      <div className="component tasks-block">
        <div className="component-header">
          <h2>Tasks</h2>
          <button onClick={changeMode} className="button button-secondary">{buttonText}</button>
        </div>
        <TasksBody />
      </div>
    </React.Fragment>
  )
}


export default Tasks
