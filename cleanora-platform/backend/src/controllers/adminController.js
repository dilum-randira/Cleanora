import jwt from 'jsonwebtoken';

export function adminLogin(req, res) {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  if (!jwtSecret || !adminEmail || !adminPassword) {
    return res.status(500).json({
      success: false,
      message: 'Admin authentication is not configured'
    });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid admin credentials'
    });
  }

  const token = jwt.sign(
    {
      role: 'admin',
      email: adminEmail
    },
    jwtSecret,
    { expiresIn: '1d' }
  );

  return res.status(200).json({
    success: true,
    message: 'Admin login successful',
    token
  });
}
