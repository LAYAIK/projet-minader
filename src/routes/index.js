// import AuthApiRoute from "./AuthRoute.js";

import prioriteRoutes from "./prioriteRoute.js";
import objetRoutes from "./objetRoute.js";
import statusRoutes from "./statusRoute.js";
import noteRoutes from "./noteRoute.js";


const ApiRoutes = (app) => {
    app.use(objetRoutes);
    app.use(statusRoutes);
    app.use(prioriteRoutes);
    app.use(noteRoutes);

}

export default ApiRoutes