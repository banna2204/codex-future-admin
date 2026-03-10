import axios from "axios";
import React, { useEffect, useState } from "react";
import { Clock, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AllCourse = () => {
  const LIMIT = 3;
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadCourse = async (pageNum) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://codex-future.onrender.com/api/course?page=${pageNum}&limit=${LIMIT}`,
      );
      setCourses(res.data.courses);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error loading courses:", error);
    }finally{
      setTimeout(() => {
      setLoading(false);
    }, 800);
  }
  };

  useEffect(() => {
    loadCourse(page);
  }, [page]);

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://codex-future.onrender.com/api/course/delete/${id}`,
    );
    loadCourse();
    toast.success(res.data.message);
  };

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
        <>
          <div className="gap-9 md:px-10 px-2 mt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(courses) &&
              courses
              .slice()
              .reverse()
              .map((course, index) => (
                <div
                key={course._id}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-400 group transition-all duration-500 md:p-6 p-3 gap-2 flex flex-col  hover:shadow-[10px_10px_0px_#cbd5e1]"
                >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        className="w-full h-full md:object-cover transform  transition-transform duration-700 rounded-xl"
                        src={course.image}
                        alt={course.title}
                        />
                      <div className="absolute px-3 py-1 rounded-full bg-slate-200 text-xs  font-bold top-5 right-4 flex justify-center items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={13}/>  
                      {course.rating}</div>
                    </div>
                    <div className="p-1 text-slate-500 text-xs bg-slate-200 w-fit rounded-full ">
                      Master Program
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-amber-400 transition-all duration-300">
                      {course.title}
                    </h2>
                    <div className="text-slate-600">{course.detail}</div>
                    <div className="flex justify-between">
                      <div className="flex gap-1 items-center text-slate-500">
                        <Users className="w-4 h-4" />
                        <span>{course.students} Students</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration} Month</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Link to={"/courses"}
                      state={{course}}
                      className="mt-3 flex gap-3 items-center  hover:bg-[#ffc107] text-black font-semibold text-md px-6 py-1 rounded-full shadow-[3px_3px_0px_#cbd5e1] transition-all hover:shadow-[0px_0px_0px_#000] duration-300 ">
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          handleDelete(course._id);
                        }}
                        className="text-slate-700 mt-3 flex gap-3 items-center hover:bg-[#ffc107] hover:text-black font-semibold text-md px-6 py-1 rounded-full shadow-[3px_3px_0px_#cbd5e1] transition-all hover:shadow-[0px_0px_0px_#000] duration-300">
                        Delete
                      </button>
                    </div>
                  </div>
            ))}
          </div>
          <div className=" flex justify-center items-center gap-5 mt-10 cursor-pointer">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <p
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 rounded border border-slate-300 
                  ${page === pageNumber ? "bg-black text-white" : "bg-white text-black"}
                  `}
                  >
                        {pageNumber}
                      </p>
                    ),
            )}
          </div>
        </>
        )}
        </>
        );
};
      
      export default AllCourse;
      