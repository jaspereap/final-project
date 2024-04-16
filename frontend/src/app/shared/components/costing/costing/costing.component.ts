import { Component, Input, Output } from '@angular/core';
import { Costing } from '../../../../models/dtos';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CostingDialogComponent } from '../costing-dialog/costing-dialog.component';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrl: './costing.component.scss'
})
export class CostingComponent {
  @Input() costings!: Costing[];
  @Input() tripId!: string;
  @Output() addCostingSubject: Subject<Costing> = new Subject;
  @Output() deleteCostingSubject: Subject<number> = new Subject;

  constructor(
    public dialog: MatDialog, 
    ) {}

  openCostingDialog() {
    const dialogRef = this.dialog.open(CostingDialogComponent, {
      // Share data with dialog component
      data: {tripId: this.tripId},
      // Dialog config
      height:'400px',
      width:'280px'
    })

    dialogRef.afterClosed().subscribe(result => {
      const form = result as FormGroup;
      console.log('after dialog closed result: ',result)
      if (result !== undefined && result !== null && form.valid) {
        const costingFormData: Costing =  form.value as Costing;
        this.addCosting(costingFormData)
      }
    })
  }
  addCosting(costing: Costing) {
    this.addCostingSubject.next(costing);
  }
  deleteCosting(i: number) {
    this.deleteCostingSubject.next(i);
  }
}
