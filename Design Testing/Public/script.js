// =============================================
// BOOT SEQUENCE
// =============================================
window.addEventListener('DOMContentLoaded', () => {
  const bootScreen = document.getElementById('boot-screen');
  const siteContent = document.getElementById('site-content');

  setTimeout(() => {
    bootScreen.classList.add('fade-out');
    siteContent.classList.add('visible');
    setTimeout(() => bootScreen.remove(), 650);
    setTimeout(() => VibeCore.triggerLogoGlitch(), 800);
  }, 2200);
});

// =============================================
// SOUND ENGINE
// =============================================
const SoundEngine = {
  ctx: null,

  getCtx() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    return this.ctx;
  },

  playClick() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch(e) {}
  },

  playOpen() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) {}
  },

  playReveal() {
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch(e) {}
  },

  playSuccess() {
    try {
      const ctx = this.getCtx();
      [440, 550, 660].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.1;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
      });
    } catch(e) {}
  }
};

// =============================================
// COUNTDOWN TIMER UTILITY
// =============================================
function getCountdown(dateStr) {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return 'DOORS CLOSED';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `[ DOORS IN ${d}D ${h}H ${m}M ]`;
}

// =============================================
// LIVE FOOTER STATUS ROTATOR
// =============================================
const FooterStatusRotator = {
  messages: [
    'SYSTEMS NOMINAL // TICKETING LIVE',
    'ARTIST CHECK // SOUNDBOARD ACTIVE',
    'DOORS OPEN 19:00 // PERIMETER CLEAR',
    'CROWD DENSITY: HIGH // GATE A OPEN',
    'SIGNAL OUTPUT: STABLE ▊',
    'FREQ 440HZ // BROADCAST LIVE',
    'PASS VERIFICATION: ONLINE',
    'STAGE CREW // STANDING BY',
  ],
  index: 0,
  el: null,
  customMessageTimeout: null,

  init() {
    this.el = document.getElementById('footerStatus');
    this.startInterval();
  },

  startInterval() {
    this.interval = setInterval(() => this.rotate(), 3500);
  },

  rotate() {
    if (!this.el) return;
    this.el.classList.add('fading');
    setTimeout(() => {
      this.index = (this.index + 1) % this.messages.length;
      this.el.textContent = this.messages[this.index];
      this.el.classList.remove('fading');
    }, 300);
  },

  triggerSystemAlert(text) {
    clearInterval(this.interval);
    clearTimeout(this.customMessageTimeout);
    
    this.el.classList.add('fading');
    setTimeout(() => {
      this.el.textContent = text;
      this.el.classList.remove('fading');
      this.customMessageTimeout = setTimeout(() => {
        this.startInterval();
      }, 4000);
    }, 300);
  }
};

// =============================================
// FLOATING TEXT CROSSFADE
// =============================================
function swapFloatText(el, newText, activate) {
  el.classList.add('swapping');
  el.removeAttribute('data-active');
  setTimeout(() => {
    el.innerText = newText;
    el.classList.remove('swapping');
    if (activate) el.setAttribute('data-active', 'true');
  }, 300);
}

// =============================================
// ARTIST MODAL CONTROLLER
// =============================================
const ArtistModal = {
  backdrop: null,
  panel: null,
  data: {
    'artist-1': {
      name: 'TOKYO CYBERNET',
      genre: 'ELECTRONIC // MODULAR',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
      bio: 'Modular synthesis algorithms pushed beyond operational limits. Tokyo Cybernet redefines structural soundscapes through algorithmic sequence disruption and live-wire hardware patching. Expect heavy sub-bass frequencies and erratic tempo anomalies.',
      warning: '// OVERRIDE PROTOCOL ENGAGED.'
    },
    'artist-2': {
      name: 'STATIC VELVET',
      genre: 'POST-PUNK // ALTERNATIVE',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
      bio: 'Analog degradation meets overdrive distortion. Static Velvet operates in the dead-zones of modern audio, utilizing vintage amplification to generate deliberate harmonic decay. A visceral exploration of feedback loops and raw, unquantized rhythm structures.',
      warning: '// SIGNAL WARNING: HIGH DISTORTION.'
    },
    'artist-3': {
      name: 'NOVA FRACTURE',
      genre: 'INDUSTRIAL // NOISE ROCK',
      img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200',
      bio: 'Sonic architecture designed to dismantle itself. Nova Fracture synthesizes mechanical noise with shattered vocal processors, building a wall of sound that tests structural venue acoustics. Not a performance, but a controlled demolition of the audio spectrum.',
      warning: '// PERIMETER EVACUATION RECOMMENDED.'
    }
  },

  init() {
    this.backdrop = document.getElementById('artistModal');
    this.panel = document.getElementById('artistPanel');

    document.querySelectorAll('.lineup-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = card.classList.contains('artist-1') ? 'artist-1' :
                   card.classList.contains('artist-2') ? 'artist-2' : 'artist-3';
        this.open(id);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop && this.backdrop.classList.contains('active')) {
        this.close();
      }
    });
  },

  open(artistId) {
    const info = this.data[artistId];
    document.getElementById('artistModalImg').src = info.img;
    document.getElementById('artistModalName').textContent = info.name;
    document.getElementById('artistGhostName').textContent = info.name;
    document.getElementById('artistModalGenre').textContent = info.genre;
    document.getElementById('artistModalBio').innerHTML = `<span class="artist-bio-prefix">SYS-LOG ></span> ${info.bio} <br><br><span style="color:var(--accent-color)">${info.warning}</span>`;

    document.body.classList.add('modal-open');
    this.backdrop.style.display = 'flex';
    void this.backdrop.offsetWidth; 
    this.backdrop.classList.add('active');
    SoundEngine.playReveal();

    setTimeout(() => VibeCore.refreshCursorTracking(), 150);
  },

  close() {
    this.backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      this.backdrop.style.display = 'none';
    }, 400);
  }
};

