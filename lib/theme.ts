export const THEME_STORAGE_KEY = 'theme'

// Runs inline in <head> before first paint (see app/layout.tsx): a saved
// choice wins, otherwise follow the system setting. Kept out of the client
// component so the server layout gets the string itself, not a client reference.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`
