import {useState} from "react";
import axios from "axios";


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5433/register', {
        name,
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <h3></h3>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
