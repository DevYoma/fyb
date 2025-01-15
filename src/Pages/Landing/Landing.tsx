import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import ClassesList from "../../components/ClassesList";


const Landing = () => {
  return (
    <div>
      <h1>Welcome to FYB App</h1>
      <p>
        Celebrate your class memories, preserve profiles, and connect with your
        classmates!
      </p>
      <a href="/login">Get Started</a>

      <ClassesList />      
    </div>
  );
}

export default Landing