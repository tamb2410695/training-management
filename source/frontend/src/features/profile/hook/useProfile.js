import { useAuth } from "@/hooks/auth/useAuth";

export function useProfile() {
  const { user } = useAuth();

  return {
    user,
    loading: !user,
  };
}
