import { create } from 'zustand';

export interface Model3D {
  id: string;
  name: string;
  url: string;
  description?: string;
  createdAt: Date;
}

interface ModelState {
  models: Model3D[];
  addModel: (model: Model3D) => void;
  removeModel: (id: string) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  models: [],
  addModel: (model) => set((state) => ({ 
    models: [...state.models, model] 
  })),
  removeModel: (id) => set((state) => ({ 
    models: state.models.filter(model => model.id !== id) 
  })),
}));