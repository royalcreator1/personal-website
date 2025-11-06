// Sound utility functions for button clicks and interactions

let audioContext: AudioContext | null = null

const getAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.debug('Audio context not available')
      return null
    }
  }
  // Resume context if suspended (required by some browsers)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  return audioContext
}

export const playClickSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800 // Higher pitch for click
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  } catch (error) {
    console.debug('Error playing click sound')
  }
}

export const playHoverSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 600 // Lower pitch for hover
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  } catch (error) {
    console.debug('Error playing hover sound')
  }
}

export const playSwitchSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(400, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  } catch (error) {
    console.debug('Error playing switch sound')
  }
}

export const playSuccessSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    // Create a pleasant chime sound
    const frequencies = [523.25, 659.25, 783.99] // C, E, G notes
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = freq
      oscillator.type = 'sine'

      const startTime = ctx.currentTime + index * 0.1
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  } catch (error) {
    console.debug('Error playing success sound')
  }
}

export const playMorningSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    // Create a pleasant morning sound with ascending notes
    const frequencies = [261.63, 329.63, 392.00, 523.25] // C, E, G, C (higher octave)
    
    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = freq
      oscillator.type = 'sine'

      const startTime = ctx.currentTime + index * 0.15
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.4)
    })
  } catch (error) {
    console.debug('Error playing morning sound')
  }
}

export const playCricketSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    // Create cricket-like chirping sound with multiple rapid pulses
    for (let i = 0; i < 8; i++) {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Varying frequency for cricket-like effect
      const baseFreq = 2000 + Math.random() * 1000
      oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.02)
      oscillator.type = 'sine'

      const startTime = ctx.currentTime + i * 0.08
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.03)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.03)
    }
  } catch (error) {
    console.debug('Error playing cricket sound')
  }
}
