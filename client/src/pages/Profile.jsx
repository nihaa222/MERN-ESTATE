import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

//firebase storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 &&
// request.resource.contentType.matches('image/*');

const Profile = () => {
  const fileref = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setfile] = useState();

  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePer, setfilePer] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(filePer);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(formData);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setfilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileref}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileref.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="h-24 w-24 rounded-full object-cover cursor-pointer m-2 self-center "
        ></img>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (image must be less that 2 mb)
            </span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePer}%`}</span>
          ) : filePer === 100 ? (
            <span className="text-green-700">Image Successfully uploaded</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg uppercase hover:opaity-95 disabled:opacity-80 p-3">
          update
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
