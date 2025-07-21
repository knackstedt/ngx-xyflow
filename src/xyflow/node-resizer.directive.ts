import {booleanAttribute, Directive, Input, SimpleChanges} from '@angular/core';
import { NodeResizerProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-node>ngx-xyflow-node-resizer'
})
export class NodeResizerDirective implements NodeResizerProps {

    @Input() color: NodeResizerProps['color'];
    @Input() handleClassName: NodeResizerProps['handleClassName'];
    @Input() handleStyle: NodeResizerProps['handleStyle'];
    @Input({ transform: booleanAttribute }) isVisible: NodeResizerProps['isVisible'];
    @Input({ transform: booleanAttribute }) keepAspectRatio: NodeResizerProps['keepAspectRatio'];
    @Input() lineClassName: NodeResizerProps['lineClassName'];
    @Input() lineStyle: NodeResizerProps['lineStyle'];
    @Input() maxHeight: NodeResizerProps['maxHeight'];
    @Input() maxWidth: NodeResizerProps['maxWidth'];
    @Input() minHeight: NodeResizerProps['minHeight'];
    @Input() minWidth: NodeResizerProps['minWidth'];
    @Input() nodeId: NodeResizerProps['nodeId'];
    @Input() shouldResize: NodeResizerProps['shouldResize'];

    @Input() onResizeStart: NodeResizerProps['onResizeStart'];
    @Input() onResize: NodeResizerProps['onResize'];
    @Input() onResizeEnd: NodeResizerProps['onResizeEnd'];

    constructor(private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
