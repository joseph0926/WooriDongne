import { AllPostList } from '@/components/post/all-post-list';
import { RecentPostList } from '@/components/post/recent-post-list';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <RecentPostList />
      <AllPostList />
    </div>
  );
}
