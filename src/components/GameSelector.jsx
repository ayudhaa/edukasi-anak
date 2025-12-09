const GameSelector = ({ games, onSelectGame }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            className={`${game.color} p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="text-6xl mb-4">{game.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>
            <p className="text-gray-600 mt-2">Klik untuk bermain</p>
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h3 className="text-2xl font-bold text-purple-700 mb-4">Cara Bermain:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-pink-50 rounded-2xl">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-bold text-lg mb-2">Game Warna</h4>
            <p className="text-gray-700">Tebak nama warna yang ditampilkan</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl">
            <div className="text-3xl mb-2">🔺</div>
            <h4 className="font-bold text-lg mb-2">Game Bentuk</h4>
            <p className="text-gray-700">Pilih bentuk yang sesuai dengan namanya</p>
          </div>
          <div className="p-4 bg-green-50 rounded-2xl">
            <div className="text-3xl mb-2">🔢</div>
            <h4 className="font-bold text-lg mb-2">Game Angka</h4>
            <p className="text-gray-700">Hitung jumlah gambar dan pilih angka yang benar</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameSelector