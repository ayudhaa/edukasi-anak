import { useState, useEffect } from 'react'
import Notiflix from 'notiflix'

const NumberGame = ({ onGameComplete, totalQuestions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [currentNumber, setCurrentNumber] = useState(0)
  const [items, setItems] = useState([])
  const [options, setOptions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [usedNumbers, setUsedNumbers] = useState([])

  const icons = ['⭐', '🍎', '🐱', '🚗', '🎈', '🐶', '🍪', '🎨', '🦋', '🐸']

  useEffect(() => {
    generateQuestion()
    
    Notiflix.Report.info(
      'Game Angka Dimulai🔢',
      'Hitung jumlah gambar dengan teliti<br/>, setiap jawaban benar dapat hadiah lhoo..🎁',
      'Aku Mau 😄',
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
    const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const frequency = {}
    usedNumbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1
    })
    
    const sortedNumbers = allNumbers.sort((a, b) => {
      const freqA = frequency[a] || 0
      const freqB = frequency[b] || 0
      return freqA - freqB
    })
    
    const correctNumber = sortedNumbers[Math.floor(Math.random() * Math.min(3, sortedNumbers.length))]
    setCurrentNumber(correctNumber)
    
    const icon = icons[Math.floor(Math.random() * icons.length)]
    const itemsArray = Array(correctNumber).fill(icon)
    setItems(itemsArray)
    
    const wrongNumbers = []
    const availableWrong = allNumbers.filter(num => num !== correctNumber)
    while (wrongNumbers.length < 3 && availableWrong.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableWrong.length)
      const wrongNum = availableWrong[randomIndex]
      
      if (!wrongNumbers.includes(wrongNum)) {
        wrongNumbers.push(wrongNum)
        availableWrong.splice(randomIndex, 1)
      }
    }
    
    const allOptions = [...wrongNumbers, correctNumber].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
  }

  const showCorrectNotification = () => {
    const messages = [
      { title: 'Horee Benar🎊', message: `Tepat ada ${currentNumber} gambar` },
      { title: 'Pandai Berhitung 🧮', message: `Hebat kamu hitung ${currentNumber} dengan benar` },
      { title: 'Mantap Jiwa✨', message: `Benar jumlahnya memang ${currentNumber}` }
    ]
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    Notiflix.Report.success(
      randomMsg.title,
      randomMsg.message + '<br/>, kamu dapat 1 hadiah🎁',
      'Lanjutkan 🏃‍♂️',
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
      { title: 'Oops😅', message: `Bukan ${currentNumber} coba hitung lagi` },
      { title: 'Hampir🤔', message: `Salah dikit Yang benar ${currentNumber}` },
      { title: 'Aduh😅', message: `Jumlahnya ${currentNumber} ayo hitung pelan-pelan` }
    ]
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    Notiflix.Report.warning(
      randomMsg.title,
      randomMsg.message + '<br/>Jangan menyerah kamu pasti bisa💪',
      'Coba Lagi🔄',
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

  const handleAnswer = (selectedNumber) => {
    if (selectedNumber === currentNumber) {
      const newScore = score + 1
      setScore(newScore)
      setUsedNumbers(prev => [...prev, currentNumber])
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
        showGameCompleteNotification(score + (selectedNumber === currentNumber ? 1 : 0))
        onGameComplete(score + (selectedNumber === currentNumber ? 1 : 0))
      }, 1800)
    }
  }

  const showGameCompleteNotification = (finalScore) => {
    const percentage = Math.round((finalScore / totalQuestions) * 100)
    let title, message, icon
    
    if (percentage === 100) {
      title = 'WOW LUAR BIASA👑'
      message = 'Kamu ahli matematika, semua benar'
      icon = '🏆'
    } else if (percentage >= 80) {
      title = 'Hebat Sekali🧮'
      message = `Kamu hitung ${finalScore} dari ${totalQuestions} dengan tepat`
      icon = '🌟'
    } else if (percentage >= 60) {
      title = 'Bagus Banget👍'
      message = `Kamu dapat ${finalScore} hadiah dari ${totalQuestions}`
      icon = '🎁'
    } else {
      title = 'Sudah Keren💖'
      message = 'Terus berlatih berhitung yaaa'
      icon = '🎯'
    }
    
    Notiflix.Report.success(
      title,
      `${message}<br/>${icon} ${icon} ${icon}`,
      'Lihat Bintang⭐',
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

  if (gameOver) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Menyiapkan bintang🌟
        </h2>
        <div className="text-6xl animate-spin mt-8">🎁</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
          Game Angka Seru 🔢
        </h2>
        
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-green-700 flex items-center gap-2">
              <span>🧮</span>
              Angka yang sudah ditebak
            </span>
            <span className="text-lg font-bold text-green-600">
              {new Set(usedNumbers).size}/9 angka
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(new Set(usedNumbers).size / 9) * 100}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {Array.from(new Set(usedNumbers)).sort((a, b) => a - b).map((num, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white shadow-sm"
                title={`Angka ${num}`}
              >
                <div className="text-lg">🔢</div>
                <span className="text-sm font-medium text-gray-700">{num}</span>
                <span className="text-xs text-green-600 ml-1">✅</span>
              </div>
            ))}
            {usedNumbers.length === 0 && (
              <span className="text-gray-500 text-sm">Belum ada angka yang ditebak</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-2xl">🧮</div>
          <p className="text-xl text-gray-700 font-medium">
            Hitung jumlah gambar dengan teliti
          </p>
          <div className="text-2xl">✏️</div>
        </div>
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full">
          <span className="text-2xl">❓</span>
          <span className="text-lg font-semibold text-green-700">
            Pertanyaan <span className="text-2xl">{currentQuestion}</span> dari <span className="text-2xl">{totalQuestions}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="mb-8 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl shadow-xl w-full max-w-4xl">
          <p className="text-2xl font-bold text-center mb-6 text-gray-800">
            Hitung jumlah
            <span className="text-3xl ml-3">{items[0] || '⭐'}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="text-6xl animate-bounce transform hover:scale-125 transition-transform duration-300"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-800 mb-2">
            Berapa jumlah gambar di atas
          </p>
          <p className="text-xl text-gray-600">
            Pilih angka yang benar
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {options.map((number, index) => {
            const alreadyGuessed = usedNumbers.includes(number)
            return (
              <button
                key={index}
                onClick={() => handleAnswer(number)}
                className={`group p-8 rounded-2xl border-2 transition-all duration-300 text-4xl font-bold flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 ${
                  alreadyGuessed 
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-300' 
                    : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-green-400 hover:from-green-50 hover:to-emerald-50'
                }`}
              >
                <span className={`transition-colors ${
                  alreadyGuessed 
                    ? 'text-emerald-700 group-hover:text-green-800' 
                    : 'text-gray-800 group-hover:text-green-700'
                }`}>
                  {number}
                  {alreadyGuessed && (
                    <span className="absolute -top-2 -right-2 text-2xl">✅</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl">
        <p className="text-xl text-gray-700 font-medium flex items-center justify-center gap-3">
          <span className="text-2xl">💡</span>
          Tips Hitung pelan-pelan satu per satu
          <span className="text-2xl">👆</span>
        </p>
      </div>
    </div>
  )
}

export default NumberGame