import React, { useState } from "react";

const TextField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-700 bg-black text-white rounded focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
    />
  </div>
);

const TextArea = ({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 3,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className="w-full p-2 border border-gray-700 bg-black text-white rounded focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
    />
  </div>
);

const Checkbox = ({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-700 rounded"
    />
    <label htmlFor={name} className="ml-2 block text-sm text-gray-200">
      {label}
    </label>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 text-amber-500 border-b border-amber-500 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

interface EmploymentRecord {
  employer: string;
  address: string;
  jobTitle: string;
  fromDate: string;
  toDate: string;
  duties: string;
  reasonForLeaving: string;
}

interface Education {
  institution: string;
  subject: string;
  qualification: string;
  dateGained: string;
}

interface Training {
  course: string;
  date: string;
}

interface Reference {
  name: string;
  position: string;
  organization: string;
  address: string;
  telephone: string;
}

interface ApplicationFormData {
  jobTitle: string;
  department: string;
  referenceNumber: string;
  advertisementSource: string;
  title: string;
  lastName: string;
  firstName: string;
  homeAddress: string;
  zipCode: string;
  homePhone: string;
  workPhone: string;
  mobilePhone: string;
  email: string;
  hasDriversLicense: boolean;
  hasMedicalCondition: boolean;
  hasWorkRestrictions: boolean;
  noticeRequired: string;
  employmentRecords: EmploymentRecord[];
  educationRecords: Education[];
  trainingRecords: Training[];
  experienceSkills: string;
  references: Reference[];
  hasCriminalConvictions: boolean;
  drugAlcoholPolicyAcknowledged: boolean;
}

const emptyEmploymentRecord: EmploymentRecord = {
  employer: "", address: "", jobTitle: "", fromDate: "", toDate: "", duties: "", reasonForLeaving: "",
};

const initialFormData: ApplicationFormData = {
  jobTitle: "",
  department: "",
  referenceNumber: "",
  advertisementSource: "",
  title: "",
  lastName: "",
  firstName: "",
  homeAddress: "",
  zipCode: "",
  homePhone: "",
  workPhone: "",
  mobilePhone: "",
  email: "",
  hasDriversLicense: false,
  hasMedicalCondition: false,
  hasWorkRestrictions: false,
  noticeRequired: "",
  employmentRecords: Array(4).fill(null).map(() => ({ ...emptyEmploymentRecord })),
  educationRecords: [{ institution: "", subject: "", qualification: "", dateGained: "" }],
  trainingRecords: [{ course: "", date: "" }],
  experienceSkills: "",
  references: Array(2).fill(null).map(() => ({ name: "", position: "", organization: "", address: "", telephone: "" })),
  hasCriminalConvictions: false,
  drugAlcoholPolicyAcknowledged: false,
};

export default function ApplicationForm() {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const apiUrl = import.meta.env.PUBLIC_API_URL || "";

    try {
      const response = await fetch(`${apiUrl}/api/job-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Application submitted successfully!");
        setFormData(initialFormData);
      } else {
        setErrorMessage(`Failed to submit application: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error: Unable to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleEmploymentChange = (index: number, field: keyof EmploymentRecord, value: string) => {
    const updated = [...formData.employmentRecords];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, employmentRecords: updated });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...formData.educationRecords];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, educationRecords: updated });
  };

  const handleTrainingChange = (index: number, field: keyof Training, value: string) => {
    const updated = [...formData.trainingRecords];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, trainingRecords: updated });
  };

  const handleReferenceChange = (index: number, field: keyof Reference, value: string) => {
    const updated = [...formData.references];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, references: updated });
  };

  const addEducationRecord = () => {
    setFormData({
      ...formData,
      educationRecords: [...formData.educationRecords, { institution: "", subject: "", qualification: "", dateGained: "" }],
    });
  };

  const addTrainingRecord = () => {
    setFormData({
      ...formData,
      trainingRecords: [...formData.trainingRecords, { course: "", date: "" }],
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="w-11/12 max-w-screen-2xl mx-auto bg-black border-2 border-amber-500 rounded-lg shadow-lg p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-500">EMPLOYEE APPLICATION FORM</h1>
          <p className="mt-2 text-gray-300">
            Please complete this accurately, giving as many details as possible of your skills and experience
            relating to this job application. Shortlisting will be based on the information gathered from the
            form, read in conjunction with the person specification.
          </p>
          <p className="mt-2 text-gray-300">
            Please ensure the finished form is printed out, signed, dated, and returned to one of the members
            of the office staff. We are unable to accept forms returned as email attachments without a signature.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <Section title="POSITION APPLIED FOR">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField label="Job title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
              <TextField label="Department/Region" name="department" value={formData.department} onChange={handleChange} />
              <TextField label="Reference number" name="referenceNumber" value={formData.referenceNumber} onChange={handleChange} />
              <TextField label="Where did you see this post advertised?" name="advertisementSource" value={formData.advertisementSource} onChange={handleChange} />
            </div>
          </Section>

          <Section title="1. APPLICANT'S DETAILS">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField label="Title" name="title" value={formData.title} onChange={handleChange} className="md:col-span-1" />
              <TextField label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} required className="md:col-span-1" />
              <TextField label="First name" name="firstName" value={formData.firstName} onChange={handleChange} required className="md:col-span-1" />
            </div>
            <TextArea label="Home address" name="homeAddress" value={formData.homeAddress} onChange={handleChange} required />
            <TextField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            <div className="mt-4">
              <p className="block text-sm font-medium text-gray-200 mb-2">Telephone Numbers: Please include full STD code</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField label="Home" name="homePhone" value={formData.homePhone} onChange={handleChange} />
                <TextField label="Work" name="workPhone" value={formData.workPhone} onChange={handleChange} />
                <TextField label="Mobile (where possible)" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} />
              </div>
            </div>
            <TextField label="Email address (where possible)" name="email" value={formData.email} onChange={handleChange} />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Checkbox label="Do you hold a current driving license?" name="hasDriversLicense" checked={formData.hasDriversLicense} onChange={handleCheckboxChange} />
              <div>
                <Checkbox label="Is there anything concerning your medical history or state of health that is relevant to your application?" name="hasMedicalCondition" checked={formData.hasMedicalCondition} onChange={handleCheckboxChange} />
                <p className="text-xs text-gray-400 ml-6">If you answer Yes please refer to the Equality of Opportunity Questionnaire enclosed</p>
              </div>
            </div>
            <div className="mt-4">
              <Checkbox label="Are there any restrictions regarding your employment? (e.g., do you require a Work Permit?)" name="hasWorkRestrictions" checked={formData.hasWorkRestrictions} onChange={handleCheckboxChange} />
              <p className="text-xs text-gray-400 ml-6">If you answer Yes please supply details on a separate sheet of paper</p>
            </div>
            <TextField label="How much notice do you need to give to your current employer?" name="noticeRequired" value={formData.noticeRequired} onChange={handleChange} />
          </Section>

          <Section title="2. EMPLOYMENT RECORD">
            <p className="mb-4 text-gray-300">
              Please start with your most recent employment. Briefly describe the main duties and responsibilities
              of your post. If you wish to expand on specific areas of responsibility, please do so in Section 5: Experience/skills.
            </p>
            {formData.employmentRecords.map((record, index) => (
              <div key={index} className="mb-8 p-4 border border-gray-700 rounded">
                <h3 className="font-semibold text-amber-500 mb-3">
                  {index === 0 ? "Current/most recent employer/organization" : `Employer/organization ${index + 1}`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField label="Name" name={`employer-${index}`} value={record.employer} onChange={(e) => handleEmploymentChange(index, "employer", e.target.value)} />
                  <TextArea label="Address" name={`address-${index}`} value={record.address} onChange={(e) => handleEmploymentChange(index, "address", e.target.value)} rows={2} />
                  <TextField label="Job Title" name={`jobTitle-${index}`} value={record.jobTitle} onChange={(e) => handleEmploymentChange(index, "jobTitle", e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    <TextField label="From" name={`fromDate-${index}`} value={record.fromDate} onChange={(e) => handleEmploymentChange(index, "fromDate", e.target.value)} />
                    <TextField label="To" name={`toDate-${index}`} value={record.toDate} onChange={(e) => handleEmploymentChange(index, "toDate", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <TextArea label="Brief description of duties" name={`duties-${index}`} value={record.duties} onChange={(e) => handleEmploymentChange(index, "duties", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <TextField label="Reason for leaving/changing" name={`reasonForLeaving-${index}`} value={record.reasonForLeaving} onChange={(e) => handleEmploymentChange(index, "reasonForLeaving", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </Section>

          <Section title="3. EDUCATION">
            <p className="mb-4 text-gray-300">
              Please tell us about your education and any qualifications which you feel are relevant to the post.
              Include relevant courses which you are currently undertaking. Please start with the most recent.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-2 text-left border border-gray-700">Name of school/college/university/training body</th>
                    <th className="p-2 text-left border border-gray-700">Subject studied</th>
                    <th className="p-2 text-left border border-gray-700">Qualification/Level</th>
                    <th className="p-2 text-left border border-gray-700">Date gained</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.educationRecords.map((record, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-2 border border-gray-700">
                        <input type="text" value={record.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} className="w-full p-1 bg-black text-white border-none focus:ring-1 focus:ring-amber-500" />
                      </td>
                      <td className="p-2 border border-gray-700">
                        <input type="text" value={record.subject} onChange={(e) => handleEducationChange(index, "subject", e.target.value)} className="w-full p-1 bg-black text-white border-none focus:ring-1 focus:ring-amber-500" />
                      </td>
                      <td className="p-2 border border-gray-700">
                        <input type="text" value={record.qualification} onChange={(e) => handleEducationChange(index, "qualification", e.target.value)} className="w-full p-1 bg-black text-white border-none focus:ring-1 focus:ring-amber-500" />
                      </td>
                      <td className="p-2 border border-gray-700">
                        <input type="text" value={record.dateGained} onChange={(e) => handleEducationChange(index, "dateGained", e.target.value)} className="w-full p-1 bg-black text-white border-none focus:ring-1 focus:ring-amber-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" onClick={addEducationRecord} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition duration-200">
              Add Education Record
            </button>
          </Section>

          <Section title="4. TRAINING">
            <p className="mb-4 text-gray-300">
              Please list any training you have received or courses which did not lead to a qualification
              but which you feel are relevant to the advertised post.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-2 text-left border border-gray-700 w-3/4">Training Course</th>
                    <th className="p-2 text-left border border-gray-700 w-1/4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.trainingRecords.map((record, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-2 border border-gray-700">
                        <input type="text" value={record.course} onChange={(e) => handleTrainingChange(index, "course", e.target.value)} className="w-full p-1 bg-black text-white border-none focus:ring-1 focus:ring-amber-500" />
                      </td>
                      <td className="p-2 border border-gray-700">
                        <input type="text" value={record.date} onChange={(e) => handleTrainingChange(index, "date", e.target.value)} className="w-full p-1 bg-black text-white border-none focus:ring-1 focus:ring-amber-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" onClick={addTrainingRecord} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition duration-200">
              Add Training Record
            </button>
          </Section>

          <Section title="5. EXPERIENCE / SKILLS">
            <p className="mb-4 text-gray-300">
              This section is for you to give specific information in support of your application.
              Please set the information out on a maximum of three sides of A4 paper.
            </p>
            <p className="mb-4 text-gray-300">
              After reading the Job Description and Person Specification carefully, consider to what extent
              you have gained the skills and experience necessary for the post. Your experience need not have
              been gained in paid employment and may include special interests relevant to the post. It is
              important that you provide evidence of your achievements by giving examples to support your
              application. You may wish to use the headings in the person specification in order to set the
              information out clearly.
            </p>
            <TextArea label="Experience and Skills" name="experienceSkills" value={formData.experienceSkills} onChange={handleChange} rows={10} />
          </Section>

          <Section title="6. REFERENCES">
            <p className="mb-4 text-gray-300">
              Please give name, address and position/occupation of two referees. One must be your present or
              most recent employer. References will only be taken up for the successful candidate. Testimonials
              or references from friends and relatives are not acceptable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {formData.references.map((reference, index) => (
                <div key={index} className="border border-gray-700 p-4 rounded">
                  <h3 className="font-semibold text-amber-500 mb-3">Reference {index + 1}</h3>
                  <TextField label="Name" name={`refName-${index}`} value={reference.name} onChange={(e) => handleReferenceChange(index, "name", e.target.value)} />
                  <TextField label="Position" name={`refPosition-${index}`} value={reference.position} onChange={(e) => handleReferenceChange(index, "position", e.target.value)} />
                  <TextField label="Organization" name={`refOrganization-${index}`} value={reference.organization} onChange={(e) => handleReferenceChange(index, "organization", e.target.value)} />
                  <TextArea label="Address" name={`refAddress-${index}`} value={reference.address} onChange={(e) => handleReferenceChange(index, "address", e.target.value)} rows={2} />
                  <TextField label="Telephone" name={`refTelephone-${index}`} value={reference.telephone} onChange={(e) => handleReferenceChange(index, "telephone", e.target.value)} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="7. CRIMINAL CONVICTIONS">
            <Checkbox label="Do you have any criminal convictions?" name="hasCriminalConvictions" checked={formData.hasCriminalConvictions} onChange={handleCheckboxChange} />
            <p className="text-xs text-gray-400 ml-6">
              If Yes please give details on a separate sheet, this should exclude any spent convictions
              under Section 4(2) of the Rehabilitation of Offenders Act 1974.
            </p>
          </Section>

          <Section title="8. DRUG AND ALCOHOL POLICY ACKNOWLEDGMENT">
            <div className="mb-4 p-4 border border-gray-700 rounded bg-gray-900">
              <h3 className="text-lg font-bold text-amber-500 mb-4 text-center">DRUG AND ALCOHOL POLICY</h3>
              <h4 className="text-md font-bold text-amber-400 mb-3">Terms</h4>
              <div className="text-sm text-gray-300 space-y-3 mb-6 max-h-64 overflow-y-auto">
                <p>
                  Drug and alcohol abuse contributes to billions of dollars of lost productivity and thousands
                  of workplace injuries every year. Our policy is to employ a workforce free from alcohol abuse
                  or the use of illegal drugs. C&C Construction and Electrical takes drug and alcohol abuse as
                  a serious matter and will not tolerate it. C&C Construction and Electrical absolutely prohibits
                  the use of alcohol or non-prescribed drugs at the workplace or while on company premises. It
                  also discourages non-workplace drug and alcohol abuse. The use, sale, or possession of alcohol
                  or drugs while on the job site or on company property will result in disciplinary action, up
                  to and including termination, and may have legal consequences. Employees are expected and
                  required to report to work on time and in appropriate mental and physical condition for work.
                  It is our intent and obligation to provide a drug-free, healthful, and safe work environment.
                  C&C Construction and Electrical reserves the right to demand a drug or alcohol test of any
                  employee based upon reasonable suspicion. Failure to take a requested drug test may lead to
                  discipline, including possible termination.
                </p>
                <p>
                  C&C Construction and Electrical also cautions against the use of prescribed or over-the-counter
                  medication which can affect your workplace performance. You may be suspended or discharged if
                  the company concludes that you cannot perform your job properly or safely because of using
                  over-the-counter or prescribed medication. Please inform your supervisor prior to working under
                  the influence of a prescribed or over-the-counter medication that may affect your performance.
                </p>
                <p>
                  Employees must report any conviction under a criminal drug statute for violations occurring on
                  or off the Company's premises while conducting company business. A report of a conviction must
                  be made within (3-5) days after the conviction. C&C Construction and Electrical will make every
                  effort to assist its employees who wish to seek treatment or rehabilitation for drug or alcohol
                  dependency. Conscious efforts to seek such help will not jeopardize any employee's job and will
                  not be noted in any personal record. You may also be required to agree to random testing and a
                  "one-strike" rule.
                </p>
                <p className="font-semibold text-amber-400">If you have a drug or alcohol problem, please ask for our help!</p>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-md font-bold text-amber-400 mb-3">EMPLOYEE AGREEMENT ON DRUG AND ALCOHOL POLICY</h4>
                <Checkbox
                  label="I have read, understand, and agree to comply with the foregoing policies, rules, and conditions. I am aware that violations of this guideline may subject me to disciplinary action, including termination from employment, legal action, and criminal liability. I further understand that I am responsible for maintaining a positive representation of the company and governing myself accordingly. Furthermore, I know that this policy can be amended at any time."
                  name="drugAlcoholPolicyAcknowledged"
                  checked={formData.drugAlcoholPolicyAcknowledged}
                  onChange={handleCheckboxChange}
                />
                <p className="text-xs text-red-400 ml-6 mt-1">* This acknowledgment is required for employment</p>
              </div>
            </div>
          </Section>

          <Section title="9. DECLARATION AND SIGNATURE">
            <p className="mb-4 text-gray-300">
              The information supplied in this application form is accurate to the best of my knowledge.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border-b border-gray-700 pb-2">
                <p className="text-sm text-gray-400">Signature</p>
              </div>
              <div className="border-b border-gray-700 pb-2">
                <p className="text-sm text-gray-400">Date</p>
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-400">
              By signing and returning this application form you consent to using and keeping information
              about you provided by you us – or third parties such as referees – relating to your application
              or future employment. This information will be used solely in the recruitment process and will
              be retained for six months from the date on which you are informed whether you have been invited
              to interview, or six months from the date of interview. Such information may include details
              relating to ethnic monitoring and disability: these will be used solely for internal monitoring
              and will not be disclosed to any third party. Thank you for completing the form.
            </p>
          </Section>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 font-bold rounded shadow-lg transition duration-200 ${isSubmitting ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 text-black"
                }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="mt-6 p-4 bg-green-900 border border-green-500 rounded text-green-200">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-900 border border-red-500 rounded text-red-200">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
} 
