import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import OtpDialog from './ui/LoginBox';
import mixpanel from 'mixpanel-browser';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("phoneNumber") &&
      localStorage.getItem("phoneNumber")?.length === 10
    ) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <>
      <div className="hero mt-10">
        <div className="overlay w-full poppins-medium flex flex-col items-center justify-center mt-[5.2rem] xl:mt-[6rem] 2xl:mt-[10rem] absolute z-[2]">
          <div className="w-[60%]">
            <div className="headings w-[400px]">
              <h1
                className="text-[35px] xl:text-[50px] poppins-semibold text-[#2F363F] leading-[35px] xl:leading-[50px] tracking-tight"
                onClick={() => {
                  mixpanel.track("headline_clicked", {
                    user_signed_in: isUserLoggedIn,
                  });
                }}
              >
                {" "}
                Invest in ideas with smallcases{" "}
              </h1>
              <p className="poppins-light w-[80%] mt-4 xl:text-md text-sm">
                Get simple, smart investment portfolios curated by experts
              </p>
            </div>
            <div className="btns mt-6 flex items-center">
              <OtpDialog
                isUserLoggedIn={isUserLoggedIn}
                triggerButton={
                  <Button
                    onClick={() => {
                      mixpanel.track("login initiation page opened");
                    }}
                    className="px-4 py-3 text-sm xl:text-md xl:px-8 xl:py-7 bg-[#1F7AE0] hover:bg-blue-600 rounded-sm mr-4"
                  >
                    Login
                  </Button>
                }
              />

              <Button
                onClick={() => navigate("/discover/explore")}
                variant="outline"
                className="border-blue-300 px-4 py-3 text-sm xl:text-md xl:px-8 xl:py-7 rounded-sm shadow hover:translate-y-[-2px] hover:shadow-xl hover:text-text-blue-400 transition-all active:translate-y-0 text-blue-400"
              >
                See smallcases
              </Button>
            </div>
            <div className="brokers">
              <p className="poppins-light w-[80%] mt-4 xl:text-md text-sm">
                Supported on India&apos; largest brokers
              </p>
              <img
                src="/brokers.PNG"
                alt="brokers"
                className="object-cover w-[240px] xl:w-[350px] mt-4"
              />
            </div>
          </div>
        </div>
        <div className="bg flex items-center justify-center w-full h-full z-[-1]">
          <img
            src="/hero.png"
            alt="hero"
            className="w-full xl:h-full h-[420px] object-cover"
          />
        </div>
      </div>
      <div className="section-one">
        <img
          src="/sec-1.PNG"
          alt="section-one"
          className="w-full object-cover mt-10"
        />
      </div>
      <div className="section-two">
        <img
          src="/features.PNG"
          alt="section-two"
          className="w-full object-cover mt-10"
        />
      </div>
      <div className="section-three">
        <img
          src="/everything-you-need.PNG"
          alt="section-three"
          className="w-full object-cover mt-10"
        />
      </div>
      <div className="section-four">
        <img
          src="/faq.PNG"
          alt="section-four"
          className="w-full object-cover mt-10"
        />
      </div>
    </>
  );
}

export default Landing;
