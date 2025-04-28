export const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID(); // Cria um ID aleatório seguro
      localStorage.setItem('userId', userId);
    }
    return userId;
  };