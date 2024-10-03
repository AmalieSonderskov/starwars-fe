import { Outlet, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { userVar } from "./state/userState"
import { useReactiveVar } from "@apollo/client"
import NavBar from "./components/NavBar"

function App() {
  const navigate = useNavigate()
  const user = useReactiveVar(userVar)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [location, navigate])

  return (
    <div className='flex min-h-screen flex-col bg-stone-900'>
      <NavBar />
      <div className='mx-6 flex h-full flex-grow flex-col gap-3 bg-junkshop'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
