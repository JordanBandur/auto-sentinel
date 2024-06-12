import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5173/login', {
        password,
        email
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         placeholder="Email" />
        <h3></h3>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
          <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
