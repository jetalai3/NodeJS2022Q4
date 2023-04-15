import jwt from 'jsonwebtoken';

const authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401);
        res.json('Unathorized');
        return;
    }
    try {
        if (!jwt.verify(authHeader, process.env.TOKEN_KEY)) {
            res.status(403);
            res.json('Forbidden');
            return;
        }
    } catch (error) {
        res.status(403);
        res.json('Forbidden');
        return;
    }

    return next();
};

export default authorizationMiddleware;
