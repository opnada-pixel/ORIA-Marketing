// Vercel Routing Middleware — keeps the whole site behind a password.
// Set ORIA_USER and ORIA_PASS in Vercel → Project → Settings → Environment Variables.
// If they are not set, every request is refused (the site fails closed).
export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const user = process.env.ORIA_USER, pass = process.env.ORIA_PASS;
  const auth = request.headers.get('authorization') || '';
  if (user && pass && auth.startsWith('Basic ')) {
    try {
      const [u, ...rest] = atob(auth.slice(6)).split(':');
      if (u === user && rest.join(':') === pass) return; // allowed — continue to the file
    } catch (e) {}
  }
  return new Response('Private — authorised access only.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="ORIA", charset="UTF-8"', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
