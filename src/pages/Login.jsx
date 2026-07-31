import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#C62B9F] bg-700
      px-4
    ">


      <div className="
        flex
        w-full
        max-w-md
        flex-col
        items-center
        gap-6
        rounded-xl
        px-8
        py-10
      ">


        {/* Logo */}

        <img
          src="src/assets/newzedlogo.jpg"
          className="h-32 w-80 object-contain"
        />



        {/* Heading */}

        <h1 className="text-2xl font-semibold text-white">
          Welcome Back
        </h1>


        <p className="text-sm text-white">
          Sign in to access the technical monitoring system
        </p>





        {/* Email */}

        <div className="w-full">

          <label className="mb-2 block text-sm font-bold text-white">
            Email Address
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full
              rounded-xl
              border
              border-gray-400
              px-4
              py-3
              text-sm
              outline-none
              bg-white
            "
          />

        </div>






        {/* Password */}

        <div className="w-full">

          <label className="mb-2 block text-sm font-bold text-white">
            Password
          </label>


          <div className="relative">


            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="
                w-full
                rounded-xl
                border
                border-gray-400
                px-4
                py-3
                text-sm
                outline-none
                bg-white
              "
            />


            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-4
                top-3
                text-gray-600
              "
            >

              {
                showPassword
                ?
                <EyeOff size={18}/>
                :
                <Eye size={18}/>
              }

            </button>


          </div>


        </div>





        {/* Login Button */}

        <button
          onClick={() => navigate("/dashboard")}
          className="
            rounded-xl
            bg-black
            px-8
            py-3
            font-bold
            text-white
            transition
            hover:bg-violet-900
          "
        >
          Login
        </button>


      </div>


    </div>
  );
}


export default Login;