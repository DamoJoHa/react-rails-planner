function handleSubmit(e) {
  e.preventDefault()
  const data = new FormData(e.target)
  const url = e.target.action
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

export default handleSubmit
