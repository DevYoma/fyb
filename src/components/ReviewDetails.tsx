type Props = {
  onSubmit: () => void;
  onEdit: () => void;
  // formData: FormData;
}

const ReviewDetails = ({ onSubmit, onEdit }: Props) => {
  // console.log(formData)
  const formSessionData = sessionStorage.getItem("classMemberFormData");
  const parsedData = formSessionData ? JSON.parse(formSessionData) : {};
  console.log(formSessionData);
  
  return (
    <div>
      <h1>Review Your Details</h1>
      <ul>  
        {Object.entries(parsedData).map(([key, value]) => (
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
