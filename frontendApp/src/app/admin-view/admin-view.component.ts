import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';

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
  newWordCategoryID: number;
  isLoading: boolean = true;
  isAddWordBoxVisible: boolean = false;
  type: string = 'users';

  constructor(private managementService: ManagementService) {}

  ngOnInit(): void {
    this.users = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, name: '4' },
      { id: 5, name: '5' },
    ];
    this.rooms = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, name: '4' },
    ];
    this.words = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
    ];

    this.managementService.getUsers().subscribe(data => {
      // @ts-ignore
      this.users = data.data;
      console.log(this.users)
      this.managementService.getRooms().subscribe(data => {
        // @ts-ignore
        this.rooms = data.data;
        console.log(this.rooms)
        this.managementService.getWords().subscribe(data => {
          // @ts-ignore
          this.words = data.data;
          console.log(this.words)
          this.managementService.getCategories().subscribe(data => {
            // @ts-ignore
            this.categories = data.data
            console.log(this.categories)
            this.isLoading = false;
          });
        });
      });
    });
  }

  onChangeType($event){
    this.type = $event.target.id;
  }

  removeUser(userId) {
    this.managementService.removeRoom(userId).subscribe();
  }
  removeRoom(roomId) {
    this.managementService.removeRoom(roomId).subscribe();
  }
  removeWord(wordId) {
    this.managementService.removeRoom(wordId).subscribe();
  }
  removeCategory(categoryId) {
    this.managementService.removeCategory(categoryId).subscribe();
  }
  addWord () {
    this.managementService.addWord(this.newWord, this.newWordCategoryID).subscribe();
  }
  addCategory () {
    this.managementService.addCategory(this.newCategory).subscribe();
  }
  showAddWordBox() {
    this.isAddWordBoxVisible = !this.isAddWordBoxVisible;
  }
}
