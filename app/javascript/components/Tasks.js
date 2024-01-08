import React from "react"
import { useEffect, useState } from "react"

const Tasks = (props) => {
  const url = '/api/v1/tasks/'
  const [tasks, setTasks] = useState(null)
  const [formMode, setFormMode] = useState(true)

  let tasksList

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        console.log(body)
        setTasks(body.map(task =>
          <li key={task.id}>{task.name}</li>
        ))
      })
  }, [])


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
        console.log(body)
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
        <div className="component_header">
          <h2>Tasks</h2>
        </div>
        <TasksBody />
      </div>
    </React.Fragment>
  )
}


export default Tasks
