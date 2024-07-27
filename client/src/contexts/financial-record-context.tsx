import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: Partial<FinancialRecord>) => void;
  deleteRecord: (id: string) => void;
}
export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();
  const fetchRecord = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3001/financial-records/getAllByUserId/${user?.id}`
    );
    if (response.ok) {
      const records = await response.json();
      setRecords(records);
    }
  };
  useEffect(() => {
    fetchRecord();
  }, [user]);
  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("http://localhost:3001/financial-records", {
      method: "post",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = async (
    id: string,
    newRecord: Partial<FinancialRecord>
  ) => {};

  const deleteRecord = async (id: string) => {};
  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context)
    throw new Error(
      "useFinancialRecords must be used withit a FinancialRecordsProvider"
    );

  return context;
};
