import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private _authService:AuthService) { }
  books;
  ngOnInit(): void {
    this._authService.getBooks().subscribe(res=>{
      this.books=res;
    })
  }

}
