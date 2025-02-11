import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    Output,
    SimpleChanges,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {ReactifyNgComponent} from 'ngx-reactify';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProps,
    ReactFlowProvider
} from '@xyflow/react';
import * as React from 'react';
import {BackgroundDirective} from './background.directive';
import {ControlsDirective} from './controls.directive';
import {MinimapDirective} from './minimap.directive';

type XYFlowProps = ReactFlowProps<any, any>;
type OverriddenProps = 'onBeforeDelete' | 'onClickConnectEnd' | 'onClickConnectStart' | 'onConnect' | 'onConnectEnd' | 'onConnectStart' | 'onDelete' | 'onEdgeClick' | 'onEdgeContextMenu' | 'onEdgeDoubleClick' | 'onEdgeMouseEnter' | 'onEdgeMouseLeave' | 'onEdgeMouseMove' | 'onEdgesChange' | 'onEdgesDelete' | 'onError' | 'onInit' | 'onMove' | 'onMoveEnd' | 'onMoveStart' | 'onNodeClick' | 'onNodeContextMenu' | 'onNodeDoubleClick' | 'onNodeDrag' | 'onNodeDragStart' | 'onNodeDragStop' | 'onNodeMouseEnter' | 'onNodeMouseLeave' | 'onNodeMouseMove' | 'onNodesChange' | 'onNodesDelete' | 'onPaneClick' | 'onPaneContextMenu' | 'onPaneMouseEnter' | 'onPaneMouseLeave' | 'onPaneMouseMove' | 'onPaneScroll' | 'onReconnect' | 'onReconnectStart' | 'onReconnectEnd' | 'onSelectionChange' | 'onSelectionContextMenu' | 'onSelectionDrag' | 'onSelectionDragStart' | 'onSelectionDragStop' | 'onSelectionEnd' | 'onSelectionStart';
type InheritedXYFlowProps = Omit<XYFlowProps, OverriddenProps>;

@Component({
    selector: 'ngx-xyflow',
    template: '',
    styleUrls: ['../../node_modules/@xyflow/react/dist/style.css'],
    encapsulation: ViewEncapsulation.None
})
export class XYFlowComponent extends ReactifyNgComponent implements XYFlowProps, OnChanges {

    @Input() nodes: XYFlowProps['nodes'];
    @Output() nodesChange = new EventEmitter<XYFlowProps['nodes']>();

    @Input() edges: XYFlowProps['edges'];
    @Output() edgesChange = new EventEmitter<XYFlowProps['edges']>();

    @Input() defaultEdgeOptions: XYFlowProps['defaultEdgeOptions'];

    nodeTypes: XYFlowProps['nodeTypes'] = {};
    edgeTypes: XYFlowProps['edgeTypes'] = {};

