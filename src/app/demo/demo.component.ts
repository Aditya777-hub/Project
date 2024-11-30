import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {

  newEmployeeClicked = false;
  employee: any[] = []; // Start with an empty array
  model: any = {};
  model2: any = {};
  myValue: any;
  color: any;
  data: any;
  
  constructor() {
      this.loadEmployeesFromLocalStorage(); // Load employees on initialization
  }
  
  ngOnInit() {

 }
  
  loadEmployeesFromLocalStorage() {
      const storedEmployees = localStorage.getItem('employees');
      if (storedEmployees) {
          this.employee = JSON.parse(storedEmployees);
      } else {
          // Default employees if nothing is stored
          this.employee = [
              { name: 'Aditya', position: 'developer', email: 'aditya@example.com' },
              { name: 'Yash', position: 'youtuber', email: 'yash@example.com' },
              { name: 'Shubham', position: 'agriculture', email: 'shubham@example.com' },
          ];
      }
  }
  
  addEmployee(data: NgForm) {
      if (this.model.position && /^[0-9]{10}$/.test(this.model.position) && this.model.email) { // Validate mobile number and email
          this.employee.unshift({ ...this.model }); // Add to the top of the list
          localStorage.setItem('employees', JSON.stringify(this.employee)); // Store updated employee list
          this.model = {}; // Reset model
      } else {
          console.error('Please enter valid mobile number and email.');
      }
  }
  
  deleteEmployee(i: number) {
      this.employee.splice(i, 1); // Remove the employee at index i
      localStorage.setItem('employees', JSON.stringify(this.employee)); // Update local storage
  }
  
  editEmployee(editEmployeeInfo: number) {
      this.myValue = editEmployeeInfo; // Store the index
      this.model2.name = this.employee[editEmployeeInfo].name; // Load name
      this.model2.position = this.employee[editEmployeeInfo].position; // Load position
      this.model2.email = this.employee[editEmployeeInfo].email; // Load email
  }
  
  updateEmployee() {
      if (this.myValue >= 0 && this.myValue < this.employee.length) {
          this.employee[this.myValue] = { ...this.model2 }; // Update the employee
          localStorage.setItem('employees', JSON.stringify(this.employee)); // Update local storage
      } else {
          console.error('Invalid employee index:', this.myValue);
      }
  }
  
  addEmployeeBtn() {
      this.newEmployeeClicked = !this.newEmployeeClicked;
  }
  
  changeColorOne() {
      return this.color ? '#ffffff' : '#f6f6f6';
  }



  }
  


