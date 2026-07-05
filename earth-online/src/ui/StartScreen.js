import { audioManager } from '../audio/AudioManager.js'

class StartScreen {
  constructor(container) {
    this.container = container
    this.onStart = null
  }

  render() {
    this.container.innerHTML = `
      <div class="start-screen" id="start-screen">
        <div class="title-main" data-text="地球Online">地球Online</div>
        <div class="title-sub">EARTH · ONLINE</div>
        <div class="title-tagline">"坍塌"三年后</div>
        <button class="start-btn" id="start-btn">[ 启 动 ]</button>
        <div class="start-hint">点击启动按钮，开始你的生存之旅</div>
      </div>
    `

    const startBtn = document.getElementById('start-btn')
    startBtn.addEventListener('click', () => this.handleStart())
    startBtn.addEventListener('mouseenter', () => audioManager.playClick())

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        const screen = document.getElementById('start-screen')
        if (screen && screen.style.display !== 'none') {
          this.handleStart()
        }
      }
    })
  }

  handleStart() {
    audioManager.init()
    audioManager.playBootUp()

    const screen = document.getElementById('start-screen')
    screen.classList.add('booting')

    setTimeout(() => {
      if (this.onStart) {
        this.onStart()
      }
    }, 1500)
  }

  hide() {
    this.container.style.display = 'none'
  }

  show() {
    this.container.style.display = 'flex'
  }
}

export default StartScreen
