import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Test from "../components/Navbar";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";
import GoogleAuth from "../components/GoogleAuth";
// import Cookies from "js-cookie";

const Login = () => {
  const [register, setRegister] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("soulUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role == "user") {
        navigate(`/`);
      }
      if (user.role == "pro") {
        navigate("/therapist");
      }
    }
  }, []);

  const { login, loading } = useLogin();
  const { registeration, registerLoading } = useRegister();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleRegisteration = (e) => {
    e.preventDefault();
    registeration(
      fName,
      lName,
      email,
      confirmPassword,
      password,
      gender,
      setRegister
    );
  };

  return (
    <div className="max-h-screen overflow-y-hidden">
      {/* <Navbar/> */}
      <Test />
      {!register ? (
        <div className="MainLogin">
          <div className="quote max-lg:hidden">
            <h1 style={{ paddingBottom: "1%" }}>
              <q>
                It is during our darkest moments that we must focus to see the
                light.
              </q>
            </h1>
            <p>
              <em>Aristotle Onassis</em>
            </p>
          </div>
          <div className="coverrrr flex gap-y-6 p-3 max-lg:min-w-96 max-sm:min-w-72">
            <form
              onSubmit={handleLogin}
              className="flex gap-5 flex-col w-full items-center"
            >
              <h1 className="text-lg mt-2 mb-1 font-bold">Login </h1>
              <input
                className="border border-none bg-gray-50 w-full rounded-md text-center p-3 text-base"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="border border-none bg-gray-50 w-full text-center p-3 text-base rounded-md"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                className="loooginButton"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <GoogleAuth />
            </form>

            <div className="altLogin mt-1 mb-1">
              <p className="text-sm">Not Registered?</p>
              <p>
                <Link
                  to=""
                  className="italic underline text-blue-600"
                  onClick={() => setRegister(true)}
                >
                  {" "}
                  Click here to Register!
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="MainLogin max-sm:overflow-y-scroll">
          <div className="quote max-lg:hidden">
            <h1 style={{ paddingBottom: "1%" }}>
              <q>
                It is during our darkest moments that we must focus to see the
                light.
              </q>
            </h1>
            <p>
              <em>Aristotle Onassis</em>
            </p>
          </div>
          <div className="coverrrr coverrrr flex gap-y-4 p-3 max-lg:min-w-96 max-sm:min-w-72">
            <form
              onSubmit={handleRegisteration}
              className="flex gap-5 flex-col w-full items-center"
            >
              <h1 className="text-lg mt-2 mb-1 font-bold">Register</h1>
              <div className="flex max-lg:flex-col justify-between gap-3 w-full">
                <input
                  className="border border-none bg-50  max-lg:w-full rounded-sm text-center p-2 text-sm"
                  type="text"
                  placeholder="First Name"
                  value={fName}
                  onChange={(e) => setfName(e.target.value)}
                />
                <input
                  className="border border-none bg-gray-50  max-lg:w-full rounded-sm text-center p-2 text-sm"
                  type="text"
                  placeholder="Last Name"
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                />
              </div>

              <input
                className="border border-none bg-gray-50  w-full rounded-sm text-center p-2 text-sm"
                type="email"
                placeholder="johndoe@yahoo.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                name="gender"
                id="gender"
                className="border border-none bg-gray-50  w-full rounded-sm text-center p-2 text-sm"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                className="border border-none bg-gray-50 w-full rounded-sm text-center p-2 text-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                className="border border-none bg-gray-50 w-full rounded-sm text-center p-2 text-sm"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                className="loooginButton "
                type="submit"
                disabled={registerLoading}
              >
                {registerLoading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="altLogin mt-1 mb-1">
              <p className="text-sm">
                Already Registered?
                <Link
                  to=""
                  className="italic underline text-blue-600"
                  onClick={() => setRegister(false)}
                >
                  {" "}
                  Click here to Login!
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
