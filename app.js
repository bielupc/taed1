// ============================================================
// EL MANDAT — Reigns-style game (Button/Arrow based)
// ============================================================

// El contingut de cartes, text i gameOvers s'agafa de la variable global "gameData", arxiu data.js inclòs al DOM

// Supabase configuration
// TODO: Replace with your actual Supabase project details from https://supabase.com
// 1. Get SUPABASE_URL from Project Settings → API → Project URL
// 2. Get SUPABASE_ANON_KEY from Project Settings → API → Project API keys → anon public
const SUPABASE_URL = 'https://mkjzgazwxmicshjpzunj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_-Of2XplTN06GbkJWQCrlgA_Agu-B9DD';
let supabaseClient = null;

// Initialize Supabase client when available
if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

let stats = { pacients: 50, metges: 50, pressupost: 50, mediAmbient: 50 };

let currentIndex = 0;
let shuffledDeck = [];

let gameOver = false;

// Track all decisions made during the game
let decisionsHistory = [];

// Mobile double-tap functionality
let isTouchDevice = false;
let previewedButton = null; // Track which button is currently showing preview ('left', 'right', or null)
let mobileHintShown = false; // Track if hint has been shown

// DOM variables
const screenIntro = document.getElementById('screen-intro');
const screenGame = document.getElementById('screen-game');
const screenEnd = document.getElementById('screen-end');

const cardEl = document.getElementById('card');
const cardCharEl = document.getElementById('card-character');
const cardTextEl = document.getElementById('card-text');

const turnNum = document.getElementById('turn-num');

const btnLeft = document.getElementById('btn-swipe-left');
const btnRight = document.getElementById('btn-swipe-right');
const labelLeft = document.getElementById('label-left');
const labelRight = document.getElementById('label-right');

function showScreen(el) {
    [screenIntro, screenGame, screenEnd].forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    el.classList.remove('hidden');
    el.classList.add('active');
}

function shuffleArray(arr) {
    // Si hi hagués cartes fixes al final com ultimàtums, podriem guardar-les així
    // De moment deixem l'última carta d'ultimàtum fora de la barreja si cal, però el deck són generalment lliures i n'agafem fins morir:
    let tempArray = [...arr];
    for (let i = tempArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
    }
    return tempArray;
}

function clamp(val) { return Math.max(0, Math.min(100, val)); }

function updateBars() {
    const keys = ['pacients', 'metges', 'pressupost', 'mediAmbient'];
    keys.forEach(k => {
        const fill = document.getElementById('fill-' + k);
        const val = stats[k];
        fill.style.width = val + '%';
        fill.classList.remove('warn', 'danger');
        if (val <= 20 || val >= 80) fill.classList.add('danger');
        else if (val <= 35 || val >= 65) fill.classList.add('warn');
    });
}

function checkGameOver() {
    const keys = ['pacients', 'metges', 'pressupost', 'mediAmbient'];

    // Hem mort per balanç extrem?
    for (const k of keys) {
        if (stats[k] <= 0) { endGame(k, 'low'); return true; }
        if (stats[k] >= 100) { endGame(k, 'high'); return true; }
    }
    // Si hem completat totes les decisions (16/16)
    if (currentIndex >= shuffledDeck.length) {
        endGame('SUCCESS', 'win');
        return true;
    }
    return false;
}

function applyImpact(impact) {
    if (!impact) return;
    const keys = ['pacients', 'metges', 'pressupost', 'mediAmbient'];
    keys.forEach(k => {
        if (impact.hasOwnProperty(k)) {
            stats[k] = clamp(stats[k] + impact[k]);
            if (impact[k] !== 0) {
                const barItem = document.getElementById('bar-' + k);
                barItem.classList.remove('shake');
                void barItem.offsetWidth;
                barItem.classList.add('shake');
            }
        }
    });
    updateBars();
}

function showImpactPreview(impact) {
    if (gameOver || !impact) return;
    const keys = ['pacients', 'metges', 'pressupost', 'mediAmbient'];
    const ids = ['ip-pacients', 'ip-metges', 'ip-pressupost', 'ip-mediAmbient'];
    keys.forEach((k, i) => {
        const dot = document.getElementById(ids[i]);
        dot.classList.remove('up', 'down');
        const val = impact[k] || 0;
        if (val > 0) dot.classList.add('up');
        else if (val < 0) dot.classList.add('down');
    });
}

function clearImpactPreview() {
    ['ip-pacients', 'ip-metges', 'ip-pressupost', 'ip-mediAmbient'].forEach(id => {
        document.getElementById(id).classList.remove('up', 'down');
    });
}

