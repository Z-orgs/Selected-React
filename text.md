import { NavLink } from "react-router-dom";
import Modal from "./../../../components/modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateInfoArtist } from "redux/authSlice";
import \* as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "components/common/FormGroup";
import FileInput from "components/input/FileInput";
import LayoutForm from "layout/LayoutForm";
import { Label } from "components/label";
import { Input } from "components/input";
import DatePicker from "react-date-picker";
import { Button } from "components/button";
import { v4 } from "uuid";

const schema = yup.object({
// username: yup.string().required("Please enter your username"),
// password: yup.string().required("Please enter your password"),
//.min(8, "Your password must be at least 8 characters"),
});

const ArtistHomePage = () => {
const {
register,
control,
handleSubmit,
formState: { errors },
watch,
} = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
const infoArtist = useSelector((state) => state.auth.login?.currentUser);
const token = useSelector((state) => state.auth.login.token);
const [value, onChange] = useState(infoArtist.dob);
const dispatch = useDispatch();
const [artistData, setArtistData] = useState(infoArtist);
const [showModal, setShowModal] = useState(false);

const handleUpdateArtist = async (e) => {
const formData = new FormData();
formData.append("address", watch("address"));
formData.append("genre", watch("genre"));
formData.append("dob", value);
formData.append("email", watch("email"));
formData.append("phone", watch("phone"));
formData.append("nickName", watch("nickName"));
formData.append("firstName", watch("firstName"));
formData.append("lastName", watch("lastName"));
if (watch("image")) {
formData.append("image", watch("image"));
}

    formData.append(
      "socialLinks",
      JSON.stringify(
        artistData.socialLinks.filter(
          (item) => item.name !== "" && item.url !== ""
        )
      )
    );

    // console.log(artistData);
    await axios
      .put("http://localhost:3000/artist", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": artistData.image
            ? "multipart/form-data"
            : "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setShowModal(false);
        toast.success("Upate success!");
        dispatch(updateInfoArtist(response.data));
      })
      .catch((error) => toast.error("Update failed!"));

    // Update the artist data in the Redux store or perform any other necessary actions
    // ...

};

const handleInputChange = (field, value) => {
setArtistData((prevData) => ({
...prevData,
[field]: value,
}));
};

const handleAddSocialLink = () => {
setArtistData((prevData) => ({
...prevData,
socialLinks: [...prevData.socialLinks, { name: "", url: "" }],
}));
};

const handleSocialLinkChange = (index, field, value) => {
setArtistData((prevData) => {
const updatedSocialLinks = [...prevData.socialLinks];
updatedSocialLinks[index][field] = value;
return {
...prevData,
socialLinks: updatedSocialLinks,
};
});
};

return (
<>
<div>Artist Home Page</div>
<div>
<button>
<NavLink to={"/artist/change-password"}>Change password</NavLink>
</button>
<br />
<button onClick={() => setShowModal(true)}>Update</button>

        <Modal
          show={showModal}
          heading="Update"
          onClose={() => setShowModal(false)}
        >
          <LayoutForm title="Update Profile">
            <form
              onSubmit={handleSubmit(handleUpdateArtist)}
              autoComplete="off"
            >
              <FormGroup>
                <FileInput control={control} name="image"></FileInput>
              </FormGroup>
              <div className="flex justify-between gap-4">
                <FormGroup className="w-[50%]">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    control={control}
                    placeholder="Enter firt name..."
                    defaultValue={infoArtist.firstName}
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    name="lastName"
                    control={control}
                    defaultValue={infoArtist.lastName}
                    placeholder="Enter your last name..."
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex justify-between gap-4">
                <FormGroup className="w-[60%]">
                  <Label htmlFor="nickName">Nick name</Label>
                  <Input
                    name="nickName"
                    control={control}
                    defaultValue={infoArtist.nickName}
                    placeholder="Enter your nick name..."
                  ></Input>
                </FormGroup>
                <FormGroup className="flex-1">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    name="genre"
                    control={control}
                    placeholder="Enter your genre..."
                    defaultValue={infoArtist.genre}
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex justify-between gap-3">
                <FormGroup className="w-[50%]">
                  <Label htmlFor="dob">Date of birthday</Label>
                  <DatePicker
                    name="dob"
                    control={control}
                    onChange={onChange}
                    value={value}
                  />{" "}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    name="phone"
                    control={control}
                    placeholder="Enter your phone number..."
                    defaultValue={infoArtist.phone}
                  ></Input>
                </FormGroup>
              </div>
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  name="address"
                  control={control}
                  placeholder="Enter your address..."
                  defaultValue={infoArtist.address}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email address</Label>
                <Input
                  name="email"
                  control={control}
                  placeholder="Enter your email address..."
                  defaultValue={infoArtist.email}
                ></Input>
              </FormGroup>
              <div className="flex items-center justify-between mb-2">
                <Label>Socials</Label>
                <span
                  onClick={handleAddSocialLink}
                  className="rounded-md cursor-pointer bg-primary-gradient"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col max-h-[200px] p-1 border-2 border-primary rounded-md mb-5">
                <div className="flex flex-col h-full p-2 overflow-auto">
                  {artistData.socialLinks.map((link, index) => (
                    <div key={v4()} className="flex gap-3">
                      <FormGroup className="w-[30%]">
                        <Label>Name</Label>
                        <input
                          className="input-text"
                          type="text"
                          name={`socialName-${index}`}
                          value={link.name}
                          onChange={(e) =>
                            handleSocialLinkChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup className="flex-1">
                        <Label>Link</Label>
                        <input
                          className="input-text"
                          type="text"
                          name={`socialURL-${index}`}
                          value={link.url}
                          onChange={(e) =>
                            handleSocialLinkChange(index, "url", e.target.value)
                          }
                        />
                      </FormGroup>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit">Update</Button>
            </form>
          </LayoutForm>
        </Modal>
        <br />
        <button>
          <NavLink to={"/artist/track"}>Track</NavLink>
        </button>
        <br />
        <button>
          <NavLink to={"/artist/album"}>Album</NavLink>
        </button>
      </div>
    </>

);
};

export default ArtistHomePage;
