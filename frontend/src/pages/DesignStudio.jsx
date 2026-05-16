import React, { useState } from 'react'
import { useDesignStore } from '../stores/designStore'
import SceneContainer from '../components/three/SceneContainer'
import './DesignStudio.css'

const DesignStudio = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Editorial')
  const { generateDesign, isLoading, generationStatus } = useDesignStore()

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    await generateDesign(prompt, selectedStyle)
  }

  const styles = ['Editorial', 'Minimal', 'Avant-Garde', 'Classic']

  return (
    <div className="design-studio">
      <div className="container">
        <div className="studio-header">
          <h1 className="studio-title">DESIGN STUDIO</h1>
          <p className="studio-subtitle">Describe your vision, we'll bring it to life</p>
        </div>

        <div className="studio-grid">
          <div className="studio-panel">
            <div className="panel-section">
              <div className="label">YOUR VISION</div>
              <textarea
                className="prompt-input"
                placeholder="E.g., An elegant evening gown with delicate embroidery, crafted from silk fabric in deep navy blue..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8}
              />

              <div className="style-section">
                <div className="label">STYLE PRESETS</div>
                <div className="style-grid">
                  {styles.map((style) => (
                    <button
                      key={style}
                      className={`style-btn ${selectedStyle === style ? 'active' : ''}`}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={!prompt.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    GENERATING...
                  </>
                ) : (
                  <>
                    GENERATE DESIGN
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="studio-viewport">
            <SceneContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignStudio
