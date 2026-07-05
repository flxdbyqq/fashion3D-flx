import { stateManager } from '../game/StateManager.js'
import { audioManager } from '../audio/AudioManager.js'

class EndingScreen {
  constructor(container) {
    this.container = container
    this.onRestart = null
  }

  render(endingNode) {
    const state = stateManager.getState()
    const endingType = endingNode.endingType || 'neutral'
    const titleClass = endingType

    const formattedText = endingNode.text.replace(/\n/g, '<br><br>')

    this.container.innerHTML = `
      <div class="ending-screen active">
        <div class="ending-badge">[ ${endingNode.statsLabel || '结局'} ]</div>
        <h1 class="ending-title ${titleClass}">${endingNode.title}</h1>
        <p class="ending-text">${formattedText}</p>
        
        <div class="ending-stats">
          <div class="ending-stat">
            <div class="ending-stat-value">${state.survivalPoints.toFixed(2)}</div>
            <div class="ending-stat-label">最终生存点</div>
          </div>
          <div class="ending-stat">
            <div class="ending-stat-value">${state.totalChoices}</div>
            <div class="ending-stat-label">选择次数</div>
          </div>
          <div class="ending-stat">
            <div class="ending-stat-value">${state.dayCount}</div>
            <div class="ending-stat-label">存活天数</div>
          </div>
        </div>
        
        <div class="ending-actions">
          <button class="ending-btn primary" id="restart-btn">重新开始</button>
        </div>
      </div>
    `

    this.container.style.display = 'flex'

    if (endingType === 'death') {
      audioManager.playDeath()
    } else {
      audioManager.playBootUp()
    }

    const restartBtn = document.getElementById('restart-btn')
    restartBtn.addEventListener('click', () => {
      audioManager.playClick()
      if (this.onRestart) {
        this.onRestart()
      }
    })
  }

  hide() {
    this.container.style.display = 'none'
    this.container.innerHTML = ''
  }
}

export default EndingScreen
