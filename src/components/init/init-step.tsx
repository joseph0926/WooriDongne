import { motion, AnimatePresence } from 'framer-motion';
import {
  backgroundTransition,
  backgroundVariants,
  checkIconTransition,
  checkIconVariants,
  rippleTransition,
  rippleVariants,
} from '@/constants/init';

type InitStepProps = {
  /** 해당 컴포넌트의 step */
  step: number;
  /** 현재 step */
  currentStep: number;
};

/** 햔재 step 컴포넌트 */
export function InitStep({ step, currentStep }: InitStepProps) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  return (
    <motion.div animate={status} initial={status} className="relative">
      <motion.div
        transition={rippleTransition}
        variants={rippleVariants}
        className="absolute inset-0 rounded-full"
      />

      <motion.div
        variants={backgroundVariants}
        transition={backgroundTransition}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-400 bg-white font-semibold text-slate-500"
      >
        <motion.div layout className="relative flex items-center justify-center">
          <AnimatePresence>
            {status === 'complete' ? (
              <CheckIcon />
            ) : (
              <motion.span
                key="step"
                animate={{ opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute"
              >
                {step}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** 체크 아이콘 컴포넌트 */
function CheckIcon() {
  return (
    <motion.svg
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </motion.svg>
  );
}
