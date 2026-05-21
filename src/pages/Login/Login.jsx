import React, { useContext, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../../context/AuthContext'
import netflix_spinner from '../../assets/netflix_spinner.gif'


const Login = () => {


  const [signState,setSignState] = useState("Sign In")
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, signUp } = useAuth();

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      if(signState === "Sign In"){
        await login(email,password)
      }else{
        await signUp(name,email,password);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }


  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up" ? <input value={name}  onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Your name'/>:<></>}
          <input value={email}  onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email'/>
          <div style={{ position: 'relative', margin: '12px 0' }}>
            <input value={password}  onChange={(e)=>{setPassword(e.target.value)}} type={showPassword ? 'text' : 'password'} placeholder='Password' style={{ margin: 0 }}/>
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </span>
          </div>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className='form-help'>
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==='Sign In'?<p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>:<p>Already have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
