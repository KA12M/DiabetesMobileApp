import { makeAutoObservable, runInAction } from "mobx";

import SoundList from "../mocks/hearingSoundList";

export default class HearingStore {
  data = { left: [], right: [] };
  result = null;
  current = 1;
  btnResultReady = false;
  ear = "";
  isTesting = false;

  constructor() {
    makeAutoObservable(this);

    this.data = SoundList;
  }

  setCurrent = (num) => (this.current = num);
  setBtnResultReady = (bool) => (this.btnResultReady = bool);

  // ประมวลผล
  handleProcess = (id, volume) => {
    this.data[this.ear] = this.data[this.ear].map((el) => {
      if (el.id == id) el.isHeard = volume;
      return el;
    });
    this.setCurrent(
      this.current <= this.data[this.ear].length
        ? this.current + 1
        : this.current
    );
  };

  // เริ่มทดสอบ
  handleIsTesting = (bool = true) => (this.isTesting = bool);
  setEar = (ear) => (this.ear = ear);

  // ประมวลผลข้อมูลลง result
  processResult = () => (this.result = transformData(this.data));

  // เช็คความพร้อมของข้อมูล
  checkResultReady = () => {
    const notHeardCount = this.data.filter((item) => item.isHeard != 0).length;

    const percentNotHeard = (notHeardCount / this.data.length) * 100;

    return {
      notHeardCount,
      percentNotHeard,
      valid: notHeardCount == this.data.length,
    };
  };

  // ล้างข้อมูลที่ประมวลผล
  clearResult = () => (this.result = null);

  // สร้างข้อมูล hearing ไป API
  newHearing = async (userId) => {
    if (!this.result) return;

    this.result.userId = userId;
    try {
      // var response = await agent.hearing.createHearing(formData);
      runInAction(() => {
        // console.log(response);
        // TODO: after new hearing...
      });
    } catch (error) {
      throw error;
    }
  };

  clearResults = () => {
    this.data = SoundList;
    this.ear = "";
    this.current = 1;
    this.result = null;
    this.isTesting = false;
    this.btnResultReady = false;
  };
}

// function แปลงข้อมูลซ้ายขวาที่ใช้ในแอพเป็นข้อมูลที่จะบันทึกลง db
function transformData(dataList) {
  // ตั้งต้นข้อมูลที่จะส่งไป API
  const transformedData = { items: [] };

  // ลูปข้อมูลของหูซ้ายขวา
  for (let ear = 0; ear < 2; ear++) {
    const item = {
      ear: ear,
    };

    // ลูปข้อมูลเพิ่มฟีลตาม volume
    dataList[ear == 0 ? "left" : "right"].forEach((el) => {
      item[el.title] = el.isHeard ?? 9999;
      item[el.result] = processHearing(el.isHeard);
    });

    // เพิ่มข้อมูลเข้า
    transformedData.items.push(item);
  }
  console.log("new", JSON.stringify(transformedData, null, 2));
  return transformedData;
}

function processHearing(isHeard) {
  if (isHeard === null) {
    return "Data not available"; // or any other appropriate message
  }

  switch (isHeard) {
    case isHeard >= -10 && isHeard <= 25:
      return "การได้ยินปรกติ";
    case isHeard >= 26 && isHeard <= 40:
      return "ระดับน้อย";
    case isHeard >= 41 && isHeard <= 55:
      return "ระดับปานกลาง";
    case isHeard >= 56 && isHeard <= 70:
      return "ระดับปานกลางค่อนข้างรุนแรง";
    case isHeard >= 71 && isHeard <= 90:
      return "ระดับรุนแรง";
    case isHeard > 90:
      return "ระดับหูหนวก";
    default:
      return "Invalid input";
  }
}
