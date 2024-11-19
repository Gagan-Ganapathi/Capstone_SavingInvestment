import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'appprofile',
  standalone: true,
  imports:[CommonModule ,FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // var Id=localStorage.getItem('id')!;
  user: { id: string; name: string; email: string; phoneNumber: string } = {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const userId = localStorage.getItem('userid'); // Fetch user ID from localStorage
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    this.http.get<any>(`https://localhost:7724/api/auth/user/${userId}`).subscribe({
      next: (data) => {
        this.user = data.result; // Assuming the API response has a 'result' property
        this.user.id=localStorage.getItem('id')!;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });
  }

  onSubmit() {
    const userId = localStorage.getItem('userid'); // Fetch user ID from localStorage

    if (!this.user.id) {
      console.error('User ID is missing');
      return;
    }

    this.http
      .put(`https://localhost:7724/api/auth/user/${userId}`, this.user)
      .subscribe({
        next: () => {
          alert('Profile updated successfully!');
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again later.');
        },
      });
  }
}
