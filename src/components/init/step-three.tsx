import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { ProfileStepType } from '@/lib/schema/profile.schema';

export function StepThree() {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ProfileStepType>();
  const [inputValue, setInputValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  return (
    <div className="flex h-40 flex-col gap-4">
      <h1 className="text-xl text-slate-700">관심사를 입력해주세요</h1>
      <span className="text-xs text-slate-500">(엔터 또는 , 를 입력하시면 입력이 완료됩니다.)</span>
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const { value, onChange } = field;

          const inputKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            /** 한글(조합 글자)의 경우 조합중이면 추가하지 않도록 하는 로직 */
            if (isComposing) return;

            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              const tagValue = inputValue.trim();
              if (tagValue !== '') {
                if (tagValue.length < 2) {
                  setError('tags', {
                    type: 'minLength',
                    message: '태그는 최소 1자 이상이여야합니다.',
                  });
                  return;
                }
                if (tagValue.length > 15) {
                  setError('tags', { type: 'maxLength', message: '태그는 최대 15자입니다.' });
                  return;
                }
                if (value.includes(tagValue)) {
                  setError('tags', { type: 'duplicate', message: '이미 추가된 태그입니다.' });
                  return;
                }
                if (value.length >= 5) {
                  setError('tags', {
                    type: 'max',
                    message: '태그는 최대 5개까지 추가할 수 있습니다.',
                  });
                  return;
                }
                clearErrors('tags');
                onChange([...value, tagValue]);
                setInputValue('');
              }
            }
          };

          const tagRemoveHandler = (tag: string) => {
            const newTags = value.filter((t: string) => t !== tag);
            onChange(newTags);
            if (newTags.length === 0) {
              setError('tags', { type: 'required', message: '태그를 최소 1개 이상 입력해주세요.' });
            } else {
              clearErrors('tags');
            }
          };

          return (
            <>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={inputKeyDownHandler}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
              />
              {value.length > 0 && (
                <div className="flex w-full flex-wrap items-center gap-2">
                  {value.map((tag: string) => (
                    <Badge key={tag} className="flex h-8 items-center gap-1.5">
                      {tag}
                      <X
                        onClick={() => tagRemoveHandler(tag)}
                        className="z-10 size-4 cursor-pointer"
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </>
          );
        }}
      />
      {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
    </div>
  );
}
