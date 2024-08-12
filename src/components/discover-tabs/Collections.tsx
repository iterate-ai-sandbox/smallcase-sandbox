import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

function Collections() {

  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });

  useEffect(() => {
    mixpanel.track("discover page opened");
  }, []);
  return (
    <>
      <div className="collections">
        <div className="top">
          <img
            src="/Discover/hero-collection.PNG"
            alt="hero-top"
            className="w-full object-cover"
          />
        </div>
        <div className="managers mb-14">
          <img
            src="/Discover/managers.PNG"
            alt="hero-top"
            className="w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Collections;
