class DialogBox {
  constructor(container) {
    this.container = container
    this.textElement = null
    this.characterElement = null
    this.currentText = ''
    this.typingInterval = null
    this.typingSpeed = 50
    this.isComplete = false
    this.onComplete = null
  }

  render() {
    this.container.innerHTML = `
      <div class="dialog-section">
        <div class="dialog-box">
          <div class="dialog-character" id="dialog-character"></div>
          <div class="dialog-text" id="dialog-text"></div>
          <div class="dialog-hint">[ 点击继续 ▸ ]</div>
        </div>
      </div>
    `

    this.textElement = document.getElementById('dialog-text')
    this.characterElement = document.getElementById('dialog-character')
    this.boxElement = this.container.querySelector('.dialog-box')

    this.boxElement.addEventListener('click', () => {
      if (!this.isComplete) {
        this.skipTyping()
      } else if (this.onComplete) {
        this.onComplete()
      }
    })
  }

  showText(text, character = null, onComplete = null) {
    this.currentText = text
    this.isComplete = false
    this.onComplete = onComplete
    this.textElement.textContent = ''
    this.textElement.classList.remove('complete')

    if (character) {
      this.characterElement.textContent = character
      this.characterElement.style.display = 'block'
    } else {
      this.characterElement.style.display = 'none'
    }

    this.boxElement.style.animation = 'none'
    this.boxElement.offsetHeight
    this.boxElement.style.animation = 'fadeInUp 0.5s ease'

    this.typeText(text)
  }

  typeText(text) {
    let index = 0
    const totalLength = text.length

    if (this.typingInterval) {
      clearInterval(this.typingInterval)
    }

    this.typingInterval = setInterval(() => {
      if (index < totalLength) {
        this.textElement.textContent += text[index]
        index++
        
        if (text[index - 1] === '\n') {
          this.textElement.innerHTML += '<br>'
        }
      } else {
        this.completeTyping()
      }
    }, this.typingSpeed)
  }

  skipTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval)
      this.typingInterval = null
    }
    
    this.textElement.innerHTML = this.currentText.replace(/\n/g, '<br>')
    this.completeTyping()
  }

  completeTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval)
      this.typingInterval = null
    }
    
    this.isComplete = true
    this.textElement.classList.add('complete')
  }

  hide() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval)
      this.typingInterval = null
    }
    this.container.innerHTML = ''
  }
}

export default DialogBox
