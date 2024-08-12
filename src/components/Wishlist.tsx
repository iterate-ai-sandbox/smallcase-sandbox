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
    <>
      <div className="wishlist mt-24 flex items-center justify-center w-full poppins-regular">
        <div className="flex flex-col justify-center">
          <div
            className={`top ${
              wishlist.length > 0
                ? ""
                : "flex flex-col items-center justify-center"
            }`}
          >
            <p className="poppins-semibold text-xl font-semibold text-[#2F363F]">
              Your Wishlist
            </p>
            <p className="text-sm text-gray-500">
              {wishlist.length > 0 ? (
                <>You are watching {wishlist.length} smallcases</>
              ) : (
                <>Your watchlisted smallcases will appear here</>
              )}
            </p>
          </div>

          {wishlist.length > 0 ? (
            <div className="flex items-start justify-center gap-8">
              <div className="left mt-12">
                {wishlist.map((smallcase) => (
                  <>
                    <div className="flex items-start space-x-4 p-4 border-b-[1px] hover:bg-gray-200/50 hover:shadow transition-all cursor-pointer hover:rounded-lg mb-4 group w-full">
                      <div className="left">
                        <img
                          src={smallcase.icon}
                          alt="icon"
                          className="w-16 h-16 rounded"
                        />
                      </div>
                      <div className="right w-full">
                        <div className="flex items-center justify-between gap-[14rem]">
                          <div className="data">
                            <p className="font-semibold">{smallcase.name}</p>
                            <p className="text-sm text-gray-500 w-3/4">
                              {smallcase.description}
                            </p>
                          </div>
                          <div className="btns flex items-center justify-center gap-2">
                            <Dialog>
                              <DialogTrigger className="w-full">
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
                                    dispatch(
                                      removeFromWishlist(smallcase.name)
                                    );
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
                        <div className="bottom flex items-center justify-between mt-4">
                          <div className="returns">
                            <p className="text-sm text-gray-500">Returns</p>
                            <p className="font-semibold text-green-600">
                              {smallcase.cagr[2].cagr}%
                            </p>
                          </div>
                          <div className="returns-since">
                            <p className="text-sm text-gray-500">
                              Returns since
                            </p>
                            <p>Aug 6, 2024</p>
                          </div>
                          <div className="amount">
                            <p className="text-sm text-gray-500">Min. Amount</p>
                            <p>₹ {smallcase.minAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="right mt-12">
                <img
                  src="/wishlist.PNG"
                  alt="wishlist"
                  className="w-[300px] object-cover"
                />
              </div>
            </div>
          ) : (
            <img
              src="/empty-wishlist.PNG"
              alt="empty-wishlist"
              className="w-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
