'use client';

import { useState } from 'react';
import { InitStep } from './init-step';
import { Button } from '../ui/button';
import { StepFour, StepOne, StepThree, StepTwo } from './step-x';
import { useInitStep } from '@/hooks/use-init-step';

/** Init 컴포넌트 */
export function Init() {
  const { error } = useInitStep();

  const [step, setStep] = useState<number>(1);

  return (
    <>
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
            variant="ghost"
            onClick={() => setStep((prevState) => (prevState < 2 ? prevState : prevState - 1))}
            className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
          >
            뒤로가기
          </Button>
          <Button
            disabled={step === 4 && error}
            onClick={() => setStep((prevState) => (prevState > 4 ? prevState : prevState + 1))}
            className={`${
              step > 4 ? 'pointer-events-none opacity-50' : ''
            } bg flex items-center justify-center rounded-full bg-blue-500 px-3.5 py-1.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
          >
            {step === 4 ? '제출하기' : '다음으로'}
          </Button>
        </div>
      </div>
    </>
  );
}
