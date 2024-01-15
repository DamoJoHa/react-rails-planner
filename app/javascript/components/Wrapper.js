import React from "react"
import Diary from "./Diary"
import Workout from "./Workout"

const Wrapper = ({entry}) => {
  console.log(entry)
  return (
    <React.Fragment>
      <div className="component-grid">
        <Diary initial={entry.diary} />
        <Workout initial={entry.workout} />
      </div>
    </React.Fragment>
  )
}


export default Wrapper
