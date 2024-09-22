import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';

type CardProps = ComponentProps<'div'>;

/**
 * 스타일 래퍼 컴포넌트 - Card
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn('rounded-xl bg-background p-6 shadow-lg', className)}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
