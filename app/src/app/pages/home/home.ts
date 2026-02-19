import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  imports: [JsonPipe, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl('',
    {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\S.*\S$|^\S$/)
      ]
    });

  updateTaskCtrl = new FormControl('',
    {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\S.*\S$|^\S$/)
      ]
    });

  public completeTaskHandler(index: number) {
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  }

  public addTaskHandler() {
    if (this.newTaskCtrl.invalid) { return; }
    this.addTask(this.newTaskCtrl.value);
    this.newTaskCtrl.setValue('');
  }

  public updateTaskHandler(index: number) {
    if (this.updateTaskCtrl.invalid) { return; }
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks];
      updatedTasks[index].title = this.updateTaskCtrl.value;
      updatedTasks[index].editing = false;
      return updatedTasks;
    });
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

  public editingMode(index: number, title: string) {
    if (this.tasks()[index].completed) { return; }

    this.updateTaskCtrl.setValue(title);

    this.tasks.update(tasks => {
      return tasks.map((task, i) => ({
        ...task,
        editing: i === index
      }));
    });
  }
}
