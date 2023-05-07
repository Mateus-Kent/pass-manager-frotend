import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/validators/passwordValidator';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, passwordValidator]),
    });
  }

  authenticate() {
    const input = this.form.getRawValue();
    Swal.fire({
      icon: 'success',
      title: 'Usuário autenticado com sucesso !!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.authService.signIn(input).subscribe((data) => {
        this.router.navigate(['/credential/list']);
      });
    });
  }
}
