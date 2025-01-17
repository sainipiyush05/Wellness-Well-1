import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface HeartDiseaseFormData {
  age: number;
  sex: number;
  chestPainType: number;
  restingBP: number;
  cholesterol: number;
  fastingBS: number;
  restingECG: number;
  maxHR: number;
  exerciseAngina: number;
  oldpeak: number;
  stSlope: number;
  majorVessels: number;
  thalassemia: number;
}

const schema = yup.object({
  age: yup.number().min(29).max(77).required("Age is required"),
  sex: yup.number().oneOf([0, 1], "Please select gender").required(),
  chestPainType: yup
    .number()
    .min(0)
    .max(3)
    .required("Chest pain type is required"),
  restingBP: yup
    .number()
    .min(90)
    .max(200)
    .required("Resting blood pressure is required"),
  cholesterol: yup
    .number()
    .min(100)
    .max(600)
    .required("Cholesterol level is required"),
  fastingBS: yup
    .number()
    .oneOf([0, 1], "Please select fasting blood sugar status")
    .required(),
  restingECG: yup
    .number()
    .min(0)
    .max(2)
    .required("Resting ECG result is required"),
  maxHR: yup
    .number()
    .min(60)
    .max(220)
    .required("Maximum heart rate is required"),
  exerciseAngina: yup
    .number()
    .oneOf([0, 1], "Please select exercise angina status")
    .required(),
  oldpeak: yup
    .number()
    .min(0)
    .max(6.2)
    .required("ST depression value is required"),
  stSlope: yup.number().min(0).max(2).required("ST slope is required"),
  majorVessels: yup
    .number()
    .min(0)
    .max(3)
    .required("Number of vessels is required"),
  thalassemia: yup
    .number()
    .oneOf([1, 2, 3], "Please select thalassemia type")
    .required(),
});

interface Props {
  onSubmit: (data: HeartDiseaseFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const HeartDiseaseForm = ({ onSubmit, onClose, isLoading = false }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeartDiseaseFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      age: 45,
      sex: 0,
      chestPainType: 0,
      restingBP: 120,
      cholesterol: 200,
      fastingBS: 0,
      restingECG: 0,
      maxHR: 150,
      exerciseAngina: 0,
      oldpeak: 0,
      stSlope: 1,
      majorVessels: 0,
      thalassemia: 1,
    },
  });

  const dropdownFields = [
    {
      name: "sex",
      label: "Gender",
      options: [
        { value: 0, label: "Female" },
        { value: 1, label: "Male" },
      ],
    },
    {
      name: "chestPainType",
      label: "Chest Pain Type",
      options: [
        { value: 0, label: "Typical Angina" },
        { value: 1, label: "Atypical Angina" },
        { value: 2, label: "Non-anginal Pain" },
        { value: 3, label: "Asymptomatic" },
      ],
    },
    {
      name: "fastingBS",
      label: "Fasting Blood Sugar",
      options: [
        { value: 0, label: "≤ 120 mg/dL" },
        { value: 1, label: "> 120 mg/dL" },
      ],
    },
    {
      name: "restingECG",
      label: "Resting ECG Results",
      options: [
        { value: 0, label: "Normal" },
        { value: 1, label: "ST-T Wave Abnormality" },
        { value: 2, label: "Left Ventricular Hypertrophy" },
      ],
    },
    {
      name: "exerciseAngina",
      label: "Exercise Induced Angina",
      options: [
        { value: 0, label: "No" },
        { value: 1, label: "Yes" },
      ],
    },
    {
      name: "stSlope",
      label: "ST Slope",
      options: [
        { value: 0, label: "Upward" },
        { value: 1, label: "Flat" },
        { value: 2, label: "Downward" },
      ],
    },
    {
      name: "majorVessels",
      label: "Major Vessels",
      options: [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
      ],
    },
    {
      name: "thalassemia",
      label: "Thalassemia",
      options: [
        { value: 1, label: "Normal" },
        { value: 2, label: "Fixed Defect" },
        { value: 3, label: "Reversible Defect" },
      ],
    },
  ] as const;

  const numberFields = [
    {
      name: "age",
      label: "Age",
      min: 29,
      max: 77,
      step: 1,
      unit: "years",
    },
    {
      name: "restingBP",
      label: "Resting Blood Pressure",
      min: 90,
      max: 200,
      step: 1,
      unit: "mm Hg",
    },
    {
      name: "cholesterol",
      label: "Serum Cholesterol",
      min: 100,
      max: 600,
      step: 1,
      unit: "mg/dL",
    },
    {
      name: "maxHR",
      label: "Maximum Heart Rate",
      min: 60,
      max: 220,
      step: 1,
      unit: "bpm",
    },
    {
      name: "oldpeak",
      label: "ST Depression",
      min: 0,
      max: 6.2,
      step: 0.1,
      unit: "mm",
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-surface-dark rounded-xl p-6 shadow-xl max-w-2xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
        Heart Disease Risk Assessment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Number Input Fields */}
          {numberFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <div className="relative">
                <input
                  {...register(field.name)}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="w-full bg-surface-darker rounded-lg px-4 py-2 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <span className="absolute right-3 top-2 text-gray-400 text-sm">
                  {field.unit}
                </span>
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Dropdown Fields */}
          {dropdownFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <select
                {...register(field.name)}
                className="w-full bg-surface-darker rounded-lg px-4 py-2 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-end mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${
              isLoading 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-primary hover:bg-primary-dark"
            } transition-colors`}
          >
            {isLoading ? "Analyzing..." : "Analyze Risk"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default HeartDiseaseForm;
