/* MD Education Games – ortak oyun kabuğu
   1) Her oyuna girişte bilgilendirme (tanıtım) ekranı
   2) Oyundan çıkarken "Emin misiniz?" onay ekranı
   Kullanım: <script src="mdg-shell.js" data-game="mouse-1"></script> (oyun.html'de ?g= parametresinden okunur) */
(function () {
  'use strict';
  var SCR = document.currentScript;
  var KEY = (SCR && SCR.getAttribute('data-game')) || new URLSearchParams(location.search).get('g') || '';
  var M = 'mouse-oyunlari.html', K = 'klavye-oyunlari.html', E = 'etkilesimli-oyunlar.html';
  var INFO = {
    'mouse-1': { t: 'Renkli Kareler', back: M, bg: ['#fde68a', '#f9a8d4', '#a5b4fc'], main: '🎨', em: ['🟥', '🟦', '🟨', '🟩'],
      d: 'Renkli Kareler, çocukların renkleri tanıması ve ayırt etmesi için hazırlanmış eğlenceli bir mouse oyunudur. İstenen rengi bulup tıklarsın; doğru cevaplarda puan kazanır, yanlışlarda puan kaybedersin. Seviyeler ilerledikçe renkler zorlaşır ve süre devreye girer.',
      k: ['Renk tanıma', 'Dikkat', 'Hızlı karar verme'] },
    'mouse-2': { t: 'Küçük Ressam', back: M, bg: ['#bbf7d0', '#fef9c3', '#fbcfe8'], main: '🧒', em: ['🖌️', '🎨', '🖍️', '🌈'],
      d: 'Küçük Ressam, çocukların dijital ortamda özgürce hayal kurup resim yapabilecekleri yaratıcı bir sanat oyunudur. İzini sür, boya atölyesinde renkleri doğru yerlere uygula, noktaları birleştir ve sonunda serbest atölyede kendi resmini çiz. Oyun renk uyumu, şekil tanıma ve motor becerilerini geliştirir.',
      k: ['Yaratıcılık', 'Şekil tanıma', 'El-göz koordinasyonu'] },
    'mouse-3': { t: 'Balon Şenliği', back: M, bg: ['#bae6fd', '#e0f2fe', '#fbcfe8'], main: '🎈', em: ['🎈', '☁️', '🎉', '⭐'],
      d: 'Balon Şenliği’nde gökyüzüne yükselen renkli balonları fareyle patlatırsın. 30 saniye içinde olabildiğince çok balon patlat ve puanını yükselt. Hızlı ol, hiçbir balonu kaçırma!',
      k: ['Hız', 'Fare kontrolü', 'Dikkat'] },
    'mouse-4': { t: 'Puzzle Bahçesi', back: M, bg: ['#bbf7d0', '#86efac', '#fde68a'], main: '🧩', em: ['🌸', '🦋', '🌻', '🍀'],
      d: 'Puzzle Bahçesi’nde örnek resme bakarak karışık parçaları sürükleyip yapboz alanındaki doğru yerlere bırakırsın. Her seviyede farklı bir resim seni bekler. Süreni tut: ne kadar hızlı ve hatasız tamamlarsan o kadar çok puan ve yıldız kazanırsın.',
      k: ['Parça-bütün ilişkisi', 'Görsel dikkat', 'Problem çözme'] },
    'mouse-5': { t: 'Tavşancık Koş!', back: M, bg: ['#d9f99d', '#bef264', '#fde68a'], main: '🐰', em: ['🥕', '🦊', '🌿', '🕳️'],
      d: 'Tavşancık Koş!’ta deliklerden çıkan tavşanlara hızlıca tıklarsın ama tilkilere dokunmamaya dikkat et! Süre dolmadan en yüksek puanı topla.',
      k: ['Refleks', 'Ayırt etme', 'Dikkat'] },
    'mouse-6': { t: 'Hafıza Kartları', back: M, bg: ['#fecdd3', '#fed7aa', '#fef08a'], main: '🃏', em: ['🍎', '🍊', '🍇', '🍓'],
      d: 'Hafıza Kartları’nda kartları çevirip aynı meyve çiftlerini bulursun. Kartların yerini aklında tut, en az hamlede tüm çiftleri eşleştir.',
      k: ['Hafıza', 'Dikkat', 'Eşleştirme'] },
    'klavye-1': { t: 'Meyve Sepeti', back: K, bg: ['#fed7aa', '#fde68a', '#bbf7d0'], main: '🧺', em: ['🍎', '🍌', '🍇', '🍓'],
      d: 'Gökten düşen meyvelerin üzerindeki harfi klavyede bul ve tuşla; meyve sepetine düşsün. Harfleri hızlı ve doğru yazdıkça puanın artar.',
      k: ['Harf tanıma', 'Klavye alışkanlığı', 'Hız'] },
    'klavye-2': { t: 'Harf Yağmuru', back: K, bg: ['#bfdbfe', '#c7d2fe', '#e0e7ff'], main: '🌧️', em: ['💧', '☔', '💦', '⛈️'],
      d: 'Harf Yağmuru’nda gökten yağan harfler yere düşmeden onları klavyede tuşla. Yağmur hızlandıkça dikkatini topla ve en yüksek puana ulaş.',
      k: ['Parmak-klavye uyumu', 'Hız', 'Konsantrasyon'] },
    'klavye-3': { t: 'Labirentten Kaçış', back: K, bg: ['#fde68a', '#fcd34d', '#fdba74'], main: '🐭', em: ['🧀', '🧱', '➡️', '⭐'],
      d: 'Ok tuşları veya W A S D ile minik fareyi labirentte yürüt ve peynire ulaştır. Duvarlara çarpmadan en kısa yolu bul.',
      k: ['Yön bulma', 'Planlama', 'Klavye kontrolü'] },
    'klavye-4': { t: 'Kelimelerin Gücü', back: K, bg: ['#e9d5ff', '#fbcfe8', '#fde68a'], main: '🎼', em: ['🎸', '🎹', '🥁', '🎻'],
      d: 'Müzik aletlerinin adlarındaki eksik harfi klavyeden yazarak kelimeyi tamamla. Doğru yazdıkça puan kazan ve yeni kelimelere geç.',
      k: ['Kelime bilgisi', 'Yazım', 'Klavye kullanımı'] },
    'klavye-5': { t: 'Kayıp Harfler', back: K, bg: ['#a7f3d0', '#bae6fd', '#fef08a'], main: '🔤', em: ['📚', '✏️', '🐟', '🌼'],
      d: 'Karışık verilen harfleri doğru sıraya dizip kelimeyi klavyeden yaz. Resim ve harf ipuçlarından yararlan, kelimeyi çöz.',
      k: ['Sözcük kurma', 'Yazım', 'Dikkat'] },
    'klavye-6': { t: 'Kayıp Semboller', back: K, bg: ['#c7d2fe', '#ddd6fe', '#fbcfe8'], main: '⌨️', em: ['#️⃣', '❓', '➕', '＠'],
      d: 'Ekranda beliren sembolü klavyede bul ve bas. Sembollerin yerlerini öğrenirken hızını ve doğruluğunu geliştir.',
      k: ['Klavye bilgisi', 'Hız', 'Doğruluk'] },
    'etk-1': { t: 'Think Steps', back: E, bg: ['#fef08a', '#bbf7d0', '#a5f3fc'], main: '🧠', em: ['➕', '➖', '✖️', '➗'],
      d: 'Think Steps’te işlemleri adım adım düşünerek çözersin. Her adımda doğru sonuca ulaş, mantıksal düşünme becerini geliştir.',
      k: ['Mantık', 'İşlem becerisi', 'Adım adım düşünme'] },
    'etk-2': { t: 'Bilim Kaşifleri', back: E, bg: ['#a7f3d0', '#99f6e4', '#c7d2fe'], main: '🧪', em: ['⚗️', '🔬', '💧', '🧫'],
      d: 'Bilim Kaşifleri’nde iki sıvıyı karıştırarak hedef rengi elde etmeye çalışırsın. Denemeler yap, renklerin nasıl karıştığını keşfet.',
      k: ['Deney yapma', 'Renk karışımı', 'Merak'] },
    'etk-3': { t: 'Kodlama Macerası', back: E, bg: ['#bfdbfe', '#ddd6fe', '#fbcfe8'], main: '🤖', em: ['⭐', '➡️', '⬆️', '🧩'],
      d: 'Komutları doğru sıraya dizerek robotu yıldıza ulaştır. Algoritmik düşünmeyi eğlenerek öğren.',
      k: ['Algoritma', 'Sıralama', 'Problem çözme'] },
    'etk-4': { t: 'Uzay & Gezegenler', back: E, bg: ['#312e81', '#4c1d95', '#1e3a8a'], main: '🚀', em: ['🪐', '🌍', '☄️', '🌙'],
      d: 'Güneş sistemi hakkındaki sorulara cevap vererek uzay bilgini sına. Gezegenleri tanı, doğru cevaplarla puan topla.',
      k: ['Fen bilgisi', 'Merak', 'Genel kültür'] },
    'yilan': { t: 'Yılan Macerası', back: E, bg: ['#99f6e4', '#bbf7d0', '#fde68a'], main: '🐍', em: ['🍎', '🍇', '🐇', '🌿'],
      d: 'Yılan Macerası’nda turkuaz yılanı yönlendirerek bahçedeki meyveleri ve hayvanları yakala. Büyüdükçe dikkatli ol, kendine çarpma!',
      k: ['Yön bulma', 'Refleks', 'Planlama'] }
  };
  KEY = KEY || (/yilan/.test(location.pathname) ? 'yilan' : '');
  var I = INFO[KEY];
  if (!I) return;

  var css = [
    '#mdgIntro,#mdgExit{font-family:"Nunito Sans","Segoe UI",system-ui,sans-serif}',
    '#mdgIntro{position:fixed;inset:0;z-index:10000;overflow:hidden;display:flex;align-items:center;justify-content:flex-end;padding:4vh 4vw}',
    '#mdgIntro .m_art{position:absolute;inset:0;background:linear-gradient(135deg,var(--a),var(--b) 55%,var(--c))}',
    '#mdgIntro .m_blob{position:absolute;border-radius:50%;filter:blur(30px);opacity:.55;background:#fff}',
    '#mdgIntro .m_tbl{position:absolute;left:0;right:0;bottom:0;height:20vh;background:linear-gradient(#e2a867,#b97b3c);box-shadow:inset 0 10px 24px rgba(0,0,0,.18)}',
    '#mdgIntro .m_main{position:absolute;left:8vw;bottom:12vh;font-size:min(46vh,34vw);line-height:1;filter:drop-shadow(0 24px 24px rgba(0,0,0,.28));animation:mdgBob 3.4s ease-in-out infinite}',
    '#mdgIntro .m_fl{position:absolute;font-size:min(11vh,9vw);filter:drop-shadow(0 8px 10px rgba(0,0,0,.25));animation:mdgBob 4s ease-in-out infinite}',
    '@keyframes mdgBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(2deg)}}',
    '#mdgIntro .m_bk{position:absolute;top:4vh;left:3vw;width:64px;height:64px;border-radius:50%;background:#d6285a;display:grid;place-items:center;text-decoration:none;box-shadow:0 8px 22px rgba(0,0,0,.35);transition:transform .15s}',
    '#mdgIntro .m_bk:hover{transform:scale(1.08)}#mdgIntro .m_bk svg{width:34px;height:34px}',
    '#mdgIntro .m_card{position:relative;width:min(520px,46vw);max-height:92vh;overflow:auto;background:rgba(32,34,40,.82);backdrop-filter:blur(8px);color:#fff;border-radius:28px;padding:30px 34px 28px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.4)}',
    '#mdgIntro .m_br{font-weight:900;font-size:28px;letter-spacing:-.01em;background:linear-gradient(90deg,#ff4e7d,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent;margin:0}',
    '#mdgIntro h1{margin:2px 0 14px;font-size:clamp(28px,3.4vw,40px);font-weight:800;text-shadow:0 0 14px rgba(255,42,112,.55)}',
    '#mdgIntro p{margin:0;font-size:clamp(15px,1.5vw,18px);line-height:1.7;color:#f3f4f6}',
    '#mdgIntro .m_chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:18px 0 8px}',
    '#mdgIntro .m_chips span{background:rgba(52,211,153,.18);color:#6ee7b7;border-radius:999px;padding:5px 14px;font-weight:800;font-size:13px}',
    '#mdgIntro .m_go{display:inline-flex;align-items:center;gap:10px;margin-top:18px;border:0;cursor:pointer;font:inherit;font-weight:800;font-size:clamp(18px,2vw,24px);color:#fff;padding:14px 34px;border-radius:20px;background:linear-gradient(#6fdc8c,#4ccb6f);box-shadow:0 8px 20px rgba(52,211,153,.35);transition:transform .15s}',
    '#mdgIntro .m_go:hover{transform:translateY(-2px) scale(1.03)}#mdgIntro .m_go svg{width:30px;height:30px}',
    '#mdgIntro .m_go:focus-visible,#mdgIntro .m_bk:focus-visible{outline:4px solid #38bdf8;outline-offset:3px}',
    '@media(max-width:820px){#mdgIntro{align-items:flex-end;justify-content:center;padding:3vh 4vw}#mdgIntro .m_card{width:100%;max-height:62vh;padding:22px}#mdgIntro .m_main{left:50%;transform:translateX(-50%);bottom:auto;top:12vh;font-size:30vw;animation:none}#mdgIntro .m_fl{display:none}#mdgIntro .m_bk{width:52px;height:52px}}',
    /* çıkış penceresi */
    '#mdgExit{position:fixed;inset:0;z-index:10001;display:grid;place-items:center;padding:20px;background:rgba(2,4,12,.72);backdrop-filter:blur(3px)}',
    '#mdgExit[hidden]{display:none}',
    '#mdgExit .m_box{background:#fff;border:5px solid #e8301f;border-radius:36px;padding:38px 34px 32px;max-width:640px;width:100%;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.55);animation:mdgPop .25s ease-out}',
    '@keyframes mdgPop{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}',
    '#mdgExit h2{margin:0 0 16px;color:#e8301f;font-size:clamp(26px,4vw,40px);font-weight:700;line-height:1.3}',
    '#mdgExit p{margin:0 0 28px;color:#2b2b2b;font-size:clamp(16px,2.2vw,22px);line-height:1.6}',
    '#mdgExit .m_row{display:flex;gap:18px;justify-content:center;flex-wrap:wrap}',
    '#mdgExit button{font:inherit;cursor:pointer;border:0;border-radius:999px;height:62px;color:#fff;font-size:clamp(17px,2vw,22px);transition:transform .15s}',
    '#mdgExit button:hover{transform:translateY(-2px)}',
    '#mdgExit .m_no{background:#6f7680;padding:0 42px;box-shadow:0 8px 18px rgba(0,0,0,.2)}',
    '#mdgExit .m_yes{background:#e8301f;box-shadow:inset 0 0 0 4px #b3220f,0 8px 18px rgba(232,48,31,.4);display:flex;align-items:center;gap:14px;padding:0 30px 0 4px;font-weight:700}',
    '#mdgExit .m_yes i{width:54px;height:54px;border-radius:50%;background:#f27474;border:3px solid #111;display:grid;place-items:center;font-style:normal}',
    '#mdgExit .m_yes i svg{width:30px;height:30px}',
    '#mdgExit button:focus-visible{outline:4px solid #38bdf8;outline-offset:3px}',
    '@media(prefers-reduced-motion:reduce){#mdgIntro *,#mdgExit *{animation:none!important;transition:none!important}}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M9 4 3 10l6 6V12c5 0 9 1 12 8-1-8-5-13-12-13z"/></svg>';
  var XSVG = '<svg viewBox="0 0 24 24" stroke-linecap="round" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#111" stroke-width="7"/><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="4"/></svg>';

  /* ---- tanıtım ekranı ---- */
  var flPos = [[38, 10], [42, 52], [18, 8], [44, 31]];
  var intro = document.createElement('div');
  intro.id = 'mdgIntro'; intro.setAttribute('role', 'dialog'); intro.setAttribute('aria-modal', 'true'); intro.setAttribute('aria-label', I.t + ' tanıtım');
  intro.innerHTML =
    '<div class="m_art" style="--a:' + I.bg[0] + ';--b:' + I.bg[1] + ';--c:' + I.bg[2] + '">' +
      '<span class="m_blob" style="width:34vw;height:34vw;left:-8vw;top:-10vw"></span>' +
      '<span class="m_blob" style="width:22vw;height:22vw;left:36vw;top:8vh;opacity:.35"></span>' +
      '<div class="m_tbl"></div>' +
      '<div class="m_main" aria-hidden="true">' + I.main + '</div>' +
      I.em.map(function (e, i) { return '<span class="m_fl" aria-hidden="true" style="left:' + flPos[i][0] + 'vw;top:' + flPos[i][1] + 'vh;animation-delay:-' + (i * .9) + 's">' + e + '</span>'; }).join('') +
    '</div>' +
    '<a class="m_bk" data-noconfirm href="' + I.back + '" aria-label="Oyunlara dön">' + BACK + '</a>' +
    '<div class="m_card"><p class="m_br">MD Education Games</p><h1>' + I.t + '</h1><p>' + I.d + '</p>' +
    '<div class="m_chips" aria-label="Kazanımlar">' + I.k.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
    '<button class="m_go" type="button">Devam Et ' + ARROW + '</button></div>';
  document.body.appendChild(intro);
  var prevOv = document.body.style.overflow; document.body.style.overflow = 'hidden';
  var go = intro.querySelector('.m_go');
  function begin() {
    if (!intro.parentNode) return;
    intro.remove(); document.body.style.overflow = prevOv;
    window.MDG.started = true;
    document.dispatchEvent(new Event('mdg:continue'));
  }
  go.addEventListener('click', begin);
  setTimeout(function () { go.focus({ preventScroll: true }); }, 50);
  document.addEventListener('keydown', function (e) {
    if (intro.parentNode && (e.key === 'Enter' || e.key === ' ') && document.activeElement !== intro.querySelector('.m_bk')) { e.preventDefault(); e.stopPropagation(); begin(); }
  }, true);

  /* ---- çıkış onayı ---- */
  var ex = document.createElement('div'); ex.id = 'mdgExit'; ex.hidden = true;
  ex.setAttribute('role', 'alertdialog'); ex.setAttribute('aria-modal', 'true'); ex.setAttribute('aria-labelledby', 'mdgExT');
  ex.innerHTML = '<div class="m_box"><h2 id="mdgExT"></h2><p id="mdgExP"></p><div class="m_row"><button class="m_no" type="button"></button><button class="m_yes" type="button"><i>' + XSVG + '</i><span></span></button></div></div>';
  document.body.appendChild(ex);
  var onOk = null, onNo = null, lastFocus = null;
  function close(cancel) { ex.hidden = true; var n = onNo; onOk = null; onNo = null; if (cancel === true && n) n(); if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  ex.querySelector('.m_no').addEventListener('click', function () { close(true); });
  ex.querySelector('.m_yes').addEventListener('click', function () { var f = onOk; close(); if (f) f(); });
  ex.addEventListener('click', function (e) { if (e.target === ex) close(true); });
  document.addEventListener('keydown', function (e) {
    if (!ex.hidden) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
      else if (e.key === 'Tab') { var b = [ex.querySelector('.m_no'), ex.querySelector('.m_yes')], i = b.indexOf(document.activeElement); e.preventDefault(); b[(i + (e.shiftKey ? -1 : 1) + 2) % 2].focus(); }
      else e.stopPropagation();
    }
  }, true);
  function ask(o) {
    o = o || {}; lastFocus = document.activeElement;
    ex.querySelector('h2').textContent = o.title || 'Oyundan Çıkmak İstediğinizden Emin misiniz?';
    ex.querySelector('p').textContent = o.text || 'Oyundan çıktığınızda tüm ilerlemeniz sıfırlanacak.';
    ex.querySelector('.m_no').textContent = o.cancel || 'Vazgeç';
    ex.querySelector('.m_yes span').textContent = o.ok || 'Oyundan Çık';
    onOk = o.onOk || null; onNo = o.onNo || null; ex.hidden = false; ex.querySelector('.m_no').focus();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.hasAttribute('data-noconfirm') || a.target === '_blank' || a.hasAttribute('download')) return;
    var h = a.getAttribute('href'); if (!h || h.charAt(0) === '#' || /^(javascript|mailto|tel):/i.test(h)) return;
    e.preventDefault(); e.stopPropagation();
    ask({ onOk: function () { location.href = a.href; } });
  }, true);

  window.MDG = { ask: ask, started: false, info: I, key: KEY, begin: begin };
})();
