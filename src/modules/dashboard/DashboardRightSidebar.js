import React, { useState } from "react";
import { IconLogout } from "../../components/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../../components/label";
import FormGroup from "../../components/common/FormGroup";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

const schema = yup.object({
  password: yup.string().required("Please enter your username"),
  newPassword: yup.string().required("Please enter your password"),
  confirmNewPassword: yup.string().required("Please enter your password"),
  // .min(8, "Your password must be at least 8 characters"),
});

const DashboardRightSidebar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login);
  const [showModal, setShowModal] = useState(false);
  const ad = useSelector((state) => state.auth.login?.currentUser);

  const handleChangePassword = async (e) => {
    const pass = {
      password: watch("password"),
      newPassword: watch("newPassword"),
      confirmNewPassword: watch("confirmNewPassword"),
    };
    try {
      await axios
        .put(`http://localhost:3000/admin`, pass, {
          headers: {
            Authorization: `Bearer ${ad?.data?.admin_token}`,
          },
        })
        .then((response) => {
          console.log(response.message);
        });
    } catch (e) {
      alert(e);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-between flex-1 flex-shrink-0 px-4 py-12 ml-4 border-l border-gray-300">
      <div>
        <div className="relative rounded-full w-[80px] m-auto">
          <img src="/avt.jpg" alt="" className="object-cover rounded-full" />
          <span className="absolute w-[20px] h-[20px] bg-green-500 block rounded-full border-2 border-white top-0 right-0"></span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Unknown</h3>
          <p>{user.role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-[64px]">
        <div className="font-semibold">
          <span
            onClick={() => setShowModal(true)}
            className="block p-4 bg-black rounded-full cursor-pointer"
          >
            <svg
              className="fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z" />
            </svg>
          </span>
          Change Password
        </div>
        <div className="font-semibold">
          <span
            onClick={handleLogout}
            className="block p-4 bg-black rounded-full cursor-pointer"
          >
            <IconLogout className="fill-white"></IconLogout>
          </span>
          Sign out
        </div>
      </div>
      <Modal
        show={showModal}
        heading="Create admin"
        onClose={() => setShowModal(false)}
      >
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="w-[960px] px-24"
          autoComplete="off"
        >
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              placeholder="Enter current password..."
              control={control}
              error={errors.password?.message}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="newPassword">New password</Label>
            <Input
              name="newPassword"
              placeholder="Enter new password..."
              control={control}
              error={errors.newPassword?.message}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmNewPassword">Comfirm new password</Label>
            <Input
              name="confirmNewPassword"
              placeholder="Confirm password..."
              control={control}
              error={errors.confirmNewPassword?.message}
            ></Input>
          </FormGroup>
          <Button>Submit</Button>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardRightSidebar;
