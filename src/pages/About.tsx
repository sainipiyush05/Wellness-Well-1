import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Piyush Saini",
    role: "ML Engineer & Backend Developer",
    image: "/images/piyush.jpg",
    github: "https://github.com/sainipiyush05",
    linkedin: "https://www.linkedin.com/in/piyush-saini-8bb40827a/",
    description:
      "Specializing in machine learning algorithms and backend architecture, leading our technical innovation in disease prediction systems.",
  },
  {
    name: "Soubhik Sadhu",
    role: "UI/UX Designer & App Developer",
    image: "/images/soubhik.jpg",
    github: "https://www.github.com/SoubhLance",
    linkedin: "https://www.linkedin.com/in/soubhik-sadhu-0427b4288",
    description:
      "Creating intuitive and accessible user interfaces while ensuring seamless user experiences across all platforms.",
  },
  {
    name: "Chandra Bhayal",
    role: "Web Developer",
    image: "/images/sumedha.jpg",
    github: "https://github.com/Brighteyekid",
    linkedin: "https://www.linkedin.com",
    description:
      "Expert in modern web technologies, focusing on creating robust and scalable web applications for healthcare solutions.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We are a dedicated group of professionals committed to
            revolutionizing healthcare through innovative technology and machine
            learning solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-surface-dark rounded-xl p-6 border border-gray-800 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-gray-400 text-center mb-4">
                  {member.description}
                </p>
                <div className="flex space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300">
            At MediPredict AI, we're committed to transforming healthcare
            through artificial intelligence. Our mission is to provide
            accessible, accurate, and early disease prediction to improve health
            outcomes worldwide.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
