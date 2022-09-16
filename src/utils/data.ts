export interface IData {
  key: string;
  value: any;
}
let jpdisambiguationData: IData = {
  key: "",
  value: undefined,
};

export const getjpdisambiguationDataData = (key) => {
  return jpdisambiguationData[key];
};
export const setjpdisambiguationDataData = (data: IData) => {
  jpdisambiguationData[data.key] = data.value;
};
