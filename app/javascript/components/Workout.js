import React from "react"
import { useState, useEffect } from "react"
import handleSubmit from "./handleSubmit"

import pushup from "../../assets/images/pushup.png"
import situp from "../../assets/images/situp.png"

const Workout = ({initial}) => {
  const url = `/api/v1/workouts/${initial.id}`
  const formID = "workout-form"

  // Update logic is handled by inputs

  // Form Input Stuff

  function FormInput({value, name}) {
    const [counter, setCounter] = useState(value)
    const [skip, setSkip] = useState(true)

    useEffect(() => {
      // This is probably not how this should be done, but it works to skip submission on render
      if (skip) {
        setSkip(false)
        return
      }
      const delayDebounceID = setTimeout(() => {
        handleSubmit(document.getElementById(formID))
        console.log("Workout update loop ran")
      }, 2000);
      return () => clearTimeout(delayDebounceID)
    }, [counter])

    function changeValue(e) {
      e.preventDefault()
      const increase = parseInt(e.target.innerText)
      if (counter + increase >= 0) {
        setCounter(counter + increase)
      }
    }

    return (
      <div className="exercise-input-bar">
        <button onClick={changeValue}>-10</button>
        <button onClick={changeValue}>-1</button>
        <input type="hidden" name={name} value={counter} readOnly={true}/>
        <p className="exercise-input-value">{counter}</p>
        <button onClick={changeValue}>+1</button>
        <button onClick={changeValue}>+10</button>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="component double-wide workout-block">
        <form id={formID} action={url}>
          <div className="component-header">
            <h2>Workout</h2>
          </div>
          <input type="hidden"
                name="id"
                value={initial.id} />
          <div className="row">
            <div className="exercise-block">
              <img src={pushup}
                alt="a pixel art situp"
                className="img-exercise"/>
              <FormInput value={initial.pushups} name={"pushups"} />
            </div>
            <div className="exercise-block">
              <img src={situp}
                alt="a pixel art pushup"
                className="img-exercise"/>
              <FormInput value={initial.situps} name={"situps"} />
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}



export default Workout
