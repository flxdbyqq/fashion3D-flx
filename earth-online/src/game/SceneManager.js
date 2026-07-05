import { storyNodes, startingNode } from '../data/story.js'
import { stateManager } from './StateManager.js'

class SceneManager {
  constructor() {
    this.currentNode = null
    this.onNodeChange = null
    this.onEnding = null
    this.onReward = null
  }

  start() {
    this.goToNode(startingNode)
  }

  getNode(nodeId) {
    return storyNodes[nodeId] || null
  }

  goToNode(nodeId) {
    const node = this.getNode(nodeId)
    if (!node) {
      console.error('Node not found:', nodeId)
      return
    }

    this.currentNode = node
    stateManager.setCurrentNode(nodeId, node.area || '')

    if (this.onNodeChange) {
      this.onNodeChange(node)
    }

    if (node.type === 'ending') {
      if (this.onEnding) {
        this.onEnding(node)
      }
    } else if (node.type === 'reward') {
      if (this.onReward) {
        this.onReward(node)
      }
    }
  }

  makeChoice(choice) {
    const result = {
      nextNode: choice.next,
      cost: choice.cost || 0,
      reward: choice.reward || 0,
      consequence: choice.consequence || null
    }

    const totalChange = result.cost + result.reward
    const pointResult = stateManager.addPoints(totalChange)

    stateManager.recordChoice(
      this.currentNode.id,
      choice.id,
      result.consequence
    )

    if (pointResult.died) {
      const deathNode = this.getNode('ending_zero')
      if (deathNode) {
        setTimeout(() => {
          this.goToNode('ending_zero')
        }, 1500)
      }
      return { died: true }
    }

    return { died: false, nextNode: result.next, pointChange: totalChange }
  }

  restart() {
    stateManager.reset()
    this.currentNode = null
  }
}

export const sceneManager = new SceneManager()
