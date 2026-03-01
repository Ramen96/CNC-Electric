import { useState, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import MapComponent from "./mapComponent";
import { initReveal } from "../utils/reveal";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
}

interface FormState extends ContactFormData {
  submitted: boolean;
  loading: boolean;
}

const contactOptions = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    content: "(704)-879-4057",
    action: "tel:+17048794057",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    content: "electricco.cnc@gmail.com",
    action: "mailto:electricco.cnc@gmail.com",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Visit Us",
    content: "510 West 1st Street. Lowell, NC 28098",
    action: "https://www.google.com/maps/place/510+W+1st+St,+Lowell,+NC+28098",
  },
];

const serviceAreas = ["Charlotte", "Huntersville", "Matthews", "Concord", "Gastonia"];

const formatPhoneNumber = (value: string): string => {
  const phoneNumber = value.replace(/\D/g, "");
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
    submitted: false,
    loading: false,
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);

  useEffect(() => {
    initReveal("#contact");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: id === "phone" ? formatPhoneNumber(value) : value,
    }));
  };

  const handleContactSubmit = async (formData: ContactFormData) => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setErrorMessage("");
        setFormState((prev) => ({
          ...prev,
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          message: "",
        }));
      } else {
        setErrorMessage(`Failed to send message: ${response.status} ${response.statusText}`);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error: Unable to connect to server");
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true }));
    setSuccessMessage("");
    setErrorMessage("");

    await handleContactSubmit({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      company: formState.company,
      projectType: formState.projectType,
      message: formState.message,
    });

    setFormState((prev) => ({ ...prev, loading: false, submitted: true }));
  };

  const inputClass = "block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all";

  return (
    <section
      id="contact"
      className="relative py-14 overflow-hidden bg-gray-950 scroll-mt-[80px]"
    >
      {/* Circuit background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M10,90 L90,90 L90,10" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="90" cy="10" r="2" fill="#E3B341" />
              <path d="M10,50 L50,50 L50,10" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="50" cy="10" r="2" fill="#E3B341" />
              <path d="M50,90 L50,70 L90,70" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="90" cy="70" r="2" fill="#E3B341" />
              <path d="M30,10 L30,30 L10,30" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="10" cy="30" r="2" fill="#E3B341" />
              <path d="M10,70 L30,70 L30,50" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="30" cy="50" r="2" fill="#E3B341" />
              <path d="M70,10 L70,30 L90,30" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="90" cy="30" r="2" fill="#E3B341" />
              <path d="M90,50 L70,50 L70,90" fill="none" stroke="#E3B341" strokeWidth="0.5" />
              <circle cx="70" cy="90" r="2" fill="#E3B341" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="reveal inline-block px-3 py-1 text-sm font-medium text-yellow-400 bg-yellow-900/30 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="reveal text-3xl md:text-4xl font-bold text-white mb-4" style={{ transitionDelay: "0.1s" }}>
            Let's Power Your Next Project
          </h2>
          <p className="reveal max-w-2xl mx-auto text-lg text-gray-300" style={{ transitionDelay: "0.2s" }}>
            Ready to discuss your electrical needs? Contact our team of experts for a consultation and free quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left — Contact info + map */}
          <div className="lg:col-span-2 space-y-4">

            {/* Contact info card */}
            <div className="reveal p-5 bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-lg" style={{ transitionDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Information</h3>
              <div className="space-y-2">
                {contactOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.action}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-900 hover:translate-x-1 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-500/10 text-yellow-400 mr-3 flex-shrink-0">
                      {option.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{option.title}</h4>
                      <p className="text-gray-300 text-sm">{option.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map card */}
            <div className="reveal p-5 bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-lg" style={{ transitionDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold mb-4 text-white">Service Area</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <MapComponent />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span key={area} className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal lg:col-span-3 bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-lg overflow-hidden" style={{ transitionDelay: "0.25s" }}>
            {formState.submitted ? (
              <div className="p-10 flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-lg text-gray-300 mb-8">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
                <button
                  className="px-6 py-3 bg-black text-yellow-400 border-2 border-yellow-500/50 rounded-lg font-medium hover:scale-105 active:scale-95 transition-all duration-200"
                  onClick={() => setFormState((prev) => ({ ...prev, submitted: false }))}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="p-6">
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-semibold text-white">Send Us a Message</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-yellow-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input id="name" type="text" value={formState.name} onChange={handleChange} required className={inputClass} placeholder="John Smith" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-yellow-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input id="email" type="email" value={formState.email} onChange={handleChange} required className={inputClass} placeholder="john@company.com" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number <span className="text-yellow-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <input id="phone" type="tel" value={formState.phone} onChange={handleChange} required className={inputClass} placeholder="(555) 123-4567" />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name <span className="text-yellow-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <input id="company" type="text" value={formState.company} onChange={handleChange} required className={inputClass} placeholder="Company Inc." />
                      </div>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type <span className="text-yellow-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <select id="projectType" value={formState.projectType} onChange={handleChange} required className={`${inputClass} appearance-none pr-10`}>
                        <option value="">Select project type</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details <span className="text-yellow-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="block w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  {/* Checkbox + Submit */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-start">
                      <input
                        checked={checkboxChecked}
                        id="newsletter"
                        type="checkbox"
                        className="w-4 h-4 mt-0.5 border border-gray-600 rounded bg-gray-700 focus:ring-0"
                        onChange={() => setCheckboxChecked(!checkboxChecked)}
                      />
                      <label htmlFor="newsletter" className="ml-3 text-sm text-gray-300">
                        Subscribe to newsletter for industry updates.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={formState.loading}
                      className="px-8 py-3 bg-black text-yellow-400 font-medium rounded-lg border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                    >
                      {formState.loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
