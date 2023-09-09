import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import Dashboard from './Dashboard';
import CardForm from './CardForm';
import { User, getAuth } from 'firebase/auth';
import { DatabaseReference, getDatabase, ref } from 'firebase/database';

const App: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const cardNumberRef = ref(db, 'users/' + user?.providerId + '/cardNumber');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavigateBasedOnAuth user={user} cardNumberRef={cardNumberRef} />} />
        <Route path="/dashboard" element={<Dashboard transactions={[{ timestamp: '21' }]} />} />
        <Route path="/cardform" element={<CardForm />} />
      </Routes>
    </Router>
  );
}

const NavigateBasedOnAuth: React.FC<{ user: User | null, cardNumberRef: DatabaseReference | null }> = ({ user, cardNumberRef }) => {
  if (user) {
    return cardNumberRef ? <Dashboard transactions={[{ timestamp: '21' }]} /> : <CardForm />;
  }
  return <LoginSignup />;
}

export default App;
