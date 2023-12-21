import React from "react"
import { useState, useEffect } from 'react'
import handleSubmit from "./handleSubmit"

const Diary = ({id}) => {
  const url = `/api/v1/diaries/${id}`
  const [diary, setDiary] = useState([])
  const [notice, setNotice] = useState("")

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        setDiary(body)
      })
  }, [])

  function handleChange() {
    if (notice != "Unsaved Changes") {
      setNotice("Unsaved Changes")
    }
  }

  if (!!diary.id) {
    return (
      <React.Fragment>
        <div className="component diary-block">
          <h2>Journal</h2>
          <form onSubmit={handleSubmit} action={url}>
            <textarea
              defaultValue={diary.content ? diary.content : ""}
              name="content"
              onChange={handleChange}/>
             <input
                type="hidden"
                name="id"
                value={diary.id} />
            <div>
              <select
                type="text"
                defaultValue={diary.mood ? diary.mood : ""}
                name="mood"
                onChange={handleChange}>
                  <option>Positive</option>
                  <option>Neutral</option>
                  <option>Negative</option>
              </select>
              <button type="submit" className="button-submit">Save</button>
            </div>
          </form>
          {/* Notice Bar? */}
        </div>
      </React.Fragment>
    )
  }
}


export default Diary
