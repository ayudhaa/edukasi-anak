import { useState, useEffect } from 'react'
import Notiflix from 'notiflix'

const ShapeGame = ({ onGameComplete, totalQuestions }) => {
  const allShapes = [
    { name: 'Lingkaran', icon: '●', className: 'rounded-full bg-gradient-to-r from-red-400 to-pink-500', emoji: '⭕' },
    { name: 'Segitiga', icon: '▲', className: 'w-0 h-0 border-l-[60px] border-r-[60px] border-b-[120px] border-l-transparent border-r-transparent border-b-blue-400', emoji: '🔺' },
    { name: 'Persegi', icon: '■', className: 'bg-gradient-to-r from-green-400 to-emerald-500', emoji: '⬜' },
    { name: 'Bintang', icon: '★', className: 'text-yellow-500 text-8xl', emoji: '⭐' },
    { name: 'Hati', icon: '❤️', className: 'text-red-500 text-8xl', emoji: '💖' },
    { name: 'Segilima', icon: '⬟', className: 'text-purple-500 text-8xl', emoji: '🟣' },
    { name: 'Diamond', icon: '♦', className: 'text-pink-500 text-8xl', emoji: '💎' },
    { name: 'Bulan', icon: '🌙', className: 'text-yellow-400 text-8xl', emoji: '🌙' }
  ]

  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [currentShape, setCurrentShape] = useState(null)
  const [options, setOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [usedShapes, setUsedShapes] = useState([])

  useEffect(() => {
    generateQuestion()
    
    Notiflix.Report.info(
      'Game Bentuk Dimulai🔺',
      'Kenali bentuk-bentuk yang lucu<br/>Setiap jawaban benar dapat hadiah🎁',
      'Ayo Mulai 🎯',
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
    const unusedShapes = allShapes.filter(shape => 
      !usedShapes.some(used => used.name === shape.name)
    )
    
    let shapePool = [...unusedShapes]
    if (shapePool.length < 4) {
      const usedButNotRecent = usedShapes.filter((shape, index) => 
        index < usedShapes.length - 2
      )
      shapePool = [...shapePool, ...usedButNotRecent.slice(0, 4 - shapePool.length)]
    }
    
    const correctShape = shapePool[Math.floor(Math.random() * shapePool.length)]
    const wrongShapes = shapePool
      .filter(shape => shape.name !== correctShape.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const allOptions = [...wrongShapes, correctShape].sort(() => Math.random() - 0.5)
    
    setCurrentShape(correctShape)
    setOptions(allOptions)
  }

  const showCorrectNotification = () => {
    const messages = [
      { title: 'Wah Pinter 🎯', message: 'Benar itu adalah bentuk <b>' + currentShape.name.toLowerCase() + '</b>' },
      { title: 'Hebat Sekali 🧩', message: 'Tepat jamu kenal bentuk <b>' + currentShape.name.toLowerCase() + '</b>' },
      { title: 'Mantul ✨', message: 'Horee bentuk <b>' + currentShape.name.toLowerCase() + '</b> itu lucu ya' }
    ]
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    Notiflix.Report.success(
      randomMsg.title,
      randomMsg.message + '<br/>, kamu dapat 1 bintang⭐',
      'Lanjut Lagi 🚀',
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
      { title: 'Oops😅', message: 'Bentuk itu adalah <b>' + currentShape.name + '</b>' },
      { title: 'Salah Dikit🤔', message: 'Bukan itu bentuknya <b>' + currentShape.name + '</b>' },
      { title: 'Aduh💫', message: 'Hampir Bentuk yang benar <b>' + currentShape.name + '</b>' }
    ]
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    
    Notiflix.Report.warning(
      randomMsg.title,
      randomMsg.message + '<br/> jangan sedih, ayooo coba lagi😊',
      'Siap 💪',
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

  const handleAnswer = (selectedShape) => {
    if (selectedShape.name === currentShape.name) {
      const newScore = score + 1
      setScore(newScore)
      setUsedShapes(prev => [...prev, currentShape])
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
        showGameCompleteNotification(score + (selectedShape.name === currentShape.name ? 1 : 0))
        onGameComplete(score + (selectedShape.name === currentShape.name ? 1 : 0))
      }, 1800)
    }
  }

  const showGameCompleteNotification = (finalScore) => {
    const percentage = Math.round((finalScore / totalQuestions) * 100)
    let title, message, icon
    
    if (percentage === 100) {
      title = 'WAHHH SEMPURNA👑'
      message = 'Kamu jenius banget, semua bentuk dikenali'
      icon = '🏆'
    } else if (percentage >= 80) {
      title = 'Keren Abis🌟'
      message = `Kamu kenal ${finalScore} dari ${totalQuestions} bentuk`
      icon = '✨'
    } else if (percentage >= 60) {
      title = 'Bagus Sekali👍'
      message = `Kamu dapat ${finalScore} bintang dari ${totalQuestions}`
      icon = '⭐'
    } else {
      title = 'Sudah Bagus💖'
      message = 'Terus belajar ya kamu hebat'
      icon = '🎯'
    }
    
    Notiflix.Report.success(
      title,
      `${message}<br/>${icon} ${icon} ${icon}`,
      'Lihat Skor📈',
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

  const progressPercentage = Math.round((usedShapes.length / allShapes.length) * 100)
  if (gameOver) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Menghitung hasil🧮
        </h2>
        <div className="text-6xl animate-spin mt-8">✨</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
          Game Bentuk Ajaib🔷
        </h2>
        
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <span>🧩</span>
              Bentuk yang sudah ditebak
            </span>
            <span className="text-lg font-bold text-blue-600">
              {usedShapes.length}/{allShapes.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {usedShapes.map((shape, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white shadow-sm"
                title={shape.name}
              >
                <div className="text-lg">{shape.emoji}</div>
                <span className="text-sm font-medium text-gray-700">{shape.name}</span>
              </div>
            ))}
            {usedShapes.length === 0 && (
              <span className="text-gray-500 text-sm">Belum ada bentuk yang ditebak</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-2xl">🧩</div>
          <p className="text-xl text-gray-700 font-medium">
            Kenali bentuk-bentuk yang lucu
          </p>
          <div className="text-2xl">🔍</div>
        </div>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full">
          <span className="text-2xl">❓</span>
          <span className="text-lg font-semibold text-blue-700">
            Pertanyaan <span className="text-2xl">{currentQuestion}</span> dari <span className="text-2xl">{totalQuestions}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-8">
          <div className="w-72 h-72 flex items-center justify-center mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl">
            <div className={`flex items-center justify-center w-48 h-48 ${currentShape?.className} animate-pulse-slow`}>
              <span className="text-9xl">{currentShape?.icon}</span>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl px-4 py-2 rounded-full animate-bounce">
            {currentShape?.emoji}
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-800 mb-2">Bentuk apakah ini</p>
          <p className="text-xl text-gray-600">Pilih nama bentuk yang tepat</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {options.map((shape, index) => {
            const alreadyGuessed = usedShapes.some(used => used.name === shape.name)
            return (
              <button
                key={index}
                onClick={() => handleAnswer(shape)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-2xl font-bold flex items-center justify-center gap-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 ${
                  alreadyGuessed 
                    ? 'bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-300' 
                    : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-blue-400 hover:from-blue-50 hover:to-cyan-50'
                }`}
              >
                <span className="text-3xl">{shape.emoji}</span>
                <span className={`transition-colors ${
                  alreadyGuessed 
                    ? 'text-emerald-700 group-hover:text-green-800' 
                    : 'text-gray-800 group-hover:text-blue-700'
                }`}>
                  {shape.name}
                  {alreadyGuessed && (
                    <span className="ml-2 text-lg">✅</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
        <p className="text-xl text-gray-700 font-medium flex items-center justify-center gap-3">
          <span className="text-2xl">💡</span>
          Tips bentuk yang sudah ditebak dengan benar akan diberi tanda centang✅
          <span className="text-2xl">👁️‍🗨️</span>
        </p>
      </div>
    </div>
  )
}

export default ShapeGame