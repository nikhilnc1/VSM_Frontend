import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  


  constructor(private http: HttpClient, private router: Router) { }
  addVehicle(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/vehicle/add`, postData);
  }

  getScheduledList() {
    return this.http.get(`${environment.apiBaseUrl}/vehicle/getByServiceStatus/Scheduled`);
  }

  registerUser(postData: any)
  {
    return this.http.post(`${environment.apiBaseUrl}/user/signup`, postData);
  }

  getLogin(postData: any)
  {
    return this.http.post(`${environment.apiBaseUrl}/user/login`, postData)
  }

  getAllBrands() {
    return this.http.get(`${environment.apiBaseUrl}/answers/getAllanswers`);
  }
  addBrand(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/brands/newBrand`, postData);
  }
  getBrandByID(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/brands/SearchBrands`, postData);
  }
  updateBrand(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/brands/updateBrand`, postData);
  }
  getAllCar(modelID: number) {
    return this.http.get(`${environment.apiBaseUrl}/car/getAllCar/` + modelID);
  }
  addCar(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/car/newCar`, postData);
  }
  updateCar(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/car/updateCar`, postData);
  }
  getCarByID(postData: number) {
    //return this.http.post(`${environment.apiBaseUrl}/car/SearchCar`,postData);
    return this.http.get(`${environment.apiBaseUrl}/car/getCarByID/` + postData);
  }
  updateCarGraphic(postData: FormData) {
    return this.http.post(`${environment.apiBaseUrl}/graphic/updateCarGraphics`, postData);
  }
  getCarGraphic(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/graphic/Searchgraphic`, postData);
  }
  // loginUser(postData:any){
  //   return this.http.post(`${environment.apiBaseUrl}/login`,postData);
  // }
  getAllModel(brandID: number) {
    return this.http.get(`${environment.apiBaseUrl}/Model/getAllModel/` + brandID);
  }
  getAllCategory() {
    return this.http.get(`${environment.apiBaseUrl}/category/getAllCategory`);
  }
  getAllOptions() {
    return this.http.get(`${environment.apiBaseUrl}/options/getAllOptions`);
  }
  getAllcategorytype() {
    return this.http.get(`${environment.apiBaseUrl}/answers/getAllanswers`);
  }
  getAllStaterto() {
    return this.http.get(`${environment.apiBaseUrl}/staterto/getAllStaterto`);
  }
  updateStaterto(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/staterto/updateStaterto`, postData);
  }
  getAllGraphictype() {
    return this.http.get(`${environment.apiBaseUrl}/graphictype/getAllGraphictype`);
  }
  getAllvariable() {
    return this.http.get(`${environment.apiBaseUrl}/variable/getAllvariable`);
  }
  addModel(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/Model/newModel`, postData);
  }
  addCategory(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/category/newCategory`, postData);
  }
  updateCategory(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/category/updateCategory`, postData);
  }
  addCategorytype(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/answers/newAnswers`, postData);
  }
  updateCategorytype(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/categorytype/updatecategorytype`, postData);
  }
  addGraphictype(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/graphictype/newGraphictype`, postData);
  }
  updateGraphictype(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/graphictype/updatGraphictype`, postData);
  }
  getGraphictypeByID(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/graphictype/SearchGraphictype`, postData);
  }
  addOption(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/options/newOptions`, postData);
  }
  updateOption(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/options/updateOptions`, postData);
  }
  addStaterto(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/staterto/newStaterto`, postData);
  }
  addVariable(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/variable/Addnewvariable`, postData);
  }
  updateVariable(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/variable/updatevariable`, postData);
  }
  updateModel(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/Model/updateModel`, postData);
  }
  getModelByID(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/Model/SearchModel`, postData);
  }
  getAllUsers() {
    return this.http.get(`${environment.apiBaseUrl}/user/getAllusers`);
  }
  addUser(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/user/newUser`, postData);
  }
  updateUser(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/user/updateUser`, postData);
  }
  getAllRole() {
    return this.http.get(`${environment.apiBaseUrl}/role/getAllRole`);
  }
  updateRole(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/role/updateRole`, postData);
  }
  addRole(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/role/newRole`, postData);
  }
  getRoleByID(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/role/SearchRole`, postData);
  }
  getAllCount() {
    return this.http.get(`${environment.apiBaseUrl}/user/UserCount`);
  }
  getOptionsByCategoryID(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/options/SearchOptions`, postData);
  }
  getCategoryChildCount(ID: number) {
    return this.http.get(`${environment.apiBaseUrl}/category/parentCount/` + ID);
  }
  getAllmodeltype() {
    return this.http.get(`${environment.apiBaseUrl}/model_type/getAllModelType`);
  }
  updateModeltype(postData: any) {
    return this.http.put(`${environment.apiBaseUrl}/model_type/updateModeltype`, postData);
  }
  addModeltype(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/model_type/newModelType`, postData);
  }
  getAllAccess() {
    return this.http.get(`${environment.apiBaseUrl}/access/getAllAccess`);
  }
  getRoleAccess(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/roleaccess/SearchroleAccess`, postData);
  }
  getAccessLinksForRole(roleId: number) {
    return this.http.get(`${environment.apiBaseUrl}/roleaccess/getAccessLinksByRole/` + roleId);
  }
  getModelDoc(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/model_doc/SearchModelDoc`, postData);
  }
  updateModelDoc(postData: FormData) {
    return this.http.post(`${environment.apiBaseUrl}/model_doc/updateModelDoc`, postData);
  }
  resetPassword(postData: FormData) {
    return this.http.post(`${environment.apiBaseUrl}/users/resetPassword`, postData);
  }
  getOptionByCategory(postData: any) {
    return this.http.post(`${environment.apiBaseUrl}/graphic/SearchOptions`, postData);
  }


