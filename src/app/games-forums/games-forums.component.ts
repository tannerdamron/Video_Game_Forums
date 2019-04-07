import { Component, OnInit, Injectable } from '@angular/core';
import { UserForum } from '../models/user-forum.model';
import { Router } from '@angular/router';
import { UserForumsService } from '../user-forums.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-games-forums',
  templateUrl: './games-forums.component.html',
  styleUrls: ['./games-forums.component.css'],
  providers: [UserForumsService]
})
@Injectable()

export class GamesForumsComponent implements OnInit {
  gameSpecificForums: FirebaseListObservable<any[]>;
  showAddForum = null;

  constructor(private router: Router, private userGameForumsService: UserForumsService, private database: AngularFireDatabase) {
    this.gameSpecificForums = database.list('gameSpecificForums');
  }

  ngOnInit() {
    this.gameSpecificForums = this.userGameForumsService.getUserGameForums();
  }


  goToGameSpecificDetailPage(clickedForum) {
    this.router.navigate(['gameSpecificForums', clickedForum.$key]);
  }

  addForum(title: string, subject: string, body: string) {
    const currentTime = new Date();
    const date = (currentTime.toString()).substr(0, 15);
    const newForum = new UserForum(title, subject, body, date);
    this.userGameForumsService.addToGameSpecificForum(newForum);
    this.showAddForum = null;
  }

  showAddForumForm() {
    this.showAddForum = true;
  }

  hideAddForumForm() {
    this.showAddForum = null;
  }
}
