import { FaHeart, FaEye, FaBookmark } from "react-icons/fa";
import { useState } from "react";
import "../App.css";

const ProductCard = (props) => {
  const { name = "Product Name", price = 100, imageUrl = "https://cartzio.vercel.app/static/media/mens-jecket.6f68430ae5803d37f883.jpg" } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <div className="flex flex-col justify-center max-w-xs h-[450px] w-[350px]" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
      <div className={`relative w-full h-full border rounded-md`}>
        <img className={`w-full h-full ${isHovered ? "scale-[103%] duration-700" : ""}`} src={imageUrl} alt={name} />
        <div className={`absolute flex flex-col gap-1 top-5 right-5 ${isHovered ? "" : "hidden"}`}>
          <a className="rounded-full p-3 border bg-white hover:bg-black hover:text-white duration-700" href="">
            <FaHeart />
          </a>
          <a className="rounded-full p-3 border bg-white hover:bg-black hover:text-white duration-700" href={`/product/${slugify(name)}`}>
            <FaEye />
          </a>
          <a className="rounded-full p-3 border bg-white hover:bg-black hover:text-white duration-700" href="">
            <FaBookmark />
          </a>
        </div>
        <button className={`absolute bottom-5 left-10 w-3/4 p-2 bg-black text-white font-semibold rounded-md ${isHovered ? "slide-up" : "hidden"}`}>Add to Cart</button>
      </div>
      <div className="p-2">
        <a href={`/product/${slugify(name)}`} className="text-lg font-semibold duration-700 hover:text-yellow-600">
          {name}
        </a>
        <div className="">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
