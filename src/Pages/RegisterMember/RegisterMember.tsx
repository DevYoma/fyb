import { useState, useEffect } from "react";
import Stepper from "../../components/Stepper";
import ClassCodeEntry from "../../components/ClassCodeEntry";
import ClassMemberForm, { FormData } from "../../components/ClassMemberForm";
import ReviewDetails from "../../components/ReviewDetails";

const RegisterMember = () => {
  // Retrieve initial state from sessionStorage if available
  const savedStep = sessionStorage.getItem("step");
  const savedFormData = sessionStorage.getItem("formData");

  const [step, setStep] = useState(savedStep ? parseInt(savedStep) : 1 );
  const [formData, setFormData] = useState<FormData>(savedFormData ? JSON.parse(savedFormData) : {});

  const steps = ["Enter Code", "Fill Details", "Review & Submit"];

  const handleNext = (data: FormData) => {
    console.log("Handle NEXT clicked");
    if (step === 2) {
      setFormData(data);
    }
    // setStep((prev) => prev + 1); 
    const nextStep = step + 1; 
    setStep(nextStep);

    // save the current step and form data to Session Storage
    sessionStorage.setItem("step", step.toString());
    sessionStorage.setItem("formData", JSON.stringify(formData))
  };

  const handleEdit = () => {
    setStep(2);
    sessionStorage.setItem("step", "2");
  }

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    // Perform API submission here
    sessionStorage.removeItem("step");
    sessionStorage.removeItem("formData");
  };

  useEffect(() => {
    // Initialize sessionStorage for the first load if necessary
    sessionStorage.setItem("step", step.toString());
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [step, formData]);

  return (
    <div>
      <Stepper steps={steps} currentStep={step} />
      {step === 1 && <ClassCodeEntry onNext={handleNext} />}
      {step === 2 && <ClassMemberForm onNext={handleNext} />}
      {step === 3 && (
        <ReviewDetails
          formData={formData}
          onEdit={handleEdit}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default RegisterMember;
