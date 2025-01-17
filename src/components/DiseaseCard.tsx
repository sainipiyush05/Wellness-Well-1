import { useState } from "react";
import { motion } from "framer-motion";
import { Disease } from "../types";
import PredictionForm from "./PredictionForm";

interface DiseaseCardProps {
  disease: Disease;
  index: number;
}

const DiseaseCard = ({ disease, index }: DiseaseCardProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-gradient-to-br from-surface-dark to-surface-darker p-6 rounded-2xl border border-gray-800 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
            <disease.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{disease.title}</h3>
          <p className="text-gray-400 text-center mb-6">
            {disease.description}
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-primary to-primary-dark px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Begin Analysis
          </button>
        </div>
      </motion.div>

      <PredictionForm
        disease={disease}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
};

export default DiseaseCard;
