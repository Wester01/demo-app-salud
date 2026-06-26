import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-comp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-comp.html',
  styleUrl: './blog-comp.scss',
})
export class BlogComp {}
