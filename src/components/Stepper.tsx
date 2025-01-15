type Props = {
    steps: string[]; 
    currentStep: number;
}

const Stepper = ({ steps, currentStep }: Props) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= currentStep ? "active" : ""}`}
        >
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
