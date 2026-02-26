import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/components/classes/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MediaConfirmResponse } from 'src/app/shared/services/media.service';
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
    role: { name: '' },
    avatar_url: null as string | null,
    thumb_url: null as string | null,
  };

  maxDate = new Date().toISOString().split('T')[0];

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {}

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      date_of_birth: '',
      gender: ''
    })

    this.authService.user().subscribe(
      (user) => {
        this.user = user;
        this.infoForm.patchValue(user);
      }
    )

   
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

  onAvatarUploaded(response: MediaConfirmResponse): void {
    this.user.avatar_url = response.url;
    this.user.thumb_url = response.thumb_url ?? response.url;
    // Persist updated URLs in session storage so header/sidebar reflect the change
    const stored = sessionStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        parsed.avatar_url = this.user.avatar_url;
        parsed.thumb_url = this.user.thumb_url;
        sessionStorage.setItem('user', JSON.stringify(parsed));
      } catch { /* ignore */ }
    }
  }

  onAvatarRemoved(): void {
    this.user.avatar_url = null;
    this.user.thumb_url = null;
  }
}
