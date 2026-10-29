import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Compass } from "lucide-react";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import axios from "axios";



export default function Register() {

    const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit=async(event)=> {

  
    event.preventDefault();

    setMessage("");

    try{
      const response = await axios.post("http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      )
        setIsSuccess(true);
     
      setMessage(response.data.message)
      navigate("/dashboard");
    }
    catch(error){
        setIsSuccess(false);
        console.log(error)


      setMessage(error.response?.data?.message || "register failed")
    }

    


  }
    

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-to-br from-violet-950 to-violet-700 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold">
          <Compass size={28} /> CareerPilot AI
        </Link>

        <div className="max-w-lg">
          <h1 className="text-5xl font-extrabold leading-tight">
            Build a career path that feels like yours.
          </h1>
          <p className="mt-5 leading-7 text-violet-100">
            Discover opportunities, strengthen your profile, and plan your next step.
          </p>
        </div>

        <p className="text-sm text-violet-200">
          Start your next chapter today.
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 font-bold lg:hidden">
            <Compass className="text-violet-600" /> CareerPilot AI
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Get started
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Set up your career workspace.
          </p>

          <div className="mt-7 space-y-4">
            <Input
              label="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
              required
            />

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              autoComplete="new-password"
              required
            />

            <Button type="submit" className="w-full">
              Create account
            </Button>

            
{message && (
  <p
    role="status"
    className={`rounded-xl p-3 text-center text-sm font-bold ${
      isSuccess
        ? "bg-green-50 text-green-700"
        : "bg-red-50 text-red-700"
    }`}
  >
    {message}
  </p>
)}


          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-violet-600">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}