import LineTabs from "./discover-tabs/Tabs";

function Discover() {
  return (
    <>
      <div className="discover mt-20 flex flex-col items-center justify-center">
        <div className="tabs w-[1150px] flex justify-center">
          <LineTabs />
        </div>
      </div>
    </>
  );
}

export default Discover;
