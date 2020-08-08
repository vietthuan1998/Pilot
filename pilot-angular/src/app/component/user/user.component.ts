import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserEntity } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formLogin: FormGroup;
  flagUserName : boolean;
  flagUserName1 : boolean;
  flagPassword : boolean;
  flagPassword1 : boolean;
  flagRole : boolean;
  user: UserEntity;
  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router : Router
  ) { }

  getUser(userName: string) {
    var temp : UserEntity;
    var test : boolean;
    var str = "ngoai";
    this.userService.getUser(userName).subscribe(res =>{
      temp = res;
      str = "trong";
      return str;
    });
    return str;
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      userName: [""],
      password: [""],
      role: [""]
    })
    console.log(this.getUser("test"));
    // this.getUser("test");
    this.getUser("test"); 
    
  }

  

  validate(formLogin) {
    var check=true;
    this.flagUserName1 = false;
    this.flagPassword1 = false;
    if(formLogin.userName ==""){
      this.flagUserName1 = true;
      check = false;
    }
    // else this.flagUserName1 = false;
    if(formLogin.password == ""){
      this.flagPassword1 = true;
      check = false;
    }
    // else this.flagPassword1 = false;
    return check;

  }

  login(formLogin) {
    // this.validate(formLogin);
    // console.log("login 444====> " + this.validate(formLogin));
    // console.log("login ====> " + this.check);
    // if(this.validate(formLogin) != true){
    //   UserService.login = true;
    //   this.router.navigateByUrl("/product");
    // }
    this.flagUserName = false;
    this.flagUserName1 = false;
    this.flagPassword = false;
    this.flagRole = false;
    this.flagPassword1 = false;
    
    if(this.validate(formLogin) == true){
      this.userService.getUser(formLogin.userName).subscribe(data =>{
        if(data == null){
          this.flagUserName = true;
        }
        else{
          if(data.password != formLogin.password){
            this.flagPassword = true;
          }
          else if(data.role.toUpperCase() != "ADMIN"){
            this.flagRole = true;
          }
          else {
            UserService.login = true;
            this.router.navigateByUrl("/product")
          }
        }
      })
    }
  }

}
