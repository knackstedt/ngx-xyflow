import { Directive, forwardRef, Inject, Input, SimpleChanges } from '@angular/core';
import { XYFlowComponent } from './xyflow.component';

/**
 * ViewportPortal directive - used to render content outside the normal
 * viewport flow. Useful for floating elements that need to move with the viewport.
 */
@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-viewport-portal'
})
export class ViewportPortalDirective {

    @Input() style: React.CSSProperties;
    @Input() className: string;

    constructor(@Inject(forwardRef(() => XYFlowComponent)) private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
