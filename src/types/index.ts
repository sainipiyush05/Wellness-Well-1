import { IconType } from "react-icons";

export interface Disease {
  id: string;
  title: string;
  description: string;
  icon: any;
}

export interface PredictionResult {
  prediction: number;
  probability: number;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  step?: string;
  min?: string;
  max?: string;
}
