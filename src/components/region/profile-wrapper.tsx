import { getProfile } from '@/services/region.service';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';

export async function ProfileWrapper() {
  const { success, data } = await getProfile();
  if (!success || !data) {
    redirect('/sign-in');
  }

  return <Sidebar profile={data} />;
}
