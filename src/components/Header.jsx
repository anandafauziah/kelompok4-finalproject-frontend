import Navbar from "./Navbar";

const Header = (props) => {
  const { title = "Products" } = props;
  return (
    <div className="flex flex-col w-full bg-third gap-y-8 pb-10">
      <Navbar />
      <div className="w-full px-5 md:px-24 md:w-3/4">
        <div className="text-2xl text-first mb-5 font-bold">{title}</div>
        {/* <div className="flex flex-wrap gap-x-1 text-sm">
          <a className="duration-500 hover:text-main" href="/">
            Home
          </a>
          <span>/</span>
          {backName && (
            <>
              <button className="duration-500 hover:text-main" onClick={() => window.history.back()}>
                {backName}
              </button>
              <span> /</span>
            </>
          )}
          <p className="text-main">{currentPage}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
