import AuthApiRoute from "./AuthRoute.js";



const AuthApiRoutes = (app) => {
    app.use(AuthApiRoute); // Route pour l'authentification
};

export default AuthApiRoutes