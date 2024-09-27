import { ProfileStepType } from '@/lib/schema/profile.schema';
import { useFormContext } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';

export function StepFour() {
  const { getValues } = useFormContext<ProfileStepType>();

  const { name, address, tags } = getValues();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">정보를 확인해주세요</h1>
      <div className="flex flex-col gap-3 text-lg text-slate-700">
        <div>
          이름:{' '}
          <span className={`font-semibold ${name ? 'text-black' : 'text-destructive'}`}>
            {name || '이름을 입력해주세요'}
          </span>
        </div>
        <div>
          주소:{' '}
          <span className={`font-semibold ${address ? 'text-black' : 'text-destructive'}`}>
            {address?.address || '주소를 입력해주세요'}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          관심사:
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag: string) => (
                <Badge className="h-8" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="font-semibold text-destructive">
              관심사를 최소 1개 이상 추가해주세요
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
