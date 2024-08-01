import {
  GridLayout,
  GridLayoutDescription,
  GridLayoutHeader,
  GridLayoutTitle,
} from '@/components/ui/grid-layout';
import { Skeleton } from '@/components/ui/skeleton';

const postListHeader = <h1>test</h1>;
const postListTitle = <Skeleton className="h-[200px] w-full" />;
const postListDescription = <p>test3</p>;

export function RecentPostList() {
  return (
    <GridLayout className="md:grid-cols-2">
      <GridLayoutHeader gridHeader={postListHeader} className="row-span-2">
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader} className="row-span-2">
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader} className="md:col-span-2">
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
    </GridLayout>
  );
}
