class Abberated extends HTMLElement {
  connectedCallback() {
    const text = this.textContent.trim();
    this.innerHTML = '';

    this.amplitude = parseFloat(this.getAttribute('amplitude')) || 25;
    this.frequency = parseFloat(this.getAttribute('frequency')) || 0.15;
    this.speed = parseFloat(this.getAttribute('speed')) || 0.05;

    this.spans = Array.from(text).map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      this.appendChild(span);
      return { element: span, index };
    });

    this.phase = 0;
    this.animate = this.animate.bind(this);
    this.animationId = requestAnimationFrame(this.animate);
  }

  animate() {
    this.phase += this.speed;

    this.spans.forEach(({ element, index }) => {
      const y = Math.sin(this.phase + index * this.frequency) * this.amplitude;
      
      element.style.transform = `translateY(${y}px)`;
    });

    this.animationId = requestAnimationFrame(this.animate);
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

customElements.define("abberated-text", Abberated);
