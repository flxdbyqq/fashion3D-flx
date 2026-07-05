class GlitchEffect {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.active = false
    this.animationId = null
    this.intensity = 0
    this.scanlineY = 0
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  trigger(duration = 300, intensity = 1) {
    this.intensity = intensity
    
    if (!this.active) {
      this.active = true
      this.canvas.classList.add('active')
      this.animate()
    }

    setTimeout(() => {
      this.active = false
      this.canvas.classList.remove('active')
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }, duration)
  }

  animate() {
    if (!this.active) return
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    if (Math.random() > 0.3) {
      this.drawGlitchBars()
    }
    
    if (Math.random() > 0.5) {
      this.drawColorShift()
    }
    
    this.drawScanline()
    
    if (Math.random() > 0.7) {
      this.drawNoise()
    }
    
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  drawGlitchBars() {
    const barCount = Math.floor(Math.random() * 5 * this.intensity) + 1
    
    for (let i = 0; i < barCount; i++) {
      const y = Math.random() * this.canvas.height
      const height = Math.random() * 30 * this.intensity + 2
      const offset = (Math.random() - 0.5) * 100 * this.intensity
      
      this.ctx.fillStyle = `rgba(255, 42, 42, ${Math.random() * 0.3})`
      this.ctx.fillRect(offset, y, this.canvas.width + Math.abs(offset) * 2, height)
    }
  }

  drawColorShift() {
    const shiftAmount = Math.random() * 20 * this.intensity
    
    this.ctx.globalCompositeOperation = 'screen'
    this.ctx.fillStyle = `rgba(255, 0, 0, ${0.1 * this.intensity})`
    this.ctx.fillRect(-shiftAmount, 0, this.canvas.width, this.canvas.height)
    
    this.ctx.fillStyle = `rgba(0, 255, 255, ${0.1 * this.intensity})`
    this.ctx.fillRect(shiftAmount, 0, this.canvas.width, this.canvas.height)
    
    this.ctx.globalCompositeOperation = 'source-over'
  }

  drawScanline() {
    this.scanlineY = (this.scanlineY + 10) % (this.canvas.height + 100)
    
    const gradient = this.ctx.createLinearGradient(0, this.scanlineY - 50, 0, this.scanlineY + 50)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * this.intensity})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, this.scanlineY - 50, this.canvas.width, 100)
  }

  drawNoise() {
    const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height)
    const data = imageData.data
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255 * this.intensity * 0.3
      data[i] = noise
      data[i + 1] = noise
      data[i + 2] = noise
      data[i + 3] = 30
    }
    
    this.ctx.putImageData(imageData, 0, 0)
  }
}

export default GlitchEffect
