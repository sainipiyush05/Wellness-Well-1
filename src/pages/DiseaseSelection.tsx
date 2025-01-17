import { motion } from "framer-motion";
import { FaDna, FaHeartbeat, FaBrain, FaChartLine } from "react-icons/fa";
import DiseaseCard from "../components/DiseaseCard";
import { Disease } from "../types";

const diseases: Disease[] = [
  {
    id: "cancer",
    title: "Cancer Detection",
    description:
      "Analyze cellular characteristics to assess cancer risk using advanced machine learning.",
    icon: FaDna,
  },
  {
    id: "heart",
    title: "Heart Disease",
    description:
      "Evaluate cardiovascular health indicators to predict potential heart conditions.",
    icon: FaHeartbeat,
  },
  {
    id: "parkinsons",
    title: "Parkinson's Disease",
    description:
      "Assess neurological indicators to detect early signs of Parkinson's disease.",
    icon: FaBrain,
  },
  {
    id: "diabetes",
    title: "Diabetes Risk",
    description:
      "Analyze metabolic factors to determine diabetes risk and provide preventive insights.",
    icon: FaChartLine,
  },
];

const DiseaseSelection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
          Disease Prediction
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Select a condition to analyze your health indicators and receive
          personalized insights.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {diseases.map((disease, index) => (
          <DiseaseCard key={disease.id} disease={disease} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DiseaseSelection;
