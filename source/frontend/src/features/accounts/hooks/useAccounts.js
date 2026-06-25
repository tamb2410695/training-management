/* eslint-disable no-unused-vars */
import { useState } from "react";
import accountService from "../services/accountsService";

export function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const loadAccounts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined,
        ),
      );

      const response = await accountService.getList(cleanParams);

      setAccounts(response.data.accounts);
      setPagination(response.pagination);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (data) => {
    await accountService.create(data);

    await loadAccounts();
  };

  const updateAccount = async (id, data) => {
    await accountService.update(id, data);

    await loadAccounts();
  };

  const deleteAccount = async (id) => {
    await accountService.remove(id);

    await loadAccounts();
  };

  return {
    accounts,
    loading,
    error,
    pagination,
    loadAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  };
}
