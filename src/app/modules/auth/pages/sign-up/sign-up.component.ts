import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/validators/passwordValidator';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  hide2 = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, passwordValidator]),
      confirm: new FormControl(null, [Validators.required, passwordValidator]),
    });
  }

  register() {
    const email = this.form.get('email')?.value;
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    const confirm = this.form.get('confirm')?.value;

    if (password == confirm) {
      const input = { email, username, password };

      this.authService.signUp(input).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuário criado com sucesso !!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/credential/list']);
          });
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.error,
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'As senhas não correspondem.',
      });
      return;
    }
  }
}
