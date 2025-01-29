type Props = {
  onSubmit: () => void;
  onEdit: () => void;
  formData: FormData;
}

const ReviewDetails = ({ formData, onSubmit, onEdit }: Props) => {
  console.log(formData)
  return (
    <div>
      <h1>Review Your Details</h1>
      <ul>  
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default ReviewDetails;
