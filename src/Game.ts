export class Game {
  private player_score: number = 0;
  private enemy_score: number = 0;

  private playerWin: boolean = false;
  private enemyWin: boolean = false;

  private checkWin(): void {
    if (this.player_score > 11) {
      this.playerWin = true;
    }
  }

  private checkLose(): void {
    if (this.enemy_score > 11) {
      this.enemyWin = true;
    }
  }

  get playerScore(): number {
    return this.player_score;
  }

  get enemyScore(): number {
    return this.enemy_score;
  }

  playerHits(): void {
    this.player_score++;
    this.checkWin();
  }

  enemyHits(): void {
    this.enemy_score++;
    this.checkLose();
  }

  isGameEnded(): boolean {
    return this.playerWin || this.enemyWin;
  }
}
