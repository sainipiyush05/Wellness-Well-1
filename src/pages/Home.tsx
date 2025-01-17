import { motion } from "framer-motion";
import {
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaHeartbeat,
  FaBrain,
  FaDna,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              AI-Powered Healthcare
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
          >
            Predict. Prevent.
            <br /> Protect.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Harness the power of artificial intelligence for early disease
            detection and prevention. Get accurate insights about your health in
            minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/disease-selection"
              className="group bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-surface-dark/50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 gradient-text"
          >
            Why Choose MediPredict AI?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FaRobot}
              title="AI-Powered Analysis"
              description="Advanced machine learning algorithms provide accurate disease predictions based on your health data"
              delay={0.2}
            />
            <FeatureCard
              icon={FaShieldAlt}
              title="Secure & Private"
              description="Your health data is protected with enterprise-grade security and encryption"
              delay={0.4}
            />
            <FeatureCard
              icon={FaChartLine}
              title="Detailed Insights"
              description="Get comprehensive health analysis with actionable recommendations for better health"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Disease Types Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 gradient-text"
          >
            Supported Disease Predictions
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <DiseaseCard
              icon={FaHeartbeat}
              title="Heart Disease"
              description="Analyze cardiovascular health indicators to assess heart disease risk"
              delay={0.2}
            />
            <DiseaseCard
              icon={FaDna}
              title="Diabetes"
              description="Evaluate blood sugar levels and other factors for diabetes risk assessment"
              delay={0.4}
            />
            <DiseaseCard
              icon={FaBrain}
              title="Parkinson's Disease"
              description="Analyze voice patterns and movements for early Parkinson's detection"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-surface-dark/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Take Control of Your Health Today
            </h2>
            <p className="text-gray-300 mb-8">
              Early detection is key to better health outcomes. Start your
              health journey with our AI-powered predictions.
            </p>
            <Link
              to="/disease-selection"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Begin Analysis
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-surface-dark p-6 rounded-xl border border-gray-800 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
  >
    <Icon className="w-12 h-12 text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const DiseaseCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group bg-surface-dark p-6 rounded-xl border border-gray-800 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Home;
