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
    { k: "books", t: "NCERT Books", d: "Textbooks, Class 1–12", mark: "B", color: "#0d7a72" },
    { k: "solutions", t: "Solutions", d: "Chapter-wise answers", mark: "S", color: "#2563eb" },
    { k: "exemplar", t: "Exemplar", d: "Extra questions & lab manuals", mark: "E", color: "#7c3aed" },
    { k: "upsc", t: "UPSC", d: "Old NCERT history classics", mark: "U", color: "#b45309" }
  ];
  var GROUP_LABEL = { current: "Current syllabus", old: "Old syllabus", practice: "Practice", upsc: "UPSC classic" };
  var NO_NEP_YET = [10, 11, 12];

  var UPSC_PATH = [
    { t: "Ancient India", d: "Start with Romila Thapar's middle-school book, then R.S. Sharma.", ids: ["classic-7", "classic-1"] },
    { t: "Medieval India", d: "The old Class 7 book, then Satish Chandra.", ids: ["classic-8", "classic-2"] },
    { t: "Modern India", d: "Bipan Chandra's Modern India.", ids: ["classic-3"] },
    { t: "Hindi editions", d: "The same three periods in Hindi.", ids: ["classic-4", "classic-5", "classic-6"] },
    { t: "The 2002 series", d: "The short-lived replacements, still read for a second view.", ids: ["classic-9", "classic-10", "classic-11"] },
    { t: "Other out-of-print books", d: "", ids: ["classic-12"] }
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
  function chapterNumber(name, index) {
    if (/^prelims$/i.test(name)) return "P";
    var m = String(name).match(/(\d+)/);
    return m ? m[1] : String(index + 1);
  }
  function spine(b, cls) {
    var s = el("span", cls || "spine", initial(b.t));
    s.style.background = COLORS[b.s] || "#475569";
    s.setAttribute("aria-hidden", "true");
    return s;
  }
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
    var title = el("strong", null, b.t);
    if (opts.tag) title.appendChild(el("span", "badge " + b.g, GROUP_LABEL[b.g]));
    if (b.sol) title.appendChild(el("span", "badge sol", "Solutions"));
    if (!b.ch.length && !b.full) title.appendChild(el("span", "badge none", "No PDF yet"));
    text.appendChild(title);
    text.appendChild(el("span", null, bookMeta(b, opts.showClass)));
    if (b.replacedBy.length && opts.showPair) text.appendChild(el("span", "pair-line", "Replaced by " + titles(b.replacedBy)));
    a.appendChild(text);
    var done = readCount(b), total = countable(b);
    if (done) a.appendChild(el("span", "row-progress", done + "/" + total));
    a.appendChild(el("span", "chev", "›"));
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

  function viewHome() {
    var last = BY_ID[load("ncert-last", "")];
    app.appendChild(el("h1", null, "NCERT Library"));
    var grid = el("div", "sections");
    SECTIONS.forEach(function (s) {
      var a = internal("#/" + s.k, "section-card");
      var mark = el("span", "section-mark", s.mark);
      mark.style.background = s.color;
      mark.setAttribute("aria-hidden", "true");
      a.appendChild(mark);
      a.appendChild(el("b", null, s.t));
      a.appendChild(el("span", null, s.d));
      grid.appendChild(a);
    });
    app.appendChild(grid);

    if (last) {
      var cont = internal(bookHref(last), "continue-card");
      cont.appendChild(el("small", null, "Continue reading"));
      cont.appendChild(el("b", null, last.t));
      var total = countable(last);
      cont.appendChild(el("span", null, "Class " + last.c + (total ? " · " + readCount(last) + "/" + total + " read" : "")));
      app.appendChild(cont);
    }
    app.appendChild(internal("#/more", "home-link", "Sample papers & resources"));
  }

  function viewSection(k) {
    var s = sectionOf(k);
    var mine = load("ncert-class", null);
    app.appendChild(internal("#/", "back", "← Home"));
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

  function bookList(all) {
    var mediums = mediumsOf(all);
    var subjects = ["All"].concat(groupBySubject(all).map(function (p) { return p[0]; }));
    if (subjects.indexOf(filters.s) === -1) filters.s = "All";
    var mediumChips = ["All"].concat(mediums);
    if (mediumChips.indexOf(filters.m) === -1) filters.m = mediums[0] || "All";
    var results = el("div");
    var count = el("p", "count");
    function draw() {
      results.textContent = "";
      var list = all.filter(passes);
      count.textContent = "Showing " + list.length + " of " + all.length;
      if (!list.length) { results.appendChild(el("p", "empty", "No books match these filters.")); return; }
      subjectBlocks(list, results);
    }
    if (mediums.length > 1 || subjects.length > 2) {
      var box = el("div", "filters");
      if (mediums.length > 1) box.appendChild(chipRow("Language", mediumChips, "m", draw));
      if (subjects.length > 2) box.appendChild(chipRow("Subject", subjects, "s", draw));
      app.appendChild(box);
    }
    app.appendChild(count);
    app.appendChild(results);
    draw();
  }

  function classHeader(k, c) {
    save("ncert-class", c);
    var s = sectionOf(k);
    backTo = { href: location.hash, label: "Class " + c + " " + (k === "books" ? "books" : s.t.toLowerCase()), k: k, c: c };
    app.appendChild(internal("#/" + k, "back", "← " + s.t));
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
    if (b.g === "upsc") app.appendChild(internal("#/upsc", "back", "← UPSC"));
    else if (fromHash) app.appendChild(internal(fromHash.href, "back", "← " + fromHash.label));
    else app.appendChild(internal(tabHref(b.c, b.g), "back", "← Class " + b.c + (b.g === "practice" ? " exemplar" : "")));

    var head = el("div", "book-head");
    head.appendChild(spine(b, "spine big"));
    var ht = el("div");
    ht.appendChild(el("span", "badge " + b.g, GROUP_LABEL[b.g]));
    ht.appendChild(el("h1", null, b.t));
    ht.appendChild(el("p", "lead", bookMeta(b, true)));
    head.appendChild(ht);
    app.appendChild(head);

    if (b.note) app.appendChild(el("p", "note", b.note));

    var actions = el("div", "actions hero-actions");
    if (b.full) actions.appendChild(ext(b.full, "btn primary", "Full book"));
    var firstReal = b.ch.filter(function (c) { return !/^prelims$/i.test(c[0]); })[0];
    if (!b.full && firstReal) actions.appendChild(ext(firstReal[1], "btn primary", "Open PDF"));
    if (b.sol) actions.appendChild(ext(solUrl(b), "btn sol", "Solutions"));
    if (b.zip) actions.appendChild(ext(b.zip, "btn more-btn", "ZIP"));
    if (b.page) actions.appendChild(ext(b.page, "btn more-btn", b.src === "diksha" ? "DIKSHA" : b.src === "mirror" ? "Source" : "Archive"));
    if (!b.ch.length && !b.full) {
      actions.appendChild(ext(dikshaSearch(b.t + " class " + b.c), "btn", "Search DIKSHA"));
      actions.appendChild(ext(archiveSearch("NCERT " + b.t), "btn", "Search Archive"));
    }
    app.appendChild(actions);

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
      sec.appendChild(bar);

      var list = el("ul", "chapters");
      var ticks = [];
      function refresh() {
        var done = readCount(b);
        status.textContent = total ? done + " of " + plural(total, "chapter") + " read" : "";
        fill.style.width = total ? Math.round(done / total * 100) + "%" : "0";
        ticks.forEach(function (t) { t[0].setAttribute("aria-pressed", String(readOf(b).indexOf(t[1]) !== -1)); t[2].classList.toggle("done", readOf(b).indexOf(t[1]) !== -1); });
      }
      b.ch.forEach(function (c, i) {
        var li = el("li", "ch-card");
        var top = el("div", "ch-top");
        var prelims = /^prelims$/i.test(c[0]);
        var tick = el("button", "tick" + (prelims ? " blank" : ""));
        if (prelims) tick.disabled = true;
        tick.type = "button";
        tick.title = "Mark as read";
        tick.setAttribute("aria-label", "Mark " + c[0] + " as read");
        tick.addEventListener("click", function () { setRead(b, i, readOf(b).indexOf(i) === -1); refresh(); });
        var title = el("div", "ch-title");
        title.appendChild(el("b", null, chapterNumber(c[0], i)));
        title.appendChild(el("span", null, c[0]));
        top.appendChild(tick);
        top.appendChild(title);
        li.appendChild(top);
        var btns = el("div", "ch-btns");
        var pdf = ext(c[1], "btn primary", "PDF");
        pdf.addEventListener("click", function () { if (!prelims) { setRead(b, i, true); refresh(); } });
        btns.appendChild(pdf);
        if (b.sol && b.sol.c && b.sol.c[String(i)]) {
          btns.appendChild(ext(solUrl(b, b.sol.c[String(i)]), "btn sol", "Solve"));
        }
        li.appendChild(btns);
        ticks.push([tick, i, li]);
        list.appendChild(li);
      });
      sec.appendChild(list);
      sec.appendChild(el("p", "source", "Opening a chapter marks it as read. Progress stays in this browser. Solutions open on Tiwari Academy, an independent site — check them against the textbook."));
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

  function viewUpsc() {
    backTo = null;
    app.appendChild(internal("#/", "back", "← Home"));
    app.appendChild(el("h1", null, "UPSC"));
    app.appendChild(el("p", "lead", "Out-of-print NCERT history books that UPSC aspirants still read, in the order they are usually read."));
    var ol = el("ol", "steps");
    UPSC_PATH.forEach(function (step) {
      var li = el("li");
      li.appendChild(el("h2", null, step.t));
      if (step.d) li.appendChild(el("p", "lead", step.d));
      var box = el("div", "list");
      step.ids.forEach(function (id) { if (BY_ID[id]) box.appendChild(bookRow(BY_ID[id], { showClass: true })); });
      li.appendChild(box);
      ol.appendChild(li);
    });
    app.appendChild(ol);

    app.appendChild(el("h2", null, "Old school textbooks"));
    app.appendChild(el("p", "lead", "Many aspirants also read the pre-2024 school books. They are in each class's Old syllabus tab."));
    var grid = el("div", "class-grid");
    for (var c = 1; c <= 12; c++) {
      var n = inGroup(c, "old").length;
      if (!n) continue;
      var tile = internal(tabHref(c, "old"), "class-tile");
      tile.appendChild(el("small", null, "Class"));
      tile.appendChild(el("b", null, String(c)));
      tile.appendChild(el("span", null, plural(n, "old book")));
      grid.appendChild(tile);
    }
    app.appendChild(grid);
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
    app.appendChild(internal("#/", "back", "← Home"));
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
  window.addEventListener("hashchange", route);
  route();
})();
