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

export function AllPostList() {
  return (
    <GridLayout>
      <GridLayoutHeader gridHeader={postListHeader}>
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader}>
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader}>
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader}>
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader}>
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
      <GridLayoutHeader gridHeader={postListHeader}>
        <GridLayoutTitle gridTitle={postListTitle} />
        <GridLayoutDescription gridDescription={postListDescription} />
      </GridLayoutHeader>
    </GridLayout>
  );
}
