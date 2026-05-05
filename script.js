// ===== STARS =====
(function() {
  const c = document.getElementById('stars');
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s;opacity:${Math.random()*0.6+0.2}`;
    c.appendChild(s);
  }
})();

// ===== DATABASE (localStorage) =====
const DB = {
  getUsers() { return JSON.parse(localStorage.getItem('qz_users') || '{}'); },
  saveUsers(u) { localStorage.setItem('qz_users', JSON.stringify(u)); },
  getSession() { return localStorage.getItem('qz_session') || null; },
  saveSession(u) { localStorage.setItem('qz_session', u); },
  clearSession() { localStorage.removeItem('qz_session'); },
  getHistory(user) {
    const all = JSON.parse(localStorage.getItem('qz_history') || '{}');
    return all[user] || [];
  },
  addHistory(user, entry) {
    const all = JSON.parse(localStorage.getItem('qz_history') || '{}');
    if (!all[user]) all[user] = [];
    all[user].unshift(entry);
    if (all[user].length > 10) all[user].pop();
    localStorage.setItem('qz_history', JSON.stringify(all));
  }
};

// ===== QUESTIONS =====
const QUESTIONS = {
  cultura: [
    { e:'🌎', q:'Qual é a capital do Brasil?', o:['Brasília','São Paulo','Rio de Janeiro','Salvador'], a:0 },
    { e:'📚', q:'Quem escreveu "Dom Casmurro"?', o:['José de Alencar','Machado de Assis','Carlos Drummond','Clarice Lispector'], a:1 },
    { e:'🗺️', q:'Qual é o maior país do mundo em área?', o:['China','Canadá','Rússia','EUA'], a:2 },
    { e:'🏛️', q:'Qual civilização construiu as pirâmides de Gizé?', o:['Romana','Grega','Egípcia','Mesopotâmica'], a:2 },
    { e:'🎨', q:'Quem pintou a Mona Lisa?', o:['Michelangelo','Rafael','Leonardo da Vinci','Picasso'], a:2 },
    { e:'🌊', q:'Qual é o maior oceano do mundo?', o:['Atlântico','Índico','Ártico','Pacífico'], a:3 },
    { e:'⚽', q:'Qual país ganhou mais Copas do Mundo de futebol?', o:['Argentina','Alemanha','Brasil','Itália'], a:2 },
    { e:'🔭', q:'Quem foi o primeiro humano a ir ao espaço?', o:['Neil Armstrong','Buzz Aldrin','Yuri Gagarin','Alan Shepard'], a:2 },
    { e:'🎭', q:'Quem escreveu "Romeu e Julieta"?', o:['Victor Hugo','Shakespeare','Cervantes','Dante'], a:1 },
    { e:'💡', q:'Quem inventou a lâmpada elétrica?', o:['Nikola Tesla','Benjamin Franklin','Thomas Edison','Albert Einstein'], a:2 },
  ],
  ciencias: [
    { e:'🪐', q:'Qual é o maior planeta do sistema solar?', o:['Saturno','Netuno','Urano','Júpiter'], a:3 },
    { e:'🧬', q:'Qual molécula carrega as informações genéticas?', o:['RNA','ATP','DNA','Proteína'], a:2 },
    { e:'💧', q:'Qual é a fórmula química da água?', o:['CO2','H2O','NaCl','O2'], a:1 },
    { e:'🦕', q:'Há quantos anos os dinossauros se extinguiram?', o:['6 mil anos','6 milhões','65 milhões','650 mil'], a:2 },
    { e:'⚛️', q:'Qual é o elemento mais abundante no universo?', o:['Oxigênio','Carbono','Hélio','Hidrogênio'], a:3 },
    { e:'🌡️', q:'A que temperatura a água ferve ao nível do mar?', o:['90°C','95°C','100°C','110°C'], a:2 },
    { e:'🦁', q:'Qual é o animal terrestre mais rápido?', o:['Leão','Guepardo','Cavalo','Avestruz'], a:1 },
    { e:'🌙', q:'Quantos dias a Lua leva para orbitar a Terra?', o:['7 dias','14 dias','28 dias','365 dias'], a:2 },
    { e:'🧠', q:'Qual órgão controla o sistema nervoso?', o:['Coração','Pulmão','Fígado','Cérebro'], a:3 },
    { e:'☀️', q:'Quantos planetas existem no sistema solar?', o:['7','8','9','10'], a:1 },
  ],
  games: [
    { e:'🎮', q:'Em qual jogo aparece o personagem Mario?', o:['Sonic','Zelda','Super Mario','Pokémon'], a:2 },
    { e:'🟡', q:'Em Pac-Man, qual é o objetivo principal?', o:['Destruir inimigos','Comer fantasmas','Comer pontos e fugir','Construir labirintos'], a:2 },
    { e:'🔴', q:'Qual jogo tem o personagem Kratos?', o:['Halo','God of War','The Witcher','Dark Souls'], a:1 },
    { e:'🎯', q:'Qual é o jogo Battle Royale mais famoso do mundo?', o:['PUBG','Warzone','Fortnite','Apex Legends'], a:2 },
    { e:'🏎️', q:'Em qual jogo você pode construir qualquer coisa com blocos?', o:['Roblox','Minecraft','Terraria','Fortnite'], a:1 },
    { e:'🎲', q:'Qual empresa criou o Playstation?', o:['Microsoft','Nintendo','Sega','Sony'], a:3 },
    { e:'🌟', q:'Qual é a série de RPG mais vendida de todos os tempos?', o:['Final Fantasy','Pokémon','Dragon Quest','The Elder Scrolls'], a:1 },
    { e:'🕹️', q:'Em League of Legends, como se chama a moeda do jogo?', o:['Gold','Coins','Essence','Gems'], a:0 },
    { e:'🐉', q:'Qual personagem é o protagonista de The Legend of Zelda?', o:['Zelda','Ganon','Link','Epona'], a:2 },
    { e:'🎪', q:'Qual jogo tem como lema "Catch \'em all"?', o:['Digimon','Temtem','Coromon','Pokémon'], a:3 },
  ],
  pop: [
    { e:'🎵', q:'Qual artista lançou o álbum "Renaissance"?', o:['Rihanna','Beyoncé','Adele','Taylor Swift'], a:1 },
    { e:'🎬', q:'Qual filme tem a frase "Que a força esteja com você"?', o:['Star Trek','Avatar','Star Wars','Interestelar'], a:2 },
    { e:'📺', q:'Qual série tem os personagens Mike, Eleven e Dustin?', o:['Dark','La Casa de Papel','Stranger Things','The Witcher'], a:2 },
    { e:'🎤', q:'Qual cantor é conhecido como "Rei do Pop"?', o:['Elvis Presley','Prince','David Bowie','Michael Jackson'], a:3 },
    { e:'🦸', q:'Qual super-herói é conhecido como o "Homem de Ferro"?', o:['Steve Rogers','Tony Stark','Bruce Banner','Clint Barton'], a:1 },
    { e:'🎶', q:'De qual país é o grupo BTS?', o:['Japão','China','Coreia do Sul','Tailândia'], a:2 },
    { e:'🏆', q:'Qual série ganhou mais Emmy Awards seguidos?', o:['Breaking Bad','The Wire','Game of Thrones','Succession'], a:2 },
    { e:'🎭', q:'Qual artista é conhecida como "Mother Monster"?', o:['Katy Perry','Lady Gaga','Ariana Grande','Billie Eilish'], a:1 },
    { e:'🌊', q:'Qual filme animado tem como personagem Moana?', o:['Frozen','Encanto','Moana','Luca'], a:2 },
    { e:'🎸', q:'Qual banda gravou "Bohemian Rhapsody"?', o:['Led Zeppelin','The Beatles','Queen','Rolling Stones'], a:2 },
  ]
};

const GAME_NAMES = { cultura:'Cultura Geral', ciencias:'Ciências & Natureza', games:'Mundo dos Games', pop:'Cultura Pop' };
const GAME_EMOJIS = { cultura:'🌍', ciencias:'🔬', games:'🕹️', pop:'🎵' };

// ===== STATE =====
let currentUser = null;
let currentGame = null;
let currentQ = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let answered = false;
let currentCategory = '';

// ===== UTILS =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3500);
}
function showSuccess(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.style.display = 'block';
}

// ===== AUTH =====
function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const user = document.getElementById('reg-user').value.trim().toLowerCase();
  const pass = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;

  if (!name || !user || !pass) return showError('reg-error','Preencha todos os campos!');
  if (user.length < 3) return showError('reg-error','Usuário deve ter pelo menos 3 caracteres!');
  if (pass.length < 6) return showError('reg-error','Senha deve ter pelo menos 6 caracteres!');
  if (pass !== pass2) return showError('reg-error','As senhas não conferem!');

  const users = DB.getUsers();
  if (users[user]) return showError('reg-error','Esse usuário já existe!');

  users[user] = { name, pass, totalScore: 0 };
  DB.saveUsers(users);
  showSuccess('reg-success','Conta criada! Faça login agora 🎉');
  setTimeout(() => {
    document.getElementById('log-user').value = user;
    showScreen('login');
  }, 1500);
}

function doLogin() {
  const user = document.getElementById('log-user').value.trim().toLowerCase();
  const pass = document.getElementById('log-pass').value;

  if (!user || !pass) return showError('log-error','Preencha usuário e senha!');
  const users = DB.getUsers();
  if (!users[user]) return showError('log-error','Usuário não encontrado!');
  if (users[user].pass !== pass) return showError('log-error','Senha incorreta!');

  currentUser = user;
  DB.saveSession(user);
  loadHome();
}

function doLogout() {
  currentUser = null;
  DB.clearSession();
  showScreen('landing');
}

function loadHome() {
  const users = DB.getUsers();
  const u = users[currentUser];
  document.getElementById('avatar-letter').textContent = u.name[0].toUpperCase();
  document.getElementById('display-username').textContent = currentUser;
  document.getElementById('welcome-name').textContent = u.name.split(' ')[0];
  document.getElementById('total-score').textContent = u.totalScore || 0;
  loadHistory();
  showScreen('home');
}

function loadHistory() {
  const hist = DB.getHistory(currentUser);
  const el = document.getElementById('history-list');
  if (!hist.length) { el.innerHTML = '<span style="color:var(--muted)">Nenhuma partida ainda. Comece agora!</span>'; return; }
  el.innerHTML = hist.map(h => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
      <span>${GAME_EMOJIS[h.cat]} <strong>${GAME_NAMES[h.cat]}</strong></span>
      <span style="color:var(--accent2);font-weight:800">${h.score} pts</span>
      <span style="color:var(--muted);font-size:12px">${h.date}</span>
    </div>
  `).join('');
}

