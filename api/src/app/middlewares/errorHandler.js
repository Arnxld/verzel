module.exports = (error, request, response, next) => {
  console.log(error);
  response.status(500).json({ error: 'Something Broke' });
};