function renderCard() {
    let theDeck = window.gameData ? window.gameData.deck : [];
    if (currentIndex >= theDeck.length) { checkGameOver(); return; }
    const c = theDeck[currentIndex];

    cardCharEl.textContent = c.character;
    cardTextEl.textContent = c.text;
    labelLeft.textContent = c.leftLabel;
    labelRight.textContent = c.rightLabel;
    turnNum.textContent = currentIndex + 1;

    clearImpactPreview();
    previewedButton = null; // Reset preview state for new card
    btnLeft.classList.remove('previewing');
    btnRight.classList.remove('previewing');

    // Show mobile hint on first card
    if (currentIndex === 0) {
        showMobileHint();
    }

    // resetejar animacions de la carta visuals
    cardEl.style.transform = '';
    cardEl.style.opacity = '1';
    cardEl.style.transition = 'none';
    void cardEl.offsetWidth;
    cardEl.style.transition = '';

    cardEl.style.animation = 'none';
    void cardEl.offsetWidth;
    cardEl.style.animation = 'fadeIn 0.35s ease forwards';
}

function choose(direction) {
    if (gameOver) return;
    let theDeck = window.gameData ? window.gameData.deck : [];
    const c = theDeck[currentIndex];

    // Controlar errors si theDeck no estava llest
    if (!c) return;

    const impact = direction === 'left' ? c.leftImpact : c.rightImpact;
    const label = direction === 'left' ? c.leftLabel : c.rightLabel;

    // Track this decision
    decisionsHistory.push({
        turn: currentIndex + 1,
        character: c.character,
        decision: direction, // 'left' or 'right'
        label: label
    });

    applyImpact(impact);
    clearImpactPreview();

    // Animació visual simple per fora
    const xOff = direction === 'left' ? -150 : 150;
    const rot = direction === 'left' ? -8 : 8;
    cardEl.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s';
    cardEl.style.transform = `translateX(${xOff}px) rotate(${rot}deg) scale(0.9)`;
    cardEl.style.opacity = '0';

    setTimeout(() => {
        currentIndex++;
        if (!checkGameOver()) {
            renderCard();
        }
    }, 320);
}

// Controls
// Detect if device supports touch
window.addEventListener('touchstart', function detectTouch() {
    isTouchDevice = true;
    window.removeEventListener('touchstart', detectTouch);
}, { passive: true });

function showMobileHint() {
    if (isTouchDevice && !mobileHintShown) {
        const hint = document.getElementById('mobile-hint');
        if (hint) {
            hint.classList.add('visible');
        }
    }
}

function hideMobileHint() {
    if (!mobileHintShown) {
        mobileHintShown = true;
        const hint = document.getElementById('mobile-hint');
        if (hint) {
            setTimeout(() => {
                hint.classList.remove('visible');
            }, 300);
        }
    }
}

btnLeft.addEventListener('click', () => {
    if (isTouchDevice) {
        hideMobileHint();
        // On mobile: first click shows preview, second click executes
        if (previewedButton === 'left') {
            choose('left');
            previewedButton = null;
            btnLeft.classList.remove('previewing');
        } else {
            previewedButton = 'left';
            showImpactPreview(getImpactPreviewData(currentIndex, 'left'));
            btnLeft.classList.add('previewing');
            btnRight.classList.remove('previewing');
        }
    } else {
        // On desktop: single click executes immediately
        choose('left');
    }
});

btnRight.addEventListener('click', () => {
    if (isTouchDevice) {
        hideMobileHint();
        // On mobile: first click shows preview, second click executes
        if (previewedButton === 'right') {
            choose('right');
            previewedButton = null;
            btnRight.classList.remove('previewing');
        } else {
            previewedButton = 'right';
            showImpactPreview(getImpactPreviewData(currentIndex, 'right'));
            btnRight.classList.add('previewing');
            btnLeft.classList.remove('previewing');
        }
    } else {
        // On desktop: single click executes immediately
        choose('right');
    }
});

// Usar theDeck per agafar bé
function getImpactPreviewData(index, direction) {
    if (!window.gameData) return null;
    if (window.gameData.deck[index]) {
        return direction === 'left' ? window.gameData.deck[index].leftImpact : window.gameData.deck[index].rightImpact;
    }
    return null;
}

// Desktop hover effects (only apply on non-touch devices)
btnLeft.addEventListener('mouseenter', () => {
    if (!isTouchDevice) {
        showImpactPreview(getImpactPreviewData(currentIndex, 'left'));
    }
});
btnLeft.addEventListener('mouseleave', () => {
    if (!isTouchDevice) {
        clearImpactPreview();
    }
});

