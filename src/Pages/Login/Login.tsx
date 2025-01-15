
const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login