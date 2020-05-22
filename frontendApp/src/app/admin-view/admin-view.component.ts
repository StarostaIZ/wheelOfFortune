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
  isConfirmBoxVisible: boolean = false;
  type: string = 'users';
  deleteElementID: number = 0;

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
    this.isConfirmBoxVisible = false;
    this.clearErrorLabel();
  }

  clearErrorLabel() {
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    menuError.style.display = 'none';
  }

  getPositiveLabel(msg) {
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    menuError.style.backgroundColor = 'green';
    menuError.textContent = msg;
    menuError.style.display = 'block';
  }

  getNegativeLabel(msg) {
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    menuError.style.backgroundColor = 'red';
    menuError.textContent = msg;
    menuError.style.display = 'block';
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

  removeElement(deleteElementID) {
    this.isConfirmBoxVisible = true;
    this.deleteElementID = deleteElementID;
  }

  confirmRemoveElement() {
    switch (this.type) {
      case 'users':
        this.removeUser();
        break;
      case 'rooms':
        this.removeRoom();
        break;
      case 'words':
        this.removeWord();
        break;
      case 'categories':
        this.removeCategory();
        break;
    }
    this.isConfirmBoxVisible = false;
  }

  resignRemoveElement(){
    this.isConfirmBoxVisible = false;
  }

  removeUser() {
    this.managementService.removeUser(this.deleteElementID).subscribe();
    this.users = this.users.filter(user => user.id !== this.deleteElementID);
    this.clearErrorLabel();
  }
  removeRoom() {
    this.managementService.removeRoom(this.deleteElementID).subscribe();
    this.rooms = this.rooms.filter(rooms => rooms.id !== this.deleteElementID);
    this.clearErrorLabel();
  }
  removeWord() {
    this.managementService.removeWord(this.deleteElementID).subscribe();
    this.words = this.words.filter(
      words => words.wordId !== this.deleteElementID
    );
    this.clearErrorLabel();
  }
  removeCategory() {
    this.managementService
      .removeCategory(this.deleteElementID)
      .subscribe(() => {
        this.getWords();
      });
    this.categories = this.categories.filter(
      categories => categories.categoryId !== this.deleteElementID
    );
    this.clearErrorLabel();
    this.newWordSelectedCategoryId = 0;
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
      this.managementService
        .addWord(this.newWord, this.newWordSelectedCategoryId)
        .subscribe(() => {
          this.getWords();
          this.getPositiveLabel('Pomyślnie dodano');
        });
    } else {
      this.getNegativeLabel(validator.msg);
    }
  }
  addCategory() {
    const menuError: HTMLElement = document.querySelector(
      '.menu__error'
    ) as HTMLElement;
    const validator = this.validator.validateNewCategory(
      this.newCategory,
      this.categories
    );
    if (validator.isValid) {
      this.managementService.addCategory(this.newCategory).subscribe(() => {
        this.getCategories();
        this.getPositiveLabel('Pomyślnie dodano');
      });
    } else {
      this.getNegativeLabel(validator.msg);
    }
  }
  showAddWordBox() {
    this.isAddWordBoxVisible = !this.isAddWordBoxVisible;
  }
  showAddCategoryBox() {
    this.isAddCategoryBoxVisible = !this.isAddCategoryBoxVisible;
  }
}
