import { Button } from "@/components/ui/Button";
import { SparklesCore } from "@/components/ui/sparkles";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const url = import.meta.env.VITE_BACKEND_URL;

interface CodeVerificationValue {
  email: string;
  code: string;
}

function CodeVerification() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CodeVerificationValue>({
    defaultValues: {
      code: "",
      email: "",
    },
  });
  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.code) {
      toast.error(errors.code.message);
    }
  }, [errors.code, errors.email]);
  
  const CodeVerificationsubmit: SubmitHandler<CodeVerificationValue> = async (
    data
  ) => {
    axios
      .post(`${url}api/v1/auth/verify-code`, {
        email: data.email,
        verifyCode: data.code,
      })
      .then((res) => {
        console.log(res);
        toast(res?.data?.message);
        setUser(res.data);
        reset();
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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
          onSubmit={handleSubmit(CodeVerificationsubmit)}
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
                required: "Email is required to verify code",
              })}
              className="bg-transparent border border-white/30 rounded-md px-3 py-2 focus:border-white transition text-white"
            />
          </div>

          {/* code */}
          <div className="flex flex-col gap-1 animate-[slideIn_0.6s_ease_forwards] [animation-delay:0.2s]">
            <label className="appear font-bold text-xl font-mono flex gap-px">
              <span>C</span>
              <span>o</span>
              <span>d</span>
              <span>e</span>
            </label>
            <input
              type="text"
              placeholder="Enter code"
              autoComplete="off"
              {...register("code", {
                required: "Verification code is required",
                min: 6,
              })}
              className="bg-transparent border border-white/30 rounded-md px-3 py-2 focus:border-white transition text-white"
            />
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
              <span>V</span>
              <span>e</span>
              <span>r</span>
              <span>i</span>
              <span>f</span>
              <span>y</span>
            </span>
          </Button>
        </form>
        <div className="appear mt-3 text-gray-600 font-bold">
          <span>We&nbsp;</span>
          <span>have&nbsp;</span>
          <span>sent&nbsp;</span>
          <span>a&nbsp;</span>
          <span className="font-extrabold">Verification&nbsp;</span>
          <span className="font-extrabold">code&nbsp;</span>
          <span>to&nbsp;</span>
          <span>your&nbsp;</span>
          <span className="font-extrabold">Email.&nbsp;</span>
          <span>Please&nbsp;</span>
          <span>Enter&nbsp;</span>
          <span>here.&nbsp;</span>
        </div>
      </main>
    </div>
  );
}

export default CodeVerification;
