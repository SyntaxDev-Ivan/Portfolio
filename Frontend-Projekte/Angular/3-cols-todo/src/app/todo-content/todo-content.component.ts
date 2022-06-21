import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.scss']
})
export class TodoContentComponent implements OnInit {

  constructor(storageService: StorageService) { }

  ngOnInit(): void {

  }

  addToDo(value: string): void {

  }

}
