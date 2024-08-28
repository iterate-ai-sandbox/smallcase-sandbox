import { smallcases } from '@/lib/smallcases';
import { cn } from '@/lib/utils';
import { addSorting } from '@/reducers/sorting';
import { motion } from 'framer-motion';
import mixpanel from 'mixpanel-browser';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Smallcase } from './Smallcases';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = ["Collections", "All smallcases", "Managers"];

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  customID?: string;
}

const Tab = ({ text, selected, setSelected, customID }: TabProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        setSelected(text);
        navigate(
          text.toLowerCase() === "all smallcases"
            ? "/discover/smallcases"
            : "/discover/explore",
        );
        if (text.toLowerCase() === "all smallcases") {
          mixpanel.track("all smallcases tab clicked");
        }
      }}
      className="hover:text-[#1F7AE0] } relative rounded-md px-2 py-5 text-sm font-medium poppins-regular text-gray-400 transition-colors duration-300 focus-within:outline-[#1F7AE0]"
    >
      {" "}
      <span>{text}</span>{" "}
      {selected && (
        <motion.div
          className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center"
          layoutId={customID + "linetab"}
          transition={{ type: "spring", duration: 0.4, bounce: 0, delay: 0.1 }}
        >
          {" "}
          <span className="z-0 h-[1px] w-[60%] rounded-none bg-[#1F7AE0]"></span>{" "}
        </motion.div>
      )}{" "}
    </button>
  );
};

interface LineTabProps {
  center?: boolean;
  customID?: string;
}

const LineTabs = ({ center, customID }: LineTabProps) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string>(
    location.pathname === "/discover/explore"
      ? "Collections"
      : "All smallcases",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cagrTime, setCagrTime] = useState<string>("1Y");
  const [sortingtype, setSortingType] = useState<string>("Popularity");
  const [Smallcasess, setSmallcases] = useState<Smallcase[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSorting({ sortingtype, cagrTime }));
  }, [cagrTime, sortingtype]);

  useEffect(() => {
    if (searchQuery?.length >= 3) {
      const searchedSmallcases = smallcases.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      if (searchedSmallcases.length > 0) {
        setSmallcases(searchedSmallcases);
      }
    } else {
      setSmallcases([]);
    }
  }, [searchQuery]);
  //FIXED: use `onKeyDown` inside of the input element rather than adding an event listener to the window
  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.key === "Enter" && searchQuery.length >= 3) {
  //       mixpanel.track("search applied", {
  //         searchQuery,
  //       });
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8 flex w-full flex-wrap items-center justify-between border-b border-gray-200 dark:border-gray-600">
      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          center && "justify-center",
        )}
      >
        {tabs.map((tab) => (
          <Tab
            text={tab}
            selected={
              location.pathname === "/discover/explore"
                ? selected === tab
                : selected === tab && searchQuery === ""
            }
            setSelected={setSelected}
            key={tab}
            customID={customID}
          />
        ))}
      </div>
      <div
        className={`middle ${
          location.pathname === "/discover/explore"
            ? "hidden"
            : "hidden xl:block"
        }`}
      >
        <Select
          onValueChange={(value) => {
            setSortingType(value);
            mixpanel.track("sorting applied", {
              type: value,
            });
          }}
        >
          <SelectTrigger className="w-[180px] poppins-regular text-gray-400">
            <SelectValue defaultValue="Popularity" placeholder="Popularity" />
          </SelectTrigger>
          <SelectContent className="p-2 poppins-regular text-gray-500">
            <SelectGroup>
              <SelectItem defaultChecked value="Popularity">
                Popularity
              </SelectItem>
              <SelectItem value="minumum">Minimum Amount</SelectItem>
              <SelectItem value="recent">Recently Rebalanced</SelectItem>
              <p className="my-2 text-black">Returns</p>
              <SelectLabel>Time Period</SelectLabel>
              <div className="btn-groups border-[1px] border-gray-300 rounded">
                <Button
                  onClick={() => setCagrTime("1M")}
                  variant="ghost"
                  size="icon"
                  className={
                    cagrTime === "1M"
                      ? "bg-gray-200 text-[#1F7AE0] rounded-none"
                      : ""
                  }
                >
                  1M
                </Button>
                <Button
                  onClick={() => setCagrTime("6M")}
                  variant="ghost"
                  size="icon"
                  className={
                    cagrTime === "6M"
                      ? "bg-gray-200 text-[#1F7AE0] rounded-none"
                      : ""
                  }
                >
                  6M
                </Button>
                <Button
                  onClick={() => setCagrTime("1Y")}
                  variant="ghost"
                  size="icon"
                  className={
                    cagrTime === "1Y"
                      ? "bg-gray-200 text-[#1F7AE0] rounded-none"
                      : ""
                  }
                >
                  1Y
                </Button>
                <Button
                  onClick={() => setCagrTime("3Y")}
                  variant="ghost"
                  size="icon"
                  className={
                    cagrTime === "3Y"
                      ? "bg-gray-200 text-[#1F7AE0] rounded-none"
                      : ""
                  }
                >
                  3Y
                </Button>
                <Button
                  onClick={() => setCagrTime("5Y")}
                  className={
                    cagrTime === "5Y"
                      ? "bg-gray-200 text-[#1F7AE0] rounded-none"
                      : ""
                  }
                  variant="ghost"
                  size="icon"
                >
                  5Y
                </Button>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className="relative"
        onClick={() => setIsInputFocused(true)}
        ref={inputRef}
      >
        <svg
          className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <div className="w-fit flex flex-col poppins-regular">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.length >= 3) {
                alert("key pressed");
                mixpanel.track("search applied", {
                  searchQuery,
                });
              }
            }}
            type="text"
            placeholder="Smallcase, mutual fund, stock or manager"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="rounded-none px-3 py-1 text-sm focus:outline-none pl-10 w-[150px] lg:w-[360px]"
          />
          <span className="z-0 h-[1px] w-full rounded-none bg-gray-400 relative top-4"></span>
        </div>
        {isInputFocused && (
          <div className="searched-bar absolute border rounded mt-5 w-fit  bg-white p-3 shadow-lg poppins-regular z-[10]">
            {searchQuery?.length < 3 && (
              <div className="queried-content p-2 poppins-regular">
                <p className="text-sm">Search for at least 3 characters</p>
              </div>
            )}
            {Smallcasess.length > 0 ? (
              <div className="related-smallcases">
                <p className="font-medium text-sm text-[#2F363F] mb-2">
                  Smallcases
                </p>
                {Smallcasess.map((smallcase, index) => (
                  <div
                    className="flex items-start lg:items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 rounded-md lg:flex-row flex-col"
                    key={index}
                    onClick={() => {
                      if (smallcase.name === "All Weather Investing") {
                        navigate("/all-weather-investing");
                      }
                    }}
                  >
                    <div className="left">
                      <img
                        src={smallcase.icon}
                        alt="icon"
                        className="w-10 object-cover rounded"
                      />
                    </div>
                    <div className="right">
                      <p className="text-sm font-medium">{smallcase.name}</p>
                      <p className="text-xs text-gray-500">
                        {smallcase.description?.slice(0, 45)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.length >= 3 ? (
              <div className="queried-content p-2 poppins-regular">
                <p className="text-sm">No results found</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LineTabs;
