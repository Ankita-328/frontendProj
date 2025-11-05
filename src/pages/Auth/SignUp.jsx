import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadimage';
import toast from 'react-hot-toast';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name");
      toast.error("Please enter full name");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      toast.error("Please enter the password");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      toast.error("Please enter a valid email");
      return;
    }

    setError("");
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("Token", token);
        updateUser(response.data);
        toast.success("Account created successfully!", { duration: 6000 });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
   
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-lg flex flex-col justify-center">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black text-center">
          Create an Account
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 mt-[5px] mb-6 text-center">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 gap-3">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@email.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Minimum 8 Characters"
              type="password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs sm:text-sm pb-2.5">{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-2 sm:py-3 text-sm sm:text-base"
          >
            Sign Up
          </button>

          <p className="text-[13px] sm:text-sm text-slate-800 mt-3 text-center">
            Already have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    
  );
};

export default SignUp;