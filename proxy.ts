import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

//The proxy.ts file is a Next.js file that implements authentication using NextAuth.js.
//It exports the auth function from NextAuth.js, which is used to verify the authentication of the user.
//The config object is used to define the matcher option, which is used to define which routes should be protected by NextAuth.js.
//The matcher option is used to define which routes should be protected by NextAuth.js.
//The advantage of employing Proxy for this task is that the protected routes will not even start rendering until the Proxy verifies the authentication, enhancing both the security and performance of your application.



