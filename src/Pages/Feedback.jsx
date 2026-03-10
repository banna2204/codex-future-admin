import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://codex-future.onrender.com/api/feedback");
      setFeedback(res.data.feedback);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!!");
    } finally {
      setTimeout(() => {
      setLoading(false);
    }, 500);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://codex-future.onrender.com/api/feedback/delete/${id}`,
    );
    loadFeedback();
    toast.success(res.data.message);
  };

  return (
    <> {loading ? <Loader/> : (
    <div className="mt-32 md:p-10 p-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-10">
      {feedback.map((feed) => (
        <div
          key={feed._id}
          className="bg-white p-5 shadow-md rounded-xl border border-slate-200 "
        >
          <div>{feed.feedback}</div>
          <div className="h-px bg-gray-400 my-4"></div>
          <div className="flex justify-between items-center">
            <div className="mt-3 font-semibold">{feed.name}</div>
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-end mt-3">
            <button
              onClick={() => {
                handleDelete(feed._id);
              }}
              className="text-slate-700 mt-3 flex gap-3 items-center hover:bg-[#ffc107] hover:text-black font-semibold text-md px-6 py-1 rounded-full shadow-[3px_3px_0px_#cbd5e1] transition-all hover:shadow-[0px_0px_0px_#000] duration-300 "
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    )}
    </>
  );
};

export default Feedback;
