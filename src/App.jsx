import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PlayerList from "./Components/PlayerList"
import FeaturedPlayerCard from "./Components/FeaturedPlayerCard"
import "./App.css"

function App() {
  const [updateState, setUpdateState] = useState(true)

  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2402-FTB-ET-WEB-FT/players`

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PlayerList
              API_URL={API_URL}
              updateState={updateState}
              setUpdateState={setUpdateState}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
