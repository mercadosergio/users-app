import { Component, inject } from '@angular/core';
import { Toast } from '../../../../core/models/interfaces/toast';
import { ToastService } from '../../../../core/services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toasts: Toast[] = [];

  private toastService = inject(ToastService);

  constructor() {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }
}
