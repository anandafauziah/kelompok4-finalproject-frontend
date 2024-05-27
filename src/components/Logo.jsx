const Logo = (props) => {
  const { size } = props;
  return (
    <>
      <img className="brightness-50" src="/logo.png" alt="" width={size} height={size} />
    </>
  );
};

export default Logo;
