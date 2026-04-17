/**
 * Script de limpeza de dados de teste
 * Remove todos os dados de teste do localStorage, sessionStorage e IndexedDB
 */

export function cleanupAllTestData() {
  console.log("🧹 Iniciando limpeza de dados de teste...");

  // Limpar localStorage
  localStorage.clear();
  console.log("✓ localStorage limpo");

  // Limpar sessionStorage
  sessionStorage.clear();
  console.log("✓ sessionStorage limpo");

  // Limpar cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
  console.log("✓ Cookies limpos");

  // Limpar IndexedDB
  if (window.indexedDB) {
    indexedDB.databases().then((dbs) => {
      dbs.forEach((db) => {
        if (db.name) {
          indexedDB.deleteDatabase(db.name);
        }
      });
    });
    console.log("✓ IndexedDB limpo");
  }

  // Recarregar página
  console.log("✅ Limpeza concluída! Recarregando página...");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

export function resetApplicationState() {
  console.log("🔄 Resetando estado da aplicação...");

  // Limpar dados de conversas
  localStorage.removeItem("conversations");
  localStorage.removeItem("selectedConversation");

  // Limpar dados de contatos
  localStorage.removeItem("contacts");

  // Limpar dados de leads
  localStorage.removeItem("leads");
  localStorage.removeItem("salesFunnel");

  // Limpar dados de usuário
  localStorage.removeItem("user");
  localStorage.removeItem("auth");

  // Limpar dados de UI
  localStorage.removeItem("sidebarOpen");
  localStorage.removeItem("theme");

  console.log("✅ Estado da aplicação resetado!");
}

export function getCleanupStats() {
  const stats = {
    localStorage: localStorage.length,
    sessionStorage: sessionStorage.length,
    cookies: document.cookie.split(";").length,
    timestamp: new Date().toISOString(),
  };

  return stats;
}
