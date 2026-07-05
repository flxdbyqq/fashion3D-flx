import { stateManager } from './StateManager.js'
import { sceneManager } from './SceneManager.js'
import { audioManager } from '../audio/AudioManager.js'
import GlitchEffect from '../effects/GlitchEffect.js'

import HUD from '../ui/HUD.js'
import DialogBox from '../ui/DialogBox.js'
import ChoicePanel from '../ui/ChoicePanel.js'
import StartScreen from '../ui/StartScreen.js'
import EndingScreen from '../ui/EndingScreen.js'

class GameEngine {
  constructor(appElement) {
    this.app = appElement
    this.glitchEffect = null
    
    this.hud = null
    this.dialogBox = null
    this.choicePanel = null
    this.startScreen = null
    this.endingScreen = null
    
    this.gameContainer = null
    this.sceneBg = null
    this.sceneOverlay = null
    this.chapterTitle = null
    this.braceletUI = null
    
    this.autoTimer = null
    this.isTransitioning = false
  }

  init() {
    this.setupStructure()
    this.setupEffects()
    this.setupUI()
    this.setupInput()
    this.setupSceneCallbacks()
  }

  setupStructure() {
    this.app.innerHTML = `
      <div class="scanlines"></div>
      <div class="noise"></div>
      <canvas class="glitch-canvas" id="glitch-canvas"></canvas>
      
      <div id="start-container"></div>
      
      <div class="game-container" id="game-container">
        <div class="scene-background ruins-street" id="scene-bg">
          <div class="scene-silhouette ruins"></div>
          <div class="scene-overlay"></div>
        </div>
        
        <div class="chapter-title" id="chapter-title">
          <div class="chapter-title-label" id="chapter-label"></div>
          <div class="chapter-title-text" id="chapter-text"></div>
        </div>
        
        <div id="hud-container"></div>
        
        <div id="dialog-container"></div>
        <div id="choice-container"></div>
        
        <div class="bracelet-ui" id="bracelet-ui">
          <div class="bracelet-frame"></div>
          <div class="bracelet-scan-line"></div>
          <div class="bracelet-text">LIFE LINK</div>
        </div>
      </div>
      
      <div id="ending-container"></div>
    `

    this.gameContainer = document.getElementById('game-container')
    this.sceneBg = document.getElementById('scene-bg')
    this.chapterTitle = document.getElementById('chapter-title')
    this.braceletUI = document.getElementById('bracelet-ui')
  }

  setupEffects() {
    const canvas = document.getElementById('glitch-canvas')
    this.glitchEffect = new GlitchEffect(canvas)
    this.glitchEffect.resize()
    
    window.addEventListener('resize', () => {
      this.glitchEffect.resize()
    })
  }

  setupUI() {
    this.startScreen = new StartScreen(document.getElementById('start-container'))
    this.startScreen.render()
    this.startScreen.onStart = () => this.startGame()

    this.hud = new HUD(document.getElementById('hud-container'))
    this.hud.render()

    this.dialogBox = new DialogBox(document.getElementById('dialog-container'))
    this.dialogBox.render()
    this.dialogBox.onComplete = () => this.onDialogComplete()

    this.choicePanel = new ChoicePanel(document.getElementById('choice-container'))

    this.endingScreen = new EndingScreen(document.getElementById('ending-container'))
    this.endingScreen.onRestart = () => this.restart()
  }

