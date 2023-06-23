import { GameEvents } from 'src/app/constants';
import { GameEvent, Move } from 'src/app/types';

export class MessagesFactory {
  constructor(private whiteName: string, private blackName: string) {}

  public getEventMessage(event: GameEvent): string {
    switch (event.name) {
      case GameEvents.LOAD_GAME:
        return `Welcome back ${this.whiteName} and ${this.blackName}! you can continue your game`;
      case GameEvents.NEW_GAME:
        return `Welcome ${this.whiteName} and ${this.blackName}! This is a NES-style UI for the game of chess.`;
      case GameEvents.RESET_GAME:
        return `Well, here is a new game! Good luck :)`;
      default:
        return '';
    }
  }
  public getMessage(move: Move): string {
    if (move.checkmate) {
      return this.getCheckmateMessage(move);
    } else if (move.check) {
      return this.getCheckMessage(move);
    } else if (move.stalemate) {
      return this.getStalemateMessage(move);
    } else if (move.isKill) {
      return this.getKillMessage(move);
    } else {
      return this.getNormalMoveMessage(move);
    }
  }

  private getCheckmateMessage(move: Move): string {
    const playerName = move.turn === 'white' ? this.whiteName : this.blackName;
    const variations = [
      `Congratulations ${playerName} on a well-played game and a beautiful checkmate!`,
      `Good game! ${move.turn} won!`,
    ];
    return this.getRandomMessage(variations);
  }

  private getKillMessage(move: Move): string {
    const variations = [
      'Nice kill!',
      'Looks like someone lost a piece!',
      'Ouch!',
    ];
    return this.getRandomMessage(variations);
  }

  private getStalemateMessage(move: Move): string {
    const variations = [
      `Good game! it's a draw!`,
      'Ouch, Stalemate!',
      `It's a draw! don't forget to shake hands!`,
    ];
    return this.getRandomMessage(variations);
  }

  private getCheckMessage(move: Move): string {
    const playerName = move.turn === 'white' ? this.whiteName : this.blackName;

    const variations = [
      'Check!',
      'Watch out!',
      'Careful!',
      `Don't forget to protect your king!, ${playerName}`,
    ];
    return this.getRandomMessage(variations);
  }

  private getNormalMoveMessage(move: Move): string {
    const playerName = move.turn === 'white' ? this.whiteName : this.blackName;
    const otherPlayer = move.turn === 'white' ? this.blackName : this.whiteName;
    const variations = [
      `Good move, ${playerName}! ${otherPlayer} it's your turn now`,
      'Nice move!',
      `${otherPlayer} it's your turn!`,
      'Well played!',
    ];
    return this.getRandomMessage(variations);
  }

  private getRandomMessage(variations: string[]): string {
    return variations[Math.floor(Math.random() * variations.length)];
  }
}
