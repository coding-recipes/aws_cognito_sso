import { SignInHandler } from '../../auth';
import { FullLoader } from '../atoms';

export default function Page() {
  return <>
    <SignInHandler
      onLoading={<FullLoader text="signing in..." />}
      onFailed={<FullLoader text="Sing in failed!" />}
    />
  </>
}