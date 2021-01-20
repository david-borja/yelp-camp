module.exports = fn => {
  return (req, res, next) => {
    fn (req, res, next).catch(next); // Why not .catch(e => next(e))?
  }
}