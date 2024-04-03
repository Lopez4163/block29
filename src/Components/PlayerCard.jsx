import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import "../App.css"

const PlayerCard = ({
  API_URL,
  player,
  onHandleShowDetails,
  updateState,
  setUpdateState,
}) => {
  const [deletedPlayer, setDeletedPlayer] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const onDelete = selectedPlayer => {
    setDeletedPlayer(selectedPlayer)
  }

  useEffect(() => {
    if (deletedPlayer.id) {
      deleteSelectedPlayer(deletedPlayer)
    }
  }, [deletedPlayer])

  const deleteSelectedPlayer = async playerData => {
    try {
      const response = await fetch(`${API_URL}/${playerData.id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setUpdateState(true)
        console.log("Player deleted successfully")
      } else {
        const result = await response.json()
        throw new Error(`Error deleting player: ${result.error}`)
      }
    } catch (err) {
      console.error("Error deleting player:", err.message)
    }
  }

  return (
    <div>
      <div>
        <h1>{player.name}</h1>
        <img src={player.imageUrl} className="dogImg" />
        {/* <button
          onClick={() => {
            onHandleShowDetails(player)
          }}
        >
          Show Details
        </button> */}
        <button
          onClick={() => {
            onHandleShowDetails(player)
            // navigate(`/${player.id}`)
          }}
        >
          Show Details
        </button>

        <button
          onClick={() => {
            onDelete(player)
          }}
        >
          Delete Me
        </button>
      </div>
    </div>
  )
}

export default PlayerCard
