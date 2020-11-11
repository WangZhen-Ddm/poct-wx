//let BaseUrl = "https://poct.zjubme307.cn/mzz";
let BaseUrl = "http://localhost:8484";

const loginUrl = BaseUrl + "/auth/login";
const patientGetUricAcidRecordsByTimeGapUrl = BaseUrl + "/api/ua/get/by/time";
const getPatientInfoUrl = BaseUrl + "/api/patient/wx/info"
const patientGetFluRecordsByTimeGapUrl = BaseUrl + "/api/fluorescent/get/by/time";
const getPatientInfoListUrl = BaseUrl + "/api/admin/patient/list";

export {
    loginUrl,
    getPatientInfoUrl,
    patientGetUricAcidRecordsByTimeGapUrl,
    patientGetFluRecordsByTimeGapUrl,
    getPatientInfoListUrl,
}