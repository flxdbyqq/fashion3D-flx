import { initialPoints } from '../data/story.js'

class StateManager {
  constructor() {
    this.reset()
    this.listeners = []
  }

  reset() {
    this.survivalPoints = initialPoints
    this.currentNodeId = null
    this.choiceHistory = []
    this.dayCount = 1
    this.totalChoices = 0
    this.totalPointsEarned = 0
    this.totalPointsSpent = 0
    this.isWarning = false
    this.gamePhase = 'start'
    this.currentArea = ''
    this.consequences = []
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback)
    }
  }

  notify() {
    this.listeners.forEach(cb => cb(this.getState()))
  }

  getState() {
    return {
      survivalPoints: this.survivalPoints,
      currentNodeId: this.currentNodeId,
      choiceHistory: [...this.choiceHistory],
      dayCount: this.dayCount,
      totalChoices: this.totalChoices,
      totalPointsEarned: this.totalPointsEarned,
      totalPointsSpent: this.totalPointsSpent,
      isWarning: this.isWarning,
      warningLevel: this.getWarningLevel(),
      gamePhase: this.gamePhase,
      currentArea: this.currentArea,
      consequences: [...this.consequences]
    }
  }

  getWarningLevel() {
    if (this.survivalPoints <= 20) return 'critical'
    if (this.survivalPoints <= 50) return 'warning'
    return 'normal'
  }

  setCurrentNode(nodeId, area = '') {
    this.currentNodeId = nodeId
    if (area) this.currentArea = area
    this.notify()
  }

  setGamePhase(phase) {
    this.gamePhase = phase
    this.notify()
  }

  addPoints(amount) {
    const oldPoints = this.survivalPoints
    this.survivalPoints = Math.max(0, Math.round((this.survivalPoints + amount) * 100) / 100)
    
    if (amount > 0) {
      this.totalPointsEarned += amount
    } else {
      this.totalPointsSpent += Math.abs(amount)
    }

    const newLevel = this.getWarningLevel()
    this.isWarning = newLevel !== 'normal'

    this.notify()

    if (this.survivalPoints <= 0.01) {
      return { died: true, newPoints: this.survivalPoints, oldPoints }
    }

    return { died: false, newPoints: this.survivalPoints, oldPoints, change: amount }
  }

  recordChoice(nodeId, choiceId, consequence) {
    this.choiceHistory.push({
      nodeId,
      choiceId,
      consequence,
      timestamp: Date.now()
    })
    this.totalChoices++
    if (consequence) {
      this.consequences.push(consequence)
    }
    this.notify()
  }

  advanceDay() {
    this.dayCount++
    this.notify()
  }
}

export const stateManager = new StateManager()
