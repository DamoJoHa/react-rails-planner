import React from "react"

const Calendar = (props) => {
  // Will need an event model in the rails portion of the app?

  // Create a grid?  Just rely on snaking behavior with flex?
  let startDate
  let endDate

  const today = new Date
  console.log(today + 1)
  const month = today.getMonth()
  const year = today.getFullYear()



  return (
    <React.Fragment>
      <div className="component calendar-block">
        <div className="component-header">
          <h2>Calendar</h2>
        </div>
        <div className="calendar-body">

        </div>
      </div>
    </React.Fragment>
  )
}


export default Calendar
