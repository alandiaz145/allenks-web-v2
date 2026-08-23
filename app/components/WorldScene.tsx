export default function WorldScene() {
  return (
    <div className="world-scene-wrap">
      <svg className="world-scene" viewBox="0 0 1600 900" role="img" aria-label="Escena ilustrada del universo ALLEN KS con accesos a música, live, store y proyectos">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#693c58" />
            <stop offset="1" stopColor="#d46a79" />
          </linearGradient>
          <pattern id="stars" width="90" height="90" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="18" r="2" fill="#fff7df" opacity=".85" />
            <circle cx="62" cy="35" r="1.4" fill="#fff7df" opacity=".65" />
            <circle cx="38" cy="73" r="1.8" fill="#fff7df" opacity=".8" />
            <circle cx="82" cy="79" r="1" fill="#fff7df" opacity=".55" />
          </pattern>
          <filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="8" floodOpacity=".22" /></filter>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />
        <rect width="1600" height="900" fill="url(#stars)" opacity=".95" />

        <path d="M0 490 C180 410 330 470 520 425 S870 440 1060 390 S1380 410 1600 350 V900 H0Z" fill="#38435a" stroke="#171a24" strokeWidth="5" />
        <path d="M0 565 C230 485 430 545 640 500 S1080 525 1600 430 V900 H0Z" fill="#53607b" stroke="#171a24" strokeWidth="5" />

        <g transform="translate(145 135) rotate(-6)" filter="url(#shadow)">
          <a href="/#live" className="scene-link">
            <rect width="280" height="360" rx="8" fill="#f5d75e" stroke="#171a24" strokeWidth="7" />
            <text x="30" y="72" className="scene-kicker">NEXT SHOW</text>
            <text x="30" y="160" className="scene-big">05.09</text>
            <text x="30" y="218" className="scene-mid">OTRA NOCHE</text>
            <text x="30" y="260" className="scene-small">FT. DANCING BUDHAS</text>
            <path d="M28 298 H250" stroke="#171a24" strokeWidth="5" />
            <text x="30" y="334" className="scene-small">BUENOS AIRES →</text>
          </a>
        </g>

        <g transform="translate(515 260)" filter="url(#shadow)">
          <a href="/musica" className="scene-link">
            <rect x="0" y="0" width="560" height="330" rx="22" fill="#e8e5df" stroke="#171a24" strokeWidth="8" />
            <rect x="35" y="34" width="490" height="245" rx="8" fill="#16161c" stroke="#171a24" strokeWidth="6" />
            <rect x="58" y="58" width="444" height="198" fill="#2ec5e8" />
            <path d="M77 165 L118 112 L154 188 L196 92 L235 207 L278 125 L320 183 L362 78 L404 191 L466 132" fill="none" stroke="#171a24" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <text x="84" y="102" className="scene-kicker">PLAY MUSIC</text>
            <text x="84" y="238" className="scene-big scene-big--screen">ALLEN KS</text>
            <circle cx="281" cy="305" r="10" fill="#ff2a8b" stroke="#171a24" strokeWidth="4" />
          </a>
        </g>

        <g transform="translate(1080 190) rotate(5)" filter="url(#shadow)">
          <a href="/tienda" className="scene-link">
            <path d="M120 0 C170 0 210 20 240 58 L305 102 L260 173 L222 148 V350 H18 V148 L-20 173 L-66 102 L0 58 C30 20 70 0 120 0Z" fill="#17171d" stroke="#f2efe8" strokeWidth="7" />
            <path d="M70 30 C82 82 158 82 170 30" fill="none" stroke="#f2efe8" strokeWidth="7" />
            <text x="54" y="205" className="scene-big scene-big--shirt" fill="#f2efe8">AKS</text>
            <rect x="28" y="230" width="186" height="44" rx="22" fill="#ff2a8b" />
            <text x="61" y="260" className="scene-small" fill="#171a24">OPEN STORE →</text>
          </a>
        </g>

        <g transform="translate(120 600)" filter="url(#shadow)">
          <a href="/proyectos#spartans" className="scene-link">
            <rect width="330" height="150" rx="75" fill="#ef1826" stroke="#171a24" strokeWidth="7" />
            <text x="46" y="72" className="scene-mid" fill="#fff">SPARTANS</text>
            <text x="72" y="110" className="scene-small" fill="#fff">LABEL / ENTER →</text>
          </a>
        </g>

        <g transform="translate(1120 625) rotate(-3)" filter="url(#shadow)">
          <a href="/proyectos#otra-noche" className="scene-link">
            <rect width="360" height="150" rx="18" fill="#8b73e8" stroke="#171a24" strokeWidth="7" />
            <text x="44" y="68" className="scene-mid" fill="#fff">OTRA NOCHE</text>
            <text x="44" y="108" className="scene-small" fill="#fff">EVENTS / COMMUNITY →</text>
          </a>
        </g>

        <g transform="translate(610 635)">
          <path d="M0 110 C35 12 155 -18 248 22 C320 53 343 124 304 182" fill="none" stroke="#171a24" strokeWidth="28" strokeLinecap="round" />
          <rect x="-12" y="94" width="70" height="115" rx="34" fill="#ff7798" stroke="#171a24" strokeWidth="7" />
          <rect x="270" y="94" width="70" height="115" rx="34" fill="#ff7798" stroke="#171a24" strokeWidth="7" />
        </g>

        <path d="M490 810 C650 760 885 760 1110 815" fill="none" stroke="#171a24" strokeWidth="9" strokeLinecap="round" />
        <text x="800" y="855" textAnchor="middle" className="scene-caption">CLICK THE OBJECTS / THIS IS THE ALLEN KS WORLD</text>
      </svg>
    </div>
  );
}
