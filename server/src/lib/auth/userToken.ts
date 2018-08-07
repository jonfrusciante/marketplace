import * as jsonwebtoken from 'jsonwebtoken'

export const sign = (user: any) => {
  const timestamp = new Date().getTime()
  const { id } = user
  return jsonwebtoken.sign(
    {
      sub: id,
      iat: timestamp,
    },
    String(process.env.JWT_SECRET),
    { expiresIn: Math.floor(Date.now() / 1000) + 60 * 10080 }
  )
}

export const verify = (token: string) =>
  jsonwebtoken.verify(token, String(process.env.JWT_SECRET))
