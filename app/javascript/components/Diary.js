import React from "react"
import { useState } from 'react'
import { useEffect } from 'react';

const Diary = ({id}) => {
  const url = `/api/v1/diaries/${id}`
  const diary = grabData(url)
  // const content = diary.content
  // const mood = diary.mood

  function grabData(url) {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      }
  }
  console.log(diary)
  console.log(diary.id)

  return (
    <React.Fragment>
      <div className="diary-block">
        <p>{diary.id}</p>
        <form>
          <textarea>
          </textarea>
        </form>
      </div>
    </React.Fragment>
  )
}


export default Diary
