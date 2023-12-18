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

  function handleSubmit(e) {
    e.preventDefault()
    let data = new FormData(e.target)
    const token = document.querySelector('[name=csrf-token]').content

    // Uncomment to see form data in console
    // const formJson = Object.fromEntries(data.entries());
    // console.log(formJson);


    fetch(url, {
      method: "PATCH",
      body: data,
      headers: {
        'X-Transaction': 'POST Example',
        'X-CSRF-Token': token
      }
    }).then((response) => response.json())
      .then((body) => {
        console.log(body)
      })
    // Add logic here to provide feedback to the user (maybe play an animation or something?)
  }

  if (!!diary.id) {
    return (
      <React.Fragment>
        <div className="diary-block">
          <form onSubmit={handleSubmit}>
            <textarea
              defaultValue={diary.content ? diary.content : ""}
              name="content" />
            <select
              type="text"
              defaultValue={diary.mood ? diary.mood : ""}
              name="mood"
              placeholder="Select your mood">
                <option>Happy</option>
                <option>Sad</option>
            </select>
            <input
              type="hidden"
              name="id"
              value={diary.id} />
            <button type="submit">Save</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}


export default Diary
