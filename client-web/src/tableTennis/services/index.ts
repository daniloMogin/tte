import { UserService } from './user.service';
import { GameService } from './game.service';

export const services: any[] = [UserService, GameService];

export * from './user.service';
export * from './game.service';
