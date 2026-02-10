import { Component, signal } from '@angular/core';
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

  testSignal = signal("Hello, Signal!");

  person = {
    name: "John Doe",
    age: 30,
    email: "test@example.com",
    disabled: true
  }

  clickHandler() {
    alert("Button clicked!");
  }

  changeHandler(event: Event) {
    console.log("Input changed:", (event.target as HTMLInputElement).value);
  }

  signalHandler(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    this.testSignal.set(text);
  }
}
