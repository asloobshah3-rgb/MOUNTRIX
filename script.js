const FALLBACK_IMAGE = "mountain-fallback.svg";
const PHOTO_CACHE_KEY = "summit-atlas-wikipedia-photos-v5";
// Set an international-format business number here; leave blank to let visitors choose a WhatsApp recipient.
const WHATSAPP_BUSINESS_NUMBER = "";
const photoRequests = new Map();
let mountains = [];
let selectTourForEnquiry = null;

const journalArticles = [
  {
    id: "high-altitude-trekking",
    category: "FIELD NOTES · 8 MIN READ",
    title: "How to Prepare for High-Altitude Trekking",
    summary: "A thoughtful guide to training, acclimatization and making safer decisions above the tree line.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=85",
    alt: "Hikers following a trail through a high mountain landscape",
    content: [
      "High-altitude trekking rewards patience more than speed. Above 2,500 metres, the body needs time to adapt to thinner air; fitness helps, but it does not prevent altitude illness.",
      "Build a steady aerobic base with regular walking and progressively longer days carrying the pack you plan to use. Train on hills or stairs when possible, and practice using your footwear and layers before the trip.",
      "Once on the trail, gain elevation gradually, plan rest days and drink to thirst. Tell your guide or group promptly about headache, nausea, dizziness or unusual fatigue. Worsening symptoms mean stopping ascent and seeking qualified help; severe symptoms require descent and urgent care.",
      "A realistic itinerary, local expertise, suitable insurance and a flexible turnaround plan are essential parts of preparation. The summit is optional; returning safely is the goal."
    ]
  },
  {
    id: "history-of-k2",
    category: "MOUNTAIN HISTORY · 7 MIN READ",
    title: "The History of K2",
    summary: "From a surveyor's simple notation to one of the most storied peaks in mountaineering.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
    alt: "Snow-covered Karakoram-style peaks beneath a starry sky",
    content: [
      "K2 received its concise name during the Great Trigonometrical Survey of India. Surveyor Thomas Montgomerie marked it as the second peak he observed in the Karakoram; the label stayed when no widely used local name was established for the summit.",
      "The mountain's remote location and steep faces made early expeditions difficult to organize. Italian climbers Lino Lacedelli and Achille Compagnoni reached the 8,611-metre summit in 1954, the first successful ascent.",
      "K2's climbing history is also a history of local knowledge and labor. Balti porters, guides and high-altitude workers have made expeditions possible, and their contribution deserves recognition in every account of the mountain.",
      "Today K2 remains a serious technical undertaking. Its weather, altitude and objective hazards demand careful preparation, respect for local communities and sound decisions at every stage."
    ]
  },
  {
    id: "exploring-himalayas",
    category: "REGION GUIDE · 6 MIN READ",
    title: "Exploring the Himalayas",
    summary: "A region of immense peaks, living cultures, protected landscapes and journeys at every pace.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    alt: "A dramatic ridge of Himalayan-scale snow-covered peaks",
    content: [
      "The Himalaya is not a single destination but a vast arc of mountains crossing several countries. Its landscapes range from subtropical forests and terraced fields to high deserts, glaciers and the world's tallest summits.",
      "Trekking routes connect communities, monasteries, valleys and mountain lodges. Well-known journeys include Nepal's Khumbu and Annapurna regions, while quieter trails in India and Bhutan offer very different settings and access requirements.",
      "Travel slowly and learn local customs before you arrive. Use registered local guides, ask before photographing people or sacred places, and carry out all waste. Weather and access can change quickly, so keep plans flexible.",
      "The best Himalayan trip is not necessarily the highest one. A village walk, a forest trail or a few days in a valley can offer a more meaningful connection than a hurried itinerary."
    ]
  },
  {
    id: "pakistan-mountains",
    category: "DESTINATION GUIDE · 9 MIN READ",
    title: "Best Mountain Destinations in Pakistan",
    summary: "A closer look at the Karakoram, the western Himalaya and the valleys between their great peaks.",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85",
    alt: "Mountain ridges and valleys in a remote high-altitude landscape",
    content: [
      "Northern Pakistan holds an extraordinary concentration of high mountains. The Karakoram is home to K2, Broad Peak and the Gasherbrum group, while the western Himalaya includes Nanga Parbat.",
      "The Baltoro Glacier trek to Concordia is among the region's most celebrated journeys, with a long approach over demanding glacial terrain. Fairy Meadows offers a different perspective on Nanga Parbat, and Hunza's villages and valleys make a rewarding base for cultural and scenic travel.",
      "Conditions vary by season, road access and local advisories. Confirm permits, transport, guide arrangements and current travel advice before booking. Remote journeys need time buffers and a plan for changing weather.",
      "Choose local operators who prioritize fair employment, community consent and low-impact travel. A good itinerary respects the scale of the landscape and the people who call it home."
    ]
  },
  {
    id: "climbing-equipment",
    category: "PRACTICAL GUIDE · 5 MIN READ",
    title: "Essential Mountain Climbing Equipment",
    summary: "The right kit depends on the route; start with the conditions, expert advice and a tested equipment list.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=85",
    alt: "Mountaineering equipment prepared for an alpine trip",
    content: [
      "Mountain equipment is route-specific. A summer valley hike, a glaciated trekking pass and a technical alpine climb require different skills and different gear. Ask a qualified guide or expedition leader for a list tailored to the conditions.",
      "For most mountain days, reliable layered clothing, broken-in footwear, sun protection, water capacity, navigation, a headlamp, first aid and emergency communication are foundational. Carry extra insulation and weather protection even when the forecast looks favorable.",
      "Technical terrain may require a helmet, harness, rope, crampons, ice axe and avalanche equipment. These items only help when you know how to use them; take instruction and practice before the trip.",
      "Inspect and test equipment before departure, understand your group's emergency plan, and never rely on a checklist as a substitute for training or sound judgment."
    ]
  },
  {
    id: "acclimatization",
    category: "MOUNTAIN KNOWLEDGE · 6 MIN READ",
    title: "Understanding High-Altitude Acclimatization",
    summary: "What happens as you go higher, why gradual ascent matters and when symptoms call for action.",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85",
    alt: "A high mountain trail climbing toward a distant summit",
    content: [
      "At altitude, each breath delivers less oxygen than it does at sea level. The body begins adapting, but these changes take time and differ from person to person. Being strong or having visited altitude before does not guarantee protection from illness.",
      "Common guidance for trekking is to increase sleeping elevation gradually once above about 3,000 metres and to include rest or acclimatization days. Exact plans depend on the route, health, altitude profile and professional advice.",
      "Headache, nausea, dizziness and unusual tiredness can be early warning signs. Do not ascend with symptoms that are getting worse. Confusion, loss of coordination, severe breathlessness at rest or a worsening cough are emergencies: descend and seek medical help immediately.",
      "Medication and supplemental oxygen decisions belong with qualified medical professionals. A conservative itinerary and the willingness to turn around are the most important tools a traveler brings."
    ]
  }
];

