import logger from './appLogger';

const handler = (req, res, next) => {
    try {
        logger.debug(`URL: ${req.url}; METHOD: ${req.method}; PARAMS: ${JSON.stringify(req.params)}; BODY: ${JSON.stringify(req.body)}`);
        return next();
    } catch (error) {
        logger.error(error.message, { ...error });
        res.status(500).send('Internal server error');
    }
};

export default handler;
