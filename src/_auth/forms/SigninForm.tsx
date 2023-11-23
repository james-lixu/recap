import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useSigninAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signinAccount } = useSigninAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signinAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Signup failed, please try again." });
    }
  }

  return (
    <Form {...form}>
      <div className="relative flex flex-col items-center justify-center pt-0 px-6 pb-6 rounded-lg shadow-md">
        <div className="logo-container">
          <img src="/assets/images/recap-logo.svg" alt="Recap logo" />
        </div>

        {/* Form background */}
        <div className="sm:w-420 flex-center flex-col">
          <h2 className="pt-2 mt-4 mb-3 text-clay-ash font-playball">
            share your favorite memories
          </h2>
          <p className="text-willow-grove small-medium md:base-regular underline font-playball bold">
            SIGN IN
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-64"
          >
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-willow-grove underline font-playball text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="shad-input text-white font-playball"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-willow-grove underline font-playball text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="shad-input text-black font-playball"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="shad-button_primary  text-willow-grove font-playball"
            >
              {isUserLoading ? (
                <div className="flex center">
                  Loading...
                  <Loader />
                </div>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-small font-playball text-willow-grove text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-willow-grove text-small underline font-playball text-center hover:text-clay-ash"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default SigninForm;
