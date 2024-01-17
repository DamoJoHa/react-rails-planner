import React from "react"
import Diary from "./Diary"
import Workout from "./Workout"
import Tasks from "./Tasks"
import Calendar from "./Calendar"

const Wrapper = ({entry}) => {
  console.log(entry)
  return (
    <React.Fragment>
      <div className="component-grid">
        <Diary initial={entry.diary} />
        <Workout initial={entry.workout} />
        <Tasks />
        <Calendar />
      </div>
    </React.Fragment>
  )
}


export default Wrapper
