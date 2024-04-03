import React, { useEffect, useState } from "react"

const AddPlayerForm = ({ API_URL, updateState, setUpdateState }) => {
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [playerImg, setPlayerImg] = useState("")
  const [addedPlayer, setAddedPlayer] = useState({})

  const onSubmit = e => {
    e.preventDefault()
    setAddedPlayer({
      name: name,
      breed: breed,
      imageUrl: playerImg,
    })
  }
  const addNewPlayer = async newPlayerData => {
    console.log("player data", newPlayerData)
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayerData),
      })
      setUpdateState(true)
      const result = await response.json()
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    console.log("useEffect to addedNewPlayer")
    addNewPlayer(addedPlayer)
  }, [addedPlayer])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
          placeholder="Name"
        />
        <input
          type="text"
          value={breed}
          onChange={e => {
            setBreed(e.target.value)
          }}
          placeholder="Breed"
        />
        <input
          type="text"
          value={playerImg}
          onChange={e => {
            setPlayerImg(e.target.value)
          }}
          placeholder="ImageUrl"
        />
        <button type="submit">Submit Player</button>
      </form>
    </div>
  )
}

export default AddPlayerForm
