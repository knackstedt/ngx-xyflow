import { Directive, forwardRef, Inject, SimpleChanges } from '@angular/core';
import { XYFlowComponent } from './xyflow.component';

/**
 * EdgeLabelRenderer directive - used inside custom edge templates
 * to render HTML content as edge labels.
 */
@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-edge-label-renderer'
})
export class EdgeLabelRendererDirective {

    constructor(@Inject(forwardRef(() => XYFlowComponent)) private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