// =============================================
// TERMINAL OVERLAY MODAL CONTROLLER (SEAT GRID)
// =============================================
const TerminalModal = {
  backdrop: null,
  panel: null,
  activeShow: null,
  selectedTier: 'GA',
  demandInterval: null,
  viewMode: 'zone', 
  selectedSeats: [], 
  seatsDatabase: {}, 
  seatsInventory: { 'SVIP': 0, 'VIP': 0, 'GA': 0 },

  init() {
    this.backdrop = document.getElementById('terminalModal');
    this.panel = document.getElementById('terminalPanel');
    this.bindEvents();
  },

  getVenueLayoutType(venueName) {
    const lower = venueName.toLowerCase();
    if (lower.includes('stadium') || lower.includes('dome')) return 'stadium';
    if (lower.includes('theater') || lower.includes('hall')) return 'theater';
    if (lower.includes('coliseum') || lower.includes('arena') || lower.includes('gymnastics') || lower.includes('ziggo')) return 'arena';
    if (lower.includes('amphitheater') || lower.includes('beach')) return 'amphitheater';
    if (lower.includes('field') || lower.includes('track')) return 'field';
    if (lower.includes('vault') || lower.includes('tresor')) return 'vault';
    return 'warehouse'; 
  },

  open(show) {
    this.activeShow = show;
    this.selectedTier = 'GA'; 
    this.viewMode = 'zone';
    this.selectedSeats = [];
    
    document.getElementById('modalShowTitle').textContent = show.title;
    document.getElementById('modalShowVenue').textContent = show.venue;
    
    const ghost = document.getElementById('modalGhostHeader');
    ghost.textContent = show.title;
    ghost.style.fontSize = show.title.length > 15 ? '4vw' : '5.5vw';

    const coordsBar = document.getElementById('modalCoordsBar');
    if (show.tags.includes('manila')) coordsBar.textContent = "SYS-OP // 14.5995°N 120.9842°E";
    else if (show.tags.includes('tokyo')) coordsBar.textContent = "SYS-OP // 35.6764°N 139.6500°E";
    else if (show.tags.includes('seoul')) coordsBar.textContent = "SYS-OP // 37.5665°N 126.9780°E";
    else if (show.tags.includes('london')) coordsBar.textContent = "SYS-OP // 51.5074°N 0.1278°W";
    else coordsBar.textContent = "SYS-OP // CLOCK NODE ENGAGED";

    this.generateMockSeatsDatabase();

    this.renderSVGDiagram(show);
    this.renderTiers(show);
    this.updateActionStateUI();

    document.body.classList.add('modal-open');
    this.backdrop.style.display = 'flex';
    void this.backdrop.offsetWidth; 
    this.backdrop.classList.add('active');
    SoundEngine.playReveal();

    setTimeout(() => VibeCore.refreshCursorTracking(), 150);
    this.startDemandSimulation();
  },

  generateMockSeatsDatabase() {
    const tierList = ['SVIP', 'VIP', 'GA'];
    const layoutType = this.getVenueLayoutType(this.activeShow.venue);
    
    this.seatsDatabase = {};
    
    tierList.forEach(tier => {
      this.seatsDatabase[tier] = [];
      let rowsCount = tier === 'SVIP' ? 3 : (tier === 'VIP' ? 5 : 7);
      let seatsCount = tier === 'SVIP' ? 6 : (tier === 'VIP' ? 10 : 12);
      
      if (layoutType === 'arena') {
        rowsCount = tier === 'SVIP' ? 3 : (tier === 'VIP' ? 4 : 6);
        seatsCount = tier === 'SVIP' ? 8 : (tier === 'VIP' ? 14 : 18);
      } else if (layoutType === 'amphitheater') {
        rowsCount = tier === 'SVIP' ? 2 : (tier === 'VIP' ? 5 : 6);
        seatsCount = tier === 'SVIP' ? 10 : (tier === 'VIP' ? 12 : 16);
      } else if (layoutType === 'stadium') {
        rowsCount = tier === 'SVIP' ? 2 : (tier === 'VIP' ? 4 : 6);
        seatsCount = tier === 'SVIP' ? 12 : (tier === 'VIP' ? 16 : 20);
      } else if (layoutType === 'theater') {
        rowsCount = tier === 'SVIP' ? 3 : (tier === 'VIP' ? 4 : 5);
        seatsCount = tier === 'SVIP' ? 8 : (tier === 'VIP' ? 12 : 14);
      } else if (layoutType === 'field') {
        rowsCount = tier === 'SVIP' ? 2 : (tier === 'VIP' ? 3 : 5);
        seatsCount = tier === 'SVIP' ? 14 : (tier === 'VIP' ? 18 : 22);
      } else if (layoutType === 'vault') {
        rowsCount = tier === 'SVIP' ? 2 : (tier === 'VIP' ? 6 : 6);
        seatsCount = tier === 'SVIP' ? 10 : (tier === 'VIP' ? 5 : 5);
      } else if (layoutType === 'warehouse') {
        rowsCount = tier === 'SVIP' ? 3 : (tier === 'VIP' ? 5 : 10);
        seatsCount = tier === 'SVIP' ? 6 : (tier === 'VIP' ? 10 : 6);
      }

      let remaining = 0;
      for (let r = 0; r < rowsCount; r++) {
        const rowLabel = String.fromCharCode(65 + r);
        for (let s = 1; s <= seatsCount; s++) {
          const occupied = Math.random() < 0.45;
          if (!occupied) remaining++;
          this.seatsDatabase[tier].push({
            id: `${tier}-${rowLabel}-${s}`,
            row: rowLabel,
            num: s,
            occupied: occupied
          });
        }
      }
      this.seatsInventory[tier] = remaining;
    });
  },

  close() {
    this.backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
    clearInterval(this.demandInterval);

    setTimeout(() => {
      this.backdrop.style.display = 'none';
    }, 300);
  },

  renderSVGDiagram(show) {
    const container = document.getElementById('modalDiagramContainer');
    if (this.viewMode === 'seats') {
      this.renderSeatGridMatrix(container);
      return;
    }

    let internalMapHTML = '';
    const layoutType = this.getVenueLayoutType(show.venue);

    if (layoutType === 'arena') {
      internalMapHTML = `
        <circle cx="140" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" stroke-dasharray="2,2"/>
        <circle cx="140" cy="100" r="22" fill="#16161A" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <text x="140" y="103" text-anchor="middle" font-size="6" font-weight="800" fill="rgba(255,255,255,0.5)" letter-spacing="0.5">CTR STAGE</text>
        
        <circle cx="140" cy="100" r="42" id="svg-zone-svip" class="svg-zone zone-svip" fill="#CCFF00" fill-opacity="0.03" stroke="rgba(204,255,0,0.4)" stroke-width="0.8" stroke-dasharray="3,1"/>
        <text x="140" y="72" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.4)" pointer-events="none">SVIP RING</text>
        
        <path d="M 75 75 A 65 65 0 1 1 205 75 M 205 125 A 65 65 0 0 1 75 125" id="svg-zone-vip" class="svg-zone zone-vip" fill="#FFB74D" fill-opacity="0.02" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="140" y="48" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.4)" pointer-events="none">VIP LOWER BOWL</text>
        
        <path d="M 50 50 A 92 92 0 1 1 230 50 M 230 150 A 92 92 0 0 1 50 150" id="svg-zone-ga" class="svg-zone zone-ga" fill="url(#modal-dots)" fill-opacity="0.5" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
        <text x="140" y="24" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.3)" pointer-events="none">GA TIERED STANDS</text>
      `;
    } else if (layoutType === 'amphitheater') {
      internalMapHTML = `
        <path d="M 55 25 L 225 25 L 205 40 L 75 40 Z" fill="#18181A" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
        <text x="140" y="34" text-anchor="middle" font-size="6" font-weight="700" fill="rgba(255,255,255,0.5)">FRONT PROSCENIUM</text>
        
        <path d="M 80 48 A 60 55 0 0 1 200 48 L 180 75 A 35 30 0 0 0 100 75 Z" id="svg-zone-svip" class="svg-zone zone-svip" fill="#CCFF00" fill-opacity="0.04" stroke="rgba(204,255,0,0.4)" stroke-width="0.8"/>
        <text x="140" y="62" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.6)" pointer-events="none">SVIP ORCHESTRA</text>

        <path d="M 60 44 A 85 75 0 0 1 220 44 L 195 72 A 62 55 0 0 0 85 72 Z M 65 82 A 80 72 0 0 1 215 82 L 190 112 A 58 50 0 0 0 90 112 Z" id="svg-zone-vip" class="svg-zone zone-vip" fill="#FFB74D" fill-opacity="0.03" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="140" y="100" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.5)" pointer-events="none">VIP MEZZANINE ARRAYS</text>

        <path d="M 35 36 A 110 100 0 0 1 245 36 L 222 66 A 88 80 0 0 0 58 66 Z M 40 120 A 105 95 0 0 1 240 120 L 210 152 A 78 70 0 0 0 70 152 Z" id="svg-zone-ga" class="svg-zone zone-ga" fill="url(#modal-dots)" fill-opacity="0.6" stroke="rgba(255,255,255,0.18)" stroke-width="0.8"/>
        <text x="140" y="174" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.35)" pointer-events="none">GA OPEN TERRACE</text>
      `;
    } else if (layoutType === 'stadium') {
      internalMapHTML = `
        <ellipse cx="140" cy="100" rx="20" ry="14" fill="#151518" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
        <text x="140" y="102" text-anchor="middle" font-size="5.5" font-weight="800" fill="var(--accent-color)">360° PIT</text>
        
        <ellipse cx="140" cy="100" rx="48" ry="32" id="svg-zone-svip" class="svg-zone zone-svip" fill="#CCFF00" fill-opacity="0.02" stroke="rgba(204,255,0,0.5)" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="140" y="78" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.4)" pointer-events="none">SVIP COAT TRACK</text>
        
        <ellipse cx="140" cy="100" rx="80" ry="56" id="svg-zone-vip" class="svg-zone zone-vip" fill="#FFB74D" fill-opacity="0.02" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="140" y="55" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.4)" pointer-events="none">VIP FIELD STRETCH</text>
        
        <path d="M 25 100 A 115 85 0 1 1 255 100 A 115 85 0 1 1 25 100 Z M 50 100 A 90 65 0 1 0 230 100 A 90 65 0 1 0 50 100 Z" id="svg-zone-ga" class="svg-zone zone-ga" fill="url(#modal-dots)" fill-opacity="0.5" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
        <text x="140" y="24" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.3)" pointer-events="none">GA STADIUM TIER BOWL</text>
      `;
    } else if (layoutType === 'theater') {
      internalMapHTML = `
        <rect x="75" y="12" width="130" height="15" fill="#1C1C1F" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
        <text x="140" y="21" text-anchor="middle" font-size="6" font-weight="700" fill="rgba(255,255,255,0.4)">THEATER MAIN STAGE</text>
        
        <path d="M 60 36 L 220 36 L 200 66 L 80 66 Z" id="svg-zone-svip" class="svg-zone zone-svip" fill="#CCFF00" fill-opacity="0.04" stroke="rgba(204,255,0,0.4)" stroke-width="0.8"/>
        <text x="140" y="50" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.5)" pointer-events="none">SVIP ORCHESTRA STALLS</text>
        
        <path d="M 45 74 L 235 74 L 215 114 L 65 114 Z" id="svg-zone-vip" class="svg-zone zone-vip" fill="#FFB74D" fill-opacity="0.03" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="140" y="94" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.5)" pointer-events="none">VIP MEZZANINE BALCONY</text>
        
        <path d="M 30 122 L 250 122 L 230 178 L 50 178 Z" id="svg-zone-ga" class="svg-zone zone-ga" fill="url(#modal-dots)" fill-opacity="0.6" stroke="rgba(255,255,255,0.16)" stroke-width="0.8"/>
        <text x="140" y="150" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.35)" pointer-events="none">GA UPPER DECK LOGE</text>
      `;
    } else if (layoutType === 'field') {
      internalMapHTML = `
        <polygon points="90,14 190,14 210,32 70,32" fill="#1C1C1F" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
        <text x="140" y="24" text-anchor="middle" font-size="5.5" font-weight="700" fill="rgba(255,255,255,0.4)">OUTDOOR FESTIVAL STAGE</text>
        
        <rect id="svg-zone-svip" class="svg-zone zone-svip" x="50" y="40" width="180" height="30" rx="3" fill="#CCFF00" fill-opacity="0.03" stroke="rgba(204,255,0,0.45)" stroke-width="0.8"/>
        <text x="140" y="58" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.5)" pointer-events="none">SVIP FRONT BARRICADE</text>
        
        <rect id="svg-zone-vip" class="svg-zone zone-vip" x="35" y="78" width="210" height="42" rx="4" fill="#FFB74D" fill-opacity="0.02" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="140" y="101" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.5)" pointer-events="none">VIP MIDDLE FIELD ASSIGN</text>
        
        <rect id="svg-zone-ga" class="svg-zone zone-ga" x="20" y="128" width="240" height="56" rx="2" fill="url(#modal-dots)" fill-opacity="0.5" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
        <text x="140" y="160" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.3)" pointer-events="none">GA FESTIVAL LAWN FIELD</text>
      `;
    } else if (layoutType === 'vault') {
      internalMapHTML = `
        <rect x="105" y="12" width="70" height="16" fill="#111" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
        <text x="140" y="22" text-anchor="middle" font-size="5" font-weight="800" fill="var(--accent-color)">SOUND BOOTH DETECTOR</text>
        
        <rect id="svg-zone-svip" class="svg-zone zone-svip" x="30" y="36" width="220" height="34" rx="1" fill="#CCFF00" fill-opacity="0.04" stroke="rgba(204,255,0,0.4)" stroke-width="0.8"/>
        <text x="140" y="55" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.5)" pointer-events="none">SVIP INDUSTRIAL INNER CORE</text>
        
        <rect id="svg-zone-vip" class="svg-zone zone-vip" x="30" y="78" width="105" height="100" rx="1" fill="#FFB74D" fill-opacity="0.02" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="82" y="130" text-anchor="middle" font-size="4.5" fill="rgba(255,255,255,0.4)" pointer-events="none">VIP FLANK NORTH</text>
        
        <rect id="svg-zone-ga" class="svg-zone zone-ga" x="145" y="78" width="105" height="100" rx="1" fill="url(#modal-dots)" fill-opacity="0.6" stroke="rgba(255,255,255,0.18)" stroke-width="0.8"/>
        <text x="197" y="130" text-anchor="middle" font-size="4.5" fill="rgba(255,255,255,0.4)" pointer-events="none">GA FLANK SOUTH CONCRETE</text>
      `;
    } else {
      internalMapHTML = `
        <rect x="85" y="14" width="110" height="18" fill="#18181A" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
        <text x="140" y="25" text-anchor="middle" font-size="6" font-weight="700" fill="rgba(255,255,255,0.4)">ENDSTAGE PLATFORM</text>
        
        <rect id="svg-zone-svip" class="svg-zone zone-svip" x="35" y="44" width="65" height="50" rx="2" fill="#CCFF00" fill-opacity="0.04" stroke="rgba(204,255,0,0.4)" stroke-width="0.8"/>
        <rect id="svg-zone-svip-2" class="svg-zone zone-svip" x="180" y="44" width="65" height="50" rx="2" fill="#CCFF00" fill-opacity="0.04" stroke="rgba(204,255,0,0.4)" stroke-width="0.8"/>
        <text x="67" y="72" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.4)" pointer-events="none">SVIP WING A</text>
        <text x="212" y="72" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.4)" pointer-events="none">SVIP WING B</text>

        <rect id="svg-zone-vip" class="svg-zone zone-vip" x="35" y="104" width="65" height="74" rx="2" fill="#FFB74D" fill-opacity="0.03" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <rect id="svg-zone-vip-2" class="svg-zone zone-vip" x="180" y="104" width="65" height="74" rx="2" fill="#FFB74D" fill-opacity="0.03" stroke="rgba(255,183,77,0.35)" stroke-width="0.8"/>
        <text x="67" y="144" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.4)" pointer-events="none">VIP FLANK L</text>
        <text x="212" y="144" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.4)" pointer-events="none">VIP FLANK R</text>

        <rect id="svg-zone-ga" class="svg-zone zone-ga" x="108" y="44" width="64" height="134" rx="1" fill="url(#modal-dots)" fill-opacity="0.6" stroke="rgba(255,255,255,0.18)" stroke-width="0.8"/>
        <text x="140" y="114" text-anchor="middle" font-size="5.5" font-weight="500" fill="rgba(255,255,255,0.4)" pointer-events="none" writing-mode="vertical-rl">GA INDUSTRIAL CONCOURSE</text>
      `;
    }

    container.innerHTML = `
      <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="modal-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.6" fill="rgba(255,255,255,0.2)"/>
          </pattern>
        </defs>
        <rect x="10" y="8" width="260" height="184" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        ${internalMapHTML}
      </svg>
    `;

    const attachZoneEvents = (idSelector, tierKey) => {
      const el = document.getElementById(idSelector);
      if (!el) return;
      el.addEventListener('mouseenter', () => this.highlightZone(tierKey.toLowerCase()));
      el.addEventListener('mouseleave', () => this.syncZoneHighlightToSelection());
      el.addEventListener('click', () => this.transitionToSeatGrid(tierKey));
    };

    attachZoneEvents('svg-zone-svip', 'SVIP');
    attachZoneEvents('svg-zone-svip-2', 'SVIP');
    attachZoneEvents('svg-zone-vip', 'VIP');
    attachZoneEvents('svg-zone-vip-2', 'VIP');
    attachZoneEvents('svg-zone-ga', 'GA');

    this.syncZoneHighlightToSelection();
  },

  renderSeatGridMatrix(container) {
    const tier = this.selectedTier;
    const seats = this.seatsDatabase[tier];
    const layoutType = this.getVenueLayoutType(this.activeShow.venue);
    
    let colorTheme = '#CCFF00';
    if (tier === 'VIP') colorTheme = '#FFB74D';
    if (tier === 'GA') colorTheme = '#FFFFFF';

    const rowsMap = {};
    seats.forEach(s => {
      if (!rowsMap[s.row]) rowsMap[s.row] = [];
      rowsMap[s.row].push(s);
    });

    const sortedRows = Object.keys(rowsMap).sort();
    let svgContent = '';

    const isSeatSelected = (id) => this.selectedSeats.some(s => s.id === id);
    const seatCircle = (x, y, seat) => {
      let seatClass = 'svg-seat';
      if (seat.occupied) seatClass += ' seat-occupied';
      if (isSeatSelected(seat.id)) seatClass += ' seat-selected';
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5"
        class="${seatClass}" id="circle-${seat.id}"
        fill="${seat.occupied ? '#222224' : colorTheme}"
        fill-opacity="${isSeatSelected(seat.id) ? '1' : '0.3'}"
        stroke="${colorTheme}" stroke-width="0.6" data-id="${seat.id}"
      />`;
    };

    if (layoutType === 'arena' || layoutType === 'stadium') {
      const isStadium = layoutType === 'stadium';
      const center = 140;
      const stageR = isStadium ? 18 : 22;
      
      const innerR = stageR + 10;
      const outerR = 84;

      svgContent += `
        <circle cx="${center}" cy="100" r="${stageR}" fill="#111" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
        <text x="${center}" y="102" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.35)">${isStadium ? '360° PIT' : 'CENTER STAGE'}</text>
      `;

      sortedRows.forEach((rowKey, rowIndex) => {
        const t = sortedRows.length > 1 ? rowIndex / (sortedRows.length - 1) : 0;
        const radius = innerR + t * (outerR - innerR);
        const rowSeats = rowsMap[rowKey];
        
        svgContent += `<circle cx="${center}" cy="100" r="${radius}" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5"/>`;

        rowSeats.forEach((seat, seatIndex) => {
          const angle = (seatIndex / rowSeats.length) * Math.PI * 2 - Math.PI / 2;
          
          const x = center + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;
          
          svgContent += seatCircle(x, y, seat);
        });
      });

    } else if (layoutType === 'amphitheater' || layoutType === 'theater') {
      const innerR = layoutType === 'theater' ? 40 : 42;
      const outerR = layoutType === 'theater' ? 118 : 128;
      const verticalStart = layoutType === 'theater' ? 34 : 18;
      const minAngle = Math.PI * 0.20;
      const maxAngle = Math.PI * 0.80;

      svgContent += `
        <path d="M 100 12 L 180 12 L 165 22 L 115 22 Z" fill="#16161A" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
        <text x="140" y="19" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.3)">STAGE FRONT</text>
      `;

      sortedRows.forEach((rowKey, rowIndex) => {
        const t = sortedRows.length > 1 ? rowIndex / (sortedRows.length - 1) : 0;
        const radius = innerR + t * (outerR - innerR);
        const rowSeats = rowsMap[rowKey];

        rowSeats.forEach((seat, seatIndex) => {
          const angle = rowSeats.length > 1
            ? minAngle + (seatIndex / (rowSeats.length - 1)) * (maxAngle - minAngle)
            : (minAngle + maxAngle) / 2;
          const x = 140 + Math.cos(angle) * radius;
          const y = verticalStart + Math.sin(angle) * radius * 0.62;
          svgContent += seatCircle(x, y, seat);
        });
      });

    } else if (layoutType === 'field') {
      const bandBoxes = {
        'SVIP': { top: 42, bottom: 68,  padX: 60 },
        'VIP':  { top: 80, bottom: 118, padX: 40 },
        'GA':   { top: 130, bottom: 182, padX: 22 }
      };
      const box = bandBoxes[tier];

      svgContent += `
        <polygon points="90,14 190,14 210,32 70,32" fill="#1C1C1F" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
        <text x="140" y="24" text-anchor="middle" font-size="5" fill="rgba(255,255,255,0.35)">FESTIVAL STAGE</text>
      `;

      sortedRows.forEach((rowKey, rowIndex) => {
        const rowSeats = rowsMap[rowKey];
        const y = sortedRows.length > 1
          ? box.top + (rowIndex / (sortedRows.length - 1)) * (box.bottom - box.top)
          : (box.top + box.bottom) / 2;
        const usableWidth = 280 - box.padX * 2;

        rowSeats.forEach((seat, seatIndex) => {
          const x = rowSeats.length > 1
            ? box.padX + (seatIndex / (rowSeats.length - 1)) * usableWidth
            : 140;
          svgContent += seatCircle(x, y, seat);
        });
      });

    } else if (layoutType === 'vault') {
      if (tier === 'SVIP') {
        const box = { top: 40, bottom: 64, padX: 45 };
        sortedRows.forEach((rowKey, rowIndex) => {
          const rowSeats = rowsMap[rowKey];
          const y = sortedRows.length > 1
            ? box.top + (rowIndex / (sortedRows.length - 1)) * (box.bottom - box.top)
            : (box.top + box.bottom) / 2;
          const usableWidth = 280 - box.padX * 2;
          rowSeats.forEach((seat, seatIndex) => {
            const x = rowSeats.length > 1
              ? box.padX + (seatIndex / (rowSeats.length - 1)) * usableWidth
              : 140;
            svgContent += seatCircle(x, y, seat);
          });
        });
      } else {
        const box = tier === 'VIP'
          ? { x: 30, y: 78, w: 105, h: 100 }
          : { x: 145, y: 78, w: 105, h: 100 };
        const pad = 14;
        sortedRows.forEach((rowKey, rowIndex) => {
          const rowSeats = rowsMap[rowKey];
          const yy = sortedRows.length > 1
            ? box.y + pad + (rowIndex / (sortedRows.length - 1)) * (box.h - pad * 2)
            : box.y + box.h / 2;
          rowSeats.forEach((seat, seatIndex) => {
            const xx = rowSeats.length > 1
              ? box.x + pad + (seatIndex / (rowSeats.length - 1)) * (box.w - pad * 2)
              : box.x + box.w / 2;
            svgContent += seatCircle(xx, yy, seat);
          });
        });
      }
      svgContent += `
        <rect x="105" y="12" width="70" height="16" fill="#111" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
        <text x="140" y="22" text-anchor="middle" font-size="5" fill="var(--accent-color)">SOUND BOOTH</text>
      `;

    } else {
      svgContent += `
        <rect x="85" y="14" width="110" height="18" fill="#18181A" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
        <text x="140" y="25" text-anchor="middle" font-size="5.5" fill="rgba(255,255,255,0.35)">ENDSTAGE PLATFORM</text>
      `;

      if (tier === 'GA') {
        const box = { x: 108, y: 44, w: 64, h: 134 };
        const pad = 8;
        sortedRows.forEach((rowKey, rowIndex) => {
          const rowSeats = rowsMap[rowKey];
          const yy = sortedRows.length > 1
            ? box.y + pad + (rowIndex / (sortedRows.length - 1)) * (box.h - pad * 2)
            : box.y + box.h / 2;
          rowSeats.forEach((seat, seatIndex) => {
            const xx = rowSeats.length > 1
              ? box.x + pad + (seatIndex / (rowSeats.length - 1)) * (box.w - pad * 2)
              : box.x + box.w / 2;
            svgContent += seatCircle(xx, yy, seat);
          });
        });
      } else {
        const wingBox = tier === 'SVIP'
          ? { left: { x: 35, y: 44, w: 65, h: 50 }, right: { x: 180, y: 44, w: 65, h: 50 } }
          : { left: { x: 35, y: 104, w: 65, h: 74 }, right: { x: 180, y: 104, w: 65, h: 74 } };
        const pad = 8;

        sortedRows.forEach((rowKey, rowIndex) => {
          const rowSeats = rowsMap[rowKey];
          const half = Math.ceil(rowSeats.length / 2);
          const leftSeats = rowSeats.slice(0, half);
          const rightSeats = rowSeats.slice(half);

          [ [leftSeats, wingBox.left], [rightSeats, wingBox.right] ].forEach(([seatGroup, box]) => {
            const yy = sortedRows.length > 1
              ? box.y + pad + (rowIndex / (sortedRows.length - 1)) * (box.h - pad * 2)
              : box.y + box.h / 2;
            seatGroup.forEach((seat, seatIndex) => {
              const xx = seatGroup.length > 1
                ? box.x + pad + (seatIndex / (seatGroup.length - 1)) * (box.w - pad * 2)
                : box.x + box.w / 2;
              svgContent += seatCircle(xx, yy, seat);
            });
          });
        });
      }
    }

    container.innerHTML = `
      <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" id="modalSeatGridSVG">
        <rect x="10" y="8" width="260" height="184" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        ${svgContent}
      </svg>
    `;

    container.querySelectorAll('.svg-seat:not(.seat-occupied)').forEach(circle => {
      circle.addEventListener('click', () => {
        this.toggleSeatSelection(circle.getAttribute('data-id'));
      });
    });
  },

  transitionToSeatGrid(tier) {
    this.selectedTier = tier;
    this.viewMode = 'seats';
    SoundEngine.playOpen();
    this.renderSVGDiagram(this.activeShow);
    this.renderTiers(this.activeShow);
    this.updateActionStateUI();
    VibeCore.refreshCursorTracking();
  },

  toggleSeatSelection(seatId) {
    const tier = this.selectedTier;
    const seatObj = this.seatsDatabase[tier].find(s => s.id === seatId);
    if (!seatObj || seatObj.occupied) return;

    const index = this.selectedSeats.findIndex(s => s.id === seatId);
    
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      SoundEngine.playClick();
    } else {
      if (this.selectedSeats.length >= 4) {
        FooterStatusRotator.triggerSystemAlert("TRANSACTION LIMIT REACHED // Max 4 Seats Per Curation");
        return;
      }
      const seatPrice = this.getTierSeatPrice(tier);
      this.selectedSeats.push({
        id: seatId,
        row: seatObj.row,
        num: seatObj.num,
        tier: tier,
        price: seatPrice
      });
      SoundEngine.playClick();
    }

    this.renderSVGDiagram(this.activeShow);
    this.renderTiers(this.activeShow);
    this.updateActionStateUI();
  },

  getTierSeatPrice(tier) {
    const show = this.activeShow;
    const base = show.priceNum;
    let currencySign = '₱';
    if (show.tags.includes('tokyo')) currencySign = '¥';
    else if (show.tags.includes('seoul')) currencySign = '₩';
    else if (show.tags.includes('london')) currencySign = '£';
    else if (show.tags.includes('new-york')) currencySign = '$';
    else if (show.tags.includes('berlin') || show.tags.includes('ibiza') || show.tags.includes('amsterdam')) currencySign = '€';

    let upgrade = 0;
    if (tier === 'VIP') upgrade = currencySign === '¥' ? 4000 : (currencySign === '₩' ? 45000 : (['£','$','€'].includes(currencySign) ? 40 : 2000));
    if (tier === 'SVIP') upgrade = currencySign === '¥' ? 9000 : (currencySign === '₩' ? 95000 : (['£','$','€'].includes(currencySign) ? 90 : 4500));
    return base + upgrade;
  },

  renderTiers(show) {
    const listContainer = document.getElementById('modalTiersList');
    
    let currencySign = '₱';
    if (show.tags.includes('tokyo')) currencySign = '¥';
    else if (show.tags.includes('seoul')) currencySign = '₩';
    else if (show.tags.includes('london')) currencySign = '£';
    else if (show.tags.includes('new-york')) currencySign = '$';
    else if (show.tags.includes('berlin') || show.tags.includes('ibiza') || show.tags.includes('amsterdam')) currencySign = '€';
    
    const gaP   = show.priceNum;
    const vipP  = this.getTierSeatPrice('VIP');
    const svipP = this.getTierSeatPrice('SVIP');

    if (this.viewMode === 'seats') {
      let totalCost = this.selectedSeats.reduce((acc, s) => acc + s.price, 0);
      let seatsSummary = this.selectedSeats.map(s => `${s.row}-${s.num}`).join(', ') || 'NONE SELECTED';

      listContainer.innerHTML = `
        <div style="padding: 1.5rem; border: 1px dashed rgba(255,255,255,0.1); background: rgba(255,255,255,0.01); display:flex; flex-direction:column; gap:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted)">Selected Node Matrix:</span>
            <button class="btn-ticket" style="font-size:0.7rem; padding:0.3rem 0.8rem;" onclick="TerminalModal.resetToZoneView()">← Return To Overview</button>
          </div>
          <div style="font-family:var(--font-header); font-size:1.4rem; color:var(--accent-color); font-weight:800;">${this.selectedTier} TIER MAP</div>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top:0.8rem; display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.85rem;">
            <div>Seat Positions:</div>
            <div style="text-align:right; font-family:monospace; color:#fff;">${seatsSummary}</div>
            <div>Pass Tickets Qty:</div>
            <div style="text-align:right; font-family:monospace; color:#fff;">${this.selectedSeats.length} / 4 Max</div>
          </div>
          
          <div style="border-top: 1px dashed rgba(255,255,255,0.15); padding-top:0.8rem; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:bold; font-size:1rem; letter-spacing:1px;">TOTAL DUE:</span>
            <span style="font-family:var(--font-header); font-size:1.6rem; color:#fff; font-weight:800;">${currencySign}${totalCost.toLocaleString()}</span>
          </div>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <div class="terminal-tier-card tier-svip" id="card-tier-SVIP" onclick="TerminalModal.transitionToSeatGrid('SVIP')">
        <div class="tier-info-left">
          <div class="tier-headline">
            <span class="tier-key-badge">3</span>
            <span class="tier-title">SVIP Royalty Lounge</span>
          </div>
          <div class="tier-demand-ticker" id="ticker-SVIP">SEATS REMAINING: <span id="count-SVIP">${this.seatsInventory['SVIP']}</span></div>
        </div>
        <div class="tier-info-right">
          <div class="tier-rate">${currencySign}${svipP.toLocaleString()}</div>
          <div class="tier-status-text">Front Row Blocks</div>
        </div>
      </div>

      <div class="terminal-tier-card tier-vip" id="card-tier-VIP" onclick="TerminalModal.transitionToSeatGrid('VIP')">
        <div class="tier-info-left">
          <div class="tier-headline">
            <span class="tier-key-badge">2</span>
            <span class="tier-title">VIP Access Array</span>
          </div>
          <div class="tier-demand-ticker" id="ticker-VIP">SEATS REMAINING: <span id="count-VIP">${this.seatsInventory['VIP']}</span></div>
        </div>
        <div class="tier-info-right">
          <div class="tier-rate">${currencySign}${vipP.toLocaleString()}</div>
          <div class="tier-status-text">Mid Tier Clear-line</div>
        </div>
      </div>

      <div class="terminal-tier-card tier-ga" id="card-tier-GA" onclick="TerminalModal.transitionToSeatGrid('GA')">
        <div class="tier-info-left">
          <div class="tier-headline">
            <span class="tier-key-badge">1</span>
            <span class="tier-title">General Admission</span>
          </div>
          <div class="tier-demand-ticker" id="ticker-GA">SEATS REMAINING: <span id="count-GA">${this.seatsInventory['GA']}</span></div>
        </div>
        <div class="tier-info-right">
          <div class="tier-rate">${currencySign}${gaP.toLocaleString()}</div>
          <div class="tier-status-text">Main Arena Floor</div>
        </div>
      </div>
    `;

    ['SVIP', 'VIP', 'GA'].forEach(tier => {
      const cardEl = document.getElementById(`card-tier-${tier}`);
      if (cardEl) {
        cardEl.addEventListener('mouseenter', () => this.highlightZone(tier.toLowerCase()));
        cardEl.addEventListener('mouseleave', () => this.syncZoneHighlightToSelection());
      }
    });

    this.updateActiveTierUIClass();
  },

  resetToZoneView() {
    this.viewMode = 'zone';
    this.selectedSeats = [];
    this.renderSVGDiagram(this.activeShow);
    this.renderTiers(this.activeShow);
    this.updateActionStateUI();
    VibeCore.refreshCursorTracking();
  },

  updateActionStateUI() {
    const actionBtn = document.getElementById('modalActionBtn');
    const uxHint = document.getElementById('modalUXHint');

    if(this.viewMode === 'seats') {
      actionBtn.textContent = this.selectedSeats.length > 0 ? `PROCEED WITH ${this.selectedSeats.length} SEAT(S) →` : 'SELECT SEAT COORDINATES';
      actionBtn.disabled = this.selectedSeats.length === 0;
      actionBtn.style.opacity = this.selectedSeats.length === 0 ? '0.4' : '1';
      uxHint.textContent = '[ ESC ] RETURN · [ CLICK SEAT ] ASSIGN SELECTION';
    } else {
      actionBtn.textContent = 'SELECT SEATING POSITION →';
      actionBtn.disabled = false;
      actionBtn.style.opacity = '1';
      uxHint.textContent = '[ ESC ] CLOSE · [ 1-3 ] CHOOSE TIER · [ ENTER ] VIEW SEATS';
    }
  },

  selectTier(tier) {
    if(this.viewMode === 'seats') return;
    this.selectedTier = tier;
    SoundEngine.playClick();
    this.updateActiveTierUIClass();
    this.syncZoneHighlightToSelection();
  },

  highlightZone(tierClassLower) {
    if (this.viewMode === 'seats') return;
    document.querySelectorAll('.svg-zone').forEach(z => z.classList.remove('zone-active'));
    const activeTarget = document.getElementById(`svg-zone-${tierClassLower}`);
    if(activeTarget) activeTarget.classList.add('zone-active');
  },

  syncZoneHighlightToSelection() {
    this.highlightZone(this.selectedTier.toLowerCase());
  },

  updateActiveTierUIClass() {
    if (this.viewMode === 'seats') return;
    document.querySelectorAll('.terminal-tier-card').forEach(c => c.classList.remove('selected'));
    const activeCard = document.getElementById(`card-tier-${this.selectedTier}`);
    if(activeCard) activeCard.classList.add('selected');
  },

  startDemandSimulation() {
    clearInterval(this.demandInterval);
    this.demandInterval = setInterval(() => {
      const tiers = ['SVIP', 'VIP', 'GA'];
      const pickedTier = tiers[Math.floor(Math.random() * tiers.length)];
      const tierSeats = this.seatsDatabase[pickedTier];
      
      if(!tierSeats) return;
      const availableSeats = tierSeats.filter(s => !s.occupied);
      
      if(availableSeats.length > 5) {
        const chosenSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
        chosenSeat.occupied = true;
        this.seatsInventory[pickedTier]--;
        
        if (this.viewMode === 'zone') {
          const counterEl = document.getElementById(`count-${pickedTier}`);
          if (counterEl) counterEl.textContent = this.seatsInventory[pickedTier];
        } else if (this.viewMode === 'seats' && this.selectedTier === pickedTier) {
          this.renderSVGDiagram(this.activeShow);
        }
      }
    }, 5000 + Math.random() * 3000);
  },

  proceedToCheckout() {
    if (this.viewMode === 'zone') {
      this.transitionToSeatGrid(this.selectedTier);
      return;
    }
    if (this.selectedSeats.length === 0) return;
    
    VibeCore.startCheckoutWithSeats(this.activeShow.id, this.selectedTier, this.selectedSeats);
    this.close();
  },

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      if (this.backdrop && this.backdrop.style.display === 'flex') {
        if (e.key === 'Escape') {
          if(this.viewMode === 'seats') {
            this.resetToZoneView();
          } else {
            this.close();
          }
        }
        if (this.viewMode === 'zone') {
          if (e.key === '1') this.selectTier('GA');
          if (e.key === '2') this.selectTier('VIP');
          if (e.key === '3') this.selectTier('SVIP');
          if (e.key === 'Enter') {
            e.preventDefault();
            this.proceedToCheckout();
          }
        }
      }
    });
  }
};

