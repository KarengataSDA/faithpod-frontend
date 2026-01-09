import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/components/classes/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
    standalone: false
})
export class EditProfileComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  //user: User

  user: any = {
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  email: '',
  phone_number: '',
  role: { name: '' }
};

  maxDate = new Date().toISOString().split('T')[0];

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {}

  ngOnInit(): void {
    this.authService.user().subscribe(
      (user) => {
        this.user = user;
      }
    )
    this.infoForm = this.formBuilder.group({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      date_of_birth: '',
      gender: ''
    })

   
    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: ''
    })

    Auth.userEmitter.subscribe(
      user=> {
        this.infoForm.patchValue(user)
      }
    )
  }

  formatDate(): void {
    if(this.user.date_of_birth) {
      const date = new Date(this.user.date_of_birth)
      this.user.date_of_birth = date.toISOString().split('T')[0] // formats as YYYY-MM-DD
    }
  }

  infoSubmit():void {
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(
      (user)=> {
        Auth.userEmitter.emit(user)

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated Successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5500,
        });

      // window.location.reload()
      }
    )
  }

  passwordSubmit():void {
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => {
        console.log(res)
         Swal.fire({
        icon: 'success',
        title: 'Password Updated Successfully',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5500,
      });
      }
    )
  }

  getInitials(): string {
    const firstInitial = this.user?.first_name ? this.user.first_name.charAt(0).toUpperCase() : '';
    const lastInitial = this.user?.last_name ? this.user.last_name.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }
}
