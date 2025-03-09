import UserLogOutButton from "../auth/user-logout-button"; // Adjust path as needed
import { HelpCircle, Mail, Phone, UserCircle2 } from "lucide-react";
// Assuming you have a placeholder image or a real image.  Make sure the path is correct!
import vikash from "@/assets/images/WhatsApp Image 2025-03-02 at 22.00.50_d45696cd.jpg"; // Example path
import { useGetCurrentUser } from "@/api/users/query/users-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminContactInfo {
  name: string;
  mobileNo: string;
  email: string;
  photoUrl: string;
}

const adminContact: AdminContactInfo = {
  name: "Vikash Apurwa", // Replace with actual admin name
  mobileNo: "+1-555-123-4567", // Replace with actual mobile number
  email: "admin@example.com", // Replace with the actual email
  photoUrl: vikash, // Use the imported image
};

export default function UnverifiedUserDashboard() {
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
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {" "}
      {/* Added min-h-screen and dark background */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        {" "}
        {/* Responsive padding */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl text-center w-full font-bold text-pink-400 mb-4 md:mb-0">
            Account Verification Pending
          </h1>
        </div>
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg max-w-3xl mx-auto shadow-lg">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-xl md:text-2xl font-semibold text-pink-400">
              Verification in Progress
            </h2>
            <p className="text-gray-400">
              Your account is currently awaiting verification. We appreciate
              your patience. This process helps us maintain a secure and
              trustworthy platform for all users.
            </p>
            <div className="mt-6">
              <p className="text-gray-300 font-medium">
                Your request is being reviewed.
              </p>
            </div>

            {/* Admin Contact Information */}
            <div className="mt-10 md:mt-12 bg-gray-700 p-5 md:p-6 rounded-lg shadow">
              <h3 className="text-lg md:text-xl font-semibold text-pink-300 mb-4">
                Contact Information
              </h3>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={adminContact.photoUrl}
                    alt={adminContact.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-pink-400" // Added border
                  />
                </div>
                <div className="space-y-2 text-gray-200">
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="text-pink-400" size={20} />
                    <span className="font-medium">{adminContact.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-pink-400" size={20} />
                    <a
                      href={`tel:${adminContact.mobileNo}`}
                      className="hover:text-pink-400 transition-colors"
                    >
                      {adminContact.mobileNo}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="text-pink-400" size={20} />
                    <a
                      href={`mailto:${adminContact.email}`}
                      className="hover:text-pink-400 transition-colors"
                    >
                      {adminContact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-1">
              <HelpCircle size={16} />
              Need help? Contact our support team
            </div>
            <div className="w-full flex justify-center">
              <div className="max-w-60 w-full flex ">
                <UserLogOutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
