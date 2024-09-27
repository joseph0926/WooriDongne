import { create } from 'zustand';

type InitStepState = {
  name: string;
  address: string;
  tags: string[];
  error: { message: string; step: number } | null;
  setName: (name: string) => void;
  setAddress: (name: string) => void;
  setTags: (tags: string[]) => void;
  setError: (error: { message: string; step: number } | null) => void;
};

export const useInitStep = create<InitStepState>((set) => ({
  name: '',
  address: '',
  tags: [],
  error: null,
  setName: (name) => set({ name }),
  setAddress: (address) => set({ address }),
  setTags: (tags) => set({ tags }),
  setError: (error) => set({ error }),
}));
