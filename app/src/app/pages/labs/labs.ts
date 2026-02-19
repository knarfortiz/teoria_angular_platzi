import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [ReactiveFormsModule],
  templateUrl: './labs.html',
  styleUrl: './labs.scss',
})
export class Labs {
  tasks = signal([
    "Aprender Angular",
    "Aprender TypeScript",
    "Aprender JavaScript",
    "Aprender HTML",
    "Aprender CSS"
  ]);

  colorControl = new FormControl();

  constructor() {
    this.colorControl.valueChanges.subscribe(value => {
      console.log("Selected color:", value);
    });
  }

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
