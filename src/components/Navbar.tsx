import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OtpDialog from './ui/LoginBox';
import mixpanel from 'mixpanel-browser';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
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
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow dark:bg-gray-950">
      <div className="container px-4 md:px-28">
        <div className="flex h-14 items-center">
          <Link
            to={isUserLoggedIn ? "/home" : "/"}
            className="mr-6 flex items-center gap-2 text-lg font-semibold"
          >
            <img src="/logo.png" alt="logo" className="w-32 object-cover" />
          </Link>
          <nav className="flex items-center space-x-8 poppins-medium">
            <div className="flex flex-col items-center">
              <Link
                to={isUserLoggedIn ? "/discover/explore" : ""}
                className="text-sm text-gray-400"
              >
                Discover
              </Link>
              {location.pathname.includes("/discover") && (
                <span className="z-0 h-[1px] w-full relative top-[1.2rem] rounded-none bg-[#1F7AE0]"></span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <a
                class="text-sm text-gray-400 has-overlay"
                href="/watchlist"
                onClick={() => mixpanel.track("watchlist_clicked")}
              >
                Watchlist
              </a>
              {location.pathname === "/watchlist" && (
                <span className="z-0 h-[1px] w-full relative top-[1.2rem] rounded-none bg-[#1F7AE0]"></span>
              )}
            </div>
            <Link to="#" className="text-sm text-gray-400">
              More
            </Link>
          </nav>
          <nav className="flex items-center space-x-8 ml-auto poppins-medium">
            <Link to="#" className="text-sm text-gray-400">
              Resources
            </Link>
            {!isUserLoggedIn && (
              <OtpDialog
                isUserLoggedIn={isUserLoggedIn}
                triggerButton={
                  <Button
                    variant="outline"
                    onClick={() => {
                      mixpanel.track("login initiation page opened");
                    }}
                    className="border-blue-300 rounded-sm shadow hover:translate-y-[-2px] hover:shadow-xl hover:text-text-blue-400 transition-all active:translate-y-0 text-blue-400"
                  >
                    Login
                  </Button>
                }
              />
            )}
            {isUserLoggedIn && (
              <Popover>
                <PopoverTrigger>
                  <p className="text-sm text-gray-400 cursor-pointer">
                    My Account
                  </p>
                </PopoverTrigger>
                <PopoverContent className="poppins-regular w-fit">
                  <Button
                    onClick={() => {
                      localStorage.removeItem("phoneNumber");
                      setIsUserLoggedIn(false);
                      navigate("/");
                    }}
                    className="w-fit"
                    variant="ghost"
                  >
                    Sign out
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
