import { Button } from "@/components/ui/Button";
import { SparklesCore } from "@/components/ui/sparkles";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
const url = import.meta.env.VITE_BACKEND_URL;

interface signInValue {
  email: string;
  password: string;
}

function SignIn() {
  const [isPassword, setIsPassword] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<signInValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (errors.email || errors.password) {
      toast.error(errors.email?.message);
      toast.error(errors.password?.message);
    }
  }, [errors.email, errors.password]);

  const handleSignInsubmit: SubmitHandler<signInValue> =async (data) => {
    const response = await axios.post('');

  };

  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <main
        className="
    border border-white/20 p-10 rounded-2xl text-white 
    backdrop-blur-xl bg-white/5 
    animate-[loginBox_0.6s_ease]
  "
      >
        <h1 className="appear mb-6 flex gap-1 text-5xl font-bold justify-center text-center">
          <span>A</span>
          <span>T</span>
          <span>G</span>
        </h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSignInsubmit)}
        >
          {/* Email */}
          <div className="flex flex-col gap-1 animate-[slideIn_0.6s_ease_forwards] [animation-delay:0.2s]">
            <label className="appear font-bold text-xl font-mono flex gap-px">
              <span>E</span>
              <span>m</span>
              <span>a</span>
              <span>i</span>
              <span>l</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid Email",
                },
              })}
              className="bg-transparent border border-white/30 rounded-md px-3 py-2 focus:border-white transition text-white"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 animate-[slideIn_0.6s_ease_forwards] [animation-delay:0.4s]">
            <label className="appear font-bold text-xl font-mono flex gap-px">
              <span>P</span>
              <span>a</span>
              <span>s</span>
              <span>s</span>
              <span>w</span>
              <span>o</span>
              <span>r</span>
              <span>d</span>
            </label>
            <div className="w-full bg-transparent border border-white/30 rounded-md px-3 py-2 focus:border-white transition text-white flex justify-evenly">
              <input
                type={isPassword ? "password" : "text"}
                placeholder="Enter password"
                autoComplete="new-password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z]).+$/,
                    message:
                      "Password must contain at least one uppercase letter",
                  },
                })}
                className="outline-none focus:outline-none focus:ring-0 
    focus:border-transparent 
    border-none "
              />
              {isPassword ? (
                <Eye
                  className="hover:text-gray-400"
                  onClick={() => {
                    setIsPassword(!isPassword);
                  }}
                />
              ) : (
                <EyeOff
                  className="hover:text-gray-400"
                  onClick={() => {
                    setIsPassword(!isPassword);
                  }}
                />
              )}
            </div>
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="
        mt-4 animate-[slideIn_0.6s_ease_forwards] [animation-delay:0.6s]
        hover:scale-105 hover:shadow-[0_0_10px_white] transition
      "
          >
            <span className="appear font-bold">
              <span>S</span>
              <span>i</span>
              <span>g</span>
              <span>n&nbsp;</span>
              <span>I</span>
              <span>n</span>
            </span>
          </Button>
        </form>
        <div className="appear mt-3 text-gray-600 font-bold">
          <span>D</span>
          <span>o</span>
          <span>n&apos;</span>
          <span>t&nbsp;</span>
          <span>h</span>
          <span>a</span>
          <span>v</span>
          <span>e&nbsp;</span>
          <span>a</span>
          <span>n</span>
          <span>y&nbsp;</span>
          <span>A</span>
          <span>c</span>
          <span>c</span>
          <span>o</span>
          <span>u</span>
          <span>n</span>
          <span>t.&nbsp;</span>

          <NavLink to={"/sign-up"} className={"hover:text-blue-800 underline"}>
            Click here
          </NavLink>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
