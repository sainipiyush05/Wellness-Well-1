import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaInfoCircle } from "react-icons/fa";

interface CancerFormData {
  radiusMean: number;
  textureMean: number;
  perimeterMean: number;
  areaMean: number;
  smoothnessMean: number;
  compactnessMean: number;
  concavityMean: number;
  concavePointsMean: number;
  symmetryMean: number;
  fractalDimensionMean: number;
  worstRadius: number;
  worstTexture: number;
}

const schema = yup.object({
  radiusMean: yup.number().min(5).max(30).required(),
  textureMean: yup.number().min(5).max(40).required(),
  perimeterMean: yup.number().min(40).max(200).required(),
  areaMean: yup.number().min(100).max(2500).required(),
  smoothnessMean: yup.number().min(0.05).max(0.2).required(),
  compactnessMean: yup.number().min(0.02).max(0.4).required(),
  concavityMean: yup.number().min(0).max(0.5).required(),
  concavePointsMean: yup.number().min(0).max(0.2).required(),
  symmetryMean: yup.number().min(0.1).max(0.4).required(),
  fractalDimensionMean: yup.number().min(0.05).max(0.1).required(),
  worstRadius: yup.number().min(10).max(40).required(),
  worstTexture: yup.number().min(10).max(50).required(),
});

interface Props {
  onSubmit: (data: CancerFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const CancerForm = ({ onSubmit, onClose, isLoading = false }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CancerFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      radiusMean: 15,
      textureMean: 20,
      perimeterMean: 100,
      areaMean: 500,
      smoothnessMean: 0.1,
      compactnessMean: 0.15,
      concavityMean: 0.2,
      concavePointsMean: 0.1,
      symmetryMean: 0.2,
      fractalDimensionMean: 0.07,
      worstRadius: 20,
      worstTexture: 25,
    },
  });

  const formFields = [
    {
      name: "radiusMean",
      label: "Tumor Size (Average)",
      min: 5,
      max: 30,
      step: 0.1,
      unit: "mm",
      description:
        "Average distance from the center of the tumor to its outer edge. Larger values may indicate a bigger tumor.",
    },
    {
      name: "textureMean",
      label: "Surface Texture (Average)",
      min: 5,
      max: 40,
      step: 0.1,
      unit: "",
      description: "How smooth or rough the tumor surface appears on the scan.",
    },
    {
      name: "perimeterMean",
      label: "Tumor Perimeter (Average)",
      min: 40,
      max: 200,
      step: 0.1,
      unit: "mm",
      description:
        "The average length around the tumor's edge. Larger tumors will have a longer perimeter.",
    },
    {
      name: "areaMean",
      label: "Tumor Area (Average)",
      min: 100,
      max: 2500,
      step: 1,
      unit: "mm²",
      description:
        "The average surface area of the tumor. Larger areas may indicate more significant tumors.",
    },
    {
      name: "smoothnessMean",
      label: "Tumor Edge Smoothness (Average)",
      min: 0.05,
      max: 0.2,
      step: 0.001,
      unit: "",
      description:
        "Lower values mean smoother edges, and higher values indicate irregular edges.",
    },
    {
      name: "compactnessMean",
      label: "Tumor Shape Compactness (Average)",
      min: 0.02,
      max: 0.4,
      step: 0.001,
      unit: "",
      description:
        "Higher values indicate less compact (more spread out) shapes.",
    },
    {
      name: "concavityMean",
      label: "Tumor Concavity (Average)",
      min: 0,
      max: 0.5,
      step: 0.001,
      unit: "",
      description:
        "Measures how much of the tumor edge curves inward. More inward curves can indicate irregular shapes.",
    },
    {
      name: "concavePointsMean",
      label: "Number of Indented Points (Average)",
      min: 0,
      max: 0.2,
      step: 0.001,
      unit: "",
      description:
        "The number of inward dips along the tumor edge. More dips can indicate a less regular shape.",
    },
    {
      name: "symmetryMean",
      label: "Tumor Symmetry (Average)",
      min: 0.1,
      max: 0.4,
      step: 0.001,
      unit: "",
      description:
        "How symmetrical the tumor shape is. Lower values indicate more asymmetry.",
    },
    {
      name: "fractalDimensionMean",
      label: "Tumor Edge Complexity (Average)",
      min: 0.05,
      max: 0.1,
      step: 0.001,
      unit: "",
      description:
        "Measures the complexity of the tumor boundary. Higher values indicate a more irregular boundary.",
    },
    {
      name: "worstRadius",
      label: "Largest Tumor Size",
      min: 10,
      max: 40,
      step: 0.1,
      unit: "mm",
      description:
        "The largest distance from the center to the tumor's edge. Larger values can indicate more severe cases.",
    },
    {
      name: "worstTexture",
      label: "Roughest Tumor Surface",
      min: 10,
      max: 50,
      step: 0.1,
      unit: "",
      description:
        "The roughest part of the tumor surface as seen in the scan. Higher values indicate more roughness.",
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
        Breast Cancer Risk Assessment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  {field.label}
                  <div className="group relative">
                    <FaInfoCircle className="text-gray-400 hover:text-primary cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-surface-darker rounded-lg shadow-lg text-xs text-gray-300 z-50">
                      {field.description}
                    </div>
                  </div>
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
            {isLoading ? "Analyzing..." : "Analyze Results"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CancerForm;
