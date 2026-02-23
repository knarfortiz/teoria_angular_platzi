import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskFilter } from '../../models/task';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  TaskFilter = TaskFilter;

  injector = inject(Injector);

   ngOnInit() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks.set(JSON.parse(storedTasks));
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log('Tareas actualizadas:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }

  filter = signal<TaskFilter>(TaskFilter.All);

  taskFiltered = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    switch (filter) {
      case TaskFilter.Pending:
        return tasks.filter(task => !task.completed);
      case TaskFilter.Completed:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  });

  tasks = signal<Task[]>([]);

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

  changeFilter(filter: TaskFilter) {
    this.filter.set(filter);
  }
}
