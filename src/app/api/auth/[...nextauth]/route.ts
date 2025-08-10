import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// ✅ Export this so you can use it in getServerSession()

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