// ===== GAME =====
function startGame(category) {
  currentCategory = category;
  currentGame = [...QUESTIONS[category]].sort(() => Math.random() - 0.5);
  currentQ = 0; score = 0; answered = false;
  document.getElementById('game-title-bar').textContent = `${GAME_EMOJIS[category]} ${GAME_NAMES[category]}`;
  showScreen('game');
  renderQuestion();
}

function restartGame() { startGame(currentCategory); }

function renderQuestion() {
  answered = false;
  const q = currentGame[currentQ];
  const total = currentGame.length;
  document.getElementById('q-number').textContent = `Pergunta ${currentQ + 1} de ${total}`;
  document.getElementById('q-emoji').textContent = q.e;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('progress-bar').style.width = `${(currentQ / total) * 100}%`;
  document.getElementById('game-score').textContent = score;

  const grid = document.getElementById('options-grid');
  const letters = ['A','B','C','D'];
  grid.innerHTML = q.o.map((opt, i) => `
    <button class="option-btn" onclick="selectAnswer(${i})">
      <span class="opt-letter">${letters[i]}</span> ${opt}
    </button>
  `).join('');

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 5) document.getElementById('timer-display').classList.add('warning');
    if (timeLeft <= 0) { clearInterval(timer); timeExpired(); }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById('timer-display').textContent = timeLeft;
  if (timeLeft > 5) document.getElementById('timer-display').classList.remove('warning');
}