// Future selves Datatransfer-Services start Here
loginUser(postData:any){
     return this.http.post(`${environment.apiBaseUrl}/login`,postData);
   }

getSoundBite() {
  return this.http.get(`${environment.apiBaseUrl}/getsound_bites`);
}
getdegree(){
  return this.http.get(`${environment.apiBaseUrl}/degreess`);
}

getethinicity()
{
  return this.http.get(`${environment.apiBaseUrl}/ethnicity`);
}

getcountry()
{
  return this.http.get(`${environment.apiBaseUrl}/country`);
}

getindustry(){
  return this.http.get(`${environment.apiBaseUrl}/industry`);
}

getregionalAccent()
{
  return this.http.get(`${environment.apiBaseUrl}/regional_accent`);
}

getsexualOrientation()
{
  return this.http.get(`${environment.apiBaseUrl}/sexual_orientation`);
}

getreligion()
{
  return this.http.get(`${environment.apiBaseUrl}/religion`);
}

getfollowers()
{
  return this.http.get(`${environment.apiBaseUrl}/getsingleidfollowers`);
}

getpages()
{
  return this.http.get(`${environment.apiBaseUrl}/pages`);
}

getquiz()
{
  return this.http.get(`${environment.apiBaseUrl}/quiz`);
}

gettagtitle(ID:any){
  return this.http.get(`${environment.apiBaseUrl}/tags/${ID}`);
}
uploadurl(postData:any){
  const formData: FormData = new FormData();
   formData.append('file', postData);
  return this.http.put(`${environment.apiBaseUrl}/voxpod/${postData.name}`,postData);
  // { headers: new HttpHeaders
  //   ({'Content-Type': 'application/pdf'}) 
  // });
  }
gettags(){
  return this.http.get(`${environment.apiBaseUrl}/testtags`);
}
updateStatus(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updatestatus`,postData);
}
updateAllData(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updatetagtitle`,postData);
}
updateDegree(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updatedegree`,postData);
}

updateregional(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/allregionalupdate`,postData);
}

updateEthinicity(postData:any)
{
  return this.http.patch(`${environment.apiBaseUrl}/allupdateethnicity`,postData);
}

updateIndustry(postData:any)
{
  return this.http.patch(`${environment.apiBaseUrl}/updateindustry`,postData);
}

updatesexualOrientation(postData:any)
{
  return this.http.patch(`${environment.apiBaseUrl}/updatesexualorientation`,postData);
}

updatereligion(postData:any)
{
  return this.http.patch(`${environment.apiBaseUrl}/updatereligions`,postData);
}

updatepages(postData:any)
{
  return this.http.patch(`${environment.apiBaseUrl}/updatepages`,postData);
}

updatefollowers(postData:any)
{
  return this.http.patch(`${environment.apiBaseUrl}/updatefollowers`,postData);
}

addfollowers(postData:any)
{
  return this.http.post(`${environment.apiBaseUrl}/addfollowers`,postData);
}

addpages(postData:any)
{
  return this.http.post(`${environment.apiBaseUrl}/addpages`,postData);
}

addIndustry(postData:any)
{
  return this.http.post(`${environment.apiBaseUrl}/saveindustry`,postData);
}

addcountry(postData:any)
{
  return this.http.post(`${environment.apiBaseUrl}/savecountry`,postData);
}

addDegree(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/allupdatedegrees`,postData);
}

addnewDegree(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/adddegrees`,postData);
}

addreligion(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/savereligions`,postData);
}

addEthnicity(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/saveethnicity`,postData);
}

addregionalAccent(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/saveregionalaccent`,postData);
}

addsexualOrientation(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/savesexualorientation`,postData);
}



addcollection(postData:any){
  return this.http.post(`${environment.apiBaseUrl}/saveplaylist`,postData);
}
getCollection(){
  return this.http.get(`${environment.apiBaseUrl}/getallplaylist`);
}
deletecollection(postData:any){
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      PL_id : postData
    },
  }
  return this.http.delete(`${environment.apiBaseUrl}/saveplaylist`,options);
}
allupdatedegree(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/allupdatedegrees`,postData);

}
updatereason(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updateresion`,postData);
}
allupdateplayList(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updateplaylist`,postData);
}
updateAllplayList(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updateplaylist`,postData);
}
updateAll(postData:any){
  return this.http.patch(`${environment.apiBaseUrl}/updatedprecord`,postData);
}
}
