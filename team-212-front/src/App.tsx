import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import LoginSignup from "./LoginSignup";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cardNumberRefExists, setCardNumberRefExists] = useState<
    boolean | null
  >(null);

  const auth = getAuth();
  const db = getDatabase();
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const cardNumbersRef = ref(
          db,
          "users/" + currentUser.uid + "/cardNumbers"
        );
        const snapshot = await get(cardNumbersRef);
        const cardNumbers = snapshot.val();
        setCardNumberRefExists(
          cardNumbers && Object.keys(cardNumbers).length > 0
        );
      } else {
        setCardNumberRefExists(null);
      }
    });
    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [auth, db]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NavigateBasedOnAuth
              user={user}
              cardNumberRefExists={cardNumberRefExists}
            />
          }
        />
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/dashboard"
          element={<Dashboard transactions={[{ timestamp: "21" }]} />}
        />
      </Routes>
    </Router>
  );
};

const NavigateBasedOnAuth: React.FC<{
  user: User | null;
  cardNumberRefExists: boolean | null;
}> = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  else return <Navigate to="/dashboard" replace />;
};

export default App;
