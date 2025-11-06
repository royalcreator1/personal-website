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

export const playBatSound = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    // Create dangerous bat sounds with multiple rapid, low-frequency pulses
    // Bats make high-pitched squeaks and wing flapping sounds
    for (let i = 0; i < 12; i++) {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Mix of high-pitched squeaks and low wing flapping
      const isSqueak = i % 3 === 0
      const baseFreq = isSqueak 
        ? 8000 + Math.random() * 4000  // High-pitched squeaks
        : 100 + Math.random() * 50     // Low wing flapping
      
      oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime)
      if (isSqueak) {
        oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.02)
      }
      oscillator.type = isSqueak ? 'sine' : 'sawtooth'

      const startTime = ctx.currentTime + i * 0.06
      const duration = isSqueak ? 0.03 : 0.05
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(isSqueak ? 0.12 : 0.08, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }
  } catch (error) {
    console.debug('Error playing bat sound')
  }
}