    @Input() connectionLineType: XYFlowProps['connectionLineType'];
    @Input() connectionLineStyle: XYFlowProps['connectionLineStyle'];
    @Input() connectionLineComponent: XYFlowProps['connectionLineComponent'];
    @Input() connectionLineContainerStyle: XYFlowProps['connectionLineContainerStyle'];
    @Input() connectionMode: XYFlowProps['connectionMode'];
    @Input() deleteKeyCode: XYFlowProps['deleteKeyCode'];
    @Input() selectionKeyCode: XYFlowProps['selectionKeyCode'];
    @Input() selectionOnDrag: XYFlowProps['selectionOnDrag'];
    @Input() selectionMode: XYFlowProps['selectionMode'];
    @Input() panActivationKeyCode: XYFlowProps['panActivationKeyCode'];
    @Input() multiSelectionKeyCode: XYFlowProps['multiSelectionKeyCode'];
    @Input() zoomActivationKeyCode: XYFlowProps['zoomActivationKeyCode'];
    @Input() snapToGrid: XYFlowProps['snapToGrid'];
    @Input() snapGrid: XYFlowProps['snapGrid'];
    @Input() onlyRenderVisibleElements: XYFlowProps['onlyRenderVisibleElements'];
    @Input() nodesDraggable: XYFlowProps['nodesDraggable'];
    @Input() nodesConnectable: XYFlowProps['nodesConnectable'];
    @Input() nodesFocusable: XYFlowProps['nodesFocusable'];
    @Input() nodeOrigin: XYFlowProps['nodeOrigin'];
    @Input() edgesFocusable: XYFlowProps['edgesFocusable'];
    @Input() elementsSelectable: XYFlowProps['elementsSelectable'];
    @Input() selectNodesOnDrag: XYFlowProps['selectNodesOnDrag'];
    @Input() panOnDrag: XYFlowProps['panOnDrag'];
    @Input() minZoom: XYFlowProps['minZoom'];
    @Input() maxZoom: XYFlowProps['maxZoom'];
    @Input() defaultViewport: XYFlowProps['defaultViewport'];
    @Input() translateExtent: XYFlowProps['translateExtent'];
    @Input() preventScrolling: XYFlowProps['preventScrolling'];
    @Input() nodeExtent: XYFlowProps['nodeExtent'];
    @Input() defaultMarkerColor: XYFlowProps['defaultMarkerColor'];
    @Input() zoomOnScroll: XYFlowProps['zoomOnScroll'];
    @Input() zoomOnPinch: XYFlowProps['zoomOnPinch'];
    @Input() panOnScroll: XYFlowProps['panOnScroll'];
    @Input() panOnScrollSpeed: XYFlowProps['panOnScrollSpeed'];
    @Input() panOnScrollMode: XYFlowProps['panOnScrollMode'];
    @Input() zoomOnDoubleClick: XYFlowProps['zoomOnDoubleClick'];
    @Input() noDragClassName: XYFlowProps['noDragClassName'];
    @Input() noWheelClassName: XYFlowProps['noWheelClassName'];
    @Input() noPanClassName: XYFlowProps['noPanClassName'];
    @Input() fitView: XYFlowProps['fitView'];
    @Input() fitViewOptions: XYFlowProps['fitViewOptions'];
    @Input() connectOnClick: XYFlowProps['connectOnClick'];
    @Input() attributionPosition: XYFlowProps['attributionPosition'];
    @Input() proOptions: XYFlowProps['proOptions'];
    @Input() elevateNodesOnSelect: XYFlowProps['elevateNodesOnSelect'];
    @Input() elevateEdgesOnSelect: XYFlowProps['elevateEdgesOnSelect'];
    @Input() disableKeyboardA11y: XYFlowProps['disableKeyboardA11y'];
    @Input() autoPanOnNodeDrag: XYFlowProps['autoPanOnNodeDrag'];
    @Input() autoPanOnConnect: XYFlowProps['autoPanOnConnect'];
    @Input() connectionRadius: XYFlowProps['connectionRadius'];

    // `as any` casting for the Output properties to inherit the description from the xyflow JSDOC comments.
    // As of now I don't know of a better way to replace the types while keeping the comments.

