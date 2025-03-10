import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

const CustomUserSchema = Password<DataModel>({
  profile(params) {
    return {
      name: params.name as string,
      email: params.email as string,
      mobileNo: params.mobileNo as string,
      isAdmin: false,
      verified: false,
      paymentDone: false,
    };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomUserSchema],
  callbacks: {
    // async afterUserCreatedOrUpdated(ctx: MutationCtx, { userId }) {
    //   // Call the setupDefaultChat mutation here
    //   // await setupDefaultChat(ctx, { userId });
    // },
  },
});
