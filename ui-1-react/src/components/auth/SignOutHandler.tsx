import { RedirectCB } from "./Redirects";
// import { RedirectSsoSignIn } from "./Redirects";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'

export const SignOutHandler = () => {
  return <>
    <RedirectCB />
    {/* <RedirectSsoSignIn /> */}
  </>
}