  setupInput() {
    document.addEventListener('keydown', (e) => {
      if (stateManager.gamePhase !== 'playing') return
      
      const key = e.key.toUpperCase()
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const index = key.charCodeAt(0) - 65
        this.choicePanel.selectByIndex(index)
      }
    })
  }

  setupSceneCallbacks() {
    sceneManager.onNodeChange = (node) => this.handleNodeChange(node)
    sceneManager.onEnding = (node) => this.handleEnding(node)
    sceneManager.onReward = (node) => this.handleReward(node)
  }

  startGame() {
    this.startScreen.hide()
    this.gameContainer.classList.add('active')
    stateManager.setGamePhase('playing')
    
    audioManager.playBeep(1000, 0.1)
    this.glitchEffect.trigger(500, 0.5)
    
    setTimeout(() => {
      sceneManager.start()
    }, 300)
  }

  handleNodeChange(node) {
    if (this.autoTimer) {
      clearTimeout(this.autoTimer)
      this.autoTimer = null
    }

    this.choicePanel.hide()
    this.updateBackground(node.background)
    this.updateArea(node.area)

    if (node.type === 'chapter') {
      this.showChapterTitle(node)
      return
    }

    if (node.type === 'narrative' || node.type === 'choice' || node.type === 'reward') {
      this.dialogBox.showText(node.text, node.character, () => this.onDialogComplete())
    }

    if (node.type === 'narrative' && node.next) {
    }
  }

  onDialogComplete() {
    const node = sceneManager.currentNode
    if (!node) return

    if (node.type === 'choice') {
      this.choicePanel.render(
        node.choices,
        (choice) => this.handleChoice(choice),
        node.timeout || 0,
        node.timeoutChoice
      )
    } else if (node.type === 'narrative' && node.next) {
      const duration = node.duration || 1500
      this.autoTimer = setTimeout(() => {
        this.transitionToNode(node.next)
      }, duration)
    }
  }

  handleChoice(choice) {
    if (this.isTransitioning) return
    this.isTransitioning = true

    this.choicePanel.hide()

    const totalChange = (choice.cost || 0) + (choice.reward || 0)
    if (totalChange !== 0) {
      this.hud.showPointsChange(totalChange)
    }

    this.glitchEffect.trigger(300, 0.6)

    const result = sceneManager.makeChoice(choice)
    
    if (result.died) {
      this.isTransitioning = false
      return
    }

    setTimeout(() => {
      this.transitionToNode(result.nextNode)
      this.isTransitioning = false
    }, 400)
  }

  transitionToNode(nodeId) {
    this.glitchEffect.trigger(200, 0.3)
    sceneManager.goToNode(nodeId)
  }

  updateBackground(bgClass) {
    if (!bgClass) return
    
    this.sceneBg.className = 'scene-background'
    this.sceneBg.classList.add(bgClass)
    
    const silhouette = this.sceneBg.querySelector('.scene-silhouette')
    if (silhouette) {
      silhouette.className = 'scene-silhouette'
      if (bgClass === 'ruins-street' || bgClass === 'task-board') {
        silhouette.classList.add('ruins')
      }
    }
  }

  updateArea(area) {
    if (area && stateManager.currentArea !== area) {
      stateManager.setCurrentNode(stateManager.currentNodeId, area)
    }
  }

  showChapterTitle(node) {
    const labelEl = document.getElementById('chapter-label')
    const textEl = document.getElementById('chapter-text')
    
    if (node.chapterLabel) {
      labelEl.textContent = node.chapterLabel
    }
    if (node.chapterText) {
      textEl.textContent = node.chapterText
    }
    
    this.chapterTitle.classList.add('show')
    audioManager.playBootUp()

    const duration = node.duration || 2500
    
    setTimeout(() => {
      this.chapterTitle.classList.remove('show')
      setTimeout(() => {
        if (node.next) {
          this.transitionToNode(node.next)
        }
      }, 500)
    }, duration)
  }

  handleReward(node) {
    if (node.rewardAmount) {
      setTimeout(() => {
        this.hud.showPointsChange(node.rewardAmount)
        stateManager.addPoints(node.rewardAmount)
      }, 500)
    }
  }

  handleEnding(node) {
    stateManager.setGamePhase('ending')
    this.choicePanel.hide()
    
    this.glitchEffect.trigger(1000, 0.8)
    
    setTimeout(() => {
      this.gameContainer.classList.remove('active')
      this.endingScreen.render(node)
    }, 800)
  }

  restart() {
    this.endingScreen.hide()
    sceneManager.restart()
    stateManager.setGamePhase('start')
    
    this.startScreen.show()
    
    this.glitchEffect.trigger(300, 0.5)
  }
}

export default GameEngine
