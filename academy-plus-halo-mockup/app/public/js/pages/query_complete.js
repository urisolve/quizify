document.addEventListener('DOMContentLoaded', function() {
  // Lightning bolts are now rendered server-side via Handlebars

  // EXP bar: two-color fill (previous and new progress)
  const fillPrev = document.getElementById('points-bar-fill-prev');
  const fillNew = document.getElementById('points-bar-fill-new');
  const barContainer = document.querySelector('.points-bar-container');
  if (fillPrev && fillNew && barContainer) {
    const percentPrev = Number(barContainer.dataset.percentPrev) || 0;
    const percent = Number(barContainer.dataset.percent) || 0;
    const leveledUp = barContainer.dataset.leveledUp === 'true';
    
    if (leveledUp) {
      // User leveled up! Show single green bar filling to 100% immediately
      fillPrev.style.width = '0%'; // Hide previous bar
      fillNew.style.left = '0%';
      fillNew.style.width = '0%'; // Start at 0
      fillNew.style.borderRadius = '8px';
      fillNew.classList.add('level-up'); // Add green styling
      
      // Trigger the animation after a short delay
      setTimeout(() => {
        fillNew.style.width = '100%';
        // Trigger fireworks animation
        createFireworks();
      }, 300);
      
      console.log('🎉 LEVEL UP! Bar fills to 100% in green!');
    } else {
      // Normal progress: two-bar system with proper timing
      setTimeout(() => {
        // First show the orange bar (previous progress)
        fillPrev.style.width = percentPrev + '%';
        
        // Then show the green bar (new progress) after orange bar finishes
        const added = Math.max(0, percent - percentPrev);
        fillNew.style.left = percentPrev + '%';
        fillNew.style.width = added + '%';
        fillNew.classList.remove('level-up'); // Ensure normal styling
        
        if (percentPrev === 0) {
          fillNew.style.borderRadius = '8px 0 0 8px';
        } else {
          fillNew.style.borderRadius = '0 8px 8px 0';
        }
      }, 300);
    }
    
    console.log('\n percentPrev:', percentPrev, '\n', 'percent:', percent, '\n', 'leveledUp:', leveledUp);
  }
  
  // Play appropriate sound
  if (barContainer && barContainer.dataset.leveledUp === 'true') {
    // Play level-up sound for leveling up
    const levelUpAudio = document.getElementById('level-up-sound');
    if (levelUpAudio) {
      levelUpAudio.volume = 0.15;
      levelUpAudio.play();
    }
  } else {
    // Play completion jingle for normal progress
    const audio = document.getElementById('completion-jingle');
    if (audio) {
      audio.volume = 0.1;
      audio.play();
    }
  }
});