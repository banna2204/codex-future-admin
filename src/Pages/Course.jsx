import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const location = useLocation();
  const editCourse = location.state?.course;
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    rating: "",
    students: "",
    duration: "",
    detail: "",
  });

  const [file, setFile] = useState(null);

  useEffect(()=>{
    if(editCourse){
      setCourse({
        title:editCourse.title,
        rating:editCourse.rating,
        students:editCourse.students,
        duration:editCourse.duration,
        detail:editCourse.detail,
    })
    }
  },[editCourse])

  const handleChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if(!course.title || !course.rating || !course.students || !course.duration || !course.detail){
        return toast.error("Please complete fields!!")
      }

      const formData = new FormData();

      Object.keys(course).forEach((key) => {
        formData.append(key, course[key]);
      });

      if (file) {
        formData.append("image", file);
      }

      if(!file) return toast.error("Please select image!!")

      if(editCourse){
        const res = await axios.put(`https://codex-future.onrender.com/api/course/update/${editCourse._id}`,
        formData);
        
        toast.success(res.data.message);
      }else{
        const res = await axios.post("https://codex-future.onrender.com/api/course",
          formData,
        );
        toast.success(res.data.message);
      }
      navigate('/');

      setCourse({
        title: "",
        rating: "",
        students: "",
        duration: "",
        price: "",
        detail: "",
      });
      setFile(null);
    } catch (error) {
       toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center md:container md:mx-auto  md:w-1/2 mt-36 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
        {editCourse ? "Update Course" : "Add Course"}
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 p-10">
        <input
          type="text"
          placeholder="Enter Title"
          onChange={handleChange}
          name="title"
          value={course.title}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="number"
          placeholder="Enter rating"
          max={5}
          onChange={handleChange}
          name="rating"
          value={course.rating}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="text"
          placeholder="Enter students"
          onChange={handleChange}
          name="students"
          value={course.students}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="text"
          placeholder="Enter duration"
          onChange={handleChange}
          name="duration"
          value={course.duration}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />

        <textarea
          name="detail"
          cols={40}
          rows={1}
          onChange={handleChange}
          value={course.detail}
          placeholder="Enter detail about the course!! "
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-1/2 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {editCourse ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default Course;
