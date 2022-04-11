import { useState } from 'react'
import './App.css'

function App() {
  const [singer, setSinger] = useState('')
  const [song, setSong] = useState('')
  const [lyrics , setLyrics] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const findLyrics = () => {
    if (singer && song) {
      setIsLoading(true)

      fetch(`https://api.lyrics.ovh/v1/${singer}/${song}`)
        .then(response => response.json())
        .then(data => {
          const lyric = data.lyrics || data.error
          setLyrics(lyric)
          setIsLoading(false)
        })
    }
  }

  return (
    <div className="App">
      <div className='input-container'>
        <input 
          type='text' 
          className='singer-input'
          value={singer} 
          onChange={(e) => {
            setLyrics('')
            setSinger(e.target.value)
          }}
          placeholder='Enter a singer'
        />
        <input 
          type='text' 
          className='song-input'
          value={song} 
          onChange={(e) => {
            setLyrics('')
            setSong(e.target.value)
          }}
          placeholder='Enter a song'
        />
      </div>
      <button type='button' className='btn' onClick={findLyrics}>
        Find lyrics
      </button>

      {isLoading ? (
        <div className='loading'></div>
      ) : (
        <div className='info-lyric'>
          <p className='song'>{lyrics && song}</p>
          <span className='singer'>{lyrics && singer}</span>
          <p className='lyric'>
            {lyrics}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
