import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../../redux/apiRequest";
import axios from "axios";
import Modal from "../../../components/modal/Modal";
import { Button } from "../../../components/button";
import { Label } from "../../../components/label";
import FormGroup from "../../../components/common/FormGroup";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
  // .min(8, "Your password must be at least 8 characters"),
});

const ListAdminPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.admin.admins?.allAdmins);
  const [showModal, setShowModal] = useState(false);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLasttName] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [showForm, setShowForm] = useState(false);
  const handleCreateAdmin = async () => {
    const ad = {
      username: watch("username"),
      password: watch("password"),
      firstName: watch("firstName"),
      lastName: watch("lastName"),
    };
    try {
      // setTypeModal("form");
      await axios
        .post(`http://localhost:3000/admin/`, ad, {
          headers: {
            Authorization: `Bearer ${admin?.data?.admin_token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setShowModal(false);
        });
      console.log(admin);
    } catch (e) {
      alert(e);
    }
  };
  const handleResetPassword = async (id) => {
    const res = await axios.put(
      `http://localhost:3000/admin/${id}`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${admin?.data?.admin_token}`,
        },
      }
    );
    console.log(res);
  };
  console.log(watch("username"));
  useEffect(() => {
    getAllAdmins(admin?.data?.admin_token, dispatch);
  }, [list]);
  localStorage.setItem("token", admin?.data?.admin_token);
  return (
    <div className="flex">
      <div className="flex-1">
        <Button
          className="text-white bg-blue-500"
          onClick={() => {
            setShowModal(true);
            // setShowForm(!showForm);
          }}
        >
          Create Admin
        </Button>
        {list && list.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((ad) => (
                <tr key={ad._id} className="bg-white border-b">
                  <td className="px-6 py-4">{ad.username || "Unknown"}</td>
                  <td className="px-6 py-4">{ad.firstName || "Unknown"}</td>
                  <td className="px-6 py-4">{ad.lastName || "Unknown"}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleResetPassword(ad._id)}>
                      Reset password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nothing</p>
        )}
      </div>

      <Modal
        show={showModal}
        heading="Create admin"
        onClose={() => setShowModal(false)}
      >
        <form
          onSubmit={handleSubmit(handleCreateAdmin)}
          className="w-[960px] px-24"
          autoComplete="off"
        >
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              placeholder="Enter your username..."
              control={control}
              error={errors.username?.message}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              placeholder="Enter your password..."
              control={control}
              error={errors.username?.message}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              name="firstName"
              placeholder="Enter your first name..."
              control={control}
              error={errors.username?.message}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              name="lastName"
              placeholder="Enter your last name..."
              control={control}
              error={errors.username?.message}
            ></Input>
          </FormGroup>
          <Button type="submit" className="text-white bg-blue-500">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ListAdminPage;