function announce(message) {
  const status = document.querySelector("#siteStatus");
  if (status) status.textContent = message;
}

function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("summit-atlas-favorites") || "[]");
    return Array.isArray(saved) ? saved.filter(id => typeof id === "string") : [];
  } catch (error) {
    console.error("Could not read saved mountains.", error);
    announce("Saved favorites could not be read from this browser.");
    return [];
  }
}

function saveFavorites(ids) {
  try {
    localStorage.setItem("summit-atlas-favorites", JSON.stringify(ids));
    return true;
  } catch (error) {
    console.error("Could not save favorite mountains.", error);
    announce("Favorites could not be saved in this browser. Check its storage settings.");
    return false;
  }
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const saved = favorites.includes(id);
  const updated = saved ? favorites.filter(item => item !== id) : [...favorites, id];
  saveFavorites(updated);
  document.querySelectorAll(`[data-favorite="${id}"]`).forEach(button => {
    button.classList.toggle("is-favorite", !saved);
    button.setAttribute("aria-pressed", String(!saved));
    button.setAttribute("aria-label", `${saved ? "Add" : "Remove"} ${mountains.find(item => item.id === id)?.name || "mountain"} ${saved ? "to" : "from"} favorites`);
    button.textContent = saved ? "♡" : "♥";
  });
  if (document.body.dataset.page === "favorites") renderFavorites();
}

function favoriteButton(mountain) {
  const active = getFavorites().includes(mountain.id);
  return `<button class="favorite-button${active ? " is-favorite" : ""}" type="button" data-favorite="${mountain.id}" aria-pressed="${active}" aria-label="${active ? "Remove" : "Add"} ${mountain.name} ${active ? "from" : "to"} favorites">${active ? "♥" : "♡"}</button>`;
}

function mountainCard(mountain, index = 0) {
  return `<article class="mountain-card reveal" style="--card-index:${index % 6}">
    <a class="mountain-card-link" href="mountain.html?id=${encodeURIComponent(mountain.id)}" aria-label="Explore ${mountain.name}">
      <img class="mountain-photo" src="${FALLBACK_IMAGE}" data-mountain-photo="${mountain.id}" alt="${mountain.name} in ${mountain.country}" loading="lazy">
      <span class="card-photo-label">${mountain.continent}</span>
      <div class="mountain-card-copy"><p class="eyebrow">${mountain.country}</p><h3>${mountain.name}</h3><p>${mountain.range} <span>·</span> ${Number(mountain.elevation).toLocaleString()} m</p></div>
    </a>
    ${favoriteButton(mountain)}
  </article>`;
}

function mountainRegion(mountain) {
  if (mountain.continent === "Asia") return mountain.range.toLowerCase().includes("karakoram") ? "karakoram" : "himalayas";
  if (mountain.continent === "Europe") return mountain.range.toLowerCase().includes("alps") ? "alps" : "europe";
  if (mountain.continent === "South America") return "andes";
  if (mountain.continent === "Africa") return "africa";
  if (mountain.continent === "North America") return "north-america";
  return "oceania";
}

function getTourTitle(mountain) {
  if (mountain.id === "k2") return "K2 Expedition";
  if (mountain.id === "nanga-parbat") return "Nanga Parbat Adventure";
  return `${mountain.name} ${Number(mountain.elevation) >= 8000 ? "Expedition" : "Adventure"}`;
}

function getTourEstimate(mountain) {
  if (mountain.elevation >= 8000) return { duration: "24–35 days", difficulty: "Expedition" };
  if (mountain.elevation >= 6000) return { duration: "14–21 days", difficulty: "Advanced" };
  if (mountain.elevation >= 5000) return { duration: "7–12 days", difficulty: "Challenging" };
  if (mountain.elevation >= 4000) return { duration: "5–9 days", difficulty: "Moderate" };
  return { duration: "3–6 days", difficulty: "Moderate" };
}

function tourCard(mountain, index = 0) {
  const estimate = getTourEstimate(mountain);
  const detailUrl = `tours.html?tour=${encodeURIComponent(mountain.id)}#tour-detail`;
  return `<article class="tour-card mountain-tour-card reveal" style="--card-index:${index % 6}">
    <a class="tour-card-photo" href="${detailUrl}" aria-label="View ${mountain.name} tour details">
      <img class="mountain-photo" src="${FALLBACK_IMAGE}" data-mountain-photo="${mountain.id}" alt="${mountain.name} in ${mountain.country}" loading="lazy">
      <span class="tour-region-tag">${mountain.continent}</span>
      <span class="tour-elevation-tag">${Number(mountain.elevation).toLocaleString()} m</span>
    </a>
    <div class="tour-info">
      <div class="tour-card-location"><span>${mountain.country}</span><span>${mountain.range}</span></div>
      <h3><a href="${detailUrl}">${mountain.name}</a></h3>
      <p class="tour-card-description">${mountain.intro}</p>
      <div class="tour-estimates"><span><small>Suggested duration</small><strong>${estimate.duration}</strong></span><span><small>Planning level</small><strong class="difficulty-${estimate.difficulty.toLowerCase()}">${estimate.difficulty}</strong></span></div>
      <p class="estimate-disclaimer">Indicative planning estimate only</p>
      <div class="tour-card-actions"><a class="tour-details-link" href="${detailUrl}">View Tour Details <span aria-hidden="true">↗</span></a><button type="button" class="btn btn-primary tour-enquire-button" data-enquire-tour="${mountain.id}">Enquire About This Tour <span aria-hidden="true">↗</span></button></div>
    </div>
  </article>`;
}

