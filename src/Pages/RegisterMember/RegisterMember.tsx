import { useState, useEffect } from "react";
import Stepper from "../../components/Stepper";
import ClassCodeEntry from "../../components/ClassCodeEntry";
import ClassMemberForm, { FormData } from "../../components/ClassMemberForm";
import ReviewDetails from "../../components/ReviewDetails";
import { supabase } from "../../supabase/supabaseClient";

const RegisterMember = () => {
  // Retrieve initial state from sessionStorage if available
  const savedStep = sessionStorage.getItem("step");
  const savedFormData = sessionStorage.getItem("formData");
  const savedClassCode = sessionStorage.getItem("classCode");

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

  const handleSubmit = async () => {
    console.log("Form Submitted:", formData);
    // Perform API submission here
    const { data: classData, error: classError } = await supabase
      .from('Classes') // Assuming you have a 'Classes' table
      .select('id')
      .eq('class_code', savedClassCode) // Use the class code to get the class_id
      .single();

    if (classError) {
      console.error('Error fetching class:', classError);
      return;
    }

    const { error } = await supabase
      .from('classMembers') // Assuming you have a 'classMembers' table
      .insert([
        {
          class_id: classData.id,  // Link the member to the class using the class_id
          name: formData.name,
          state: formData.state,
          dob: formData.dob,
          favCourse: formData.favCourse,
          worstCourse: formData.worstCourse,
          quote: formData.quote,
          bestLevel: formData.bestLevel,
          hardestLevel: formData.hardestLevel,
        }
      ]);

    if (error) {
      console.error('Error inserting class member:', error);
    } else {
      console.log('Class member successfully registered!');
      // Optionally clear form data or route to a success page
    }

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
