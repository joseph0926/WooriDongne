import { getProfile } from '@/services/region.service';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export async function ProfileWrapper() {
  const { success, message } = await getProfile();
  if (!success) {
    toast.error(message);
    redirect('/sign-in');
  }

  return null;
}
