import { audioManager } from '../audio/AudioManager.js'

class ChoicePanel {
  constructor(container) {
    this.container = container
    this.onChoice = null
    this.choices = []
    this.timerInterval = null
    this.timeRemaining = 0
    this.hasTimeout = false
  }

  render(choices, onChoice, timeout = 0, timeoutChoice = null) {
    this.choices = choices
    this.onChoice = onChoice
    this.hasTimeout = timeout > 0
    this.timeRemaining = timeout
    this.timeoutChoice = timeoutChoice

    const colClass = choices.length <= 2 ? 'cols-2' : choices.length === 3 ? 'cols-3' : 'cols-2'

    this.container.innerHTML = `
      <div class="choice-section">
        <div class="choice-header">
          <span class="choice-title">[ 做出选择 ]</span>
          <span class="choice-timer" id="choice-timer" style="display:none;">--</span>
        </div>
        ${this.hasTimeout ? `
          <div class="choice-timer-bar">
            <div class="choice-timer-fill" id="choice-timer-fill" style="width: 100%"></div>
          </div>
        ` : ''}
        <div class="choices-grid ${colClass}" id="choices-grid">
          ${choices.map((choice, index) => this.renderChoiceButton(choice, index)).join('')}
        </div>
      </div>
    `

    const buttons = this.container.querySelectorAll('.choice-btn')
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.handleChoice(choices[index]))
      btn.addEventListener('mouseenter', () => audioManager.playClick())
    })

    if (this.hasTimeout) {
      this.startTimer()
    }
  }

  renderChoiceButton(choice, index) {
    const totalChange = (choice.cost || 0) + (choice.reward || 0)
    const costText = totalChange !== 0
      ? `<span class="choice-cost ${totalChange > 0 ? 'positive' : 'negative'}">
           ${totalChange > 0 ? '+' : ''}${totalChange.toFixed(0)} 生存点
         </span>`
      : ''

    const keyHint = String.fromCharCode(65 + index)

    return `
      <button class="choice-btn" data-index="${index}">
        <span style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: 0.8rem;">[${keyHint}]</span>
        ${choice.text}
        ${costText}
      </button>
    `
  }

  startTimer() {
    const timerEl = document.getElementById('choice-timer')
    const timerFill = document.getElementById('choice-timer-fill')
    const totalTime = this.timeRemaining

    if (timerEl) timerEl.style.display = 'inline'
    
    this.timerInterval = setInterval(() => {
      this.timeRemaining -= 100
      
      if (timerEl) {
        const seconds = Math.ceil(this.timeRemaining / 1000)
        timerEl.textContent = `剩余 ${seconds}s`
      }
      
      if (timerFill) {
        const percentage = (this.timeRemaining / totalTime) * 100
        timerFill.style.width = `${percentage}%`
      }

      if (this.timeRemaining <= 5000 && this.timeRemaining > 4900) {
        audioManager.playBeep(800, 0.1)
      }

      if (this.timeRemaining <= 0) {
        this.stopTimer()
        if (this.timeoutChoice && this.onChoice) {
          const choice = this.choices.find(c => c.id === this.timeoutChoice) || this.choices[0]
          this.onChoice(choice)
        }
      }
    }, 100)
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    }
  }

  handleChoice(choice) {
    this.stopTimer()
    audioManager.playChoiceSelect()
    if (this.onChoice) {
      this.onChoice(choice)
    }
  }

  hide() {
    this.stopTimer()
    this.container.innerHTML = ''
  }

  selectByIndex(index) {
    if (index >= 0 && index < this.choices.length) {
      this.handleChoice(this.choices[index])
    }
  }
}

export default ChoicePanel
