import { Component } from '@angular/core';
import { disabled } from '@angular/forms/signals';

@Component({
  selector: 'app-labs',
  imports: [],
  templateUrl: './labs.html',
  styleUrl: './labs.scss',
})
export class Labs {
  tasks = [
    "Aprender Angular",
    "Aprender TypeScript",
    "Aprender JavaScript",
    "Aprender HTML",
    "Aprender CSS"
  ]
  person = {
    name: "John Doe",
    age: 30,
    email: "test@example.com",
    disabled: true
  }

  clickHandler() {
    alert("Button clicked!");
  }
}
