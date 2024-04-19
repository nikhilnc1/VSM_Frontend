import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { Constants } from 'src/app/config/constants';
declare var $: any;
@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss']
})
export class AddEditCarComponent implements OnInit {
  carForm: FormGroup;
  uploadForm: FormGroup;
  submitted = false;
  queryParam: any;
  title = 'Add New';
  isReadonly = false;
  brands: any;
  models: any;
  categoryList: any;
  graphictypeList: any;
  checkBoxCategoryList: any = [];
  checkBoxValues: any = [];
  showUploadInput = false;
  url: any = '';
  brandID = 0;
  imgBaseURL = Constants.IMG_API_BASE;
  tempForm: any = [];
  constructor(private formBuilder: FormBuilder,
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    this.carForm = this.formBuilder.group({
      CA_modelId: ['', [Validators.required]],
      CA_brandId: ['', [Validators.required]],
      CA_exshowroomprice: ['', [Validators.required]],
      CA_variant: ['', [Validators.required]],
      CA_enginecc: ['', [Validators.required]],
      CA_fuel: ['', [Validators.required]],
      CA_id: [''],
      CA_isDiscontinued: [1, [Validators.required]],
      CA_slug: ['', [Validators.required]],
      Car_Data: [''],//for sending categories to save and update
      CheckBoxValues: ['']
    });
    this.uploadForm = this.formBuilder.group({
      GRA_carId: [''],
      GRA_typeId: [''],
      GRA_caption: [''],
      GRA_url: ['']
    });
  }

