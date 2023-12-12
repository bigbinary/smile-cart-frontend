import { Typography } from "neetoui";

const Home = () => (
  <div className="flex flex-col">
    <div className="m-2">
      <Typography className="mx-6 mb-2 mt-6" style="h1" weight="semibold">
        Smile Cart
      </Typography>
      <hr className="neeto-ui-bg-black h-1" />
    </div>
    <Typography className="mx-auto" style="h2">
      Home
    </Typography>
  </div>
);

export default Home;
