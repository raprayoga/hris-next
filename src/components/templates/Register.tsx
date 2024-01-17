import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/modules/RegisterForm";
import illustrasiLogin from "@/assets/images/illustration/Illustrasi-Login.png";

export default function Register() {
  return (
    <div className="p-0 m-0 flex justify-between h-screen w-screen">
      <div className="w-1/2 flex items-center justify-center">
        <RegisterForm className="max-w-[500px]" />
      </div>
      <Image src={illustrasiLogin} alt="illustration" className="w-1/2" />
    </div>
  );
}
