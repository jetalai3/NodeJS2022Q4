import logger from './appLogger';

const loggingMiddleware = (req, res, next) => {
    try {
        logger.info(`URL: ${req.url}; METHOD: ${req.method}; BODY: ${JSON.stringify(req.body)}`);
        return next();
    } catch (error) {
        logger.error(error.message, { ...error });
        res.status(500).send('Internal server error');
    }
};

export default loggingMiddleware;
