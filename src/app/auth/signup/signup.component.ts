import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CardsService } from 'src/app/services/cards.service';
import { AuthService } from '../auth.service';
import { MyErrorStateMatcher } from '../my-error-state-matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private cardsService: CardsService,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.signupForm.setValidators(this.checkPasswords)
  }

  async onSubmit(): Promise<void> {
    const { email, password } = this.signupForm.value;
    console.log(email, password);
    await this.authService.signupWithEmail(email, password).then((result: any) => {

      if (result.user?.uid) {
        let userData: { [key: string]: any }= {}
        const uid = result.user.uid;
        userData[uid] = {cards: this.cardsService.setCards()};
        this.db.object('users/'+uid).set({cards: this.cardsService.setCards()});
      }
    }, (error: any) => {
      console.log(error.code)
    })
    .then(() => {
      this.authService.loginWithEmail(email, password)
    }, (error) => console.log(error.code));
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass: FormControl = this.signupForm.get('password')?.value;
    let confirmPassword: FormControl = this.signupForm.get('confirmPassword')?.value

    return pass === confirmPassword ? null : { notSame: true };
  }

  fbErrorHandler(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'Ezzel az email címmel már regisztráltak!'
        break;

      case 'auth/email-already-in-use':
        this.errorMessage = 'Ezzel az email címmel már regisztráltak!'
        break;

      default:
        break;
    }
  }
}
