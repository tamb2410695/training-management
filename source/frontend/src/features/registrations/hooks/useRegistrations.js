
import { useCrud } from "../../../hooks";
import accountService from "../services/accountsService";

export function useAccounts() {
  const crud = useCrud(accountService, { resourceName: "accounts" });

  return {
    accounts: crud.items,
    loading: crud.loading,
    error: crud.error,
    pagination: crud.pagination,
    loadAccounts: crud.getList,
    createAccount: crud.createItem,
    updateAccount: crud.updateItem,
    deleteAccount: crud.deleteItem,
    
    changeAccountRole: async (id, targetRoleCode) => {
      await accountService.changeRole(id, targetRoleCode);
      await crud.getList({ page: crud.pagination.page, limit: crud.pagination.limit });
    }
  };
}