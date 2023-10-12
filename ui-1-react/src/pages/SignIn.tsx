import { AfterAuthPage } from '../auth';
import { FullLoader } from '../atoms';

export default function Page() {
  return <>
    <AfterAuthPage
      onLoading={<FullLoader text="signing in..." />}
      onFailed={<FullLoader text="Sing in failed!" />}
    />
  </>
}