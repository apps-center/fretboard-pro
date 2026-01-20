   // ================== POSITION OPTIMALE DU MANCHE ==================

// Calcule la position de départ optimale pour l'improvisation selon la tonalité
function getOptimalFretPosition(keyRoot) {
  // On cherche la position de la tonique sur la corde de E grave (corde 6)
  const eStringNote = 4; // La corde E grave = note E = index 4
  
  // Positions de la tonique sur la corde E grave (0-12)
  const positions = [];
  for (let fret = 0; fret <= 12; fret++) {
    const noteAtFret = (eStringNote + fret) % 12;
    if (noteAtFret === keyRoot) {
      positions.push(fret);
    }
  }
  
  // Pour la pentatonique mineure/majeure, la box principale commence 
  // généralement SUR la tonique (pas 2-3 frettes avant)
  // Positions préférées : 0, 3, 5, 7, 10, 12
  const preferredPositions = [0, 3, 5, 7, 10, 12];
  
  // On prend la position de la tonique qui est dans les positions préférées
  // ou la plus proche
  for (const pos of positions) {
    if (preferredPositions.includes(pos)) {
      return pos;
    }
  }
  
  // Si aucune position exacte, on prend la première position trouvée
  return positions[0] || 0;
}

// ================== CONSTANTES & UTILITAIRES ==================

const NOTES_SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const NOTES_FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
const STRINGS = ["E","B","G","D","A","E"]; // de la plus grave à la plus aiguë
const HOT_FRETS = [3, 5, 7, 9, 12, 15];


// Liste complète des accords de base (chromatisme + variantes)
const CHORD_LIST = [
  // Accords majeurs (dièses)
  "C","C#","D","D#","E","F","F#","G","G#","A","A#","B",
  // Accords majeurs (bémols)
  "Db","Eb","Gb","Ab","Bb",
  // Accords mineurs (dièses)
  "Cm","C#m","Dm","D#m","Em","Fm","F#m","Gm","G#m","Am","A#m","Bm",
  // Accords mineurs (bémols)
  "Dbm","Ebm","Gbm","Abm","Bbm",
  // Accords 7 (dièses)
  "C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7",
  // Accords 7 (bémols)
  "Db7","Eb7","Gb7","Ab7","Bb7",
  // Accords m7 (dièses)
  "Cm7","C#m7","Dm7","D#m7","Em7","Fm7","F#m7","Gm7","G#m7","Am7","A#m7","Bm7",
  // Accords m7 (bémols)
  "Dbm7","Ebm7","Gbm7","Abm7","Bbm7",
  // Accords diminués (dièses)
  "Cdim","C#dim","Ddim","D#dim","Edim","Fdim","F#dim","Gdim","G#dim","Adim","A#dim","Bdim",
  // Accords diminués (bémols)
  "Dbdim","Ebdim","Gbdim","Abdim","Bbdim",
  // Accords sus et autres
  "Dsus4","A7sus4","Cmaj7","Ebmaj7"
];