function timeExpired() {
  if (answered) return;
  answered = true;
  const q = currentGame[currentQ];
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.classList.add('correct');
  });
  setTimeout(nextQuestion, 1500);
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  const q = currentGame[currentQ];
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);

  if (idx === q.a) {
    btns[idx].classList.add('correct');
    const bonus = Math.ceil(timeLeft / 15 * 100);
    score += 100 + bonus;
  } else {
    btns[idx].classList.add('wrong');
    btns[q.a].classList.add('correct');
  }
  document.getElementById('game-score').textContent = score;
  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= currentGame.length) {
    endGame();
  } else {
    renderQuestion();
  }
}

function endGame() {
  clearInterval(timer);
  const total = currentGame.length;
  const maxScore = total * 200;
  const pct = score / maxScore;

  let emoji, title, stars;
  if (pct >= 0.8) { emoji='🏆'; title='Incrível! Você arrasou!'; stars='⭐⭐⭐'; }
  else if (pct >= 0.5) { emoji='😎'; title='Muito bem! Continue assim!'; stars='⭐⭐'; }
  else { emoji='💪'; title='Pratique mais e melhore!'; stars='⭐'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-stars').textContent = stars;
  document.getElementById('result-score-num').textContent = score;
  document.getElementById('result-detail').textContent = `pontos em ${GAME_NAMES[currentCategory]}`;

  // Save
  const users = DB.getUsers();
  users[currentUser].totalScore = (users[currentUser].totalScore || 0) + score;
  DB.saveUsers(users);

  const now = new Date();
  DB.addHistory(currentUser, {
    cat: currentCategory,
    score,
    date: now.toLocaleDateString('pt-BR')
  });

  showScreen('result');
}

// ===== INIT =====
(function init() {
  const session = DB.getSession();
  if (session) {
    const users = DB.getUsers();
    if (users[session]) {
      currentUser = session;
      loadHome();
      return;
    }
  }
  showScreen('landing');
})();
