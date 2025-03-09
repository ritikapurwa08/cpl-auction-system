import { useGetCurrentUser } from "@/api/users/query/users-query";
import UserLogOutButton from "../auth/user-logout-button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VerifiedUserDashboard() {
  const user = useGetCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.verified === true) {
      navigate("/verified-user");
    } else {
      navigate("/unverified-user");
    }
  }, [user?.verified == true]);
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-400">Your Dashboard</h1>
        <div className="w-16">
          <UserLogOutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-pink-400 mb-4">
            Your Active Bids
          </h2>
          <div className="space-y-3">
            {[1, 2].map((bid) => (
              <div key={bid} className="p-3 bg-gray-700 rounded">
                <div className="flex justify-between">
                  <span>Auction #{bid}</span>
                  <span className="text-pink-400">$1,000</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Current highest bid
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-pink-400 mb-4">
            Upcoming Auctions
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((auction) => (
              <div key={auction} className="p-3 bg-gray-700 rounded">
                <div className="flex justify-between">
                  <span>Item #{auction}</span>
                  <span className="text-gray-400">Starts in 2 hours</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
