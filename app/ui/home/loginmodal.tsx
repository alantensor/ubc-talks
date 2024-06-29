
import React from "react";
import { signIn } from "next-auth/react";




const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative flex flex-col items-center p-8">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4">Welcome to UBC Courses!</h3>
        <button
          className="btn flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => signIn("google", { callbackUrl: "/home" })}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
