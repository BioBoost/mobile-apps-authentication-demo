import Api from "@/services/Api";

export default {
  register(accountInfo) {
    return Api().post("register", accountInfo);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
  logout() {
    return Api().delete("logout");
  },
};