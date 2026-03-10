import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Address = () => {
  const [address, setAddress] = useState("");
  const [allAddress, setAllAddress] = useState([]);

  const loadAddress = async () => {
    try {
      const res = await axios.get('https://codex-future.onrender.com/api/address/');
      setAllAddress(res.data.addresses);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(()=>{
    loadAddress();
  },[address])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://codex-future.onrender.com/api/address/createAddress",
        { address },
      );

      toast.success(res.data.message);
      setAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://codex-future.onrender.com/api/address/delete/${id}`,
    );
    loadAddress();
    toast.success(res.data.message);
  }

  return (
    <div className="flex md:flex-row flex-col w-full md:gap-10 gap-3 md:p-10 p-4">
      <div className="md:px-10  py-7 mt-32 container mx-auto border border-slate-300 p-5 md:w-1/2 w-full gap-4 flex flex-col rounded-lg h-96 overflow-scroll noScrollBar">
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          All Address
        </h2>
        {
          allAddress.map(address => (
            <div key={address._id} className="border border-slate-400 p-2 w-full rounded-lg">
              <div>{address.address}</div>
              <div className="flex items-end justify-end mt-3">
                <button
                  onClick={() => {
                    handleDelete(address._id);
                  }}
                  className="text-slate-700 mt-3 flex gap-3 items-center hover:bg-[#ffc107] hover:text-black font-semibold text-md px-6 py-1 rounded-full shadow-[3px_3px_0px_#cbd5e1] transition-all hover:shadow-[0px_0px_0px_#000] duration-300 "
                >
                  Delete
                </button>
              </div>
            
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="md:px-10 py-7 mt-32 container mx-auto border border-slate-300 p-5 md:w-1/2 w-full gap-4 flex flex-col rounded-lg h-fit pb-16"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Add Address
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-600">
            Address
          </label>
          <textarea
            placeholder="Enter Full Address"
            cols={50}
            rows={4}
            value={address}
            className="outline-none border border-slate-300 p-5 resize-none rounded-lg"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default Address;
