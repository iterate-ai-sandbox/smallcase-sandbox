import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { smallcases, strategies } from "@/lib/smallcases";
import { addSorting } from "@/reducers/sorting";
import { addWishlist, removeFromWishlist } from "@/reducers/wishlist";
import { RootState } from "@/store";
import mixpanel from "mixpanel-browser";
import { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { ImMeter } from "react-icons/im";
import { RiSlowDownFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Discover from "../Discover";
import { Button } from "../ui/button";

interface CAGR {
  time: string;
  cagr: number;
}

export interface Smallcase {
  name: string;
  description: string;
  by: string;
  minAmount: number;
  cagr: CAGR[];
  volatility: string;
  freeAccess: boolean;
  icon: string;
}

function Smallcases() {
  const [selectedSubType, setSelectedSubType] = useState<string>("All");
  const [investmentAmount, setInvestmentAmount] = useState<string>("any");
  const [selectedVolatility, setSelectedVolatility] = useState<string[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const cagrTime = useSelector((state: RootState) => state.sorting.cagrTime);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.data);
  const navigate = useNavigate();
  const [sortingtype, setSortingType] = useState<string>("Popularity");
  const [cagrTimee, setCagrTime] = useState<string>("1Y");

  useEffect(() => {
    mixpanel.track("all smallcases page opened");
  }, []);

  useEffect(() => {
    dispatch(addSorting({ sortingtype, cagrTime: cagrTimee }));
  }, [cagrTimee, sortingtype]);

  const filterSmallcases = (smallcases: Smallcase[]) => {
    return smallcases.filter((smallcase) => {
      // Subscription Type filter
      if (selectedSubType === "Free" && !smallcase.freeAccess) return false;
      if (selectedSubType === "Based" && smallcase.freeAccess) return false;

      // Investment Amount filter
      if (investmentAmount === "5000" && smallcase.minAmount >= 5000)
        return false;
      if (investmentAmount === "25000" && smallcase.minAmount >= 25000)
        return false;
      if (investmentAmount === "50000" && smallcase.minAmount >= 50000)
        return false;

      // Volatility filter
      if (
        selectedVolatility.length > 0 &&
        !selectedVolatility.includes(smallcase.volatility)
      )
        return false;

      return true;
    });
  };

  const filteredSmallcases = filterSmallcases(smallcases);

  const SmallcaseCard: React.FC<{ smallcase: Smallcase }> = ({ smallcase }) => (
    <div
      onClick={() => {
        mixpanel.track("smallcase selected", {
          name: smallcase.name,
          description: smallcase.description,
          creator: smallcase.by,
          cagr: smallcase.cagr.toString(),
          min_amount: smallcase.minAmount.toString(),
          volatility: smallcase.volatility,
          isWatchlisted: wishlist.find((sm) => sm.name === smallcase.name)
            ? "true"
            : "false",
          subscription_type: smallcase.freeAccess ? "Free" : "Based",
        });
        if (smallcase.name === "All Weather Investing") {
          navigate("/all-weather-investing");
        }
      }}
      className="flex items-start space-x-4 p-4 border-b-[1px] transition-all hover:bg-gray-200/50 hover:shadow cursor-pointer hover:rounded-lg mb-4 group"
    >
      <img src={smallcase.icon} alt="icon" className="w-16 h-16 rounded" />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{smallcase.name}</h3>
              {smallcase.freeAccess && (
                <span className="text-[10px] w-max bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Free Access
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm gap-2 xl:flex-row flex-col">
          <p className="text-sm text-gray-600 xl:w-[40%] w-fit">
            {smallcase.description}
          </p>
          <div className="flex items-start md:items-center justify-start gap-6 md:flex-row flex-col">
            <div className="w-max">
              <p className="text-gray-600">Min. Amount</p>
              <p className="font-semibold">
                ₹ {smallcase.minAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-max">
              <p className="text-gray-600">{cagrTime} CAGR</p>
              <p className="font-semibold text-green-600">
                {smallcase.cagr.find((cagr) => cagr.time === cagrTime)?.cagr}%
              </p>
            </div>
            <div>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                {smallcase.volatility === "Low" ? (
                  <RiSlowDownFill color="green" size={20} />
                ) : smallcase.volatility === "Med" ? (
                  <ImMeter color="orange" size={20} />
                ) : (
                  <RiSlowDownFill color="red" size={20} />
                )}
                {smallcase.volatility} Volatility
              </Button>
            </div>
            {wishlist.find((data) => data.name === smallcase.name) ? (
              <BsBookmarkFill
                className="text-gray-400 ml-2 invisible group-hover:visible relative top-1"
                fontSize={24}
                onClick={() => dispatch(removeFromWishlist(smallcase.name))}
              />
            ) : (
              <BsBookmark
                className="text-gray-400 ml-2 invisible group-hover:visible relative top-1"
                fontSize={24}
                onClick={() => dispatch(addWishlist(smallcase))}
              />
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-3">by {smallcase.by}</p>
      </div>
    </div>
  );

  const handleStrategyChange = (strategy: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleVolatilityChange = (volatility: string) => {
    setSelectedVolatility((prev) =>
      prev.includes(volatility)
        ? prev.filter((v) => v !== volatility)
        : [...prev, volatility]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubType("All");
    setInvestmentAmount("any");
    setSelectedVolatility([]);
    setSelectedStrategies([]);
  };

  return (
    <>
      <Discover />
      <div className="flex flex-col items-center justify-center">
        <div className="smallcases flex items-start justify-between lg:w-2/3 w-[90%] poppins-regular gap-8">
          <div className="left">
            <div className="select mb-8 w-full xl:hidden block">
              <Select
                onValueChange={(value) => {
                  setSortingType(value);
                  mixpanel.track("sorting applied", {
                    type: value,
                  });
                }}
              >
                <SelectTrigger className="w-[180px] poppins-regular text-gray-400">
                  <SelectValue
                    defaultValue="Popularity"
                    placeholder="Popularity"
                  />
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
            <div className="total-filters border-b-[1px] border-gray-300 flex justify-between items-center">
              <p className="font-light text-[#535B62]">Filters</p>
              <Button
                variant="ghost"
                className="text-[#1F7AE0] hover:text-[#1F7AE0]"
                onClick={() => {
                  clearAllFilters();
                  mixpanel.track("all filters cleared");
                }}
              >
                Clear All
              </Button>
            </div>
            <div className="subscription-type mt-5">
              <p className="font-semibold text-[#535B62]">Subscription Type</p>
              <div className="btn-groups border-[1px] border-gray-300 rounded w-max mt-3">
                <Button
                  onClick={() => {
                    setSelectedSubType("All");
                    mixpanel.track("filter applied", {
                      type: "subscription type",
                      name: "All",
                    });
                  }}
                  variant={selectedSubType === "All" ? "secondary" : "ghost"}
                  className={`w-[100px] text-[#535B62] hover:text-[#1F7AE0] rounded-none ${
                    selectedSubType === "All" ? "text-[#1F7AE0]" : ""
                  }`}
                >
                  Show all
                </Button>
                <Button
                  onClick={() => {
                    setSelectedSubType("Free");

                    mixpanel.track("filter applied", {
                      type: "subscription type",
                      name: "Free Access",
                    });
                  }}
                  variant={selectedSubType === "Free" ? "secondary" : "ghost"}
                  className={`w-[100px] text-[#535B62] hover:text-[#1F7AE0] rounded-none ${
                    selectedSubType === "Free" ? "text-[#1F7AE0]" : ""
                  }`}
                >
                  Free access
                </Button>
                <Button
                  onClick={() => {
                    setSelectedSubType("Based");

                    mixpanel.track("filter applied", {
                      type: "subscription type",
                      name: "Free Based",
                    });
                  }}
                  variant={selectedSubType === "Based" ? "secondary" : "ghost"}
                  className={`w-[100px] text-[#535B62] hover:text-[#1F7AE0] rounded-none ${
                    selectedSubType === "Based" ? "text-[#1F7AE0]" : ""
                  }`}
                >
                  Free based
                </Button>
              </div>
            </div>
            <div className="investment-amount mt-5">
              <p className="font-semibold text-[#535B62]">Investment Amount</p>
              <div className="investment-amount mt-3">
                <div className="flex items-center mb-4">
                  <input
                    id="investment-any"
                    type="radio"
                    value="any"
                    name="investment-amount"
                    checked={investmentAmount === "any"}
                    onChange={() => {
                      setInvestmentAmount("any");
                      mixpanel.track("filter applied", {
                        type: "Investment Amount",
                        name: "Any",
                      });
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="investment-any"
                    className="ms-2 text-sm font-medium text-[#535B62] dark:text-gray-300"
                  >
                    Any
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="investment-5000"
                    type="radio"
                    value="5000"
                    name="investment-amount"
                    checked={investmentAmount === "5000"}
                    onChange={() => {
                      setInvestmentAmount("5000");
                      mixpanel.track("filter applied", {
                        type: "Investment Amount",
                        name: "Under Five Thousand",
                      });
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="investment-5000"
                    className="ms-2 text-sm font-medium text-[#535B62] dark:text-gray-300"
                  >
                    Under ₹ 5,000
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="investment-25000"
                    type="radio"
                    value="25000"
                    name="investment-amount"
                    checked={investmentAmount === "25000"}
                    onChange={() => {
                      setInvestmentAmount("25000");

                      mixpanel.track("filter applied", {
                        type: "Investment Amount",
                        name: "Under Twenty Five Thousand",
                      });
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="investment-25000"
                    className="ms-2 text-sm font-medium text-[#535B62] dark:text-gray-300"
                  >
                    Under ₹ 25,000
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="investment-50000"
                    type="radio"
                    value="50000"
                    name="investment-amount"
                    checked={investmentAmount === "50000"}
                    onChange={() => {
                      setInvestmentAmount("50000");

                      mixpanel.track("filter applied", {
                        type: "Investment Amount",
                        name: "Under Fifty Thousand",
                      });
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="investment-50000"
                    className="ms-2 text-sm font-medium text-[#535B62] dark:text-gray-300"
                  >
                    Under ₹ 50,000
                  </label>
                </div>
              </div>
            </div>
            <div className="volatility mt-6">
              <p className="font-semibold text-[#535B62]">Volatility</p>
              <div className="btn-group flex items-center justify-start space-x-2 mt-3">
                <Button
                  variant={
                    selectedVolatility.includes("Low") ? "secondary" : "outline"
                  }
                  size="icon"
                  className="flex flex-col items-center justify-center h-14 w-20"
                  onClick={() => {
                    handleVolatilityChange("Low");
                    mixpanel.track("filter applied", {
                      type: "Volatility",
                      name: "Low",
                    });
                  }}
                >
                  <RiSlowDownFill color="green" className="mb-2" size={20} />
                  Low
                </Button>
                <Button
                  variant={
                    selectedVolatility.includes("Med") ? "secondary" : "outline"
                  }
                  size="icon"
                  className="flex flex-col items-center justify-center h-14 w-20"
                  onClick={() => {
                    handleVolatilityChange("Med");
                    mixpanel.track("filter applied", {
                      type: "Volatility",
                      name: "Medium",
                    });
                  }}
                >
                  <ImMeter color="orange" className="mb-2" size={20} />
                  Medium
                </Button>
                <Button
                  variant={
                    selectedVolatility.includes("High")
                      ? "secondary"
                      : "outline"
                  }
                  size="icon"
                  className="flex flex-col items-center justify-center h-14 w-20"
                  onClick={() => {
                    handleVolatilityChange("High");
                    mixpanel.track("filter applied", {
                      type: "Volatility",
                      name: "High",
                    });
                  }}
                >
                  <RiSlowDownFill color="red" className="mb-2" size={20} />
                  High
                </Button>
              </div>
            </div>
            <div className="strategy mt-6">
              <p className="font-semibold text-[#535B62]">
                Investment Strategy
              </p>
              <div className="all-startegies mt-4">
                {strategies.map((strategy, index) => (
                  <div
                    key={index}
                    className="flex items-center transition-all hover:bg-gray-200 hover:rounded cursor-pointer p-3"
                  >
                    <input
                      id={`strategy-${index}`}
                      type="checkbox"
                      value={strategy}
                      checked={selectedStrategies.includes(strategy)}
                      onChange={() => {
                        handleStrategyChange(strategy);
                        mixpanel.track("filter applied", {
                          type: "Investment Strategy",
                          name: strategy,
                        });
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`strategy-${index}`}
                      className="ms-2 text-[#535B62] text-sm font-medium"
                    >
                      {strategy}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            {filteredSmallcases.map((smallcase, index) => (
              <SmallcaseCard key={index} smallcase={smallcase} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Smallcases;
