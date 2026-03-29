import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function OTPForm({
  showOTP,
  setShowOTP,
  otp,
  setOTP,
}: {
  showOTP: boolean;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  otp: string;
  setOTP: Dispatch<SetStateAction<string>>;
}) {
  return (
    <AlertDialog open={showOTP}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>OTP Required</AlertDialogTitle>
          <AlertDialogDescription>
            Type in the one time password that was sent to your email.
          </AlertDialogDescription>
          <div className="w-full flex justify-center">
            <OTPInput setValue={setOTP} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <AlertDialogCancel
            autoFocus={false}
            onClick={() => setShowOTP(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={otp.length !== 6}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function OTPInput({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Field className="w-fit">
      <InputOTP
        onChange={setValue}
        id="digits-only"
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          <InputOTPSlot autoFocus={true} index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  );
}
