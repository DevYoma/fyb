import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { nanoid } from "nanoid";

const RegisterRep = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    className: "",
    session: "", 
    phoneNumber: "", 
    school: ""
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Class Rep Form Submitted:", form);

    // do input validation here
    
    // Call Supabase sign-up API here
     try {
      const uniqueClassCode = nanoid(8)

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            role: "admin"
          }
        }
      });

      if(authData?.user?.identities?.length === 0){
        alert("Email already registered. Please try a different email.");
        setLoading(false);
        return;
      }

      if (authError) throw authError;

      const { error: classError } = await supabase.from("classes").insert({
        class_name: form.className,
        session: form.session,
        // @ts-expect-error("allow")
        admin_id: authData?.user.id,
        phone_number: form.phoneNumber,
        school: form.school,
        class_code: uniqueClassCode
      });

      if(classError) throw classError;
      console.log(form);
      alert("Sign-up successful!")
     } catch (error) {
        // @ts-expect-error("allow")
        alert(`Error: ${error.message}`);
     } finally {
        setLoading(false);
     }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register as Class Representative</h1>
      <input
        name="name"
        type="text"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="phoneNumber"
        type="number"
        placeholder="09048493839"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input
        name="className"
        type="text"
        placeholder="Comp Sci. Class of 2023"
        onChange={handleChange}
        required
      />
      <input
        name="school"
        type="text"
        placeholder="OAU"
        onChange={handleChange}
        required
      />
      <div>
        <label htmlFor="session">Session</label>
        <input
          name="session"
          type="text"
          placeholder="2023/24"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterRep;
