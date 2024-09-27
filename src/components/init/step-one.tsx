import { ProfileStepType } from '@/lib/schema/profile.schema';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileStepType>();

  return (
    <div className="flex h-32 flex-col gap-4">
      <h1 className="text-xl text-slate-700">이름을 입력해주세요</h1>
      <Input {...register('name')} className="min-h-10" placeholder="이름" />
      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
    </div>
  );
}
