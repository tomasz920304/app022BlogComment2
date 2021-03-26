import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BlogCommentService } from './../shared/services/blog-comment.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-comment',
  templateUrl: './blog-comment.component.html',
  styles: [],
})
export class BlogCommentComponent implements OnInit {
  formModels: FormArray = this.formBuilder.array([]);

  constructor(
    private formBuilder: FormBuilder,
    private blogCommentService: BlogCommentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.uploadFormModels();
  }

  onSubmit(formModel: FormGroup) {
    this.blogCommentService.post(formModel.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(null, 'Submitted');
        formModel.patchValue(res); // to update array
      },
      (error) => console.log(error)
    );
  }

  onUpdate(formModel: FormGroup) {
    this.blogCommentService.put(formModel.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.info(null, 'Updated');
      },
      (error) => console.log(error)
    );
  }

  onDelete(id: number, index: number) {
    if (confirm('Are you sure?')) {
      this.blogCommentService.delete(id).subscribe(
        (res) => {
          console.log(res);
          this.toastr.error(null, 'Deleted');
          this.formModels.removeAt(index); // to update array
        },
        (error) => console.log(error)
      );
    }
  }

  onAdd() {
    let formModel = this.generateFormModel();
    this.formModels.push(formModel);
  }

  generateFormModel(data?) {
    let formModel = this.formBuilder.group({
      blogCommentId: [0],
      message: ['', Validators.required],
      userId: [null],
    });

    if (data) {
      formModel.patchValue(data);
    }

    return formModel;
  }

  uploadFormModels() {
    this.blogCommentService.get().subscribe(
      (res: any) => {
        res.forEach((data) => {
          let formModel = this.generateFormModel(data);
          this.formModels.push(formModel);
        });
      },
      (error) => console.log(error)
    );
  }
}
