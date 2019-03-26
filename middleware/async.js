module.exports = function asyncMiddleware() {
  return async(req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      next(ex);
    }
  };
}