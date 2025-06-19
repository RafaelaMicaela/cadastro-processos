import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Parte, TipoPessoa } from '../../../core/models/parte.model';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parte-form',
  templateUrl: './parte-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ParteFormComponent implements OnInit, OnChanges {
  @Input() parteEditar?: Parte;
  @Output() salvar = new EventEmitter<Parte>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;
  tiposPessoa: TipoPessoa[] = ['Física', 'Jurídica'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parteEditar'] && this.form) {
      this.updateForm();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      tipoPessoa: ['', Validators.required],
      cpfCnpj: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.updateForm();
  }

  private updateForm(): void {
    if (this.parteEditar) {
      this.form.patchValue(this.parteEditar);
    } else {
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const parte: Parte = {
      ...this.form.value,
      id: this.parteEditar?.id || uuidv4()
    };

    this.salvar.emit(parte);
    this.form.reset();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
