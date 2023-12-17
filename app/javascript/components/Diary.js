import React from "react"
import { useState } from 'react'
import { useEffect } from 'react';

const Diary = ({id}) => {
  const url = `/api/v1/diaries/${id}`
  const [diary, setDiary] = useState([])
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        setDiary(body)
      })
  }, [])
  console.log(diary)
  if (!!diary.id) {
    return (
      <React.Fragment>
        <div className="diary-block">
          <form>
            <textarea>
            </textarea>
            <button type="submit">Save</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}


export default Diary
