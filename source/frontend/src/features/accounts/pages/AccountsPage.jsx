import { useEffect, useState } from "react";

import { useAccounts } from "../hooks/useAccounts";

import AccountDeleteModal from "../components/AccountDeleteModal";
import AccountToolbar from "../components/AccountToolbar";
import AccountTable from "../components/AccountTable";
import AccountFormModal from "../components/AccountModal";
import { ACCOUNT_QUERY_DEFAULTS } from "../constants/accountDefaults";

function AccountsPage() {
  const {
    accounts,
    loading,
    loadAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  } = useAccounts();

  const [query, setQuery] = useState(ACCOUNT_QUERY_DEFAULTS);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

useEffect(() => {
  const cleanParams = Object.fromEntries(
    Object.entries(query)
      .filter(([_, value]) => value !== "" && value !== null && value !== undefined)
      .map(([key, value]) => {
        if (key === 'page' || key === 'limit') {
          return [key, Number(value)];
        }
        return [key, value];
      })
  );
    
    loadAccounts(cleanParams);
  }, [query]);

  const handleCreate = () => {
    setSelectedAccount(null);
    setShowForm(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowForm(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setShowDelete(true);
  };

  const handleSubmit = async (formData) => {
    if (selectedAccount) {
      await updateAccount(selectedAccount.accountId, formData);
    } else {
      await createAccount(formData);
    }

    setShowForm(false);
    setSelectedAccount(null);
  };

  const handleConfirmDelete = async () => {
    await deleteAccount(selectedAccount.accountId);

    setShowDelete(false);
    setSelectedAccount(null);
  };

  const handleSearch = (newKeyword) => {
    setQuery((prev) => ({
      ...prev,
      search: newKeyword,
      page: 1,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Account Management</h2>

      <AccountToolbar
        keyword={query.search || ""}
        onKeywordChange={handleSearch}
        onCreate={handleCreate}
      />

      <AccountTable
        data={accounts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AccountFormModal
        open={showForm}
        account={selectedAccount}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
      />

      <AccountDeleteModal
        open={showDelete}
        account={selectedAccount}
        onClose={() => setShowDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AccountsPage;