    @Output() onBeforeDelete = new EventEmitter<[XYFlowProps['onBeforeDelete']]> as any;
    @Output() onClickConnectEnd = new EventEmitter<[XYFlowProps['onClickConnectEnd']]> as any;
    @Output() onClickConnectStart = new EventEmitter<[XYFlowProps['onClickConnectStart']]> as any;
    @Output() onConnect = new EventEmitter<[XYFlowProps['onConnect']]> as any;
    @Output() onConnectEnd = new EventEmitter<[XYFlowProps['onConnectEnd']]> as any;
    @Output() onConnectStart = new EventEmitter<[XYFlowProps['onConnectStart']]> as any;
    @Output() onDelete = new EventEmitter<[XYFlowProps['onDelete']]> as any;
    @Output() onEdgeClick = new EventEmitter<[XYFlowProps['onEdgeClick']]> as any;
    @Output() onEdgeContextMenu = new EventEmitter<[XYFlowProps['onEdgeContextMenu']]> as any;
    @Output() onEdgeDoubleClick = new EventEmitter<[XYFlowProps['onEdgeDoubleClick']]> as any;
    @Output() onEdgeMouseEnter = new EventEmitter<[XYFlowProps['onEdgeMouseEnter']]> as any;
    @Output() onEdgeMouseLeave = new EventEmitter<[XYFlowProps['onEdgeMouseLeave']]> as any;
    @Output() onEdgeMouseMove = new EventEmitter<[XYFlowProps['onEdgeMouseMove']]> as any;
    @Output() onEdgesChange = new EventEmitter<[XYFlowProps['onEdgesChange']]> as any;
    @Output() onEdgesDelete = new EventEmitter<[XYFlowProps['onEdgesDelete']]> as any;
    @Output() onError = new EventEmitter<[XYFlowProps['onError']]> as any;
    @Output() onInit = new EventEmitter<[XYFlowProps['onInit']]> as any;
    @Output() onMove = new EventEmitter<[XYFlowProps['onMove']]> as any;
    @Output() onMoveEnd = new EventEmitter<[XYFlowProps['onMoveEnd']]> as any;
    @Output() onMoveStart = new EventEmitter<[XYFlowProps['onMoveStart']]> as any;
    @Output() onNodeClick = new EventEmitter<[XYFlowProps['onNodeClick']]> as any;
    @Output() onNodeContextMenu = new EventEmitter<[XYFlowProps['onNodeContextMenu']]> as any;
    @Output() onNodeDoubleClick = new EventEmitter<[XYFlowProps['onNodeDoubleClick']]> as any;
    @Output() onNodeDrag = new EventEmitter<[XYFlowProps['onNodeDrag']]> as any;
    @Output() onNodeDragStart = new EventEmitter<[XYFlowProps['onNodeDragStart']]> as any;
    @Output() onNodeDragStop = new EventEmitter<[XYFlowProps['onNodeDragStop']]> as any;
    @Output() onNodeMouseEnter = new EventEmitter<[XYFlowProps['onNodeMouseEnter']]> as any;
    @Output() onNodeMouseLeave = new EventEmitter<[XYFlowProps['onNodeMouseLeave']]> as any;
    @Output() onNodeMouseMove = new EventEmitter<[XYFlowProps['onNodeMouseMove']]> as any;
    @Output() onNodesChange = new EventEmitter<[XYFlowProps['onNodesChange']]> as any;
    @Output() onNodesDelete = new EventEmitter<[XYFlowProps['onNodesDelete']]> as any;
    @Output() onPaneClick = new EventEmitter<[XYFlowProps['onPaneClick']]> as any;
    @Output() onPaneContextMenu = new EventEmitter<[XYFlowProps['onPaneContextMenu']]> as any;
    @Output() onPaneMouseEnter = new EventEmitter<[XYFlowProps['onPaneMouseEnter']]> as any;
    @Output() onPaneMouseLeave = new EventEmitter<[XYFlowProps['onPaneMouseLeave']]> as any;
    @Output() onPaneMouseMove = new EventEmitter<[XYFlowProps['onPaneMouseMove']]> as any;
    @Output() onPaneScroll = new EventEmitter<[XYFlowProps['onPaneScroll']]> as any;
    @Output() onReconnect = new EventEmitter<[XYFlowProps['onReconnect']]> as any;
    @Output() onReconnectStart = new EventEmitter<[XYFlowProps['onReconnectStart']]> as any;
    @Output() onReconnectEnd = new EventEmitter<[XYFlowProps['onReconnectEnd']]> as any;
    @Output() onSelectionChange = new EventEmitter<[XYFlowProps['onSelectionChange']]> as any;
    @Output() onSelectionContextMenu = new EventEmitter<[XYFlowProps['onSelectionContextMenu']]> as any;
    @Output() onSelectionDrag = new EventEmitter<[XYFlowProps['onSelectionDrag']]> as any;
    @Output() onSelectionDragStart = new EventEmitter<[XYFlowProps['onSelectionDragStart']]> as any;
    @Output() onSelectionDragStop = new EventEmitter<[XYFlowProps['onSelectionDragStop']]> as any;
    @Output() onSelectionEnd = new EventEmitter<[XYFlowProps['onSelectionEnd']]> as any;
    @Output() onSelectionStart = new EventEmitter<[XYFlowProps['onSelectionStart']]> as any;


