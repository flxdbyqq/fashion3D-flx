import { stateManager } from '../game/StateManager.js'
import { audioManager } from '../audio/AudioManager.js'

class HUD {
  constructor(container) {
    this.container = container
    this.pointsElement = null
    this.dateElement = null
    this.areaElement = null
    this.statusFill = null
    this.changeElement = null
    this.warningLevel = 'normal'
  }

  render() {
    this.container.innerHTML = `
      <div class="hud">
        <div class="hud-left">
          <span class="hud-label">生存点</span>
          <span class="hud-points" id="hud-points">120.00</span>
          <span class="hud-points-change" id="hud-points-change"></span>
        </div>
        <div class="hud-right">
          <span class="hud-date" id="hud-date">坍塌后 第1095天</span>
          <span class="hud-area" id="hud-area">第七区</span>
        </div>
        <div class="hud-status-bar">
          <div class="hud-status-fill" id="hud-status-fill" style="width: 100%"></div>
        </div>
      </div>
    `

    this.pointsElement = document.getElementById('hud-points')
    this.dateElement = document.getElementById('hud-date')
    this.areaElement = document.getElementById('hud-area')
    this.statusFill = document.getElementById('hud-status-fill')
    this.changeElement = document.getElementById('hud-points-change')

    stateManager.subscribe((state) => this.update(state))
  }

  update(state) {
    const pointsStr = state.survivalPoints.toFixed(2)
    this.pointsElement.textContent = pointsStr

    if (state.dayCount !== this.currentDay) {
      this.currentDay = state.dayCount
      this.dateElement.textContent = `坍塌后 第${1095 + state.dayCount}天`
    }

    if (state.currentArea) {
      this.areaElement.textContent = state.currentArea
    }

    const percentage = Math.min(100, Math.max(0, (state.survivalPoints / 200) * 100))
    this.statusFill.style.width = `${percentage}%`

    if (state.warningLevel !== this.warningLevel) {
      this.updateWarningLevel(state.warningLevel)
    }
  }

  updateWarningLevel(level) {
    this.warningLevel = level
    
    this.pointsElement.classList.remove('warning', 'critical')
    
    if (level === 'warning') {
      this.pointsElement.classList.add('warning')
      audioManager.playWarning()
    } else if (level === 'critical') {
      this.pointsElement.classList.add('critical')
      audioManager.playWarning()
    }
  }

  showPointsChange(amount) {
    if (amount === 0) return
    
    const isPositive = amount > 0
    const text = isPositive ? `+${amount.toFixed(2)}` : amount.toFixed(2)
    
    this.changeElement.textContent = text
    this.changeElement.className = `hud-points-change ${isPositive ? 'positive' : 'negative'}`
    
    requestAnimationFrame(() => {
      this.changeElement.classList.add('show')
    })

    if (isPositive) {
      audioManager.playPointsUp()
    } else {
      audioManager.playPointsDown()
    }
    
    setTimeout(() => {
      this.changeElement.classList.remove('show')
    }, 1500)
  }
}

export default HUD
