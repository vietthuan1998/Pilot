import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  check : boolean = UserService.login;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  doLogin(){
    console.log("a" + UserService.login);
    if(UserService.login == false){
      this.router.navigateByUrl("/admin");
    }
    else{
      UserService.login = false;
      this.router.navigateByUrl("/product");
    }
    this.check = UserService.login;
    console.log("b" + this.check);
  }

}
