document.addEventListener('DOMContentLoaded', () => {
  const entrance = document.getElementById('entrance');
  const welcome = document.getElementById('welcome');
  const library = document.getElementById('library');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');

  document.getElementById('enterButton').addEventListener('click', () => {
    entrance.classList.add('hidden');
    welcome.classList.remove('hidden');
  });

  document.getElementById('continueButton').addEventListener('click', () => {
    welcome.classList.add('hidden');
    library.classList.remove('hidden');
  });

  function openModal(title, paragraphs) {
    modalContent.replaceChildren();
    const heading = document.createElement('h2');
    heading.id = 'modalTitle';
    heading.textContent = title;
    modalContent.appendChild(heading);
    paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      modalContent.appendChild(p);
    });
    modal.classList.remove('hidden');
  }

  function addButton(label, onClick) {
    const button = document.createElement('button');
    button.className = 'modal-action';
    button.textContent = label;
    button.addEventListener('click', onClick);
    modalContent.appendChild(button);
    return button;
  }

  document.querySelectorAll('.archive-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = card.dataset.item;
      if (item === 'book') openModal('The Little Book 📖', ['Every story begins somewhere.', 'Some begin with a hello, a kind gesture, or a moment that makes an ordinary day feel special.']);
      if (item === 'cat') openModal('The Cat Librarian 🐈', ['“Mrrp!” The tiny librarian adjusts its spectacles.', '“I guard the books, take excellent naps, and believe everyone deserves a little happiness.”']);
      if (item === 'flower') openModal('The Pressed Flower 🌷', ['A little kindness can stay in someone’s memory longer than we realise.', 'Keep noticing the beautiful little things. They have a way of making life warmer.']);
      if (item === 'letter') openModal('A Little Letter ✉️', ['Dear Rishika,', 'I made this little corner of the internet as a small birthday surprise for you. We may not talk all the time, but I wanted to wish you a lovely year filled with happiness, laughter, and beautiful memories.', 'Happy birthday! 🌷']);
      if (item === 'drawer') {
        openModal('The Secret Drawer 🗝️', ['A note says: enter the special date in DDMM format.']);
        const input = document.createElement('input');
        input.id = 'secretKey'; input.inputMode = 'numeric'; input.maxLength = 4; input.placeholder = 'DDMM'; input.setAttribute('aria-label', 'Four digit date');
        modalContent.appendChild(input);
        const feedback = document.createElement('p');
        feedback.id = 'keyFeedback'; modalContent.appendChild(feedback);
        addButton('UNLOCK', () => {
          if (input.value.trim() === '2502') {
            feedback.textContent = 'Unlocked! ✨ You found the date hidden in the archive.';
            addButton('READ THE SECRET NOTE', () => openModal('A Secret Note 💌', ['Hey, birthday star.', 'I hope the coming year brings you lovely surprises, peaceful days, reasons to laugh, and people who make you feel appreciated.', 'Keep being your own kind of wonderful. 🌷']));
          } else feedback.textContent = 'Not quite! Hint: February 25. Try DDMM.';
        });
      }
      if (item === 'stars') {
        openModal('The Star Room ✨', ['Collect all five stars to reveal a little message.']);
        const countText = document.createElement('p'); countText.textContent = 'Stars collected: 0 / 5'; modalContent.appendChild(countText);
        const area = document.createElement('div'); modalContent.appendChild(area);
        const result = document.createElement('p'); modalContent.appendChild(result);
        let count = 0;
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('button'); star.className = 'star-button'; star.textContent = '⭐'; star.setAttribute('aria-label', `Collect star ${i + 1}`);
          star.addEventListener('click', () => {
            if (star.disabled) return;
            star.disabled = true; star.textContent = '🌟'; count++;
            countText.textContent = `Stars collected: ${count} / 5`;
            if (count === 5) result.textContent = 'You found every star! May your days be filled with little reasons to smile. 🌙';
          });
          area.appendChild(star);
        }
      }
    });
  });

  document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', event => { if (event.target === modal) modal.classList.add('hidden'); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') modal.classList.add('hidden'); });
});
