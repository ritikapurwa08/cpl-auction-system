// CustomMobileNumberInput.tsx
import {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { cn } from "@/lib/utils";

interface CustomMobileNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  defaultValue?: PathValue<T, FieldPath<T>>;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function CustomMobileNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
  disabled,
  error,
  className,
}: Readonly<CustomMobileNumberInputProps<T>>) {
  const {
    field: { value, onChange }, // Destructure value and onChange directly
    fieldState: { error: fieldError },
  } = useController({ name, control, defaultValue });

  return (
    <div className={cn("w-full space-y-2", className)}>
      <FormItem className="relative flex flex-col gap-y-1">
        <FormLabel className="text-pink-400 font-medium">{label}</FormLabel>
        <FormControl>
          <InputOTP
            maxLength={10}
            value={value}
            onChange={(value) => onChange(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
              <InputOTPSlot className="shad-otp-slot" index={6} />
              <InputOTPSlot className="shad-otp-slot" index={7} />
              <InputOTPSlot className="shad-otp-slot" index={8} />
              <InputOTPSlot className="shad-otp-slot" index={9} />
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
        {(error || fieldError?.message) && (
          <FormMessage className="mt-1 text-xs font-medium text-red-500 dark:text-red-400 animate-slideDown">
            {error || fieldError?.message}
          </FormMessage>
        )}
      </FormItem>
      <p className="text-xs text-gray-500 text-center">
        Please enter your 10-digit mobile number
      </p>
    </div>
  );
}
