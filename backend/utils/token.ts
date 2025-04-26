export const getToken = (): string => {
    const token = sessionStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
  };