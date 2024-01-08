import React from "react"

const Calendar = (props) => {
  // Will need an event model in the rails portion of the app?

  // Create a grid?  Just rely on snaking behavior with flex?

  const today = new Date

  const month = today.getMonth()
  const year = today.getFullYear()

  console.log(today.getDay())


  const startDate = new Date(year, month, 1)
  const endDate = new Date(year, month + 1, 0)

  let days = []

  const offset = startDate.getDay()

  for (let i = 0; i < offset; i++) {
    days.push(<h3></h3>)
  }

  let active = startDate
  while (active <= endDate) {
    days.push(active.getDate())
    active.setDate(active.getDate() + 1)
  }

  console.log(days)
  const dayList = days.map(day =>
    <h3 key={`${day}/${month}/${year}`}>{day}</h3>
  )


  return (
    <React.Fragment>
      <div className="component calendar-block">
        <div className="component-header">
          <h2>Calendar</h2>
        </div>
        <div className="calendar-body">
          <h3>Sun</h3>
          <h3>Mon</h3>
          <h3>Tue</h3>
          <h3>Wed</h3>
          <h3>Thu</h3>
          <h3>Fri</h3>
          <h3>Sat</h3>
          {dayList}
        </div>
      </div>
    </React.Fragment>
  )
}


export default Calendar
