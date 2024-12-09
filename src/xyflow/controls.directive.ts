import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-controls'
})
export class ControlsDirective implements Omit<ControlProps, 'onFitView' | 'onInteractiveChange' | 'onZoomIn' | 'onZoomOut'> {

    @Input() 'aria-label': ControlProps['aria-label'];
    @Input() children: ControlProps['children'];
    @Input() className: ControlProps['className'];
    @Input() fitViewOptions: ControlProps['fitViewOptions'];
    @Input() orientation: ControlProps['orientation'];
    @Input() position: ControlProps['position'];
    @Input() showFitView: ControlProps['showFitView'];
    @Input() showInteractive: ControlProps['showInteractive'];
    @Input() showZoom: ControlProps['showZoom'];
    @Input() style: ControlProps['style'];

    @Output() onFitView = new EventEmitter<Parameters<ControlProps['onFitView']>>();
    @Output() onInteractiveChange = new EventEmitter<Parameters<ControlProps['onInteractiveChange']>>();
    @Output() onZoomIn = new EventEmitter<Parameters<ControlProps['onZoomIn']>>();
    @Output() onZoomOut = new EventEmitter<Parameters<ControlProps['onZoomOut']>>();

    constructor(private readonly xyflow: XYFlowComponent) { }
    ngOnChanges() {
        this.xyflow.ngOnChanges();
    }
}
