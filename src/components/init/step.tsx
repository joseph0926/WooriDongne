'use client';

import { useState } from 'react';
import { InitStep } from './init-step';
import { Button } from '../ui/button';
import { StepFour, StepOne, StepThree, StepTwo } from './step-x';
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

/** Init 컴포넌트 */
export function Init() {
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
    formState: { isValid },
  } = methods;

  const onSubmit = (data: Partial<ProfileType>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step < 4) {
      setStep(step + 1);
    } else {
      createProfile({
        name: formData.name!,
        address: formData.address!,
        tags: formData.tags!,
      });
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
            {step === 4 ? '제출하기' : '다음으로'}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
