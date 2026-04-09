import { Directive, EventEmitter, forwardRef, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { PanelProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-panel'
})
export class PanelDirective implements PanelProps {

    @Input() position: PanelProps['position'];
    @Input() style: PanelProps['style'];
    @Input() className: PanelProps['className'];

    constructor(@Inject(forwardRef(() => XYFlowComponent)) private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
