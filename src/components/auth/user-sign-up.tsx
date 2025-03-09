// UserSignUp.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "@convex-dev/auth/react"; //Make sure you've installed this!
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form"; // Make sure this path is correct

import { Button } from "@/components/ui/button";

import { LoaderIcon } from "lucide-react";
import CustomInput from "../custom-input";
import CustomEmailInput from "../custom-email-input";
import CustomPasswordInput from "../custom-password-input";
import SubmitButton from "../submit-button";
import CustomMobileNumberInput from "../custom-mobile-number-input";

// Example avatars array. In a real-world scenario, you might fetch this.

const UserSignUp = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true); //Should probably be false by default!
  const [error, setError] = useState<string | null>(null);
  const [, setEmail] = useState(true); // This seems unused.  Consider removing.
  const navigate = useNavigate();

  // Zod schema for sign up form.
  const userSignUpZodSchema = z
    .object({
      name: z
        .string()
        .min(
          2,
          "Your name should have at least 2 characters to ensure proper identification."
        )
        .max(
          100,
          "Please keep your name under 100 characters to maintain clarity."
        ),
      email: z
        .string()
        .email("Please enter a valid email address so we can reach you.")
        .min(2, "We need your email to continue the registration process."),
      mobileNo: z
        .string()
        .min(10, "Please enter a valid 10-digit mobile number.")
        .max(10, "Please enter a valid 10-digit mobile number."), // Corrected max length
      password: z
        .string()
        .min(
          8,
          "Your password should be at least 8 characters for your security."
        )
        .max(
          12,
          "For your protection, please keep the password under 12 characters."
        ),
      confirmPassword: z
        .string()
        .min(
          8,
          "The confirmation password should be at least 8 characters long."
        )
        .max(
          12,
          "For consistency, please match the length of your original password."
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message:
        "It looks like the passwords don't match. Please confirm them again.",
      path: ["confirmPassword"],
    });

  type UserSignUpType = z.infer<typeof userSignUpZodSchema>;

  const form = useForm<UserSignUpType>({
    resolver: zodResolver(userSignUpZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobileNo: "",
      confirmPassword: "",
    },
  });

  const { signIn } = useAuthActions();

  const handleSignUp = async (data: UserSignUpType) => {
    console.log(data);
    // Ensure the user has selected an avatar.

    setLoading(true);
    setError(null);
    await signIn("password", {
      //Check if this is the correct method with Convex
      name: data.name,
      email: data.email,
      password: data.password,
      mobileNo: data.mobileNo,
      flow: "signUp",
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="flex flex-col items-center justify-center h-full w-full ">
      <section className="h-fit w-full text-center py-4">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <p>Sign Up into your account</p>
      </section>

      {/* Avatar selection section */}

      <Form {...form}>
        <form
          className="flex flex-col space-y-6 max-w-xl w-full mx-auto justify-start h-fit"
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <div className="flex justify-center items-center"></div>
          <CustomInput control={form.control} name="name" label="Name" />

          <CustomEmailInput
            setIsEmailAvailable={setEmail} // Likely unused, consider removing
            control={form.control}
            name="email"
            label="Email"
          />
          <CustomPasswordInput
            control={form.control}
            name="password"
            label="Password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder="Enter your password"
          />
          <CustomPasswordInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder="Confirm your password"
          />
          <CustomMobileNumberInput
            control={form.control}
            name="mobileNo"
            label="Mobile Number"
            // No need for number and setNumber props anymore
          />

          {error && <div className="text-red-500">{error}</div>}

          <SubmitButton
            type="submit"
            isLoading={loading}
            className="bg-pink-400 text-white hover:bg-pink-500 transition-all duration-300 ease-in-out"
            loadingText="Signing Up"
          >
            {loading ? (
              <span>
                <LoaderIcon className="animate-spin" />
              </span>
            ) : (
              <span>Sign Up</span>
            )}
          </SubmitButton>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Already have an account?"}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default UserSignUp;
