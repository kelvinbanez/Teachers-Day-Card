document.addEventListener('DOMContentLoaded', () => {
  const book = document.getElementById('book');
  const coverPage = document.getElementById('coverPage');
  const toggleBtn = document.getElementById('toggleBtn');
  const toggleIcon = document.getElementById('toggleIcon');
  const toggleText = document.getElementById('toggleText');
  const confettiBtn = document.getElementById('confettiBtn');

  // Web Audio API for page flip sound effect
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playFlipSound() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  }

  // Toggle book state function
  function toggleCard() {
    const isFlipped = coverPage.classList.toggle('flipped');
    book.classList.toggle('open');
    playFlipSound();

    if (isFlipped) {
      toggleIcon.className = 'fa-solid fa-book';
      toggleText.textContent = 'Close Card';
      triggerConfetti();
    } else {
      toggleIcon.className = 'fa-solid fa-book-open';
      toggleText.textContent = 'Click Card to Open';
    }
  }

  // Trigger Confetti Blast
  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF512F', '#DD2476', '#FFD700', '#7C3AED', '#38BDF8']
      });
    }
  }

  // Event Listeners
  coverPage.addEventListener('click', toggleCard);
  toggleBtn.addEventListener('click', toggleCard);

  confettiBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents flipping the card when clicking the button
    triggerConfetti();
  });
});