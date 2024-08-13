import LineTabs from "./discover-tabs/Tabs";

function Discover() {
  return (
    <>
      <div className="discover mt-20 flex flex-col items-center justify-center">
        <div className="tabs lg:w-2/3 w-[90%] flex justify-center">
          <LineTabs />
        </div>
      </div>
    </>
  );
}

export default Discover;
