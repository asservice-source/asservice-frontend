//export const API_SERVER_URL = 'http://192.168.1.18:8080/API-ASService/'//'http://192.168.1.203:8080/api-asservice-front/';
export const API_SERVER_URL = 'http://192.168.1.203:8080/api-asservice-front/';
export const API_MAPS_KEY = 'AIzaSyBpBMthbC5-MRsz8Vga99LLlxMDibt24dc';

export class ReportPath{
  public static POPULATION = API_SERVER_URL + 'report/population/ViewYearlyReport';
  public static DEATH = API_SERVER_URL + 'report/death/ViewMonthlyReport';
  public static PREGNANCY = API_SERVER_URL + 'report/pregnancy/ViewMonthlyReport';
  public static PATIENT = API_SERVER_URL + 'report/patient/ViewMonthlyReport';
  public static METABOLIC = API_SERVER_URL + 'report/metabolic/ViewReportOfPersonInformation';
  public static MOSQUITO = API_SERVER_URL + 'report/hici/mosquito/ViewMonthlyReportOfHICISummaryForTumbol';


}
