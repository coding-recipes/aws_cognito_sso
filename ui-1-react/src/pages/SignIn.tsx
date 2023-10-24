import { FullLoader } from '../components/atoms';
import { SignInHandler } from '../components/auth';

export default function Page() {
  return <>
    <SignInHandler
      onLoading={<FullLoader text="signing in..." />}
      onFailed={<FullLoader text="Sing in failed!" />}
    />
  </>
}