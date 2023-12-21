import React from "react"
import { useState, useEffect } from "react"
import handleSubmit from "./handleSubmit"

import pushup from "../../assets/images/pushup.png"
import situp from "../../assets/images/situp.png"

const Workout = ({id}) => {
  const url = `/api/v1/workouts/${id}`
  const [workout, setWorkout] = useState([])

  // Grab data from server

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        setWorkout(body)
      })
  }, [])
  console.log(workout)


  // Form Input Stuff

  function FormInput({value, name}) {
    const [counter, setCounter] = useState(value)

    function changeValue(e) {
      e.preventDefault()
      const increase = parseInt(e.target.innerText)
      if (counter + increase >= 0) {
        setCounter(counter + increase)
      }
    }

    return (
      <div>
        <button onClick={changeValue}>-10</button>
        <button onClick={changeValue}>-1</button>
        <input type="number" name={name} value={counter} readOnly={true}/>
        <button onClick={changeValue}>+1</button>
        <button onClick={changeValue}>+10</button>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="component double-wide workout-block">
        <form onSubmit={handleSubmit} action={url}>
          <div>
            <h2>Workout</h2>
            <button type="submit" className="button-submit">Save</button>
          </div>
            <input type="hidden"
                  name="id"
                  value={workout.id} />
            <div className="row">
              <div className="exercise-block">
                <img src={pushup}
                  alt="a pixel art situp"
                  className="img-exercise"/>
                <FormInput value={workout.pushups} name={"pushups"} />
              </div>
              <div className="exercise-block">
                <img src={situp}
                  alt="a pixel art pushup"
                  className="img-exercise"/>
                <FormInput value={workout.situps} name={"situps"} />
              </div>
            </div>
        </form>
      </div>
    </React.Fragment>
  )
}



export default Workout
