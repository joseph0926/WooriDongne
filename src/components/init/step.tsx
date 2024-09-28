'use client';

import { useState } from 'react';
import { InitStep } from './init-step';
import { Button } from '../ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import {
  profileSchema,
  ProfileType,
  stepOneSchema,
  stepThreeSchema,
  stepTwoSchema,
} from '@/lib/schema/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProfile } from '@/actions/profile.action';
import { StepOne } from './step-one';
import { StepTwo } from './step-two';
import { StepThree } from './step-three';
import { StepFour } from './step-four';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/** Init 컴포넌트 */
export function Init() {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ProfileType>>({});
  const [step, setStep] = useState<number>(1);

  const getSchema = () => {
    switch (step) {
      case 1:
        return stepOneSchema;
      case 2:
        return stepTwoSchema;
      case 3:
        return stepThreeSchema;
      default:
        return profileSchema;
    }
  };

  const methods = useForm<ProfileType>({
    resolver: zodResolver(getSchema()),
    mode: 'onChange',
    defaultValues: formData,
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async (data: Partial<ProfileType>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step < 4) {
      setStep(step + 1);
    } else {
      const data = await createProfile({
        name: formData.name!,
        address: formData.address!,
        tags: formData.tags!,
      });

      if (data && !data.success) {
        toast.error(data.message);
        return;
      }
      if (data && data.success) {
        router.push(
          `/region/${data.data?.regionalGroup.city}/${data.data?.regionalGroup.district}/${data.data?.regionalGroup.neighborhood}`
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex justify-between rounded p-8">
        <InitStep step={1} currentStep={step} />
        <InitStep step={2} currentStep={step} />
        <InitStep step={3} currentStep={step} />
        <InitStep step={4} currentStep={step} />
      </div>
      <div className="px-8 pb-8">
        <div style={{ display: step === 1 ? 'block' : 'none' }}>
          <StepOne />
        </div>
        <div style={{ display: step === 2 ? 'block' : 'none' }}>
          <StepTwo />
        </div>
        <div style={{ display: step === 3 ? 'block' : 'none' }}>
          <StepThree />
        </div>
        <div style={{ display: step === 4 ? 'block' : 'none' }}>
          <StepFour />
        </div>

        <div className="mt-10 flex justify-between">
          <Button
            disabled={step === 1}
            variant="ghost"
            onClick={() => setStep((prevState) => (prevState > 1 ? prevState - 1 : prevState))}
            className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
          >
            뒤로가기
          </Button>
          <Button
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            className={`${
              step > 4 ? 'pointer-events-none opacity-50' : ''
            } bg flex items-center justify-center rounded-full bg-blue-500 px-3.5 py-1.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
          >
            {step === 4 ? (
              isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                '제출하기'
              )
            ) : (
              '다음으로'
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
