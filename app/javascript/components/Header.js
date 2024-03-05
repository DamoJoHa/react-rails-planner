import React from "react"
import { useState } from "react"

const Header = ({date}) => {
  const [visible, setVisible] = useState(false)

  function toggleMenu() {
    console.log("Hello")
    const newVisible = visible ? false : true;
    console.log(newVisible)
    setVisible(newVisible)
  }

  return (
    <React.Fragment>
      <div className="header">
        <h1>{date}</h1>
        <i onClick={toggleMenu} id="header-nav-button" className="fa-solid fa-bars"></i>
      </div>
      <div id="header-nav" style={visible ? {display: "block"} : {display: "none"}}>
        <h1>Hello</h1>
      </div>
    </React.Fragment>
  )
}


export default Header
