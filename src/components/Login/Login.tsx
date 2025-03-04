import { useState } from 'react';
import './../../index.css';
import {
  FaFacebookSquare,
  FaRegEye,
  FaTwitterSquare,
  FaUser,
} from 'react-icons/fa';
import { ImGoogle2 } from 'react-icons/im';
import { IoLogoLinkedin } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';
import wind from './../../assets/images/wind.png';
import { toast, ToastContainer } from 'react-toastify';
import { registers } from '../../services/register/register';
import Loading from '../Loading/Loading';
import { IoEyeOffOutline } from 'react-icons/io5';
import { logins } from '../../services/login/login';
import { useNavigate } from 'react-router';

function Login() {
  interface IformData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<IformData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  interface Ivalidation {
    email: string;
    password: string;
  }

  const validition = () => {
    let newErrors: Partial<Ivalidation> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'please enter your email';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'The email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'please enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validition()) return;
    setLoading(true);
    const result = await logins(formData);
    if (result?.status === 200) {
      setLoading(false);
      navigate('/panel');
    } else {
      setLoading(false);
    toast.error("Login failed");
  }
} 

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validition()) return;
    const result = await registers(formData);
    if (result?.status === 200) {
      toast.success('sign up is succesfuly');
    }else {
    toast.error("sign up failed");
      };}

  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      <ToastContainer />
      <div className="form-box login">
        <form onSubmit={handleSubmitLogin}>
          {loading && (
              <Loading />
          )}
          <h1>login</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <FaUser className="icon-input" />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ente your password"
            />
            <FaRegEye onClick={togglePassword} className="icon-input" />
            {showPassword ? (
              <IoEyeOffOutline
                onClick={togglePassword}
                className="icon-input"
              />
            ) : (
              <FaRegEye onClick={togglePassword} className="icon-input" />
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="forgot-link">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>or login social platforms</p>
          <div className="social-icons">
            <ImGoogle2 className="icong" />
            <FaFacebookSquare className="iconf" />
            <FaTwitterSquare className="icont" />
            <IoLogoLinkedin className="iconl" />
          </div>
        </form>
      </div>
      <div className="form-box sign-up">
        <form onSubmit={handleSubmitRegister}>
          <h1>sign up</h1>
          <div className="input-box">
            <input type="text" placeholder="Enter your username" />
            <FaUser className="icon-input" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <MdOutlineMail className="icon-input" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Ente your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {showPassword ? (
              <IoEyeOffOutline
                onClick={togglePassword}
                className="icon-input"
              />
            ) : (
              <FaRegEye onClick={togglePassword} className="icon-input" />
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="btn">
            sign up
          </button>
          <p>or sign up social platforms</p>
          <div className="social-icons">
            <ImGoogle2 className="icong" />
            <FaFacebookSquare className="iconf" />
            <FaTwitterSquare className="icont" />
            <IoLogoLinkedin className="iconl" />
          </div>
        </form>
      </div>

      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn sign-up-btn" onClick={() => setIsActive(true)}>
            sign up
          </button>
          <img src={wind} alt="gif" className="img-login" />
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          {loading && (
            <div className="z-50 w-44 h-36">
              <Loading />
            </div>
          )}
          <button className="btn login-btn" onClick={() => setIsActive(false)}>
            Login
          </button>
          <img src={wind} alt="gif" className="img-login" />
        </div>
      </div>
    </div>
  );
}
export default Login;
