import { useEffect, useState } from "react";

import { useAccounts } from "../hooks/useAccounts";

import AccountToolbar from "../components/AccountToolbar";

import AccountTable from "../components/AccountTable";

import AccountFormModal from "../components/AccountFormModal";

import AccountDeleteModal from "../components/AccountDeleteModal";

function AccountsPage() {
  const {
    accounts,
    loading,
    loadAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  } = useAccounts();

  const [keyword, setKeyword] = useState("");

  const [selectedAccount, setSelectedAccount] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    loadAccounts({
      keyword,
    });
  }, [keyword]);

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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Account Management</h2>

      <AccountToolbar
        keyword={keyword}
        onKeywordChange={setKeyword}
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
