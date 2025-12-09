import { useState, useEffect } from 'react'
import GameSelector from './components/GameSelector'
import ColorGame from './components/ColorGame'
import ShapeGame from './components/ShapeGame'
import NumberGame from './components/NumberGame'
import GameResult from './components/GameResult'
import Notiflix from 'notiflix'
Notiflix.Report.init({
  success: {
    svgColor: '#10B981',
    titleColor: '#10B981',
    messageColor: '#374151',
    buttonBackground: '#10B981',
    buttonColor: '#ffffff',
    backOverlayColor: 'rgba(16, 185, 129, 0.2)',
  },
  failure: {
    svgColor: '#EF4444',
    titleColor: '#EF4444',
    messageColor: '#374151',
    buttonBackground: '#EF4444',
    buttonColor: '#ffffff',
    backOverlayColor: 'rgba(239, 68, 68, 0.2)',
  },
  info: {
    svgColor: '#8B5CF6',
    titleColor: '#8B5CF6',
    messageColor: '#374151',
    buttonBackground: '#8B5CF6',
    buttonColor: '#ffffff',
    backOverlayColor: 'rgba(139, 92, 246, 0.2)',
  },
  warning: {
    svgColor: '#F59E0B',
    titleColor: '#F59E0B',
    messageColor: '#374151',
    buttonBackground: '#F59E0B',
    buttonColor: '#ffffff',
    backOverlayColor: 'rgba(245, 158, 11, 0.2)',
  },
})

function App() {
  const [currentGame, setCurrentGame] = useState(null)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const games = [
    { id: 'colors', name: 'Warna', icon: '🎨', color: 'bg-pink-100', description: 'tebak warna-warni pelangi' },
    { id: 'shapes', name: 'Bentuk', icon: '🔺', color: 'bg-blue-100', description: 'kenali bentuk-bentuk lucu' },
    { id: 'numbers', name: 'Angka', icon: '🔢', color: 'bg-green-100', description: 'hitung bersama teman-teman' }
  ]

  useEffect(() => {
    Notiflix.Report.info(
      'Halo Kawan Kecil🎈',
      'Ayo bermain dan belajar bersama. <br/><br/><br/>Pilih game yang kamu suka',
      'Ayo Mulai🚀',
      {
        width: '450px',
        borderRadius: '20px',
        titleFontSize: '20px',
        messageFontSize: '18px',
        buttonFontSize: '18px',
        svgSize: '80px',
      }
    )
  }, [])


  const handleGameComplete = (finalScore) => {
    setScore(finalScore)
    setGameCompleted(true)
  }

  const handleGameSelect = (gameId) => {
    const selectedGame = games.find(game => game.id === gameId)
    
    Notiflix.Report.success(
      'Yeaaayy🎉',
      `Kita akan bermain <b>${selectedGame.name.toLowerCase()}</b><br/><br/>, ${selectedGame.description}`,
      'Mulai Bermain🎮',
      {
        width: '450px',
        borderRadius: '25px',
        titleFontSize: '20px',
        messageFontSize: '18px',
        buttonFontSize: '20px',
        svgSize: '90px',
      }
    )
    
    setCurrentGame(gameId)
    setGameCompleted(false)
    setScore(0)
    setTotalQuestions(5)
  }

  const handleBackToMenu = () => {
    Notiflix.Report.info(
      'Kembali ke menu🏠',
      'Pilih game lain yang seru<br/> atau ulangi game favorit kamu',
      'Pilih Game🎯',
      {
        width: '450px',
        borderRadius: '20px',
        titleFontSize: '20px',
        messageFontSize: '18px',
        buttonFontSize: '18px',
        svgSize: '80px',
      }
    )
    
    setCurrentGame(null)
    setGameCompleted(false)
  }

  const handleRestartGame = () => {
    const currentGameInfo = games.find(game => game.id === currentGame)
    
    Notiflix.Report.success(
      'Mari Main Lagi🔄',
      `Ayo ulangi game <b>${currentGameInfo.name.toLowerCase()}</b><br/>, kali ini pasti lebih hebat`,
      'Siap..💪',
      {
        width: '420px',
        borderRadius: '22px',
        titleFontSize: '25px',
        messageFontSize: '19px',
        buttonFontSize: '19px',
        svgSize: '85px',
      }
    )
    
    setScore(0)
    setGameCompleted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50 p-4 md:p-8">
      <header className="text-center mb-8 animate-bounce-slow">
        <h1 className="text-child-4xl md:text-child-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 font-nunito">
          Dunia Belajar Anak
        </h1>
        <div className="flex justify-center gap-4 text-4xl mb-4">
          <span className="animate-bounce">🎨</span>
          <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🔢</span>
          <span className="animate-bounce" style={{animationDelay: '0.4s'}}>⭐</span>
          <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🎈</span>
          <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🐱</span>
        </div>
        <p className="text-child-xl text-purple-600 font-comic font-bold">
          Belajar sambil bermain itu seru🎮
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {!currentGame ? (
          <GameSelector games={games} onSelectGame={handleGameSelect} />
        ) : gameCompleted ? (
          <GameResult 
            score={score} 
            totalQuestions={totalQuestions}
            gameName={games.find(g => g.id === currentGame).name}
            onBackToMenu={handleBackToMenu}
            onRestart={handleRestartGame}
          />
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <button
                onClick={handleBackToMenu}
                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="text-2xl">←</span>
                <span className="text-lg font-semibold">Kembali ke Menu</span>
              </button>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
                💎 Skor: <span className="text-3xl">{score}</span>/{totalQuestions}
              </div>
            </div>

            {currentGame === 'colors' && (
              <ColorGame onGameComplete={handleGameComplete} totalQuestions={totalQuestions} />
            )}
            {currentGame === 'shapes' && (
              <ShapeGame onGameComplete={handleGameComplete} totalQuestions={totalQuestions} />
            )}
            {currentGame === 'numbers' && (
              <NumberGame onGameComplete={handleGameComplete} totalQuestions={totalQuestions} />
            )}
          </div>
        )}
      </main>

      <footer className="mt-12 text-center">
        made with❤️
        {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-6 max-w-2xl mx-auto shadow-lg">
          <p className="text-lg text-gray-700">
            <span className="text-2xl">🌟</span> 
            <span className="font-bold text-purple-600"> Selamat Bermain</span> 
            <span className="text-2xl"> 🌟</span>
            <br/>
            <span className="text-gray-600">Bermain itu seru, belajar itu hebat</span>
          </p>
        </div> */}
      </footer>
    </div>
  )
}

export default App