import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/clerk-react";
import FinancialRecordForm from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";

import { useMemo } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { Navigate } from "react-router-dom";
export default function Dashboard() {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="dashboard-container">
      <SignedIn>
        <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
        <FinancialRecordForm />
        <div>Total Monthly: ${totalMonthly}</div>
        <FinancialRecordList />
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </div>
  );
}
