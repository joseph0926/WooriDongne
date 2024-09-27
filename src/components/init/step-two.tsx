import { ProfileStepType } from '@/lib/schema/profile.schema';
import { useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export function StepTwo() {
  const open = useDaumPostcodePopup();
  const { setValue } = useFormContext<ProfileStepType>();

  const [address, setAddress] = useState<string>('');

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    const address = {
      address: data.address,
      zonecode: data.zonecode,
      sido: data.sido,
      sigungu: data.sigungu,
      bname: data.bname,
    };

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setValue('address', address);
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
