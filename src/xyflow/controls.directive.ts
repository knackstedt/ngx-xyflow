import { booleanAttribute, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output, QueryList, SimpleChanges } from '@angular/core';
import { ControlProps } from '@xyflow/react';
import { ControlButtonDirective } from './control-button.directive';
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
    @Input({ transform: booleanAttribute }) showFitView: ControlProps['showFitView'];
    @Input({ transform: booleanAttribute }) showInteractive: ControlProps['showInteractive'];
    @Input({ transform: booleanAttribute }) showZoom: ControlProps['showZoom'];
    @Input() style: ControlProps['style'];

    @Output() onFitView = new EventEmitter<Parameters<ControlProps['onFitView']>>();
    @Output() onInteractiveChange = new EventEmitter<Parameters<ControlProps['onInteractiveChange']>>();
    @Output() onZoomIn = new EventEmitter<Parameters<ControlProps['onZoomIn']>>();
    @Output() onZoomOut = new EventEmitter<Parameters<ControlProps['onZoomOut']>>();

    @ContentChildren(ControlButtonDirective) controlButtons!: QueryList<ControlButtonDirective>;

    constructor(@Inject(forwardRef(() => XYFlowComponent)) private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
