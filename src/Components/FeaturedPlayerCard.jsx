import React from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const FeaturedPlayerCard = ({
  featuredPlayer,
  setFeaturedPlayer,
  setPlayerList,
  setShowPlayerList,
  setDisplayFeaturedPlayer,
}) => {
  const onclickBack = () => {
    setPlayerList(prevPlayerList => prevPlayerList)
    setShowPlayerList(true)
    setDisplayFeaturedPlayer(false)
  }
  const params = useParams()
  const navigate = useNavigate()

  return (
    <div>
      {featuredPlayer.id && (
        <div>
          <h1>{featuredPlayer.breed}</h1>
          <h2>{featuredPlayer.status}</h2>
          {/* <button
            onClick={() => {
              onclickBack()
              navigate("/")
            }}
          >
            Show All Players
          </button> */}
          <Link to="/" onClick={onclickBack}>
            Show All Players
          </Link>
        </div>
      )}
    </div>
  )
}

export default FeaturedPlayerCard
