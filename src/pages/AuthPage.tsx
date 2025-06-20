import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import AppHeader from '@/components/layout/AppHeader'; // Custom component
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Explicitly used as per layout
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"; // For notifications

// Doraemon theme colors
const DORAEMON_PRIMARY_BLUE = "bg-sky-500 hover:bg-sky-600";
const DORAEMON_TEXT_BLUE = "text-sky-600";
const DORAEMON_ACTIVE_TAB_BG = "data-[state=active]:bg-sky-100";
const DORAEMON_ACTIVE_TAB_TEXT = "data-[state=active]:text-sky-700";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters."}),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // path of error
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  console.log('AuthPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // Simulate API call
    toast({
      title: "Login Successful!",
      description: `Welcome back, ${data.email}! Redirecting...`,
    });
    setTimeout(() => {
      navigate('/home'); // Navigate to home page as per App.tsx routes
    }, 1500);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
    // Simulate API call
    toast({
      title: "Registration Successful!",
      description: `Welcome, ${data.username}! You can now log in.`,
    });
    // Optionally navigate to login tab or directly to home after auto-login
    // For now, just clear form and stay on AuthPage (user can switch to login)
    registerForm.reset();
    // Or, if auto-login after registration:
    // setTimeout(() => navigate('/home'), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <AppHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md shadow-xl border-blue-200">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className={`${DORAEMON_ACTIVE_TAB_BG} ${DORAEMON_ACTIVE_TAB_TEXT}`}>Login</TabsTrigger>
              <TabsTrigger value="register" className={`${DORAEMON_ACTIVE_TAB_BG} ${DORAEMON_ACTIVE_TAB_TEXT}`}>Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className={`text-2xl ${DORAEMON_TEXT_BLUE}`}>Welcome Back!</CardTitle>
                <CardDescription>Login to access your DoraTunes.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="nobita@doraemon.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className={`w-full ${DORAEMON_PRIMARY_BLUE} text-white`}>
                      Login
                    </Button>
                  </form>
                </Form>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Forgot your password?{' '}
                  <Link to="#" className={`underline ${DORAEMON_TEXT_BLUE} hover:text-sky-700`}>
                    Reset it
                  </Link>
                </p>
              </CardContent>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className={`text-2xl ${DORAEMON_TEXT_BLUE}`}>Create Account</CardTitle>
                <CardDescription>Join DoraTunes and start your musical journey.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="dora_fan_01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="shizuka@doraemon.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className={`w-full ${DORAEMON_PRIMARY_BLUE} text-white`}>
                      Create Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default AuthPage;