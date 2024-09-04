import { ReactNode, useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpDialogProps {
  isUserLoggedIn: boolean;
  triggerButton: ReactNode;
}

const OtpDialog: React.FC<OtpDialogProps> = ({
  isUserLoggedIn,
  triggerButton,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (otp === "1234" && phoneNumber) {
      navigate("/discover/explore");
      localStorage.setItem("phoneNumber", phoneNumber.toString());
    }
  }, [otp, phoneNumber]);

  return (
    <Dialog>
      <DialogTrigger>{!isUserLoggedIn && triggerButton}</DialogTrigger>
      <DialogContent className="poppins-regular">
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <DialogDescription>
            {!isOtpSent ? (
              <div className="no-otp">
                <div className="top">
                  <img
                    src="/logo-main.png"
                    alt="logo"
                    className="w-16 object-cover"
                  />
                </div>
                <div className="mid mt-6">
                  <p className="font-semibold text-[#2f363f] text-[16px]">
                    Enter your phone number
                  </p>
                  <Input
                    placeholder="Your phone number"
                    className="mt-4 h-14"
                    onChange={(e) => setPhoneNumber(Number(e.target.value))}
                  />
                  <Button
                    onClick={() => {
                      mixpanel.track("login clicked once again");
                      setIsOtpSent(true);
                    }}
                    disabled={
                      !phoneNumber || phoneNumber.toString().length < 10
                    }
                    className="w-full px-8 py-7 bg-[#1F7AE0] hover:bg-blue-600 rounded-sm mt-4"
                  >
                    Get OTP
                  </Button>
                </div>
                <p className="text-xs mt-4">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </div>
            ) : (
              <>
                <div className="top">
                  <img
                    src="/lock.png"
                    alt="lock"
                    className="w-16 object-cover"
                  />
                </div>
                <div className="mid mt-6">
                  <p className="font-semibold text-[#2f363f] text-[20px]">
                    Verify OTP
                  </p>
                  <p className="text-[14px] my-2">
                    OTP sent to <b>{phoneNumber}</b>
                  </p>
                  <div className="otp mt-4">
                    <InputOTP
                      maxLength={4}
                      value={otp}
                      onChange={(value) => setOTP(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="w-16 h-20" index={0} />
                        <InputOTPSlot className="w-16 h-20" index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot className="w-16 h-20" index={2} />
                        <InputOTPSlot className="w-16 h-20" index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-[#1F7AE0] mt-8 text-center cursor-pointer">
                    Resent OTP
                  </p>
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
