export function formatCoureCategorieResponse(coureCategorie) {
  return {
    id: coureCategorie.coureCategorieId,
    email: coureCategorie.email,
    role: coureCategorie.roleName,
  };
}
