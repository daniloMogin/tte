import IndexRoute = require('./index.server.routes');
import CupRoute = require('./cup.server.routes');
import GameRoute = require('./game.server.routes');
import GroupRoute = require('./group.server.routes');
// import LeagueRoute = require('./league.server.model');
// import ResultRoute = require('./result.server.model');
import RoleRoute = require('./role.server.routes');
import UserRoute = require('./user.server.routes');

export const routes: any[] = [
    IndexRoute,
    CupRoute,
    RoleRoute,
    UserRoute,
    GroupRoute,
    GameRoute
];

export * from './index.server.routes';
export * from './cup.server.routes';
export * from './game.server.routes';
export * from './group.server.routes';
// export * from './league.server.model';
// export * from './result.server.model';
export * from './role.server.routes';
export * from './user.server.routes';
