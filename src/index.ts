import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { Game } from './Game';

const ball = new Ball(document.getElementById('ball'));
const game = new Game();
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const enemyPaddle = new Paddle(document.getElementById('enemy-paddle'));

const playerScore = document.getElementById('player-score');
const enemyScore = document.getElementById('enemy-score');

document.addEventListener('mousemove', (e: MouseEvent) => {
  playerPaddle.y = (e.clientY / innerHeight) * 100;
});

ball.reset();

let lastTime: number;
function update(time: number): void {
  if (lastTime) {
    const delta = time - lastTime;
    if (isLose()) {
      LoseHandler();
    }
    ball.update(delta, [playerPaddle.rect(), enemyPaddle.rect()]);
    enemyPaddle.update(delta, ball.y);
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

function isLose(): boolean {
  const rect = ball.rect();
  if (rect.left <= 0 || rect.right >= innerWidth) {
    return true;
  } else {
    return false;
  }
}

function LoseHandler(): void {
  const rect = ball.rect();

  if (rect.left < 0) {
    game.enemyHits();
    enemyScore.innerText = game.enemyScore.toString();
  }

  if (rect.right > innerWidth) {
    game.playerHits();
    playerScore.innerText = game.playerScore.toString();
  }

  if (game.isGameEnded()) {
    window.location.reload();
  }

  playerPaddle.reset();
  enemyPaddle.reset();
  ball.reset();
}
