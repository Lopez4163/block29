import React, { useState, useEffect } from "react"
import AddPlayerForm from "./AddPlayerForm"
import PlayerCard from "./PlayerCard"
import FeaturedPlayerCard from "./FeaturedPlayerCard"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom"

const PlayerList = ({ API_URL, updateState, setUpdateState }) => {
  const [playerList, setPlayerList] = useState([])
  const [showPlayerList, setShowPlayerList] = useState(true)
  const [featuredPlayer, setFeaturedPlayer] = useState([])
  const [displayFeaturedPlayer, setDisplayFeaturedPlayer] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // const [updateState, setUpdateState] = useState(true)

  const fetchPlayerList = async () => {
    if (updateState) {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}`)
        const result = await response.json()
        console.log("Player list fetch", result)
        setPlayerList(result.data.players)
      } catch (er) {
        setError(er.message)
      } finally {
        setUpdateState(false)
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    if (updateState) {
      console.log("Player update")
      fetchPlayerList()
    }
    console.log(playerList)
  }, [updateState])

  const onHandleShowDetails = clickedPlayer => {
    console.log("Clicked player details", clickedPlayer)
    setFeaturedPlayer(clickedPlayer)
    setDisplayFeaturedPlayer(true)
    setShowPlayerList(false)
  }

  return (
    <div>
      <div>
        <AddPlayerForm
          API_URL={API_URL}
          updateState={updateState}
          setUpdateState={setUpdateState}
        />
        <div>
          <h1>PlayerList</h1>
          <SearchBar
            playerList={playerList}
            setPlayerList={setPlayerList}
            showPlayerList={showPlayerList}
            setShowPlayerList={setShowPlayerList}
          />
        </div>
        <div>
          <ul>
            {showPlayerList &&
              playerList.map(player => {
                return (
                  <div key={player.id}>
                    <li>
                      <PlayerCard
                        API_URL={API_URL}
                        player={player}
                        onHandleShowDetails={onHandleShowDetails}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    </li>
                  </div>
                )
              })}
          </ul>
          <div>
            {displayFeaturedPlayer && (
              <div>
                <FeaturedPlayerCard
                  featuredPlayer={featuredPlayer}
                  setFeaturedPlayer={setFeaturedPlayer}
                  setPlayerList={setPlayerList}
                  setShowPlayerList={setShowPlayerList}
                  setDisplayFeaturedPlayer={setDisplayFeaturedPlayer}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerList
