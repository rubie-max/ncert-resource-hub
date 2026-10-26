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
  var EDITIONS = ["All", "NEP 2020", "Earlier"];

  var CURRENT = BOOKS.filter(function (b) { return b.e === "nep" || b.e === "old"; });
  var CLASSICS = BOOKS.filter(function (b) { return b.e === "classic"; });
  var REPLACED = BOOKS.filter(function (b) { return b.e === "replaced"; });

  var PRACTICE = [
    { t: "NCERT Exemplar Problems", d: "Extra questions with answers for Maths and Science, Classes 6–12.",
      links: [["Exemplars on DIKSHA", dikshaSearch("NCERT exemplar")], ["Find on Internet Archive", archiveSearch("NCERT exemplar problems")]] },
    { t: "Lab Manuals", d: "NCERT laboratory manuals for Science, Physics, Chemistry, Biology and Maths.",
      links: [["Search DIKSHA", dikshaSearch("NCERT laboratory manual")], ["Find on Internet Archive", archiveSearch("NCERT laboratory manual")]] },
    { t: "CBSE Sample Papers", d: "Official sample question papers and marking schemes for Classes 10 and 12.",
      links: [["CBSE Academic", "https://cbseacademic.nic.in/"]] },
    { t: "Previous Year Papers", d: "Official CBSE board question papers.",
      links: [["CBSE question papers", "https://www.cbse.gov.in/cbsenew/question-paper.html"]] },
    { t: "NCERT Solutions", tag: "Independent websites", d: "Free step-by-step answers. Check them against the textbook.",
      links: [["LearnCBSE", "https://www.learncbse.in/"], ["Tiwari Academy", "https://www.tiwariacademy.com/"]] }
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

  var app = document.getElementById("app");
  var searchInput = document.getElementById("q");
  var filters = { m: "All", e: "All", s: "All" };

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
    return "Internet Archive";
  }
  function chapterNumber(name, index) {
    if (/^prelims$/i.test(name)) return "P";
    var m = String(name).match(/(\d+)/);
    return m ? m[1] : String(index + 1);
  }

  function bookMeta(b) {
    var bits = [];
    if (b.by) bits.push(b.by);
    if (b.e === "classic" || b.e === "replaced") bits.push("Class " + b.c);
    if (b.m && b.m !== b.s) bits.push(b.m);
    if (b.full) bits.push("Full book PDF");
    else if (b.ch.length) bits.push(plural(b.ch.length, "file"));
    return bits.join(" · ");
  }

  function bookRow(b) {
    var d = el("details", "book");
    var s = el("summary");
    var spine = el("span", "spine", initial(b.t));
    spine.style.background = COLORS[b.s] || "#475569";
    spine.setAttribute("aria-hidden", "true");
    var text = el("span", "book-text");
    var title = el("strong", null, b.t);
    if (b.e === "nep") title.appendChild(el("span", "badge nep", "NEP 2020"));
    if (!b.ch.length && !b.full) title.appendChild(el("span", "badge none", "No PDF yet"));
    text.appendChild(title);
    text.appendChild(el("span", null, bookMeta(b) || b.s));
    s.appendChild(spine);
    s.appendChild(text);
    s.appendChild(el("span", "chev", "›"));
    d.appendChild(s);

    d.addEventListener("toggle", function () {
      if (!d.open || d.dataset.ready) return;
      d.dataset.ready = "1";
      d.appendChild(bookBody(b));
    });
    return d;
  }

  function bookBody(b) {
    var body = el("div", "book-body");
    if (b.note) body.appendChild(el("p", "note", b.note));
    var actions = el("div", "actions");
    if (b.full) actions.appendChild(ext(b.full, "btn primary", "Open full book PDF"));
    var firstReal = b.ch.filter(function (c) { return !/^prelims$/i.test(c[0]); })[0];
    if (!b.full && firstReal) actions.appendChild(ext(firstReal[1], "btn primary", "Open first chapter"));
    if (b.zip) actions.appendChild(ext(b.zip, "btn", "Download full book (ZIP)"));
    if (b.page) actions.appendChild(ext(b.page, "btn", b.src === "diksha" ? "Read on DIKSHA" : "Archive page"));
    if (!b.ch.length && !b.full) {
      actions.appendChild(ext(dikshaSearch(b.t + " class " + b.c), "btn", "Search DIKSHA"));
      actions.appendChild(ext(archiveSearch("NCERT " + b.t), "btn", "Search Internet Archive"));
    }
    body.appendChild(actions);

    if (b.ch.length) {
      var list = el("ul", "chapters");
      b.ch.forEach(function (c, i) {
        var li = el("li");
        var a = ext(c[1], null, null);
        a.appendChild(el("span", null, chapterNumber(c[0], i)));
        a.appendChild(el("span", null, c[0]));
        li.appendChild(a);
        list.appendChild(li);
      });
      body.appendChild(list);
    } else if (!b.full) {
      body.appendChild(el("p", "note", "No working PDF was found for this book on DIKSHA or the Internet Archive."));
    }

    var src = el("p", "source");
    if (b.src) src.appendChild(document.createTextNode("Direct PDFs from " + sourceName(b.src) + ". "));
    if (b.src !== "ncert" && b.ch.some(function (c) { return c[1].indexOf("https://ncert.nic.in/") === 0; })) {
      src.appendChild(document.createTextNode("Missing chapters added from ncert.nic.in. "));
    }
    if (b.off) {
      src.appendChild(document.createTextNode("Also on "));
      src.appendChild(ext(b.off, null, "ncert.nic.in"));
      src.appendChild(document.createTextNode(" · code " + b.id));
    }
    body.appendChild(src);
    return body;
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

  function chipRow(label, items, key, onChange) {
    var row = el("div", "chip-row");
    row.appendChild(el("span", null, label));
    items.forEach(function (name) {
      var b = el("button", "chip", name);
      b.type = "button";
      b.setAttribute("aria-pressed", String(filters[key] === name));
      b.addEventListener("click", function () {
        filters[key] = name;
        [].forEach.call(row.querySelectorAll(".chip"), function (x) { x.setAttribute("aria-pressed", String(x.textContent === name)); });
        onChange();
      });
      row.appendChild(b);
    });
    return row;
  }

  function passes(b) {
    if (filters.m !== "All" && b.m !== filters.m) return false;
    if (filters.e === "NEP 2020" && b.e !== "nep") return false;
    if (filters.e === "Earlier" && b.e === "nep") return false;
    if (filters.s !== "All" && b.s !== filters.s) return false;
    return true;
  }

  /* ---------- views ---------- */
  function viewHome() {
    app.appendChild(el("h1", null, "Every NCERT book, sorted by class"));
    app.appendChild(el("p", "lead", "Pick a class to see its books by subject. Open a book for its chapters; each one is a direct PDF link."));

    var withPdf = CURRENT.filter(function (b) { return b.ch.length; }).length;
    var nep = CURRENT.filter(function (b) { return b.e === "nep"; }).length;
    var chapters = BOOKS.reduce(function (n, b) { return n + b.ch.length; }, 0);
    var stats = el("div", "stats");
    [[CURRENT.length, "Current textbooks"], [withPdf, "With direct PDFs"], [nep, "NEP 2020 books"], [chapters.toLocaleString("en-IN"), "Chapter PDFs"]].forEach(function (s) {
      var d = el("div", "stat");
      d.appendChild(el("b", null, String(s[0])));
      d.appendChild(el("span", null, s[1]));
      stats.appendChild(d);
    });
    app.appendChild(stats);

    app.appendChild(el("h2", null, "Classes"));
    var grid = el("div", "class-grid");
    for (var c = 1; c <= 12; c++) {
      var count = CURRENT.filter(function (b) { return b.c === c; }).length;
      var tile = internal("#/class/" + c, "class-tile");
      tile.appendChild(el("small", null, "Class"));
      tile.appendChild(el("b", null, String(c)));
      tile.appendChild(el("span", null, plural(count, "book")));
      grid.appendChild(tile);
    }
    var old = internal("#/old", "class-tile alt");
    old.appendChild(el("small", null, "UPSC"));
    old.appendChild(el("b", null, "Old NCERT"));
    old.appendChild(el("span", null, plural(CLASSICS.length + REPLACED.length, "book")));
    grid.appendChild(old);
    app.appendChild(grid);
  }

  function viewClass(c) {
    var all = CURRENT.filter(function (b) { return b.c === c; });
    var crumbs = el("p", "crumbs");
    crumbs.appendChild(internal("#/", null, "Classes"));
    crumbs.appendChild(document.createTextNode(" / Class " + c));
    app.appendChild(crumbs);
    app.appendChild(el("h1", null, "Class " + c));
    var mediums = mediumsOf(all);
    app.appendChild(el("p", "lead", plural(all.length, "book") + " in " + plural(mediums.length, "language") + "."));

    var subjects = ["All"].concat(groupBySubject(all).map(function (p) { return p[0]; }));
    if (subjects.indexOf(filters.s) === -1) filters.s = "All";
    var mediumChips = ["All"].concat(mediums);
    if (mediumChips.indexOf(filters.m) === -1) filters.m = "All";
    var box = el("div", "filters");
    var results = el("div");
    var count = el("p", "count");
    function draw() {
      results.textContent = "";
      var list = all.filter(passes);
      count.textContent = "Showing " + list.length + " of " + all.length;
      if (!list.length) { results.appendChild(el("p", "empty", "No books match these filters.")); return; }
      subjectBlocks(list, results);
    }
    box.appendChild(chipRow("Language", mediumChips, "m", draw));
    box.appendChild(chipRow("Edition", EDITIONS, "e", draw));
    if (subjects.length > 2) box.appendChild(chipRow("Subject", subjects, "s", draw));
    app.appendChild(box);
    app.appendChild(count);
    app.appendChild(results);
    draw();
  }

  function viewOld() {
    app.appendChild(el("h1", null, "Old NCERT books"));
    app.appendChild(el("p", "lead", "Out-of-print classics that UPSC aspirants still use, and the books replaced by the NEP 2020 series. All open from the Internet Archive."));
    app.appendChild(el("h2", null, "UPSC classics"));
    var box = el("div", "list");
    CLASSICS.forEach(function (b) { box.appendChild(bookRow(b)); });
    app.appendChild(box);
    [6, 7, 9].forEach(function (c) {
      var list = REPLACED.filter(function (b) { return b.c === c; });
      app.appendChild(el("h2", null, "Replaced Class " + c + " books"));
      var l = el("div", "list");
      list.forEach(function (b) { l.appendChild(bookRow(b)); });
      app.appendChild(l);
    });
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
    app.appendChild(el("h1", null, "Exemplars, papers & resources"));
    app.appendChild(el("p", "lead", "Practice material and official documents that go with the textbooks."));
    app.appendChild(el("h2", null, "Practice"));
    app.appendChild(cards(PRACTICE));
    app.appendChild(el("h2", null, "Resources"));
    app.appendChild(cards(RESOURCES));
  }

  function viewSearch(q) {
    app.appendChild(el("h1", null, "Search"));
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = BOOKS.filter(function (b) {
      var hay = [b.t, b.s, b.m, b.id, b.by || "", "class " + b.c, b.e === "nep" ? "nep 2020" : "", b.e === "classic" || b.e === "replaced" ? "old ncert" : ""].join(" ").toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });
    app.appendChild(el("p", "lead", plural(hits.length, "book") + " for “" + q + "”"));
    if (!hits.length) { app.appendChild(el("p", "empty", "Nothing found. Try a shorter word, a subject, or a class like “class 10”.")); return; }
    for (var c = 1; c <= 12; c++) {
      var list = hits.filter(function (b) { return b.c === c; });
      if (!list.length) continue;
      app.appendChild(el("h2", null, "Class " + c));
      var box = el("div", "list");
      list.forEach(function (b) { box.appendChild(bookRow(b)); });
      app.appendChild(box);
    }
  }

  /* ---------- routing ---------- */
  function route() {
    var hash = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    var parts = hash.split("/");
    var name = "home";
    app.textContent = "";
    if (parts[0] === "class" && +parts[1] >= 1 && +parts[1] <= 12) { name = "class"; viewClass(+parts[1]); }
    else if (parts[0] === "old") { name = "old"; viewOld(); }
    else if (parts[0] === "more") { name = "more"; viewMore(); }
    else if (parts[0] === "search" && parts.slice(1).join("/").trim()) {
      name = "search";
      var query = parts.slice(1).join("/").trim();
      if (document.activeElement !== searchInput) searchInput.value = query;
      viewSearch(query);
    }
    else viewHome();

    [].forEach.call(document.querySelectorAll(".tabs a"), function (a) {
      var current = a.dataset.route === name || (a.dataset.route === "home" && name === "class");
      if (current) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
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
