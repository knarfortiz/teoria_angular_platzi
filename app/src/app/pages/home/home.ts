import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  tasks = signal([
    "Aprender Angular",
    "Aprender TypeScript",
    "Aprender JavaScript",
    "Aprender HTML",
    "Aprender CSS"
  ]);
}
