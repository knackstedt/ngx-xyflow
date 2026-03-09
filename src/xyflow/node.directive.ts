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
    ViewChildren,
    createComponent
} from '@angular/core';
import { Handle, NodeResizer, NodeToolbar } from '@xyflow/react';
import * as React from 'react';
import { HandleDirective } from './handle.directive';
import { XYFlowComponent } from './xyflow.component';
import { NodeResizerDirective } from './node-resizer.directive';
import { NodeToolbarDirective } from './node-toolbar.directive';
import { ng2ReactProps } from 'ngx-reactify';


@Component({
    selector: "ngx-xyflow-node",
    template: `
        <div style="width: 100%; height: 100%;">
            @if(template) {
                <ng-container
                    [ngTemplateOutlet]="template"
                    [ngTemplateOutletContext]="{ '$implicit': data }"
                />
            }
        </div>
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

        // Manual Wrapper to bypass ngx-reactify issues
        const ManualWrapper = React.memo(({ data }: any) => {
            const domRef = React.useRef(null);
            const compRef = React.useRef<any>(null);

            React.useEffect(() => {
                if (!domRef.current) return undefined;

                const ref = createComponent(XYFlowNodeComponent, {
                    environmentInjector: this.appRef.injector,
                    elementInjector: this.injector,
                    hostElement: domRef.current
                });

                ref.setInput('template', this.template);
                ref.setInput('data', data);

                this.appRef.attachView(ref.hostView);
                ref.changeDetectorRef.detectChanges();
                compRef.current = ref;

                return () => {
                    ref.destroy();
                    compRef.current = null;
                };
            }, []);

            React.useEffect(() => {
                if (compRef.current) {
                    compRef.current.setInput('data', data);
                    compRef.current.changeDetectorRef.detectChanges();
                }
            }, [data]);

            // Render Handles, Resizer, Toolbar
            const handles = this.handles ? this.handles.map(handle => {
                return React.createElement(Handle, ng2ReactProps(handle) as any);
            }) : [];

            const resizer = this.nodeResizer ? React.createElement(NodeResizer, ng2ReactProps(this.nodeResizer)) : null;
            const toolbar = this.nodeToolbar ? React.createElement(NodeToolbar, ng2ReactProps(this.nodeToolbar)) : null;

            return React.createElement(React.Fragment, {},
                React.createElement('div', {
                    ref: domRef,
                    className: 'ngx-xyflow-node-wrapper',
                    style: { width: '100%', height: '100%', display: 'block' }
                }),
                ...handles,
                resizer,
                toolbar
            );
        });

        this.xyflow.nodeTypes[this.nodeType] = ManualWrapper;

        // Force re-render of the React component to pick up the new node type
        this.xyflow.nodeTypes = { ...this.xyflow.nodeTypes };
        (this.xyflow as any)._render();
    }
}
