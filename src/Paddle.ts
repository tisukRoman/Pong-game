const SPEED = 0.025;

export class Paddle {
  constructor(private paddle: HTMLElement) {}

  get y(): number {
    return parseFloat(getComputedStyle(this.paddle).getPropertyValue('--y'));
  }

  set y(value: number) {
    this.paddle.style.setProperty('--y', value.toString());
  }

  rect(): DOMRect {
    return this.paddle.getBoundingClientRect();
  }

  reset(): void {
    this.y = 50;
  }

  update(delta: number, ballHeight: number): void {
    this.y += SPEED * delta * (ballHeight - this.y);
  }
}
