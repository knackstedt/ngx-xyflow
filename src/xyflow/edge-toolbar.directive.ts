import { booleanAttribute, Directive, forwardRef, Inject, Input, SimpleChanges } from '@angular/core';
import { XYFlowComponent } from './xyflow.component';

/**
 * EdgeToolbar directive - used inside custom edge templates
 * to add toolbars to edges.
 */
@Directive({
    selector: 'ngx-xyflow-edge>ngx-xyflow-edge-toolbar'
})
export class EdgeToolbarDirective {

    @Input({ transform: booleanAttribute }) isVisible: boolean;
    @Input() edgeId: string;
    @Input() offset: number;
    @Input() position: 'top' | 'left' | 'right' | 'bottom';
    @Input() align: 'start' | 'center' | 'end';

    constructor(@Inject(forwardRef(() => XYFlowComponent)) private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