function getTourItinerary(mountain, duration) {
  if (mountain.elevation >= 8000) {
    return [
      ["Days 1–3", "Arrival, local orientation and gradual acclimatization."],
      ["Days 4–10", "Approach journey, rest days and preparation for a high mountain objective."],
      ["Days 11–24", "Flexible acclimatization and weather window; technical objectives require qualified expedition leadership."],
      ["Days 25–35", "Contingency, descent and return journey. The exact length depends on access and conditions."]
    ];
  }
  if (mountain.elevation >= 6000) {
    return [
      ["Days 1–2", "Arrival, equipment review and time to adjust to local conditions."],
      ["Days 3–9", "Suggested approach and progressive acclimatization, with flexible rest days."],
      ["Days 10–15", "Trekking objective or guided mountain attempt, subject to skills and current conditions."],
      ["Days 16–21", "Descent, contingency time and return to the gateway."]
    ];
  }
  return [
    ["Days 1–2", "Arrive in the gateway region and prepare for the journey."],
    ["Days 3–5", "Begin the route at a comfortable pace, allowing time for local acclimatization."],
    ["Days 6–8", "Explore the mountain landscape and return by the planned route."],
    ["Remaining days", `Allow time for a gradual return and flexible travel. Suggested total: ${duration}.`]
  ];
}

function buildTourEnquiryMessage(form) {
  const data = new FormData(form);
  const lines = [
    `Hello, I'm interested in the ${data.get("selectedTour")} mountain tour.`,
    data.get("travellers") ? `Travellers: ${data.get("travellers")}` : "",
    data.get("preferredDate") ? `Preferred date: ${data.get("preferredDate")}` : "",
    data.get("message") ? `Enquiry: ${data.get("message")}` : ""
  ].filter(Boolean);
  return lines.join("\n");
}

function setupShell() {
  const current = location.pathname.split("/").pop() || "index.html";
  const navItems = [
    ["Home", "index.html"],
    ["Destinations", "destinations.html"],
    ["Tours", "tours.html"],
    ["Journal", "journal.html"],
    ["Favorites", "favorites.html"],
    ["About Us", "about.html"],
    ["Contact", "contact.html"]
  ];
  const activePage = current === "mountain.html" || current === "destination.html" ? "destinations.html" : current === "article.html" ? "journal.html" : current;
  const header = document.querySelector(".navbar");
  if (header) {
    header.innerHTML = `<a class="logo" href="index.html" aria-label="Summit Atlas home">SUMMIT<span>ATLAS</span><i>.</i></a>
      <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primaryNav"><span></span><span></span></button>
      <nav class="nav-links" id="primaryNav" aria-label="Main navigation">${navItems.map(([label, href]) => `<a href="${href}"${activePage === href ? ' class="active" aria-current="page"' : ""}>${label}</a>`).join("")}</nav>`;
  }
  const footer = document.querySelector(".footer");
  if (footer) {
    footer.innerHTML = `<div class="footer-main">
        <div class="footer-brand"><a class="logo" href="index.html">SUMMIT<span>ATLAS</span><i>.</i></a><p>A field guide to the world's great mountains, the journeys between them and the people who call them home.</p>
        <div class="social-links" aria-label="Social platforms"><span aria-label="Instagram">ig</span><span aria-label="YouTube">yt</span><span aria-label="Facebook">f</span></div></div>
        <div><h2>Explore</h2><a href="destinations.html">All mountains</a><a href="journal.html">Travel journal</a><a href="favorites.html">Your favorites</a><a href="gallery.html">Photo gallery</a></div>
        <div><h2>Summit Atlas</h2><a href="about.html">Our story</a><a href="tours.html">Adventure experiences</a><a href="contact.html">Contact us</a><a href="contact.html#faq">FAQs</a></div>
      </div><div class="footer-bottom"><span>© <span class="year">${new Date().getFullYear()}</span> Summit Atlas</span><span>Go thoughtfully. Leave no trace.</span></div>`;
  }
  if (header) {
    const button = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".nav-links");
    button.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation menu");
      }
    });
    document.addEventListener("click", event => {
      if (!header.contains(event.target)) {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite]");
    if (button) {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(button.dataset.favorite);
    }
  });
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-enquire-tour]");
    if (!button || !selectTourForEnquiry) return;
    event.preventDefault();
    selectTourForEnquiry(button.dataset.enquireTour);
  });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(element => observer.observe(element));
}

function getPhotoCache() {
  try {
    return JSON.parse(sessionStorage.getItem(PHOTO_CACHE_KEY) || "{}");
  } catch (error) {
    console.error("Could not read photo cache.", error);
    return {};
  }
}

function setPhotoCache(cache) {
  try {
    sessionStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn("Mountain photos will not be cached for this session.", error);
  }
}

function normalizePhotoName(value) {
  return value.toLowerCase().replace(/^file:/, "").replace(/[^a-z0-9]/g, "");
}

async function fetchCommonsPhotoSupplements(mountain, existingPhotos, keywords) {
  try {
    const query = (mountain.photoKeywords || [mountain.wikiTitle || mountain.name])[0];
    const params = new URLSearchParams({ q: query, limit: "18" });
    const response = await fetch(`https://api.wikimedia.org/core/v1/commons/search/page?${params}`, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Wikimedia Commons search returned ${response.status}`);
    const data = await response.json();
    const existingTitles = new Set(existingPhotos.map(photo => normalizePhotoName(photo.title)));
    const matches = (data.pages || [])
      .filter(page => page.title.startsWith("File:"))
      .filter(page => {
        const title = normalizePhotoName(page.title);
        const isEditorial = /(papers|proceedings|reunion|logo|flag|map|icon|banner|chart|diagram|route|locator|location|seal|symbol|wikimedia|bookcover|painting|drawing|engraving|illustration|sketch|woodcut|etching|grayscale|heightmap|relief|terrain|8bit|18[0-9]{2})/i.test(title);
        return !isEditorial && keywords.some(keyword => title.includes(keyword));
      })
      .filter(page => !existingTitles.has(normalizePhotoName(page.title)))
      .slice(0, 10);
    const results = await Promise.allSettled(matches.map(async page => {
      const fileName = page.title.replace(/^File:/, "").replace(/ /g, "_");
      const fileResponse = await fetch(`https://api.wikimedia.org/core/v1/commons/file/${encodeURIComponent(fileName)}`, {
        headers: { Accept: "application/json" }
      });
      if (!fileResponse.ok) throw new Error(`Wikimedia Commons file lookup returned ${fileResponse.status}`);
      const file = await fileResponse.json();
      const source = file.file_description_url?.startsWith("//")
        ? `https:${file.file_description_url}`
        : file.file_description_url;
      if (file.preferred?.mediatype !== "BITMAP" || !file.preferred?.url) return null;
      return { src: file.preferred.url, source, title: file.title };
    }));
    return results
      .filter(result => result.status === "fulfilled" && result.value)
      .map(result => result.value);
  } catch (error) {
    console.warn(`Additional Wikimedia Commons photos could not be loaded for ${mountain.name}.`, error);
    announce(`Additional gallery photographs for ${mountain.name} could not be loaded. Available profile photographs remain visible.`);
    return [];
  }
}

