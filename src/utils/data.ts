export interface IData {
  key: string;
  value: any;
}
export interface IWikiValue {
  loginToken?: string;
  csrfToken?: string;
}
export interface IWikiData {
  key: string;
  value: IWikiValue;
}
let wikiData: IWikiData = {
  key: "",
  value: undefined,
};
let journeyResultsnData: IData = {
  key: "",
  value: undefined,
};
let jpdisambiguationData: IData = {
  key: "",
  value: undefined,
};
export const getjpdisambiguationData = (key) => {
  return jpdisambiguationData[key];
};
export const setjpdisambiguationData = (data: IData) => {
  jpdisambiguationData[data.key] = data.value;
};
export const getjourneyResultsnData = (key) => {
  return journeyResultsnData[key];
};
export const setjourneyResultsnData = (data: IData) => {
  journeyResultsnData[data.key] = data.value;
};

export const getwikiResultsnData = (key) => {
  return wikiData[key];
};
export const setjwikiResultsnData = (data: IWikiData) => {
  wikiData[data.key] = data.value;
};
