import { useState } from "react";
import Stepper from "../../components/Stepper";
import ClassCodeEntry from "../../components/ClassCodeEntry";
import ClassMemberForm from "../../components/ClassMemberForm";
import ReviewDetails from "../../components/ReviewDetails";

const RegisterMember = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const steps = ["Enter Code", "Fill Details", "Review & Submit"];

  const handleNext = (data: FormData) => {
    if (step === 1) {
      setFormData(data);
    }
    setStep((prev) => prev + 1);
  };

  const handleEdit = () => setStep(1);

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    // Perform API submission here
  };

  return (
    <div>
      <Stepper steps={steps} currentStep={step} />
      {step === 0 && <ClassCodeEntry onNext={handleNext} />}
      {step === 1 && <ClassMemberForm onNext={handleNext} />}
      {step === 2 && (
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
