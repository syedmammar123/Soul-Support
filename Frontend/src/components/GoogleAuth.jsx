import useGoogleLogin from "../hooks/useGoogleLogin";

const GoogleAuth = () => {
  const { googleLogin, error,loading } = useGoogleLogin();

  const handleGoogleClick = () => {
    googleLogin();
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        disabled={loading}
        className="bg-red-600 text-white p-1 px-2 text-sm rounded-lg uppercase hover:opacity-95 transition-transform transform hover:scale-105 duration-300"
      >
        {loading ? "Loading..." : "Continue with google"}
      </button>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </>
  );
};

export default GoogleAuth;
