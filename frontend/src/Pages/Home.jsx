import React from 'react';
import Balance from '../components/Balance';
import ToggleBtn from '../components/ToggleBtn';
import RecentTransactions from '../components/RecentTransactions';

const Home = () => {
  return (
    <div className="p-6">
      <Balance />
      <ToggleBtn />
      <RecentTransactions />
    </div>
  );
};

export default Home;
