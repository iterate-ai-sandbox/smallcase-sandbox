import Collections from "./discover-tabs/Collections";
import LineTabs from "./discover-tabs/Tabs";
import Smallcases from "./discover-tabs/Smallcases";

function Discover() {
  return (
    <>
      <div className="discover mt-20 flex flex-col items-center justify-center">
        <div className="tabs w-[1150px] flex justify-center">
          <LineTabs />
        </div>
        {location.pathname === "/discover/explore" ? (
          <Collections />
        ) : (
          <Smallcases />
        )}
      </div>
    </>
  );
}

export default Discover;
