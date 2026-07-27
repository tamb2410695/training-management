
import { useCrud } from "@/hooks";
import accountsService from "../services/coursesService";

export function useAccounts() {
  const crud = useCrud(accountsService, { resourceName: "accounts" });

  return {
    accounts: crud.items,
    loading: crud.loading,
    error: crud.error,
    pagination: crud.pagination,
    loadAccounts: crud.getList,
    createAccount: crud.createItem,
    updateAccount: crud.updateItem,
    deleteAccount: crud.deleteItem,
    
    changeaccountRole: async (id, targetRoleCode) => {
      await accountsService.changeRole(id, targetRoleCode);
      await crud.getList({ page: crud.pagination.page, limit: crud.pagination.limit });
    }
  };
}