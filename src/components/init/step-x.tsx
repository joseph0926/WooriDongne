import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { useInitStep } from '@/hooks/use-init-step';
import { cn } from '@/lib/utils';

export function StepOne() {
  const { name, setName } = useInitStep();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">이름을 입력해주세요</h1>
      {name === '' ? null : <h3 className="text-lg font-bold">{name} 님</h3>}
      <Input value={name} onChange={handleInput} />
    </div>
  );
}

export function StepTwo() {
  const open = useDaumPostcodePopup();
  const { address, setAddress } = useInitStep();

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

    setAddress(fullAddress);
  };

  const handleOpen = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">거주 지역을 입력해주세요</h1>
      {address === '' ? null : <h3 className="text-lg font-bold">{address}</h3>}
      <Button onClick={handleOpen} className="w-full font-semibold">
        {address === '' ? '주소 입력하기' : '주소 다시 입력하기'}
      </Button>
    </div>
  );
}

export function StepThree() {
  const { setTags } = useInitStep();

  const [localTags, setLocalTags] = useState<string[]>([]);

  const inputKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== '') {
        if (tagValue.length > 15) {
          // TODO: Error 처리
          return;
        }
        if (!localTags.includes(tagValue as never)) {
          setLocalTags((prevState) => [...prevState, tagValue]);
          tagInput.value = '';
        }
      } else {
        return;
      }
    }
  };

  const tagRemoveHandler = (tag: string) => {
    setLocalTags((prevState) => prevState.filter((t: string) => t !== tag));
  };

  useEffect(() => {
    setTags(localTags);
  }, [localTags]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">관심사를 입력해주세요</h1>
      <span className="text-xs text-slate-500">(엔터 또는 , 를 입력하시면 입력이 완료됩니다.)</span>
      <Input onKeyDown={(e) => inputKeyDownHandler(e)} />
      {localTags.length > 0 ? (
        <div className="flex w-full flex-wrap items-center gap-2">
          {localTags.map((tag) => (
            <Badge key={tag} className="flex h-8 items-center gap-1.5">
              {tag}
              <X onClick={() => tagRemoveHandler(tag)} className="z-10 size-4 cursor-pointer" />
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function StepFour() {
  const { name, address, tags, setError } = useInitStep();

  useEffect(() => {
    if (name === '' || address === '' || tags.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [name, address, tags]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">정보를 확인해주세요</h1>
      <div className="flex flex-col gap-3 text-lg text-slate-700">
        <div>
          이름:{' '}
          <span
            className={cn(
              'font-semibold text-black',
              name === '' ? 'text-destructive' : 'text-black'
            )}
          >
            {name === '' ? '이름을 입력해주세요' : name}
          </span>
        </div>
        <div>
          주소:{' '}
          <span
            className={cn(
              'font-semibold text-black',
              address === '' ? 'text-destructive' : 'text-black'
            )}
          >
            {address === '' ? '주소를 입력해주세요' : address}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          관심사:
          {tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
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
