import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    mixpanel.track("home page opened");
  }, []);

  return (
    <>
      <div className="home">
        <div className="section-one">
          <img
            src="/Home/section-one.PNG"
            alt="section-one"
            className="w-full object-cover mt-10"
          />
        </div>
        <div className="section-two">
          <img
            src="/Home/insights.PNG"
            alt="section-two"
            className="w-full object-cover mt-4"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
