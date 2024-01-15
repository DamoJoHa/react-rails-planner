import React from "react"
import Diary from "./Diary"
import PropTypes from "prop-types"

const Wrapper = ({entry}) => {
  console.log(entry)
  return (
    <React.Fragment>
      <div className="component-grid">
        <Diary initial={entry.diary}/>
      </div>
    </React.Fragment>
  )
}


export default Wrapper
