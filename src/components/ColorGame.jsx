import { useState, useEffect } from 'react'
import Notiflix from 'notiflix'

const ColorGame = ({ onGameComplete, totalQuestions }) => {
  const allColors = [
    { name: 'Merah', value: 'red', hex: '#EF4444', emoji: '🔴' },
    { name: 'Biru', value: 'blue', hex: '#3B82F6', emoji: '🔵' },
    { name: 'Hijau', value: 'green', hex: '#10B981', emoji: '🟢' },
    { name: 'Kuning', value: 'yellow', hex: '#FBBF24', emoji: '🟡' },
    { name: 'Ungu', value: 'purple', hex: '#8B5CF6', emoji: '🟣' },
    { name: 'Oranye', value: 'orange', hex: '#F97316', emoji: '🟠' },
    { name: 'Pink', value: 'pink', hex: '#EC4899', emoji: '💖' },
    { name: 'Coklat', value: 'brown', hex: '#92400E', emoji: '🟤' }
  ]

  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [currentColor, setCurrentColor] = useState(null)
  const [options, setOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [usedColors, setUsedColors] = useState([])
  const [availableColors, setAvailableColors] = useState([...allColors])

  useEffect(() => {
    generateQuestion()
    Notiflix.Report.info(
      'Game Warna Dimulai🎨',
      'Tebak nama warna yang kamu lihat<br/>Setiap jawaban benar dapat bintang⭐',
      'Aku Siap😊',
      {
        width: '450px',
        borderRadius: '25px',
        titleFontSize: '26px',
        messageFontSize: '20px',
        buttonFontSize: '20px',
        svgSize: '90px',
      }
    )
  }, [])

  const generateQuestion = () => {
    const unusedColors = availableColors.filter(color => 
      !usedColors.some(used => used.name === color.name)
    )
    
    let colorPool = [...unusedColors]
    if (colorPool.length < 4) {
      const usedButNotRecent = usedColors.filter((color, index) => 
        index < usedColors.length - 2
      )
      colorPool = [...colorPool, ...usedButNotRecent.slice(0, 4 - colorPool.length)]
    }
    
    const correctColor = colorPool[Math.floor(Math.random() * colorPool.length)]
    const wrongColors = colorPool
      .filter(color => color.name !== correctColor.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    const allOptions = [...wrongColors, correctColor].sort(() => Math.random() - 0.5)
    
    setCurrentColor(correctColor)
    setOptions(allOptions)
  }

  const showCorrectNotification = () => {
    const messages = [
      { title: 'Wah Hebat🎉', message: 'Kamu benar warna itu memang <b>' + currentColor.name.toLowerCase() + '</b>' },
      { title: 'Pintarnya🧠', message: 'Horee kamu tahu warna <b>' + currentColor.name.toLowerCase() + '</b>' },
      { title: 'Mantap✨', message: 'Benar sekali warna <b>' + currentColor.name.toLowerCase() + '</b> itu cantik' },
      { title: 'Keren Banget⭐', message: 'Hebat kamu kenal warna <b>' + currentColor.name.toLowerCase() + '</b>' }
    ]
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    Notiflix.Report.success(
      randomMsg.title,
      randomMsg.message + '<br/>, kamu dapat 1 bintang⭐',
      'Lanjutkan 🚀',
      {
        width: '420px',
        borderRadius: '22px',
        titleFontSize: '25px',
        messageFontSize: '19px',
        buttonFontSize: '19px',
        svgSize: '85px',
      }
    )
  }

  const showWrongNotification = () => {
    const messages = [
      { title: 'Aduh Salah😅', message: 'Warna itu adalah <b>' + currentColor.name.toLowerCase() + '</b>' },
      { title: 'Hampir Benar🤔', message: 'Warna yang benar adalah <b>' + currentColor.name.toLowerCase() + '</b>' },
      { title: 'Oops💫', message: 'Warna yang tepat adalah <b>' + currentColor.name.toLowerCase() + '</b>' }
    ]
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    Notiflix.Report.warning(
      randomMsg.title,
      randomMsg.message + '<br/>, coba lagi ya pasti bisa💪',
      'Oke👍',
      {
        width: '400px',
        borderRadius: '20px',
        titleFontSize: '24px',
        messageFontSize: '18px',
        buttonFontSize: '18px',
        svgSize: '80px',
      }
    )
  }

  const handleAnswer = (selectedColor) => {
    if (selectedColor.name === currentColor.name) {
      const newScore = score + 1
      setScore(newScore)
      setUsedColors(prev => [...prev, currentColor])
      showCorrectNotification()
    } else {
      showWrongNotification()
    }

    if (currentQuestion < totalQuestions) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        generateQuestion()
      }, 1800)
    } else {
      setTimeout(() => {
        setGameOver(true)
        showGameCompleteNotification(score + (selectedColor.name === currentColor.name ? 1 : 0))
        onGameComplete(score + (selectedColor.name === currentColor.name ? 1 : 0))
      }, 1800)
    }
  }

  const showGameCompleteNotification = (finalScore) => {
    const percentage = Math.round((finalScore / totalQuestions) * 100)
    let title, message, icon
    
    if (percentage === 100) {
      title = 'SEMPUUURNAAA🏆'
      message = 'Kamu benar SEMUA, luar biasa sekali'
      icon = '👑'
    } else if (percentage >= 80) {
      title = 'Luar Biasa🌟'
      message = `Kamu benar ${finalScore} dari ${totalQuestions} soal`
      icon = '✨'
    } else if (percentage >= 60) {
      title = 'Hebaaat👍'
      message = `Kamu dapat ${finalScore} bintang dari ${totalQuestions}`
      icon = '⭐'
    } else {
      title = 'Sudah Hebat💪'
      message = 'Terus berlatih ya Kamu pasti bisa'
      icon = '🎯'
    }
    
    Notiflix.Report.success(
      title,
      `${message}<br/>${icon} ${icon} ${icon}`,
      'Lihat Hasil📊',
      {
        width: '450px',
        borderRadius: '25px',
        titleFontSize: '28px',
        messageFontSize: '21px',
        buttonFontSize: '20px',
        svgSize: '95px',
      }
    )
  }

  const progressPercentage = Math.round((usedColors.length / allColors.length) * 100)
  if (gameOver) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          Menyiapkan hasil⏳
        </h2>
        <div className="text-6xl animate-bounce mt-8">⭐</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-4">
          Game Warna Pelangi✨
        </h2>
        
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-purple-700 flex items-center gap-2">
              <span>🎨</span>
              Warna yang sudah ditebak
            </span>
            <span className="text-lg font-bold text-purple-600">
              {usedColors.length}/{allColors.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {usedColors.map((color, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white shadow-sm"
                title={color.name}
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{color.name}</span>
              </div>
            ))}
            {usedColors.length === 0 && (
              <span className="text-gray-500 text-sm">Belum ada warna yang ditebak</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-2xl">🎨</div>
          <p className="text-xl text-gray-700 font-medium">
            Tebak warna yang kamu lihat
          </p>
          <div className="text-2xl">👀</div>
        </div>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
          <span className="text-2xl">❓</span>
          <span className="text-lg font-semibold text-purple-700">
            Pertanyaan <span className="text-2xl">{currentQuestion}</span> dari <span className="text-2xl">{totalQuestions}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-8">
          <div 
            className="w-64 h-64 rounded-3xl shadow-2xl mb-4 transition-all duration-500 hover:scale-105 hover:rotate-2"
            style={{ backgroundColor: currentColor?.hex }}
          ></div>
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-2xl px-4 py-2 rounded-full animate-bounce">
            {currentColor?.emoji}
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-800 mb-2">Warna apakah ini</p>
          <p className="text-xl text-gray-600">Pilih jawaban yang benar</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {options.map((color, index) => {
            const alreadyGuessed = usedColors.some(used => used.name === color.name)
            return (
              <button
                key={index}
                onClick={() => handleAnswer(color)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-2xl font-bold flex items-center justify-center gap-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 ${
                  alreadyGuessed 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-100 border-green-300' 
                    : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-purple-400 hover:from-purple-50 hover:to-pink-50'
                }`}
              >
                <span className="text-3xl">{color.emoji}</span>
                <span className={`transition-colors ${
                  alreadyGuessed 
                    ? 'text-green-700 group-hover:text-emerald-800' 
                    : 'text-gray-800 group-hover:text-purple-700'
                }`}>
                  {color.name}
                  {alreadyGuessed && (
                    <span className="ml-2 text-lg">✅</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
        <p className="text-xl text-gray-700 font-medium flex items-center justify-center gap-3">
          <span className="text-2xl">💡</span>
          Tips Warna yang sudah ditebak dengan benar akan diberi tanda centang✅
          <span className="text-2xl">👁️</span>
        </p>
      </div>
    </div>
  )
}

export default ColorGame