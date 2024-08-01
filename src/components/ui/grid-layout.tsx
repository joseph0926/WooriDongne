import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

function GridLayout({ className, children }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

function GridLayoutHeader({
  className,
  children,
  gridHeader,
}: {
  gridHeader: React.ReactNode;
} & ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group/grid row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
        className
      )}
    >
      {gridHeader}
      {children}
    </div>
  );
}

function GridLayoutTitle({
  icon,
  gridTitle,
  className,
}: {
  gridTitle: string | React.ReactNode;
  icon?: React.ReactNode;
} & ComponentProps<'div'>) {
  return (
    <div className={cn('transition duration-200 group-hover/grid:translate-x-2', className)}>
      {icon}
      <div className="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
        {gridTitle}
      </div>
    </div>
  );
}

function GridLayoutDescription({
  gridDescription,
  className,
}: { gridDescription: string | React.ReactNode } & ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300',
        className
      )}
    >
      {gridDescription}
    </div>
  );
}

export { GridLayout, GridLayoutDescription, GridLayoutHeader, GridLayoutTitle };
