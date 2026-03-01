import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blueRidgeMountain from "../assets/BlueMountainRidge.png";
import dunkinDonutsImg from "../assets/DunkinDonuts.png";
import greaseMonkeyImg from "../assets/GreaseMonkey.png";
import foodLionImg from "../assets/foodlionphoto.png";
import foodLionImg1 from "../assets/foodlionphoto1.png";
import yugenSushi from "../assets/Yugen_Sushi.png";
import yugenSushi2 from "../assets/YugenSushi2.png";
import yugenSushi3 from "../assets/Photo3.jpg";

interface Project {
  title: string;
  description: string;
  image: ImageMetadata;
  tags: string[];
  duration?: string;
}

const projects: Project[] = [
  {
    title: "Blue Ridge Mountain",
    description:
      "Complete electrical installation for multi-family community featuring two recreation centers, 18 street lights poles and a swimming pool - full wiring from the ground up with focus on safety, efficiency, and code compliance.",
    image: blueRidgeMountain,
    tags: ["Community", "Code Compliance", "Establishment"],
    duration: "3 weeks",
  },
  {
    title: "Restaurant Renovation",
    description:
      "Restaurant renovation with main branch circuit wiring and electrical upgrade to support new equipment layouts, lighting, and code compliance. Work completed to meet franchise standards.",
    image: dunkinDonutsImg,
    tags: ["Electrical Upgrade", "Main Branch Circuit", "Interior Wiring"],
    duration: "5 weeks",
  },
  {
    title: "Retail Location",
    description:
      "Full electrical up-fit for a Food Lion retail location, including service rework, lighting, and storefront systems as part of a complete interior renovation to meet corporate standards.",
    image: foodLionImg,
    tags: ["Lighting Installation", "Electrical Remodel", "Retail Construction"],
    duration: "3 months",
  },
  {
    title: "Retail Location",
    description:
      "Full electrical up-fit for a Food Lion retail location, including service rework, lighting, and storefront systems as part of a complete interior renovation to meet corporate standards.",
    image: foodLionImg1,
    tags: ["Lighting Installation", "Electrical Remodel", "Retail Construction"],
    duration: "3 months",
  },
  {
    title: "Grease Monkey Location",
    description:
      "Completed underground electrical raceway and trenching. Scope included conduit layout for power and service equipment, working closely with utility crews to ensure clean, code-compliant installation before slab pour.",
    image: greaseMonkeyImg,
    tags: ["Utility Prep", "Electrical Trenching", "Ground Work"],
    duration: "3 months",
  },
  {
    title: "Yugen Sushi",
    description:
      "Custom installation of suspended LED ring fixtures including ceiling support and fixture alignment.",
    image: yugenSushi,
    tags: ["LED Installation", "Architectural Lighting", "New Construction", "Custom Designed Light Fixture"],
  },
  {
    title: "Yugen Sushi",
    description:
      "Architectural ceiling design with integrated LED accent fixtures. Seamless integration was required to ensure balanced illumination.",
    image: yugenSushi2,
    tags: ["Accent Lighting", "Modern Commercial Interior", "Commercial Wiring"],
  },
  {
    title: "Yugen Sushi",
    description:
      "Coordinated with the local utility company and installed per municipality requirements to ensure efficient install of raceway system.",
    image: yugenSushi3,
    tags: ["Panel Installation", "Facility Upgrade", "Power Distribution"],
  },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const goToIndex = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const prevProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextProject, 15000);
    return () => clearInterval(interval);
  }, [isHovered, nextProject]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const current = projects[currentIndex];

  return (
    <section
      id="projects"
      className="relative min-h-screen flex justify-center items-center bg-gray-950 py-10 overflow-hidden scroll-mt-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preload images */}
      <div className="hidden">
        {projects.map((project, index) => (
          <img key={index} src={project.image.src} alt="" />
        ))}
      </div>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%)] bg-[length:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6">
              <span className="text-yellow-400 font-medium">Our Portfolio</span>
            </div>

            <h2 className="text-5xl font-extrabold mb-6 text-center leading-tight">
              <span className="bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                Featured Projects
              </span>
              <span className="block text-white mt-2">That Showcase Our Expertise</span>
            </h2>

            <div className="h-1 w-20 bg-linear-to-r from-yellow-400 to-yellow-600 rounded mb-6" />

            <p className="text-xl leading-relaxed text-gray-300 text-center max-w-xl">
              Explore our recent electrical projects that demonstrate our commitment to quality, safety, and cutting-edge solutions.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 shadow-2xl shadow-yellow-600/10">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              {/* Image */}
              <div className="relative h-64 lg:h-100">
                <img
                  src={current.image.src}
                  alt={current.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent lg:hidden">
                  <h3 className="text-xl font-bold text-white">{current.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 bg-black/60 backdrop-blur-lg flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-3 hidden lg:block">
                  {current.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {current.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{current.description}</p>

                {current.duration && (
                  <div className="mb-6">
                    <h4 className="text-yellow-400 font-medium mb-1">Duration</h4>
                    <p className="text-white">{current.duration}</p>
                  </div>
                )}

                <button
                  onClick={scrollToContact}
                  className="group relative overflow-hidden px-8 py-3 bg-black text-yellow-400 font-semibold rounded-xl border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center w-fit hover:text-black transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Discuss Your Project
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-600 to-yellow-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Prev/Next buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20 lg:bottom-8 lg:right-8">
              <button
                onClick={prevProject}
                className="w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 hover:scale-110 active:scale-90 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                className="w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 hover:scale-110 active:scale-90 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-4 left-4 flex space-x-2 z-20 lg:bottom-8 lg:left-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                    ? "w-8 bg-yellow-500"
                    : "w-2 bg-white/30 hover:bg-yellow-400/50"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 text-center">
            <p className="text-xl text-gray-300 mb-6">
              Ready to transform your commercial or industrial electrical systems?
            </p>
            <button
              onClick={scrollToContact}
              className="group relative overflow-hidden cursor-pointer px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 hover:text-black transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Start Your Project
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-600 to-yellow-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