// Base de données des chansons
// ================ BASE DE DONNÉES DES CHANSONS (Corrigée et complétée) ================
const SONGS_DATABASE = {
  // Rock Classique
  satisfaction: { name: "Satisfaction", artist: "Rolling Stones", chords: ["E","D","A","E"] },
  letitbe: { name: "Let It Be", artist: "Beatles", chords: ["C","G","Am","F"] },
  heyjude: { name: "Hey Jude", artist: "Beatles", chords: ["F","C","C7","Bb"] },
  knockin: { name: "Knockin' on Heaven's Door", artist: "Bob Dylan", chords: ["G","D","Am","G"] },
  standbyme: { name: "Stand By Me", artist: "Ben E. King", chords: ["A","F#m","D","E"] },
  wishyou: { name: "Wish You Were Here", artist: "Pink Floyd", chords: ["G","C","D","Am"] },
  california: { name: "Hotel California", artist: "Eagles", chords: ["Bm","F#","A","E","G","D","Em","F#"] },
  sweet: { name: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", chords: ["D","C","G","D"] },
  imagine: { name: "Imagine", artist: "John Lennon", chords: ["C","Cmaj7","F","C"] },
  joker: { name: "The Joker", artist: "Steve Miller Band", chords: ["G","C","D","G"] },
  wildthing: { name: "Wild Thing", artist: "The Troggs", chords: ["A","D","E","D"] },
  purplehaze: { name: "Purple Haze", artist: "Jimi Hendrix", chords: ["E7","G","A","E7"] },
  sheriff: { name: "I Shot the Sheriff", artist: "Bob Marley", chords: ["Gm","Cm","Dm","Gm"] },
  heyjoe: { name: "Hey Joe", artist: "Jimi Hendrix", chords: ["C","G","D","A","E"] },
  
  // Rock 80s-90s
  everybreath: { name: "Every Breath You Take", artist: "Police", chords: ["G","Em","C","D"] },
  zombie: { name: "Zombie", artist: "Cranberries", chords: ["Em","C","G","D"] },
  withorwithout: { name: "With or Without You", artist: "U2", chords: ["D","A","Bm","G"] },
  wonderwall: { name: "Wonderwall", artist: "Oasis", chords: ["Em7","G","Dsus4","A7sus4"] },
  sweetchild: { name: "Sweet Child O' Mine", artist: "Guns N' Roses", chords: ["D","C","G","D"] },
  shouldistay: { name: "Should I Stay or Should I Go", artist: "Clash", chords: ["D","G","A","D"] },
  nowoman: { name: "No Woman No Cry", artist: "Bob Marley", chords: ["C","G","Am","F"] },
  losing: { name: "Losing My Religion", artist: "R.E.M.", chords: ["Am","Em","Dm","G"] },
  creep: { name: "Creep", artist: "Radiohead", chords: ["G","B","C","Cm"] },
  
  // ✅ CORRIGÉ : Smells Like Teen Spirit
  smells: { name: "Smells Like Teen Spirit", artist: "Nirvana", chords: ["F","Bb","Ab","Db"] },
  
  whatsup: { name: "What's Up", artist: "4 Non Blondes", chords: ["A","Bm","D","A"] },
  karma: { name: "Karma Police", artist: "Radiohead", chords: ["Am","D","Em","G"] },
  
  // Rock moderne / Alt
  californication: { name: "Californication", artist: "RHCP", chords: ["Am","F","C","G"] },
  seven: { name: "Seven Nation Army", artist: "White Stripes", chords: ["Em","C","B","Em"] },
  
  // Pop moderne
  baby: { name: "Baby One More Time", artist: "Britney Spears", chords: ["Cm","G","Bb","Ab"] },
  imyours: { name: "I'm Yours", artist: "Jason Mraz", chords: ["G","D","Em","C"] },
  someone: { name: "Someone Like You", artist: "Adele", chords: ["A","E","F#m","D"] },
  shallow: { name: "Shallow", artist: "Lady Gaga", chords: ["Em","D","G","C"] },
  riptide: { name: "Riptide", artist: "Vance Joy", chords: ["Am","G","C","F"] },
  shape: { name: "Shape of You", artist: "Ed Sheeran", chords: ["C#m","F#m","A","B"] },
  blinding: { name: "Blinding Lights", artist: "The Weeknd", chords: ["Fm","Db","Ab","Eb"] },
  flowers: { name: "Flowers", artist: "Miley Cyrus", chords: ["G","D","Em","C"] },
  cheapthrills: { name: "Cheap Thrills", artist: "Sia", chords: ["Am","F","C","G"] },
  try: { name: "Try", artist: "P!nk", chords: ["D","A","Bm","G"] },
  setfire: { name: "Set Fire to the Rain", artist: "Adele", chords: ["Dm","F","C","Am"] },
  englishman: { name: "Englishman in New York", artist: "Sting", chords: ["Bm","A","G","F#m"] },
  
  // Funk / Soul
  getlucky: { name: "Get Lucky", artist: "Daft Punk", chords: ["Bm","D","F#m","E"] },
  jimmy: { name: "Jimmy", artist: "Moriarty", chords: ["Am","F","C","G"] },
  sexmachine: { name: "Sex Machine", artist: "James Brown", chords: ["E7","E7","E7","E7"] },
  goodtimes: { name: "Good Times", artist: "Chic", chords: ["Em7","A7","G","A"] },
  getdown: { name: "Get Down On It", artist: "Kool & The Gang", chords: ["Fm7","Eb","Db","Fm7"] },
  virtualinsanity: { name: "Virtual Insanity", artist: "Jamiroquai", chords: ["Ebmaj7","Fm7","Ebmaj7","Fm7"] },
  superstition: { name: "Superstition", artist: "Stevie Wonder", chords: ["Ebm7","Ebm7","Ebm7","Ebm7"] },
  cantfeelmyface: { name: "Can't Feel My Face", artist: "The Weeknd", chords: ["Bb","Dm","Eb","F"] },
  uptown: { name: "Uptown Funk", artist: "Bruno Mars", chords: ["Dm7","G7","Dm7","G7"] },
  treasure: { name: "Treasure", artist: "Bruno Mars", chords: ["Dm7","Am7","Dm7","Am7"] },
  soulpower92: { name: "Soul Power '92", artist: "Maceo Parker", chords: ["Em7","Em7","Em7","Em7"] },
  doingit: { name: "Doing It to Death", artist: "JB's", chords: ["F7","F7","F7","F7"] }
};

// Rempli les 8 menus d'accords du mode Pop/Rock
function populateChordDropdowns(){
  ["chord1","chord2","chord3","chord4","chord5","chord6","chord7","chord8"].forEach((id, idx) => {
    const sel = document.getElementById(id);
    if(!sel) return;
    sel.innerHTML = "";
    // ✅ Ajouter l'option vide en premier
    sel.add(new Option("— Aucun —", ""));
    CHORD_LIST.forEach(ch => sel.add(new Option(ch, ch)));
    // Valeurs par défaut : C / G / Am / F / C / G / Am / F
    const defaults = ["C","G","Am","F","C","G","Am","F"];
    sel.value = defaults[idx];
  });
}


// nombre de frettes affichées (piloté par les boutons 5 / 10 / 15)
let fretCount = 5;

let useFlats = false;          // gestion # / b (pour plus tard)
let currentKeyRoot = 0;        // racine de la tonalité courante en mode Pop/Rock
let staffMode = false;         // false = manche, true = portée

const MODE_NAMES = ["ionian","dorian","phrygian","lydian","mixolydian","aeolian","locrian"];

// Modèles de suites d'accords diatoniques (en degrés de gamme majeure)
const PROG_TEMPLATES = {
  pop: {
    2: [
      [1, 5], // I - V
      [6, 4], // vi - IV
      [4, 5]  // IV - V
    ],
    4: [
      [1, 5, 6, 4], // I - V - vi - IV (ultra classique)
      [6, 4, 1, 5], // vi - IV - I - V
      [1, 6, 4, 5], // I - vi - IV - V
      [1, 4, 5, 4]  // I - IV - V - IV
    ]
  },
  rock: {
    2: [
      [1, 4], // I - IV
      [1, 5], // I - V
      [5, 4]  // V - IV
    ],
    4: [
      [1, 4, 5, 4], // I - IV - V - IV
      [1, 5, 4, 5], // I - V - IV - V
      [2, 5, 1, 1], // ii - V - I - I
      [5, 4, 1, 1]  // V - IV - I - I
    ]
  },
  funk: {
    2: [
      [2, 5], // ii - V
      [1, 2]  // I - ii
    ],
    4: [
      [2, 5, 1, 1], // ii - V - I - I
      [2, 5, 6, 6], // ii - V - vi - vi
      [1, 2, 5, 4]  // I - ii - V - IV
    ]
  }
};

// Construit le nom d'accord diatonique (en gamme majeure) pour un degré donné
function getDiatonicChordName(rootIndex, degree, style = "pop"){
  const scale = majorScale(rootIndex);           // degrés 1–7 en notes
  const noteRoot = scale[degree - 1];            // 0 → I, 1 → II, etc.
  const noteName = i2n(noteRoot);                // "C", "D", "E", ...

  // Pour le funk, on met un peu plus de 7e
  if(style === "funk"){
    if(degree === 2 || degree === 3 || degree === 6){
      return noteName + "m7";   // ii m7, iii m7, vi m7
    }
    if(degree === 5){
      return noteName + "7";    // V7
    }
    // I, IV, VII : on reste sur triades diatoniques
  }

  // Qualité de triade diatonique en gamme MAJEURE : M, m, dim
  const quality = MAJOR_DEG_QUALITIES[degree - 1];

  if(quality === "m")   return noteName + "m";
  if(quality === "dim") return noteName + "dim";
  return noteName; // majeur
}

function generateDiatonicProgression(){
  const styleSel   = document.getElementById("progressionStyle");
  const lengthSel  = document.getElementById("progressionLength");

  const style  = styleSel ? styleSel.value : "pop";
  const length = lengthSel ? parseInt(lengthSel.value, 10) || 4 : 4;

  const templatesByLen = PROG_TEMPLATES[style]?.[length];
  if(!templatesByLen || !templatesByLen.length){
    console.warn("Pas de modèle pour ce style/longueur");
    return;
  }

  // Choix d'un modèle au hasard parmi ceux disponibles
  const basePattern = templatesByLen[Math.floor(Math.random() * templatesByLen.length)];

  // Si l'utilisateur a demandé "2 accords", on les répète pour remplir les 4 cases
  const fullPattern = (basePattern.length === 2)
    ? basePattern.concat(basePattern)  // ex. [1,5] -> [1,5,1,5]
    : basePattern;

  // Choix d'une tonalité majeure au hasard (pour varier un peu)
  const randomRoot = Math.floor(Math.random() * 12); // 0–11
  currentKeyRoot = randomRoot;                       // pour le manche

  // Conversion des degrés en noms d'accords
  const chords = fullPattern.map(deg =>
    getDiatonicChordName(randomRoot, deg, style)
  );

  // Remplit les 4 sélecteurs d'accords
  const ids = ["chord1","chord2","chord3","chord4"];
  ids.forEach((id, idx) => {
    const sel = document.getElementById(id);
    if(!sel) return;
    sel.value = chords[idx] || chords[0];
  });

  // Met à jour la liste déroulante "Accord actuel"
  initPopChordSelect();

  // Affiche / met à jour la tonalité et redessine le manche
  // (updatePopKeyFromChords() appelle déjà render())
  updatePopKeyFromChords();
}


function n2i(note){
  note = note.replace("♯","#").replace("♭","b");
  if(note.length === 2 && note[1] === "b") {
    return NOTES_FLAT.indexOf(note);
  }
  return NOTES_SHARP.indexOf(note.toUpperCase());
}

function i2n(index){
  return useFlats ? NOTES_FLAT[index % 12] : NOTES_SHARP[index % 12];
}

function parseChord(str){
  str = str.trim();
  const match = str.match(/^([A-G][b#]?)(.*)/i);
  if(!match) {
    return {
      root: 0,
      name: str,
      minor: false,
      dominant7: false,
      dim: false
    };
  }

  const root = match[1];
  const suffix = match[2].toLowerCase();

  // diminué (B°, Bdim, Bo…)
  const dim = /dim|°|o/.test(suffix);

  // mineur : m, min, -  (mais PAS maj)
  let minor = false;
  if(!dim){
    if(/^m(?!aj)/.test(suffix) || /min/.test(suffix) || /-/.test(suffix)){
      minor = true;
    }
  }

  // 7 de dominante (A7, D7…) – mais pas maj7, ni m7
  const dominant7 = /7/.test(suffix) && !minor && !/maj7/.test(suffix);

  return {
    root: n2i(root),
    name: str,
    minor,
    dominant7,
    dim
  };
}

// Fonction pour obtenir les notes caractéristiques d'un accord
function getChordTones(chord) {
  const tones = [];
  
  // Fondamentale
  tones.push({ label: 'F', note: i2n(chord.root), interval: 'Fondamentale' });
  
  // Tierce
  const thirdInterval = (chord.dim || chord.minor) ? 3 : 4;
  const thirdType = chord.dim ? 'Tierce dim' : (chord.minor ? 'Tierce m' : 'Tierce M');
  tones.push({ label: '3', note: i2n((chord.root + thirdInterval) % 12), interval: thirdType });
  
  // Quinte
  const fifthInterval = chord.dim ? 6 : 7;
  const fifthType = chord.dim ? 'Quinte dim' : 'Quinte';
  tones.push({ label: '5', note: i2n((chord.root + fifthInterval) % 12), interval: fifthType });
  
  // Septième (si présente)
  if (chord.dominant7 || (chord.minor && /7/.test(chord.name))) {
    tones.push({ label: '7', note: i2n((chord.root + 10) % 12), interval: 'Septième' });
  }
  
  return tones;
}


function majorScale(r){ return [0,2,4,5,7,9,11].map(d => (r+d)%12); }
function pentaMin(r){ return [0,3,5,7,10].map(d => (r+d)%12); }
function pentaMaj(r){ return [0,2,4,7,9].map(d => (r+d)%12); }

// Gamme mineure naturelle (pour tonalités mineures)
function minorScale(r){ return [0,2,3,5,7,8,10].map(d => (r+d)%12); }

// Gamme mineure mélodique (ascendante)
// Intervalles : 0, 2, 3, 5, 7, 9, 11
function minorMelodicScale(r){ return [0,2,3,5,7,9,11].map(d => (r+d)%12); }

// Mode Dorien (mode ii de la gamme majeure)
// Intervalles : 0, 2, 3, 5, 7, 9, 10
function dorianScale(r){ return [0,2,3,5,7,9,10].map(d => (r+d)%12); }

// Mode Aeolien (identique à la gamme mineure naturelle)
// Intervalles : 0, 2, 3, 5, 7, 8, 10
function aeolianScale(r){ return [0,2,3,5,7,8,10].map(d => (r+d)%12); }

// Mode Lydien (mode IV de la gamme majeure)
// Intervalles : 0, 2, 4, 6, 7, 9, 11
function lydianScale(r){ return [0,2,4,6,7,9,11].map(d => (r+d)%12); }

// Mode Mixolydien (mode V de la gamme majeure)
// Intervalles : 0, 2, 4, 5, 7, 9, 10
function mixolydianScale(r){ return [0,2,4,5,7,9,10].map(d => (r+d)%12); }

// Mode Phrygien (mode III de la gamme majeure)
// Intervalles : 0, 1, 3, 5, 7, 8, 10
function phrygianScale(r){ return [0,1,3,5,7,8,10].map(d => (r+d)%12); }

// Mode Locrien (mode VII de la gamme majeure)
// Intervalles : 0, 1, 3, 5, 6, 8, 10
function locrianScale(r){ return [0,1,3,5,6,8,10].map(d => (r+d)%12); }
// =====================================================
// DÉTECTEUR AUTOMATIQUE DE MODE
// Basé sur l'arbre de décision fourni
// =====================================================

/**
 * Détecte le mode à partir d'une liste d'accords
 * @param {Array<string>} chords - Liste des accords (ex: ["Bm", "D", "F#m", "E"])
 * @returns {Object} - { mode: "dorian", tonic: 11, confidence: 0.95, notes: Set }
 */
function detectMode(chords) {
  if (!chords || chords.length === 0) {
    return { mode: "major", tonic: 0, confidence: 0 };
  }
  
  // 1. Parser tous les accords
  const parsedChords = chords.map(c => parseChord(c));
  
  // 2. Détecter la tonique modale (point de repos)
  const tonic = detectTonic(parsedChords);
  
  // 3. Collecter toutes les notes présentes dans les accords
  const allNotes = new Set();
  parsedChords.forEach(chord => {
    const chordNotes = getChordNotes(chord);
    chordNotes.forEach(n => allNotes.add(n));
  });
  
  // 4. Suivre l'arbre de décision
  const mode = detectModeFromNotes(tonic, allNotes);
  
  // 5. Calculer la confiance
  const confidence = calculateConfidence(tonic, allNotes, mode);
  
  return {
    mode: mode,
    tonic: tonic,
    confidence: confidence,
    notes: allNotes,
    tonicName: i2n(tonic)
  };
}

/**
 * Détecte la tonique modale (note "maison")
 * Heuristique : premier accord ou accord le plus fréquent
 */
function detectTonic(parsedChords) {
  if (parsedChords.length === 0) return 0;
  
  // Compter la fréquence de chaque racine
  const rootFrequency = {};
  parsedChords.forEach(chord => {
    rootFrequency[chord.root] = (rootFrequency[chord.root] || 0) + 1;
  });
  
  // Priorité 1 : Le premier accord (souvent la tonique)
  const firstRoot = parsedChords[0].root;
  
  // Priorité 2 : L'accord le plus fréquent
  let mostFrequentRoot = firstRoot;
  let maxFreq = rootFrequency[firstRoot] || 0;
  
  for (const [root, freq] of Object.entries(rootFrequency)) {
    if (freq > maxFreq) {
      maxFreq = freq;
      mostFrequentRoot = parseInt(root);
    }
  }
  
  // Si le premier accord représente au moins 25% des occurrences, on le prend
  if (rootFrequency[firstRoot] >= parsedChords.length * 0.25) {
    return firstRoot;
  }
  
  return mostFrequentRoot;
}

/**
 * Extrait toutes les notes d'un accord
 */
function getChordNotes(chord) {
  const notes = new Set([chord.root]);
  
  // Tierce
  const thirdInterval = (chord.dim || chord.minor) ? 3 : 4;
  notes.add((chord.root + thirdInterval) % 12);
  
  // Quinte
  const fifthInterval = chord.dim ? 6 : 7;
  notes.add((chord.root + fifthInterval) % 12);
  
  // Septième si présente
  if (chord.dominant7 || (chord.minor && /7/.test(chord.name))) {
    notes.add((chord.root + 10) % 12);
  }
  
  // Majeur 7
  if (/maj7/i.test(chord.name)) {
    notes.add((chord.root + 11) % 12);
  }
  
  return notes;
}

/**
 * Suit l'arbre de décision pour déterminer le mode
 */
function detectModeFromNotes(tonic, allNotes) {
  // Convertir les notes en intervalles par rapport à la tonique
  const intervals = new Set();
  allNotes.forEach(note => {
    const interval = (note - tonic + 12) % 12;
    intervals.add(interval);
  });
  
  // ÉTAPE 2 : TIERCE MAJEURE ou MINEURE ?
  const hasMinorThird = intervals.has(3);
  const hasMajorThird = intervals.has(4);
  
  // Si on a les deux tierces, privilégier celle qui apparaît dans le premier accord
  // Pour simplifier, on va privilégier la tierce mineure si présente
  const isMinorMode = hasMinorThird;
  
  if (isMinorMode) {
    // ========== BRANCHE TIERCE MINEURE ==========
    
    // QUESTION 3 : La 2e est-elle b (mineure) ?
    const hasMinorSecond = intervals.has(1);
    if (hasMinorSecond) {
      return "phrygian"; // PHRYGIEN
    }
    
    // QUESTION 4 : La 6e est-elle MAJEURE ?
    const hasMajorSixth = intervals.has(9);
    if (hasMajorSixth) {
      return "dorian"; // DORIEN
    }
    
    // QUESTION 5 : La 5e est-elle b (diminuée) ?
    const hasDiminishedFifth = intervals.has(6);
    if (hasDiminishedFifth) {
      return "locrian"; // LOCRIEN
    }
    
    // Par défaut : ÉOLIEN (mineur naturel)
    return "aeolian";
    
  } else {
    // ========== BRANCHE TIERCE MAJEURE ==========
    
    // QUESTION 3 : La 4e est-elle # (augmentée) ?
    const hasAugmentedFourth = intervals.has(6);
    if (hasAugmentedFourth) {
      return "lydian"; // LYDIEN
    }
    
    // QUESTION 4 : La 7e est-elle b (mineure) ?
    const hasMinorSeventh = intervals.has(10);
    if (hasMinorSeventh) {
      return "mixolydian"; // MIXOLYDIEN
    }
    
    // Par défaut : IONIEN (majeur)
    return "major"; // IONIEN
  }
}

/**
 * Calcule un score de confiance (0-1)
 */
function calculateConfidence(tonic, allNotes, detectedMode) {
  // Récupérer les notes théoriques du mode détecté
  const modeScales = {
    "major": majorScale,
    "dorian": dorianScale,
    "phrygian": phrygianScale,
    "lydian": lydianScale,
    "mixolydian": mixolydianScale,
    "aeolian": aeolianScale,
    "locrian": locrianScale
  };
  
  const scaleFunc = modeScales[detectedMode];
  if (!scaleFunc) return 0.5;
  
  const theoreticalNotes = new Set(scaleFunc(tonic));
  
  // Compter combien de notes observées sont dans le mode théorique
  let matchCount = 0;
  allNotes.forEach(note => {
    if (theoreticalNotes.has(note)) {
      matchCount++;
    }
  });
  
  // Confidence = ratio de notes qui matchent
  const confidence = allNotes.size > 0 ? matchCount / allNotes.size : 0;
  
  return confidence;
}

/**
 * Renvoie le nom français du mode
 */
function getModeName(mode) {
  const names = {
    "major": "Majeur (Ionien)",
    "dorian": "Dorien",
    "phrygian": "Phrygien",
    "lydian": "Lydien",
    "mixolydian": "Mixolydien",
    "aeolian": "Mineur naturel (Éolien)",
    "locrian": "Locrien"
  };
  return names[mode] || mode;
}

/**
 * Applique automatiquement le mode détecté
 */
function applyDetectedMode(detection) {
  if (!detection || detection.confidence < 0.5) {
    console.warn("Détection de mode peu fiable, mode non appliqué");
    return;
  }
  
  // Décocher toutes les checkboxes de modes
  const modeCheckboxes = [
    "modeDorian", "modePhrygian", "modeLydian",
    "modeMixolydian", "modeAeolian", "modeLocrian",
    "scaleMajor", "scaleMinorNatural"
  ];
  
  modeCheckboxes.forEach(id => {
    const cb = document.getElementById(id);
    if (cb) cb.checked = false;
  });
  
  // Cocher le bon mode
  const modeToCheckbox = {
    "major": "scaleMajor",
    "dorian": "modeDorian",
    "phrygian": "modePhrygian",
    "lydian": "modeLydian",
    "mixolydian": "modeMixolydian",
    "aeolian": "modeAeolian",
    "locrian": "modeLocrian"
  };
  
  const checkboxId = modeToCheckbox[detection.mode];
  if (checkboxId) {
    const cb = document.getElementById(checkboxId);
    if (cb) {
      cb.checked = true;
      // Déclencher l'événement change pour mettre à jour l'affichage
      cb.dispatchEvent(new Event('change'));
    }
  }
  
  console.log(`🎵 Mode détecté : ${getModeName(detection.mode)} en ${detection.tonicName} (confiance: ${Math.round(detection.confidence * 100)}%)`);
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    detectMode,
    applyDetectedMode,
    getModeName
  };
}


// ===== Major (7) (blues) HEXAPHONIC =====
// Degrés : 1, 2, ♭3, 3, 5, ♭7
// Intervalles : 0, 2, 3, 4, 7, 10
function major7BluesHex(root){
  const intervals = [0, 2, 3, 4, 7, 10];
  return intervals.map(d => (root + d) % 12);
}

// Blue note spécifique de cette gamme : ♭3
function major7BluesHexBlue(root){
  return (root + 3) % 12;
}

// ===== Major (7) / Diminished / Minor (6) PENTAPHONIC =====
// Gamme pentaphonique modale : 1, 2, 3, 5, 6
// Intervalles : 0, 2, 4, 7, 9
function maj7DimMin6Penta(root){
  const intervals = [0, 2, 4, 7, 9];
  return intervals.map(d => (root + d) % 12);
}

// Qualité attendue des triades dans la gamme MAJEURE : I ii iii IV V vi vii°
const MAJOR_DEG_QUALITIES = ["M","m","m","M","M","m","dim"];


// Qualité attendue des triades dans la gamme MINEURE naturelle : i ii° III iv v VI VII
const MINOR_DEG_QUALITIES = ["m","dim","M","m","m","M","M"];

// Qualité de triade à partir de l'accord parsé
function triadQualityFromChord(ch){
  if(ch.dim) return "dim";
  if(ch.minor) return "m";
  return "M";
}

// Qualité attendue des triades dans le mode DORIEN : i ii III IV v vi° VII
const DORIAN_DEG_QUALITIES = ["m","m","M","M","m","dim","M"];

// Score d'une tonalité pour une liste d'accords (mode configurable)
function scoreDiatonicKey(chords, keyRoot, isMajor = true, scale = null, qualities = null){
  // Si pas de gamme fournie, on utilise majeur ou mineur
  if(!scale){
    scale = isMajor ? majorScale(keyRoot) : minorScale(keyRoot);
  }
  if(!qualities){
    qualities = isMajor ? MAJOR_DEG_QUALITIES : MINOR_DEG_QUALITIES;
  }

  let score = 0;
  let explained = 0;

  chords.forEach((ch, chordIndex) => {
    const idx = scale.indexOf(ch.root);
    if(idx === -1){
      // accord complètement hors de la gamme → grosse pénalité
      score -= 2;
      return;
    }

    explained++;

    const expected = qualities[idx];      // M / m / dim
    const actual = triadQualityFromChord(ch);

    if(actual === expected){
      // accord exactement diatonique au bon degré
      score += 5;
    } else if(expected === "dim" && actual === "m"){
      // mineur là où on attendait diminué : pas parfait, mais proche
      score -= 1;
    } else {
      // majeur au lieu de mineur ou l'inverse → grosse pénalité
      score -= 3;
    }

    // bonus pour I / IV / V en majeur, i / iv / v en mineur/dorien
    const isTonicDegree    = (idx === 0);
    const isSubdominant    = (idx === 3);
    const isDominant       = (idx === 4);

    if(!ch.dim){
      if(isMajor && !ch.minor && (isTonicDegree || isSubdominant || isDominant)){
        score += 2;
      }
      if(!isMajor && ch.minor && (isTonicDegree || isSubdominant || isDominant)){
        score += 2;
      }
    }

    // ✅ BONUS IMPORTANT : Le premier accord est souvent la tonique
    if(chordIndex === 0 && isTonicDegree){
      if(actual === expected){
        // Le premier accord est la tonique avec la bonne qualité → énorme bonus
        score += 8;
      }
    }
  });

  // bonus si on a clairement l'accord de tonique dans la bonne qualité
  const tonicChord = chords.find(ch =>
    ch.root === keyRoot &&
    ((isMajor && !ch.minor && !ch.dim) || (!isMajor && ch.minor && !ch.dim))
  );
  if(tonicChord) score += 3;

  return {score, explained};
}


// Renvoie le nom du mode (ionian, dorian, ...) pour un accord diatonique
function getModeNameForChord(chordRoot, keyRoot){
  const scale = majorScale(keyRoot);
  const idx = scale.indexOf(chordRoot);
  if(idx === -1) return null;
  return MODE_NAMES[idx] || null;
}

// ================== RENDU DU MANCHE ==================

// ================== MINI-DIAGRAMMES PAR ACCORD ==================

function renderMiniDiagrams() {
  const wrapper = document.getElementById("miniDiagramsWrapper");
  if (!wrapper) return;
  
  // Récupérer le mode actif
  const activeTab = document.querySelector(".tab.active");
  const activeMode = activeTab ? activeTab.dataset.mode : "pop";
  
  // Cacher en mode Notes
  if (activeMode === "notes") {
    wrapper.innerHTML = "";
    wrapper.style.display = "none";
    return;
  }
  
  wrapper.style.display = "grid";
  
  let activeChords = [];
  
  // Mode Pop/Rock : récupérer les accords sélectionnés
  if (activeMode === "pop") {
    const chordIds = ["chord1", "chord2", "chord3", "chord4", "chord5", "chord6", "chord7", "chord8"];
    activeChords = chordIds
      .map(id => {
        const el = document.getElementById(id);
        if (!el || el.style.display === 'none') return null;
        return el.value.trim();
      })
      .filter(Boolean);
  }
  // Mode Blues : créer les accords I7, IV7, V7
  else if (activeMode === "blues") {
    const bluesKeyEl = document.getElementById("bluesKey");
    if (bluesKeyEl) {
      const key = bluesKeyEl.value;
      const rootIdx = n2i(key);
      
      // I7, IV7, V7 pour la progression blues 12 mesures
      const I = i2n(rootIdx) + "7";
      const IV = i2n((rootIdx + 5) % 12) + "7";
      const V = i2n((rootIdx + 7) % 12) + "7";
      
      activeChords = [I, IV, V];
    }
  }
  
  if (activeChords.length === 0) {
    wrapper.innerHTML = "";
    return;
  }
  
  // Récupérer les paramètres actuels
  const startFret = parseInt(document.getElementById("startFret").value) || 0;
  const useShowPentaPattern = document.getElementById("showPentaPattern")?.checked ?? false;
  
  // ✅ Calculer la tonalité (keyRoot)
  const isBluesMode = activeMode === "blues";
  const keyRoot = isBluesMode
    ? n2i(document.getElementById("bluesKey")?.value || "C")
    : currentKeyRoot;
  
  // Vider le wrapper
  wrapper.innerHTML = "";
  
  // Créer un mini-diagramme ou mini-portée pour chaque accord
  activeChords.forEach((chordText, index) => {
    if (staffMode) {
      // Mode portée : créer une mini-portée
      const miniStaff = createMiniStaff(chordText, keyRoot, useShowPentaPattern, index, activeChords);
      wrapper.appendChild(miniStaff);
    } else {
      // Mode manche : créer un mini-diagramme
      const miniDiagram = createMiniDiagram(chordText, keyRoot, startFret, useShowPentaPattern, index, activeChords);
      wrapper.appendChild(miniDiagram);
    }
  });
}

function createMiniDiagram(chordText, keyRoot, startFret, useShowPentaPattern, currentIndex, allChords) {
  // Parse l'accord
  const chord = parseChord(chordText);
  
  // Créer le container
  const container = document.createElement("div");
  container.className = "mini-diagram";
  
  // Ajouter les notes caractéristiques de l'accord
  const chordTones = getChordTones(chord);
  const tonesDiv = document.createElement("div");
  tonesDiv.className = "chord-tones";
  
  chordTones.forEach(tone => {
    const toneSpan = document.createElement("span");
    toneSpan.className = "chord-tone";
    toneSpan.title = tone.interval; // Info-bulle au survol
    
    const labelSpan = document.createElement("span");
    labelSpan.className = "chord-tone-label";
    labelSpan.textContent = tone.label + ':';
    
    const noteSpan = document.createElement("span");
    noteSpan.className = "chord-tone-note";
    noteSpan.textContent = tone.note;
    
    toneSpan.appendChild(labelSpan);
    toneSpan.appendChild(noteSpan);
    tonesDiv.appendChild(toneSpan);
  });
  
  container.appendChild(tonesDiv);
  
  // Titre
  const title = document.createElement("div");
  title.className = "mini-diagram-title";
  title.textContent = chordText;
  container.appendChild(title);
  
  // Fretboard container
  const fretboard = document.createElement("div");
  fretboard.className = "mini-fretboard";
  
  // Grid pour les notes
  const fb = document.createElement("div");
  fb.className = "mini-fb";
  
  // Toujours afficher 4 frettes pour les mini-diagrammes
  const localFretCount = 4;
  const firstFret = startFret;
  
  // Calculer les notes de l'accord
  const chordNotes = new Set([chord.root]);
  const thirdInterval = (chord.dim || chord.minor) ? 3 : 4;
  const fifthInterval = chord.dim ? 6 : 7;
  chordNotes.add((chord.root + thirdInterval) % 12);
  chordNotes.add((chord.root + fifthInterval) % 12);
  if (chord.dominant7 || (chord.minor && /7/.test(chord.name))) {
    chordNotes.add((chord.root + 10) % 12);
  }
  
  // Calculer les notes cibles (notes dans cet accord mais PAS dans le précédent)
  const targetNotes = new Set();
  if (currentIndex > 0) {
    const prevChordText = allChords[currentIndex - 1];
    const prevChord = parseChord(prevChordText);
    
    const prevChordNotes = new Set([prevChord.root]);
    const prevThird = (prevChord.dim || prevChord.minor) ? 3 : 4;
    const prevFifth = prevChord.dim ? 6 : 7;
    prevChordNotes.add((prevChord.root + prevThird) % 12);
    prevChordNotes.add((prevChord.root + prevFifth) % 12);
    if (prevChord.dominant7 || (prevChord.minor && /7/.test(prevChord.name))) {
      prevChordNotes.add((prevChord.root + 10) % 12);
    }
    
    for (const note of chordNotes) {
      if (!prevChordNotes.has(note)) {
        targetNotes.add(note);
      }
    }
  }
  
  // Pattern penta
  const pentaPatternHaloSet = new Set();
  if (useShowPentaPattern) {
    if (chord.minor) {
      // Pour un accord mineur, on affiche seulement la penta mineure
      pentaMin(chord.root).forEach(n => pentaPatternHaloSet.add(n));
    } else {
      // Pour un accord majeur, on affiche les deux : penta majeure ET penta mineure (hybride)
      pentaMaj(chord.root).forEach(n => pentaPatternHaloSet.add(n));
      pentaMin(chord.root).forEach(n => pentaPatternHaloSet.add(n));
    }
  }
  
  // ✅ Utiliser le mode sélectionné (ou gamme majeure par défaut)
  let scaleSet = new Set();
  
  // Vérifier les checkboxes des modes
  const modeDorianCb = document.getElementById("modeDorian");
  const modeAeolianCb = document.getElementById("modeAeolian");
  const modeLydianCb = document.getElementById("modeLydian");
  const modeMixolydianCb = document.getElementById("modeMixolydian");
  const modePhrygianCb = document.getElementById("modePhrygian");
  const modeLocrianCb = document.getElementById("modeLocrian");
  const scaleMajorCb = document.getElementById("scaleMajor");
  const scaleMinorNaturalCb = document.getElementById("scaleMinorNatural");
  const scaleMinorMelodicCb = document.getElementById("scaleMinorMelodic");
  
  // Utiliser le mode coché (priorité aux modes)
  if (modeDorianCb?.checked) {
    scaleSet = new Set(dorianScale(keyRoot));
  } else if (modeAeolianCb?.checked) {
    scaleSet = new Set(aeolianScale(keyRoot));
  } else if (modeLydianCb?.checked) {
    scaleSet = new Set(lydianScale(keyRoot));
  } else if (modeMixolydianCb?.checked) {
    scaleSet = new Set(mixolydianScale(keyRoot));
  } else if (modePhrygianCb?.checked) {
    scaleSet = new Set(phrygianScale(keyRoot));
  } else if (modeLocrianCb?.checked) {
    scaleSet = new Set(locrianScale(keyRoot));
  } else if (scaleMinorNaturalCb?.checked) {
    scaleSet = new Set(minorScale(keyRoot));
  } else if (scaleMinorMelodicCb?.checked) {
    scaleSet = new Set(minorMelodicScale(keyRoot));
  } else if (scaleMajorCb?.checked) {
    scaleSet = new Set(majorScale(keyRoot));
  } else {
    // Par défaut : gamme majeure
    scaleSet = new Set(majorScale(keyRoot));
  }
  
  // Blue note (b5) - vérifier si la checkbox est cochée
  const showBlueNote = document.getElementById("showBlueNote")?.checked ?? false;
  const blueNote = (chord.root + 3) % 12;  // ✅ Blue note = tierce mineure (♭3)
  
  // Rendu des cordes et frettes
  STRINGS.forEach(openString => {
    const openNoteIdx = n2i(openString);
    
    for (let f = 0; f < localFretCount; f++) {
      const fretNum = firstFret + f;
      const noteIdx = (openNoteIdx + fretNum) % 12;
      
      const cell = document.createElement("div");
      cell.className = "cell";
      
      if (fretNum === 0) {
        cell.classList.add("nut");
      } else {
        cell.classList.add("fret");
      }
      
      if ([3, 5, 7, 9, 15, 17, 19, 21].includes(fretNum)) cell.classList.add("inlay");
      if (fretNum === 12) cell.classList.add("double-inlay");
      
      // Déterminer le rôle de la note
      let role = null;
      const chordToneArray = [...chordNotes];
      const isHalfStepBelowChord = chordToneArray.some(c => (noteIdx + 1) % 12 === c);
      const isHalfStepAboveChord = chordToneArray.some(c => (noteIdx + 11) % 12 === c);
      
      if (noteIdx === chord.root) {
        role = "root";
      } else if (targetNotes.has(noteIdx)) {
        role = "target";
      } else if (showBlueNote && noteIdx === blueNote) {
        role = "blues";
      } else if (chordNotes.has(noteIdx)) {
        role = "chord";
      } else if (scaleSet.has(noteIdx)) {
        if (isHalfStepBelowChord) {
          role = "floating";
        } else if (isHalfStepAboveChord) {
          role = "avoid";
        } else {
          role = "ok";
        }
      } else if (useShowPentaPattern && pentaPatternHaloSet.has(noteIdx)) {
        // Afficher les notes de la penta hybride même si elles ne sont pas dans la gamme majeure
        if (isHalfStepBelowChord) {
          role = "floating";
        } else if (isHalfStepAboveChord) {
          role = "avoid";
        } else {
          role = "ok";
        }
      }
      
      if (role) {
        const dot = document.createElement("div");
        dot.className = `note ${role}`;
        if (role === "root") dot.classList.add("root");
        
        // Halo pour pattern penta
        if (useShowPentaPattern && pentaPatternHaloSet.has(noteIdx)) {
          dot.classList.add("shape-min7");
        }
        
        // ✅ Halo bleu si c'est aussi une blue note
        if (showBlueNote && noteIdx === blueNote && role !== "blues") {
          dot.classList.add("blue-halo");
        }
        
        dot.textContent = i2n(openNoteIdx + fretNum);
        cell.appendChild(dot);
      }
      
      fb.appendChild(cell);
    }
  });
  
  fretboard.appendChild(fb);
  
  // Labels des frettes
  const labels = document.createElement("div");
  labels.className = "mini-labels";
  for (let i = 0; i < localFretCount; i++) {
    const fretNum = firstFret + i;
    const label = document.createElement("div");
    label.textContent = fretNum;
    if (fretNum === keyRoot || (fretNum === 0 && chord.root === 0)) {
      label.classList.add("key-fret");
    }
    labels.appendChild(label);
  }
  
  fretboard.appendChild(labels);
  container.appendChild(fretboard);
  
  // Ajouter un événement de clic pour sélectionner cet accord
  container.style.cursor = 'pointer';
  container.addEventListener('click', () => {
    // Changer l'accord dans le sélecteur principal
    const chordSel = document.getElementById("chordSel");
    if (chordSel) {
      chordSel.value = chordText;
      // Déclencher le changement pour mettre à jour l'affichage
      chordSel.dispatchEvent(new Event('change'));
    }
  });
  
  return container;
}

// ================== MINI-PORTÉES PAR ACCORD ==================

function createMiniStaff(chordText, keyRoot, useShowPentaPattern, currentIndex, allChords) {
  // Parse l'accord
  const chord = parseChord(chordText);
  
  // Créer le container
  const container = document.createElement("div");
  container.className = "mini-diagram mini-staff-container";
  
  // Ajouter les notes caractéristiques de l'accord
  const chordTones = getChordTones(chord);
  const tonesDiv = document.createElement("div");
  tonesDiv.className = "chord-tones";
  
  chordTones.forEach(tone => {
    const toneSpan = document.createElement("span");
    toneSpan.className = "chord-tone";
    toneSpan.title = tone.interval; // Info-bulle au survol
    
    const labelSpan = document.createElement("span");
    labelSpan.className = "chord-tone-label";
    labelSpan.textContent = tone.label + ':';
    
    const noteSpan = document.createElement("span");
    noteSpan.className = "chord-tone-note";
    noteSpan.textContent = tone.note;
    
    toneSpan.appendChild(labelSpan);
    toneSpan.appendChild(noteSpan);
    tonesDiv.appendChild(toneSpan);
  });
  
  container.appendChild(tonesDiv);
  
  // Titre
  const title = document.createElement("div");
  title.className = "mini-diagram-title";
  title.textContent = chordText;
  container.appendChild(title);
  
  // Canvas pour la portée
  const canvas = document.createElement("canvas");
  canvas.className = "mini-staff-canvas";
  canvas.width = 350;
  canvas.height = 120;
  container.appendChild(canvas);
  
  const ctx = canvas.getContext("2d");
  
  // Paramètres de la portée
  const top = 30;
  const spacing = 10;
  const leftMargin = 50;
  
  // Dessiner la portée
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 1.5;
  
  for (let i = 0; i < 5; i++) {
    const y = top + i * spacing;
    ctx.beginPath();
    ctx.moveTo(leftMargin, y);
    ctx.lineTo(canvas.width - 20, y);
    ctx.stroke();
  }
  
  // Clé de sol
  ctx.fillStyle = "#eee";
  ctx.font = "32px serif";
  try {
    ctx.fillText("𝄞", 18, top + spacing * 3.7);
  } catch {
    ctx.fillText("G", 18, top + spacing * 3.5);
  }
  
  // Position des notes sur la portée
  const pos = {
    C: top + spacing * 5.5,
    D: top + spacing * 5,
    E: top + spacing * 4.5,
    F: top + spacing * 4,
    G: top + spacing * 3.5,
    A: top + spacing * 3,
    B: top + spacing * 2.5,
  };
  
  // Calculer les notes de l'accord
  const chordNotes = new Set([chord.root]);
  const thirdInterval = (chord.dim || chord.minor) ? 3 : 4;
  const fifthInterval = chord.dim ? 6 : 7;
  chordNotes.add((chord.root + thirdInterval) % 12);
  chordNotes.add((chord.root + fifthInterval) % 12);
  if (chord.dominant7 || (chord.minor && /7/.test(chord.name))) {
    chordNotes.add((chord.root + 10) % 12);
  }
  
  // Calculer les notes cibles
  const targetNotes = new Set();
  if (currentIndex > 0) {
    const prevChordText = allChords[currentIndex - 1];
    const prevChord = parseChord(prevChordText);
    
    const prevChordNotes = new Set([prevChord.root]);
    const prevThird = (prevChord.dim || prevChord.minor) ? 3 : 4;
    const prevFifth = prevChord.dim ? 6 : 7;
    prevChordNotes.add((prevChord.root + prevThird) % 12);
    prevChordNotes.add((prevChord.root + prevFifth) % 12);
    if (prevChord.dominant7 || (prevChord.minor && /7/.test(prevChord.name))) {
      prevChordNotes.add((prevChord.root + 10) % 12);
    }
    
    for (const note of chordNotes) {
      if (!prevChordNotes.has(note)) {
        targetNotes.add(note);
      }
    }
  }
  
  // Pattern penta
  const pentaPatternHaloSet = new Set();
  if (useShowPentaPattern) {
    if (chord.minor) {
      pentaMin(chord.root).forEach(n => pentaPatternHaloSet.add(n));
    } else {
      pentaMaj(chord.root).forEach(n => pentaPatternHaloSet.add(n));
      pentaMin(chord.root).forEach(n => pentaPatternHaloSet.add(n));
    }
  }
  
  // ✅ Utiliser le mode sélectionné (ou gamme majeure par défaut)
  let scaleSet = new Set();
  
  // Vérifier les checkboxes des modes
  const modeDorianCb = document.getElementById("modeDorian");
  const modeAeolianCb = document.getElementById("modeAeolian");
  const modeLydianCb = document.getElementById("modeLydian");
  const modeMixolydianCb = document.getElementById("modeMixolydian");
  const modePhrygianCb = document.getElementById("modePhrygian");
  const modeLocrianCb = document.getElementById("modeLocrian");
  const scaleMajorCb = document.getElementById("scaleMajor");
  const scaleMinorNaturalCb = document.getElementById("scaleMinorNatural");
  const scaleMinorMelodicCb = document.getElementById("scaleMinorMelodic");
  
  // Utiliser le mode coché (priorité aux modes)
  if (modeDorianCb?.checked) {
    scaleSet = new Set(dorianScale(keyRoot));
  } else if (modeAeolianCb?.checked) {
    scaleSet = new Set(aeolianScale(keyRoot));
  } else if (modeLydianCb?.checked) {
    scaleSet = new Set(lydianScale(keyRoot));
  } else if (modeMixolydianCb?.checked) {
    scaleSet = new Set(mixolydianScale(keyRoot));
  } else if (modePhrygianCb?.checked) {
    scaleSet = new Set(phrygianScale(keyRoot));
  } else if (modeLocrianCb?.checked) {
    scaleSet = new Set(locrianScale(keyRoot));
  } else if (scaleMinorNaturalCb?.checked) {
    scaleSet = new Set(minorScale(keyRoot));
  } else if (scaleMinorMelodicCb?.checked) {
    scaleSet = new Set(minorMelodicScale(keyRoot));
  } else if (scaleMajorCb?.checked) {
    scaleSet = new Set(majorScale(keyRoot));
  } else {
    // Par défaut : gamme majeure
    scaleSet = new Set(majorScale(keyRoot));
  }
  
  // Blue note (b5) - vérifier si la checkbox est cochée
  const showBlueNote = document.getElementById("showBlueNote")?.checked ?? false;
  const blueNote = (chord.root + 3) % 12;  // ✅ Blue note = tierce mineure (♭3)
  
  // Créer une liste des notes à afficher
  const notesToDisplay = [];
  const allNoteIndices = Array.from(chordNotes);
  
  // Ajouter les notes de l'accord en priorité
  allNoteIndices.forEach(noteIdx => {
    const chordToneArray = [...chordNotes];
    const isHalfStepAboveChord = chordToneArray.some(c => (noteIdx + 11) % 12 === c);
    
    let role = null;
    if (noteIdx === chord.root) {
      role = "root";
    } else if (targetNotes.has(noteIdx)) {
      role = "target";
    } else if (chordNotes.has(noteIdx)) {
      role = "chord";
    }
    
    if (role) {
      notesToDisplay.push({
        noteIdx: noteIdx,
        role: role,
        hasHalo: pentaPatternHaloSet.has(noteIdx),
        hasBlueHalo: showBlueNote && noteIdx === blueNote && role !== "blues"
      });
    }
  });
  
  // Ajouter la blue note si la checkbox est cochée
  if (showBlueNote && !chordNotes.has(blueNote)) {
    notesToDisplay.push({
      noteIdx: blueNote,
      role: "blues",
      hasHalo: pentaPatternHaloSet.has(blueNote),
      hasBlueHalo: false
    });
  }
  
  // Dessiner les notes
  const step = (canvas.width - leftMargin - 40) / (notesToDisplay.length + 1);
  let x = leftMargin + step;
  
  const FR_NAMES = {
    C: "Do", D: "Ré", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si"
  };
  
  ctx.textAlign = "center";
  
  notesToDisplay.forEach(n => {
    const noteName = i2n(n.noteIdx);
    const m = noteName.match(/^([A-G])([#b]?)/i);
    const letter = m ? m[1].toUpperCase() : noteName[0].toUpperCase();
    const accidental = m && m[2] ? m[2] : null;
    
    const y = pos[letter] ?? pos.C;
    
    // Nom français
    const baseNameFr = FR_NAMES[letter] || letter;
    let label = baseNameFr;
    if (accidental === "#") label += "♯";
    else if (accidental === "b") label += "♭";
    
    ctx.fillStyle = "#eee";
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(label, x, top - 4);
    
    // Couleur selon le rôle
    const colorMap = {
      root: "#ffeb3b",
      chord: "#aaaaaa",
      target: "#9b59b6",
      ok: "#8bc34a",
      floating: "#ff9800",
      avoid: "#e53935",
      blues: "#2196f3"
    };
    const fill = colorMap[n.role] || "#ffffff";
    
    // Altération
    if (accidental) {
      ctx.fillStyle = "#eee";
      ctx.font = "14px serif";
      ctx.fillText(accidental === "#" ? "♯" : "♭", x - 14, y + 5);
    }
    
    // Dessiner le halo si nécessaire
    if (n.hasHalo) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 3;
      ctx.ellipse(x, y, 13, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // ✅ Dessiner le halo bleu si c'est une blue note
    if (n.hasBlueHalo) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(33, 150, 243, 0.9)"; // Bleu
      ctx.lineWidth = 3;
      ctx.ellipse(x, y, 13, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Tête de note
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.ellipse(x, y, 9, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    x += step;
  });
  
  // Ajouter un événement de clic pour sélectionner cet accord
  container.style.cursor = 'pointer';
  container.addEventListener('click', () => {
    const chordSel = document.getElementById("chordSel");
    if (chordSel) {
      chordSel.value = chordText;
      chordSel.dispatchEvent(new Event('change'));
    }
  });
  
  return container;
}


// ================== RENDU PRINCIPAL ==================

function render(){
  const fb = document.getElementById("fb");
  const labels = document.getElementById("labels");
  const startFret = parseInt(document.getElementById("startFret").value) || 0;

  const activeTab  = document.querySelector(".tab.active");
  const activeMode = activeTab ? activeTab.dataset.mode : "pop";
  const isBluesMode = activeMode === "blues";
  const isNotesMode = activeMode === "notes";

  // En mode Blues, on cache la case "Note blue (b5)" globale (réservée au Pop/Rock)
  const globalBlueInput = document.getElementById("showBlueNote");
  const globalBlueLabel = globalBlueInput ? globalBlueInput.parentElement : null;
  if (globalBlueLabel) {
    globalBlueLabel.style.display = isBluesMode ? "none" : "flex";
  }

  // note sélectionnée en mode NOTES
  const noteSel = document.getElementById("noteSel");
  const noteFilterIdx = (isNotesMode && noteSel) ? n2i(noteSel.value) : null;

  // --- gestion des frettes affichées ---
  let localFretCount = fretCount; // valeur par défaut (5/10/15)
  let firstFret;

  if (isNotesMode) {
    // MODE NOTES → toujours de 1 à 12
    firstFret = 1;
    localFretCount = 13;
  } else {
    // Pop / Blues → centrage du "pattern principal" (box de pentatonique)
    const patternWidth = 5; // startFret -> startFret + 4
    const extra = Math.max(localFretCount - patternWidth, 0);
    const extraBefore = Math.floor(extra / 2);

    firstFret = startFret - extraBefore;
    if (firstFret < 0) firstFret = 0;
  }

  fb.innerHTML = "";
  labels.innerHTML = "";
  fb.style.gridTemplateColumns = `repeat(${localFretCount}, 1fr)`;

  labels.style.setProperty("--fret-count", localFretCount);
  labels.style.gridTemplateColumns = `repeat(${localFretCount}, 1fr)`;

  // racine de tonalité
  const keyRoot = isBluesMode
    ? n2i(document.getElementById("bluesKey").value)
    : currentKeyRoot;

  // ✅ IMPORTANT : Définir chord AVANT de l'utiliser
  // accord sélectionné (inutile en mode Notes mais on garde pour réutiliser la logique)
  const selectedChordText = document.getElementById("chordSel").value || "C";
  const chord = parseChord(selectedChordText);

  // ✅ Calcul du scaleSet en fonction des options sélectionnées
  let scaleSet;
  
  // Récupérer les états des checkboxes
  const scaleMajorCb = document.getElementById("scaleMajor");
  const scaleMinorNaturalCb = document.getElementById("scaleMinorNatural");
  const scaleMinorMelodicCb = document.getElementById("scaleMinorMelodic");
  const modeDorianCb = document.getElementById("modeDorian");
  const modeAeolianCb = document.getElementById("modeAeolian");
  const modeLydianCb = document.getElementById("modeLydian");
  const modeMixolydianCb = document.getElementById("modeMixolydian");
  const modePhrygianCb = document.getElementById("modePhrygian");
  const modeLocrianCb = document.getElementById("modeLocrian");
  
  // Créer un Set combiné pour toutes les gammes/modes sélectionnés
  const combinedScaleSet = new Set();
  
  // Ajouter les notes des gammes sélectionnées (basées sur LA TONALITÉ, pas l'accord actuel)
  if (scaleMajorCb?.checked) {
    majorScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (scaleMinorNaturalCb?.checked) {
    minorScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (scaleMinorMelodicCb?.checked) {
    minorMelodicScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (modeDorianCb?.checked) {
    dorianScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (modeAeolianCb?.checked) {
    aeolianScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (modeLydianCb?.checked) {
    lydianScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (modeMixolydianCb?.checked) {
    mixolydianScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (modePhrygianCb?.checked) {
    phrygianScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  if (modeLocrianCb?.checked) {
    locrianScale(keyRoot).forEach(n => combinedScaleSet.add(n));
  }
  
  // Si au moins une gamme/mode est sélectionné, utiliser le Set combiné
  // Sinon, utiliser la gamme par défaut (blues ou majeure)
  if (combinedScaleSet.size > 0) {
    scaleSet = combinedScaleSet;
  } else if (isBluesMode) {
    scaleSet = new Set(pentaMin(keyRoot)); // en blues on se base sur penta min de la TONALITÉ
  } else {
    scaleSet = new Set(majorScale(keyRoot));
  }

  // notes de l'accord
  const chordNotes = new Set([chord.root]);
  const thirdInterval = (chord.dim || chord.minor) ? 3 : 4;
  const fifthInterval = chord.dim ? 6 : 7;

  chordNotes.add((chord.root + thirdInterval) % 12); // tierce
  chordNotes.add((chord.root + fifthInterval) % 12); // quinte

  if (chord.dominant7 || (chord.minor && /7/.test(chord.name))) {
    chordNotes.add((chord.root + 10) % 12);          // septième mineure
  }

  // ✅ Calcul des notes cibles (notes dans l'accord actuel mais PAS dans l'accord précédent)
  const targetNotes = new Set();
  
  if (!isBluesMode && !isNotesMode) {
    // Récupérer la liste des accords saisis en mode Pop/Rock
    const chordIds = ["chord1","chord2","chord3","chord4","chord5","chord6","chord7","chord8"];
    const activeChords = chordIds
      .map(id => {
        const el = document.getElementById(id);
        if(!el || el.style.display === 'none') return null;
        return el.value;
      })
      .filter(Boolean);
    
    // Trouver l'index de l'accord actuel
    const currentIndex = activeChords.indexOf(selectedChordText);
    
    if (currentIndex > 0) {
      // Il y a un accord précédent
      const prevChordText = activeChords[currentIndex - 1];
      const prevChord = parseChord(prevChordText);
      
      // Calculer les notes de l'accord précédent
      const prevChordNotes = new Set([prevChord.root]);
      const prevThird = (prevChord.dim || prevChord.minor) ? 3 : 4;
      const prevFifth = prevChord.dim ? 6 : 7;
      
      prevChordNotes.add((prevChord.root + prevThird) % 12);
      prevChordNotes.add((prevChord.root + prevFifth) % 12);
      
      if (prevChord.dominant7 || (prevChord.minor && /7/.test(prevChord.name))) {
        prevChordNotes.add((prevChord.root + 10) % 12);
      }
      
      // Les notes cibles sont celles dans l'accord actuel MAIS PAS dans le précédent
      for (const note of chordNotes) {
        if (!prevChordNotes.has(note)) {
          targetNotes.add(note);
        }
      }
    }
  }

    // === PENTAS, FORMES & NOTES BLUES ===
  const pentaMinCb          = document.getElementById("pentaMin");
  const pentaMajCb          = document.getElementById("pentaMaj");
  const bluesNotesCb        = document.getElementById("bluesNotes");
  const globalBlueCb        = document.getElementById("showBlueNote");
  const showPentaPatternCb  = document.getElementById("showPentaPattern");
  const shapeMin7Maj6Cb     = document.getElementById("shapeMin7Maj6");
  const shapeMaj7Min6Cb     = document.getElementById("shapeMaj7Min6");
  const shapeMaj7BluesHexCb = document.getElementById("shapeMaj7BluesHex");
  const shapeMaj7DimMin6PentaCb = document.getElementById("shapeMaj7DimMin6Penta");

  // Pentas "classiques" du mode Blues
  const pentaMinBlues  = isBluesMode && (pentaMinCb?.checked ?? false);
  const pentaMajBlues  = isBluesMode && (pentaMajCb?.checked ?? false);
  const showBluesNotes = isBluesMode && (bluesNotesCb?.checked ?? false);

  // Option Pattern Penta (avec halo blanc)
  const useShowPentaPattern = !isNotesMode && (showPentaPatternCb?.checked ?? false);

  // Calques de formes (tous modes sauf Notes)
  const useShapeMin7Maj6     = !isNotesMode && (shapeMin7Maj6Cb?.checked ?? false);
  const useShapeMaj7Min6     = !isNotesMode && (shapeMaj7Min6Cb?.checked ?? false);
  const useShapeMaj7DimMin6Penta = !isNotesMode && (shapeMaj7DimMin6PentaCb?.checked ?? false);
  const useShapeMaj7BluesHex = !isNotesMode && (shapeMaj7BluesHexCb?.checked ?? false);

  let shapeMinSet = new Set(); // côté "mineur" des formes
  let shapeMajSet = new Set(); // côté "majeur" des formes

  // --- Formes Min7 / Maj6 ---
  if (useShapeMin7Maj6) {
    // Min7 : penta mineure sur la tonique de l'accord
    shapeMinSet = new Set(pentaMin(chord.root));

    // Maj6 : penta majeure sur la relative majeure (3 demi-tons au-dessus)
    const relMajRoot = (chord.root + 3) % 12;
    pentaMaj(relMajRoot).forEach(n => shapeMajSet.add(n));
  }

  // --- Formes Maj7 / Min6 ---
  if (useShapeMaj7Min6) {
    // Maj7 : penta majeure sur la tonique de l'accord
    pentaMaj(chord.root).forEach(n => shapeMajSet.add(n));

    // Min6 : penta mineure sur la relative mineure (9 demi-tons au-dessus)
    const relMinRoot = (chord.root + 9) % 12;
    pentaMin(relMinRoot).forEach(n => shapeMinSet.add(n));
  }

  // --- Forme Major7 (blues) HEXAPHONIC ---
  if (useShapeMaj7BluesHex) {
    // 1, 2, ♭3, 3, 5, 7 + blue note ♭3
    major7BluesHex(chord.root).forEach(n => shapeMajSet.add(n));
    shapeMajSet.add(major7BluesHexBlue(chord.root));
  }

  // --- Forme Major(7) / Diminished / Minor(6) PENTAPHONIC ---
  if (useShapeMaj7DimMin6Penta) {
    // Gamme pentaphonique modale : 1, 2, 3, 5, 6
    maj7DimMin6Penta(chord.root).forEach(n => shapeMajSet.add(n));
  }


  // --- Formes Min7 / Maj6 ---
  if (useShapeMin7Maj6) {
    // Min7 : penta mineure sur la tonique de l'accord
    shapeMinSet = new Set(pentaMin(chord.root));

    // Maj6 : penta majeure sur la relative majeure (3 demi-tons au-dessus)
    const relMajRoot = (chord.root + 3) % 12;
    pentaMaj(relMajRoot).forEach(n => shapeMajSet.add(n));
  }

  // --- Formes Maj7 / Min6 ---
  if (useShapeMaj7Min6) {
    // Maj7 : penta majeure sur la tonique de l'accord
    pentaMaj(chord.root).forEach(n => shapeMajSet.add(n));

    // Min6 : penta mineure sur la relative mineure (9 demi-tons au-dessus)
    const relMinRoot = (chord.root + 9) % 12;
    pentaMin(relMinRoot).forEach(n => shapeMinSet.add(n));
  }

  // Sets finaux utilisés partout (Blues + formes)
  let pentaMinSet = new Set(shapeMinSet);
  let pentaMajSet = new Set(shapeMajSet);

  if (pentaMinBlues) {
    pentaMin(chord.root).forEach(n => pentaMinSet.add(n));
  }
  if (pentaMajBlues) {
    pentaMaj(chord.root).forEach(n => pentaMajSet.add(n));
  }

  // Blue note typique (b5) de l'accord (pour le manche)
  const bluesNote = (chord.root + 3) % 12;  // ✅ Blue note = tierce mineure (♭3)

  // 👉 en Blues : checkbox "Notes blues"
  // 👉 en Pop/Rock : checkbox globale "Note blue (b5)"
  const showBlue =
    (isBluesMode && showBluesNotes) ||
    (!isBluesMode && (globalBlueCb?.checked ?? false));

  const bluesSet = showBlue ? new Set([bluesNote]) : new Set();

  const slowBlues = document.getElementById("bluesStyle")?.value === "slow";

  // ✅ PATTERN PENTA AVEC HALO : set séparé qui n'affecte que le halo blanc
  const pentaPatternHaloSet = new Set();
  if (useShowPentaPattern) {
    // Si l'accord est mineur, on affiche seulement la penta mineure
    // Sinon on affiche les deux : penta majeure ET penta mineure (hybride)
    if (chord.minor) {
      pentaMin(chord.root).forEach(n => pentaPatternHaloSet.add(n));
    } else {
      pentaMaj(chord.root).forEach(n => pentaPatternHaloSet.add(n));
      pentaMin(chord.root).forEach(n => pentaPatternHaloSet.add(n));
    }
  }

    // Quand une forme est active : le "pattern" = union des formes (+ éventuelle blue note)
  const shapeActive =
    !isNotesMode && (useShapeMin7Maj6 || useShapeMaj7Min6 || useShapeMaj7BluesHex);

  const patternSet = new Set();
  if (shapeActive) {
    shapeMinSet.forEach(n => patternSet.add(n));
    shapeMajSet.forEach(n => patternSet.add(n));
    if (showBlue) bluesSet.forEach(n => patternSet.add(n));
  }


  // --- Rendu du manche ---
  STRINGS.forEach(openString => {
    const openNoteIdx = n2i(openString);

    for (let f = 0; f < localFretCount; f++) {
      const fretNum = firstFret + f;
      const noteIdx = (openNoteIdx + fretNum) % 12;

      const cell = document.createElement("div");
      cell.className = "cell";

      if (fretNum === 0) {
        cell.classList.add("nut");
      } else {
        cell.classList.add("fret");
      }

      if ([3,5,7,9,15,17,19,21].includes(fretNum)) cell.classList.add("inlay");
      if (fretNum === 12) cell.classList.add("double-inlay");

            let role = null;

      if (isNotesMode) {
        if (noteFilterIdx !== null && noteIdx === noteFilterIdx) {
          role = "root"; // même style que la tonique
        }
      } else if (shapeActive && !patternSet.has(noteIdx)) {
        // Une forme est active → on n’affiche que les notes du pattern
        role = null;
      } else {
        const intervalFromRoot = (noteIdx - chord.root + 12) % 12;

        const chordToneArray = [...chordNotes];
        const isHalfStepBelowChord = chordToneArray.some(c => (noteIdx + 1) % 12 === c);
        const isHalfStepAboveChord = chordToneArray.some(c => (noteIdx + 11) % 12 === c);

        if (noteIdx === chord.root) {
          role = "root";
        } else if (targetNotes.has(noteIdx)) {
          // ✅ NOTE CIBLE prioritaire
          role = "target";
        } else if (bluesSet.has(noteIdx)) {
          role = "blues";
        } else if (chordNotes.has(noteIdx)) {
          role = "chord";
        } else if (pentaMinSet.has(noteIdx)) {
          role = "penta-minor";
        } else if (pentaMajSet.has(noteIdx)) {
          role = "penta-major";
        } else if (isBluesMode && slowBlues && [2,5,9].includes(intervalFromRoot)) {
          role = "floating"; // note planante (approche chromatique)
        } else if (!isBluesMode && scaleSet.has(noteIdx)) {
          if (isHalfStepBelowChord) {
            role = "floating"; // note planante (approche chromatique)
          } else if (isHalfStepAboveChord) {
            role = "avoid";
          } else {
            role = "ok";
          }
        } else if (scaleSet.has(noteIdx)) {
          role = "ok";
        } else if (useShowPentaPattern && pentaPatternHaloSet.has(noteIdx)) {
          // Afficher les notes de la penta hybride même si elles ne sont pas dans la gamme majeure
          if (isHalfStepBelowChord) {
            role = "floating";
          } else if (isHalfStepAboveChord) {
            role = "avoid";
          } else {
            role = "ok";
          }
        } else {
          role = null;
        }
      }
      
      // ✅ AJOUT : Vérifier si une gamme/mode est sélectionné et afficher en violet
      const hasScaleModeSelected = 
        (scaleMajorCb?.checked) || 
        (scaleMinorNaturalCb?.checked) || 
        (scaleMinorMelodicCb?.checked) ||
        (modeDorianCb?.checked) || 
        (modeAeolianCb?.checked) || 
        (modeLydianCb?.checked) ||
        (modeMixolydianCb?.checked) ||
        (modePhrygianCb?.checked) ||
        (modeLocrianCb?.checked);
      
      // Si une gamme/mode est sélectionnée et que la note en fait partie
      // on la marque en violet (mais on garde la priorité pour les notes d'accord)
      if (hasScaleModeSelected && combinedScaleSet.has(noteIdx) && !role) {
        role = "scale-highlight";
      }

      if (role) {
        const dot = document.createElement("div");
        dot.className = `note ${role}`;
        if (role === "root") dot.classList.add("root");

        // marquer les notes appartenant aux formes (pour un léger style dédié)
        if (!isNotesMode && shapeActive) {
          if (shapeMinSet.has(noteIdx)) dot.classList.add("shape-min7");
          if (shapeMajSet.has(noteIdx)) dot.classList.add("shape-maj6");
        }

        // ✅ HALO BLANC pour le pattern penta (indépendant des autres formes)
        if (!isNotesMode && useShowPentaPattern && pentaPatternHaloSet.has(noteIdx)) {
          dot.classList.add("shape-min7");
        }

        // ✅ HALO BLEU si c'est aussi une blue note
        if (!isNotesMode && bluesSet.has(noteIdx) && role !== "blues") {
          dot.classList.add("blue-halo");
        }

        dot.textContent = i2n(openNoteIdx + fretNum);
        cell.appendChild(dot);
      }


      fb.appendChild(cell);
    }
  });

  // --- Labels de frettes ---
  for (let i = 0; i < localFretCount; i++) {
    const num = firstFret + i;
    const div = document.createElement("div");
    div.textContent = num;

    if (HOT_FRETS.includes(num)) {
      div.classList.add("key-fret");
    }
    if (num === 12) {
      div.classList.add("octave-fret");
    }

    labels.appendChild(div);
  }

  // ================== LIGNE DE NOTES ==================
  const scaleNotesEl = document.getElementById("scaleNotes");
  if (scaleNotesEl) {

    // --- mapping anglais -> français pour la LIGNE DE NOTES ---
    const FR_NAMES = {
      C: "Do",
      D: "Ré",
      E: "Mi",
      F: "Fa",
      G: "Sol",
      A: "La",
      B: "Si"
    };

    function toFrenchName(eng) {
      if (!eng) return eng;
      const m = eng.match(/^([A-G])([#b]?)/i);
      if (!m) return eng;
      const letter = m[1].toUpperCase();
      const accidental = m[2] || "";
      let base = FR_NAMES[letter] || letter;
      if (accidental === "#") base += "♯";
      else if (accidental === "b") base += "♭";
      return base;
    }

    // MODE NOTES → affichage simplifié
    if (isNotesMode) {
      const noteName = noteSel ? noteSel.value : "C";
      const displayName = staffMode ? toFrenchName(noteName) : noteName;
      scaleNotesEl.innerHTML = `
        <span class="scale-notes-label">Note sélectionnée :</span>
        <div class="scale-notes-list">
          <span class="scale-note root">${displayName}</span>
        </div>
      `;
      return;
    }

    // Gamme de base : majeure (Pop/Rock) ou penta mineure (Blues)
    let orderedScale = isBluesMode ? pentaMin(keyRoot) : majorScale(keyRoot);

    // on tourne la gamme pour qu'elle commence sur la tonique de l'accord
    const idxInScale = orderedScale.indexOf(chord.root);
    if (idxInScale !== -1) {
      orderedScale = orderedScale
        .slice(idxInScale)
        .concat(orderedScale.slice(0, idxInScale));
    }

    // === INSERTION BLUE NOTE AU MILIEU ===
    // On insère la blue note dans la ligne de notes :
    //   • en Pop/Rock → si la case "Note blue (b5)" est cochée
    //   • en Blues    → si la case "Notes blues" est cochée
    let blueNoteIdx = null;
    let showBlueMid = false;

    if (!isBluesMode && (globalBlueCb?.checked ?? false)) {
      // Pop/Rock : b5 de l'accord courant
      blueNoteIdx = (chord.root + 3) % 12;  // ✅ Blue note = tierce mineure (♭3)
      showBlueMid = true;
    } else if (isBluesMode && showBluesNotes) {
      // Blues : b5 de la tonalité (toujours la même pour I, IV, V)
      blueNoteIdx = (keyRoot + 6) % 12;
      showBlueMid = true;
    }

    if (showBlueMid && blueNoteIdx !== null) {
      if (!orderedScale.includes(blueNoteIdx)) {
        const blueInt = (blueNoteIdx - chord.root + 12) % 12;
        const intervals = orderedScale.map(n => (n - chord.root + 12) % 12);

        let insertIndex = orderedScale.length;
        for (let i = 0; i < intervals.length - 1; i++) {
          if (intervals[i] <= blueInt && blueInt <= intervals[i + 1]) {
            insertIndex = i + 1;
            break;
          }
        }
        orderedScale.splice(insertIndex, 0, blueNoteIdx);
      }
    }

    // rôle des notes (même logique que sur le manche)
    const chordToneArray = [...chordNotes];

    // liste pour la portée
    let noteObjects = [];

    const notesHtml = orderedScale.map(noteIdx => {
      let role;
      const intervalFromRoot = (noteIdx - chord.root + 12) % 12;

      const isHalfStepBelowChord = chordToneArray.some(c => (noteIdx + 1) % 12 === c);
      const isHalfStepAboveChord = chordToneArray.some(c => (noteIdx + 11) % 12 === c);

      if (noteIdx === chord.root) {
        role = "root";
      } else if (noteIdx === blueNoteIdx && showBlueMid) {
        // ✅ Blue note prioritaire
        role = "blues";
      } else if (chordNotes.has(noteIdx)) {
        role = "chord";
      } else if (pentaMinSet.has(noteIdx)) {
        role = "penta-minor";
      } else if (pentaMajSet.has(noteIdx)) {
        role = "penta-major";
      } else if (!isBluesMode && scaleSet.has(noteIdx)) {
        if (isHalfStepBelowChord) role = "target";
        else if (isHalfStepAboveChord) role = "avoid";
        else role = "ok";
      } else {
        role = "ok";
      }

      const noteName = i2n(noteIdx);                 // notation américaine
      const displayName = staffMode                 // ce qu'on affiche dans les bulles
        ? toFrenchName(noteName)                    // → Do, Ré, Mi… en MODE PORTÉE
        : noteName;                                 // → C, D, E… en MODE MANCHE

      // pour la portée : on garde la note en notation américaine
      noteObjects.push({ note: noteName, role });

      // classes supplémentaires pour les calques sur la ligne
      let extraClasses = "";
      if (shapeMinSet.has(noteIdx)) extraClasses += " shape-min7";
      if (shapeMajSet.has(noteIdx)) extraClasses += " shape-maj6";
      if (noteIdx === blueNoteIdx && showBlueMid) extraClasses += " shape-blue";
      
      // ✅ HALO pour le pattern penta
      if (useShowPentaPattern && pentaPatternHaloSet.has(noteIdx)) {
        extraClasses += " shape-min7";
      }

      return `<span class="scale-note ${role}${extraClasses}">${displayName}</span>`;

    }).join("");

    // Créer l'affichage des notes caractéristiques de l'accord
    const chordTones = getChordTones(chord);
    const chordTonesText = chordTones.map(tone => `${tone.label}:${tone.note}`).join('  ');

    const label = chord.name;

    scaleNotesEl.innerHTML = `
      <span class="scale-notes-label">${label}</span>
      <div class="chord-tones-main">(${chordTonesText})</div>
      <div class="scale-notes-list">
        ${notesHtml}
      </div>
    `;

    // Si la portée est affichée → on la met à jour
    if (staffMode) {
      if (!noteObjects || noteObjects.length === 0) {
        noteObjects = [...chordNotes].map(n => ({
          note: i2n(n),
          role: "chord"
        }));
      }
      renderStaff(noteObjects);
    }
  }
  
  // ✅ Générer les mini-diagrammes pour chaque accord (mode Pop/Rock uniquement)
  renderMiniDiagrams();
}


// ================== INIT SELECT D'ACCORD POP ==================

populateChordDropdowns();

function initPopChordSelect(){
  const sel = document.getElementById("chordSel");
  if(!sel) return;
  sel.innerHTML = "";
  ["chord1","chord2","chord3","chord4","chord5","chord6","chord7","chord8"].forEach(id => {
    const el = document.getElementById(id);
    if(!el || el.style.display === 'none') return; // Ignorer les selects cachés
    const v = el.value.trim();
    if(v) sel.add(new Option(v));
  });
}

// ================== GESTION DES VUES 5 / 10 / 15 FRETTES ==================

const viewButtons = document.querySelectorAll(".view-toggle button");

function setFretsFromButton(btn){
  if(!btn) return;
  const frets = parseInt(btn.dataset.frets, 10) || 15;
  fretCount = frets;
  viewButtons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  
  // ✅ Ajuster la largeur de l'application selon le nombre de frettes
  const appElement = document.querySelector('.app');
  if (appElement) {
    // Supprimer les classes de largeur existantes
    appElement.classList.remove('frets-10', 'frets-15');
    
    // Ajouter la classe appropriée pour 10 ou 15 frettes
    if (frets === 10) {
      appElement.classList.add('frets-10');
    } else if (frets === 15) {
      appElement.classList.add('frets-15');
    }
  }
  
  render();
}

viewButtons.forEach(btn => {
  btn.addEventListener("click", () => setFretsFromButton(btn));
});

// ================== GESTION DES ONGLETS ==================

document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab, .mode").forEach(el => el.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.mode + "Mode").classList.add("active");

    const mode = tab.dataset.mode;
    const sel = document.getElementById("chordSel");

    if(mode === "blues"){
      // accords I / IV / V dans la tonalité choisie
      const key = document.getElementById("bluesKey").value;
      const keyRoot = n2i(key);
      const IV = i2n(keyRoot + 5);
      const V = i2n(keyRoot + 7);

      const chordsForGrid = [`${key}7`, `${IV}7`, `${V}7`];
      document.getElementById("bluesGrid").textContent = "Grille : " + chordsForGrid.join(" - ");

      if(sel){
        sel.innerHTML = "";
        [`${key}7 (I)`, `${IV}7 (IV)`, `${V}7 (V)`].forEach(c => sel.add(new Option(c)));
      }
    } else if (mode === "pop") {
      // mode Pop/Rock → on reprend les accords saisis
      initPopChordSelect();
    } else if (mode === "notes") {
      // rien de spécial : le manche dépend seulement de noteSel / startFret / vue
    }

    render();
  };
});


function renderStaff(noteObjects) {
  const canvas = document.getElementById("staffCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // === largeur de référence ===
  let width = 800;

  // 1) largeur du wrapper (toujours présent)
  const wrapper = document.getElementById("viewWrapper");
  if (wrapper) {
    const rect = wrapper.getBoundingClientRect();
    if (rect.width > 0) width = rect.width;
  }

  // 2) si le manche est visible, on peut affiner sur #fb
  const fb = document.getElementById("fb");
  if (fb) {
    const r = fb.getBoundingClientRect();
    if (r.width > 0) width = r.width;
  }

  canvas.width = width;
  canvas.height = 140; // portée compacte

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ======== PARAMS GÉNÉRAUX ========
  const top = 30;        // un peu plus haut
  const spacing = 12;    // distance entre les lignes
  const leftMargin = 70; // place pour la clé de sol & altérations

  // ======== DESSIN PORTÉE ========
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 2;

  for (let i = 0; i < 5; i++) {
    const y = top + i * spacing;
    ctx.beginPath();
    ctx.moveTo(leftMargin, y);
    ctx.lineTo(canvas.width - 20, y);
    ctx.stroke();
  }

  // ======== CLÉ DE SOL SIMPLE ========
  ctx.fillStyle = "#eee";
  ctx.font = "40px serif";
  try {
    ctx.fillText("𝄞", 28, top + spacing * 3.7);
  } catch {
    ctx.fillText("G", 28, top + spacing * 3.5);
  }

  // ======== POSITION DE RÉFÉRENCE DES NOTES (clé de sol) ========
  const pos = {
    C: top + spacing * 5.5, // Do sous la portée
    D: top + spacing * 5,
    E: top + spacing * 4.5,
    F: top + spacing * 4,
    G: top + spacing * 3.5,
    A: top + spacing * 3,
    B: top + spacing * 2.5,
  };

  if (!noteObjects || !noteObjects.length) return;

  const step = (canvas.width - leftMargin - 40) / (noteObjects.length + 1);
  let x = leftMargin + step;

  // noms français
  const FR_NAMES = {
    C: "Do",
    D: "Ré",
    E: "Mi",
    F: "Fa",
    G: "Sol",
    A: "La",
    B: "Si"
  };

  // les textes seront centrés
  ctx.textAlign = "center";

  noteObjects.forEach(n => {
    const raw = n.note;
    const m = raw.match(/^([A-G])([#b]?)/i);
    const letter = m ? m[1].toUpperCase() : raw[0].toUpperCase();
    const accidental = m && m[2] ? m[2] : null;

    const y = pos[letter] ?? pos.C;

    // --- nom français au-dessus de la portée ---
    const baseNameFr = FR_NAMES[letter] || letter;
    let label = baseNameFr;
    if (accidental === "#") label += "♯";
    else if (accidental === "b") label += "♭";

    ctx.fillStyle = "#eee";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText(label, x, top - 6); // au-dessus de la portée

    // --- couleur selon le rôle ---
    const colorMap = {
      root: "#ffeb3b",
      chord: "#aaaaaa",
      ok: "#8bc34a",
      target: "#ff9800",
      avoid: "#e53935",
      blues: "#2196f3",
      "penta-minor": "#9c27b0",
      "penta-major": "#ff5722"
    };
    const fill = colorMap[n.role] || "#ffffff";

    // Altération (# / b) à gauche de la note
    if (accidental) {
      ctx.fillStyle = "#eee";
      ctx.font = "18px serif";
      ctx.fillText(accidental === "#" ? "♯" : "♭", x - 18, y + 6);
    }

    // tête de note colorée
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.ellipse(x, y, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    x += step;
  });
}



// ================== TONALITÉ POP/ROCK — AUTO ==================

// Fonction appelée automatiquement dès qu'un accord change
function updatePopKeyFromChords() {
  const ids = ["chord1","chord2","chord3","chord4","chord5","chord6","chord7","chord8"];

  const inputs = ids
    .map(id => {
      const el = document.getElementById(id);
      if(!el || el.style.display === 'none') return null;
      return el.value.trim();
    })
    .filter(Boolean);

  const resultEl = document.getElementById("popResult");

  // Aucun accord saisi → on efface le message et on sort
  if (!inputs.length) {
    if (resultEl) resultEl.textContent = "";
    return;
  }

  const parsed = inputs.map(parseChord);
  const candidates = [];

  // On teste les 12 tonalités MAJEURES, MINEURES et DORIENNES
  for (let r = 0; r < 12; r++) {
    // MAJEUR
    const maj = scoreDiatonicKey(parsed, r, true);
    if (maj.explained >= 1) {
      candidates.push({
        key: i2n(r),
        mode: "majeur",
        score: maj.score,
        explained: maj.explained
      });
    }

    // MINEUR (gamme mineure naturelle)
    const min = scoreDiatonicKey(parsed, r, false);
    if (min.explained >= 1) {
      candidates.push({
        key: i2n(r) + "m",
        mode: "mineur",
        score: min.score,
        explained: min.explained
      });
    }

    // DORIEN (mode ii - mineur avec 6ème majeure)
    const dor = scoreDiatonicKey(parsed, r, false, dorianScale(r), DORIAN_DEG_QUALITIES);
    if (dor.explained >= 1) {
      candidates.push({
        key: i2n(r) + "m",
        mode: "dorien",
        score: dor.score,
        explained: dor.explained
      });
    }
  }

  // on trie : meilleur score, puis plus d'accords expliqués, puis majeur avant mineur
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.explained !== a.explained) return b.explained - a.explained;
    if (a.mode !== b.mode) return a.mode === "majeur" ? -1 : 1;
    return 0;
  });

  const best = candidates[0];

  if (best && resultEl) {
    resultEl.textContent =
      `Tonalité probable : ${best.key} (${best.mode}) – ` +
      `${best.explained}/${inputs.length} accord(s) expliqué(s)`;

    // on garde la racine MAJEURE pour l'affichage du manche
    currentKeyRoot = n2i(best.key.replace("m", ""));
    
    // ✅ Positionnement automatique du fret de départ optimal
    const optimalFret = getOptimalFretPosition(currentKeyRoot);
    const startFretSelect = document.getElementById("startFret");
    if (startFretSelect) {
      startFretSelect.value = optimalFret;
    }
  } else if (resultEl) {
    resultEl.textContent = "Aucune tonalité claire détectée";
  }

  // Met à jour la liste "Accord actuel" avec les accords saisis
  const sel = document.getElementById("chordSel");
  if (sel) {
    sel.innerHTML = "";
    inputs.forEach(ch => sel.add(new Option(ch)));
  }

  // ✅ DÉTECTION AUTOMATIQUE DU MODE
  if (inputs.length > 0) {
    try {
      console.log("🔍 Détection du mode pour les accords:", inputs);
      const detection = detectMode(inputs);
      console.log("📊 Résultat détection:", detection);
      
      if (detection && detection.confidence >= 0.5) {
        console.log("✅ Application du mode détecté");
        applyDetectedMode(detection);
        
        // Afficher le mode détecté dans l'interface
        if (resultEl) {
          resultEl.textContent += ` | Mode suggéré : ${getModeName(detection.mode)} (${Math.round(detection.confidence * 100)}%)`;
        }
      } else {
        console.warn("⚠️ Confiance trop faible:", detection?.confidence);
      }
    } catch (error) {
      console.error("❌ Erreur détection mode:", error);
    }
  }

  render();
}

// Quand un des 8 accords Pop/Rock change → recalcul auto de la tonalité
["chord1","chord2","chord3","chord4","chord5","chord6","chord7","chord8"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("change", updatePopKeyFromChords);
  }
});

// On masque le bouton "Trouver la tonalité" (plus besoin)
const findKeyBtn = document.getElementById("findKey");
if (findKeyBtn) {
  findKeyBtn.style.display = "none";
  // Si tu veux garder la possibilité de cliquer quand même :
  // findKeyBtn.onclick = updatePopKeyFromChords;
}



// ================== AUTRES ÉCOUTEURS ==================

["pentaMin","pentaMaj","bluesNotes","bluesStyle",
 "startFret","chordSel","showBlueNote","noteSel",
 "showPentaPattern","shapeMin7Maj6","shapeMaj7Min6","shapeMaj7DimMin6Penta","shapeMaj7BluesHex",
 "scaleMajor","scaleMinorNatural","scaleMinorMelodic",
 "modeDorian","modeAeolian","modeLydian","modeMixolydian","modePhrygian","modeLocrian"
].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener("change", render);
});



// changement de tonalité blues → met à jour la grille et les accords
const bluesKeySelect = document.getElementById("bluesKey");
if(bluesKeySelect){
  bluesKeySelect.addEventListener("change", () => {
    const key = bluesKeySelect.value;
    const keyRoot = n2i(key);
    const IV = i2n(keyRoot + 5);
    const V = i2n(keyRoot + 7);

    const chordsForGrid = [`${key}7`, `${IV}7`, `${V}7`];
    document.getElementById("bluesGrid").textContent = "Grille : " + chordsForGrid.join(" - ");

    const sel = document.getElementById("chordSel");
    if(document.querySelector(".tab.active").dataset.mode === "blues" && sel){
      sel.innerHTML = "";
      [`${key}7 (I)`, `${IV}7 (IV)`, `${V}7 (V)`].forEach(c => sel.add(new Option(c)));
    }
    render();
  });
}

// ==== SWITCH MANCHE <-> PORTÉE (sans flip 3D) ====
const fretView = document.getElementById("fretView");
const staffView = document.getElementById("staffView");
const toggleBtn = document.getElementById("toggleStaff");

if (toggleBtn && fretView && staffView) {
  toggleBtn.addEventListener("click", () => {
    staffMode = !staffMode;

    if (staffMode) {
      // Afficher la portée
      fretView.classList.remove("visible");
      staffView.classList.add("visible");
      toggleBtn.textContent = "🎸 Manche";
    } else {
      // Revenir au manche
      staffView.classList.remove("visible");
      fretView.classList.add("visible");
      toggleBtn.textContent = "🎼 Portée";
    }

    // On redessine tout en fonction du mode courant
    render();
    
    // Rafraîchir les mini-diagrammes/portées
    renderMiniDiagrams();
  });
}




// ================== STYLE DES INLAYS ==================

const inlayStyle = document.createElement("style");
inlayStyle.textContent = `
  .inlay::before {
    content:"";
    position:absolute;
    width:12px;
    height:12px;
    background:#666;
    border-radius:50%;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:1;
  }

  /* 12e case : 2 points jaunes bien visibles */
  .double-inlay::before {
    content:"";
    position:absolute;
    width:12px;
    height:12px;
    border-radius:50%;
    background:#ffeb3b;
    top:40%;
    left:50%;
    transform:translateX(-50%);
    z-index:1;
    /* deuxième point en dessous du premier */
    box-shadow:0 18px 0 #666;
  }
`;
document.head.appendChild(inlayStyle);


function initStartFretSelect() {
  const sel = document.getElementById("startFret");
  if (!sel) return;

  sel.innerHTML = "";

  for (let f = 1; f <= 21; f++) {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;

    if (HOT_FRETS.includes(f)) {
      opt.classList.add("hot-fret");
    }

    if (f === 5) opt.selected = true; // comme avant
    sel.appendChild(opt);
  }
}


// ================== INITIALISATION ==================

// accords init pour le mode Pop
initPopChordSelect();

// options de frettes de départ 1–21
initStartFretSelect();

// accords init pour le mode Pop
initPopChordSelect();

// vue par défaut : 5 frettes pour TOUT (Pop & Blues & Notes)
const defaultBtn5 = document.querySelector('.view-toggle button[data-frets="5"]');
if(defaultBtn5) {
  setFretsFromButton(defaultBtn5);
} else {
  render();
}

// Bouton : génération aléatoire
const genRandomBtn = document.getElementById("generateRandom");
if(genRandomBtn){
  genRandomBtn.addEventListener("click", generateDiatonicProgression);
}

// Fonction de chargement de chanson
function loadSongChords(){
  const selectedItem = document.querySelector('.song-item.selected');
  if(!selectedItem){
    alert('Veuillez choisir une chanson');
    return;
  }
  
  const songKey = selectedItem.dataset.song;
  if(!songKey || !SONGS_DATABASE[songKey]){
    alert('Chanson invalide');
    return;
  }
  
  const song = SONGS_DATABASE[songKey];
  const ids = ["chord1","chord2","chord3","chord4","chord5","chord6","chord7","chord8"];
  
  // Afficher/masquer les selects en fonction du nombre d'accords
  ids.forEach((id, idx) => {
    const sel = document.getElementById(id);
    if(!sel) return;
    
    if(idx < song.chords.length){
      sel.style.display = '';
      sel.value = song.chords[idx];
    } else {
      sel.style.display = 'none';
      sel.value = song.chords[0]; // valeur par défaut
    }
  });
  
  document.getElementById('songListWrapper').style.display = 'none';
  
  initPopChordSelect();
  updatePopKeyFromChords();
  
  const resultEl = document.getElementById("popResult");
  if(resultEl){
    setTimeout(() => {
      resultEl.textContent = `🎵 ${song.name} - ${song.artist}  |  ` + resultEl.textContent;
    }, 100);
  }
}

// Bouton chanson
const chooseSongBtn = document.getElementById("chooseSong");
if(chooseSongBtn){
  chooseSongBtn.addEventListener("click", () => {
    const wrapper = document.getElementById('songListWrapper');
    wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
  });
}

// Bouton charger
const loadSongBtn = document.getElementById("loadSong");
if(loadSongBtn){
  loadSongBtn.addEventListener("click", loadSongChords);
}

// Bouton annuler
const cancelSongBtn = document.getElementById("cancelSong");
if(cancelSongBtn){
  cancelSongBtn.addEventListener("click", () => {
    document.getElementById('songListWrapper').style.display = 'none';
  });
}

// Gestion de la sélection et du double-clic sur la liste des chansons
const songListEl = document.getElementById("songList");
if(songListEl){
  // Gestion de la sélection
  songListEl.addEventListener("click", (e) => {
    const item = e.target.closest('.song-item');
    if(!item) return;
    
    // Désélectionner toutes les chansons
    document.querySelectorAll('.song-item').forEach(el => el.classList.remove('selected'));
    // Sélectionner la chanson cliquée
    item.classList.add('selected');
  });
  
  // Gestion du double-clic
  songListEl.addEventListener("dblclick", (e) => {
    const item = e.target.closest('.song-item');
    if(!item) return;
    
    // Sélectionner et charger
    document.querySelectorAll('.song-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    loadSongChords();
  });
}

// Calcul initial de la tonalité avec les accords par défaut
updatePopKeyFromChords();

// Gestion du simple/double clic sur les selects d'accords
document.querySelectorAll('.chord-select').forEach(select => {
  let clickTimer = null;
  
  // Empêcher l'ouverture normale du select
  select.addEventListener('mousedown', (e) => {
    if(clickTimer !== null) {
      // Double-clic détecté - laisser le select s'ouvrir
      clearTimeout(clickTimer);
      clickTimer = null;
      return;
    }
    
    // Premier clic - empêcher l'ouverture et démarrer le timer
    e.preventDefault();
    
    clickTimer = setTimeout(() => {
      // Simple clic confirmé - changer l'accord actuel
      const chordSelSelect = document.getElementById('chordSel');
      if(chordSelSelect && select.value) {
        // Trouver l'option correspondante dans chordSel
        for(let i = 0; i < chordSelSelect.options.length; i++) {
          if(chordSelSelect.options[i].value === select.value) {
            chordSelSelect.selectedIndex = i;
            // Déclencher l'événement change pour mettre à jour l'affichage
            chordSelSelect.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
      clickTimer = null;
    }, 250);
  });
});


