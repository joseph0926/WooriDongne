import { getUserInfo } from '@/services/user.service';

export default async function InitPage() {
  const { data } = await getUserInfo();
  console.log(data);

  return <div>Test</div>;
}
