import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})

export class FoodPage implements OnInit {

  constructor(private authService:AuthService, private aufAuth : AngularFireAuth, public router: Router) { 

  }

  ngOnInit() {
  }
}
