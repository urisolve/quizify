/**
 * Fireworks Animation Utility
 * Creates celebratory firework animations for level-up events
 */

/**
 * Creates multiple firework bursts across the screen
 * @param {number} count - Number of firework bursts (default: 3)
 * @param {number} delay - Delay between bursts in ms (default: 400)
 * @param {number} duration - Total animation duration in ms (default: 2500)
 */
function createFireworks(count = 3, delay = 400, duration = 2500) {
  const fireworksContainer = document.createElement('div');
  fireworksContainer.className = 'fireworks';
  document.body.appendChild(fireworksContainer);
  
  // Create multiple firework bursts
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createSingleFirework(fireworksContainer);
    }, i * delay);
  }
  
  // Remove fireworks container after animation
  setTimeout(() => {
    if (fireworksContainer.parentNode) {
      fireworksContainer.parentNode.removeChild(fireworksContainer);
    }
  }, duration);
}

/**
 * Creates a single firework explosion at a random position
 * @param {HTMLElement} container - The container element for the fireworks
 * @param {number} explosionCount - Number of colored explosions per firework (default: 8)
 * @param {number} particleCount - Number of particles per explosion (default: 6)
 */
function createSingleFirework(container, explosionCount = 8, particleCount = 6) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
  
  // Random position for firework
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
  
  // Create main firework explosion
  for (let i = 0; i < explosionCount; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.background = colors[i];
    firework.style.animationDelay = (i * 0.1) + 's';
    container.appendChild(firework);
    
    // Create particles around main firework
    for (let j = 0; j < particleCount; j++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      const angle = (j / particleCount) * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.background = colors[i];
      particle.style.setProperty('--dx', dx + 'px');
      particle.style.setProperty('--dy', dy + 'px');
      particle.style.animationDelay = (i * 0.1 + j * 0.05) + 's';
      container.appendChild(particle);
    }
  }
}

/**
 * Creates a simple firework burst (lightweight version)
 * @param {number} x - X position for the firework
 * @param {number} y - Y position for the firework
 */
function createSimpleFirework(x, y) {
  const container = document.querySelector('.fireworks') || document.body;
  createSingleFirework(container);
}

// Export functions for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createFireworks,
    createSingleFirework,
    createSimpleFirework
  };
}