// =============================================
// VIBE CORE
// =============================================
const VibeCore = {
  isUserLoggedIn: false, 
  _pendingPurchase: null, 
  purchasedTickets: [],

  data: [
    {
      id: "show-1",
      title: "NEON AURA TOUR",
      venue: "Araneta Coliseum Stadium — Oct 24, 2026",
      date: "2026-10-24",
      priceNum: 3500, price: "₱3,500+",
      status: "Selling Fast",
      tags: ["manila"],
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
      layoutClass: "card-large"
    },
    {
      id: "show-2",
      title: "ECHOES IN THE DARK",
      venue: "Samsung Theater Hall — Nov 02, 2026",
      date: "2026-11-02",
      priceNum: 1800, price: "₱1,800+",
      status: "Low Inventory",
      tags: ["manila"],
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
      layoutClass: "card-small"
    },
    {
      id: "show-3",
      title: "TOKYO CYBERNET LIVE",
      venue: "Shibuya Womb Field Track — Nov 18, 2026",
      date: "2026-11-18",
      priceNum: 6500, price: "¥6,500+",
      status: "Selling Fast",
      tags: ["tokyo"],
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      layoutClass: "card-large"
    },
    {
      id: "show-4",
      title: "SEOUL K-WAVE CIRCUIT",
      venue: "Olympic Gymnastics Arena — Dec 05, 2026",
      date: "2026-12-05",
      priceNum: 88000, price: "₩88,000+",
      status: "Selling Fast",
      tags: ["seoul"],
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      layoutClass: "card-small"
    },
    {
      id: "show-5",
      title: "LONDON BRUTALIST WAVE",
      venue: "Millennium Dome Stadium — Nov 29, 2026",
      date: "2026-11-29",
      priceNum: 45, price: "£45+",
      status: "Low Inventory",
      tags: ["london"],
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200",
      layoutClass: "card-full"
    },
    {
      id: "show-6",
      title: "NYC SONIC UNDERGROUND",
      venue: "Brooklyn Warehouse — Dec 12, 2026",
      date: "2026-12-12",
      priceNum: 55, price: "$55+",
      status: "Selling Fast",
      tags: ["new-york"],
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200",
      layoutClass: "card-large"
    },
    {
      id: "show-7",
      title: "BERLIN DEEP INDUSTRIAL",
      venue: "Tresor Vault Tunnel — Dec 21, 2026",
      date: "2026-12-21",
      priceNum: 35, price: "€35+",
      status: null,
      tags: ["berlin"],
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
      layoutClass: "card-small"
    },
    {
      id: "show-8",
      title: "IBIZA CLOSING RESIDENCY",
      venue: "Hï Beach Amphitheater — Oct 18, 2026",
      date: "2026-10-18",
      priceNum: 75, price: "€75+",
      status: "Low Inventory",
      tags: ["ibiza"],
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
      layoutClass: "card-small"
    },
    {
      id: "show-9",
      title: "AMSTERDAM DECI-BELS",
      venue: "Ziggo Dome Arena — Nov 10, 2026",
      date: "2026-11-10",
      priceNum: 60, price: "€60+",
      status: null,
      tags: ["amsterdam"],
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200",
      layoutClass: "card-full"
    }
  ],

  activeCheckout: { show: null, tier: "GA", qty: 1, basePrice: 0, seatLabels: "" },

  get cursor()       { return document.getElementById('custom-cursor'); },
  get gridContainer(){ return document.getElementById('concertGridContainer'); },
  get body()         { return document.body; },
  get dynamicArea()  { return document.getElementById('drawerDynamicContent'); },
  get titleArea()    { return document.getElementById('authTitle'); },
  get sliderIndicator() { return document.getElementById('sliderIndicator'); },

  init() {
    this.restoreDefaultAuthUI();
    this.renderGrid('all');
    this.bindGlobalEvents();
    FooterStatusRotator.init();
    TerminalModal.init();
    ArtistModal.init();
    
    setTimeout(() => this.syncIndicatorPosition(), 100);

    const scheduleGlitch = () => {
      const delay = 8000 + Math.random() * 4000;
      setTimeout(() => { this.triggerLogoGlitch(); scheduleGlitch(); }, delay);
    };
    setTimeout(scheduleGlitch, 5000);

    this.startCountdownTick();
  },

  triggerLogoGlitch() {
    const logo = document.getElementById('siteLogo');
    if (!logo) return;
    logo.classList.add('glitching');
    setTimeout(() => logo.classList.remove('glitching'), 200);
  },

  startCountdownTick() {
    const updateAll = () => {
      document.querySelectorAll('.card-countdown[data-date]').forEach(el => {
        el.textContent = getCountdown(el.dataset.date);
      });
    };
    updateAll();
    setInterval(updateAll, 60000);
  },

  openMap(showId) {
    const selectedShow = this.data.find(s => s.id === showId);
    if(selectedShow) {
      TerminalModal.open(selectedShow);
    }
  },

  startCheckoutWithSeats(showId, tier, selectedSeats) {
    if (!this.isUserLoggedIn) {
      this.restoreDefaultAuthUI();
      this.body.classList.add('auth-open');
      SoundEngine.playOpen();
      this._pendingPurchase = { type: 'seats', showId, tier, selectedSeats: [...selectedSeats] };
      return;
    }

    const show = this.data.find(s => s.id === showId);
    const totalCost = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const labelsStr = selectedSeats.map(s => `${s.row}-${s.num}`).join(', ');

    this.activeCheckout = { 
      show, 
      tier, 
      qty: selectedSeats.length, 
      basePrice: totalCost / selectedSeats.length,
      seatLabels: labelsStr 
    };

    this.titleArea.innerText = "Checkout";
    this.body.classList.remove('view-register');
    this.body.classList.add('auth-open');
    SoundEngine.playOpen();
    this.renderCheckoutStep1();
  },

  startCheckoutPipeline(showId) {
    if (!this.isUserLoggedIn) {
      this.restoreDefaultAuthUI();
      this.body.classList.add('auth-open');
      SoundEngine.playOpen();
      this._pendingPurchase = { type: 'pipeline', showId };
      return;
    }

    const targetShow = this.data.find(s => s.id === showId);
    this.activeCheckout.show = targetShow;
    this.activeCheckout.basePrice = targetShow.priceNum;
    this.activeCheckout.qty = 1;
    this.activeCheckout.tier = "GA";
    this.activeCheckout.seatLabels = "Auto Allocated";
    this.titleArea.innerText = "Checkout";
    this.body.classList.remove('view-register');
    this.body.classList.add('auth-open');
    SoundEngine.playOpen();
    this.renderCheckoutStep1();
  },

  handleMockLogin() {
    this.isUserLoggedIn = true;
    document.getElementById('openAuth').innerText = "Sign Out";
    FooterStatusRotator.triggerSystemAlert("OPERATIONAL ACCOUNT VERIFIED // Welcome Back");

    if (this._pendingPurchase) {
      const p = this._pendingPurchase;
      this._pendingPurchase = null; 
      
      if (p.type === 'seats') {
        this.startCheckoutWithSeats(p.showId, p.tier, p.selectedSeats);
      } else if (p.type === 'pipeline') {
        this.startCheckoutPipeline(p.showId);
      }
    } else {
      this.body.classList.remove('auth-open');
      SoundEngine.playSuccess();
    }
  },

  handleSignOut() {
    this.isUserLoggedIn = false;
    document.getElementById('openAuth').innerText = "Sign In";
    this._pendingPurchase = null;
    FooterStatusRotator.triggerSystemAlert("ACCESS SESSION TERMINATED // Secure Logged Out");
    SoundEngine.playClick();
  },

  renderGrid(filterValue = 'all') {
    this.gridContainer.classList.remove('concert-grid-scrolled');

    const filteredShows = this.data.filter(show =>
      filterValue === 'all' ? true : show.tags.includes(filterValue)
    );

    let htmlMarkup = '';
    filteredShows.forEach((show, index) => {
      let currentClass = show.layoutClass;
      if (filteredShows.length <= 2) currentClass = index === 0 ? 'card-large' : 'card-small';

      const statusBadge = show.status
        ? `<div class="ticket-status" ${show.status === 'Low Inventory' ? 'style="background:#fff;"' : ''}>${show.status}</div>`
        : '';
      const inlineWrapperStyle = currentClass === 'card-small' ? 'style="height:300px;"' : '';
      const fullTitleStyle    = currentClass === 'card-full'  ? 'style="font-size:2.8rem;"' : '';
      const staggerDelay = `${index * 0.08}s`;
      const countdown = getCountdown(show.date);

      htmlMarkup += `
        <div class="concert-card ${currentClass}" data-id="${show.id}" style="--stagger-delay:${staggerDelay};">
          <div class="card-front">
            <div class="image-wrapper" ${inlineWrapperStyle}>
              <img src="${show.image}" alt="${show.title}" class="art-placeholder">
              ${statusBadge}
            </div>
            <div class="card-details">
              <div>
                <h3 ${fullTitleStyle}>${show.title}</h3>
                <p class="venue-info">${show.venue}</p>
                <div class="card-countdown" data-date="${show.date}">${countdown}</div>
              </div>
              <div class="card-meta">
                <span class="price">${show.price}</span>
                <button class="btn-ticket" onclick="VibeCore.openMap('${show.id}')">Get Passes</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    this.gridContainer.innerHTML = htmlMarkup;
    this.refreshCursorTracking();
    this.updateFloatingFilterText(filterValue);

    setTimeout(() => {
      this.gridContainer.classList.add('concert-grid-scrolled');
    }, 600 + filteredShows.length * 80);
  },

  updateFloatingFilterText(currentFilter) {
    const t1 = document.getElementById('floatTag1');
    const t2 = document.getElementById('floatTag2');
    const t3 = document.getElementById('floatTag3');

    if (currentFilter === 'all') {
      swapFloatText(t1, "ALL SHOWS", true);
      swapFloatText(t2, "GLOBAL REALMS", false);
      swapFloatText(t3, "LIVE CIRCUITS", false);
    } else {
      swapFloatText(t1, currentFilter.replace('-', ' ').toUpperCase(), true);
      swapFloatText(t2, "CURATED REALM", false);
      swapFloatText(t3, "PASSPORT ACTIVE", false);
    }
  },

  syncIndicatorPosition() {
    const activeChip = document.querySelector('.edge-filter-chip.active');
    const indicator  = this.sliderIndicator;
    if (!activeChip || !indicator) return;
    const containerTop = document.getElementById('filterBarContainer').getBoundingClientRect().top;
    const chipRect = activeChip.getBoundingClientRect();
    indicator.style.top    = `${chipRect.top - containerTop}px`;
    indicator.style.height = `${chipRect.height}px`;
  },

  renderCheckoutStep1() {
    const show = this.activeCheckout.show;
    const finalTotal = this.activeCheckout.basePrice * this.activeCheckout.qty;
    
    let currencySign = '₱';
    if (show.tags.includes('tokyo')) currencySign = '¥';
    else if (show.tags.includes('seoul')) currencySign = '₩';
    else if (show.tags.includes('london')) currencySign = '£';
    else if (show.tags.includes('new-york')) currencySign = '$';
    else if (show.tags.includes('berlin') || show.tags.includes('ibiza') || show.tags.includes('amsterdam')) currencySign = '€';

    this.dynamicArea.innerHTML = `
      <div class="pipeline-steps-indicator">
        <span class="pipeline-step active">01. Seating Summary</span>
        <span class="pipeline-step">➔ 02. Secure Payment</span>
      </div>
      <div class="checkout-summary-box">
        <h4>${show.title}</h4>
        <p>${show.venue}</p>
        <div class="checkout-row"><span>Pass Tier:</span><strong>${this.activeCheckout.tier}</strong></div>
        <div class="checkout-row"><span>Seat Assign:</span><strong style="color:var(--accent-color); font-family:monospace;">${this.activeCheckout.seatLabels}</strong></div>
        <div class="checkout-row"><span>Quantity:</span><strong>${this.activeCheckout.qty}x</strong></div>
        <div class="checkout-row total"><span>Total Amount:</span><span>${currencySign}${finalTotal.toLocaleString()}</span></div>
      </div>
      <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1.5rem; text-transform:uppercase; line-height:1.4;">
        Verify your layout assignment matrices before moving forward into the encrypted banking processing stream core.
      </p>
      <button class="btn-submit" onclick="VibeCore.renderCheckoutStep2()">Proceed to Payment Gateway</button>
    `;
    this.refreshCursorTracking();
  },

  renderCheckoutStep2() {
    const show = this.activeCheckout.show;
    const finalTotal = this.activeCheckout.basePrice * this.activeCheckout.qty;
    
    let currencySign = '₱';
    if (show.tags.includes('tokyo')) currencySign = '¥';
    else if (show.tags.includes('seoul')) currencySign = '₩';
    else if (show.tags.includes('london')) currencySign = '£';
    else if (show.tags.includes('new-york')) currencySign = '$';
    else if (show.tags.includes('berlin') || show.tags.includes('ibiza') || show.tags.includes('amsterdam')) currencySign = '€';

    this.dynamicArea.innerHTML = `
      <div class="pipeline-steps-indicator">
        <span class="pipeline-step">01. Seating Summary</span>
        <span class="pipeline-step active">➔ 02. Secure Payment</span>
      </div>
      <div class="checkout-summary-box" style="border-color:var(--accent-color);">
        <div class="checkout-row"><span>Pass Curation:</span><span>${this.activeCheckout.tier} Tier (${this.activeCheckout.qty}x)</span></div>
        <div class="checkout-row"><span>Coordinates:</span><span style="font-family:monospace;">${this.activeCheckout.seatLabels}</span></div>
        <div class="checkout-row total"><span>Due Now:</span><span style="color:var(--accent-color);">${currencySign}${finalTotal.toLocaleString()}</span></div>
      </div>
      <form onsubmit="event.preventDefault(); VibeCore.executeMockVerification();">
        <div class="form-group">
          <input type="text" id="payCard" placeholder=" " required pattern="[0-9]{16,19}">
          <label for="payCard">Card Number (16-digits)</label>
        </div>
        <div class="form-group" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
          <div style="position:relative;">
            <input type="text" id="payExp" placeholder=" " required>
            <label for="payExp">MM/YY</label>
          </div>
          <div style="position:relative;">
            <input type="password" id="payCvv" placeholder=" " required pattern="[0-9]{3}">
            <label for="payCvv">CVV</label>
          </div>
        </div>
        <button type="submit" class="btn-submit" id="paySubmitBtn">Authorize Transaction</button>
        <button type="button" class="btn-submit" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.2);margin-top:0.5rem;" onclick="VibeCore.renderCheckoutStep1()">Return to Summary</button>
      </form>
    `;
    this.refreshCursorTracking();
  },

  executeMockVerification() {
    const btn = document.getElementById('paySubmitBtn');
    btn.innerText = "VERIFYING FUNDS...";
    btn.disabled = true; btn.style.opacity = "0.5";

    setTimeout(() => {
      const show = this.activeCheckout.show;
      const tokenReceipt = "VIBE-" + Math.floor(100000 + Math.random() * 900000);
      
      let currencySign = '₱';
      if (show.tags.includes('tokyo')) currencySign = '¥';
      else if (show.tags.includes('seoul')) currencySign = '₩';
      else if (show.tags.includes('london')) currencySign = '£';
      else if (show.tags.includes('new-york')) currencySign = '$';
      else if (show.tags.includes('berlin') || show.tags.includes('ibiza') || show.tags.includes('amsterdam')) currencySign = '€';

      const finalTotal = this.activeCheckout.basePrice * this.activeCheckout.qty;

      this.purchasedTickets.unshift({
        tokenId: tokenReceipt,
        showTitle: show.title,
        venue: show.venue,
        showDate: show.date,
        tier: this.activeCheckout.tier,
        qty: this.activeCheckout.qty,
        total: finalTotal,
        currencySign: currencySign,
        seatLabels: this.activeCheckout.seatLabels,
        purchasedAt: Date.now()
      });
      this.updateTicketCountBadge();

      SoundEngine.playSuccess();
      this.titleArea.innerText = "PASSPORT GRANTED";
      this.dynamicArea.innerHTML = `
        <div style="text-align:center;padding:1rem 0;">
          <div style="font-size:3.5rem;margin-bottom:1rem;color:var(--accent-color);">✓</div>
          <h3 style="font-family:var(--font-header);font-size:1.5rem;text-transform:uppercase;margin-bottom:1rem;">Transaction Authenticated</h3>
          <div style="background:#1c1c1c;border:1px solid var(--accent-color);padding:1.5rem;text-align:left;font-family:monospace;font-size:0.85rem;margin-bottom:2rem;">
            <div style="color:var(--accent-color);font-weight:bold;margin-bottom:0.5rem;">OFFICIAL DIGITAL ACCESS RECEIPT</div>
            <div>SHOW: ${show.title}</div>
            <div>TIER: ${this.activeCheckout.tier}</div>
            <div>SEATS: ${this.activeCheckout.seatLabels}</div>
            <div>QTY: ${this.activeCheckout.qty} Passes</div>
            <div style="margin-top:0.5rem;border-top:1px solid rgba(255,255,255,0.1);padding-top:0.5rem;">TOKEN ID: ${tokenReceipt}</div>
          </div>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:2rem;">A copy of your digital access key has been routed to your authorized operational profile.</p>
          <button class="btn-submit" onclick="VibeCore.restoreDefaultAuthUI()">Return to Terminal</button>
          <button class="btn-submit" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.2);margin-top:0.5rem;" onclick="VibeCore.body.classList.remove('auth-open'); VibeCore.openMyTickets();">View My Tickets</button>
        </div>
      `;
      this.refreshCursorTracking();
    }, 1500);
  },

  updateTicketCountBadge() {
    const badge = document.getElementById('ticketCountBadge');
    if (!badge) return;
    if (this.purchasedTickets.length > 0) {
      badge.textContent = this.purchasedTickets.length;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  },

  restoreDefaultAuthUI() {
    this.body.classList.remove('auth-open');
    setTimeout(() => {
      this.titleArea.innerText = "Sign In";
      this.body.classList.remove('view-register');
      this.dynamicArea.innerHTML = `
        <form id="authForm" onsubmit="event.preventDefault(); VibeCore.handleMockLogin();">
          <div class="form-group register-only">
            <input type="text" id="regName" placeholder=" ">
            <label for="regName">Full Name</label>
          </div>
          <div class="form-group">
            <input type="email" id="authEmail" placeholder=" " required>
            <label for="authEmail">Email Address</label>
          </div>
          <div class="form-group">
            <input type="password" id="authPassword" placeholder=" " required>
            <label for="authPassword">Password</label>
          </div>
          <button type="submit" class="btn-submit" id="submitBtn">Access Passes</button>
        </form>
        <p class="auth-toggle-text" id="toggleAuthWrapper">
          <span class="login-hidden">New to the vibe? <span id="switchToRegister" style="text-decoration:underline;cursor:none;">Register</span></span>
          <span class="register-only">Already have an account? <span id="switchToLogin" style="text-decoration:underline;cursor:none;">Sign In</span></span>
        </p>
      `;
      this.bindDrawerToggleEvents();
      this.refreshCursorTracking();
    }, 400);
  },

  openMyTickets() {
    if (!this.isUserLoggedIn) {
      this.restoreDefaultAuthUI();
      this.body.classList.add('auth-open');
      SoundEngine.playOpen();
      return;
    }
    this.renderTicketsList();
    this.body.classList.add('tickets-open');
    SoundEngine.playOpen();
    this.refreshCursorTracking();
  },

  closeMyTickets() {
    this.body.classList.remove('tickets-open');
  },

  renderTicketsList() {
    const container = document.getElementById('ticketsListContainer');
    if (!container) return;

    if (this.purchasedTickets.length === 0) {
      container.innerHTML = `
        <div class="tickets-empty-state">
          <div class="glyph">◈</div>
          <p>No passes acquired yet. Browse the lineup and secure your spot.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.purchasedTickets.map(t => {
      const tierClass = t.tier === 'VIP' ? 'tier-vip' : (t.tier === 'GA' ? 'tier-ga' : 'tier-svip');
      const eventDate = new Date(t.showDate);
      const dateLabel = isNaN(eventDate.getTime()) ? t.showDate : eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `
        <div class="ticket-history-card ${tierClass}">
          <div class="thc-top">
            <div>
              <div class="thc-title">${t.showTitle}</div>
              <div class="thc-venue">${t.venue}</div>
            </div>
            <span class="thc-tier-badge">${t.tier}</span>
          </div>
          <div class="thc-meta-row">
            <span>DATE: <b>${dateLabel}</b></span>
            <span>SEATS: <b style="color:var(--accent-color); font-family:monospace; font-size:0.7rem;">${t.seatLabels || 'GA Floor'}</b></span>
          </div>
          <div class="thc-meta-row" style="margin-top:0.4rem;border-top:none;padding-top:0;">
            <span>TOKEN: <b>${t.tokenId}</b></span>
            <span>PAID: <b>${t.currencySign}${t.total.toLocaleString()}</b></span>
          </div>
        </div>
      `;
    }).join('');
  },

  refreshCursorTracking() {
    const els = document.querySelectorAll('.concert-card, .btn-ticket, .btn-nav-auth, .btn-nav-tickets, .btn-close, #toggleAuthWrapper span, .btn-submit, .lineup-card, .edge-filter-chip, .btn-fast-pass, .terminal-tier-card, .btn-proceed, .terminal-close-btn, select, input, option, .svg-zone, .ticket-history-card, .artist-close-btn, .svg-seat');
    els.forEach(el => {
      el.removeEventListener('mouseenter', this._cursorGrow);
      el.removeEventListener('mouseleave', this._cursorShrink);
    });
    this._cursorGrow   = () => { const c = document.getElementById('custom-cursor'); c.style.width='50px'; c.style.height='50px'; c.style.backgroundColor='rgba(204,255,0,0.2)'; };
    this._cursorShrink = () => { const c = document.getElementById('custom-cursor'); c.style.width='20px'; c.style.height='20px'; c.style.backgroundColor='transparent'; };
    els.forEach(el => {
      el.addEventListener('mouseenter', this._cursorGrow);
      el.addEventListener('mouseleave', this._cursorShrink);
    });
  },

  bindGlobalEvents() {
    document.addEventListener('mousemove', e => {
      const c = document.getElementById('custom-cursor');
      if (c) { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }
    });

    document.getElementById('openAuth').addEventListener('click', () => {
      if (this.isUserLoggedIn) {
        this.handleSignOut();
      } else {
        this.restoreDefaultAuthUI();
        this.body.classList.add('auth-open');
        SoundEngine.playOpen();
      }
    });
    document.getElementById('fastPassBtn').addEventListener('click', () => this.startCheckoutPipeline("show-1"));
    document.getElementById('closeAuth').addEventListener('click', () => this.body.classList.remove('auth-open'));
    document.getElementById('authOverlay').addEventListener('click', () => this.body.classList.remove('auth-open'));

    document.getElementById('openTickets').addEventListener('click', () => this.openMyTickets());
    document.getElementById('closeTickets').addEventListener('click', () => this.closeMyTickets());
    document.getElementById('ticketsOverlay').addEventListener('click', () => this.closeMyTickets());

    this.bindDrawerToggleEvents();

    document.querySelectorAll('.edge-filter-chip').forEach(chip => {
      chip.addEventListener('click', e => {
        document.querySelectorAll('.edge-filter-chip').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.syncIndicatorPosition();
        SoundEngine.playClick();
        this.renderGrid(e.currentTarget.getAttribute('data-filter'));
      });
    });

    window.addEventListener('resize', () => this.syncIndicatorPosition());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('tickets-open')) {
        this.closeMyTickets();
      }
    });

    const filterKeys = { 
      '1': 'all', 
      '2': 'manila', 
      '3': 'tokyo', 
      '4': 'seoul', 
      '5': 'london', 
      '6': 'new-york',
      '7': 'berlin',
      '8': 'ibiza',
      '9': 'amsterdam'
    };
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      
      const modal = document.getElementById('terminalModal');
      if (modal && modal.style.display === 'flex') return;
      
      const artModal = document.getElementById('artistModal');
      if (artModal && artModal.style.display === 'flex') return;
      
      if (document.body.classList.contains('tickets-open') || document.body.classList.contains('auth-open')) return;

      if (!filterKeys[e.key]) return;
      const targetFilter = filterKeys[e.key];
      const targetChip = document.querySelector(`.edge-filter-chip[data-filter="${targetFilter}"]`);
      if (!targetChip) return;
      document.querySelectorAll('.edge-filter-chip').forEach(c => c.classList.remove('active'));
      targetChip.classList.add('active');
      this.syncIndicatorPosition();
      SoundEngine.playClick();
      this.renderGrid(targetFilter);
    });
  },

  bindDrawerToggleEvents() {
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin   = document.getElementById('switchToLogin');
    const authTitle  = document.getElementById('authTitle');
    const submitBtn  = document.getElementById('submitBtn');
    if (switchToRegister && switchToLogin) {
      switchToRegister.addEventListener('click', () => { this.body.classList.add('view-register'); authTitle.innerText = "Register"; submitBtn.innerText = "Create Account"; });
      switchToLogin.addEventListener('click',    () => { this.body.classList.remove('view-register'); authTitle.innerText = "Sign In"; submitBtn.innerText = "Access Passes"; });
    }
  }
};

VibeCore.init();