import React, { useEffect, useState } from 'react';
import { Hash, Percent, AtSign, DollarSign, Ampersand, X } from 'lucide-react';

// Cosmic symbols for background particles (non-emoji)
const COSMIC_SYMBOLS = ['∆', '◊', '×', '≈', '∞', '≠', '±', '⌘', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];

// Symbol set for shuffling
const SYMBOL_SET = '!@#$%^&*()ÆŒØÅẞÞÐ¥¤¡¿';

// Glyph data structure
const GLYPHS = [
  { symbol: <Hash size={24} />, letter: 'S' },
  { symbol: <Percent size={24} />, letter: 'T' },
  { symbol: <Ampersand size={24} />, letter: 'A' },
  { symbol: <DollarSign size={24} />, letter: 'R' },
  { symbol: <AtSign size={24} />, letter: 'T' },
];

function App() {
  const [showGrid, setShowGrid] = useState(false);
  const [glyphsAnimated, setGlyphsAnimated] = useState(false);
  const [glyphTexts, setGlyphTexts] = useState(GLYPHS.map(() => ''));
  const [selectedProfile, setSelectedProfile] = useState<'lsd' | 'kayuu' | null>(null);

  useEffect(() => {
    // Generate background particles
    const generateParticles = () => {
      const particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          symbol: COSMIC_SYMBOLS[Math.floor(Math.random() * COSMIC_SYMBOLS.length)],
          style: {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDuration: `${Math.random() * 30 + 15}s`,
            animationDelay: `${Math.random() * 10}s`,
          },
        });
      }
      return particles;
    };

    const particles = generateParticles();
    const container = document.getElementById('cosmic-background');
    
    particles.forEach(particle => {
      const div = document.createElement('div');
      div.className = 'cosmic-particle';
      div.textContent = particle.symbol;
      Object.assign(div.style, particle.style);
      container?.appendChild(div);
    });

    // Start the glyph animation sequence
    setGlyphsAnimated(true);
    
    // Shuffle animation for each glyph
    GLYPHS.forEach((_, index) => {
      let shuffleCount = 0;
      const maxShuffles = 10;
      const shuffleInterval = setInterval(() => {
        if (shuffleCount >= maxShuffles) {
          clearInterval(shuffleInterval);
          setGlyphTexts(prev => {
            const newTexts = [...prev];
            newTexts[index] = GLYPHS[index].letter;
            return newTexts;
          });
          return;
        }
        
        setGlyphTexts(prev => {
          const newTexts = [...prev];
          newTexts[index] = SYMBOL_SET[Math.floor(Math.random() * SYMBOL_SET.length)];
          return newTexts;
        });
        
        shuffleCount++;
      }, 80);
    });

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const handleInitiationClick = () => {
    setShowGrid(true);
  };

  const ProfileDetails = ({ type }: { type: 'lsd' | 'kayuu' }) => {
    const isLSD = type === 'lsd';
    
    return (
      <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
        <div className="bg-black/80 border border-white/20 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-black/90 border-b border-white/20 p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isLSD ? 'LSD - Chaos Overlord ∞' : 'Kayuu - Rust Soberano ◊'}
            </h2>
            <button 
              onClick={() => setSelectedProfile(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Section 1: Overview */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-white/90">Visão geral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={isLSD 
                    ? "https://media-hosting.imagekit.io//40926f7136834545/Untitled%20%E2%80%91%20Made%20with%20FlexClip%20(4).gif?Expires=1837563070&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=LFwdLd-zQ81FoFIG3adbsxGZDvW2hnH~UQEWxGMRUed2iHQUeoVAn4393xHssxbolFDIGSLC8LCiDEf0KfLCWP3etgODy344wM7mU--nzL6HFS5OhrBDNS-nrckOwEZEf~mFuOZLpcjEK6WTkwERg257cThpnljf2ydaEFDUz6mI4M1XNUBMB91BEYkvEA4aoqfaeck4KO~af~yilo5jYfVnv1cpY3K6cIkdXTllJJI2S1Sc6LDcIDjNBaVyV9AZoD-kW7vSM4P0Hql7Ke~LO3snzADfu0AWAxCtPAAdzJVDD8fINTxrGI848~r330mZrjwX09I-dPBS~XH-oAnbdA__"
                    : "https://media-hosting.imagekit.io//196a894b6f1e46fd/Untitled%20%E2%80%91%20Made%20with%20FlexClip%20(8).gif?Expires=1837565094&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WzCjVhklYLXTHhtzEUIS8sEFjGmlzDfmcR~b1C0VStUa3JSGz2W7pXa66U9vQ94Y~7~PA2dhV3LeVU32YH~-MEYTKuiDyj9nYSslLUiC3kbfya1R120m~mKKpa2g2CkPxl~QgAXVZTxX5yTws3ETpdcHzF55WMcGTLJ6Cashs-Rnap2zBClgU7DWMZVgQSW3EMvLJUlWl9KLN0I9iEs8wC3zlPxBywMli4NGty3EQQqpTx9TOyOkhvs1uWxFVxAQsKypIF~STEFsmCCAGLZMZNnq77CfsePkg4y1IHJ9f8XpvT5GR12BZFI5ZBUUvHSgohkExwcYwgXFa47TFv3Srg__"
                  }
                  alt={isLSD ? "LSD Profile" : "Kayuu Profile"}
                  className="w-full rounded-lg"
                />
                <div className="space-y-4">
                  <p className="text-white/80">
                    {isLSD 
                      ? "Lsd Lorebook"
                      : "Kayuu Lorebook"
                    }
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded">
                      <div className="text-sm text-white/60">Poder</div>
                      <div className="text-lg">∞ / 100</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                      <div className="text-sm text-white/60">Recado</div>
                      <div className="text-lg">{isLSD ? "Do nada ao caos." : "Fiel a mim, leal a Rüst."}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Abilities */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-white/90">Organizações que já participou</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(isLSD ? [
                  { name: "Chaos", description: "Fundador da chaos um dos maiores grupos de 2023 com muita polemica kkkkkkkkkkkk" },
                  { name: "W$", description: "Criador da Wa$en, um grupo que cresceu nas outras rede sociais e hoje em dia foi roubada por um aleatorio ai" },
                  { name: "Radia", description: "Dono de um dos grupos mais antigo do whatsapp" }
                ] : [
                  { name: "Rust", description: "Criou a rust um dos maiores grupos de 2024" },
                  { name: "Baviera", description: "Criou a baviera um dos maiores grupos atualmetente" },
                  { name: "Chaos", description: "Estava junto na criação da chaos" }
                ]).map((ability, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{ability.name}</h4>
                    <p className="text-sm text-white/70">{ability.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Arsenal */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-white/90">Maiores feitos</h3>
              <div className="grid grid-cols-1 gap-4">
                {(isLSD ? [
                  { name: "Criação do Chaos - Xaoc e Revolução na Bolha do WhatsApp (2023)", description: "Lsd revolucionou a cena underground ao criar o Chaos - Xaoc, um grupo caótico e doentio que se tornou viral no WhatsApp. O grupo ganhou tanta notoriedade que virou tema de matérias jornalísticas e posts nas redes sociais, atraindo atenção até de autoridades. Apesar da prisão de alguns membros, Lsd permaneceu ileso, provando sua habilidade em se manter anônimo e protegido.", power: "98%" },
                  { name: "Processos", description: "Tem 3 processos nas costas", power: "87%" },
                  { name: "Doente", description: "Tem alguns problemas mentais", power: "92%" }
                ] : [
                  { name: "Derrubada de Grupos e Organizações", description: "Kayuu ficou conhecido por destruir incontáveis grupos, teams e organizações na web sozinho, demonstrando poder e influência no submundo digital. Sua capacidade de desmantelar estruturas rivais o coloca como uma figura temida.", power: "95%" },
                  { name: "Ataques Cibernéticos e Doxxing", description: "Ele já realizou ataques contra sites inimigos e expôs informações pessoais de adversários (doxxing), além de banir números de WhatsApp, contas do Telegram, Instagram e outros apps. Isso mostra seu domínio em hacking e perseguição digital.", power: "89%" },
                  { name: "Manipulação e Persuasão em Alto Nível", description: "Mesmo agindo sozinho, Kayuu consegue controlar situações e pessoas através de manipulação psicológica, fazendo com que inimigos ajam conforme sua vontade ou caiam em suas armadilhas sem precisar de um exército de seguidores.", power: "93%" }
                ]).map((weapon, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{weapon.name}</h4>
                      <p className="text-sm text-white/70">{weapon.description}</p>
                    </div>
                    <div className="w-full md:w-32 bg-white/10 rounded-full h-2 mt-2">
                      <div 
                        className="h-full rounded-full bg-white/80"
                        style={{ width: weapon.power }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Cosmic Background */}
      <div id="cosmic-background" className="fixed inset-0 overflow-hidden pointer-events-none" />

      {/* Main Portal Interface */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Initiation Sequence */}
        {!showGrid && (
          <div className="text-center">
            <div 
              className="flex gap-4 mb-10 justify-center"
              onClick={handleInitiationClick}
            >
              {GLYPHS.map((glyph, index) => (
                <div
                  key={glyph.letter}
                  className={`
                    text-white text-2xl cursor-pointer transition-all duration-300
                    hover:shadow-[0_0_10px_#fff,0_0_30px_#fff,0_0_50px_#fff]
                    ${glyphsAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                  `}
                  style={{
                    textShadow: '0 0 5px #fff, 0 0 15px #fff, 0 0 25px #fff',
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {glyphTexts[index] || glyph.symbol}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Entity Selection Grid */}
        {showGrid && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto p-5">
            {/* LSD Entity Portal */}
            <button 
              onClick={() => setSelectedProfile('lsd')}
              className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 shadow-lg transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-white/20"
            >
              <img
                src="https://i.postimg.cc/L6dhrSK1/lsd.jpg?auto=format&fit=crop&w=800"
                alt="LSD - Chaos Overlord"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
                <h2 className="text-lg tracking-wide text-shadow">LSD - Chaos Overlord ∞</h2>
              </div>
            </button>

            {/* Kayuu Entity Portal */}
            <button
              onClick={() => setSelectedProfile('kayuu')}
              className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 shadow-lg transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-white/20"
            >
              <img
                src="https://i.postimg.cc/CLhmCGZd/kayuu2.jpg?auto=format&fit=crop&w=800"
                alt="Kayuu - Rust Soberano"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
                <h2 className="text-lg tracking-wide text-shadow">Kayuu - Rust Soberano ◊</h2>
              </div>
            </button>
          </div>
        )}

        {/* Profile Details Modal */}
        {selectedProfile && <ProfileDetails type={selectedProfile} />}
      </div>

      {/* Background Music */}
      <iframe
        className="hidden"
        src="https://www.youtube.com/embed/xvNE7BdpKOk?autoplay=1&loop=1&playlist=xvNE7BdpKOk&mute=0&controls=0&enablejsapi=1"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />
    </>
  );
}

export default App;