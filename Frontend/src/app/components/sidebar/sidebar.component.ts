import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  menuItems = [
    { path: '/profile', icon: 'bi bi-person', label: 'Profile' },
    { path: '/income', icon: 'bi bi-wallet2', label: 'Income' },
    { path: '/budget', icon: 'bi bi-calculator', label: 'Budget' },
    { path: '/expense', icon: 'bi bi-cash', label: 'Expense' },
    { path: '/savings', icon: 'bi bi-piggy-bank', label: 'Savings' },
    { path: '/investment', icon: 'bi bi-graph-up-arrow', label: 'Investment' }
  ];
}