import LoginComponent from "../components/LoginComponent";

const LoginPage = () => {
  return (
    <main className="w-screen h-screen flex flex-col gap-16 justify-center  items-center">
      <h1 className="text-white mainFont text-5xl max-md:text-4xl">
        Pinkterest
      </h1>
      <LoginComponent />;
    </main>
  );
};

export default LoginPage;
