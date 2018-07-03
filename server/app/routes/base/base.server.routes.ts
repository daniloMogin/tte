import * as express from 'express';
import * as fromRoutes from './../index';

let app = express();

class BaseRoutes {
    get routes(): express.Router {
        app.use('/', new fromRoutes.IndexRoutes().routes);
        app.use('/', new fromRoutes.CupRoutes().routes);
        app.use('/', new fromRoutes.UserRoutes().routes);
        app.use('/', new fromRoutes.RoleRoutes().routes);

        return app;
    }
}
export = BaseRoutes;
