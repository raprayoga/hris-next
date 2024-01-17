import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { cn } from "@/utils";
import { Input, InputGroup } from "@/components/elements/InputGroup";
import Button from "@/components/elements/Button";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import profilePhoto from "@/assets/images/illustration/Profile-Photo.png";
import { useDispatch, useSelector } from "react-redux";
import { sliceState } from "@/interface/state";
import { Dispatch } from "@reduxjs/toolkit";
import { logout } from "@/store/auth";
import { profileAsync } from "@/store/user";

export function AccountProfile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const userData = useSelector((state: sliceState) => state.user.data?.user);

  const handleToEdit = () => {
    router.push("/account/edit");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(profileAsync());
  }, [dispatch]);

  return (
    <div {...props} className={cn("text-center w-1/2 mx-auto", className)}>
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="relative">
          <Image
            src={profilePhoto}
            alt="logo"
            width={125}
            height={125}
            className="w-[125px] h-[125px] rounded-full"
          />
        </div>
        <h2 className="ml-1 text-3xl text-center font-semibold mt-5">
          {userData?.name}
        </h2>
      </div>

      <div>
        <InputGroup className="w-full">
          <AtSymbolIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            name="email"
            className="pl-6"
            placeholder="email"
            value={userData?.email}
            readOnly
          />
        </InputGroup>

        <InputGroup className="w-full mt-8">
          <UserIcon className="absolute left-2 right-auto w-3 stroke-2 text-gray" />
          <Input
            name="first_name"
            placeholder="name"
            className="pl-6"
            value={userData?.name}
            readOnly
          />
        </InputGroup>

        <Button theme="primary" className="w-full mt-8" onClick={handleToEdit}>
          Edit Profile
        </Button>

        <Button
          theme="primary"
          variant="ghost"
          className="w-full mt-8"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
