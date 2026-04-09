import { booleanAttribute, Directive, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Connection, HandleProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-node>ngx-xyflow-handle'
})
export class HandleDirective implements Omit<HandleProps, "position" | "onConnect"> {

    @Input() id: HandleProps['id'];
    @Input({ transform: booleanAttribute }) isConnectable: HandleProps['isConnectable'];
    @Input({ transform: booleanAttribute }) isConnectableEnd: HandleProps['isConnectableEnd'];
    @Input({ transform: booleanAttribute }) isConnectableStart: HandleProps['isConnectableStart'];
    @Input() isValidConnection: HandleProps['isValidConnection'];
    @Input() position: 'top' | 'left' | 'right' | 'bottom';
    @Input() type: HandleProps['type'];

    @Output() onConnect = new EventEmitter<Connection>();

    constructor(private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