  ngOnInit(): void {
    this.queryParam = this.activeRoute.snapshot.queryParams.id;
    console.log('this.queryParam', this.queryParam);
    this.getAllCategory();
    this.getAllBrands();
    this.getAllModels(this.brandID);
    this.getAllGraphictype();
    if (this.queryParam != (undefined || null)) {
      if (this.activeRoute.snapshot.queryParams.view) {
        this.title = "View";
        this.isReadonly = true;
      }
      else {
        this.title = 'Edit';
      }
      this.getCarByID(this.queryParam);
    }
  }
  get f() {
    return this.carForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.carForm.reset();
  }
  getAllBrands() {
    this.dataTransferService.getAllBrands().subscribe((res: any) => {
      console.log('getAllBrands:', res);
      if (res.status == 200) {
        this.brands = res.obj;
      }
      if (res.logout || res.status == 403) {
        this.toastr.info(res.message);
        this.router.navigate(['/login']);
      }
    })
  }
  categoryFormFields: any = [];
  getAllCategory() {
    var postData = {};
    this.dataTransferService.getAllCategory().subscribe((res: any) => {
      console.log('getAllCategory', res);
      if (res.status == 200) {
        this.categoryList = res.obj;
        this.categoryList.forEach((element1: any) => {
          var dropdown = false;
          this.categoryList.forEach((element2: any) => {
            if (element1.CAT_parentId == null) {
              if (element1.CAT_id == element2.CAT_parentId) {
                dropdown = true;
                //console.log('parent ID', element1.CAT_title, element2.CAT_title);
                this.categoryFormFields.forEach((category: any) => {
                  if (category.fieldname == element1.CAT_id) {
                    this.categoryFormFields = this.categoryFormFields.filter(function (item: any) {
                      return item !== category;
                    })
                  }
                });
                this.categoryFormFields.push({ fieldname: element2.CAT_id, dropdown: true, title: element2.CAT_title, categoryType: element2.CAT_categorytypeId });
              }
              else {
                if ((element1.CAT_parentId == null) && (element2.CAT_parentId == null) && (element1.CAT_id == element2.CAT_id)) {
                  //console.log("element1.CAT_id,element1.CAT_parentId,element2.CAT_parentId", element1.CAT_title, element2.CAT_title, element1.CAT_parentId, element2.CAT_parentId)
                  dropdown = false;
                  this.categoryFormFields.push({ fieldname: element1.CAT_id, dropdown: false, title: element1.CAT_title, categoryType: element1.CAT_categorytypeId });
                }
              }
            }
          });

        });
        this.addCategoryFormFields();

        //console.log('form after adding category', this.carForm.value);
      }

    })
  }
  categoryFormValues: any = {};
  addCategoryFormFields() {

    var postData = {};
    this.categoryFormFields.forEach((element: any, index: number) => {
      //console.log('categoryFormFields,', this.categoryFormFields);
      if (element.dropdown || element.categoryType == 2) {
        postData = { "findby": "categoryId", "value": element.fieldname },
          this.dataTransferService.getOptionsByCategoryID(postData).subscribe((res: any) => {
            //console.log('getOptionsByCategoryID', element.fieldname, res);
            if (res.status == 200) {
              element.options = res.obj;
              element.options.forEach((option: any) => {
                option.checked = false;
              });
            }
            if (res.status == 204) {
              element.dropdown = false;
            }
          })
      }
      if (element.categoryType == 2) {
        this.checkBoxCategoryList.push(element);
        this.categoryFormFields.splice(index, 1);
      }
      else {
        this.carForm.addControl(element.fieldname, new FormControl(""));
      }
      /* if (element.categoryType == 2) {
        
        this.checkBoxCategoryList.push(element);
        this.categoryFormFields.splice(index, 1);
      } else {
        this.carForm.addControl(element.fieldname, new FormControl(""));
      } */
    });
    console.log('this.categoryFormFields', this.categoryFormFields);
    console.log('this.checkBoxCategoryList', this.checkBoxCategoryList);
  }
  getAllModels(BrandID: number) {
    this.dataTransferService.getAllModel(BrandID).subscribe((res: any) => {
      console.log('getAllModels:', res);
      if (res.status = 200) {
        this.models = res.obj;
      }
    })
  }
  getAllGraphictype() {
    this.dataTransferService.getAllGraphictype().subscribe((res: any) => {
      console.log('getAllGraphictype:', res);
      if (res.status = 200) {
        this.graphictypeList = res.obj;
      }
    })
  }
  getCarByID(id: number) {
    //var postData = { findby: 'id', value: id }
    var postData: number = id
    this.dataTransferService.getCarByID(postData).subscribe((res: any) => {
      console.log('getCarByID', res);
      if (res.status == 200) {
        //this.populateFormValues(res.obj[0]);
        this.populateFormValues(res.obj);
      }
    })
  }
  populateFormValues(object: any) {
    console.log('populateFormValues', object, this.checkBoxCategoryList);
    this.carForm.patchValue({
      CA_modelId: object.carDetails[0].CA_modelId,
      CA_brandId: object.carDetails[0].CA_brandId,
      CA_exshowroomprice: object.carDetails[0].CA_exshowroomprice,
      CA_variant: object.carDetails[0].CA_variant,
      CA_enginecc: object.carDetails[0].CA_enginecc,
      CA_fuel: object.carDetails[0].CA_fuel,
      CA_isDiscontinued: object.carDetails[0].CA_isDiscontinued,
      CA_slug: object.carDetails[0].CA_slug,
      CA_id: object.carDetails[0].CA_id
    });
    Object.keys(this.carForm.controls).forEach(key => {
      object.categoryDetails.forEach((element: any) => {
        if (key == element.CD_categoryId) {
          if (element.CD_optionsId != null) {
            /**
             * set value was working before form loads, hence added timeout
             */
            window.setTimeout(() => {
              this.carForm.controls[key].setValue(element.CD_optionsId);
              this.tempForm.push({ key: key, value: element.CD_optionsId });
            }, 1000);
          } else {
            if (element.CD_data != null) {
              this.carForm.controls[key].setValue(element.CD_data);
              this.tempForm.push({ key: key, value: element.CD_data });
            }
          }
        }
        this.checkBoxCategoryList.forEach((checkBox: any) => {
          window.setTimeout(() => {
            checkBox.options.forEach((option: any) => {
              if (option.OP_id == element.CD_optionsId) {
                option.checked = true;
                
              }
            })
          }, 500);
        });
      });
    });

    this.checkBoxCategoryList.forEach((checkBox: any) => {
      window.setTimeout(() => {
        checkBox.options.forEach((option: any) => {
          if (option.checked) {
            this.checkBoxValues.push(option);
          }
        })
      }, 500);
    });

    console.log('temp form', this.tempForm);
  }
  updateCar() {
    /**
     * check if category fields are changed,else dont need to update car_data table
     */
    this.tempForm.forEach((element: any) => {
      if (element.value != (undefined || null) && element.value != this.carForm.get(element.key)?.value) {
        console.log('changed', element.key, element.value, this.carForm.get(element.key)?.value);
        this.isCarCategoryDataChanged = true;
        return;
      }
    });

    console.log('this.isCarCategoryDataChanged', this.isCarCategoryDataChanged);
    if (this.isCarCategoryDataChanged) {
      this.carForm.controls['Car_Data'].setValue(JSON.stringify(this.categoryFormFields));
    } else {
      this.carForm.controls['Car_Data'].setValue('NoChangeInCarCategoryData');
    }

    this.carForm.controls['CheckBoxValues'].setValue(JSON.stringify(this.checkBoxValues));
    console.log('this.checkBoxValues',this.checkBoxValues);
    console.log('updateCar', this.carForm.value);
    this.dataTransferService.updateCar(this.carForm.value).subscribe((res: any) => {
      console.log('update Car', res);
      if (res.status == 200) {
        this.toastr.success('', res.message);
        this.router.navigate(['/masters/car-list']);
      } else {
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }
  addCar() {
    this.carForm.controls['Car_Data'].setValue(JSON.stringify(this.categoryFormFields));
    this.carForm.controls['CheckBoxValues'].setValue(JSON.stringify(this.checkBoxValues));
    console.log('this.carForm.value', this.carForm.value);
    this.dataTransferService.addCar(this.carForm.value).subscribe((res: any) => {
      //console.log('addCar', res);
      if (res.status == 200) {
        this.toastr.success('', res.message);
        this.router.navigate(['/masters/car-list']);
      } else {
        this.toastr.error("", "Something Went Wrong");
      }
    })
  }

  onCheckBoxValueChange(option: any) {
    console.log('onCheckBoxValueChange', option);
    if (option.checked) { // if checked push in array
      console.log('checked', option.OP_title);
      this.checkBoxValues.push(option);
    }
    else{//if unchecked remove from array
      const index = this.checkBoxValues.indexOf(option);
      if (index > -1) { // only splice array when item is found
        this.checkBoxValues.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }
  getCheckBoxValues() {
    this.checkBoxValues = [];
    this.checkBoxCategoryList.forEach((element: any) => {
      console.log('checkBoxCategoryList.forEach', element);
      element.options.forEach((option: any) => {
        if (option.checked) {
          console.log('checked', option.OP_title);
          this.checkBoxValues.push(option);
        }
      });
    });
    console.log('checkBoxValues', this.checkBoxValues);
    this.carForm.controls['CheckBoxValues'].setValue(JSON.stringify(this.checkBoxValues));
    //this.carForm.controls['CheckBoxValues'].setValue(this.checkBoxValues);
  }

  isCarCategoryDataChanged = false;
  onSubmit() {
    this.submitted = true;
    //this.getCheckBoxValues();
    console.log('form values', this.carForm.value);
    if (this.carForm.invalid) {
      console.log('invalid form');
      this.toastr.info('', 'Please fill all required fields');
      return;
    }

    Object.keys(this.carForm.controls).forEach(key => {
      this.categoryFormFields.forEach((element: any) => {
        if (key == element.fieldname) {
          element.value = this.carForm.get(key)?.value ?? null;
          console.log('element.value', element.value);
          if (element.value) {
            element.value = +(element.value);
          } else
            element.value = null;
        }
      });
    });

    if (this.queryParam) {
      //if queryParam then call Update API
      this.updateCar();
    } else {

      this.addCar();
    }
  }
  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result;
        //this.uploadForm.patchValue({ GRA_url: reader.result });
        this.uploadForm.patchValue({ GRA_url: file })
      }
    }
    console.log('this.url', this.url);
  }
  submitUploadForm() {
    console.log('form values', this.uploadForm.value);
    const formData = new FormData();
    formData.append('GRA_carId', this.queryParam);
    formData.append('GRA_typeId', this.uploadForm.value.GRA_typeId);
    formData.append('GRA_caption', this.uploadForm.value.GRA_caption);
    formData.append('file', this.uploadForm.value.GRA_url)
    this.dataTransferService.updateCarGraphic(formData).subscribe((res: any) => {
      console.log('updateCarGraphic', res);
      if (res.status == 200) {
        this.toastr.success(res.message);
        $("#gallery").modal("hide");
      } else {
        this.toastr.error(res.message);
      }
    })
  }
  carGraphics: any = [];
  getCarGraphics() {
    var postData = { findby: 'carid', value: this.queryParam };
    this.dataTransferService.getCarGraphic(postData).subscribe((res: any) => {
      console.log('getCarGraphics', res);
      if (res.status == 200) {
        this.carGraphics = res.obj;
      }

    })
  }
  filteredGraphics: any = [];
  onSelect(tabID: number) {
    console.log('Selected', tabID);
    this.filteredGraphics = [];
    this.carGraphics.forEach((element: any) => {
      if (element.GRA_typeId == tabID) {
        this.filteredGraphics.push(element);
      }
    });
  }
}
