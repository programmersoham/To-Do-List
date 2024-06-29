import { LoginForm } from "wasp/client/auth";
import { Link } from "wasp/client/router";

export function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <LoginForm />
        <br />
        <span>
          I don't have an account yet (<Link to="/signup" className="text-blue-500">go to signup</Link>).
        </span>
      </div>
    </main>
  );
}
