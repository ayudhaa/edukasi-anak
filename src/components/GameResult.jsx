import { useEffect } from 'react'
import Notiflix from 'notiflix'

const GameResult = ({ score, totalQuestions, gameName, onBackToMenu, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100)
  
  useEffect(() => {
    let title, message, emoji, sound    
    if (percentage === 100) {
      title = 'LUAR BIASA🏆'
      message = 'Kamu adalah JUARA sejati, semua jawaban benar'
      emoji = '👑'
      sound = 'success'
    } else if (percentage >= 80) {
      title = 'HEBAT SEKALI🌟'
      message = `Kamu benar ${score} dari ${totalQuestions}, pintar banget`
      emoji = '✨'
      sound = 'success'
    } else if (percentage >= 60) {
      title = 'BAGUS SEKALI👍'
      message = `Kamu dapat ${score} bintang, sudah hebat`
      emoji = '⭐'
      sound = 'info'
    } else {
      title = 'SUDAH BAGUS💪'
      message = 'Terus berlatih ya, besok pasti lebih hebat'
      emoji = '🎯'
      sound = 'info'
    }
    
    Notiflix.Report[sound](
      title,
      `${message}<br/><br/>Game ${gameName} selesai!<br/>${emoji} ${emoji} ${emoji}`,
      'Lihat Sertifikat! 📜',
      {
        width: '500px',
        borderRadius: '30px',
        titleFontSize: '32px',
        messageFontSize: '22px',
        buttonFontSize: '22px',
        svgSize: '100px',
      }
    )
  }, [percentage, score, totalQuestions, gameName])

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
      <div className="text-center">
        <div className="relative mb-8">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Sertifikat Prestasi🏅
          </h2>
          <div className="absolute -top-2 -left-2 text-4xl animate-bounce">🎉</div>
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</div>
          <div className="absolute -bottom-2 -left-2 text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>⭐</div>
          <div className="absolute -bottom-2 -right-2 text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🌟</div>
        </div>
        
        <div className="relative inline-block mb-8">
          <div className={`w-48 h-48 rounded-full flex items-center justify-center text-6xl ${
            percentage === 100 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
            percentage >= 80 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
            percentage >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
            'bg-gradient-to-r from-green-500 to-emerald-500'
          } animate-pulse shadow-2xl`}>
            {percentage === 100 ? '🏆' :
             percentage >= 80 ? '✨' :
             percentage >= 60 ? '⭐' : '💪'}
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
            <span className="text-2xl">🎮</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">{score}/{totalQuestions}</div>
            <div className="text-lg text-gray-600">Jawaban benar</div>
            <div className="text-2xl mt-2">✅</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
            <div className="text-4xl font-bold text-pink-600 mb-2">{percentage}%</div>
            <div className="text-lg text-gray-600">Tingkat keberhasilan</div>
            <div className="text-2xl mt-2">📈</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">{gameName}</div>
            <div className="text-lg text-gray-600">Game yang dimainkan</div>
            <div className="text-2xl mt-2">🎯</div>
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold text-gray-700">Progress belajar</span>
            <span className="text-lg font-bold text-purple-600">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div 
              className={`h-6 rounded-full transition-all duration-1000 ${
                percentage === 100 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                percentage >= 80 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                percentage >= 60 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                'bg-gradient-to-r from-green-400 to-emerald-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-gray-500">Mulai</span>
            <span className="text-gray-500">Ahli</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 mb-10">
          <div className="text-3xl mb-4">
            {percentage === 100 ? '🎖️ Kamu luar biasa' :
             percentage >= 80 ? '🌟 Kamu hebat sekali' :
             percentage >= 60 ? '⭐ Kamu sudah bagus' : '💪 Kamu sudah keren'}
          </div>
          <p className="text-xl text-gray-700">
            {percentage === 100 ? 'Semua jawabanmu benar, kamu adalah juara sejati' :
             percentage >= 80 ? 'Hampir sempurna, besok pasti bisa dapat nilai tertinggi' :
             percentage >= 60 ? 'Sudah melewati setengah perjalanan, terus semangat yaaa' :
             'Setiap latihan membuatmu lebih hebat, ayo coba lagi...'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={onRestart}
            className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <span className="text-3xl">🔄</span>
            Main Lagi
            <span className="text-3xl group-hover:rotate-180 transition-transform">🎮</span>
          </button>
          
          <button
            onClick={onBackToMenu}
            className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl font-bold rounded-2xl hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <span className="text-3xl">🏠</span>
            Pilih Game Lain
            <span className="text-3xl group-hover:scale-125 transition-transform">🎯</span>
          </button>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xl text-gray-600 flex items-center justify-center gap-3">
            <span className="text-2xl">🎈</span>
            Terima kasih sudah bermain dan belajar
            <span className="text-2xl">❤️</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameResult