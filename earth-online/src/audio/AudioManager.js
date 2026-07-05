class AudioManager {
  constructor() {
    this.audioContext = null
    this.initialized = false
    this.enabled = true
  }

  init() {
    if (this.initialized) return
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
    } catch (e) {
      console.warn('Web Audio API not supported')
      this.enabled = false
    }
  }

  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  playTone(frequency, duration, type = 'sine', volume = 0.3) {
    if (!this.enabled || !this.audioContext) return
    
    this.resume()
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + duration
    )
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  playBootUp() {
    if (!this.enabled) return
    this.init()
    
    setTimeout(() => this.playTone(200, 0.1, 'sawtooth', 0.2), 0)
    setTimeout(() => this.playTone(400, 0.1, 'sawtooth', 0.2), 100)
    setTimeout(() => this.playTone(600, 0.15, 'sine', 0.25), 200)
    setTimeout(() => this.playTone(800, 0.2, 'sine', 0.3), 350)
  }

  playClick() {
    if (!this.enabled || !this.audioContext) return
    this.resume()
    this.playTone(800, 0.05, 'square', 0.15)
  }

  playChoiceSelect() {
    if (!this.enabled) return
    this.playTone(600, 0.08, 'sine', 0.2)
    setTimeout(() => this.playTone(900, 0.1, 'sine', 0.2), 50)
  }

  playPointsUp() {
    if (!this.enabled) return
    this.playTone(523, 0.1, 'sine', 0.2)
    setTimeout(() => this.playTone(659, 0.1, 'sine', 0.2), 80)
    setTimeout(() => this.playTone(784, 0.15, 'sine', 0.25), 160)
  }

  playPointsDown() {
    if (!this.enabled) return
    this.playTone(400, 0.1, 'sawtooth', 0.2)
    setTimeout(() => this.playTone(300, 0.15, 'sawtooth', 0.25), 100)
  }

  playWarning() {
    if (!this.enabled) return
    this.playTone(880, 0.15, 'square', 0.2)
  }

  playGlitch() {
    if (!this.enabled || !this.audioContext) return
    this.resume()
    
    const bufferSize = this.audioContext.sampleRate * 0.2
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15
    }
    
    const source = this.audioContext.createBufferSource()
    const gainNode = this.audioContext.createGain()
    
    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2)
    
    source.start()
  }

  playBeep(frequency = 1000, duration = 0.1) {
    this.playTone(frequency, duration, 'sine', 0.2)
  }

  playDeath() {
    if (!this.enabled) return
    
    const playNote = (freq, delay) => {
      setTimeout(() => this.playTone(freq, 0.3, 'sawtooth', 0.25), delay)
    }
    
    playNote(400, 0)
    playNote(350, 200)
    playNote(300, 400)
    playNote(200, 600)
    
    setTimeout(() => {
      if (!this.audioContext) return
      const bufferSize = this.audioContext.sampleRate * 0.5
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.3
      }
      
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()
      source.buffer = buffer
      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      source.start()
    }, 800)
  }
}

export const audioManager = new AudioManager()
