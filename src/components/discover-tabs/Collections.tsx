import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import Discover from '../Discover';

function Collections() {
  useEffect(() => {
    mixpanel.track("explore_smallcases_page_visited");
  }, []);
  const handleAllSmallcasesClick = () => {
    mixpanel.track("all_smallcases_clicked");
  };
  return (
    <>
      <Discover />
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
        <button onClick={handleAllSmallcasesClick}>
          <span>All smallcases</span>
        </button>
      </div>
    </>
  );
}

export default Collections;
