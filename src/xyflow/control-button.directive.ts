import { Directive, EventEmitter, forwardRef, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { ControlButtonProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow-controls>ngx-xyflow-control-button'
})
export class ControlButtonDirective implements ControlButtonProps {

    @Input() className: ControlButtonProps['className'];
    @Input() title: ControlButtonProps['title'];
    @Input() 'aria-label': ControlButtonProps['aria-label'];

    @Output() onClick = new EventEmitter<[NonNullable<ControlButtonProps['onClick']>]> as any;

    constructor(@Inject(forwardRef(() => XYFlowComponent)) private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