async function fetchMountainPhotos(mountain) {
  const cache = getPhotoCache();
  if (cache[mountain.id]) return cache[mountain.id];
  if (photoRequests.has(mountain.id)) return photoRequests.get(mountain.id);
  const request = (async () => {
    const params = new URLSearchParams({
      action: "query",
      titles: mountain.wikiTitle || mountain.name,
      prop: "pageimages|images",
      piprop: "name|thumbnail",
      pithumbsize: "1400",
      imlimit: "30",
      format: "json",
      origin: "*"
    });
    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
    if (!response.ok) throw new Error(`Wikipedia returned ${response.status}`);
    const data = await response.json();
    const page = Object.values(data.query?.pages || {})[0];
    if (!page || page.missing !== undefined) throw new Error("No matching mountain article was found.");
    const mainFileName = normalizePhotoName(page.pageimage || "");
    const keywords = [...(mountain.photoKeywords || []), mountain.name, mountain.wikiTitle || ""]
      .map(value => normalizePhotoName(value.replace(/^mount\s*/i, "")))
      .filter(Boolean);
    const candidates = [...new Set([
      ...(page.pageimage ? [`File:${page.pageimage}`] : []),
      ...(page.images || []).map(image => image.title)
    ])]
      .filter(title => /\.(jpe?g|png|webp)$/i.test(title))
      .filter(title => {
        const normalized = normalizePhotoName(title);
        const isMain = normalized === mainFileName;
        const isEditorial = /(papers|proceedings|reunion|logo|flag|coatofarms|map|icon|banner|chart|diagram|route|locator|location|seal|symbol|wikimedia|commonslogo|bookcover|painting|drawing|engraving|illustration|sketch|woodcut|etching|grayscale|heightmap|relief|terrain|8bit|18[0-9]{2})/i.test(normalized);
        return isMain || (!isEditorial && keywords.some(keyword => normalized.includes(keyword)));
      })
      .slice(0, 20);
    let photos = [];
    if (candidates.length) {
      const imageParams = new URLSearchParams({
        action: "query",
        titles: candidates.join("|"),
        prop: "imageinfo",
        iiprop: "url",
        iiurlwidth: "1400",
        format: "json",
        origin: "*"
      });
      const imageResponse = await fetch(`https://en.wikipedia.org/w/api.php?${imageParams}`);
      if (!imageResponse.ok) throw new Error(`Wikipedia image lookup returned ${imageResponse.status}`);
      const imageData = await imageResponse.json();
      photos = Object.values(imageData.query?.pages || [])
        .filter(image => image.imageinfo?.[0]?.thumburl)
        .map(image => ({
          src: image.imageinfo[0].thumburl,
          source: image.imageinfo[0].descriptionurl,
          title: image.title.replace(/^File:/, "").replace(/_/g, " ")
        }));
    }
    if (mainFileName) {
      const mainIndex = photos.findIndex(photo => normalizePhotoName(photo.title) === mainFileName);
      if (mainIndex >= 0) photos.unshift(photos.splice(mainIndex, 1)[0]);
    }
    if (page.thumbnail?.source) {
      const mainPhoto = photos[0];
      if (mainPhoto && mainFileName && normalizePhotoName(mainPhoto.title) === mainFileName) {
        mainPhoto.src = page.thumbnail.source;
      } else {
        photos.unshift({
          src: page.thumbnail.source,
          source: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
          title: page.title
        });
      }
    }
    if (photos.length < 4) {
      const supplements = await fetchCommonsPhotoSupplements(mountain, photos, keywords);
      const existingSources = new Set(photos.map(photo => photo.src));
      photos.push(...supplements.filter(photo => !existingSources.has(photo.src)));
    }
    if (!photos.length) throw new Error("No mountain photographs were found.");
    const photoCache = getPhotoCache();
    photoCache[mountain.id] = photos;
    setPhotoCache(photoCache);
    return photos;
  })();
  photoRequests.set(mountain.id, request);
  try {
    return await request;
  } finally {
    photoRequests.delete(mountain.id);
  }
}

function setImage(image, source, fallback = FALLBACK_IMAGE) {
  image.onerror = () => {
    image.onerror = null;
    image.src = fallback;
    image.classList.add("image-fallback");
  };
  image.src = source;
}

async function hydrateMountainPhotos(mountain, root = document) {
  try {
    const photos = await fetchMountainPhotos(mountain);
    root.querySelectorAll(`[data-mountain-photo="${mountain.id}"]`).forEach(image => {
      const photo = photos[Number(image.dataset.photoIndex || 0) % photos.length];
      image.alt = `${mountain.name} — ${photo.title}`;
      setImage(image, photo.src);
      if (photo.source) {
        const credit = root.querySelector(`[data-photo-credit="${mountain.id}"]`);
        if (credit) {
          const link = document.createElement("a");
          link.href = photo.source;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = `${photo.title} · Wikimedia Commons`;
          credit.replaceChildren("Photo: ", link);
        }
      }
    });
    root.querySelectorAll(`[data-gallery-photo="${mountain.id}"]`).forEach((image, index) => {
      const photo = photos[index % photos.length];
      image.alt = `${mountain.name} gallery — ${photo.title}`;
      setImage(image, photo.src);
      const link = image.closest("a");
      if (link && photo.source) {
        link.href = photo.source;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      const caption = image.closest("figure")?.querySelector("figcaption");
      if (caption && photo.source) {
        const credit = document.createElement("a");
        credit.href = photo.source;
        credit.target = "_blank";
        credit.rel = "noopener noreferrer";
        credit.textContent = `${photo.title} · Wikimedia Commons`;
        caption.replaceChildren(credit);
      }
    });
  } catch (error) {
    console.error(`Could not load Wikimedia Commons photos for ${mountain.name}.`, error);
    announce(`Some mountain photos could not be loaded from Wikimedia Commons. Illustrated fallbacks are shown.`);
  }
}

function observeMountainPhotos(root = document) {
  const ids = [...new Set([...root.querySelectorAll("[data-mountain-photo]")].map(image => image.dataset.mountainPhoto))];
  const load = id => {
    const mountain = mountains.find(item => item.id === id);
    if (mountain) hydrateMountainPhotos(mountain, root);
  };
  if (!("IntersectionObserver" in window)) {
    ids.forEach(load);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      load(entry.target.dataset.mountainPhoto);
    });
  }, { rootMargin: "250px" });
  root.querySelectorAll("[data-mountain-photo]").forEach(image => observer.observe(image));
}

