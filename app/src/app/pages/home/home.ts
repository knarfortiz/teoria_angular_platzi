import { Component, signal } from '@angular/core';
import { Task } from '../../models/task';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  tasks = signal<Task[]>([
    { id: 1, title: "Aprender Angular", completed: false },
    { id: 2, title: "Aprender TypeScript", completed: false },
    { id: 3, title: "Aprender JavaScript", completed: false },
    { id: 4, title: "Aprender HTML", completed: false },
    { id: 5, title: "Aprender CSS", completed: false }
  ]);

  public completeTaskHandler(index: number) {
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  }

  public addTaskHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.addTask(value);
    input.value = '';
  }

  public addTask(title: string) {
    const newTask: Task = {
      id: this.tasks().length + 1,
      title,
      completed: false
    };
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  public removeTask(index: number) {
    this.tasks.update(tasks => tasks.filter((_, i) => i !== index));
  }
}
