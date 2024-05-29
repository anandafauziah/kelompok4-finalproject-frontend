import Logo from "./Logo";
import { FaFacebook, FaInstagram, FaMapMarked } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-first flex flex-col py-12 px-5 shrink-0">
      <div className="flex justify-evenly gap-10 flex-wrap">
        <div className="flex flex-col text-xl text-second gap-y-5">
          <div className="brightness-200">
            <Logo size={100} />
          </div>
          <div className="flex items-center gap-x-3">
            <a href="">
              <FaFacebook />
            </a>
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaMapMarked />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-md text-third mb-1">Product & Service</div>
          <a href="" className="text-sm text-second">
            Products
          </a>
          <a href="" className="text-sm text-second">
            Services
          </a>
          <a href="" className="text-sm text-second">
            Lifestyle
          </a>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-md text-third mb-1">Support</div>
          <a href="" className="text-sm text-second">
            Contact
          </a>
          <a href="" className="text-sm text-second">
            Email us
          </a>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-md text-third mb-1">About</div>
          <a href="" className="text-sm text-second">
            About us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
