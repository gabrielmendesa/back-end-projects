function errorMiddleware(err, _req, res, _next) {
  const isRequired = err.message.includes('is required');
  const notFound = err.message.includes('not found');
  const charactersErrors = ['characters long', 'must be greater'];
  const charactersLength = charactersErrors.some((error) => err.message.includes(error));
  switch (true) {
    case isRequired: return res.status(400).json({ message: err.message });
    case notFound: return res.status(404).json({ message: err.message });
    case charactersLength: return res.status(422).json({ message: err.message });
    default: return res.status(500).json({ message: err.message });
  }
}

module.exports = errorMiddleware;