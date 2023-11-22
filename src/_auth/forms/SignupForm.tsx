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
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import {
  useCreateUserAccount,
  useSigninAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const {
    mutateAsync: createUserAccount,
    isPending: isCreatingAccount,
  } = useCreateUserAccount();

  const {
    mutateAsync: signinAccount,
    isPending: isSigningIn,
  } = useSigninAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign up failed, please try again",
      });
    }
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
          <h2 className="pt-2 mt-3 mb-3 text-dark-red font-playball">
            share your favorite memories
          </h2>
          <p className="text-dark-red small-medium md:base-regular underline font-playball bold">
            SIGN UP
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-64"
          >
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark-red underline font-playball text-sm">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input text-darker-red font-playball"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark-red underline font-playball text-sm">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input text-darker-red font-playball"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark-red underline font-playball text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="shad-input text-darker-red font-playball"
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
                  <FormLabel className="text-dark-red underline font-playball text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="shad-input text-darker-red font-playball"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="shad-button_primary  text-dark-red font-playball"
            >
              {isCreatingAccount ? (
                <div className="flex center gap-2">
                  Loading...
                  <Loader />
                </div>
              ) : (
                "Register"
              )}
            </Button>

            <p className="text-small font-playball text-   text-center">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-dark-red text-small underline font-playball text-center"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
