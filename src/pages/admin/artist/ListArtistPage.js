import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtist } from "redux/apiRequest";
import Modal from "components/modal/Modal";
import { Button } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeadingOverView from "components/common/HeadingOverView";
import LayoutForm from "layout/LayoutForm";
import DatePicker from "react-date-picker";
const { default: axios } = require("api/axios");

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter your email"),
  phone: yup.string().required("Please enter your phone number"),
});

const ListArtistPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
  const admin = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const listArtist = useSelector((state) => state.artist.artists?.allArtist);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [value, onChange] = useState(new Date());

  const handleCreateAdmin = async (e) => {
    const artist = {
      username: watch("username"),
      password: watch("password"),
      firstName: watch("firstName"),
      lastName: watch("lastName"),
      nickName: watch("nickName"),
      dob: value,
      email: watch("email"),
      phone: watch("phone"),
    };
    try {
      await axios
        .post(`/artist`, artist, {
          headers: {
            Authorization: `Bearer ${admin?.admin_token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setShowModal(false);
          setCount(count + 1);
        });
      console.log(artist);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getAllArtist(admin?.admin_token, dispatch);
  }, [count]);
  localStorage.setItem("token", admin?.admin_token);
  const handleResetPassword = async (id) => {
    try {
      await axios.put(
        `/artist/reset/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${admin?.admin_token}`,
          },
        }
      );
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <HeadingOverView
        total={listArtist && listArtist?.length}
        type="artists"
      ></HeadingOverView>
      <Button
        className="text-white bg-blue-500"
        onClick={() => setShowModal(true)}
      >
        Create artist
      </Button>
      {listArtist && listArtist?.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Nick name</th>
              <th className="px-6 py-3">Revenue</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {listArtist.map((artist) => (
              <tr key={artist._id} className="bg-white border-b">
                <td className="px-6 py-4">{artist.username}</td>
                <td className="px-6 py-4">{artist.nickName || "Unknow"}</td>
                <td className="px-6 py-4">{artist.revenue || "0"}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleResetPassword(artist._id)}>
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <LayoutForm title="Create Artist">
          <form
            onSubmit={handleSubmit(handleCreateAdmin)}
            className="w-[80%] px-24"
            autoComplete="off"
          >
            <div className="flex gap-3">
              <FormGroup className="w-2/4">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  name="firstName"
                  placeholder="Enter your first name..."
                  control={control}
                  error={errors.firstName?.message}
                ></Input>
              </FormGroup>
              <FormGroup className="flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Enter your last name..."
                  control={control}
                  error={errors.lastName?.message}
                ></Input>
              </FormGroup>
            </div>
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
                error={errors.password?.message}
                type="password"
              ></Input>
            </FormGroup>

            <div className="flex gap-3">
              <FormGroup className="w-[60%]">
                <Label htmlFor="nickName">Nick name</Label>
                <Input
                  name="nickName"
                  placeholder="Enter your nick name..."
                  control={control}
                  error={errors.nickName?.message}
                ></Input>
              </FormGroup>
              <FormGroup className="flex-1">
                <Label htmlFor="dob">Birthday</Label>
                {/* <Input
                  type="date"
                  name="dob"
                  placeholder="Enter your birthday..."
                  control={control}
                  // error={errors.dob?.message}
                ></Input> */}
                <DatePicker
                  name="dob"
                  control={control}
                  onChange={onChange}
                  value={value}
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                placeholder="Enter your email..."
                control={control}
                error={errors.email?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                name="phone"
                placeholder="Enter your phone number..."
                control={control}
                error={errors.phone?.message}
              ></Input>
            </FormGroup>
            <Button type="submit" className="text-white bg-blue-500">
              Submit
            </Button>
          </form>
        </LayoutForm>
      </Modal>
    </>
  );
};

export default ListArtistPage;
