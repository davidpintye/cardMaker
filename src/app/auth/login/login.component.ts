import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

    constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  async onSubmit(): Promise<void> {
    const { email, password } = this.loginForm.value;
    await this.authService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['/cardeditor']);
    });
  }

  async loginWithGoogle(): Promise<void> {
    await this.authService.loginWithGoogle();
  }

}
