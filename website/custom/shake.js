class Shake extends HTMLElement {
  connectedCallback() {
    const text = this.textContent.trim();

    this.phaseY = Math.random() * 100.0;
    this.phaseX = Math.random() * 100.0;
    this.animate = this.animate.bind(this);
    this.animationId = requestAnimationFrame(this.animate);

    this.amplitude = parseFloat(this.getAttribute('amplitude')) || 1.0;
  }

  animate() {
    this.phaseY += 0.2;
    this.phaseX += 0.175;

    let y = Math.sin(this.phaseY + 1.0);

    let expSin = Math.sin(this.phaseY + 0.5) * this.amplitude;

    if (y > 0) {
      y = 2.0 ** expSin;
    } 

    if (y < 0) {
      y = -(2.0 ** expSin);
    }


    let x = Math.cos(this.phaseX);

    expSin = Math.cos(this.phaseX) * this.amplitude;

    if (x > 0) {
      x = 2.5 ** expSin;
    } 

    if (x < 0) {
      x = -(2.5 ** expSin);
    }

    this.style.transform = `translateY(${y}px)`;
    this.style.transform += `translateX(${x}px)`;

    this.animationId = requestAnimationFrame(this.animate);
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

customElements.define("shake-text", Shake);
