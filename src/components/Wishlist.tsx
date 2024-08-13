import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { removeFromWishlist } from "@/reducers/wishlist";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

function Wishlist() {
  const wishlist = useSelector((state: RootState) => state.wishlist.data);
  const dispatch = useDispatch();

  return (
    <div className="wishlist mt-24 flex items-center justify-center w-full poppins-regular">
      <div className="flex flex-col justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`top ${wishlist.length > 0 ? "" : "text-center"}`}>
          <h1 className="poppins-semibold text-2xl sm:text-3xl font-semibold text-[#2F363F] mb-2">
            Your Wishlist
          </h1>
          <p className="text-sm text-gray-500">
            {wishlist.length > 0 ? (
              <>You are watching {wishlist.length} smallcases</>
            ) : (
              <>Your watchlisted smallcases will appear here</>
            )}
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mt-12">
            <div className="left w-full lg:w-2/3">
              {wishlist.map((smallcase) => (
                <div key={smallcase.name} className="flex items-start space-x-4 p-4 border-b-[1px] hover:bg-gray-200/50 hover:shadow transition-all cursor-pointer hover:rounded-lg mb-4 group">
                  <div className="left">
                    <img
                      src={smallcase.icon}
                      alt="icon"
                      className="w-16 h-16 rounded"
                    />
                  </div>
                  <div className="right flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="data">
                        <p className="font-semibold">{smallcase.name}</p>
                        <p className="text-sm text-gray-500 sm:w-3/4">
                          {smallcase.description}
                        </p>
                      </div>
                      <div className="btns flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant="outline"
                              className="flex items-center text-xs justify-center gap-2 border-green-400 rounded-sm text-green-600 hover:text-green-600"
                            >
                              Invest now
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
                        <Popover>
                          <PopoverTrigger>
                            <Button variant="ghost" size="icon">
                              <BsThreeDotsVertical
                                className="text-gray-500"
                                size={24}
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="poppins-regular w-fit">
                            <Button
                              onClick={() => {
                                dispatch(removeFromWishlist(smallcase.name));
                              }}
                              className="w-fit"
                              variant="ghost"
                            >
                              Remove from wishlist
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="bottom flex flex-wrap items-center justify-between mt-4 gap-4">
                      <div className="returns">
                        <p className="text-sm text-gray-500">Returns</p>
                        <p className="font-semibold text-green-600">
                          {smallcase.cagr[2].cagr}%
                        </p>
                      </div>
                      <div className="returns-since">
                        <p className="text-sm text-gray-500">Returns since</p>
                        <p>Aug 6, 2024</p>
                      </div>
                      <div className="amount">
                        <p className="text-sm text-gray-500">Min. Amount</p>
                        <p>₹ {smallcase.minAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="right lg:w-1/3">
              <img
                src="/wishlist.PNG"
                alt="wishlist"
                className="w-full max-w-[300px] object-cover mx-auto"
              />
            </div>
          </div>
        ) : (
          <img
            src="/empty-wishlist.PNG"
            alt="empty-wishlist"
            className="w-full mt-8 object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default Wishlist;