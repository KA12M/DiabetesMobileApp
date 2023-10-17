import { makeAutoObservable, runInAction } from "mobx";
import { ImageAPI } from "./api/agent";

export default class CommonStore {
  loading = false;
  dataResponse = null;

  constructor() {
    makeAutoObservable(this);
  }

  handleCalculate = async (img) => {
    this.loading = true;
    try {
      const res = await ImageAPI.CalDiabetes(img);
      runInAction(() => {
        console.log(res);
        this.dataResponse = res;
        return res;
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  clearResponse = () => (this.dataResponse = null);
}
