import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

const SignOutButton: React.FC = () => {
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;