import Link from 'next/link';

export default function Home() {
  const games = [
    {
      title: "Pet Collector",
      players: "8.3K",
      image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop",
      color: "from-blue-400 to-cyan-400",
      href: "/game/pet-collector",
      playable: true
    },
    {
      title: "Rainbow Obby",
      players: "12.5K",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
      color: "from-pink-400 to-purple-400",
      href: "#"
    },
    {
      title: "Magic Castle",
      players: "15.2K",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop",
      color: "from-yellow-400 to-orange-400",
      href: "#"
    },
    {
      title: "Space Adventure",
      players: "20.1K",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop",
      color: "from-indigo-400 to-purple-400",
      href: "#"
    },
    {
      title: "Café Tycoon",
      players: "9.7K",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      color: "from-rose-400 to-pink-400",
      href: "#"
    },
    {
      title: "Ocean Paradise",
      players: "11.4K",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      color: "from-teal-400 to-blue-400",
      href: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                ✨ CuteBlox
              </h1>
              <div className="hidden md:flex gap-6">
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Discover</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Create</a>
                <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">Avatar</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-full transition">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg transition transform hover:scale-105">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Create & Play Together
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join millions of players in endless adventures! 🌈
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-2xl transition transform hover:scale-105 text-lg">
              🎮 Start Playing
            </button>
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:shadow-xl transition border-2 border-purple-200 text-lg">
              🎨 Create Game
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-6 text-center shadow-lg border-2 border-pink-100">
            <div className="text-3xl font-bold text-pink-500">50M+</div>
            <div className="text-gray-600 mt-1">Players</div>
          </div>
          <div className="bg-white rounded-3xl p-6 text-center shadow-lg border-2 border-purple-100">
            <div className="text-3xl font-bold text-purple-500">100K+</div>
            <div className="text-gray-600 mt-1">Games</div>
          </div>
          <div className="bg-white rounded-3xl p-6 text-center shadow-lg border-2 border-blue-100">
            <div className="text-3xl font-bold text-blue-500">1M+</div>
            <div className="text-gray-600 mt-1">Creators</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">✨ Popular Games</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <Link
                key={index}
                href={game.href}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-purple-100 relative"
              >
                {game.playable && (
                  <div className="absolute top-3 right-3 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    PLAYABLE
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40`}></div>
                </div>
                <div className="p-5">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600 font-medium">{game.players} playing</span>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transition text-sm">
                      Play
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Create Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white mt-16">
          <h3 className="text-4xl font-bold mb-4">🎨 Become a Creator!</h3>
          <p className="text-xl mb-8 opacity-90">
            Build your own games with our easy-to-use tools. No coding required!
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:shadow-2xl transition transform hover:scale-105 text-lg">
            Start Creating Now
          </button>
        </div>
      </section>
    </div>
  );
}
