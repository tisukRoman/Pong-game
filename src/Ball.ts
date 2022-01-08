const INITIAL_VELOCITY = 0.05;
const VELOCITY_INCREASE = 1.001;

export class Ball {
  private direction: { x: number; y: number };
  private velocity: number;

  constructor(private ball: HTMLElement) {}

  get x(): number {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue('--x'));
  }

  get y(): number {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue('--y'));
  }

  set x(value: number) {
    this.ball.style.setProperty('--x', `${value}`);
  }

  set y(value: number) {
    this.ball.style.setProperty('--y', `${value}`);
  }

  rect(): DOMRect {
    return this.ball.getBoundingClientRect();
  }

  reset(): void {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0, y: 0 };
    while (Math.abs(this.direction.x) <= 0.2 || this.direction.x >= 0.9) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta: number, paddleRects: DOMRect[]): void {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    const rect = this.rect();
    this.velocity *= VELOCITY_INCREASE;

    if (rect.bottom >= innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if(paddleRects.some((r) => isCollisionBetween(r, rect))){
        this.direction.x *= -1;
    }
  }
}


function randomNumberBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function isCollisionBetween(a: DOMRect, b: DOMRect): boolean {
    return (
        a.left <= b.right && 
        a.right >= b.left && 
        a.top <= b.bottom && 
        a.bottom >= b.top
    );
}