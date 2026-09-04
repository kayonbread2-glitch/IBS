class GarbledText extends HTMLElement {
  constructor() {
    super();

    this.isGarbling = false;
    this.animationId = null;

    this.lastGarble = 0;

    this.fps = 5;
    this.unicodeRanges = [
      [0x0100, 0x017F], // Latin Extended-A
      [0x0370, 0x03FF], // Greek and Coptic
      // [0x0400, 0x04FF], // Cyrillic
      // [0x30A0, 0x30FF], // Katakana
      // [0x2580, 0x259F], // Block Elements
      // [0x2800, 0x28FF]  // Braille Patterns
    ];

    this.animation = this.animation.bind(this);
  }

  connectedCallback() {
    this.garble();

    if (this.hasAttribute('fps')) {
      this.fps = parseInt(this.getAttribute('fps'), 10) || this.fps;
    }

    this.animationId = requestAnimationFrame(this.animation);
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  animation(timestamp) {
    console.log("Frame");
    if ((timestamp - this.lastGarble) > (1.0 / this.fps) * 1000.0) {
      this.garble();
      this.lastGarble = timestamp;
    } 

    this.animationId = requestAnimationFrame(this.animation);
  }

  garble() {
    this.textContent = Array.from(this.textContent, char => {
      if (char === ' ') return ' ';

      return this.getRandomUnicodeChar(); 
    }).join('');
  }

  getRandomUnicodeChar() {
    const selectedRange = this.unicodeRanges[Math.floor(Math.random() * this.unicodeRanges.length)];
    const [min, max] = selectedRange;
    const randomCodePoint = Math.floor(Math.random() * (max - min + 1)) + min;
    return String.fromCharCode(randomCodePoint);
  }
}

customElements.define('garbled-text', GarbledText);
