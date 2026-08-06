export function formatDocumentResponse(document) {
  return {
    id: document.documentId,
    email: document.email,
    role: document.roleName,
  };
}
