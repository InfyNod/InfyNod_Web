import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev_secret'

export function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (e) {
    return null
  }
}

export function getAuthUser(request) {
  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Bearer ')) return null
  return verifyToken(header.slice(7))
}