btnRight.addEventListener('mouseenter', () => {
    if (!isTouchDevice) {
        showImpactPreview(getImpactPreviewData(currentIndex, 'right'));
    }
});
btnRight.addEventListener('mouseleave', () => {
    if (!isTouchDevice) {
        clearImpactPreview();
    }
});

window.addEventListener('keydown', e => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft') {
        showImpactPreview(getImpactPreviewData(currentIndex, 'left'));
        btnLeft.classList.add('keyboard-active');
        setTimeout(() => { btnLeft.classList.remove('keyboard-active'); choose('left'); }, 150);
    }
    if (e.key === 'ArrowRight') {
        showImpactPreview(getImpactPreviewData(currentIndex, 'right'));
        btnRight.classList.add('keyboard-active');
        setTimeout(() => { btnRight.classList.remove('keyboard-active'); choose('right'); }, 150);
    }
});

// Save game results to Supabase
async function saveResultsToSupabase(failReason) {
    // Skip if Supabase is not configured
    if (!supabaseClient || SUPABASE_URL.includes('your-project')) {
        console.log('Supabase not configured - skipping save');
        return false;
    }

    try {
        const gameData = {
            turns_completed: currentIndex,
            fail_reason: failReason,
            decisions: decisionsHistory,
            final_stats: {
                pacients: stats.pacients,
                metges: stats.metges,
                pressupost: stats.pressupost,
                mediAmbient: stats.mediAmbient
            }
        };

        const { data, error } = await supabaseClient
            .from('game_results')
            .insert([gameData]);

        if (error) {
            console.error('Error saving to Supabase:', error);
            return false;
        }
        
        console.log('✓ Results saved successfully');
        return true;
    } catch (err) {
        console.error('Failed to save:', err);
        return false;
    }
}

function endGame(whichBar, level) {
    gameOver = true;
    
    // Determine fail reason and save to Supabase
    let failReason;
    if (whichBar === 'SUCCESS') {
        failReason = 'success';
    } else {
        failReason = `${whichBar}_${level}`; // e.g., "pacients_low", "metges_high"
    }
    
    // Save results to Supabase (async, doesn't block UI)
    saveResultsToSupabase(failReason);
    
    let data = { headline: "Crisi General", reason: "Destituït" };

    // Obtenir resultat final de data.js segons el "GameOver" donat
    if (window.gameData && window.gameData.gameOvers && window.gameData.gameOvers[whichBar] && window.gameData.gameOvers[whichBar][level]) {
        data = window.gameData.gameOvers[whichBar][level];
    }

    document.getElementById('end-title').textContent = (whichBar === 'SUCCESS') ? '🎉 Mandat Complet' : '⚠️ Mandat Finalitzat';
    document.getElementById('end-headline').textContent = data.headline;
    document.getElementById('end-reason').textContent = data.reason;

    const barsContainer = document.getElementById('end-bars');
    barsContainer.innerHTML = '';
    const colors = { pacients: '#a855f7', metges: '#3b82f6', pressupost: '#f59e0b', mediAmbient: '#10b981' };
    const names = { pacients: 'Pacients', metges: 'Metges', pressupost: 'Pressupost', mediAmbient: 'Medi Ambient' };
    const svgIcons = {
        pacients: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        metges: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>',
        pressupost: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>',
        mediAmbient: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'
    };

    Object.keys(stats).forEach(k => {
        const row = document.createElement('div');
        row.className = 'end-bar-row';
        row.innerHTML = `
            <div class="end-bar-header">
                <span style="display:flex;align-items:center;gap:6px;">${svgIcons[k]} ${names[k]}</span>
                <span style="color:${colors[k]};font-weight:700">${stats[k]}%</span>
            </div>
            <div class="end-bar-track">
                <div class="end-bar-fill" style="width:0%;background:${colors[k]}"></div>
            </div>
        `;
        barsContainer.appendChild(row);
        setTimeout(() => {
            row.querySelector('.end-bar-fill').style.width = stats[k] + '%';
        }, 200);
    });



    showScreen(screenEnd);
}

document.getElementById('btn-start').addEventListener('click', () => {
    stats = { pacients: 50, metges: 50, pressupost: 50, mediAmbient: 50 };
    currentIndex = 0;

    gameOver = false;
    mobileHintShown = false; // Reset hint for new game
    decisionsHistory = []; // Reset decisions tracking

    // Assegurar que hi ha dades per fer la barreja inicial
    if (window.gameData) {
        shuffledDeck = shuffleArray([...window.gameData.deck]);
    } else {
        alert("Error de càrrega JSON de les dades (data.js)");
    }

    updateBars();
    renderCard();
    showScreen(screenGame);
});
