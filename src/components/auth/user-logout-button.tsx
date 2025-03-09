import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { LoaderIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogOutButton = () => {
  const { signOut } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoading(true);
    signOut()
      .then(() => {
        navigate("/sign-in");
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full bg-red-400"
      variant="destructive" // You can change this to "secondary", "ghost", etc.
      size="icon"
    >
      {isLoading ? (
        <>
          <LoaderIcon className=" h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          <LogOut className=" h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default UserLogOutButton;
