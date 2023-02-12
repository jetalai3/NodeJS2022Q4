import logger from './appLogger';

class RequestLogger {
    constructor(loggerInstance) {
        this.logger = loggerInstance;
    }

    error(message, request) {
        this.log('error', message, request);
    }

    warn(message, request) {
        this.log('warn', message, request);
    }

    info(message, request) {
        this.log('info', message, request);
    }

    debug(message, request) {
        this.log('debug', message, request);
    }

    getRequestMeta({ path, params, method }) {
        return { path, params, method };
    }

    log(key, message, request) {
        this.logger[key](message, this.getRequestMeta(request));
    }
}

const requestLoggerInstance = new RequestLogger(logger);
Object.freeze(requestLoggerInstance);

export default requestLoggerInstance;
