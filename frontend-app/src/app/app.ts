import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common'; // Importar por si acaso

@Component({
selector: 'app-root',
standalone: true,

imports: [FormsModule, CommonModule],

template: `

<div style="max-width: 400px; margin: 50px auto; font-family: sans-serif; padding: 20px;

border: 1px solid #ccc; border-radius: 8px;">
<h2> Login Corporativo</h2>
<div style="margin-bottom: 10px;">
<label>Email:</label>

<input [(ngModel)]="email" type="text" style="width: 100%; padding: 8px;">

</div>

<div style="margin-bottom: 10px;">
<label>Password:</label>

<input [(ngModel)]="password" type="password" style="width: 100%; padding: 8px;">

</div>

<button (click)="login()" style="width: 100%; padding: 10px; background: #007bff; color:

white; border: none; cursor: pointer;">

Entrar
</button>
<hr>

<div *ngIf="successMsg()" style="background: #d4edda; color: #155724; padding: 10px;

margin-top: 10px;">
{{ successMsg() }}
</div>

<div *ngIf="errorMsg()"

style="background: #f8d7da; color: #721c24; padding: 10px; margin-top: 10px;"

[innerHTML]="errorMsg()">
</div>
</div>
`
})

export class AppComponent {
http = inject(HttpClient);
email = signal('');
password = signal('');
successMsg = signal('');
errorMsg = signal('');
login() {
this.successMsg.set('');
this.errorMsg.set('');

this.http.post('http://localhost:3000/api/login', {

email: this.email(),
password: this.password()
}).subscribe({

next: (res: any) => this.successMsg.set(res.message),

error: (err) => {

// En un caso real esto es string, pero si el backend manda HTML malicioso...

this.errorMsg.set(err.error);

}
});
}
}