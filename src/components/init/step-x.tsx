import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

export function StepOne() {
  const [name, setName] = useState<string>('');

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">이름을 입력해주세요</h1>
      {name === '' ? null : <h3 className="text-lg font-bold">{name} 님</h3>}
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export function StepTwo() {
  const open = useDaumPostcodePopup();
  const [selectedAddress, setSelectedAddress] = useState<string>('');

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

    setSelectedAddress(fullAddress);
  };

  const handleOpen = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">거주 지역을 입력해주세요</h1>
      {selectedAddress === '' ? null : <h3 className="text-lg font-bold">{selectedAddress}</h3>}
      <Button onClick={handleOpen} className="w-full font-semibold">
        {selectedAddress === '' ? '주소 입력하기' : '주소 다시 입력하기'}
      </Button>
    </div>
  );
}

export function StepThree() {
  const [tags, setTags] = useState<string[]>([]);

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
        if (!tags.includes(tagValue as never)) {
          setTags((prevState) => [...prevState, tagValue]);
          tagInput.value = '';
        }
      } else {
        return;
      }
    }
  };

  const tagRemoveHandler = (tag: string) => {
    setTags((prevState) => prevState.filter((t: string) => t !== tag));
  };
  console.log(tags);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">관심사를 입력해주세요</h1>
      <span className="text-xs text-slate-500">(엔터 또는 , 를 입력하시면 입력이 완료됩니다.)</span>
      <Input onKeyDown={(e) => inputKeyDownHandler(e)} />
      {tags.length > 0 ? (
        <div className="flex w-full flex-wrap items-center gap-2">
          {tags.map((tag) => (
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
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-slate-700">추가정보를 입력해주세요</h1>
    </div>
  );
}
