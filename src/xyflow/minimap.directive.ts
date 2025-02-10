import {Directive, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { MiniMapProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-minimap'
})
export class MinimapDirective implements Omit<MiniMapProps, 'onClick' | 'onNodeClick'> {

    @Input() ariaLabel: MiniMapProps['ariaLabel'];
    @Input() bgColor: MiniMapProps['bgColor'];
    @Input() inversePan: MiniMapProps['inversePan'];
    @Input() maskColor: MiniMapProps['maskColor'];
    @Input() maskStrokeColor: MiniMapProps['maskStrokeColor'];
    @Input() maskStrokeWidth: MiniMapProps['maskStrokeWidth'];
    @Input() nodeBorderRadius: MiniMapProps['nodeBorderRadius'];
    @Input() nodeClassName: MiniMapProps['nodeClassName'];
    @Input() nodeColor: MiniMapProps['nodeColor'];
    @Input() nodeComponent: MiniMapProps['nodeComponent'];
    @Input() nodeStrokeColor: MiniMapProps['nodeStrokeColor'];
    @Input() nodeStrokeWidth: MiniMapProps['nodeStrokeWidth'];
    @Input() offsetScale: MiniMapProps['offsetScale'];
    @Input() pannable: MiniMapProps['pannable'];
    @Input() position: MiniMapProps['position'];
    @Input() zoomable: MiniMapProps['zoomable'];
    @Input() zoomStep: MiniMapProps['zoomStep'];

    @Output() onClick = new EventEmitter<Parameters<MiniMapProps['onClick']>>();
    @Output() onNodeClick = new EventEmitter<Parameters<MiniMapProps['onNodeClick']>>();

    constructor(private readonly xyflow: XYFlowComponent) { }
    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }
}
