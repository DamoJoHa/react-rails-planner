import React from "react"
import { useState } from 'react'
import { useEffect } from 'react';

const Diary = ({id}) => {
  const url = `/api/v1/diaries/${id}`
  let diary

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((body) => {
        console.log(body)
        diary = body
      })
  }, [diary, url])

  console.log(diary)

  return (
    <React.Fragment>
      <div className="diary-block">
        <p></p>
        <form>
          <textarea>
          </textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </React.Fragment>
  )
}


export default Diary
