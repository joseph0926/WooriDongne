import { getProfile } from '@/services/region.service';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { Sidebar } from '@/components/layout/sidebar';

export async function ProfileWrapper() {
  const { success, message, data } = await getProfile();
  if (!success || !data) {
    toast.error(message);
    redirect('/sign-in');
  }

  return <Sidebar profile={data} />;
}
