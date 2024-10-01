import React, { useId, useMemo } from 'react';
import { Skeleton } from './skeleton';

type SkeletonListProps = {
  length: number;
  className?: string;
};

const SkeletonList = ({ length = 5, className }: SkeletonListProps) => {
  const id = useId();
  const skeletonArray = useMemo(() => {
    return Array.from({ length }, (_, index) => ({
      id: `${id}-${index}`,
    }));
  }, [id]);

  return (
    <>
      {skeletonArray.map((item) => (
        <Skeleton key={item.id} className={className} />
      ))}
    </>
  );
};

export default SkeletonList;
