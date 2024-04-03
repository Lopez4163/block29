import React, { useState, useEffect } from "react"

const SearchBar = ({ playerList, setPlayerList, setShowPlayerList }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPlayers, setFilteredPlayers] = useState(null)
  const [showQueryResults, setShowQueryResults] = useState("")

  const handleSearch = () => {
    const filtered = playerList.filter(player => {
      const nameMatch = player.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const breedMatch = player.breed
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return nameMatch || breedMatch
    })
    setFilteredPlayers(filtered)
    setShowPlayerList(false)
  }
  const toggleAllPlayers = () => {
    setShowPlayerList(true)
    setFilteredPlayers(null)
  }

  useEffect(() => {
    if (filteredPlayers) {
      console.log("Filtered players", filteredPlayers)
    }
  }, [filteredPlayers])

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {filteredPlayers && (
          <>
            {filteredPlayers.map(player => (
              <div key={player.id}>
                <li>{player.name}</li>
                <li>{player.breed}</li>
                <img src={player.imageUrl} />
              </div>
            ))}
            <button onClick={toggleAllPlayers}>Show All players</button>
          </>
        )}
      </ul>
    </div>
  )
}

export default SearchBar
