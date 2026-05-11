export function getHealth(_req, res) {
  res.status(200).json({
    success: true,
    message: 'Cleanora API is healthy'
  });
}