function renderHome() {
  const featured = document.querySelector("#featuredMountains");
  if (featured) {
    featured.innerHTML = mountains.slice(0, 6).map(mountainCard).join("");
    observeMountainPhotos(featured);
  }
  const popular = document.querySelector("#popularMountains");
  if (popular) {
    const popularIds = ["everest", "k2", "matterhorn"];
    popular.innerHTML = popularIds.map(id => mountains.find(mountain => mountain.id === id)).filter(Boolean).map(mountainCard).join("");
    observeMountainPhotos(popular);
  }
  const search = document.querySelector("#mountainSearch");
  if (search) search.addEventListener("submit", event => {
    event.preventDefault();
    const query = new FormData(search).get("q").toString().trim();
    location.href = `destinations.html${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  });
  const newsletter = document.querySelector("#newsletterForm");
  if (newsletter) newsletter.addEventListener("submit", event => {
    event.preventDefault();
    if (!newsletter.reportValidity()) return;
    newsletter.querySelector("[role=status]").textContent = "Email address looks good.";
  });
  setupReveal();
}

function renderDestinations() {
  const grid = document.querySelector("#mountainResults");
  const form = document.querySelector("#destinationFilters");
  if (!grid || !form) return;
  const continent = form.elements.continent;
  continent.innerHTML += [...new Set(mountains.map(item => item.continent))].sort().map(item => `<option value="${item}">${item}</option>`).join("");
  const range = form.elements.range;
  range.innerHTML += [...new Set(mountains.map(item => item.range))].sort().map(item => `<option value="${item}">${item}</option>`).join("");
  const queryInput = form.elements.q;
  const searchParams = new URLSearchParams(location.search);
  queryInput.value = searchParams.get("q") || "";
  let requestedRegion = searchParams.get("region") || "";
  continent.value = searchParams.get("continent") || "";
  const requestedRange = searchParams.get("range");
  if (requestedRange) {
    const matchingRange = [...range.options].find(option => option.value.toLowerCase().includes(requestedRange.toLowerCase()));
    if (matchingRange) range.value = matchingRange.value;
  }

  const render = () => {
    const query = queryInput.value.trim().toLowerCase();
    const min = Number(form.elements.minElevation.value) || 0;
    const max = Number(form.elements.maxElevation.value) || Infinity;
    let filtered = mountains.filter(mountain =>
      (!query || `${mountain.name} ${mountain.country}`.toLowerCase().includes(query)) &&
      (!requestedRegion || mountainRegion(mountain) === requestedRegion) &&
      (!continent.value || mountain.continent === continent.value) &&
      (!range.value || mountain.range === range.value) &&
      mountain.elevation >= min && mountain.elevation <= max
    );
    if (form.elements.sort.value === "high") filtered.sort((a, b) => b.elevation - a.elevation);
    if (form.elements.sort.value === "low") filtered.sort((a, b) => a.elevation - b.elevation);
    document.querySelector("#resultCount").textContent = `${filtered.length} ${filtered.length === 1 ? "mountain" : "mountains"} found`;
    grid.innerHTML = filtered.length ? filtered.map(mountainCard).join("") : `<div class="empty-state"><span class="empty-icon">⌕</span><h2>No mountains match those filters</h2><p>Try a different name, country or elevation range.</p></div>`;
    observeMountainPhotos(grid);
    setupReveal();
  };
  const handleFilterChange = () => {
    requestedRegion = "";
    history.replaceState(null, "", location.pathname);
    render();
  };
  form.addEventListener("input", handleFilterChange);
  form.addEventListener("change", handleFilterChange);
  form.addEventListener("reset", () => {
    requestedRegion = "";
    history.replaceState(null, "", location.pathname);
    requestAnimationFrame(render);
  });
  render();
}

function renderFavorites() {
  const grid = document.querySelector("#favoriteResults");
  if (!grid) return;
  const selected = getFavorites();
  const saved = mountains.filter(mountain => selected.includes(mountain.id));
  grid.innerHTML = saved.length ? saved.map(mountainCard).join("") : `<div class="empty-state"><span class="empty-icon">♡</span><h2>Your mountain list is waiting</h2><p>Save a mountain with the heart button and it will be kept here on this device.</p><a class="btn btn-primary" href="destinations.html">Explore destinations <span aria-hidden="true">↗</span></a></div>`;
  observeMountainPhotos(grid);
  setupReveal();
}

function renderTourDetails() {
  const section = document.querySelector("#tourDetail");
  if (!section) return null;
  const id = new URLSearchParams(location.search).get("tour");
  const mountain = mountains.find(item => item.id === id);
  if (!mountain) {
    section.hidden = true;
    return null;
  }
  const estimate = getTourEstimate(mountain);
  const itinerary = getTourItinerary(mountain, estimate.duration);
  section.hidden = false;
  section.innerHTML = `<div class="tour-detail-heading"><a class="back-link" href="tours.html#tourCollection">← All suggested tours</a><p class="eyebrow">INDICATIVE ITINERARY · PLAN THOUGHTFULLY</p><h2>${getTourTitle(mountain)}</h2><p>${mountain.country} <span>·</span> ${mountain.range}</p></div>
    <div class="tour-detail-hero"><img class="mountain-photo" src="${FALLBACK_IMAGE}" data-mountain-photo="${mountain.id}" alt="${mountain.name} mountain landscape" loading="eager"><div><p class="eyebrow">${mountain.continent} · ${Number(mountain.elevation).toLocaleString()} M</p><h3>${mountain.name}</h3><span>${estimate.duration} · ${estimate.difficulty}</span></div></div>
    <div class="tour-detail-grid"><div class="tour-detail-main"><p class="eyebrow">THE JOURNEY</p><h3>A suggested way to explore</h3><p>${mountain.intro} ${mountain.description}</p><p class="tour-estimate-callout">Planning estimate: ${estimate.duration} · ${estimate.difficulty} level. These are indicative estimates, not a confirmed itinerary, route, booking, or availability.</p>
        <h3>Suggested itinerary</h3><ol class="tour-itinerary">${itinerary.map(([day, activity]) => `<li><strong>${day}</strong><p>${activity}</p></li>`).join("")}</ol>
        <h3>Preparation &amp; season</h3><p>${mountain.climbing}</p><p><strong>Suggested season:</strong> ${mountain.season}. Conditions and access can change; confirm current local guidance before planning.</p>
        <div class="tour-inclusions"><article><p class="eyebrow">PLAN TO ARRANGE</p><h4>Preparation checklist</h4><ul><li>Qualified local guide or established expedition team, appropriate to the objective.</li><li>Current permits, transport, accommodation and route access, confirmed locally.</li><li>Suitable equipment, acclimatization time, insurance and an emergency plan.</li></ul></article><article><p class="eyebrow">CONFIRM BEFORE TRAVEL</p><h4>Not included or promised</h4><ul><li>No operator, guide, accommodation, transport or service is booked by this website.</li><li>No price, departure date, availability, permit or summit outcome is guaranteed.</li><li>Flights, meals, equipment, insurance and rescue arrangements are not provided here.</li></ul></article></div>
        <div class="tour-safety"><strong>Mountain safety comes first</strong><p>${mountain.climbing} This page is for inspiration and planning only, not a route briefing. Check official advisories and current forecasts; use qualified professionals and turn back if conditions warrant.</p></div>
      </div><aside class="tour-detail-aside"><div class="tour-fact-card"><p class="eyebrow">AT A GLANCE</p><div><span>Destination</span><strong>${mountain.country}</strong></div><div><span>Elevation</span><strong>${Number(mountain.elevation).toLocaleString()} m</strong></div><div><span>Mountain range</span><strong>${mountain.range}</strong></div><div><span>Suggested duration</span><strong>${estimate.duration}</strong></div><div><span>Indicative difficulty</span><strong>${estimate.difficulty}</strong></div><div><span>Best season</span><strong>${mountain.season}</strong></div><a class="btn btn-primary" href="#tourEnquiry" data-enquire-tour="${mountain.id}">Enquire About This Tour <span aria-hidden="true">↗</span></a></div>
        <div class="map-card"><p class="eyebrow">FIND THE MOUNTAIN</p><iframe title="Map showing ${mountain.name}" src="https://maps.google.com/maps?q=${mountain.latitude},${mountain.longitude}&z=7&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="text-link" href="${mountain.maps}" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div>
      </aside></div>
    <div class="tour-gallery-wrap"><div class="section-heading"><div><p class="eyebrow">MOUNTAIN PHOTO GALLERY</p><h3>Get to know ${mountain.name}.</h3></div></div><div class="detail-gallery">${[0, 1, 2, 3].map(index => `<figure><a href="${FALLBACK_IMAGE}" target="_blank" rel="noopener noreferrer"><img src="${FALLBACK_IMAGE}" data-mountain-photo="${mountain.id}" data-photo-index="${index}" data-gallery-photo="${mountain.id}" alt="${mountain.name} gallery photograph ${index + 1}" loading="lazy"></a><figcaption>Wikimedia Commons photograph</figcaption></figure>`).join("")}</div></div>`;
  document.title = `${getTourTitle(mountain)} | Summit Atlas Tours`;
  hydrateMountainPhotos(mountain, section);
  if (location.hash === "#tour-detail") requestAnimationFrame(() => section.scrollIntoView({ behavior: "smooth", block: "start" }));
  return mountain;
}

function setupTourEnquiry(mountain) {
  const form = document.querySelector("#tourEnquiryForm");
  if (!form) return;
  const selectedTour = form.elements.selectedTour;
  const selectedId = form.elements.tourId;
  const duration = form.elements.duration;
  const status = form.querySelector("[data-enquiry-status]");
  const date = form.elements.preferredDate;
  const phone = form.elements.phone;
  date.min = new Date().toISOString().slice(0, 10);
  const validatePhone = () => {
    const value = phone.value.trim();
    const digits = value.replace(/\D/g, "").length;
    const valid = /^[+]?[0-9][0-9 ().-]{6,19}$/.test(value) && digits >= 7;
    phone.setCustomValidity(value && !valid ? "Enter a valid phone number with at least 7 digits." : "");
    return valid;
  };
  phone.addEventListener("input", validatePhone);
  phone.addEventListener("blur", validatePhone);

  const selectTour = (id, shouldScroll = true) => {
    const selected = mountains.find(item => item.id === id);
    if (!selected) return;
    const estimate = getTourEstimate(selected);
    selectedTour.value = getTourTitle(selected);
    selectedId.value = selected.id;
    duration.value = estimate.duration;
    status.textContent = "";
    status.classList.remove("is-error");
    const currentDetailId = new URLSearchParams(location.search).get("tour");
    if (currentDetailId !== selected.id) {
      const url = new URL(location.href);
      url.searchParams.set("tour", selected.id);
      url.hash = "tour-detail";
      history.replaceState(null, "", url);
      renderTourDetails();
    }
    if (shouldScroll) requestAnimationFrame(() => {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      selectedTour.focus({ preventScroll: true });
    });
  };
  selectTourForEnquiry = id => selectTour(id);
  if (form.dataset.initialized === "true") {
    if (mountain) selectTour(mountain.id, false);
    return;
  }
  form.dataset.initialized = "true";
  form.addEventListener("submit", event => {
    event.preventDefault();
    status.classList.remove("is-error");
    const phoneIsValid = validatePhone();
    if (!phoneIsValid || !form.reportValidity()) {
      status.textContent = "Please check your name, email, phone number and traveller count.";
      status.classList.add("is-error");
      return;
    }
    status.replaceChildren();
    const confirmation = document.createElement("strong");
    confirmation.textContent = "Thank you for your enquiry! Our team will contact you regarding your selected mountain tour.";
    const clarification = document.createElement("span");
    clarification.textContent = "Your details have been validated, but this form has not sent them. No one will receive or respond to the enquiry until a delivery service is connected.";
    status.append(confirmation, clarification);
  });

  const whatsapp = form.querySelector("[data-whatsapp-enquiry]");
  whatsapp.addEventListener("click", () => {
    if (!selectedId.value) {
      status.textContent = "Choose a mountain tour before preparing your WhatsApp message.";
      status.classList.add("is-error");
      return;
    }
    const phoneIsValid = validatePhone();
    if (!phoneIsValid || !form.reportValidity()) {
      status.textContent = "Add your name, a valid email address and phone number before preparing the WhatsApp enquiry.";
      status.classList.add("is-error");
      return;
    }
    const message = buildTourEnquiryMessage(form);
    const encoded = encodeURIComponent(message);
    const number = WHATSAPP_BUSINESS_NUMBER.replace(/\D/g, "");
    const url = number
      ? `https://wa.me/${number}?text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    status.classList.remove("is-error");
    status.textContent = number
      ? "WhatsApp opened with your selected tour details."
      : "WhatsApp opened with your message. Choose a recipient in WhatsApp to send it.";
  });

  if (mountain) selectTour(mountain.id, false);
}

