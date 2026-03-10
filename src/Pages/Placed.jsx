import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

const Placed = () => {
  const [info, setInfo] = useState({
    name: "",
    salary: "",
    roll: "",
    company: "",
  });
  const [img, setImg] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!info.name || !info.salary || !info.roll || !info.company) {
        return toast.error("Please complete fields!!");
      }

      const formData = new FormData();

      Object.keys(info).forEach((key) => {
        formData.append(key, info[key]);
      });

      if (!img) return toast.error("Please Select Image!!");

      formData.append("image", img);

      const res = await axios.post(
        "https://codex-future.onrender.com/api/placed/",
        formData,
      );
      setInfo({ name: "", salary: "", roll: "", company: "" });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!!");
    } 

  };

  const loadStudent = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://codex-future.onrender.com/api/placed/");
      setImages(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!!");
    } finally {
      setTimeout(() => {
      setLoading(false);
    }, 500);
    }
  }

  useEffect(() => {
    loadStudent();
  }, [info]);

  return (
    <>    {loading ? (
        <Loader />
      ) : (
    <div className="flex flex-col gap-8 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full  overflow-hidden bg-white pb-44 mt-28 pt-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 text-center">
        <span className="text-accent">Placed</span> Students
        </h2>
        <div className="marquee flex w-max gap-8 px-8 mt-20">
          {[...images, ...images, ...images].map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-2 h-64 w-52 items-center justify-center rounded-xl bg-white shadow-md hover:scale-105 duration-300 border border-slate-100 "
            >
              <img
                src={image.image}
                alt="placed student"
                className="h-20 w-20 rounded-full border-4 border-white object-cover"
              />

              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-semibold shadow">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                {image.salary} LPA
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base font-semibold text-slate-900">
                  {image.name}
                </h3>

                <p className="mt-1 text-sm text-slate-600 font-medium">
                  {image.roll}
                </p>

                <p className="text-sm text-slate-500">
                  At{" "}
                  <span className="font-medium text-slate-700">
                    {image.company}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
          <hr />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center md:container md:mx-auto  md:w-1/2 mt-12 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm "
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Add Placed Student
        </h2>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 p-10">
          <input
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            name="name"
            value={info.name}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          <input
            type="text"
            placeholder="Enter salary / per annum"
            max={5}
            onChange={handleChange}
            name="salary"
            value={info.salary}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          <input
            type="text"
            placeholder="Enter Specialization"
            onChange={handleChange}
            name="roll"
            value={info.roll}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          <input
            type="text"
            placeholder="Enter Company"
            onChange={handleChange}
            name="company"
            value={info.company}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          <input
            type="file"
            name="image"
            onChange={(e) => setImg(e.target.files[0])}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />

          
        </div>
        <button
          type="submit"
          className="w-1/2 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create
        </button>
      </form>
    </div>
    )}
    </>
  );
};

export default Placed;
