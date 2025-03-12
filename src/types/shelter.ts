export interface Shelter {
  careNm: string;
  orgNm: string;
  divisionNm: string;
  saveTrgtAnimal: string;
  careAddr: string;
  jibunAddr: string;
  lat: number;
  lng: number;
  dsignationDate: string;
  weekOprStime: string;
  weekOprEtime: string;
  weekCellStime: string;
  weekCellEtime: string;
  weekendOprStime: string;
  weekendOprEtime: string;
  weekendCellStime: string;
  weekendCellEtime: string;
  closeDay: string;
  vetPersonCnt: number;
  specsPersonCnt: number;
  medicalCnt: number;
  breedCnt: number;
  quarabtineCnt: number;
  feedCnt: number;
  careTel: string;
  dataStdDt: string;
}

export interface UpperOrgType {
  orgCd: string;
  orgdownNm: string;
}

export interface OrgType {
  uprCd: string;
  orgCd: string;
  orgdownNm: string;
}

export interface ShelterWithRegNo {
  careRegNo: string | null;
  careNm: string | null;
  orgNm: string | null;
  divisionNm: string | null;
  saveTrgtAnimal: string | null;
  careAddr: string | null;
  jibunAddr: string | null;
  lat: number | null;
  lng: number | null;
  dsignationDate: string | null;
  weekOprStime: string | null;
  weekOprEtime: string | null;
  weekCellStime: string | null;
  weekCellEtime: string | null;
  weekendOprStime: string | null;
  weekendOprEtime: string | null;
  weekendCellStime: string | null;
  weekendCellEtime: string | null;
  closeDay: string | null;
  vetPersonCnt: number | null;
  specsPersonCnt: number | null;
  medicalCnt: number | null;
  breedCnt: number | null;
  quarabtineCnt: number | null;
  feedCnt: number | null;
  careTel: string | null;
  dataStdDt: string | null;
}

export const initialShelter = {
  careRegNo: null,
  careNm: null,
  orgNm: null,
  divisionNm: null,
  saveTrgtAnimal: null,
  careAddr: null,
  jibunAddr: null,
  lat: null,
  lng: null,
  dsignationDate: null,
  weekOprStime: null,
  weekOprEtime: null,
  weekCellStime: null,
  weekCellEtime: null,
  weekendOprStime: null,
  weekendOprEtime: null,
  weekendCellStime: null,
  weekendCellEtime: null,
  closeDay: null,
  vetPersonCnt: null,
  specsPersonCnt: null,
  medicalCnt: null,
  breedCnt: null,
  quarabtineCnt: null,
  feedCnt: null,
  careTel: null,
  dataStdDt: null,
};