function renderTours() {
  const grid = document.querySelector("#tourResults");
  const filters = document.querySelector("#tourFilters");
  if (!grid || !filters) return;
  const search = filters.elements.q;
  const country = filters.elements.country;
  const region = filters.elements.region;
  const difficulty = filters.elements.difficulty;
  const sort = filters.elements.sort;
  const availableCountries = [...new Set(mountains.flatMap(item => item.country.split(/\s*\/\s*/)))].sort();
  country.innerHTML = `<option value="">All countries</option>${availableCountries.map(item => `<option value="${item}">${item}</option>`).join("")}`;
  region.innerHTML = `<option value="">All regions</option>${[...new Set(mountains.map(item => item.continent))].sort().map(item => `<option value="${item}">${item}</option>`).join("")}`;
  difficulty.innerHTML = `<option value="">All levels</option>${[...new Set(mountains.map(item => getTourEstimate(item).difficulty))].map(item => `<option value="${item}">${item}</option>`).join("")}`;
  search.value = new URLSearchParams(location.search).get("q") || "";

  const render = () => {
    const query = search.value.trim().toLowerCase();
    let filtered = mountains.filter(mountain =>
      (!query || `${mountain.name} ${mountain.country}`.toLowerCase().includes(query)) &&
      (!country.value || mountain.country.split(/\s*\/\s*/).includes(country.value)) &&
      (!region.value || mountain.continent === region.value) &&
      (!difficulty.value || getTourEstimate(mountain).difficulty === difficulty.value)
    );
    if (sort.value === "high") filtered.sort((a, b) => b.elevation - a.elevation);
    if (sort.value === "low") filtered.sort((a, b) => a.elevation - b.elevation);
    document.querySelector("#tourResultCount").textContent = `${filtered.length} ${filtered.length === 1 ? "journey" : "journeys"} to explore`;
    grid.innerHTML = filtered.length
      ? filtered.map(tourCard).join("")
      : `<div class="empty-state"><span class="empty-icon">⌕</span><h2>No tours match those filters</h2><p>Try a different mountain, country or planning level.</p></div>`;
    observeMountainPhotos(grid);
    setupReveal();
  };
  filters.addEventListener("input", render);
  filters.addEventListener("change", render);
  filters.addEventListener("reset", () => requestAnimationFrame(render));
  render();
}

