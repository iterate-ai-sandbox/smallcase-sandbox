import { RootState } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { removeFromWishlist, addWishlist } from "@/reducers/wishlist";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

function AllWeather() {
  const [tab, setTab] = useState<string>("overview");
  const wishlist = useSelector((state: RootState) => state.wishlist.data);
  const dispatch = useDispatch();

  return (
    <>
      <div className="page mt-14">
        <div className="head">
          <img src="/head.PNG" alt="head" className="w-full object-cover" />
        </div>
        <div className="flex items-start justify-center">
          <div className="left">
            <div className="tab flex items-center gap-8">
              <div
                onClick={() => setTab("overview")}
                className="flex flex-col items-center"
              >
                <p
                  className={`${
                    tab === "overview"
                      ? "text-blue-600 cursor-pointer"
                      : "text-gray-500"
                  } cursor-pointer poppins-regular font-light`}
                >
                  Overview
                </p>
                {tab === "overview" && (
                  <span className="z-0 h-[1px] w-full relative top-[1.2rem] rounded-none bg-[#1F7AE0]"></span>
                )}
              </div>
              <div
                onClick={() => setTab("ETFs")}
                className="flex flex-col items-center"
              >
                <p
                  className={`${
                    tab === "ETFs"
                      ? "text-blue-600 cursor-pointer"
                      : "text-gray-500"
                  } cursor-pointer poppins-regular font-light`}
                >
                  ETFs & Weights
                </p>
                {tab === "ETFs" && (
                  <span className="z-0 h-[1px] w-full relative top-[1.2rem] rounded-none bg-[#1F7AE0]"></span>
                )}
              </div>
            </div>
            <div className="content mt-10 relative right-6">
              {tab === "overview" ? (
                <>
                  <div className="overview-content">
                    <div className="section1">
                      <img
                        src="/Weather/overview-1.PNG"
                        alt="overview"
                        className="w-[95%] object-cover"
                      />
                    </div>
                    <div className="section2">
                      <img
                        src="/Weather/overview-2.PNG"
                        alt="overview"
                        className="w-[95%] object-cover"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="etf-content">
                    <div className="section1">
                      <img
                        src="/Weather/etf.PNG"
                        alt="overview"
                        className="w-[95%] object-cover"
                      />
                    </div>
                    <div className="section2">
                      <img
                        src="/Weather/etf-2.PNG"
                        alt="overview"
                        className="w-[95%] object-cover"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="right poppins-regular mt-4">
            <div className="top">
              <p className="text-gray-500 text-sm">Minimum Invested Amount</p>
              <p>₹ 3,033</p>
              <p className="text-gray-500 text-sm my-4">
                Get free access forever
              </p>
            </div>
            <div className="bottom flex flex-col items-center justify-center gap-2 w-full">
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button className="w-full h-12 bg-green-600 rounded-sm">
                    Invest Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="poppins-regular">
                  <DialogHeader>
                    <DialogDescription>
                      <img
                        src="/invest.PNG"
                        alt="invest"
                        className="w-full object-cover"
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="w-full h-12 rounded-sm text-blue-600 hover:text-blue-600"
                onClick={() => {
                  const isSmallcaseInWishlist = wishlist.find(
                    (smallcase) => smallcase.name === "All Weather Investing"
                  );
                  if (isSmallcaseInWishlist) {
                    dispatch(removeFromWishlist("All Weather Investing"));
                  } else {
                    dispatch(
                      addWishlist({
                        name: "All Weather Investing",
                        description:
                          "One investment for all market conditions. Works for everyone",
                        by: "Windmill Capital",
                        minAmount: 3033,
                        cagr: [
                          { time: "1M", cagr: 12.68 },
                          { time: "6M", cagr: 10.5 },
                          { time: "1Y", cagr: 9.3 },
                          { time: "3Y", cagr: 11.2 },
                          { time: "5Y", cagr: 12.0 },
                        ],
                        volatility: "Low",
                        freeAccess: true,
                        icon: "https://assets.smallcase.com/images/smallcases/160/SCAW_0001.png",
                      })
                    );
                  }
                }}
              >
                {wishlist.find(
                  (smallcase) => smallcase.name === "All Weather Investing"
                )
                  ? "In Watchlist"
                  : "Add to Watchlist"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllWeather;