    @ContentChild(BackgroundDirective) _background: BackgroundDirective;
    @ContentChild(ControlsDirective) _controls: ControlsDirective;
    @ContentChild(MinimapDirective) _minimap: MinimapDirective;


    private setNodes: React.Dispatch<React.SetStateAction<any[]>>;
    private setEdges: React.Dispatch<React.SetStateAction<any[]>>;

    override ngReactComponent = ({ props }: { props: ReactFlowProps }) => {
        const getProps = (obj = {}) => {
            const props = {};
            Object.entries(obj).forEach(([k, v]) => {
                // Omit keys prefixed with _
                if (k.startsWith('_')) return;
                // Omit event emitter properties
                if (k.startsWith('on')) return;

                props[k] = v;
            })
            return props as any;
        }

        const controlProps = getProps(this._controls);
        const minimapProps = getProps(this._minimap);

        controlProps.onFitView = () =>
            this._controls.onFitView.emit();
        controlProps.onInteractiveChange = (interactiveStatus) =>
            this._controls.onInteractiveChange.emit(interactiveStatus);
        controlProps.onZoomIn = () =>
            this._controls.onZoomIn.emit();
        controlProps.onZoomOut = () =>
            this._controls.onZoomOut.emit();

        minimapProps.onClick = () =>
            this._minimap.onClick.emit();
        minimapProps.onNodeClick = () =>
            this._minimap.onNodeClick.emit();

        const reactDirectives = [
            this._background ? React.createElement(Background, getProps(this._background)) : null,
            this._controls ? React.createElement(Controls, controlProps) : null,
            this._minimap ? React.createElement(MiniMap, minimapProps) : null,
        ].filter(r => r);

        const [nodes, setNodes] = React.useState(this.nodes);
        const [edges, setEdges] = React.useState(this.edges);

        // Store setState functions for use in ngOnChanges
        React.useEffect(() => {
            this.setNodes = setNodes;
            this.setEdges = setEdges;
        }, [setNodes, setEdges]);

        props.onNodesChange = React.useCallback(
            (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
            [],
        );
        props.onEdgesChange = React.useCallback(
            (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
            [],
        );
        props.onConnect = React.useCallback(
            (params) => setEdges((eds) => addEdge(params, eds)),
            [],
        );

        props.nodes = nodes;
        props.edges = edges;

        this.synchronizeNodesAndEdges(nodes, edges)

        // Effectively outputs this:
        // <ReactFlowProvider>
        //     <ReactFlow props={props}>
        //         <Background/>
        //         <Controls/>
        //         <MiniMap/>
        //     </ReactFlow>
        // </ReactFlowProvider>


        const reactProps = XYFlowComponent.sanitizeReactProps(props);

        return React.createElement(ReactFlowProvider, { children: [] },
            React.createElement(ReactFlow, reactProps as any,
                ...reactDirectives
            )
        );
    };

    private static sanitizeReactProps(props: ReactFlowProps) {
        const reactProps = { ...props };

        delete(reactProps['nodesChange']);
        delete(reactProps['edgesChange']);

        return reactProps;
    }

    private synchronizeNodesAndEdges(nodes: XYFlowProps['nodes'], edges: XYFlowProps['edges']) {
        this.nodes = nodes;
        this.nodesChange.emit(this.nodes);

        this.edges = edges;
        this.edgesChange.emit(this.edges);
    }

    constructor(
        ngContainer: ViewContainerRef,
        ngZone: NgZone
    ) {
        super(ngContainer, ngZone);
    }

    override ngOnInit() {

    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    override ngOnChanges(changes?: SimpleChanges) {
        if (changes['nodes'] && !changes['nodes'].firstChange && this.setNodes) {
            this.setNodes(changes['nodes'].currentValue);
        }
        if (changes['edges'] && !changes['edges'].firstChange && this.setEdges) {
            this.setEdges(changes['edges'].currentValue);
        }
    }
}
