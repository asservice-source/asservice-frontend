// export const API_SERVER_URL = 'http://localhost:8080/API-ASService/';
export const API_SERVER_URL = 'http://192.168.1.203:8080/api-asservice-front/';
//export const API_SERVER_URL = 'http://192.168.1.203:8080/api-session-demo/';
export const API_MAPS_KEY = 'AIzaSyBpBMthbC5-MRsz8Vga99LLlxMDibt24dc';

export class ReportPath{
  public static POPULATION = API_SERVER_URL + 'report/population/ViewYearlyReport';
  public static POPULATION_BLANK_FORM = API_SERVER_URL + 'report/population/NewForm';

  public static DEATH = API_SERVER_URL + 'report/death/ViewMonthlyReport';
  public static DEATH_BLANK_FORM = API_SERVER_URL + 'report/death/NewForm';
                                         
  public static PREGNANCY = API_SERVER_URL + 'report/pregnancy/ViewMonthlyReport';
  public static PREGNANCY_BLANK_FORM = API_SERVER_URL + 'report/pregnancy/NewForm';

  public static PATIENT = API_SERVER_URL + 'report/patient/ViewMonthlyReport';
  public static PATIENT_BLANK_FORM = API_SERVER_URL + 'report/patient/NewForm';

  public static METABOLIC = API_SERVER_URL + 'report/metabolic/ViewReportOfPersonInformation';
  public static METABOLIC_BLANK_FORM = API_SERVER_URL + 'report/metabolic/NewForm';

  public static MOSQUITO = API_SERVER_URL + 'report/hici/mosquito/ViewMonthlyReportOfHICISummaryForTumbol';

  public static MOSQUITO_HICI = API_SERVER_URL + 'report/hici/mosquito/ViewMonthlyReportOfHICISummaryForVillage';
  public static MOSQUITO_HICI_BLANK_FORM = API_SERVER_URL + 'report/hici/mosquito/NewForm';

  public static CANCER = API_SERVER_URL + 'report/cancer/ViewMonthlyReport';
  public static CANCER_BLANK_FORM = API_SERVER_URL + 'report/cancer/NewForm';

}
