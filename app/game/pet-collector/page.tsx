'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PetCollector() {
  const [coins, setCoins] = useState(0);
  const [pets, setPets] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoCollectors, setAutoCollectors] = useState(0);
  const [level, setLevel] = useState(1);

  const petEmojis = ['🐱', '🐶', '🐰', '🐹', '🐼', '🐨', '🦊', '🐻'];
  const [collectedPets, setCollectedPets] = useState<string[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<Array<{id: number, x: number, y: number, text: string}>>([]);

  // Auto-collect coins
  useEffect(() => {
    if (autoCollectors > 0) {
      const interval = setInterval(() => {
        setCoins(prev => prev + autoCollectors);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoCollectors]);

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(pets / 10) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      showFloatingText('✨ Level Up!', 300, 200);
    }
  }, [pets, level]);

  const showFloatingText = (text: string, x: number, y: number) => {
    const id = Date.now();
    setFloatingTexts(prev => [...prev, { id, x, y, text }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoins(prev => prev + clickPower);
    showFloatingText(`+${clickPower}`, x, y);

    if (Math.random() < 0.3) {
      const randomPet = petEmojis[Math.floor(Math.random() * petEmojis.length)];
      setPets(prev => prev + 1);
      setCollectedPets(prev => [...prev, randomPet].slice(-20));
      showFloatingText(randomPet, x + 30, y - 30);
    }
  };

  const upgrades = [
    { name: 'Better Treats', cost: 10, effect: () => setClickPower(prev => prev + 1), description: `+1 coin per click (Current: ${clickPower})` },
    { name: 'Auto Feeder', cost: 50, effect: () => setAutoCollectors(prev => prev + 1), description: `+1 coin/sec (Current: ${autoCollectors}/sec)` },
    { name: 'Pet House', cost: 100, effect: () => setClickPower(prev => prev + 5), description: `+5 coins per click` },
    { name: 'Mega Collector', cost: 500, effect: () => setAutoCollectors(prev => prev + 10), description: `+10 coins/sec` },
  ];

  const buyUpgrade = (upgrade: typeof upgrades[0]) => {
    if (coins >= upgrade.cost) {
      setCoins(prev => prev - upgrade.cost);
      upgrade.effect();
      showFloatingText('✅ Purchased!', 400, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to CuteBlox
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            🐾 Pet Collector
          </h1>
          <div className="w-32"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border-2 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">{coins}</div>
                <div className="text-gray-600 text-sm">Coins</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border-2 border-pink-200">
                <div className="text-3xl font-bold text-pink-600">{pets}</div>
                <div className="text-gray-600 text-sm">Pets Found</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-lg border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{level}</div>
                <div className="text-gray-600 text-sm">Level</div>
              </div>
            </div>

            {/* Click Area */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-200 relative overflow-hidden">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Click to Collect! 🎯</h2>
                <p className="text-gray-600">Find cute pets and earn coins!</p>
              </div>
              
              <div
                onClick={handleClick}
                className="relative w-full h-96 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-3xl cursor-pointer hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center overflow-hidden"
              >
                <div className="text-9xl animate-bounce">
                  {petEmojis[Math.floor(Date.now() / 1000) % petEmojis.length]}
                </div>

                {/* Floating texts */}
                {floatingTexts.map(ft => (
                  <div
                    key={ft.id}
                    className="absolute text-2xl font-bold text-white animate-ping"
                    style={{ left: ft.x, top: ft.y, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                  >
                    {ft.text}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-gray-600">
                Auto-earning: <span className="font-bold text-purple-600">{autoCollectors} coins/sec</span>
              </div>
            </div>

            {/* Pet Collection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-pink-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Recent Pets Collected 🏆</h3>
              <div className="flex flex-wrap gap-2">
                {collectedPets.length === 0 ? (
                  <p className="text-gray-400 italic">Click to start collecting pets!</p>
                ) : (
                  collectedPets.map((pet, i) => (
                    <div
                      key={i}
                      className="text-4xl animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {pet}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Upgrades Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-200 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🛍️ Shop</h3>
              <div className="space-y-3">
                {upgrades.map((upgrade, i) => {
                  const canAfford = coins >= upgrade.cost;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        canAfford
                          ? 'border-green-300 bg-green-50 hover:shadow-lg cursor-pointer'
                          : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => buyUpgrade(upgrade)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800">{upgrade.name}</h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          canAfford ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {upgrade.cost} 🪙
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{upgrade.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
                <p className="text-sm text-gray-700 text-center">
                  💡 <strong>Tip:</strong> Buy auto collectors to earn while idle!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
