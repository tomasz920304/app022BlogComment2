import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';

const routes: Routes = [
  { path: 'blogcomment', component: BlogCommentComponent },
  { path: '', redirectTo: 'blogcomment', pathMatch: 'full' },
  { path: '**', redirectTo: 'blogcomment', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