function renderMountainDetail() {
  const root = document.querySelector("#mountainDetail");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const mountain = mountains.find(item => item.id === id);
  if (!mountain) {
    root.innerHTML = `<section class="page-hero"><div><p class="eyebrow">MOUNTAIN NOT FOUND</p><h1>Let's find another summit.</h1><p>This mountain isn't in our guide yet.</p><a class="btn btn-primary" href="destinations.html">Browse all mountains</a></div></section>`;
    return;
  }
  document.title = `${mountain.name} | Summit Atlas`;
  root.innerHTML = `<section class="mountain-detail-hero">
      <img class="detail-hero-photo" src="${FALLBACK_IMAGE}" data-mountain-photo="${mountain.id}" alt="${mountain.name} in ${mountain.country}">
      <div class="detail-hero-shade"></div><div class="detail-hero-copy"><a class="back-link" href="destinations.html">← All mountains</a><p class="eyebrow">${mountain.continent} · ${mountain.range}</p><h1>${mountain.name}</h1><p>${mountain.country} <span>·</span> ${Number(mountain.elevation).toLocaleString()} m</p><div class="detail-actions">${favoriteButton(mountain)}<a class="btn btn-outline" href="${mountain.maps}" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div><p class="photo-credit" data-photo-credit="${mountain.id}">Photo: Wikimedia Commons</p></div>
    </section>
    <section class="section detail-layout">
      <article class="detail-article"><p class="eyebrow">MOUNTAIN PROFILE</p><h2>Meet ${mountain.name}</h2><p class="lead">${mountain.intro}</p><h3>Geography &amp; landscape</h3><p>${mountain.geography}</p><p>${mountain.description}</p><h3>A mountain with a story</h3><p>${mountain.history}</p><h3>Climbing &amp; trekking</h3><p>${mountain.climbing}</p><h3>Fascinating facts</h3><ul class="fact-list">${mountain.facts.map(fact => `<li>${fact}</li>`).join("")}</ul><div class="best-season"><span class="eyebrow">BEST TIME TO VISIT</span><p>${mountain.season}</p><small>Conditions vary year to year. Check local forecasts, permits and current route advice before travel.</small></div></article>
      <aside class="detail-aside"><div class="summit-facts"><p class="eyebrow">AT A GLANCE</p><div><span>Elevation</span><strong>${Number(mountain.elevation).toLocaleString()} m</strong></div><div><span>Country</span><strong>${mountain.country}</strong></div><div><span>Mountain range</span><strong>${mountain.range}</strong></div><div><span>Coordinates</span><strong>${mountain.latitude.toFixed(4)}°, ${mountain.longitude.toFixed(4)}°</strong></div></div>
        <div class="weather-card" id="weatherCard" data-lat="${mountain.latitude}" data-lon="${mountain.longitude}"><p class="eyebrow">ON THE MOUNTAIN NOW</p><p class="weather-loading" role="status">Loading current conditions…</p></div>
        <div class="map-card"><p class="eyebrow">FIND THE SUMMIT</p><iframe title="Map showing ${mountain.name}" src="https://maps.google.com/maps?q=${mountain.latitude},${mountain.longitude}&z=7&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="text-link" href="${mountain.maps}" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div></aside>
    </section>
    <section class="section gallery-section"><div class="section-heading"><div><p class="eyebrow">A CLOSER LOOK</p><h2>Landscapes of ${mountain.name}</h2></div></div><div class="detail-gallery">${[0, 1, 2, 3].map(index => `<figure><a href="${FALLBACK_IMAGE}" target="_blank" rel="noopener noreferrer"><img src="${FALLBACK_IMAGE}" data-mountain-photo="${mountain.id}" data-photo-index="${index}" data-gallery-photo="${mountain.id}" alt="${mountain.name} gallery photograph ${index + 1}" loading="lazy"></a><figcaption>Wikimedia Commons photograph</figcaption></figure>`).join("")}</div></section>
    <section class="section related-section"><div class="section-heading"><div><p class="eyebrow">KEEP EXPLORING</p><h2>Related mountains</h2></div><a class="text-link" href="destinations.html">View all mountains ↗</a></div><div class="destination-grid">${mountains.filter(item => item.id !== mountain.id && (item.continent === mountain.continent || item.range === mountain.range)).slice(0, 3).map(mountainCard).join("")}</div></section>`;
  hydrateMountainPhotos(mountain, root);
  const related = root.querySelector(".related-section");
  if (related) observeMountainPhotos(related);
  loadWeather(root.querySelector("#weatherCard"));
  setupReveal();
}

