//let BaseUrl = "https://poct.zjubme307.cn/mzz";
let BaseUrl = "http://localhost:8484";

const loginUrl = BaseUrl + "/auth/login";
const patientGetUricAcidRecordsByTimeGapUrl = BaseUrl + "/api/ua/get/by/time";
const getPatientInfoUrl = BaseUrl + "/api/patient/wx/info"
const patientGetFluRecordsByTimeGapUrl = BaseUrl + "/api/fluorescent/get/by/time";
const getPatientInfoListUrl = BaseUrl + "/api/admin/patient/list";
const givePatientMessageUrl = BaseUrl + "/api/admin/message/create";
const getLatestMessageUrl = BaseUrl + "/api/message/get/latest";
const commitDmRecordUrl = BaseUrl + "/api/dm/create";
const getLatestDmUrl = BaseUrl + "/api/dm/get/latest";
const getWeekDmUrl = BaseUrl + "/api/dm/get/week";
const getWeekDmReportUrl = BaseUrl + "/api/dm/get/week/report";
const getMonthDmReportUrl = BaseUrl + "/api/dm/get/month/report";
const getDmByTimePointUrl = BaseUrl + "/api/dm/get/by/time/point";
const getOgttTestResultUrl = BaseUrl + "/api/dm/ogtt/test";
const getDmTipUrl = BaseUrl + "/api/dm/get/tip/by/dm";
const getLatestUaUrl = BaseUrl + "/api/ua/get/latest";
const commitUaRecordUrl = BaseUrl + "/api/ua/create/single";
const getWeekUaReportUrl = BaseUrl + "/api/ua/get/week/report";
const getMonthUaReportUrl = BaseUrl + "/api/ua/get/month/report";
const getUaTipUrl = BaseUrl + "/api/ua/get/tip/by/ua";
const getFluTipsUrl = BaseUrl + "/api/fluorescent/get/tips";
const getKnoByTypeUrl = BaseUrl + "/api/kno/get/by/type"
const getKnoByIDUrl = BaseUrl + "/api/kno/get/by/id"

export {
    loginUrl,
    getPatientInfoUrl,
    patientGetUricAcidRecordsByTimeGapUrl,
    patientGetFluRecordsByTimeGapUrl,
    getPatientInfoListUrl,
    givePatientMessageUrl,
    getLatestMessageUrl,
    commitDmRecordUrl,
    getLatestDmUrl,
    getWeekDmUrl,
    getWeekDmReportUrl,
    getMonthDmReportUrl,
    getDmByTimePointUrl,
    getOgttTestResultUrl,
    getDmTipUrl,
    getLatestUaUrl,
    commitUaRecordUrl,
    getWeekUaReportUrl,
    getMonthUaReportUrl,
    getUaTipUrl,
    getFluTipsUrl,
    getKnoByTypeUrl,
    getKnoByIDUrl,
}