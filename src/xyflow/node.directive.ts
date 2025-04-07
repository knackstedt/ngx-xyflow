import { NgTemplateOutlet } from '@angular/common';
import {
    ApplicationRef,
    Component,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    NgZone,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChildren
} from '@angular/core';
import { Handle, NodeResizer, NodeToolbar } from '@xyflow/react';
import * as React from 'react';
import { HandleDirective } from './handle.directive';
import { XYFlowComponent } from './xyflow.component';
import { NodeResizerDirective } from './node-resizer.directive';
import { NodeToolbarDirective } from './node-toolbar.directive';
import { AutoWrapAngularObject, ng2ReactProps } from 'ngx-reactify';


@Component({
    selector: "ngx-xyflow-node",
    template: `
        @if(template) {
            <ng-container
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{ '$implicit': data }"
            />
        }
        @else {
            <span style="color: red">
                Node has no template.
            </span>
        }
    `,
    imports: [
        NgTemplateOutlet
    ],
    standalone: true
})
class XYFlowNodeComponent {
    @Input() template: TemplateRef<any>;
    @Input() data: any;
    @Input() node: any;
}


@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-node'
})
export class NodeDirective {

    @ContentChildren(HandleDirective) handles: QueryList<HandleDirective>;

    @Input() nodeType: string;

    @ContentChild(TemplateRef) template: ElementRef;
    @ContentChild(NodeResizerDirective) nodeResizer: NodeResizerDirective;
    @ContentChild(NodeToolbarDirective) nodeToolbar: NodeToolbarDirective;

    @Output() f = new EventEmitter();

    // @Output() onClick = new EventEmitter<Parameters<MiniMapProps['onClick']>>();
    // @Output() onNodeClick = new EventEmitter<Parameters<MiniMapProps['onNodeClick']>>();
    @Output() blur = new EventEmitter<HTMLElementEventMap['blur']>();
    @Output() click = new EventEmitter<HTMLElementEventMap['click']>();
    @Output() contextmenu = new EventEmitter<HTMLElementEventMap['contextmenu']>();
    @Output() dblclick = new EventEmitter<HTMLElementEventMap['dblclick']>();
    @Output() drag = new EventEmitter<HTMLElementEventMap['drag']>();
    @Output() dragend = new EventEmitter<HTMLElementEventMap['dragend']>();
    @Output() dragenter = new EventEmitter<HTMLElementEventMap['dragenter']>();
    @Output() dragleave = new EventEmitter<HTMLElementEventMap['dragleave']>();
    @Output() dragover = new EventEmitter<HTMLElementEventMap['dragover']>();
    @Output() dragstart = new EventEmitter<HTMLElementEventMap['dragstart']>();
    @Output() focus = new EventEmitter<HTMLElementEventMap['focus']>();
    @Output() keydown = new EventEmitter<HTMLElementEventMap['keydown']>();
    @Output() keyup = new EventEmitter<HTMLElementEventMap['keyup']>();
    @Output() keypress = new EventEmitter<HTMLElementEventMap['keypress']>();
    @Output() mousedown = new EventEmitter<HTMLElementEventMap['mousedown']>();
    @Output() mouseenter = new EventEmitter<HTMLElementEventMap['mouseenter']>();
    @Output() mouseleave = new EventEmitter<HTMLElementEventMap['mouseleave']>();
    @Output() mousemove = new EventEmitter<HTMLElementEventMap['mousemove']>();
    @Output() mouseout = new EventEmitter<HTMLElementEventMap['mouseout']>();
    @Output() mouseover = new EventEmitter<HTMLElementEventMap['mouseover']>();
    @Output() mouseup = new EventEmitter<HTMLElementEventMap['mouseup']>();
    @Output() mousewheel = new EventEmitter<HTMLElementEventMap['wheel']>();
    @Output() pointercancel = new EventEmitter<HTMLElementEventMap['pointercancel']>();
    @Output() pointerdown = new EventEmitter<HTMLElementEventMap['pointerdown']>();
    @Output() pointerenter = new EventEmitter<HTMLElementEventMap['pointerenter']>();
    @Output() pointerleave = new EventEmitter<HTMLElementEventMap['pointerleave']>();
    @Output() pointermove = new EventEmitter<HTMLElementEventMap['pointermove']>();
    @Output() pointerout = new EventEmitter<HTMLElementEventMap['pointerout']>();
    @Output() pointerover = new EventEmitter<HTMLElementEventMap['pointerover']>();
    @Output() pointerrawupdate = new EventEmitter<Event>();
    @Output() pointerup = new EventEmitter<HTMLElementEventMap['pointerup']>();
    @Output() resize = new EventEmitter<HTMLElementEventMap['resize']>();
    @Output() scroll = new EventEmitter<HTMLElementEventMap['scroll']>();
    @Output() wheel = new EventEmitter<HTMLElementEventMap['wheel']>();

    constructor(
        private readonly xyflow: XYFlowComponent,
        private readonly appRef: ApplicationRef,
        private readonly injector: Injector,
        private readonly ngZone: NgZone
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.xyflow.ngOnChanges(changes);
    }

    ngAfterViewInit() {
        if (!this.nodeType) {
            console.error(new Error("NGX: XYFlow Node bootstrapped without a node type!\n"));
            return;
        }

        this.xyflow.nodeTypes[this.nodeType] = AutoWrapAngularObject({
            component: XYFlowNodeComponent,
            appRef: this.appRef,
            injector: this.injector,
            instance: this,
            ngZone: this.ngZone,
            containerTag: "ngx-xyflow-node-container",
            reactTemplate: el => {
                return React.createElement(React.Fragment, {},
                    ...[
                        this.nodeResizer ? React.createElement(NodeResizer, ng2ReactProps(this.nodeResizer)) : null,
                        this.nodeToolbar ? React.createElement(NodeToolbar, ng2ReactProps(this.nodeToolbar)) : null,
                        el,
                        ...(this.handles?.map(handle => {
                            const props = ng2ReactProps(handle) as any;
                            // props.onConnect = (connection) =>
                            //     handle.onConnect.next(connection);

                            return React.createElement(Handle, props);
                        }) || []),
                    ].filter(n => !!n)
                )
            }
        })
    }
}