const weatherDescriptions = {
  0: ["Clear sky", "☀"], 1: ["Mainly clear", "🌤"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁"],
  45: ["Fog", "🌫"], 48: ["Depositing rime fog", "🌫"], 51: ["Light drizzle", "🌦"], 53: ["Drizzle", "🌦"], 55: ["Dense drizzle", "🌧"],
  56: ["Freezing drizzle", "🌧"], 57: ["Freezing drizzle", "🌧"], 61: ["Light rain", "🌧"], 63: ["Rain", "🌧"], 65: ["Heavy rain", "🌧"],
  66: ["Freezing rain", "🌧"], 67: ["Heavy freezing rain", "🌧"], 71: ["Light snow", "❄"], 73: ["Snow", "❄"], 75: ["Heavy snow", "❄"],
  77: ["Snow grains", "❄"], 80: ["Rain showers", "🌦"], 81: ["Rain showers", "🌧"], 82: ["Heavy rain showers", "🌧"],
  85: ["Snow showers", "🌨"], 86: ["Heavy snow showers", "🌨"], 95: ["Thunderstorm", "⛈"], 96: ["Thunderstorm with hail", "⛈"], 99: ["Thunderstorm with hail", "⛈"]
};

async function loadWeather(card) {
  if (!card) return;
  try {
    const params = new URLSearchParams({
      latitude: card.dataset.lat,
      longitude: card.dataset.lon,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      timezone: "auto"
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
    const data = await response.json();
    if (!data.current || typeof data.current.temperature_2m !== "number") throw new Error("Current weather data is unavailable.");
    const current = data.current;
    const [description, icon] = weatherDescriptions[current.weather_code] || ["Conditions unavailable", "—"];
    card.innerHTML = `<p class="eyebrow">CURRENT CONDITIONS · ${data.current.time || "LATEST"}</p><div class="weather-main"><span class="weather-icon" aria-hidden="true">${icon}</span><div><strong>${Math.round(current.temperature_2m)}°C</strong><span>${description}</span></div></div><div class="weather-meta"><span>Feels like <strong>${Math.round(current.apparent_temperature)}°C</strong></span><span>Wind <strong>${Math.round(current.wind_speed_10m)} km/h</strong></span><span>Humidity <strong>${Math.round(current.relative_humidity_2m)}%</strong></span></div><small>Source: Open-Meteo · Conditions at summit coordinates, not a safety forecast.</small>`;
  } catch (error) {
    console.error("Could not load current mountain weather.", error);
    card.innerHTML = `<p class="eyebrow">CURRENT CONDITIONS</p><p class="weather-error" role="status">Current weather is unavailable right now. Check the local mountain forecast before you travel.</p>`;
  }
}

function renderJournal() {
  const root = document.querySelector("#journalContent");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  if (id) {
    const article = journalArticles.find(item => item.id === id);
    if (!article) {
      root.innerHTML = `<div class="empty-state"><h2>Story not found</h2><a class="text-link" href="journal.html">Back to the journal</a></div>`;
      return;
    }
    document.title = `${article.title} | Summit Atlas Journal`;
    root.innerHTML = `<article class="journal-article"><a class="back-link" href="journal.html">← All stories</a><header class="journal-article-heading"><p class="eyebrow">${article.category}</p><h1>${article.title}</h1><p class="lead">${article.summary}</p></header><img class="journal-article-image" src="${article.image}" alt="${article.alt}"><div class="article-body">${article.content.map(paragraph => `<p>${paragraph}</p>`).join("")}<p class="article-disclaimer">Mountain conditions and access change. Seek current local guidance and qualified professional advice before undertaking a mountain journey.</p><a class="btn btn-primary" href="destinations.html">Explore mountain profiles ↗</a></div></article>`;
    return;
  }
  root.innerHTML = `<div class="journal-grid">${journalArticles.map(article => `<article class="journal-card reveal"><a href="journal.html?id=${article.id}" class="journal-card-image"><img src="${article.image}" alt="${article.alt}" loading="lazy"></a><div class="journal-card-copy"><p class="eyebrow">${article.category}</p><h2><a href="journal.html?id=${article.id}">${article.title}</a></h2><p>${article.summary}</p><a class="text-link" href="journal.html?id=${article.id}">Read the story ↗</a></div></article>`).join("")}</div>`;
  setupReveal();
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = document.querySelector("#formMessage");
    if (!form.reportValidity()) {
      status.textContent = "Please complete all fields with a valid email address.";
      status.classList.add("is-error");
      return;
    }
    status.classList.remove("is-error");
    status.textContent = "Your details look complete.";
  });
}

async function initialize() {
  setupShell();
  try {
    const response = await fetch("mountains.json");
    if (!response.ok) throw new Error(`Mountain data returned ${response.status}`);
    mountains = await response.json();
    if (!Array.isArray(mountains) || !mountains.length) throw new Error("Mountain data is empty or invalid.");
  } catch (error) {
    console.error("Could not load mountain data. Run this site through VS Code Live Server.", error);
    announce("Mountain information could not be loaded. Open the project with VS Code Live Server and try again.");
  }
  renderHome();
  renderDestinations();
  renderTours();
  renderFavorites();
  const tour = renderTourDetails();
  setupTourEnquiry(tour);
  renderMountainDetail();
  renderJournal();
  setupContactForm();
  setupReveal();
}

document.addEventListener("DOMContentLoaded", initialize);
