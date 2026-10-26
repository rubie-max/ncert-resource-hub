(function () {
  "use strict";

  var COLORS = {
    "Mathematics": "#2563eb", "Science": "#059669", "Physics": "#0284c7", "Chemistry": "#0d9488", "Biology": "#16a34a",
    "Biotechnology": "#15803d", "English": "#7c3aed", "Hindi": "#ea580c", "Urdu": "#0f766e", "Sanskrit": "#db2777",
    "Social Science": "#b45309", "History": "#a16207", "Geography": "#4d7c0f", "Political Science": "#dc2626",
    "Economics": "#ca8a04", "Environmental Studies": "#059669", "The World Around Us": "#059669", "Arts": "#e11d48",
    "Fine Arts": "#e11d48", "Music": "#c026d3", "Physical Education": "#d97706", "Health & Physical Education": "#d97706",
    "Accountancy": "#4f46e5", "Business Studies": "#6366f1", "Computer Science": "#0891b2", "Informatics Practices": "#0891b2",
    "Computer Technology": "#0891b2", "Psychology": "#9333ea", "Sociology": "#7e22ce", "Home Science": "#ea580c",
    "Heritage Crafts": "#be123c", "Graphic Design": "#7c3aed", "Creative Writing": "#9d174d", "Knowledge Traditions": "#92400e"
  };
  var MAIN_MEDIUMS = ["English", "Hindi", "Urdu", "Sanskrit"];
  var SUBJECT_FAMILY = {
    "History": "Social Science", "Geography": "Social Science", "Political Science": "Social Science", "Economics": "Social Science",
    "Environmental Studies": "EVS", "The World Around Us": "EVS"
  };
  var TABS = [["current", "Current syllabus", ""], ["old", "Old syllabus", "/old"]];
  var SECTIONS = [
    { k: "books", t: "NCERT Books", d: "Textbooks, Class 1–12", icon: "book", color: "#4f46e5" },
    { k: "solutions", t: "Solutions", d: "Chapter-wise answers", icon: "bulb", color: "#059669" },
    { k: "exemplar", t: "Exemplar", d: "Extra questions & lab manuals", icon: "clipboard", color: "#d97706" },
    { k: "upsc", t: "UPSC", d: "Old NCERT history classics", icon: "landmark", color: "#e11d48" }
  ];
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 21 7H3z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
    papers: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3"/><path d="M7 15h10"/>',
    atom: '<circle cx="12" cy="12" r="1"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5-6"/>',
    lang: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    scroll: '<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>',
    scale: '<path d="M12 3v18"/><path d="M7 21h10"/><path d="M3 7h18"/><path d="m6 7-3 7a3 3 0 0 0 6 0z"/><path d="m18 7-3 7a3 3 0 0 0 6 0z"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2A5.6 5.6 0 0 0 22 11c0-5-4.5-9-10-9z"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    users: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'
  };
  var SUBJECT_ICON = {
    "Mathematics": "sigma", "Science": "flask", "Chemistry": "flask", "Physics": "atom", "Biology": "leaf", "Biotechnology": "leaf",
    "Environmental Studies": "leaf", "The World Around Us": "globe", "Social Science": "globe", "Geography": "globe",
    "History": "scroll", "Knowledge Traditions": "scroll", "Political Science": "scale", "Economics": "chart",
    "Accountancy": "chart", "Business Studies": "chart", "Arts": "palette", "Fine Arts": "palette", "Heritage Crafts": "palette",
    "Graphic Design": "palette", "Music": "music", "Physical Education": "activity", "Health & Physical Education": "activity",
    "Computer Science": "monitor", "Informatics Practices": "monitor", "Computer Technology": "monitor",
    "Psychology": "users", "Sociology": "users", "Home Science": "home", "Creative Writing": "pen"
  };
  var GROUP_LABEL = { current: "Current syllabus", old: "Old syllabus", practice: "Practice", upsc: "UPSC classic" };
  var NO_NEP_YET = [10, 11, 12];

  var UPSC_PATH = [
    { lang: "English", k: "Ancient", c: "#d97706", t: "Ancient India", d: "Start with Romila Thapar's middle-school book, then R.S. Sharma.", ids: ["classic-7", "classic-1"] },
    { lang: "English", k: "Medieval", c: "#0d9488", t: "Medieval India", d: "The old Class 7 book, then Satish Chandra.", ids: ["classic-8", "classic-2"] },
    { lang: "English", k: "Modern", c: "#4f46e5", t: "Modern India", d: "Bipan Chandra's Modern India.", ids: ["classic-3"] },
    { lang: "English", k: "2002 series", c: "#7c3aed", t: "The 2002 series", d: "Short-lived replacements, still read for a second view.", ids: ["classic-9", "classic-10", "classic-11"] },
    { lang: "English", k: "More", c: "#db2777", t: "Also on the shelf", d: "Other out-of-print NCERT books.", ids: ["classic-12"] },
    { lang: "Hindi", k: "प्राचीन", c: "#d97706", t: "प्राचीन भारत", d: "Ancient India, Class 11.", ids: ["classic-4"] },
    { lang: "Hindi", k: "मध्यकालीन", c: "#0d9488", t: "मध्यकालीन भारत", d: "Medieval India by Satish Chandra.", ids: ["classic-5"] },
    { lang: "Hindi", k: "आधुनिक", c: "#4f46e5", t: "आधुनिक भारत", d: "Modern India by Bipan Chandra.", ids: ["classic-6"] }
  ];


  var PRACTICE = [
    { t: "CBSE Sample Papers", d: "Official sample question papers and marking schemes for Classes 10 and 12.",
      links: [["CBSE Academic", "https://cbseacademic.nic.in/"]] },
    { t: "Previous Year Papers", d: "Official CBSE board question papers.",
      links: [["CBSE question papers", "https://www.cbse.gov.in/cbsenew/question-paper.html"]] },
    { t: "NCERT Solutions", tag: "Independent websites", d: "Chapter answers for English and Hindi books are also on each book's page. Check them against the textbook.",
      links: [["Tiwari Academy", "https://www.tiwariacademy.com/ncert-solutions/"], ["LearnCBSE", "https://www.learncbse.in/"]] }
  ];
  var RESOURCES = [
    { t: "DIKSHA", d: "The government's digital platform with every NCERT book, QR-linked lessons and courses.",
      links: [["Open DIKSHA", "https://diksha.gov.in/"]] },
    { t: "Syllabus", d: "Current CBSE curriculum documents, aligned with NCERT books.",
      links: [["CBSE curriculum", "https://cbseacademic.nic.in/curriculum.html"]] },
    { t: "NEP 2020", d: "The full National Education Policy document.",
      links: [["Policy PDF", "https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf"]] },
    { t: "National Curriculum Framework", d: "NCF for School Education and the Foundational Stage.",
      links: [["Find on DIKSHA", dikshaSearch("National Curriculum Framework")]] },
    { t: "Workbooks", d: "NCERT activity books and workbooks.",
      links: [["Find on DIKSHA", dikshaSearch("NCERT workbook")]] },
    { t: "Official NCERT website", d: "The NCERT portal. It may be slow or unavailable on some networks.",
      links: [["ncert.nic.in", "https://ncert.nic.in/textbook.php"]] },
    { t: "SWAYAM", d: "Free government courses, including NCERT and NIOS school courses.",
      links: [["Open SWAYAM", "https://swayam.gov.in/"]] },
    { t: "National Digital Library of India", d: "IIT Kharagpur's library with many current and old textbooks.",
      links: [["Open NDLI", "https://ndl.iitkgp.ac.in/"]] }
  ];

  /* ---------- grouping ---------- */
  var BY_ID = {};
  var NEW_BY_KEY = {};
  function family(s) { return SUBJECT_FAMILY[s] || s; }
  function key(b) { return b.c + "|" + b.m + "|" + family(b.s); }

  BOOKS.forEach(function (b) {
    BY_ID[b.id] = b;
    b.replacedBy = [];
    b.replaces = [];
    if (b.e === "nep") (NEW_BY_KEY[key(b)] = NEW_BY_KEY[key(b)] || []).push(b);
  });
  BOOKS.forEach(function (b) {
    if (b.e === "classic") b.g = "upsc";
    else if (b.e === "practice") b.g = "practice";
    else if (b.e === "nep") b.g = "current";
    else if (b.e === "replaced" || NEW_BY_KEY[key(b)]) b.g = "old";
    else b.g = "current";
    if (b.g === "old" && NEW_BY_KEY[key(b)]) {
      b.replacedBy = NEW_BY_KEY[key(b)];
      b.replacedBy.forEach(function (n) { n.replaces.push(b); });
    }
  });

  function inGroup(c, g) { return BOOKS.filter(function (b) { return b.c === c && b.g === g; }); }
  var UPSC = BOOKS.filter(function (b) { return b.g === "upsc"; });

  /* ---------- saved on this device ---------- */
  function load(k, fallback) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(k, v) {
    try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage off */ }
  }
  var read = load("ncert-read", {});
  function readOf(b) { return read[b.id] || []; }
  function setRead(b, i, on) {
    var list = readOf(b).filter(function (x) { return x !== i; });
    if (on) list.push(i);
    if (list.length) read[b.id] = list; else delete read[b.id];
    save("ncert-read", read);
  }
  function countable(b) { return b.ch.filter(function (c) { return !/^prelims$/i.test(c[0]); }).length; }
  function readCount(b) {
    return readOf(b).filter(function (i) { return b.ch[i] && !/^prelims$/i.test(b.ch[i][0]); }).length;
  }

  var app = document.getElementById("app");
  var searchInput = document.getElementById("q");
  var filters = { m: load("ncert-lang", "English"), s: "All" };
  var BANDS = [
    ["Primary", "Classes 1–5", [1, 2, 3, 4, 5]],
    ["Middle", "Classes 6–8", [6, 7, 8]],
    ["Secondary", "Classes 9–12", [9, 10, 11, 12]]
  ];

  function dikshaSearch(q) { return "https://diksha.gov.in/search?key=" + encodeURIComponent(q); }
  function archiveSearch(q) { return "https://archive.org/search?query=" + encodeURIComponent(q); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function ext(href, cls, text) {
    var a = el("a", cls, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }
  function internal(href, cls, text) {
    var a = el("a", cls, text);
    a.href = href;
    return a;
  }
  function initial(title) {
    var m = String(title || "?").match(/[A-Za-z\u0900-\u097F\u0600-\u06FF]/);
    return m ? m[0].toUpperCase() : "?";
  }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  function sourceName(src) {
    if (src === "diksha") return "DIKSHA (Government of India)";
    if (src === "ncert") return "NCERT (ncert.nic.in)";
    if (src === "mirror") return "a third-party copy of the NCERT files";
    return "Internet Archive";
  }
  function chapterTitle(name) {
    var t = String(name).replace(/^\s*(chapter|unit|lesson|ch\.?)\s*\d+\s*[-–:.)]*\s*/i, "").replace(/^\d+\s*[-–:.)]\s*/, "");
    if (!t) return name;
    if (t === t.toUpperCase() && /[A-Z]{3}/.test(t)) t = t.charAt(0) + t.slice(1).toLowerCase();
    return t;
  }
  function chapterNumber(name, index) {
    if (/^prelims$/i.test(name)) return "P";
    var m = String(name).match(/(\d+)/);
    return m ? m[1] : String(index + 1);
  }
  function icon(name, cls) {
    var s = el("span", "ic" + (cls ? " " + cls : ""));
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.book) + "</svg>";
    return s;
  }
  function subjectIconName(b) {
    if (b.g === "upsc") return "scroll";
    if (SUBJECT_ICON[b.s]) return SUBJECT_ICON[b.s];
    if (MAIN_MEDIUMS.indexOf(b.s) !== -1 || b.s === b.m) return "lang";
    return "book";
  }
  function spine(b, cls) {
    var s = icon(subjectIconName(b), "sicon" + (cls ? " " + cls : ""));
    s.style.setProperty("--c", COLORS[b.s] || "#64748b");
    return s;
  }
  function backLink(href, label) {
    var a = internal(href, "back");
    a.appendChild(icon("back"));
    a.appendChild(document.createTextNode(label));
    return a;
  }
  function chip(text, cls) { return el("span", "mchip" + (cls ? " " + cls : ""), text); }
  function solUrl(b, path) {
    if (!b.sol) return "";
    var host = b.sol.h === "h" ? "hindi" : "www";
    return "https://" + host + ".tiwariacademy.com/ncert-solutions/" + b.sol.p + (path || "");
  }
  function bookHref(b) { return "#/book/" + encodeURIComponent(b.id); }
  function tabHref(c, g) {
    if (g === "practice") return "#/exemplar/" + c;
    for (var i = 0; i < TABS.length; i++) if (TABS[i][0] === g) return "#/class/" + c + TABS[i][2];
    return "#/class/" + c;
  }
  function titles(list) {
    var seen = {}, out = [];
    list.forEach(function (b) { if (!seen[b.t]) { seen[b.t] = true; out.push(b.t); } });
    return out.join(", ");
  }

  function bookMeta(b, showClass) {
    var bits = [];
    if (b.by) bits.push(b.by);
    if (showClass) bits.push("Class " + b.c);
    bits.push(b.s);
    if (b.m && b.m !== b.s) bits.push(b.m);
    if (b.full) bits.push("Full book PDF");
    else if (b.ch.length) bits.push(plural(countable(b) || b.ch.length, "chapter"));
    return bits.join(" · ");
  }

  function bookRow(b, opts) {
    opts = opts || {};
    var a = internal(bookHref(b), "book");
    a.appendChild(spine(b));
    var text = el("span", "book-text");
    text.appendChild(el("strong", null, b.t));
    var meta = el("span", "book-meta");
    if (b.by) meta.appendChild(chip(b.by));
    if (opts.showClass) meta.appendChild(chip("Class " + b.c));
    if (opts.tag) meta.appendChild(chip(GROUP_LABEL[b.g]));
    if (b.m && b.m !== b.s && (opts.tag || opts.showClass || filters.m !== b.m)) meta.appendChild(chip(b.m));
    var total = countable(b);
    if (b.full && !b.ch.length) meta.appendChild(chip("Full book"));
    else if (b.ch.length) meta.appendChild(chip(plural(total || b.ch.length, "chapter")));
    else meta.appendChild(chip("No PDF yet", "warn"));
    if (b.sol) meta.appendChild(chip("Solutions", "sol"));
    text.appendChild(meta);
    if (b.replacedBy.length && opts.showPair) text.appendChild(el("span", "pair-line", "Replaced by " + titles(b.replacedBy)));
    a.appendChild(text);
    var done = readCount(b);
    if (done) a.appendChild(el("span", "row-progress", done + "/" + total));
    a.appendChild(icon("chev", "chev"));
    return a;
  }

  function groupBySubject(list) {
    var order = [], groups = {};
    list.forEach(function (b) {
      if (!groups[b.s]) { groups[b.s] = []; order.push(b.s); }
      groups[b.s].push(b);
    });
    order.sort(function (a, b) { return a.localeCompare(b); });
    return order.map(function (s) { return [s, groups[s].slice().sort(byMedium)]; });
  }
  function mediumRank(m) {
    var i = MAIN_MEDIUMS.indexOf(m);
    return i === -1 ? MAIN_MEDIUMS.length : i;
  }
  function byMedium(a, b) {
    var ra = mediumRank(a.m), rb = mediumRank(b.m);
    if (ra !== rb) return ra - rb;
    return ra === MAIN_MEDIUMS.length ? a.m.localeCompare(b.m) : 0;
  }
  function mediumsOf(list) {
    var seen = {};
    list.forEach(function (b) { seen[b.m] = true; });
    return Object.keys(seen).sort(function (a, b) { return mediumRank(a) - mediumRank(b) || a.localeCompare(b); });
  }

  function subjectBlocks(list, root) {
    groupBySubject(list).forEach(function (pair) {
      var sec = el("section", "subject");
      var h = el("h2", null, pair[0]);
      h.appendChild(el("small", null, plural(pair[1].length, "book")));
      sec.appendChild(h);
      var box = el("div", "list");
      pair[1].forEach(function (b) { box.appendChild(bookRow(b)); });
      sec.appendChild(box);
      root.appendChild(sec);
    });
  }

  function chipRow(label, items, k, onChange) {
    var row = el("div", "chip-row");
    row.appendChild(el("span", null, label));
    var main = items;
    var rest = [];
    if (k === "m" && items.length > 6) {
      main = items.filter(function (n) { return n === "All" || MAIN_MEDIUMS.indexOf(n) !== -1 || n === filters.m; });
      rest = items.filter(function (n) { return main.indexOf(n) === -1; });
    }
    function addChip(name) {
      var b = el("button", "chip", name);
      b.type = "button";
      b.setAttribute("aria-pressed", String(filters[k] === name));
      b.addEventListener("click", function () {
        filters[k] = name;
        if (k === "m") save("ncert-lang", name);
        [].forEach.call(row.querySelectorAll(".chip"), function (x) { x.setAttribute("aria-pressed", String(x.textContent === name)); });
        onChange();
      });
      row.appendChild(b);
    }
    main.forEach(addChip);
    if (rest.length) {
      var more = el("button", "chip more", "More");
      more.type = "button";
      more.addEventListener("click", function () {
        more.remove();
        rest.forEach(addChip);
      });
      row.appendChild(more);
    }
    return row;
  }

  function passes(b) {
    if (filters.m !== "All" && b.m !== filters.m) return false;
    if (filters.s !== "All" && b.s !== filters.s) return false;
    return true;
  }

  function crumbs(parts) {
    var p = el("p", "crumbs");
    parts.forEach(function (x, i) {
      if (i) p.appendChild(document.createTextNode(" / "));
      if (x[1]) p.appendChild(internal(x[1], null, x[0])); else p.appendChild(document.createTextNode(x[0]));
    });
    return p;
  }

  /* ---------- views ---------- */
  var SECTION_BOOKS = {
    books: function (c) { return inGroup(c, "current").length + inGroup(c, "old").length; },
    solutions: function (c) { return solutionBooks(c).length; },
    exemplar: function (c) { return inGroup(c, "practice").length; }
  };
  function solutionBooks(c) { return BOOKS.filter(function (b) { return b.c === c && b.sol && b.g !== "upsc"; }); }
  function sectionOf(k) { for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].k === k) return SECTIONS[i]; }
  function sectionClassHref(k, c) { return k === "books" ? "#/class/" + c : "#/" + k + "/" + c; }
  function classesIn(k) {
    var out = [];
    for (var c = 1; c <= 12; c++) if (SECTION_BOOKS[k](c)) out.push(c);
    return out;
  }
  var backTo = null;

  var SECTION_COUNT = null;
  function sectionCount(k) {
    if (!SECTION_COUNT) {
      SECTION_COUNT = { books: 0, solutions: 0, exemplar: 0, upsc: 0 };
      BOOKS.forEach(function (b) {
        if (b.g === "current" || b.g === "old") SECTION_COUNT.books++;
        if (b.g === "practice") SECTION_COUNT.exemplar++;
        if (b.g === "upsc") SECTION_COUNT.upsc++;
        if (b.sol && b.g !== "upsc") SECTION_COUNT.solutions++;
      });
    }
    return SECTION_COUNT[k];
  }
  function sectionCountText(k) {
    var n = sectionCount(k);
    return k === "solutions" ? n + " books solved" : plural(n, "book");
  }
  function continueCard(last) {
    var cont = internal(bookHref(last), "resume");
    cont.appendChild(spine(last, "resume-ic"));
    var mid = el("span", "resume-mid");
    mid.appendChild(el("small", null, "Continue reading"));
    mid.appendChild(el("b", null, last.t));
    var total = countable(last), done = readCount(last);
    mid.appendChild(el("span", null, "Class " + last.c + " · " + last.s + (total ? " · " + done + "/" + total + " chapters" : "")));
    if (total) {
      var bar = el("span", "tile-bar");
      var fill = el("span");
      fill.style.width = Math.round(done / total * 100) + "%";
      bar.appendChild(fill);
      mid.appendChild(bar);
    }
    cont.appendChild(mid);
    cont.appendChild(icon("chev", "chev"));
    return cont;
  }
  function papersLink() {
    var more = internal("#/more", "home-link");
    more.appendChild(icon("papers"));
    more.appendChild(el("span", null, "Sample papers & resources"));
    more.appendChild(icon("chev", "chev"));
    return more;
  }
  function homeBento(last) {
    app.appendChild(el("h1", "bento-title", "What do you want to open?"));
    var grid = el("div", "bento");
    SECTIONS.forEach(function (s, i) {
      var a = internal("#/" + s.k, "bento-card" + (i === 0 ? " big" : i === 3 ? " wide" : ""));
      a.style.setProperty("--c", s.color);
      a.appendChild(icon(s.icon, "bento-bg"));
      a.appendChild(icon(s.icon, "bento-ic"));
      a.appendChild(el("b", null, s.t));
      a.appendChild(el("span", null, s.d));
      a.appendChild(el("span", "bento-n", String(sectionCount(s.k))));
      grid.appendChild(a);
    });
    app.appendChild(grid);
    if (last) app.appendChild(continueCard(last));
    var stats = el("div", "stats");
    [[String(BOOKS.length), "books"], [String(mediumsOf(BOOKS).length), "languages"], ["1–12", "classes"]].forEach(function (x) {
      var s = el("div", "stat");
      s.appendChild(el("b", null, x[0]));
      s.appendChild(el("span", null, x[1]));
      stats.appendChild(s);
    });
    app.appendChild(stats);
    app.appendChild(papersLink());
  }

  function viewHome() {
    homeBento(BY_ID[load("ncert-last", "")]);
  }

  function viewSection(k) {
    var s = sectionOf(k);
    var mine = load("ncert-class", null);
    app.appendChild(backLink("#/", "Home"));
    app.appendChild(el("h1", null, s.t));
    app.appendChild(el("p", "lead", k === "solutions" ? "Pick your class. Answers open on Tiwari Academy, an independent site." : "Pick your class."));
    var grid = el("div", "class-pad");
    classesIn(k).forEach(function (c) {
      var tile = internal(sectionClassHref(k, c), "class-num" + (c === mine ? " mine" : ""));
      tile.appendChild(el("small", null, "Class"));
      tile.appendChild(el("b", null, String(c)));
      grid.appendChild(tile);
    });
    app.appendChild(grid);
  }

  function classStrip(k, current) {
    var nav = el("nav", "class-strip");
    nav.setAttribute("aria-label", "Change class");
    classesIn(k).forEach(function (c) {
      var a = internal(sectionClassHref(k, c), null, String(c));
      a.setAttribute("aria-label", "Class " + c);
      if (c === current) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    });
    return nav;
  }

  function bookTile(b) {
    var a = internal(bookHref(b), "tile");
    var top = el("span", "tile-cover");
    top.style.setProperty("--c", COLORS[b.s] || "#64748b");
    top.appendChild(icon(subjectIconName(b), "cover-ic"));
    if (b.sol) {
      var sol = el("span", "tile-sol");
      sol.appendChild(icon("bulb"));
      sol.appendChild(document.createTextNode("Solutions"));
      top.appendChild(sol);
    }
    a.appendChild(top);
    a.appendChild(el("strong", null, b.t));
    var bits = [b.s];
    if (filters.m === "All" && b.m && b.m !== b.s) bits.push(b.m);
    var total = countable(b);
    if (b.ch.length) bits.push(plural(total || b.ch.length, "chapter"));
    else if (b.full) bits.push("Full book");
    else bits.push("No PDF yet");
    a.appendChild(el("span", "tile-sub", bits.join(" · ")));
    var done = readCount(b);
    if (done && total) {
      var bar = el("span", "tile-bar");
      var fill = el("span");
      fill.style.width = Math.round(done / total * 100) + "%";
      bar.appendChild(fill);
      a.appendChild(bar);
    }
    return a;
  }

  var NATIVE = {
    English: ["English", "Aa"], Hindi: ["हिन्दी", "अ"], Urdu: ["اردو", "ا"], Sanskrit: ["संस्कृतम्", "सं"],
    Assamese: ["অসমীয়া", "অ"], Bengali: ["বাংলা", "বা"], Bodo: ["बड़ो", "ब"], Dogri: ["डोगरी", "डो"],
    Gujarati: ["ગુજરાતી", "ગ"], Kannada: ["ಕನ್ನಡ", "ಕ"], Kashmiri: ["کٲشُر", "ک"], Konkani: ["कोंकणी", "को"],
    Maithili: ["मैथिली", "मै"], Malayalam: ["മലയാളം", "മ"], Manipuri: ["মণিপুরী", "ম"], Marathi: ["मराठी", "म"],
    Nepali: ["नेपाली", "ने"], Odia: ["ଓଡ଼ିଆ", "ଓ"], Punjabi: ["ਪੰਜਾਬੀ", "ਪ"], Santhali: ["ᱥᱟᱱᱛᱟᱲᱤ", "ᱥ"],
    Sindhi: ["سنڌي", "س"], Tamil: ["தமிழ்", "த"], Telugu: ["తెలుగు", "తె"]
  };
  function nativeOf(m) { return m === "All" ? ["Every medium", "", ""] : (NATIVE[m] || [m, m.charAt(0)]); }
  function langGlyph(m) {
    var g = el("span", "lang-glyph", m === "All" ? "" : nativeOf(m)[1]);
    if (m === "All") g.appendChild(icon("globe"));
    return g;
  }

  function langSheet(mediums, all, current, onPick) {
    var dlg = el("dialog", "sheet");
    dlg.setAttribute("aria-label", "Choose medium");
    var head = el("div", "sheet-head");
    head.appendChild(el("h2", null, "Choose medium"));
    var close = el("button", "sheet-x");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.textContent = "×";
    head.appendChild(close);
    dlg.appendChild(head);
    var find = el("input", "sheet-find");
    find.type = "search";
    find.placeholder = "Search " + mediums.length + " languages";
    find.setAttribute("aria-label", "Search languages");
    dlg.appendChild(find);
    var grid = el("div", "lang-grid");
    dlg.appendChild(grid);
    ["All"].concat(mediums).forEach(function (m) {
      var n = m === "All" ? all.length : all.filter(function (b) { return b.m === m; }).length;
      var opt = el("button", "lang-opt");
      opt.type = "button";
      opt.dataset.q = (m + " " + nativeOf(m)[0]).toLowerCase();
      opt.setAttribute("aria-pressed", String(m === current));
      opt.appendChild(langGlyph(m));
      var txt = el("span", "lang-txt");
      txt.appendChild(el("strong", null, m === "All" ? "All languages" : m));
      txt.appendChild(el("span", null, m === "All" || m === "English" ? plural(n, "book") : nativeOf(m)[0] + " · " + n));
      opt.appendChild(txt);
      if (m === current) opt.appendChild(icon("check", "lang-tick"));
      opt.addEventListener("click", function () { dlg.close(); onPick(m); });
      grid.appendChild(opt);
    });
    find.addEventListener("input", function () {
      var q = find.value.trim().toLowerCase();
      [].forEach.call(grid.children, function (o) { o.hidden = q && o.dataset.q.indexOf(q) === -1; });
    });
    close.addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { dlg.remove(); });
    document.body.appendChild(dlg);
    dlg.showModal();
  }

  function bookList(all) {
    var mediums = mediumsOf(all);
    if (filters.m !== "All" && mediums.indexOf(filters.m) === -1) filters.m = mediums[0] || "All";
    var bar = el("div", "filterbar");
    var top = el("div", "filter-top");
    var countEl = el("span", "filter-count");
    var chipsBox = el("div", "subj-chips");
    var results = el("div", "tiles");
    function inLang(b) { return filters.m === "All" || b.m === filters.m; }
    function langLabel() { return filters.m === "All" ? "All languages" : filters.m; }
    function pickLang(m) {
      filters.m = m;
      save("ncert-lang", m);
      drawLang();
      drawChips();
      draw();
    }
    function drawLang() {
      top.textContent = "";
      var quiet = el("button", "lang-quiet");
      quiet.type = "button";
      quiet.appendChild(langGlyph(filters.m));
      var qtxt = el("span", "lang-txt");
      qtxt.appendChild(el("strong", null, langLabel()));
      var nat = nativeOf(filters.m)[0];
      qtxt.appendChild(el("span", null, filters.m !== "All" && nat !== filters.m ? nat : mediums.length + " languages"));
      quiet.appendChild(qtxt);
      quiet.appendChild(icon("down", "quiet-caret"));
      quiet.setAttribute("aria-label", "Medium: " + langLabel() + ". Change language");
      quiet.addEventListener("click", function () { langSheet(mediums, all, filters.m, pickLang); });
      top.appendChild(quiet);
      top.appendChild(countEl);
    }
    function drawChips() {
      var groups = groupBySubject(all.filter(inLang));
      var subjects = groups.map(function (p) { return p[0]; });
      if (subjects.indexOf(filters.s) === -1) filters.s = "All";
      chipsBox.textContent = "";
      chipsBox.hidden = subjects.length < 2;
      var total = groups.reduce(function (n, p) { return n + p[1].length; }, 0);
      var showN = total > groups.length;
      [["All", null, total]].concat(groups.map(function (p) { return [p[0], p[1][0], p[1].length]; })).forEach(function (g) {
        var name = g[0];
        var b = el("button", "schip");
        b.type = "button";
        b.style.setProperty("--c", name === "All" ? "var(--accent)" : COLORS[name] || "#64748b");
        b.appendChild(icon(name === "All" ? "book" : subjectIconName(g[1])));
        b.appendChild(el("span", null, name === "All" ? "All" : name));
        if (showN || name === "All") b.appendChild(el("span", "schip-n", String(g[2])));
        else b.classList.add("bare");
        b.setAttribute("aria-pressed", String(filters.s === name));
        b.addEventListener("click", function () {
          filters.s = name;
          [].forEach.call(chipsBox.children, function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          draw();
        });
        chipsBox.appendChild(b);
      });
    }
    function draw() {
      results.textContent = "";
      var list = all.filter(passes);
      countEl.textContent = plural(list.length, "book");
      if (!list.length) { results.appendChild(el("p", "empty", "No books match these filters.")); return; }
      groupBySubject(list).forEach(function (p) { p[1].forEach(function (b) { results.appendChild(bookTile(b)); }); });
    }
    if (mediums.length > 1) drawLang();
    else top.appendChild(countEl);
    bar.appendChild(top);
    bar.appendChild(chipsBox);
    drawChips();
    if (mediums.length > 1 || !chipsBox.hidden) app.appendChild(bar);
    app.appendChild(results);
    draw();
  }

  function classHeader(k, c) {
    save("ncert-class", c);
    var s = sectionOf(k);
    backTo = { href: location.hash, label: "Class " + c + " " + (k === "books" ? "books" : s.t.toLowerCase()), k: k, c: c };
    app.appendChild(backLink("#/" + k, s.t));
    app.appendChild(el("h1", null, "Class " + c + " " + (k === "books" ? "books" : s.t.toLowerCase())));
    var strip = classStrip(k, c);
    app.appendChild(strip);
    var cur = strip.querySelector("[aria-current]");
    if (cur) strip.scrollLeft = cur.offsetLeft - strip.offsetLeft - (strip.clientWidth - cur.offsetWidth) / 2;
  }

  function viewClass(c, tab) {
    var groups = {};
    TABS.forEach(function (t) { groups[t[0]] = inGroup(c, t[0]); });
    if (!groups[tab] || !groups[tab].length) tab = "current";
    classHeader("books", c);
    backTo.label = "Class " + c + (tab === "old" ? " old syllabus" : "");

    var nav = el("nav", "seg");
    nav.setAttribute("aria-label", "Syllabus");
    TABS.forEach(function (t) {
      if (!groups[t[0]].length) return;
      var a = internal(tabHref(c, t[0]), null, t[1]);
      if (t[0] === tab) a.setAttribute("aria-current", "page");
      nav.appendChild(a);
    });
    if (nav.children.length > 1) app.appendChild(nav);

    if (tab === "current" && NO_NEP_YET.indexOf(c) !== -1) {
      app.appendChild(el("p", "lead", "No new-syllabus books yet. These are the books schools use."));
    } else if (tab === "old") {
      app.appendChild(el("p", "lead", "Books this class used before the syllabus changed."));
    }
    bookList(groups[tab]);
  }

  function viewSolutions(c) {
    classHeader("solutions", c);
    app.appendChild(el("p", "lead", "Open a book, then tap Solve next to any chapter."));
    bookList(solutionBooks(c).sort(function (a, b) { return a.g === b.g ? 0 : a.g === "current" ? -1 : 1; }));
  }

  function viewExemplar(c) {
    classHeader("exemplar", c);
    bookList(inGroup(c, "practice"));
  }

  function viewBook(id) {
    var b = BY_ID[id];
    if (!b) { app.appendChild(el("h1", null, "Book not found")); app.appendChild(internal("#/", "btn", "Back to classes")); return; }
    save("ncert-last", b.id);

    var fromHash = backTo && backTo.c === b.c ? backTo : null;
    if (b.g === "upsc") app.appendChild(backLink("#/upsc", "UPSC"));
    else if (fromHash) app.appendChild(backLink(fromHash.href, fromHash.label));
    else app.appendChild(backLink(tabHref(b.c, b.g), "Class " + b.c + (b.g === "practice" ? " exemplar" : "")));

    var hero = el("section", "book-hero");
    var top = el("div", "hero-top");
    top.appendChild(spine(b, "big"));
    var ht = el("div", "hero-text");
    ht.appendChild(el("p", "kicker", (b.g === "upsc" ? "UPSC classic" : "Class " + b.c) + " · " + b.s));
    ht.appendChild(el("h1", null, b.t));
    top.appendChild(ht);
    hero.appendChild(top);
    var chips = el("div", "book-meta");
    if (b.by) chips.appendChild(chip(b.by));
    if (b.m && b.m !== b.s) chips.appendChild(chip(b.m));
    if (b.ch.length) chips.appendChild(chip(plural(countable(b) || b.ch.length, "chapter")));
    if (b.g !== "upsc") chips.appendChild(chip(GROUP_LABEL[b.g]));
    if (b.sol) chips.appendChild(chip("Solutions", "sol"));
    hero.appendChild(chips);
    if (b.note) hero.appendChild(el("p", "note", b.note));

    var actions = el("div", "hero-actions");
    function heroBtn(href, cls, ic, label) {
      var a = ext(href, "btn " + cls);
      a.appendChild(icon(ic));
      a.appendChild(document.createTextNode(label));
      actions.appendChild(a);
    }
    var firstReal = b.ch.filter(function (c) { return !/^prelims$/i.test(c[0]); })[0];
    if (b.full) heroBtn(b.full, "primary", "file", "Read full book");
    else if (firstReal) heroBtn(firstReal[1], "primary", "file", "Start reading");
    if (b.sol) heroBtn(solUrl(b), "sol", "bulb", "Solutions");
    if (!b.ch.length && !b.full) {
      heroBtn(dikshaSearch(b.t + " class " + b.c), "", "globe", "Search DIKSHA");
      heroBtn(archiveSearch("NCERT " + b.t), "", "globe", "Search Archive");
    }
    hero.appendChild(actions);
    var extra = el("div", "hero-extra");
    if (b.zip) extra.appendChild(ext(b.zip, null, "Download ZIP"));
    if (b.page) extra.appendChild(ext(b.page, null, b.src === "diksha" ? "Open on DIKSHA" : b.src === "mirror" ? "Source page" : "Internet Archive page"));
    if (extra.children.length) hero.appendChild(extra);
    app.appendChild(hero);

    if (b.replacedBy.length || b.replaces.length) {
      var pair = el("section", "pair");
      pair.appendChild(el("h2", null, b.replacedBy.length ? "Replaced by" : "Replaces"));
      var pl = el("div", "list");
      (b.replacedBy.length ? b.replacedBy : b.replaces).forEach(function (x) { pl.appendChild(bookRow(x, { noPair: true })); });
      pair.appendChild(pl);
      app.appendChild(pair);
    }

    if (b.ch.length) {
      var total = countable(b);
      var sec = el("section", "chapter-sec");
      var h = el("div", "chapter-head");
      h.appendChild(el("h2", null, "Chapters"));
      var status = el("span", "progress-text");
      h.appendChild(status);
      sec.appendChild(h);
      var bar = el("div", "progress");
      var fill = el("span");
      bar.appendChild(fill);
      if (total) sec.appendChild(bar);

      var list = el("ol", "chapters");
      var ticks = [];
      function refresh() {
        var done = readCount(b);
        status.textContent = total ? done + "/" + total + " read" : "";
        fill.style.width = total ? Math.round(done / total * 100) + "%" : "0";
        ticks.forEach(function (t) {
          var on = readOf(b).indexOf(t[1]) !== -1;
          t[0].setAttribute("aria-pressed", String(on));
          t[2].classList.toggle("done", on);
        });
      }
      b.ch.forEach(function (c, i) {
        var li = el("li", "ch-row");
        var prelims = /^prelims$/i.test(c[0]);
        var num = el("button", "ch-num");
        num.type = "button";
        num.appendChild(el("span", "n", chapterNumber(c[0], i)));
        num.appendChild(icon("check", "tickmark"));
        if (prelims) num.disabled = true;
        num.setAttribute("aria-label", "Mark " + c[0] + " as read");
        num.addEventListener("click", function () { setRead(b, i, readOf(b).indexOf(i) === -1); refresh(); });
        li.appendChild(num);
        li.appendChild(el("span", "ch-name", prelims ? "Prelims" : chapterTitle(c[0])));
        var btns = el("span", "ch-acts");
        var pdf = ext(c[1], "pill-btn");
        pdf.appendChild(icon("file"));
        pdf.appendChild(document.createTextNode("PDF"));
        pdf.setAttribute("aria-label", "Open " + c[0] + " PDF");
        pdf.addEventListener("click", function () { if (!prelims) { setRead(b, i, true); refresh(); } });
        btns.appendChild(pdf);
        if (b.sol && b.sol.c && b.sol.c[String(i)]) {
          var sv = ext(solUrl(b, b.sol.c[String(i)]), "pill-btn sol");
          sv.appendChild(icon("bulb"));
          sv.appendChild(document.createTextNode("Solve"));
          sv.setAttribute("aria-label", "Solutions for " + c[0]);
          btns.appendChild(sv);
        }
        li.appendChild(btns);
        if (!prelims) ticks.push([num, i, li]);
        list.appendChild(li);
      });
      sec.appendChild(list);
      sec.appendChild(el("p", "source", "Tap a chapter number to mark it read. Opening a PDF marks it too. Solutions open on Tiwari Academy, an independent site — check them against the textbook."));
      app.appendChild(sec);
      refresh();
    } else if (!b.full) {
      app.appendChild(el("p", "note", "No working PDF was found for this book on DIKSHA or the Internet Archive."));
    }

    var src = el("p", "source");
    if (b.src) src.appendChild(document.createTextNode("Direct PDFs from " + sourceName(b.src) + ". "));
    if (b.src !== "ncert" && b.ch.some(function (c) { return c[1].indexOf("https://ncert.nic.in/") === 0; })) {
      src.appendChild(document.createTextNode("Missing chapters added from ncert.nic.in. "));
    }
    if (b.off) {
      src.appendChild(document.createTextNode("Also on "));
      src.appendChild(ext(b.off, null, "ncert.nic.in"));
      src.appendChild(document.createTextNode(" · code " + b.id.replace(/^(old|ex)-/, "")));
    }
    app.appendChild(src);
  }

  function upscAuthor(b) {
    var by = String(b.by || "");
    var year = (by.match(/\b(1[89]\d\d|20\d\d)\b/) || [])[1] || "";
    var parts = by.replace(/\s*\(?\b(1[89]\d\d|20\d\d)\b\)?/, "").split(",");
    var extra = parts.slice(1).join(",").replace(/^\s*Hindi\s*$/i, "").trim();
    return { name: parts[0].trim() || b.t, extra: extra, year: year };
  }
  function upscBooks(step) {
    return step.ids.map(function (id) { return BY_ID[id]; }).filter(Boolean);
  }
  function upscRead(b, cls) {
    var href = b.full || (b.ch[0] && b.ch[0][1]);
    if (!href) return null;
    var read = ext(href, "pill-btn " + (cls || ""));
    read.appendChild(icon("file"));
    read.appendChild(document.createTextNode("Read"));
    read.setAttribute("aria-label", "Read " + b.t + (b.by ? " by " + b.by : ""));
    return read;
  }
  function upscCover(b, step) {
    var by = upscAuthor(b);
    var a = internal(bookHref(b), "ucover");
    a.style.setProperty("--c", step.c);
    var face = el("span", "ucover-face");
    face.appendChild(el("span", "ucover-era", b.t));
    face.appendChild(el("strong", null, by.name));
    if (by.year) face.appendChild(el("span", "ucover-year", by.year));
    face.appendChild(icon("scroll", "ucover-ic"));
    a.appendChild(face);
    a.appendChild(el("span", "ucover-sub", "Class " + b.c + (by.extra ? " · " + by.extra : "")));
    return a;
  }

  function upscEras(box, steps) {
    var pick = Math.min(load("ncert-upsc-era", 0), steps.length - 1);
    var tabs = el("div", "uera-tabs");
    tabs.setAttribute("role", "group");
    tabs.setAttribute("aria-label", "Era");
    var panel = el("div", "uera-panel");
    function show() {
      panel.textContent = "";
      var step = steps[pick];
      panel.style.setProperty("--c", step.c);
      panel.appendChild(el("h2", "uera-t", step.t));
      if (step.d) panel.appendChild(el("p", "uera-d", step.d));
      var grid = el("div", "ucovers");
      upscBooks(step).forEach(function (b) {
        var cell = el("div", "ucell");
        cell.appendChild(upscCover(b, step));
        var r = upscRead(b, "ucell-read");
        if (r) cell.appendChild(r);
        grid.appendChild(cell);
      });
      panel.appendChild(grid);
    }
    steps.forEach(function (step, i) {
      var t = el("button", "uera-tab");
      t.type = "button";
      t.style.setProperty("--c", step.c);
      t.appendChild(el("span", "n", String(i + 1)));
      t.appendChild(document.createTextNode(step.k));
      t.setAttribute("aria-pressed", String(i === pick));
      t.addEventListener("click", function () {
        pick = i;
        save("ncert-upsc-era", i);
        [].forEach.call(tabs.children, function (x) { x.setAttribute("aria-pressed", String(x === t)); });
        tabs.scrollTo({ left: t.offsetLeft - tabs.offsetLeft - 14, behavior: "smooth" });
        show();
      });
      tabs.appendChild(t);
    });
    box.appendChild(tabs);
    box.appendChild(panel);
    if (pick > 0) tabs.scrollLeft = tabs.children[pick].offsetLeft - tabs.offsetLeft - 14;
    show();
  }

  function viewUpsc() {
    backTo = null;
    var lang = load("ncert-upsc-lang", "English");
    app.appendChild(backLink("#/", "Home"));

    var hero = el("section", "uhero");
    hero.style.setProperty("--c", sectionOf("upsc").color);
    hero.appendChild(icon("landmark", "uhero-bg"));
    hero.appendChild(el("span", "uhero-kicker", "UPSC shelf"));
    hero.appendChild(el("h1", null, "Old NCERT history"));
    hero.appendChild(el("p", null, "Out-of-print books aspirants still read, in the order they are usually read."));
    var seg = el("div", "uhero-seg");
    seg.setAttribute("role", "group");
    seg.setAttribute("aria-label", "Language");
    hero.appendChild(seg);
    app.appendChild(hero);

    var body = el("div", "ubody");
    app.appendChild(body);
    function draw() {
      body.textContent = "";
      var steps = UPSC_PATH.filter(function (s) { return s.lang === lang; });
      upscEras(body, steps);
    }
    [["English", "English"], ["Hindi", "हिंदी"]].forEach(function (l) {
      var n = UPSC.filter(function (b) { return b.m === l[0]; }).length;
      var b = el("button", null, l[1]);
      b.type = "button";
      b.appendChild(el("small", null, String(n)));
      b.setAttribute("aria-pressed", String(lang === l[0]));
      b.addEventListener("click", function () {
        lang = l[0];
        save("ncert-upsc-lang", lang);
        save("ncert-upsc-era", 0);
        [].forEach.call(seg.children, function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw();
      });
      seg.appendChild(b);
    });
    draw();

    upscOld();
  }

  function upscOld() {
    var old = el("section", "upsc-old");
    old.appendChild(el("h2", null, "Old school textbooks"));
    old.appendChild(el("p", "lead", "Many aspirants also read the pre-2024 NCERT school books. Pick a class."));
    var grid = el("div", "old-grid");
    for (var c = 1; c <= 12; c++) {
      var n = inGroup(c, "old").length;
      if (!n) continue;
      var tile = internal(tabHref(c, "old"), "old-tile");
      tile.appendChild(el("b", null, String(c)));
      tile.appendChild(el("span", null, plural(n, "book")));
      tile.setAttribute("aria-label", "Class " + c + ", " + plural(n, "old book"));
      grid.appendChild(tile);
    }
    old.appendChild(grid);
    app.appendChild(old);
  }

  function cards(items) {
    var wrap = el("div", "cards");
    items.forEach(function (it) {
      var card = el("article", "card");
      if (it.tag) card.appendChild(el("span", "tag", it.tag));
      card.appendChild(el("h3", null, it.t));
      card.appendChild(el("p", null, it.d));
      var actions = el("div", "actions");
      it.links.forEach(function (l, i) { actions.appendChild(ext(l[1], "btn" + (i === 0 ? " primary" : ""), l[0])); });
      card.appendChild(actions);
      wrap.appendChild(card);
    });
    return wrap;
  }

  function viewMore() {
    app.appendChild(backLink("#/", "Home"));
    app.appendChild(el("h1", null, "Papers & resources"));
    app.appendChild(el("p", "lead", "Sample papers and official documents that go with the textbooks."));
    app.appendChild(el("h2", null, "Papers"));
    app.appendChild(cards(PRACTICE));
    app.appendChild(el("h2", null, "Resources"));
    app.appendChild(cards(RESOURCES));
  }

  function viewSearch(q) {
    app.appendChild(el("h1", null, "Search"));
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = BOOKS.filter(function (b) {
      var hay = [b.t, b.s, b.m, b.id, b.by || "", "class " + b.c, GROUP_LABEL[b.g], b.e === "nep" ? "nep 2020" : "", b.g === "old" || b.g === "upsc" ? "old ncert" : "", b.g === "upsc" ? "upsc" : "", b.sol ? "solutions" : ""].join(" ").toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });
    app.appendChild(el("p", "lead", plural(hits.length, "book") + " for “" + q + "”"));
    if (!hits.length) { app.appendChild(el("p", "empty", "Nothing found. Try a shorter word, a subject, or a class like “class 10”.")); return; }
    for (var c = 1; c <= 12; c++) {
      var list = hits.filter(function (b) { return b.c === c; });
      if (!list.length) continue;
      app.appendChild(el("h2", null, "Class " + c));
      var box = el("div", "list");
      list.forEach(function (b) { box.appendChild(bookRow(b, { tag: true })); });
      app.appendChild(box);
    }
  }

  /* ---------- routing ---------- */
  function route() {
    var hash = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    var parts = hash.split("/");
    var name = "home";
    var n = +parts[1];
    var validClass = n >= 1 && n <= 12;
    if (parts[0] === "old") { location.replace("#/upsc"); return; }
    if (parts[0] === "class" && parts[2] === "practice") { location.replace("#/exemplar/" + parts[1]); return; }
    [].forEach.call(document.querySelectorAll("dialog.sheet"), function (d) { d.close(); });
    app.textContent = "";
    if (parts[0] === "class" && validClass) { name = "books"; viewClass(n, parts[2] || "current"); }
    else if (parts[0] === "books") { name = "books"; viewSection("books"); }
    else if ((parts[0] === "solutions" || parts[0] === "exemplar") && validClass && SECTION_BOOKS[parts[0]](n)) {
      name = parts[0];
      if (name === "solutions") viewSolutions(n); else viewExemplar(n);
    }
    else if (parts[0] === "solutions" || parts[0] === "exemplar") { name = parts[0]; viewSection(name); }
    else if (parts[0] === "book" && parts[1]) {
      var bk = BY_ID[parts.slice(1).join("/")];
      name = bk && bk.g === "upsc" ? "upsc" : backTo && bk && backTo.c === bk.c ? backTo.k : bk && bk.g === "practice" ? "exemplar" : "books";
      viewBook(parts.slice(1).join("/"));
    }
    else if (parts[0] === "upsc") { name = "upsc"; viewUpsc(); }
    else if (parts[0] === "more") { name = "more"; viewMore(); }
    else if (parts[0] === "search" && parts.slice(1).join("/").trim()) {
      name = "search";
      var query = parts.slice(1).join("/").trim();
      if (document.activeElement !== searchInput) searchInput.value = query;
      viewSearch(query);
    }
    else viewHome();

    [].forEach.call(document.querySelectorAll("[data-route]"), function (a) {
      if (a.dataset.route === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (name !== "search") searchInput.value = "";
    window.scrollTo(0, 0);
  }

  document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var q = searchInput.value.trim();
    location.hash = q ? "#/search/" + encodeURIComponent(q) : "#/";
  });
  var timer;
  searchInput.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      var q = searchInput.value.trim();
      if (q.length >= 2) history.replaceState(null, "", "#/search/" + encodeURIComponent(q));
      else if (!q && /^#\/search/.test(location.hash)) history.replaceState(null, "", "#/");
      else return;
      var keep = searchInput.value;
      route();
      searchInput.value = keep;
    }, 220);
  });
  [].forEach.call(document.querySelectorAll("[data-icon]"), function (n) {
    n.textContent = "";
    n.appendChild(icon(n.dataset.icon));
  });
  var themeBtn = document.getElementById("themeBtn");
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t === "dark" ? "#0d1017" : "#f6f7fb";
    themeBtn.textContent = "";
    themeBtn.appendChild(icon(t === "dark" ? "sun" : "moon"));
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    themeBtn.title = themeBtn.getAttribute("aria-label");
  }
  applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  themeBtn.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("ncert-theme", next); } catch (e) { /* storage off */ }
    applyTheme(next);
  });
  if (window.matchMedia) {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      var saved;
      try { saved = localStorage.getItem("ncert-theme"); } catch (err) { /* storage off */ }
      if (!saved) applyTheme(e.matches ? "dark" : "light");
    });
  }
  window.addEventListener("hashchange", route);
  route();
})();
