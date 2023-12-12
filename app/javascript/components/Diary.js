import React from "react"
import PropTypes from "prop-types"

const Diary = (props) => {
  const diary = {
    content: "Today, I saw a fish in the pond.  It was very, very meaningful.",
    mood: "Happy"
  }
  return (
    <React.Fragment>
      <div className="diary-block">
        <form>
          <textarea>
          </textarea>
        </form>
      </div>
    </React.Fragment>
  )
}


export default Diary
