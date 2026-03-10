import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed left-0 w-full z-50 shadow-sm border-b border-slate-100 top-0 bg-white py-5 mb-20 px-3 md:px-16 flex justify-between items-center`}
      >
        <Link to="/" className="flex items-center justify-center gap-2 group">
          <div className=" p-2 rounded-lg  transition-colors">
            <img className="w-64 " src="/whitelogo.png" alt="image" />
          </div>
        </Link>

        <div className="flex gap-5">
          <Link
           className="hidden md:flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
            to={"/allcourse"}
          >
            All Course{" "}
          </Link>

          <Link
           className="hidden md:flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
            to={"/courses"}
          >
            Add Course{" "}
          </Link>

          <Link
            className="hidden md:flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
            to={"/feedback"}
          >
            Feedbacks{" "}
          </Link>

          <Link
            className="hidden md:flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
            to={"/address"}
          >
            Address{" "}
          </Link>

          <Link
            className="hidden md:flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
            to={"/placed"}
          >
            Placed{" "}
          </Link>
        </div>

        <button
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            <Link
              className="w-fit flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              to={"/courses"}
            >
              Add Course{" "}
            </Link>

            <Link
              className="w-fit flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
              to={"/feedback"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Feedbacks{" "}
            </Link>

            <Link
              className="w-fit flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"
              to={"/address"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Address{" "}
            </Link>

            <Link
              className="w-fit flex items-center border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300"w-fit 
              to={"/placed"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Placed{" "}
            </Link>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Header;
