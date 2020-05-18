import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { log } from 'util';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css', '../../css/button.css'],
})
export class AdminViewComponent implements OnInit {
  users = [];
  rooms = [];
  words = [];
  categories = [];
  newWord: string;
  newCategory: string;
  newWordSelectedCategoryId: number = 0;
  isLoading: boolean = true;
  isAddWordBoxVisible: boolean = false;
  isAddCategoryBoxVisible: boolean = false;
  type: string = 'users';

  constructor(
    private managementService: ManagementService,
    private validator: ValidateService
  ) {}

  ngOnInit(): void {
    this.users = [];
    this.rooms = [];
    this.words = [];
    this.categories = [];

    this.managementService.getUsers().subscribe(data => {
      // @ts-ignore
      this.users = data.data.users;
      this.managementService.getRooms().subscribe(data => {
        // @ts-ignore
        this.rooms = data.data.rooms;
        this.managementService.getWords().subscribe(data => {
          // @ts-ignore
          this.words = data.data.words;
          this.managementService.getCategories().subscribe(data => {
            // @ts-ignore
            this.categories = data.data.categories;
            this.isLoading = false;
          });
        });
      });
    });
  }

  onChangeType($event) {
    this.type = $event.target.id;
    this.isAddWordBoxVisible = false;
    this.isAddCategoryBoxVisible = false;
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    menuError.style.display = 'none'
  }

  getWords() {
    this.isLoading = true;
    this.managementService.getWords().subscribe(data => {
      // @ts-ignore
      this.words = data.data.words;
      this.isLoading = false;
    });
  }

  getCategories() {
    this.isLoading = true;
    this.managementService.getCategories().subscribe(data => {
      // @ts-ignore
      this.categories = data.data.categories;
      this.isLoading = false;
    });
  }

  removeUser(id) {
    this.managementService.removeUser(id).subscribe();
    this.users = this.users.filter(user => user.id !== id);
  }
  removeRoom(id) {
    this.managementService.removeRoom(id).subscribe();
    this.rooms = this.rooms.filter(rooms => rooms.id !== id);
  }
  removeWord(id) {
    this.managementService.removeWord(id).subscribe();
    this.words = this.words.filter(words => words.wordId !== id);
  }
  removeCategory(id) {
    this.managementService.removeCategory(id).subscribe();
    this.categories = this.categories.filter(
      categories => categories.categoryId !== id
    );
  }

  addWord() {
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    const validator = this.validator.validateNewWord(
      this.newWord,
      this.newWordSelectedCategoryId,
      this.words
    );
    if (validator.isValid) {
      console.log('isValid');
      this.managementService
        .addWord(this.newWord, this.newWordSelectedCategoryId)
        .subscribe(() => {
          this.getWords();
          menuError.style.display = 'none';
        });
    } else {
      menuError.style.display = 'block';
      menuError.textContent = validator.msg;
    }
  }
  addCategory() {
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    const validator = this.validator.validateNewCategory(this.newCategory, this.categories);
    if (validator.isValid) {
      this.managementService.addCategory(this.newCategory).subscribe(() => {
        this.getCategories();
        menuError.style.display = 'none';
      });
    } else {
      menuError.style.display = 'block';
      menuError.textContent = validator.msg;
    }
  }
  showAddWordBox() {
    this.isAddWordBoxVisible = !this.isAddWordBoxVisible;
  }
  showAddCategoryBox() {
    this.isAddCategoryBoxVisible = !this.isAddCategoryBoxVisible;
  }
}
