import React from "react"
import { useState, useEffect } from 'react'
import handleSubmit from "./handleSubmit"

const Diary = ({initial}) => {
  const url = `/api/v1/diaries/${initial.id}`
  const formID = "diary-form"

  const [skip, setSkip] = useState(true)
  const [diary, setDiary] = useState(initial)

  useEffect(() => {
    // This is probably not how this should be done, but it works to skip submission on render
    if (skip) {
      setSkip(false)
      return
    }
    const delayDebounceID = setTimeout(() => {
      handleSubmit(document.getElementById(formID))
      console.log("Diary update loop ran")
      // console.log(diary);
    }, 1000);
    return () => clearTimeout(delayDebounceID)
  }, [diary])

  function handleChange(e) {
    // Notice logic will need a lot of work

    const formData = new FormData(document.getElementById(formID))
    const newDiary = Object.fromEntries(formData.entries())
    // console.log(newDiary)
    setDiary(newDiary)
  }

  return (
    <React.Fragment>
      <div className="component diary-block">
        <form id={formID} action={url}>
          <div className="component-header">
            <h2>Journal</h2>
          </div>
          <textarea
            defaultValue={diary.content ? diary.content : ""}
            name="content"
            onChange={handleChange}/>
            <input type="hidden"
              name="id"
              value={diary.id} />
          <select type="text"
            defaultValue={diary.mood ? diary.mood : "Neutral"}
            name="mood"
            onChange={handleChange}>
              <option>Positive</option>
              <option>Neutral</option>
              <option>Negative</option>
          </select>
        </form>
        {/* Notice Bar? */}
      </div>
    </React.Fragment>
  )
}


export default Diary
