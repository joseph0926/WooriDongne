import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { ProfileStepType } from '@/lib/schema/profile.schema';

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

export function StepTwo() {
  const open = useDaumPostcodePopup();
  const { setValue } = useFormContext<ProfileStepType>();

  const [address, setAddress] = useState<string>('');

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setValue('address', fullAddress);
    setAddress(fullAddress);
  };

  const handleOpen = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex h-32 flex-col gap-4">
      <h1 className="text-xl text-slate-700">거주 지역을 입력해주세요</h1>
      {address === '' ? null : <h3 className="text-lg font-bold">{address}</h3>}
      <Button onClick={handleOpen} className="w-full font-semibold">
        {address === '' ? '주소 입력하기' : '주소 다시 입력하기'}
      </Button>
    </div>
  );
}

export function StepThree() {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ProfileStepType>();
  const [inputValue, setInputValue] = useState('');

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
                console.log(inputValue);
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

export function StepFour() {
  const { getValues } = useFormContext();

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
            {address || '주소를 입력해주세요'}
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
