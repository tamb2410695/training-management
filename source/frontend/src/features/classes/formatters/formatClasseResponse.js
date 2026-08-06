export function formatClasseResponse(classe) {
  return {
    id: classe.classeId,
    email: classe.email,
    role: classe.roleName,
  };
}
