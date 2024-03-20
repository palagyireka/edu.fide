module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => {
      e.type = "flashError";
      e.message = "Something went wrong, please try again!";
      return next(e);
    });
  };
};
