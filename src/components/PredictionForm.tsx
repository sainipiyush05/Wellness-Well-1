import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DiabetesForm,
  HeartDiseaseForm,
  ParkinsonsForm,
  CancerForm,
} from "./forms";
import { Disease } from "../types";
import { predictDisease } from "../services/predictions";

interface PredictionResult {
  prediction: number;
  probability: number;
  message: string;
}

interface PredictionFormProps {
  disease: Disease;
  isOpen: boolean;
  onClose: () => void;
}

const PredictionForm = ({ disease, isOpen, onClose }: PredictionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const prediction = await predictDisease(disease.id, data);
      setResult(prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ResultDisplay = ({
    result,
    disease,
  }: {
    result: PredictionResult;
    disease: Disease;
  }) => {
    const isPositive = result.prediction === 1;
    const probability = (result.probability * 100).toFixed(1);

    const getResultColor = (prob: number) => {
      if (prob > 75) return "text-red-400";
      if (prob > 50) return "text-orange-400";
      if (prob > 25) return "text-yellow-400";
      return "text-green-400";
    };

    const getBackgroundColor = (prob: number) => {
      if (prob > 75) return "bg-red-500/10";
      if (prob > 50) return "bg-orange-500/10";
      if (prob > 25) return "bg-yellow-500/10";
      return "bg-green-500/10";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-dark rounded-xl p-6 shadow-xl max-w-md w-full mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-center gradient-text">
          {disease.title} Analysis Results
        </h2>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${getBackgroundColor(
              parseFloat(probability)
            )}`}
          >
            <h3
              className={`text-xl font-semibold ${getResultColor(
                parseFloat(probability)
              )}`}
            >
              {result.message}
            </h3>
            <p className="text-gray-400 mt-2">Confidence: {probability}%</p>
          </div>

          <div className="bg-surface-darker p-4 rounded-lg">
            <p className="text-gray-300">
              {isPositive
                ? "We strongly recommend consulting with a healthcare professional for a thorough evaluation."
                : "While results suggest lower risk, regular medical check-ups are still important for preventive care."}
            </p>
          </div>

          <div className="text-sm text-gray-400 mt-4">
            <p>
              Note: This analysis is for informational purposes only and should
              not be considered as medical advice.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setResult(null)}
            className="w-full px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-colors"
          >
            New Analysis
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {result ? (
              <ResultDisplay result={result} disease={disease} />
            ) : (
              <>
                {disease.id === "diabetes" && (
                  <DiabetesForm
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isLoading={isLoading}
                  />
                )}
                {disease.id === "heart" && (
                  <HeartDiseaseForm
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isLoading={isLoading}
                  />
                )}
                {disease.id === "parkinsons" && (
                  <ParkinsonsForm
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isLoading={isLoading}
                  />
                )}
                {disease.id === "cancer" && (
                  <CancerForm
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isLoading={isLoading}
                  />
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PredictionForm;
