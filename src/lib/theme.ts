export type Theme = 'light' | 'dark'

export const themeStorageKey = 'portfolio-theme'

/** Runs in the document head so the saved appearance is applied before paint. */
export const themeInitializationScript = `(function(){var root=document.documentElement;var theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';try{var saved=localStorage.getItem('${themeStorageKey}');if(saved==='light'||saved==='dark')theme=saved;}catch(e){}root.dataset.theme=theme;root.style.colorScheme=theme;root.classList.toggle('dark',theme==='dark');})();`
