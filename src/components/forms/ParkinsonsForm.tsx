import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ParkinsonsFormData {
  fo: number;
  fhi: number;
  flo: number;
  jitter: number;
  shimmer: number;
  nhr: number;
  hnr: number;
  rpde: number;
  dfa: number;
  spread1: number;
  spread2: number;
  d2: number;
}

const schema = yup.object({
  fo: yup
    .number()
    .min(70)
    .max(150)
    .required("Fundamental frequency is required"),
  fhi: yup.number().min(150).max(250).required("Maximum frequency is required"),
  flo: yup.number().min(50).max(150).required("Minimum frequency is required"),
  jitter: yup.number().min(0).max(2).required("Jitter value is required"),
  shimmer: yup.number().min(0).max(10).required("Shimmer value is required"),
  nhr: yup.number().min(0).max(1).required("NHR value is required"),
  hnr: yup.number().min(10).max(30).required("HNR value is required"),
  rpde: yup.number().min(0).max(1).required("RPDE value is required"),
  dfa: yup.number().min(0).max(1).required("DFA value is required"),
  spread1: yup.number().min(0).max(1).required("Spread1 value is required"),
  spread2: yup.number().min(0).max(1).required("Spread2 value is required"),
  d2: yup.number().min(1.5).max(2.5).required("D2 value is required"),
});

interface Props {
  onSubmit: (data: ParkinsonsFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const ParkinsonsForm = ({ onSubmit, onClose, isLoading = false }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ParkinsonsFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fo: 110,
      fhi: 200,
      flo: 100,
      jitter: 0.5,
      shimmer: 3,
      nhr: 0.1,
      hnr: 20,
      rpde: 0.4,
      dfa: 0.8,
      spread1: 0.5,
      spread2: 0.5,
      d2: 2,
    },
  });

  const formFields = [
    {
      name: "fo",
      label: "Fundamental Frequency (Fo)",
      min: 70,
      max: 150,
      step: 0.1,
      unit: "Hz",
      description: "Mean fundamental frequency of the voice",
      healthy: "100-120 Hz",
    },
    {
      name: "fhi",
      label: "Maximum Frequency (Fhi)",
      min: 150,
      max: 250,
      step: 0.1,
      unit: "Hz",
      description: "Maximum frequency reached during speech",
      healthy: "180-230 Hz",
    },
    {
      name: "flo",
      label: "Minimum Frequency (Flo)",
      min: 50,
      max: 150,
      step: 0.1,
      unit: "Hz",
      description: "Minimum frequency during speech",
      healthy: "90-120 Hz",
    },
    {
      name: "jitter",
      label: "Jitter",
      min: 0,
      max: 2,
      step: 0.01,
      unit: "%",
      description: "Variation in pitch from cycle to cycle",
      healthy: "< 1%",
    },
    {
      name: "shimmer",
      label: "Shimmer",
      min: 0,
      max: 10,
      step: 0.1,
      unit: "dB",
      description: "Variation in voice amplitude",
      healthy: "< 3 dB",
    },
    {
      name: "nhr",
      label: "Noise-to-Harmonics Ratio",
      min: 0,
      max: 1,
      step: 0.01,
      unit: "",
      description: "Ratio of noise to harmonics in voice",
      healthy: "< 0.2",
    },
    {
      name: "hnr",
      label: "Harmonics-to-Noise Ratio",
      min: 10,
      max: 30,
      step: 0.1,
      unit: "dB",
      description: "Ratio of harmonics to noise",
      healthy: "20-30 dB",
    },
    {
      name: "rpde",
      label: "RPDE",
      min: 0,
      max: 1,
      step: 0.01,
      unit: "",
      description: "Recurrence Period Density Entropy",
      healthy: "< 0.5",
    },
    {
      name: "dfa",
      label: "DFA",
      min: 0,
      max: 1,
      step: 0.01,
      unit: "",
      description: "Detrended Fluctuation Analysis",
      healthy: "> 0.75",
    },
    {
      name: "spread1",
      label: "Spread1",
      min: 0,
      max: 1,
      step: 0.01,
      unit: "",
      description: "Spread of periodic energy",
      healthy: "Close to 1",
    },
    {
      name: "spread2",
      label: "Spread2",
      min: 0,
      max: 1,
      step: 0.01,
      unit: "",
      description: "Second spread of periodic energy",
      healthy: "Close to 1",
    },
    {
      name: "d2",
      label: "D2",
      min: 1.5,
      max: 2.5,
      step: 0.01,
      unit: "",
      description: "Correlation Dimension",
      healthy: "Close to 2",
    },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-surface-dark rounded-xl p-6 shadow-xl max-w-4xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
        Parkinson's Disease Voice Analysis
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">
                  {field.label}
                </label>
                <span className="text-sm text-primary">
                  {watch(field.name)}
                  {field.unit}
                </span>
              </div>

              <div className="relative">
                <input
                  {...register(field.name)}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="w-full h-2 bg-surface-darker rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {field.min}
                    {field.unit}
                  </span>
                  <span>
                    {field.max}
                    {field.unit}
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <p className="text-gray-400">{field.description}</p>
                <p className="text-primary">Healthy range: {field.healthy}</p>
              </div>

              {errors[field.name] && (
                <p className="text-red-500 text-xs">
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
            {isLoading ? "Analyzing..." : "Analyze Voice Data"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ParkinsonsForm;
