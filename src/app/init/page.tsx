import { Init } from '@/components/init/step';
import { getUserInfo } from '@/services/user.service';

export default async function InitPage() {
  const { data } = await getUserInfo();
  console.log(data);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-2xl shadow-lg">
        <Init />
      </div>
    </div>
  );
}
