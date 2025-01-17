import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface DiabetesFormData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

const schema = yup.object({
  pregnancies: yup
    .number()
    .min(0, "Must be at least 0")
    .max(20, "Must be at most 20")
    .required("Required"),
  glucose: yup
    .number()
    .min(0, "Must be at least 0")
    .max(200, "Must be at most 200")
    .required("Required"),
  bloodPressure: yup
    .number()
    .min(40, "Must be at least 40")
    .max(180, "Must be at most 180")
    .required("Required"),
  skinThickness: yup
    .number()
    .min(10, "Must be at least 10")
    .max(100, "Must be at most 100")
    .required("Required"),
  insulin: yup
    .number()
    .min(0, "Must be at least 0")
    .max(900, "Must be at most 900")
    .required("Required"),
  bmi: yup
    .number()
    .min(10, "Must be at least 10")
    .max(70, "Must be at most 70")
    .required("Required"),
  diabetesPedigree: yup
    .number()
    .min(0, "Must be at least 0")
    .max(2.5, "Must be at most 2.5")
    .required("Required"),
  age: yup
    .number()
    .min(21, "Must be at least 21")
    .max(90, "Must be at most 90")
    .required("Required"),
});

interface Props {
  onSubmit: (data: DiabetesFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const DiabetesForm = ({ onSubmit, onClose, isLoading = false }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DiabetesFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      pregnancies: 0,
      glucose: 100,
      bloodPressure: 80,
      skinThickness: 20,
      insulin: 100,
      bmi: 25,
      diabetesPedigree: 0.5,
      age: 30,
    },
  });

  const formFields = [
    {
      name: "pregnancies",
      label: "Number of Pregnancies",
      type: "number",
      min: 0,
      max: 20,
      step: 1,
      description: "Enter the number of pregnancies (0-20)",
    },
    {
      name: "glucose",
      label: "Glucose Level",
      type: "range",
      min: 0,
      max: 200,
      step: 1,
      description: "Plasma glucose concentration after fasting (0-200 mg/dL)",
    },
    {
      name: "bloodPressure",
      label: "Blood Pressure",
      type: "range",
      min: 40,
      max: 180,
      step: 1,
      description: "Diastolic blood pressure (40-180 mm Hg)",
    },
    {
      name: "skinThickness",
      label: "Skin Thickness",
      type: "range",
      min: 10,
      max: 100,
      step: 1,
      description: "Triceps skinfold thickness (10-100 mm)",
    },
    {
      name: "insulin",
      label: "Insulin Level",
      type: "range",
      min: 0,
      max: 900,
      step: 1,
      description: "Serum insulin level (0-900 IU/mL)",
    },
    {
      name: "bmi",
      label: "BMI",
      type: "range",
      min: 10,
      max: 70,
      step: 0.1,
      description: "Body mass index (10-70)",
    },
    {
      name: "diabetesPedigree",
      label: "Diabetes Pedigree Function",
      type: "range",
      min: 0,
      max: 2.5,
      step: 0.01,
      description: "Diabetes pedigree function (0-2.5)",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      min: 21,
      max: 90,
      step: 1,
      description: "Age in years (21-90)",
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
        Diabetes Risk Assessment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {formFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <span className="text-sm text-primary">{watch(field.name)}</span>
            </div>

            <div className="relative">
              <input
                {...register(field.name)}
                type={field.type}
                min={field.min}
                max={field.max}
                step={field.step}
                className={`
                  w-full bg-surface-darker rounded-lg
                  ${
                    field.type === "range"
                      ? "h-2 appearance-none cursor-pointer accent-primary"
                      : "px-4 py-2 border border-gray-700"
                  }
                  focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                `}
              />
              {field.type === "range" && (
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{field.min}</span>
                  <span>{field.max}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400">{field.description}</p>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

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
            {isLoading ? "Analyzing..." : "Analyze Results"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DiabetesForm;
