import './styles/main.css'
import GameEngine from './game/GameEngine.js'

const app = document.getElementById('app')
const game = new GameEngine(app)
game.init()
