/* ALLEN KS — editá esta configuración para incorporar recursos originales.
 * Mantener null mientras no esté disponible un archivo o enlace real.
 */
window.ALLENKS_CONTENT = {
  artist: {
    name: "ALLEN KS",
    realName: "Alan Josue Diaz",
    city: "Buenos Aires, Argentina",
    since: 2016,
    born: 1997,
    portrait: "/assets/hero/allen-ks-portrait.png",
    heroBackground: "/assets/hero/iridescent-background.svg",
    heroForeground: "/assets/hero/iridescent-foreground.svg"
  },
  tracks: [
    { id: "damnation", title: "DAMNATION", artwork: null, audio: "/assets/audio/damnation.mp3", download: "/assets/audio/damnation.mp3", durationLabel: "3:32", theme: "lime" },
    { id: "corruption", title: "CORRUPTION", artwork: null, audio: "/assets/audio/corruption.mp3", download: "/assets/audio/corruption.mp3", durationLabel: "3:09", theme: "cyan" },
    { id: "soul-mission", title: "SOUL MISSION", artwork: null, audio: "/assets/audio/soul-mission.mp3", download: "/assets/audio/soul-mission.mp3", durationLabel: "2:58", theme: "purple" },
    { id: "gods-messenger", title: "GODS MESSENGER", artwork: null, audio: "/assets/audio/gods-messenger.mp3", download: "/assets/audio/gods-messenger.mp3", durationLabel: "3:05", theme: "acid" },
    // Publicados en Allen KS Control; pendiente traer los archivos originales desde la PC.
    { id: "alternative-ending", title: "ALTERNATIVE ENDING", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "purple", filesPending: true, salesEnabled: false },
    { id: "buho", title: "B.U.H.O", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "cyan", filesPending: true, salesEnabled: false },
    { id: "back-strong", title: "BACK STRONG", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "lime", filesPending: true, salesEnabled: false },
    { id: "blaze-it-up", title: "BLAZE IT UP", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "acid", filesPending: true, salesEnabled: false },
    { id: "break-it-down", title: "BREAK IT DOWN", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "purple", filesPending: true, salesEnabled: false },
    { id: "bring-it", title: "BRING IT", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "cyan", filesPending: true, salesEnabled: false },
    { id: "legendary-remix", title: "LEGENDARY (REMIX)", artists: "ALLEN KS × BREXI", category: "collaboration", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "acid", filesPending: true, salesEnabled: false },
    { id: "dubstep-wacho", title: "DUBSTEP WACHO!", artists: "ALLEN KS × DUBSSIVE", category: "collaboration", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "lime", filesPending: true, salesEnabled: false },
    { id: "dubstep-wacho-vip", title: "DUBSTEP WACHO! (VIP)", artists: "ALLEN KS × DUBSSIVE", category: "collaboration", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "purple", filesPending: true, salesEnabled: false },
    { id: "dubstep-wacho-riddim", title: "DUBSTEP WACHO! (RIDDIM)", artists: "ALLEN KS × DUBSSIVE × FLUSH", category: "collaboration", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "cyan", filesPending: true, salesEnabled: false },
    { id: "dubstep-wacho-vip-version", title: "DUBSTEP WACHO! (VIP VERSION)", artists: "ALLEN KS × DUBSSIVE × FLUSH", category: "collaboration", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "acid", filesPending: true, salesEnabled: false },
    { id: "dont-come-out-the-house", title: "DON'T COME OUT THE HOUSE", artists: "ALLEN KS × METRO BOOMIN", category: "collaboration", artwork: null, audio: null, download: null, durationLabel: "--:--", theme: "purple", filesPending: true, salesEnabled: false }
  ],
  event: {
    day: "22", month: "NOV", year: 2026,
    name: "OTRA NOCHE × OVERDRIVE",
    venue: "ARKHAM MULTIESPACIO",
    location: "Capital Federal, Buenos Aires",
    artwork: null, // "/assets/events/otra-noche-overdrive.webp"
    ticketsUrl: "https://wa.me/5491136133976?text=Hola%2C%20quiero%20consultar%20por%20entradas%20para%20OTRA%20NOCHE%20%C3%97%20OVERDRIVE%20del%2022%20de%20noviembre%20en%20Arkham%20Multiespacio.",
    lineup: ["XABHI", "ALLEN KS", "MVRDER", "SHATSU", "FR3X DUBZ", "NANNOBASS", "HOLO ICE"]
  },
  pastEvents: [
    { id: "archivo-1", title: "FLYER 01", image: null },
    { id: "archivo-2", title: "FLYER 02", image: null },
    { id: "archivo-3", title: "FLYER 03", image: null },
    { id: "archivo-4", title: "FLYER 04", image: null }
  ],
  projects: [
    { id: "spartans", name: "SPARTANS LABEL", logo: null, color: "lime", short: "Sello independiente de Dubstep / Bass que impulsa artistas de la escena hispana.", url: null },
    { id: "otra-noche", name: "OTRA NOCHE", logo: null, color: "lavender", short: "Una propuesta que conecta artistas, público y cultura bass en Buenos Aires.", url: null },
    { id: "academia", name: "DUBSTEP ACADEMIA", logo: null, color: "cyan", short: "Formación y comunidad para productores de música electrónica.", url: null }
  ],
  socials: [
    { name: "Spotify", path: "/spotify", url: "https://open.spotify.com/artist/2Qutt1ypoIqkTMZEELO8TZ", icon: "/assets/social/spotify.svg" },
    { name: "SoundCloud", path: "/soundcloud", url: null, icon: "/assets/social/soundcloud.svg" },
    { name: "Apple Music", path: "/apple-music", url: "https://music.apple.com/us/artist/allen-ks/1576476832", icon: "/assets/social/applemusic.svg" },
    { name: "WhatsApp", path: "/whatsapp", url: "https://wa.me/5491136133976", icon: "/assets/social/whatsapp.svg" },
    { name: "Instagram", path: "/instagram", url: "https://www.instagram.com/allenksmusic/", icon: "/assets/social/instagram.svg" },
    { name: "YouTube", path: "/youtube", url: null, icon: "/assets/social/youtube.svg" },
    { name: "TikTok", path: "/tiktok", url: null, icon: "/assets/social/tiktok.svg" }
  ],
  /* Metas editables: son registros de referencia, NO cifras sincronizadas en vivo.
   * Cambiar current, targetMultiplier, goalDate y source al confirmar los datos.
   * No publicar un número si no fue informado o verificado.
   */
  socialHubs: {
    spotify: {
      heading: "ESCUCHÁ EN SPOTIFY", intro: "El universo ALLEN KS, lanzamientos y música para agregar a tus playlists.",
      embed: "https://open.spotify.com/embed/artist/2Qutt1ypoIqkTMZEELO8TZ?utm_source=generator",
      metric: { label: "OYENTES MENSUALES", current: 61, targetMultiplier: 2, goalDate: "2027-02-09", source: "Referencia pública anterior (aprox. septiembre de 2026). No se actualiza automáticamente." }
    },
    soundcloud: {
      heading: "SOUNDCLOUD", intro: "Escuchá mis producciones, remixes y música disponible para la comunidad bass.",
      embed: null,
      metric: { label: "SEGUIDORES", current: 333, targetMultiplier: 2, goalDate: "2027-02-09", source: "Última cifra que informó el artista; pendiente de actualizar y sincronizar." }
    },
    youtube: {
      heading: "ALLEN KS EN YOUTUBE", intro: "Videos, sets, estrenos y momentos de la escena dubstep.",
      embed: null,
      metric: { label: "SUSCRIPTORES", current: 1008, targetMultiplier: 2, goalDate: "2027-02-09", source: "Última cifra que informó el artista; pendiente de actualizar y sincronizar." }
    },
    "apple-music": { heading: "APPLE MUSIC", intro: "Encontrá los lanzamientos de ALLEN KS en Apple Music.", embed: null },
    tiktok: { heading: "TIKTOK", intro: "Clips, avances de canciones y contenidos cortos del proyecto ALLEN KS.", embed: null },
    instagram: {
      heading: "INSTAGRAM", intro: "Nueve publicaciones elegidas para conocer la música, el estudio y los shows.",
      /* Reemplazar null con {url: "https://www.instagram.com/p/.../", image: "/assets/instagram/post-1.jpg", label: "..."}. */
      posts: [null, null, null, null, null, null, null, null, null]
    }
  },
  // whatsappNumber: número internacional sólo con dígitos, sin + ni espacios.
  // Número móvil argentino en formato internacional para WhatsApp (+54 9 11...).
  contact: {
    email: null,
    whatsapp: "https://wa.me/5491136133976",
    whatsappNumber: "5491136133976",
    bookingsNumber: "5491172940652"
  }
};
