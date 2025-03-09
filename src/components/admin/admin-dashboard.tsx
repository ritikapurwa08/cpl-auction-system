import { Doc, Id } from "@convex/_generated/dataModel";
import UserLogOutButton from "../auth/user-logout-button";
import { useGetAllUsers } from "@/api/users/query/users-query";
import { useUpdateUser } from "@/api/users/mutation/user-mutaion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"; // Corrected import
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import {
  CheckCircle2Icon,
  MinusCircleIcon,
  PencilIcon,
  XCircleIcon,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner"; // Import for notifications

interface UserInterface {
  users: Doc<"users">[] | undefined;
}

interface UpdateUserProps {
  userId: Id<"users">;
  initialHasPayment: boolean;
  initialIsAdmin: boolean;
  initialVerified: boolean;
  userName: string;
}

const UpdateUser = ({
  userId,
  initialHasPayment,
  initialIsAdmin,
  initialVerified,
  userName,
}: UpdateUserProps) => {
  const { mutate: updateUser } = useUpdateUser();
  const [hasPayment, setHasPayment] = useState(initialHasPayment);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [verified, setVerified] = useState(initialVerified);
  const [open, setOpen] = useState(false); // Control dialog visibility
  const [isPending, startTransition] = useTransition();

  useEffect(() => {}, [hasPayment, isAdmin, verified]);

  const handleUpdateUser = async () => {
    startTransition(async () => {
      if (userId) {
        try {
          await updateUser({
            userId: userId,
            paymentDone: hasPayment,
            verified: verified,
            isAdmin: isAdmin,
          });
          setOpen(false); // Close dialog on success
        } catch (error) {
          console.error("Error updating user:", error);
          toast.error("Failed to update user"); // Error notification
        }
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" disabled={isPending}>
            <PencilIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User: {userName}</DialogTitle>
            <DialogDescription>Modify user properties.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <span className="text-sm">Payment Done</span>
            <Switch
              checked={hasPayment}
              onCheckedChange={setHasPayment}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Verified</span>
            <Switch
              checked={verified}
              onCheckedChange={setVerified}
              disabled={isPending}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Admin</span>
            <Switch
              checked={isAdmin}
              onCheckedChange={setIsAdmin}
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleUpdateUser}
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UsersList = ({ users }: UserInterface) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
      {users ? (
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Mobile No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Verified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.mobileNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.isAdmin ? (
                    <CheckCircle2Icon className="text-green-500" size={20} />
                  ) : (
                    <XCircleIcon className="text-red-500" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.verified ? (
                    <CheckCircle2Icon className="text-green-500" size={20} />
                  ) : (
                    <XCircleIcon className="text-red-500" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.paymentDone ? (
                    <CheckCircle2Icon className="text-green-500" size={20} />
                  ) : (
                    <MinusCircleIcon className="text-yellow-500" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user._creationTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <UpdateUser
                    userId={user._id}
                    initialHasPayment={user.paymentDone}
                    initialIsAdmin={user.isAdmin}
                    initialVerified={user.verified}
                    userName={user.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-400">Loading...</div>
      )}
    </div>
  );
};

export default function AdminDashboard() {
  //  const users = useGetAllUsers(); //Uncomment this and comment the line below
  const users = useGetAllUsers(); //Comment this line to test
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {" "}
      {/* Added for consistent dark mode */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-400">Admin Dashboard</h1>
          <div className="w-16 flex justify-center">
            <UserLogOutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Users"
            value={users?.length.toString() ?? "0"} // Handle undefined users
            description="Active users in the system"
          />
          <DashboardCard
            title="Pending Verifications"
            value={
              users?.filter((user) => !user.verified).length.toString() ?? "0"
            }
            description="Users awaiting verification"
          />
          <DashboardCard
            title="Active Auctions"
            value="78" // Placeholder, replace with actual data if available
            description="Currently running auctions"
          />
        </div>

        <div className="mt-8">
          {" "}
          {/* Removed unnecessary container */}
          <h2 className="text-xl font-semibold text-pink-400 mb-4">Users</h2>
          <UsersList users={users} />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-pink-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  );
}
