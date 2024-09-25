import { create } from 'zustand';

type InitStepState = {
  name: string;
  address: string;
  tags: string[];
  error: boolean;
  setName: (name: string) => void;
  setAddress: (name: string) => void;
  setTags: (tags: string[]) => void;
  setError: (error: boolean) => void;
};

export const useInitStep = create<InitStepState>((set) => ({
  name: '',
  address: '',
  tags: [],
  error: false,
  setName: (name) => set({ name }),
  setAddress: (address) => set({ address }),
  setTags: (tags) => set({ tags }),
  setError: (error) => set({ error }),
}));
