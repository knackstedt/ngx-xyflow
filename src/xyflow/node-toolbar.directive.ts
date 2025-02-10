import {Directive, Input, SimpleChanges} from '@angular/core';
import { NodeToolbarProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-node>ngx-xyflow-node-toolbar'
})
export class NodeToolbarDirective implements Omit<NodeToolbarProps, 'position'> {

    @Input() isVisible: NodeToolbarProps['isVisible'];
    @Input() nodeId: NodeToolbarProps['nodeId'];
    @Input() offset: NodeToolbarProps['offset'];
    @Input() position: 'top' | 'left' | 'right' | 'bottom';

    constructor(private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
