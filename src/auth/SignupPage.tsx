import { SignupForm } from "wasp/client/auth";

import { Link } from "wasp/client/router";


export function SignupPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <SignupForm />
        <br />
        <span>
          I already have an account (<Link to="/login" className="text-blue-500">go to login</Link>).
        </span>
      </div>
    </main>
  );
}