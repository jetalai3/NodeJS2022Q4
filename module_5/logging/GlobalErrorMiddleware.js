import logger from './appLogger';

// eslint-disable-next-line no-unused-vars
const globalErrorMiddleware = (err, req, res, next) => {
    logger.error('Internal Server Error');

    res.status(500);
    res.json({ error: err.message });
};

export default globalErrorMiddleware;
